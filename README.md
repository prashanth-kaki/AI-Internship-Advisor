<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ID_byvQ0UE1LXaIyTqc2-s1fXiWYMGOY

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `VITE_GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repository is configured to automatically deploy to GitHub Pages.

### Setup Instructions

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push changes to the `main` branch or manually trigger the workflow
4. Your app will be available at: https://prashanth-kaki.github.io/AI-Internship-Advisor/

### How it works

- The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys the app
- The build is configured with the correct base URL in `vite.config.ts`
- Deployments happen automatically on every push to the `main` branch

### Important Note about API Key

⚠️ **Security Notice**: The current implementation requires a Gemini API key to be embedded at build time, which is not recommended for public deployments as it exposes the API key in client-side code. 

For the GitHub Pages deployment to work with API functionality, you would need to:
1. Add `GEMINI_API_KEY` as a repository secret in GitHub Settings → Secrets and variables → Actions
2. Update the workflow to pass the secret to the build step (not recommended for public repos)

**Better alternatives for production:**
- Implement a backend API that securely handles the Gemini API calls
- Use a different authentication method that doesn't expose keys
- For now, the site will deploy successfully but the AI recommendations feature will require users to run locally with their own API key
