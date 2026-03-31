import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    
    trim: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['equipment', 'facilities', 'classes', 'members', 'transformations', 'events'],
    required: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  order: {
    type: Number,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Gallery', gallerySchema);