import express from 'express';
import { validationResult, body } from 'express-validator';
import Testimonial from '../models/testimonial.model.js';

const router = express.Router();

// Validation middleware
const validateTestimonial = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
  body('testimonial').notEmpty().withMessage('Testimonial is required'),
];

// POST - Submit testimonial
router.post('/', validateTestimonial, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    res.status(201).json({
      message: 'Thank you for your testimonial! We will review and publish it soon.',
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    const query = req.query.featured === 'true' 
      ? { isApproved: true, featured: true }
      : { isApproved: true };
    
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get all testimonials (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update testimonial (admin - approve, feature, etc.)
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;