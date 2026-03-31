import express from 'express';
import { validationResult, body } from 'express-validator';
import Membership from '../models/membership.model.js';

const router = express.Router();

// Validation middleware
const validateMembership = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('plan').isIn(['monthly', 'quarterly', 'yearly']).withMessage('Invalid plan'),
];

// POST - Submit membership form
router.post('/', validateMembership, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const membership = new Membership(req.body);
    await membership.save();

    res.status(201).json({
      message: 'Membership form submitted successfully',
      membership,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get all memberships (admin)
router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get membership by ID
router.get('/:id', async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update membership status
router.put('/:id', async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete membership
router.delete('/:id', async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    res.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get pricing plans
router.get('/plans', async (req, res) => {
  const plans = [
    {
      name: 'Monthly',
      price: 1499,
      period: 'per month',
      features: ['24/7 Access', 'All Equipment', 'Locker & Shower']
    },
    {
      name: 'Quarterly',
      price: 3999,
      period: 'per 3 months',
      features: ['24/7 Access', 'All Equipment', 'Unlimited Classes', '4 PT Sessions']
    },
    {
      name: 'Yearly',
      price: 9999,
      period: 'per year',
      features: ['24/7 Access', 'All Equipment', 'Unlimited Classes', '12 PT Sessions', 'Diet Consultation']
    }
  ];
  res.json(plans);
});

export default router;