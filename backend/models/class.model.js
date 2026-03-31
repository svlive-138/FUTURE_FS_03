import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide class name'],
    trim: true,
  },
  description: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
  },
  schedule: {
    day: String,
    startTime: String,
    endTime: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
  },
  capacity: {
    type: Number,
  },
  enrolledMembers: [{
    memberId: mongoose.Schema.Types.ObjectId,
    name: String,
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Class', classSchema);