import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// Serve static frontend files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable. Set it in your .env file.');
  }
  return apiKey;
}

app.post('/api/recommendations', apiLimiter, async (req, res) => {
  try {
    const { education, skills, interests, location } = req.body;

    if (!education || !skills || !interests || !Array.isArray(interests) || interests.length === 0 || !location) {
      return res.status(400).json({ error: 'Please provide all required fields: education, skills, interests, and location.' });
    }

    const prompt = `
    Based on the following user profile, please recommend 3-4 fictional but realistic internships available through the Indian government's PM Internship Scheme. 
    
    User Profile:
    - Education: ${education}
    - Skills: ${skills}
    - Sector Interests: ${interests.join(', ')}
    - Preferred Location: ${location}

    For each internship, provide a title, a relevant government ministry or public sector organization, a location that matches the user's preference, and a short, simple, one-sentence explanation (reason) of why it's a good match.
  `;

    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: 'A list of 3 to 4 internship recommendations.',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'The title of the internship.',
                  },
                  organization: {
                    type: Type.STRING,
                    description: 'The name of the organization or ministry offering the internship.',
                  },
                  location: {
                    type: Type.STRING,
                    description: 'The location of the internship.',
                  },
                  reason: {
                    type: Type.STRING,
                    description: 'A simple, one-sentence explanation for why this is a good match for the user.',
                  },
                },
              },
            },
          },
        },
      },
    });

    const jsonString = response.text;

    if (!jsonString) {
      return res.status(500).json({ error: 'The AI model returned an empty response. Please try again.' });
    }

    const result = JSON.parse(jsonString.trim());
    res.json(result.recommendations || []);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch recommendations from AI model.';
    res.status(500).json({ error: message });
  }
});

// Fallback: serve the frontend for any non-API routes (SPA support)
app.get('/{*splat}', apiLimiter, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
