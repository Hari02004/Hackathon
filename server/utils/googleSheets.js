import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Sheets API
const sheets = google.sheets('v4');

export const initializeGoogleSheets = async () => {
  try {
    const keyFile = process.env.GOOGLE_SHEETS_KEY_FILE;
    if (!keyFile) {
      console.warn('⚠️  GOOGLE_SHEETS_KEY_FILE not set, Google Sheets disabled');
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    return auth;
  } catch (error) {
    console.error('❌ Error initializing Google Sheets:', error.message);
    console.warn('⚠️  Google Sheets functionality disabled');
    return null;
  }
};

export const appendToGoogleSheet = async (values) => {
  try {
    const auth = await initializeGoogleSheets();
    if (!auth) {
      console.warn('Google Sheets not configured, skipping sheet update');
      return { success: false, message: 'Google Sheets not configured' };
    }

    const request = {
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Registrations!A:H',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [values]
      },
      auth: auth
    };

    const response = await sheets.spreadsheets.values.append(request);

    return {
      success: true,
      message: 'Data added to Google Sheet successfully',
      response: response.data
    };
  } catch (error) {
    console.error('Error appending to Google Sheet:', error.message);
    return {
      success: false,
      message: 'Error adding data to Google Sheet',
      error: error.message
    };
  }
};

export const getGoogleSheetData = async () => {
  try {
    const auth = await initializeGoogleSheets();
    if (!auth) {
      return { success: false, data: [] };
    }

    const request = {
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Registrations!A:H',
      auth: auth
    };

    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values || [];

    return {
      success: true,
      data: rows.slice(1) // Skip header row
    };
  } catch (error) {
    console.error('Error reading Google Sheet:', error.message);
    return { success: false, data: [] };
  }
};
