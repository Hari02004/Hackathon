import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define AdmissionNumber schema and model inline
const admissionNumberSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    studentName: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true,
      enum: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Information Technology']
    },
    batch: {
      type: String,
      required: true
    },
    rollNumber: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    registeredEmail: {
      type: String,
      default: null
    },
    verifiedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

const AdmissionNumber = mongoose.model('AdmissionNumber', admissionNumberSchema);

const seedAdmissionNumbers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Sample admission data
    const sampleData = [
      {
        admissionNumber: 'ADM2024001',
        studentName: 'Hari Kumar',
        department: 'Computer Science',
        batch: '2024-2028',
        rollNumber: 'CS001'
      },
      {
        admissionNumber: 'ADM2024002',
        studentName: 'Priya Singh',
        department: 'Electronics',
        batch: '2024-2028',
        rollNumber: 'EC001'
      },
      {
        admissionNumber: 'ADM2024003',
        studentName: 'Rajesh Patel',
        department: 'Information Technology',
        batch: '2024-2028',
        rollNumber: 'IT001'
      },
      {
        admissionNumber: 'ADM2024004',
        studentName: 'Anjali Verma',
        department: 'Mechanical',
        batch: '2024-2028',
        rollNumber: 'ME001'
      },
      {
        admissionNumber: 'ADM2024005',
        studentName: 'Arjun Kumar',
        department: 'Electrical',
        batch: '2024-2028',
        rollNumber: 'EE001'
      },
      {
        admissionNumber: 'ADM2024006',
        studentName: 'Divya Sharma',
        department: 'Civil',
        batch: '2024-2028',
        rollNumber: 'CE001'
      },
      {
        admissionNumber: 'ADM2024007',
        studentName: 'Akshay Reddy',
        department: 'Computer Science',
        batch: '2024-2028',
        rollNumber: 'CS002'
      },
      {
        admissionNumber: 'ADM2024008',
        studentName: 'Neha Gupta',
        department: 'Information Technology',
        batch: '2024-2028',
        rollNumber: 'IT002'
      },
      {
        admissionNumber: 'ADM2024009',
        studentName: 'Vikas Nair',
        department: 'Electronics',
        batch: '2024-2028',
        rollNumber: 'EC002'
      },
      {
        admissionNumber: 'ADM2024010',
        studentName: 'Pooja Desai',
        department: 'Mechanical',
        batch: '2024-2028',
        rollNumber: 'ME002'
      }
    ];

    // Clear existing data
    await AdmissionNumber.deleteMany({});
    console.log('Cleared existing admission numbers');

    // Insert sample data
    const result = await AdmissionNumber.insertMany(sampleData);
    console.log(`✅ Successfully seeded ${result.length} admission numbers`);
    
    console.log('\n📋 Sample Admission Numbers:');
    sampleData.forEach(data => {
      console.log(`   ${data.admissionNumber} - ${data.studentName} (${data.department})`);
    });

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAdmissionNumbers();
