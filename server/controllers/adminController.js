import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import DeletedAdmission from '../models/DeletedAdmission.js';
import EmailLog from '../models/EmailLog.js';
import Registration from '../models/Registration.js';
import AdmissionNumber from '../models/AdmissionNumber.js';
import { generateRandomPassword } from '../utils/tokenUtils.js';
import { sendCredentialsEmail, sendApprovalNotificationEmail, sendRejectionEmail } from '../utils/emailService.js';

// Get all pending approvals
export const getPendingApprovals = async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending approvals',
      error: error.message
    });
  }
};

// Get all approved students
export const getApprovedStudents = async (req, res) => {
  try {
    const users = await User.find({ status: 'approved', role: 'student' })
      .select('-password')
      .sort({ approvedAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching approved students',
      error: error.message
    });
  }
};

// Approve student and send credentials
export const approveStudent = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`\n🔄 Starting approval process for user: ${userId}`);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.status === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'User already approved'
      });
    }

    console.log(`👤 User found: ${user.name} (${user.email})`);

    // Generate new password
    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    user.status = 'approved';
    user.password = hashedPassword;
    user.approvedAt = new Date();
    user.approvedBy = req.userId;
    await user.save();

    console.log(`💾 User status updated to: approved`);

    // Send email in background (don't wait for it)
    // This prevents timeout errors on Render's free tier
    sendCredentialsEmailInBackground(user, newPassword, req.userId);

    res.json({
      success: true,
      message: 'Student approved successfully! Credentials will be sent via email.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        password: newPassword // Return password in response since email might fail
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving student',
      error: error.message
    });
  }
};

// Helper function to send email in background
async function sendCredentialsEmailInBackground(user, newPassword, approvedBy) {
  try {
    console.log(`📧 Attempting to send credentials email in background...`);
    const emailResult = await sendCredentialsEmail(
      user.email,
      user.name,
      user.admissionNumber,
      newPassword
    );

    console.log(`📧 Email result:`, emailResult);

    // Log email result
    await EmailLog.create({
      recipientEmail: user.email,
      recipientName: user.name,
      subject: 'Welcome to KNU - Your Account Credentials',
      type: 'credentials',
      status: emailResult.success ? 'sent' : 'failed',
      sentBy: approvedBy,
      error: emailResult.error || null
    });
  } catch (error) {
    console.error('❌ Background email sending error:', error.message);
    // Log this as a failed email attempt
    try {
      await EmailLog.create({
        recipientEmail: user.email,
        recipientName: user.name,
        subject: 'Welcome to KNU - Your Account Credentials',
        type: 'credentials',
        status: 'failed',
        sentBy: approvedBy,
        error: error.message
      });
    } catch (logError) {
      console.error('❌ Could not log email error:', logError.message);
    }
  }
}

// Reject student
export const rejectStudent = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update status
    user.status = 'rejected';
    await user.save();

    // Send rejection email
    await sendRejectionEmail(user.email, user.name);

    res.json({
      success: true,
      message: 'Student rejected',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting student',
      error: error.message
    });
  }
};

// Add new user manually
export const addUser = async (req, res) => {
  try {
    const { name, email, admissionNumber, phone, department, batch, role, status } = req.body;

    console.log('📝 Adding new user:', { name, admissionNumber, status });

    // Validate - email is NOT required for admin add, only at student signup
    if (!name || !admissionNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and admission number'
      });
    }

    // Check existing in User collection
    const query = email 
      ? { $or: [{ email }, { admissionNumber }] }
      : { admissionNumber };
    
    const existing = await User.findOne(query);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email or admission number already exists'
      });
    }

    // Also check if admission number exists in AdmissionNumber collection
    const existingAdmission = await AdmissionNumber.findOne({
      admissionNumber: admissionNumber.toUpperCase()
    });

    if (existingAdmission) {
      return res.status(400).json({
        success: false,
        message: 'Admission number already exists'
      });
    }

    // Generate password (but don't send email if status is pending)
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with the status from request
    // Email will be added when student signs up
    const user = await User.create({
      name,
      email: email || null,
      admissionNumber: admissionNumber.toUpperCase(),
      password: hashedPassword,
      phone,
      department,
      batch,
      role: role || 'student',
      status: status || 'pending',
      approvedAt: status === 'approved' ? new Date() : null,
      approvedBy: status === 'approved' ? req.userId : null
    });

    console.log('✅ User created with status:', user.status);

    // IMPORTANT: Also create an AdmissionNumber record for student signup verification
    try {
      await AdmissionNumber.create({
        admissionNumber: admissionNumber.toUpperCase(),
        studentName: name,
        department: department || 'Computer Science',
        batch: batch || 'Unknown',
        rollNumber: admissionNumber.toUpperCase()
      });
      console.log('✅ AdmissionNumber record created for verification');
    } catch (admissionError) {
      console.error('⚠️ Error creating AdmissionNumber record:', admissionError.message);
      // Don't fail the whole operation if admission number creation fails
    }

    // Only send email if approved (send in background)
    if (status === 'approved' && email) {
      sendCredentialsEmailInBackground(user, password, req.userId);
    }

    res.status(201).json({
      success: true,
      message: 'User added successfully' + (status === 'approved' ? ' and credentials will be sent via email' : ''),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        admissionNumber: user.admissionNumber,
        role: user.role,
        status: user.status,
        password: status === 'approved' ? password : undefined // Show password if approved
      }
    });
  } catch (error) {
    console.error('❌ Error adding user:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error adding user',
      error: error.message
    });
  }
};

// Edit user
export const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phone, department, batch } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, department, batch },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete user (hard delete + track in DeletedAdmission collection)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(`🗑️ Starting deletion process for user: ${userId}`);

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log(`👤 User found: ${user.name} - Admission: ${user.admissionNumber}`);

    // Record in DeletedAdmission collection before hard delete
    await DeletedAdmission.create({
      admissionNumber: user.admissionNumber,
      name: user.name,
      reason: 'Deleted from pending approvals'
    });

    // Hard delete - remove from User collection
    await User.findByIdAndDelete(userId);

    console.log(`✅ User deleted and recorded in DeletedAdmission`);

    res.json({
      success: true,
      message: 'Student deleted successfully',
      deletedRecords: {
        user: user.name,
        admissionNumber: user.admissionNumber
      }
    });
  } catch (error) {
    console.error(`❌ Error deleting user: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingApprovals = await User.countDocuments({ status: 'pending' });
    const approvedStudents = await User.countDocuments({ status: 'approved', role: 'student' });

    res.json({
      success: true,
      stats: {
        totalUsers,
        pendingApprovals,
        approvedStudents,
        rejectedUsers: totalUsers - approvedStudents - pendingApprovals
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
};

// Get all students with their approval status
export const getAllStudents = async (req, res) => {
  try {
    // Get all students (pending, approved, rejected - no deleted)
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      users: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Test email sending
export const testEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    const emailResult = await sendCredentialsEmail(
      email,
      'Test User',
      'TEST0001',
      'Test@123456'
    );

    res.json({
      success: emailResult.success,
      message: emailResult.success ? 'Test email sent successfully' : 'Failed to send test email',
      error: emailResult.error || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending test email',
      error: error.message
    });
  }
};
