import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  plan: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  fitnessGoal: {
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'endurance', 'general-fitness', 'rehabilitation'],
  },
  previousExperience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'expired', 'canceled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online', 'card', 'upi', 'check'],
  },
  paymentDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Membership', membershipSchema);