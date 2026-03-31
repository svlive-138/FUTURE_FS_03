import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide trainer name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide trainer email'],
    lowercase: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['trainer', 'head-coach', 'specialist', 'instructor'],
  },
  specialization: {
    type: String,
  },
  bio: {
    type: String,
  },
  certifications: [{
    name: String,
    date: Date,
  }],
  achievements: [String],
  experience: {
    type: Number,
  },
  photo: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  availability: {
    isAvailable: Boolean,
    schedule: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Trainer', trainerSchema);