import mongoose from 'mongoose';

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

export default mongoose.model('AdmissionNumber', admissionNumberSchema);
