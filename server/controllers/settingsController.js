import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await Settings.create({
        googleSheetsId: process.env.GOOGLE_SHEETS_ID || '',
        emailNotificationsEnabled: true,
        googleSheetsEnabled: false
      });
    }
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { googleSheetsId, emailNotificationsEnabled, googleSheetsEnabled } = req.body;
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings();
    }
    
    if (googleSheetsId !== undefined) settings.googleSheetsId = googleSheetsId;
    if (emailNotificationsEnabled !== undefined) settings.emailNotificationsEnabled = emailNotificationsEnabled;
    if (googleSheetsEnabled !== undefined) settings.googleSheetsEnabled = googleSheetsEnabled;
    
    await settings.save();
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
