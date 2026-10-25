// Configuration for Google Sheets Waitlist Integration
// Option 1: Set VITE_GOOGLE_SHEET_URL in your .env or Vercel Environment Variables.
// Option 2: Paste your Google Apps Script Web App URL directly in the quotes below.

export const GOOGLE_SHEET_URL = 
  import.meta.env.VITE_GOOGLE_SHEET_URL || 
  "";
