import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    googleSheetsId: {
      type: String,
      default: process.env.GOOGLE_SHEETS_ID || ''
    },
    emailNotificationsEnabled: {
      type: Boolean,
      default: true
    },
    googleSheetsEnabled: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
