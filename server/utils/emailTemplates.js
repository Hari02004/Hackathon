export const getRegistrationEmailTemplate = (studentData, eventData) => {
  const emailDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const eventDate = eventData ? new Date(eventData.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'TBD';

  return {
    subject: `Registration Confirmation - Knowledge Nexus University`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 30px;
            background-color: white;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }
          .info-label {
            font-weight: bold;
            color: #555;
          }
          .info-value {
            color: #333;
          }
          .event-highlight {
            background-color: #f0f4ff;
            padding: 15px;
            border-left: 4px solid #667eea;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            background-color: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
          .status-badge {
            display: inline-block;
            background-color: #fff3cd;
            color: #856404;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Registration Successful!</h1>
            <p>Welcome to Knowledge Nexus University</p>
          </div>

          <div class="content">
            <p>Dear <strong>${studentData.name}</strong>,</p>

            <p>Thank you for registering with Knowledge Nexus University! Your registration has been successfully submitted on <strong>${emailDate}</strong>.</p>

            <div class="section">
              <div class="section-title">Your Registration Details</div>
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${studentData.name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${studentData.email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Admission Number:</span>
                <span class="info-value">${studentData.admissionNumber}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Department:</span>
                <span class="info-value">${studentData.department}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${studentData.phone}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="info-value">
                  <span class="status-badge">PENDING APPROVAL</span>
                </span>
              </div>
            </div>

            ${eventData ? `
            <div class="event-highlight">
              <div class="section-title">Upcoming Event: ${eventData.title}</div>
              <p><strong>${eventData.description}</strong></p>
              <div class="info-row">
                <span class="info-label">📅 Date:</span>
                <span class="info-value">${eventDate}</span>
              </div>
              <div class="info-row">
                <span class="info-label">🕐 Time:</span>
                <span class="info-value">${eventData.time}</span>
              </div>
              <div class="info-row">
                <span class="info-label">📍 Venue:</span>
                <span class="info-value">${eventData.venue}</span>
              </div>
              <div class="info-row">
                <span class="info-label">📂 Category:</span>
                <span class="info-value">${eventData.category}</span>
              </div>
            </div>
            ` : ''}

            <div class="section">
              <div class="section-title">Next Steps</div>
              <ol>
                <li>Your registration is now <strong>pending admin approval</strong></li>
                <li>You will receive an approval email once verified by our admin team</li>
                <li>After approval, you can log in with your credentials</li>
                <li>Access all university events and resources through your dashboard</li>
              </ol>
            </div>

            <p>If you have any questions or need to update your information, please contact our admissions office at <strong>admissions@university.edu</strong></p>

            <a href="http://localhost:5173" class="button">Visit University Portal</a>
          </div>

          <div class="footer">
            <p>&copy; 2024 Knowledge Nexus University. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

export const getApprovalEmailTemplate = (studentData) => {
  return {
    subject: `Account Approved - Welcome to Knowledge Nexus University`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 30px;
            background-color: white;
          }
          .credentials {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .credentials-title {
            font-weight: bold;
            color: #155724;
            margin-bottom: 10px;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Approved! 🎉</h1>
            <p>You're all set to start your journey</p>
          </div>

          <div class="content">
            <p>Dear <strong>${studentData.name}</strong>,</p>

            <p>Congratulations! Your account has been <strong>approved</strong> by our admin team. You can now log in and access all university resources.</p>

            <div class="credentials">
              <div class="credentials-title">Your Login Credentials:</div>
              <p><strong>Email:</strong> ${studentData.email}</p>
              <p><strong>Password:</strong> ${studentData.tempPassword}</p>
              <p style="color: #dc3545; margin-top: 15px;"><strong>⚠️ Important:</strong> Please change your password immediately after your first login for security.</p>
            </div>

            <p>You can now:</p>
            <ul>
              <li>Browse and register for upcoming events</li>
              <li>Access university news and announcements</li>
              <li>View your academic schedule</li>
              <li>Connect with other students</li>
            </ul>

            <a href="http://localhost:5173" class="button">Login Now</a>

            <p style="margin-top: 30px; color: #666;">If you have any questions, feel free to reach out to our support team.</p>
          </div>

          <div class="footer">
            <p>&copy; 2024 Knowledge Nexus University. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
