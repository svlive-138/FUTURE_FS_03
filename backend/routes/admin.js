import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import Membership from '../models/membership.model.js';
import Contact from '../models/contact.model.js';
import Testimonial from '../models/testimonial.model.js';
import { sendReplyEmail } from '../utils/email.js';

const router = express.Router();

// Middleware to verify admin token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// POST - Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    admin.loginAttempts = 0;
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Dashboard statistics
router.get('/dashboard/stats', verifyToken, async (req, res) => {
  try {
    const [memberships, contacts, testimonials] = await Promise.all([
      Membership.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Testimonial.countDocuments({ isApproved: false }),
    ]);

    res.json({
      totalMembers: memberships,
      newInquiries: contacts,
      pendingTestimonials: testimonials,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - All memberships
router.get('/memberships', verifyToken, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const memberships = await Membership.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Membership.countDocuments();

    res.json({
      memberships,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - All contacts
router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const status = req.query.status || 'all';
    const query = status !== 'all' ? { status } : {};

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Mark contact as read and reply
router.put('/contacts/:id/reply', verifyToken, async (req, res) => {
  try {
    const { reply } = req.body;

    // Find the contact first
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Send reply email
    const emailResult = await sendReplyEmail(
      contact.email,
      contact.name,
      contact.subject,
      reply
    );

    // Update contact status to 'replied' only if email was sent successfully
    const updateData = {
      status: emailResult.success ? 'replied' : 'read',
      reply,
      repliedAt: new Date(),
    };

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // Return response with email status
    res.json({
      message: emailResult.success 
        ? 'Reply sent successfully' 
        : 'Reply saved but email failed to send',
      contact: updatedContact,
      emailStatus: emailResult,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - All testimonials (for approval)
router.get('/testimonials', verifyToken, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Approve/feature testimonial
router.put('/testimonials/:id/approve', verifyToken, async (req, res) => {
  try {
    const { isApproved, featured } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved, featured },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial updated successfully', testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Create new admin (super admin only)
router.post('/admins', verifyToken, async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ error: 'Only super admin can create new admins' });
    }

    const { username, email, password, name } = req.body;

    const admin = new Admin({
      username,
      email,
      password,
      name,
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Admin profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;