import mongoose from 'mongoose';

const deletedAdmissionSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      uppercase: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    deletedAt: {
      type: Date,
      default: Date.now
    },
    reason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const DeletedAdmission = mongoose.model('DeletedAdmission', deletedAdmissionSchema);

export default DeletedAdmission;
