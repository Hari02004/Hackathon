import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get settings (admin only)
router.get('/', authMiddleware, adminMiddleware, getSettings);

// Update settings (admin only)
router.put('/', authMiddleware, adminMiddleware, updateSettings);

export default router;
