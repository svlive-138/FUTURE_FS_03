import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/admin.model.js';
import Trainer from './models/trainer.model.js';
import Class from './models/class.model.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/igym');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Trainer.deleteMany({});
    await Class.deleteMany({});

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@igym.com',
      password: process.env.ADMIN_PASSWORD || 'secure_password_change_this',
      name: 'I Gym Admin',
      role: 'admin',
    });
    await admin.save();
    console.log('✓ Admin created');

    // Create sample trainers
    const trainer1 = new Trainer({
      name: 'Raj Kumar',
      email: 'raj@igym.com',
      phone: '+91-98765-43210',
      role: 'trainer',
      specialization: 'Strength Training & Muscle Building',
      bio: 'With 12+ years of experience in fitness, Raj has transformed hundreds of bodies and lives.',
      certifications: [
        { name: 'NASM CPT', date: new Date('2012-01-01') },
        { name: 'ISSN Certified', date: new Date('2015-01-01') },
      ],
      achievements: [
        '500+ Members Transformed',
        'State Champion Lifter',
        'Featured in Fitness Magazines',
      ],
      experience: 12,
      rating: 5,
      reviewCount: 50,
      isActive: true,
    });
    await trainer1.save();

    const trainer2 = new Trainer({
      name: 'Priya Singh',
      email: 'priya@igym.com',
      phone: '+91-98765-43211',
      role: 'trainer',
      specialization: 'Personal Training & Women\'s Fitness',
      bio: 'Priya specializes in helping women achieve their fitness goals through personalized training.',
      certifications: [
        { name: 'ACE CPT', date: new Date('2014-01-01') },
        { name: 'Nutrition Specialist', date: new Date('2016-01-01') },
      ],
      achievements: [
        'Certified Nutrition Specialist',
        '200+ Female Clients',
        'Zumba & Dance Instructor',
      ],
      experience: 8,
      rating: 4.9,
      reviewCount: 45,
      isActive: true,
    });
    await trainer2.save();

    console.log('✓ Trainers created');

    // Create sample classes
    const class1 = new Class({
      name: 'Weight Training',
      description: 'Build strength and muscle with our comprehensive weight training program.',
      instructor: trainer1._id,
      schedule: { day: 'Monday', startTime: '06:00', endTime: '07:00' },
      duration: 60,
      level: 'all-levels',
      capacity: 12,
      isActive: true,
    });
    await class1.save();

    const class2 = new Class({
      name: 'Yoga & Flexibility',
      description: 'Improve flexibility, balance, and mental peace with our yoga sessions.',
      instructor: trainer2._id,
      schedule: { day: 'Tuesday', startTime: '06:00', endTime: '07:00' },
      duration: 60,
      level: 'all-levels',
      capacity: 25,
      isActive: true,
    });
    await class2.save();

    console.log('✓ Classes created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin Details:');
    console.log('Email: admin@igym.com');
    console.log('Password: ' + (process.env.ADMIN_PASSWORD || 'secure_password_change_this'));

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();