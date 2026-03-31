import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  testimonial: {
    type: String,
    required: [true, 'Please provide your testimonial'],
  },
  transformation: {
    type: String,
  },
  beforeWeight: {
    type: String,
  },
  afterWeight: {
    type: String,
  },
  image: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Testimonial', testimonialSchema);