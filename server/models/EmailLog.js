import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema(
  {
    recipientEmail: {
      type: String,
      required: true
    },
    recipientName: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['credentials', 'approval', 'rejection', 'newsletter', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['sent', 'failed', 'pending'],
      default: 'sent'
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    error: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

emailLogSchema.index({ recipientEmail: 1 });
emailLogSchema.index({ type: 1 });
emailLogSchema.index({ createdAt: -1 });

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

export default EmailLog;
