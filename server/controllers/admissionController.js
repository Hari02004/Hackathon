import AdmissionNumber from '../models/AdmissionNumber.js';

// Verify admission number exists
export const verifyAdmissionNumber = async (req, res) => {
  try {
    const { admissionNumber } = req.body;

    if (!admissionNumber) {
      return res.status(400).json({ message: 'Admission number is required' });
    }

    const admission = await AdmissionNumber.findOne({
      admissionNumber: admissionNumber.toUpperCase()
    });

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission number not found. Please enter a valid admission number.'
      });
    }

    if (admission.isVerified && admission.registeredEmail) {
      return res.status(400).json({
        success: false,
        message: 'This admission number has already been registered.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Admission number verified successfully',
      data: {
        admissionNumber: admission.admissionNumber,
        studentName: admission.studentName,
        department: admission.department,
        batch: admission.batch,
        rollNumber: admission.rollNumber
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying admission number'
    });
  }
};

// Get all admission numbers (admin only)
export const getAllAdmissionNumbers = async (req, res) => {
  try {
    const admissions = await AdmissionNumber.find().select('-__v');
    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission numbers' });
  }
};

// Add new admission number (admin only)
export const addAdmissionNumber = async (req, res) => {
  try {
    const { admissionNumber, studentName, department, batch, rollNumber } = req.body;

    // Validate required fields
    if (!admissionNumber || !studentName || !department || !batch || !rollNumber) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Check if admission number already exists
    const existing = await AdmissionNumber.findOne({
      admissionNumber: admissionNumber.toUpperCase()
    });

    if (existing) {
      return res.status(400).json({
        message: 'Admission number already exists'
      });
    }

    const newAdmission = new AdmissionNumber({
      admissionNumber: admissionNumber.toUpperCase(),
      studentName,
      department,
      batch,
      rollNumber
    });

    await newAdmission.save();

    res.status(201).json({
      success: true,
      message: 'Admission number added successfully',
      data: newAdmission
    });
  } catch (error) {
    console.error('Error adding admission number:', error);
    res.status(500).json({ message: 'Error adding admission number' });
  }
};

// Delete admission number (admin only)
export const deleteAdmissionNumber = async (req, res) => {
  try {
    const { id } = req.params;

    const admission = await AdmissionNumber.findByIdAndDelete(id);

    if (!admission) {
      return res.status(404).json({ message: 'Admission number not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Admission number deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admission number' });
  }
};
