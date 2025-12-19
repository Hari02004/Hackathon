import express from 'express';
import {
  getAllNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews,
  likeNews
} from '../controllers/newsController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/:id', getSingleNews);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createNews);
router.put('/:id', authMiddleware, adminMiddleware, updateNews);
router.delete('/:id', authMiddleware, adminMiddleware, deleteNews);

// Student routes
router.post('/:id/like', authMiddleware, likeNews);

export default router;
