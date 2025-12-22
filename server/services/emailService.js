import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Brevo
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

console.log('✅ Email service configured for Brevo');

// Send email function
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const sendSmtpEmail = {
      to: [{email: to}],
      sender: {
        name: 'KNU University',
        email: process.env.EMAIL_USER || 'noreply@knuniversity.com'
      },
      subject: subject,
      htmlContent: html || `<p>${text.replace(/\n/g, '<br>')}</p>`
    };

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent to:', to);
    return { success: true };
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
