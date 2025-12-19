import mongoose from 'mongoose';
import Event from './models/Event.js';
import dotenv from 'dotenv';

dotenv.config();

const seedEvents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Sample events data
    const sampleEvents = [
      {
        title: 'Annual Tech Fest 2024',
        description: 'Join us for our biggest tech event of the year! Featuring hackathons, workshops, and keynote speeches from industry experts.',
        date: new Date('2024-12-20'),
        time: '09:00',
        venue: 'Main Auditorium',
        category: 'Academic',
        status: 'upcoming',
        featured: true
      },
      {
        title: 'Inter-College Sports Championship',
        description: 'Compete with teams from other colleges in cricket, football, badminton, and more.',
        date: new Date('2024-12-25'),
        time: '10:00',
        venue: 'Sports Ground',
        category: 'Sports',
        status: 'upcoming',
        featured: true
      },
      {
        title: 'Cultural Fest - Celebrating Diversity',
        description: 'Experience the rich cultural heritage with dance, music, drama performances and food from around the world.',
        date: new Date('2024-12-28'),
        time: '18:00',
        venue: 'Central Lawn',
        category: 'Cultural',
        status: 'upcoming',
        featured: true
      },
      {
        title: 'AI and Machine Learning Workshop',
        description: 'Learn the basics of AI and ML with hands-on coding exercises. Suitable for beginners.',
        date: new Date('2025-01-05'),
        time: '14:00',
        venue: 'Lab Building - Room 201',
        category: 'Workshop',
        status: 'upcoming',
        featured: false
      },
      {
        title: 'Industry Expert Seminar',
        description: 'Hear from successful entrepreneurs and industry leaders about their journey and insights.',
        date: new Date('2025-01-10'),
        time: '11:00',
        venue: 'Seminar Hall',
        category: 'Career',
        status: 'upcoming',
        featured: false
      },
      {
        title: 'Placement Drive 2024',
        description: 'Meet top companies recruiting from our college. Submit your resume and attend interviews.',
        date: new Date('2025-01-15'),
        time: '10:00',
        venue: 'Placement Office & Multiple Halls',
        category: 'Academic',
        status: 'upcoming',
        featured: true
      }
    ];

    // Create events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ Successfully seeded ${createdEvents.length} events`);
    
    console.log('\nCreated Events:');
    createdEvents.forEach(event => {
      console.log(`  - ${event.title} (${event.category})`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding events:', error.message);
    process.exit(1);
  }
};

seedEvents();
