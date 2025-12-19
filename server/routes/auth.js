import express from 'express';
import {
  studentRegister,
  studentLogin,
  adminLogin,
  getCurrentUser
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/student-register', studentRegister);
router.post('/student-login', studentLogin);
router.post('/admin-login', adminLogin);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

export default router;
