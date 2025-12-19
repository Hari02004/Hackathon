import express from 'express';
import {
  getPendingApprovals,
  getApprovedStudents,
  approveStudent,
  rejectStudent,
  addUser,
  editUser,
  deleteUser,
  getDashboardStats,
  getAllStudents,
  testEmail
} from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

router.get('/dashboard-stats', getDashboardStats);
router.get('/pending-approvals', getPendingApprovals);
router.get('/approved-students', getApprovedStudents);
router.post('/approve-student/:userId', approveStudent);
router.post('/reject-student/:userId', rejectStudent);
router.post('/add-user', addUser);
router.put('/edit-user/:userId', editUser);
router.delete('/delete-user/:userId', deleteUser);
router.post('/test-email', testEmail);

export default router;
