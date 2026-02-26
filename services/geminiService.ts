import { GoogleGenAI, Type } from '@google/genai';
import type { UserProfile, Internship } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getInternshipRecommendations(profile: UserProfile): Promise<Internship[]> {
  try {
    if (!API_KEY) {
      throw new Error('Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your environment.');
    }

    const prompt = `
    Based on the following user profile, please recommend 3-4 fictional but realistic internships available through the Indian government's PM Internship Scheme. 
    
    User Profile:
    - Education: ${profile.education}
    - Skills: ${profile.skills}
    - Sector Interests: ${profile.interests.join(', ')}
    - Preferred Location: ${profile.location}

    For each internship, provide a title, a relevant government ministry or public sector organization, a location that matches the user's preference, and a short, simple, one-sentence explanation (reason) of why it's a good match.
  `;

    const ai = new GoogleGenAI({ apiKey: API_KEY });

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
      throw new Error('The AI model returned an empty response. Please try again.');
    }

    const result = JSON.parse(jsonString.trim());
    return result.recommendations || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch recommendations from AI model.');
  }
}
