<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ID_byvQ0UE1LXaIyTqc2-s1fXiWYMGOY

## Run Locally

**Prerequisites:**  Node.js (version 14 or higher)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prashanth-kaki/AI-Internship-Advisor.git
   cd AI-Internship-Advisor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy the example environment file:
     ```bash
     cp .env.local.example .env
     ```
   - Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Open `.env` and replace `your_api_key_here` with your actual API key:
     ```
     GEMINI_API_KEY=your_actual_api_key
     ```

4. **Run the development server:**
   ```bash
   # Start the backend server (in one terminal)
   npm run server

   # Start the Vite dev server (in another terminal)
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

5. **Open your browser:**
   - Navigate to [http://localhost:5173/AI-Internship-Advisor/](http://localhost:5173/AI-Internship-Advisor/)
   - The app should now be running!

## Deploy to GitHub Pages

This repository is configured to automatically deploy to GitHub Pages.

### Setup Instructions

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push changes to your repository default branch or manually trigger the workflow
4. Your app will be available at: https://prashanth-kaki.github.io/AI-Internship-Advisor/

### How it works

- The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys the app
- The build is configured with the correct base URL in `vite.config.ts`
- Deployments happen automatically on pushes to the repository default branch

### Setting Up the API Key for Deployment

The API key is kept securely on the server side and is never exposed to the browser. Set the `GEMINI_API_KEY` environment variable on your hosting platform (e.g., Render, Railway, or your own server).

For local production deployment:
```bash
GEMINI_API_KEY=your_actual_api_key npm start
```


## Troubleshooting GitHub Pages blank screen

If the site shows a white screen, the most common cause is that GitHub Pages is serving source files instead of the Vite build output.

- In **Settings → Pages**, set **Source** to **GitHub Actions** (not Deploy from a branch).
- Ensure the deploy workflow has completed successfully after your latest push.
- The workflow is branch-name agnostic and deploys from whichever branch is configured as the repository default branch.

When Pages serves the repository root directly, `index.html` points to development entry files and the app will not render in production.
