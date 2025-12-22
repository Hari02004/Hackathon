import dotenv from 'dotenv';
dotenv.config();
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Initialize Brevo (Sendinblue)
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

console.log('✅ Email service configured for Brevo (FREE - 300 emails/day)');
console.log('📧 From email:', process.env.EMAIL_USER || 'noreply@knuniversity.com');

export const sendCredentialsEmail = async (email, name, admissionNumber, password) => {
  try {
    console.log(`\n📧 SENDING EMAIL VIA BREVO...`);
    console.log(`   To: ${email}`);
    console.log(`   Student: ${name}`);
    
    const sendSmtpEmail = {
      to: [{email: email, name: name}],
      sender: {
        name: 'KNU University',
        email: process.env.EMAIL_USER || 'noreply@knuniversity.com'
      },
      subject: '🎓 Welcome to KNU - Your Account Credentials',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
            .credentials-box { background: #f0f0f0; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; }
            .credentials-box p { margin: 8px 0; }
            .label { font-weight: bold; color: #dc2626; }
            .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 12px; border-radius: 4px; margin: 20px 0; color: #856404; }
            .button { background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Welcome to KNU</h1>
              <p>Knowledge Nexus University</p>
            </div>
            
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>Your account has been approved by the admin! Your credentials are below:</p>
              
              <div class="credentials-box">
                <p><span class="label">Email:</span> ${email}</p>
                <p><span class="label">Admission Number:</span> ${admissionNumber}</p>
                <p><span class="label">Temporary Password:</span> ${password}</p>
              </div>
              
              <div class="warning">
                ⚠️ <strong>Important:</strong> Please change your password after first login for security.
              </div>
              
              <p><strong>How to Login:</strong></p>
              <ol>
                <li>Visit: <a href="${process.env.FRONTEND_URL}">KNU University Website</a></li>
                <li>Click "Login"</li>
                <li>Enter your email and password above</li>
                <li>Change your password immediately</li>
              </ol>
              
              <p>Once logged in, you can:</p>
              <ul>
                <li>✅ Register for events</li>
                <li>✅ Access your dashboard</li>
                <li>✅ Download certificates</li>
                <li>✅ View course materials</li>
                <li>✅ Manage your profile</li>
              </ul>
              
              <p>If you have any questions, please contact our support team.</p>
              
              <p>Welcome to KNU! 🎓</p>
              <p>Best regards,<br><strong>Knowledge Nexus University</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Knowledge Nexus University. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log(`\n✅ EMAIL SENT SUCCESSFULLY VIA BREVO!`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('\n❌ EMAIL SENDING FAILED!');
    console.error(`   Error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const sendApprovalNotificationEmail = async (email, name) => {
  try {
    console.log(`📧 Sending approval notification to: ${email}`);
    const sendSmtpEmail = {
      to: [{email: email, name: name}],
      sender: {
        name: 'KNU University',
        email: process.env.EMAIL_USER || 'noreply@knuniversity.com'
      },
      subject: '✅ Your KNU Account Has Been Approved!',
      htmlContent: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 20px; text-align: center;">
            <h2>Account Approved! ✅</h2>
          </div>
          <div style="padding: 30px;">
            <p>Hi ${name},</p>
            <p>Great news! Your account has been approved by the admin.</p>
            <p>Check your email for login credentials.</p>
            <p>Visit: <a href="${process.env.FRONTEND_URL}">KNU University</a></p>
          </div>
        </div>
      `
    };

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Approval notification sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending approval email:', error.message);
    return { success: false, error: error.message };
  }
};

export const sendRejectionEmail = async (email, name) => {
  try {
    console.log(`📧 Sending rejection email to: ${email}`);
    const sendSmtpEmail = {
      to: [{email: email, name: name}],
      sender: {
        name: 'KNU University',
        email: process.env.EMAIL_USER || 'noreply@knuniversity.com'
      },
      subject: '❌ Your KNU Account Registration',
      htmlContent: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 20px; text-align: center;">
            <h2>Registration Update</h2>
          </div>
          <div style="padding: 30px;">
            <p>Hi ${name},</p>
            <p>Unfortunately, your registration was not approved at this time.</p>
            <p>Please contact the admin for more information.</p>
          </div>
        </div>
      `
    };

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Rejection email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending rejection email:', error.message);
    return { success: false, error: error.message };
  }
};

// Generic send email function
export const sendEmail = async (to, subject, html) => {
  try {
    console.log(`📧 Sending email to: ${to}`);
    const sendSmtpEmail = {
      to: [{email: to}],
      sender: {
        name: 'KNU University',
        email: process.env.EMAIL_USER || 'noreply@knuniversity.com'
      },
      subject: subject,
      htmlContent: html
    };

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
};
