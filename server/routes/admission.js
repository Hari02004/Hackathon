import express from 'express';
import { verifyAdmissionNumber, getAllAdmissionNumbers, addAdmissionNumber, deleteAdmissionNumber } from '../controllers/admissionController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public route - verify admission number
router.post('/verify', verifyAdmissionNumber);

// Admin routes
router.get('/numbers', authMiddleware, adminMiddleware, getAllAdmissionNumbers);
router.post('/numbers', authMiddleware, adminMiddleware, addAdmissionNumber);
router.delete('/numbers/:id', authMiddleware, adminMiddleware, deleteAdmissionNumber);

export default router;
