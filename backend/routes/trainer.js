import express from 'express';
import Trainer from '../models/trainer.model.js';

const router = express.Router();

// GET - Get all active trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find({ isActive: true })
      .select('-password')
      .sort({ name: 1 });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get trainer by ID
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id)
      .select('-password');
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Create new trainer (admin)
router.post('/', async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json({
      message: 'Trainer added successfully',
      trainer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update trainer profile
router.put('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Add rating/review to trainer
router.put('/:id/rating', async (req, res) => {
  try {
    const { rating } = req.body;

    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    // Calculate new average rating
    const totalRating = trainer.rating * trainer.reviewCount + rating;
    trainer.reviewCount += 1;
    trainer.rating = totalRating / trainer.reviewCount;

    await trainer.save();

    res.json({
      message: 'Rating added successfully',
      trainer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get trainers by specialization
router.get('/specialization/:specialization', async (req, res) => {
  try {
    const trainers = await Trainer.find({
      specialization: req.params.specialization,
      isActive: true,
    });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete trainer
router.delete('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;