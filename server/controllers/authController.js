import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import EmailLog from '../models/EmailLog.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import { generateToken, generateRandomPassword } from '../utils/tokenUtils.js';
import { sendCredentialsEmail, sendEmail } from '../utils/emailService.js';
import { getRegistrationEmailTemplate } from '../utils/emailTemplates.js';

// Student Registration
export const studentRegister = async (req, res) => {
  try {
    const { name, email, admissionNumber, phone, department, batch, eventId } = req.body;

    // Validate inputs
    if (!name || !email || !admissionNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and admission number'
      });
    }

    // Check if admission number already exists
    const existingByAdmission = await User.findOne({
      admissionNumber: admissionNumber.toUpperCase()
    });

    // Check if email already exists
    const existingByEmail = await User.findOne({
      email: email.toLowerCase()
    });

    // If admission # exists (created by admin), update it with email
    if (existingByAdmission && !existingByAdmission.email) {
      console.log(`📝 Updating existing user with admission #: ${admissionNumber}`);
      
      // Generate temporary password
      const tempPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      // Update the user with email and password
      existingByAdmission.email = email.toLowerCase();
      existingByAdmission.password = hashedPassword;
      existingByAdmission.phone = phone || existingByAdmission.phone;
      await existingByAdmission.save();

      console.log(`✅ User updated with email: ${email}`);

      const token = generateToken(existingByAdmission._id, existingByAdmission.role);

      return res.status(200).json({
        success: true,
        message: 'Registration successful',
        token,
        user: {
          id: existingByAdmission._id,
          name: existingByAdmission.name,
          email: existingByAdmission.email,
          admissionNumber: existingByAdmission.admissionNumber,
          role: existingByAdmission.role,
          status: existingByAdmission.status
        }
      });
    }

    // If admission # exists but already has email, reject
    if (existingByAdmission && existingByAdmission.email) {
      return res.status(400).json({
        success: false,
        message: 'This admission number is already registered'
      });
    }

    // If email already exists, reject
    if (existingByEmail) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered'
      });
    }

    // Create new user
    const tempPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await User.create({
      name,
      email,
      admissionNumber: admissionNumber.toUpperCase(),
      password: hashedPassword,
      phone,
      department,
      batch,
      role: 'student',
      status: 'pending'
    });

    // Get event details if eventId provided
    let eventData = null;
    if (eventId) {
      eventData = await Event.findById(eventId);
    }

    // Save registration data
    const registrationData = {
      name,
      email,
      admissionNumber: admissionNumber.toUpperCase(),
      phone,
      department,
      batch,
      eventTitle: eventData?.title || '',
      eventDate: eventData?.date || null,
      eventVenue: eventData?.venue || '',
      eventCategory: eventData?.category || '',
      status: 'pending'
    };

    const registration = await Registration.create(registrationData);

    // Send registration confirmation email
    const emailTemplate = getRegistrationEmailTemplate({ name, email }, eventData);
    await sendEmail(email, emailTemplate.subject, emailTemplate.html);

    // Log email
    await EmailLog.create({
      recipientEmail: email,
      subject: emailTemplate.subject,
      status: 'sent',
      type: 'registration_confirmation'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Confirmation email sent. Waiting for admin approval.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration error',
      error: error.message
    });
  }
};

// Student Login
export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if approved
    if (user.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'Your account is not approved yet'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        admissionNumber: user.admissionNumber
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message
    });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { admissionNumber, password } = req.body;

    if (!admissionNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide admission number and password'
      });
    }

    // Find admin user
    const user = await User.findOne({
      admissionNumber: admissionNumber.toUpperCase(),
      role: 'admin'
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        admissionNumber: user.admissionNumber
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user'
    });
  }
};
