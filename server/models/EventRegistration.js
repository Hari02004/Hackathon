import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    participantName: {
      type: String,
      required: true
    },
    participantEmail: {
      type: String,
      required: true,
      lowercase: true
    },
    participantPhone: {
      type: String,
      required: true
    },
    department: {
      type: String,
      default: ''
    },
    semester: {
      type: String,
      default: ''
    },
    year: {
      type: String,
      default: ''
    },
    admissionNumber: {
      type: String,
      default: ''
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'no-show', 'cancelled'],
      default: 'registered'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    checkedInAt: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Generate registration number before saving
eventRegistrationSchema.pre('save', async function(next) {
  if (!this.registrationNumber) {
    const count = await mongoose.model('EventRegistration').countDocuments();
    this.registrationNumber = `ER${Date.now()}${count}`;
  }
  next();
});

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

export default EventRegistration;
