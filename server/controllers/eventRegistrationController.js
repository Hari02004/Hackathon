import EventRegistration from '../models/EventRegistration.js';
import Event from '../models/Event.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'hk03012004@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'albsmjxtkuohdqzk'
  }
});

// Helper function to send email
const sendEmailHelper = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'hk03012004@gmail.com',
      to,
      subject,
      text
    });
    console.log('✅ Email sent to:', to);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId, participantName, participantEmail, participantPhone, department, semester, year, admissionNumber } = req.body;

    // Validate required fields
    if (!eventId || !participantName || !participantEmail || !participantPhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: eventId, participantName, participantEmail, participantPhone' 
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found. Please check the event ID.' 
      });
    }

    // Check if already registered
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      participantEmail: participantEmail.toLowerCase()
    });

    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: 'You are already registered for this event' 
      });
    }

    // Create registration
    const registration = new EventRegistration({
      eventId,
      eventName: event.title,
      participantName,
      participantEmail: participantEmail.toLowerCase(),
      participantPhone,
      department: department || '',
      semester: semester || '',
      year: year || '',
      admissionNumber: admissionNumber || '',
      status: 'registered'
    });

    await registration.save();

    // Send confirmation email
    try {
      const emailHtml = `
        <h2>Event Registration Confirmation</h2>
        <p>Dear ${participantName},</p>
        <p>Thank you for registering for <strong>${event.title}</strong>!</p>
        <p><strong>Event Details:</strong></p>
        <ul>
          <li>📅 Date: ${event.date}</li>
          <li>⏰ Time: ${event.time}</li>
          <li>📍 Venue: ${event.venue}</li>
        </ul>
        <p><strong>Your Registration Details:</strong></p>
        <ul>
          <li>Name: ${participantName}</li>
          <li>Email: ${participantEmail}</li>
          <li>Phone: ${participantPhone}</li>
          <li>Department: ${department || 'N/A'}</li>
        </ul>
        <p>We look forward to seeing you at the event!</p>
        <p>Best regards,<br/>KNU Events Team</p>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'hk03012004@gmail.com',
        to: participantEmail.toLowerCase(),
        subject: `Registration Confirmed: ${event.title}`,
        html: emailHtml
      });
      console.log('✅ Confirmation email sent to:', participantEmail);
    } catch (emailError) {
      console.log('⚠️ Email sending failed, but registration saved:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event',
      data: registration
    });
  } catch (error) {
    console.error('❌ Error registering for event:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering for event',
      error: error.message
    });
  }
};

// Get all registrations for an event (Admin)
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await EventRegistration.find({ eventId })
      .populate('eventId', 'title date venue')
      .sort({ registeredAt: -1 });

    if (!registrations || registrations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No registrations found for this event'
      });
    }

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
};

// Get all event registrations (Admin - across all events)
export const getAllEventRegistrations = async (req, res) => {
  try {
    const { status, eventName } = req.query;

    let query = {};
    if (status) query.status = status;
    if (eventName) query.eventName = new RegExp(eventName, 'i');

    const registrations = await EventRegistration.find(query)
      .populate('eventId', 'title date venue category')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching all registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
};

// Update registration status (Admin)
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status, notes, sendEmail, participantEmail, participantName, eventName } = req.body;

    const validStatuses = ['registered', 'attended', 'no-show', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided'
      });
    }

    const registration = await EventRegistration.findByIdAndUpdate(
      registrationId,
      {
        status,
        notes,
        checkedInAt: status === 'attended' ? new Date() : undefined
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Send email if requested
    if (sendEmail && registration.participantEmail) {
      const statusMessages = {
        'registered': 'Your registration has been confirmed',
        'attended': 'Thank you for attending the event',
        'no-show': 'We noticed you did not attend the event',
        'cancelled': 'Your registration has been cancelled'
      };

      const emailSubject = `Event Registration Status Update - ${registration.eventName}`;
      const emailBody = `
Dear ${registration.participantName},

${statusMessages[status]} for ${registration.eventName}.

Registration Details:
- Registration Number: ${registration.registrationNumber}
- Event: ${registration.eventName}
- Admission Number: ${registration.admissionNumber || 'N/A'}
- Department: ${registration.department || 'N/A'}
- Current Status: ${status.charAt(0).toUpperCase() + status.slice(1)}

If you have any questions, please contact the admin.

Best regards,
KNU University Administration
      `;

      try {
        await sendEmailHelper({
          to: registration.participantEmail,
          subject: emailSubject,
          text: emailBody
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'Registration status updated',
      data: registration,
      emailSent: sendEmail ? true : false
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating registration',
      error: error.message
    });
  }
};

// Delete registration (Admin)
export const deleteRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await EventRegistration.findByIdAndDelete(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting registration',
      error: error.message
    });
  }
};

// Export registrations as CSV (Admin)
export const exportRegistrationsAsCSV = async (req, res) => {
  try {
    const { eventId } = req.params;

    let registrations;
    if (eventId) {
      registrations = await EventRegistration.find({ eventId }).populate('eventId', 'title');
    } else {
      registrations = await EventRegistration.find().populate('eventId', 'title');
    }

    if (!registrations || registrations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No registrations found'
      });
    }

    // Generate CSV header
    const headers = ['Registration #', 'Event Name', 'Participant Name', 'Email', 'Phone', 'Department', 'Semester', 'Year', 'Admission #', 'Status', 'Registered At'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg =>
        [
          reg.registrationNumber,
          `"${reg.eventName}"`,
          `"${reg.participantName}"`,
          reg.participantEmail,
          reg.participantPhone,
          reg.department || '',
          reg.semester || '',
          reg.year || '',
          reg.admissionNumber || '',
          reg.status,
          new Date(reg.registeredAt).toLocaleDateString()
        ].join(',')
      )
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=event-registrations.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({
      success: false,
      message: 'Error exporting registrations',
      error: error.message
    });
  }
};

// Get registration statistics (Admin)
export const getRegistrationStats = async (req, res) => {
  try {
    const totalRegistrations = await EventRegistration.countDocuments();
    const registeredCount = await EventRegistration.countDocuments({ status: 'registered' });
    const attendedCount = await EventRegistration.countDocuments({ status: 'attended' });
    const noShowCount = await EventRegistration.countDocuments({ status: 'no-show' });
    const cancelledCount = await EventRegistration.countDocuments({ status: 'cancelled' });

    // Get registrations by event
    const registrationsByEvent = await EventRegistration.aggregate([
      {
        $group: {
          _id: '$eventName',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalRegistrations,
        registered: registeredCount,
        attended: attendedCount,
        noShow: noShowCount,
        cancelled: cancelledCount,
        byEvent: registrationsByEvent
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
// Get registrations by user email
export const getUserRegistrations = async (req, res) => {
  try {
    const { email } = req.params;

    const registrations = await EventRegistration.find({ 
      participantEmail: email 
    })
      .populate('eventId', 'title date venue _id')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations: registrations
    });
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user registrations',
      error: error.message
    });
  }
};