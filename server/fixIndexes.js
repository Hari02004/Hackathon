import mongoose from 'mongoose';
import User from './models/User.js';

async function fixIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      'mongodb+srv://hackathon:Hackathon%40123@cluster0.4eqre6p.mongodb.net/hackathon?retryWrites=true&w=majority'
    );
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection;

    // Drop old indexes
    try {
      await db.collection('users').dropIndex('admissionNumber_1');
      console.log('✅ Dropped old admissionNumber index');
    } catch (e) {
      console.log('ℹ️  No old admissionNumber_1 index to drop');
    }

    try {
      await db.collection('users').dropIndex('email_1');
      console.log('✅ Dropped old email index');
    } catch (e) {
      console.log('ℹ️  No old email_1 index to drop');
    }

    // Recreate model to rebuild indexes
    await User.syncIndexes();
    console.log('✅ Recreated partial unique indexes');

    // Show all indexes
    const indexes = await db.collection('users').getIndexes();
    console.log('\n📋 Current indexes:');
    console.log(JSON.stringify(indexes, null, 2));

    console.log('\n✅ Index fix complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing indexes:', error.message);
    process.exit(1);
  }
}

fixIndexes();
