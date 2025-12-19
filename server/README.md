# KNU University Backend

Complete backend system for Knowledge Nexus University website.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update:
- MongoDB URI
- JWT Secret
- Email credentials
- Frontend URL

### 3. Run Development Server
```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 📁 Project Structure

```
server/
├── config/          # Configuration files
├── models/          # MongoDB schemas
├── controllers/     # Business logic
├── routes/          # API routes
├── middleware/      # Express middleware
├── utils/           # Utility functions
├── server.js        # Main entry point
└── package.json     # Dependencies
```

---

## 🔑 Key Features

✅ User Registration & Authentication
✅ Admin Approval System
✅ Email Notifications
✅ News & Events Management
✅ Event Registration
✅ Role-Based Access Control
✅ JWT Token Authentication

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/student-register` - Register new student
- `POST /api/auth/student-login` - Login student
- `POST /api/auth/admin-login` - Login admin
- `GET /api/auth/me` - Get current user

### Admin (Protected)
- `GET /api/admin/dashboard-stats` - Get statistics
- `GET /api/admin/pending-approvals` - View pending students
- `GET /api/admin/approved-students` - View approved students
- `POST /api/admin/approve-student/:userId` - Approve student
- `POST /api/admin/reject-student/:userId` - Reject student
- `POST /api/admin/add-user` - Add new user
- `PUT /api/admin/edit-user/:userId` - Edit user
- `DELETE /api/admin/delete-user/:userId` - Delete user

### News
- `GET /api/news` - Get all news (public)
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)
- `POST /api/news/:id/like` - Like news (student)

### Events
- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- `POST /api/events/:id/register` - Register for event
- `POST /api/events/:id/unregister` - Unregister from event

---

## 🔐 Authentication Flow

### Student Registration → Approval → Login

1. Student registers with email, admission number
2. Admin reviews pending registrations
3. Admin approves student
4. Email with credentials is sent automatically
5. Student logs in with email + password
6. JWT token is generated for future requests

### Admin Login

- Admins login with admission number + password
- Separate admin-only endpoints are accessible
- Can manage students, news, events

---

## 📧 Email Configuration

Uses NodeMailer with Gmail. To set up:

1. Enable 2-factor authentication on Gmail
2. Generate App Password
3. Use App Password as EMAIL_PASSWORD in .env

---

## 🗄️ MongoDB Collections

### Users
- name, email, admissionNumber, password
- role (student/admin/faculty)
- status (pending/approved/rejected)
- timestamps

### News
- title, description, content
- category, author, image
- views, likes, featured
- timestamps

### Events
- title, description, date, time
- venue, category, status
- registrations[], speakers[]
- timestamps

### EmailLogs
- recipientEmail, subject, type
- status (sent/failed), sentBy
- timestamps

---

## ⚙️ Setup Instructions

### With MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection URI
4. Update MONGODB_URI in .env

### With Local MongoDB

```bash
# Install MongoDB
# Run mongod
# Update MONGODB_URI
MONGODB_URI=mongodb://localhost:27017/knu-university
```

---

## 🧪 Testing Credentials

### Admin
```
Admission Number: ADM0000
Password: admin123
```

### Test Student (After Approval)
```
Email: (registered email)
Password: (sent via email after approval)
```

---

## 📦 Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- nodemailer - Email service
- cors - Cross-origin requests
- helmet - Security headers
- morgan - HTTP logging

---

## 🚨 Important Notes

1. **JWT_SECRET**: Change in production
2. **Email Setup**: Configure Gmail App Password
3. **FRONTEND_URL**: Update for your frontend domain
4. **MongoDB**: Use Atlas or local instance
5. **Admin Account**: Create before launching

---

## 🔄 Deployment

For production deployment, update:
- NODE_ENV=production
- MONGODB_URI (production database)
- JWT_SECRET (strong, random)
- EMAIL_USER & EMAIL_PASSWORD
- FRONTEND_URL (production domain)

---

## 📞 Support

For issues or questions, check the error logs and ensure:
- MongoDB is connected
- Email credentials are correct
- JWT_SECRET is set
- Environment variables are loaded

---

Built with ❤️ for Knowledge Nexus University
