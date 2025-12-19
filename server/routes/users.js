import express from 'express';
import { getAllStudents } from '../controllers/adminController.js';
import { updateProfile, getProfile, changePassword } from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(authMiddleware);

// User profile routes
router.get('/profile', getProfile);
router.put('/update-profile', updateProfile);
router.put('/change-password', changePassword);

// Admin only routes
router.get('/all-students', adminMiddleware, getAllStudents);

export default router;

