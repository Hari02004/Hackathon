import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'hk03012004@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'albsmjxtkuohdqzk'
  }
});

// Verify email service configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error);
  } else {
    console.log('✅ Email service configured for:', process.env.EMAIL_USER || 'hk03012004@gmail.com');
  }
});

// Send email function
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hk03012004@gmail.com',
      to,
      subject,
      text,
      html: html || `<pre>${text}</pre>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', to);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Send registration confirmation email
export const sendRegistrationEmail = async (registration) => {
  const emailSubject = `Event Registration Confirmation - ${registration.eventName}`;
  const emailText = `
Dear ${registration.participantName},

Thank you for registering for ${registration.eventName}!

Registration Details:
- Registration Number: ${registration.registrationNumber}
- Event: ${registration.eventName}
- Admission Number: ${registration.admissionNumber || 'N/A'}
- Department: ${registration.department || 'N/A'}
- Registered Date: ${new Date(registration.registeredAt).toLocaleDateString()}

Please keep your registration number safe. You will need it for check-in on the event day.

If you have any questions, please contact the admin.

Best regards,
KNU University Administration
  `;

  return sendEmail({
    to: registration.participantEmail,
    subject: emailSubject,
    text: emailText
  });
};
