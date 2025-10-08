// Gemini AI Configuration
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAbUeE68bjyxUVbc-Exulifq1FYnAMHGUc';

// Fallback API key for development (replace with your actual key in production)
export const FALLBACK_API_KEY = 'AIzaSyAbUeE68bjyxUVbc-Exulifq1FYnAMHGUc';

// Get the API key with fallback
export const getGeminiApiKey = () => {
  return GEMINI_API_KEY || FALLBACK_API_KEY;
};

