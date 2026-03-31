import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Gallery from '../models/gallery.model.js';

const router = express.Router();

// Configure multer for local file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const ext = path.extname(file.originalname);
    cb(null, `gallery-${timestamp}-${randomStr}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Helper function to ensure imageUrl is absolute
const getAbsoluteImageUrl = (imageUrl, req) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl; // Already absolute
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
};

// Helper to transform gallery images
const transformGalleryImage = (image, req) => {
  const imageDoc = image.toObject ? image.toObject() : image;
  return {
    ...imageDoc,
    imageUrl: getAbsoluteImageUrl(imageDoc.imageUrl, req),
  };
};

// GET - Get all published gallery images
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const query = { isPublished: true };
    if (category) query.category = category;

    const images = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    const transformedImages = images.map(img => transformGalleryImage(img, req));
    res.json(transformedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get gallery by category
router.get('/category/:category', async (req, res) => {
  try {
    const images = await Gallery.find({
      category: req.params.category,
      isPublished: true,
    }).sort({ order: 1 });

    const transformedImages = images.map(img => transformGalleryImage(img, req));
    res.json(transformedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Upload gallery image (admin)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, order } = req.body;

    // Validate file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Create image URL with full absolute path (http://localhost:5000/uploads/...)
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

    // Save to database
    const gallery = new Gallery({
      title,
      description,
      category,
      imageUrl,
      order: order || 0,
    });

    await gallery.save();

    const transformedGallery = transformGalleryImage(gallery, req);
    res.status(201).json({
      message: 'Image uploaded successfully',
      gallery: transformedGallery,
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Gallery upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update gallery image metadata
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, order, isPublished } = req.body;

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          description,
          category,
          order,
          isPublished,
        },
      },
      { new: true }
    );

    if (!gallery) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    const transformedGallery = transformGalleryImage(gallery, req);
    res.json(transformedGallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete gallery image
router.delete('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    // Delete file from server if it exists
    if (gallery.imageUrl) {
      // Extract filename from URL (handle both relative and absolute URLs)
      let filename = gallery.imageUrl;
      if (filename.includes('/uploads/')) {
        filename = filename.split('/uploads/')[1];
      } else if (filename.startsWith('/')) {
        filename = filename.substring(1);
      }
      
      const filePath = path.join(process.cwd(), filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`✓ Deleted file: ${filename}`);
      }
    }

    res.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;