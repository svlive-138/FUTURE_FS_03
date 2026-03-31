import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Membership
export const submitMembershipForm = (data) => api.post('/membership', data);
export const getMembershipPlans = () => api.get('/membership-plans');

// Contact
export const submitContactForm = (data) => api.post('/contact', data);

// Gallery
export const getGalleryImages = () => api.get('/gallery');

// Testimonials
export const getTestimonials = () => api.get('/testimonials');

// Classes
export const getClasses = () => api.get('/classes');

// Trainers
export const getTrainers = () => api.get('/trainers');

export default api;