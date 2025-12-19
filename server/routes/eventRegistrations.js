import express from 'express';
import {
  registerForEvent,
  getEventRegistrations,
  getAllEventRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
  exportRegistrationsAsCSV,
  getRegistrationStats,
  getUserRegistrations
} from '../controllers/eventRegistrationController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public route - Student registration
router.post('/register', registerForEvent);

// Get user registrations by email
router.get('/user/:email', getUserRegistrations);

// Admin routes
router.get('/admin/stats', authMiddleware, adminMiddleware, getRegistrationStats);
router.get('/admin/all', authMiddleware, adminMiddleware, getAllEventRegistrations);
router.get('/admin/event/:eventId', authMiddleware, adminMiddleware, getEventRegistrations);
router.put('/admin/:registrationId', authMiddleware, adminMiddleware, updateRegistrationStatus);
router.delete('/admin/:registrationId', authMiddleware, adminMiddleware, deleteRegistration);
router.get('/admin/export/:eventId?', authMiddleware, adminMiddleware, exportRegistrationsAsCSV);

export default router;
