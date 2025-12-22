import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import newsRoutes from './routes/news.js';
import eventRoutes from './routes/events.js';
import eventRegistrationRoutes from './routes/eventRegistrations.js';
import admissionRoutes from './routes/admission.js';
import registrationRoutes from './routes/registrations.js';
import settingsRoutes from './routes/settings.js';
import usersRoutes from './routes/users.js';


// Initialize Express
const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, ''),
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-registrations', eventRegistrationRoutes);
app.use('/api/admission', admissionRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server with MongoDB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}`);
      console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
