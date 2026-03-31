import express from 'express';
import Class from '../models/class.model.js';

const router = express.Router();

// GET - Get all active classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true })
      .populate('instructor', 'name specialization')
      .sort({ 'schedule.day': 1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get class by ID
router.get('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate('instructor');
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Create new class (admin)
router.post('/', async (req, res) => {
  try {
    const classItem = new Class(req.body);
    await classItem.save();
    res.status(201).json({
      message: 'Class created successfully',
      class: classItem,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update class
router.put('/:id', async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('instructor');

    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Enroll member in class
router.post('/:id/enroll', async (req, res) => {
  try {
    const { memberId, name } = req.body;
    
    const classItem = await Class.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          enrolledMembers: {
            memberId,
            name,
            enrolledAt: new Date(),
          }
        }
      },
      { new: true }
    );

    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json({
      message: 'Successfully enrolled in class',
      class: classItem,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete class
router.delete('/:id', async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;