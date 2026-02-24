import type { UserProfile, Internship } from '../types';

export async function getInternshipRecommendations(profile: UserProfile): Promise<Internship[]> {
  try {
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        education: profile.education,
        skills: profile.skills,
        interests: profile.interests,
        location: profile.location,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Failed to fetch recommendations. Please try again.');
    }

    const recommendations: Internship[] = await response.json();
    return recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch recommendations from AI model.');
  }
}
