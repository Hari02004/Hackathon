import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/knu-university';
    
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 URI (hidden for security)');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Full error:', error);
    // Don't exit - let server start anyway
    console.warn('⚠️  Continuing without database connection...');
    return false;
  }
};

export default connectDB;
