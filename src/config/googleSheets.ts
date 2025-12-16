// Google Sheets configuration
// Uses environment variable with fallback to default sheet ID for public menu data
export const GOOGLE_SHEETS_CONFIG = {
  menuSheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID || '1c5ESQsb_ZLBi3djs-CK1UjY_ms7yVUV6UVlCKg9TqKQ'
};
