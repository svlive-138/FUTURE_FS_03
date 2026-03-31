import express from 'express';
import { validationResult, body } from 'express-validator';
import Contact from '../models/contact.model.js';
import { sendReplyEmail, sendContactConfirmationEmail } from '../utils/email.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

// POST - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact(req.body);
    await contact.save();

    // Send confirmation email to user (don't fail if email fails)
    try {
      await sendContactConfirmationEmail(
        req.body.email,
        req.body.name,
        req.body.subject
      );
    } catch (emailError) {
      console.warn('Warning: Email failed to send:', emailError.message);
      // Continue anyway - contact was saved
    }

    res.status(201).json({
      message: 'Thank you for reaching out! We will get back to you soon.',
      contact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update contact (mark as read, add reply)
router.put('/:id', async (req, res) => {
  try {
    const { status, reply } = req.body;
    const updateData = { status };
    if (reply) {
      updateData.reply = reply;
      updateData.repliedAt = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Send reply email to user if reply is provided
    if (reply) {
      await sendReplyEmail(
        contact.email,
        contact.name,
        contact.subject,
        reply
      );
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;