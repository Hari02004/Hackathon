import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      admissionNumber: 'ADM0000',
      role: 'admin'
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@university.edu',
      admissionNumber: 'ADM0000',
      password: hashedPassword,
      phone: '9000000000',
      department: 'Administration',
      batch: '2024-2028',
      role: 'admin',
      status: 'approved'
    });

    console.log('✅ Admin user created successfully');
    console.log('Admin Details:');
    console.log('  Admission Number: ADM0000');
    console.log('  Password: admin123');
    console.log('  Email: admin@university.edu');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
