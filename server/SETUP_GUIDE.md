# 🎓 KNU University Backend - Complete Setup

## ✅ BACKEND CREATED SUCCESSFULLY!

Your complete backend system has been created with all necessary files and configurations.

---

## 📁 What Was Created

### **Folder Structure**
```
hackathon/server/
├── config/
│   └── db.js                    # MongoDB connection
├── models/
│   ├── User.js                  # User schema with approval system
│   ├── News.js                  # News articles schema
│   ├── Event.js                 # Events schema
│   └── EmailLog.js              # Email tracking schema
├── controllers/
│   ├── authController.js        # Auth logic (register, login)
│   ├── adminController.js       # Admin dashboard logic
│   ├── newsController.js        # News CRUD operations
│   └── eventController.js       # Event CRUD operations
├── routes/
│   ├── auth.js                  # Auth endpoints
│   ├── admin.js                 # Admin endpoints
│   ├── news.js                  # News endpoints
│   └── events.js                # Event endpoints
├── middleware/
│   ├── auth.js                  # JWT authentication
│   └── errorHandler.js          # Global error handler
├── utils/
│   ├── tokenUtils.js            # JWT & password utilities
│   └── emailService.js          # Email sending service
├── server.js                    # Main server file
├── package.json                 # Dependencies
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore file
└── README.md                    # Documentation
```

---

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
cd server
npm install
```

This will install:
- ✅ Express.js
- ✅ Mongoose (MongoDB)
- ✅ bcryptjs (password hashing)
- ✅ jsonwebtoken (JWT)
- ✅ nodemailer (emails)
- ✅ And more...

### Step 2: Configure MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/knu-university
```

**Option B: Local MongoDB**
```bash
# Install MongoDB locally
# Update .env:
MONGODB_URI=mongodb://localhost:27017/knu-university
```

### Step 3: Configure Email Service

**Gmail Setup (Recommended)**
1. Enable 2-factor authentication on Gmail
2. Create App Password (not regular password)
3. Update `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Step 4: Set JWT Secret

Update `.env`:
```
JWT_SECRET=your-super-secret-key-change-in-production
```

### Step 5: Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB Connected Successfully!
✅ Server running on port 5000
```

---

## 📊 System Features

### ✅ User Registration System
- Students register with email + admission number
- Registration waits for admin approval
- Status: pending → approved → can login

### ✅ Admin Approval Panel
- View pending student registrations
- Approve or reject students
- Automatically send credentials via email
- Add/Edit/Delete users manually

### ✅ Authentication System
- Student login: Email + Password
- Admin login: Admission Number + Password
- JWT token-based (7-day expiration)
- Password hashing with bcryptjs

### ✅ Email Notifications
- Send credentials after approval
- Automatic emails from admin system
- Professional HTML templates
- Email tracking/logging

### ✅ News Management
- Create/Read/Update/Delete news (admin only)
- Categorize news
- Mark featured news
- Track views & likes
- Public access without login

### ✅ Events Management
- Create/Read/Update/Delete events (admin only)
- Event registration for students
- Capacity management
- Event filtering by status/category
- Public access without login

### ✅ Role-Based Access Control
- **Public**: View news, events
- **Student**: Register, dashboard, profile
- **Admin**: Manage everything

---

## 🔑 Admin Credentials

Default admin login (for testing):
```
Admission Number: ADM0000
Password: admin123
```

⚠️ **Change these in production!**

---

## 📍 API Base URL

```
http://localhost:5000/api
```

### Example Requests

**Student Registration:**
```bash
POST http://localhost:5000/api/auth/student-register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "admissionNumber": "ADM2024001",
  "phone": "9876543210",
  "department": "Computer Science",
  "batch": "2024"
}
```

**Student Login:**
```bash
POST http://localhost:5000/api/auth/student-login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "TempPass@2024"
}
```

**Admin Approve Student:**
```bash
POST http://localhost:5000/api/admin/approve-student/[userId]
Headers: Authorization: Bearer [token]
```

---

## 🔌 Frontend Integration

Update your frontend to use the API:

**Example: Login in React**
```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/student-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    // Redirect to dashboard
  }
};
```

**Example: Protected API Call**
```javascript
const getNews = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/news', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

---

## 🧪 Testing with Postman/Insomnia

1. Import the API base URL: `http://localhost:5000/api`
2. Test endpoints:
   - Register student
   - Login (student & admin)
   - Approve student
   - Get news
   - Create event

---

## 📝 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Set up MongoDB (Atlas or local)
3. ✅ Configure email service
4. ✅ Update `.env` file
5. ✅ Start server: `npm run dev`
6. ✅ Update frontend to use API
7. ✅ Test all endpoints
8. ✅ Deploy when ready

---

## 🚀 Deployment

For production:

1. **Set environment variables** on hosting platform
2. **Use MongoDB Atlas** (not local)
3. **Change JWT_SECRET** to strong random string
4. **Update FRONTEND_URL** to production domain
5. **Use proper email service** (not personal Gmail)
6. **Enable HTTPS** on frontend URL
7. **Deploy to** Railway, Render, Heroku, etc.

---

## ⚠️ Important Reminders

- ✅ Don't commit `.env` file
- ✅ Change default admin password
- ✅ Use strong JWT secret
- ✅ Configure email properly
- ✅ Test all endpoints before deploying
- ✅ Monitor email sending logs

---

## 📞 Troubleshooting

### MongoDB Connection Error
- Check MONGODB_URI in .env
- Ensure MongoDB is running (if local)
- Verify network access (if Atlas)

### Email Not Sending
- Verify EMAIL_USER and EMAIL_PASSWORD
- Check 2FA and App Password setup
- Test with console logs

### JWT Errors
- Ensure JWT_SECRET is set
- Check token expiration (7 days)
- Verify Authorization header format

---

## ✨ System is Ready!

Your complete backend is now set up and ready to:
- ✅ Accept student registrations
- ✅ Admin approvals
- ✅ Send credentials via email
- ✅ Authenticate users
- ✅ Manage news & events
- ✅ Track user activities

**Start the server and begin testing!** 🚀

---

Built with ❤️ for Knowledge Nexus University
