import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    admissionNumber: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    batch: {
      type: String,
      required: true
    },
    eventTitle: {
      type: String,
      default: ''
    },
    eventDate: {
      type: Date,
      default: null
    },
    eventVenue: {
      type: String,
      default: ''
    },
    eventCategory: {
      type: String,
      default: ''
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Registration', registrationSchema);
