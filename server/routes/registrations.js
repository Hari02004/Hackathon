import express from 'express';
import { getRegisteredStudents } from '../controllers/registrationController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all registered students (admin only)
router.get('/students', authMiddleware, adminMiddleware, getRegisteredStudents);

export default router;
