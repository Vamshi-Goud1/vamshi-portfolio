# Environment Setup for Vamshi's Portfolio

## Gemini AI API Key Setup

### For Development:
The API key is already configured in the `.env` file for local development.

### For Production Deployment:

1. **Create a `.env` file** in the root directory with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

2. **For Vercel Deployment:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add a new variable:
     - Name: `VITE_GEMINI_API_KEY`
     - Value: `your_actual_gemini_api_key_here`
     - Environment: Production, Preview, Development

3. **For Netlify Deployment:**
   - Go to your Netlify dashboard
   - Select your site
   - Go to Site settings > Environment variables
   - Add a new variable:
     - Name: `VITE_GEMINI_API_KEY`
     - Value: `your_actual_gemini_api_key_here`

4. **For other platforms:**
   - Set the environment variable `VITE_GEMINI_API_KEY` with your Gemini API key
   - Make sure the variable is available during build time

## Current API Key
The current API key in the code is: `AIzaSyAbUeE68bjyxUVbc-Exulifq1FYnAMHGUc`

## Security Note
- Never commit your actual API key to version control
- Use environment variables for production deployments
- The fallback key in the code is for development purposes only

## Chatbot Features
- AI-powered responses about Vamshi's experience and skills
- Uses Gemini 1.5 Flash model
- Includes comprehensive resume context
- Pre-configured base questions for easy interaction
- Responsive design matching the portfolio theme

