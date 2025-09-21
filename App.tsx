
import React, { useState, useCallback } from 'react';
import { InternshipForm } from './components/InternshipForm';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RecommendationCard } from './components/RecommendationCard';
import { getInternshipRecommendations } from './services/geminiService';
import type { UserProfile, Internship } from './types';
import { SECTOR_INTERESTS, EDUCATION_LEVELS } from './constants';
import { InfoIcon } from './components/icons/InfoIcon';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    education: EDUCATION_LEVELS[2],
    skills: '',
    interests: [],
    location: '',
  });
  const [recommendations, setRecommendations] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleProfileChange = useCallback(<K extends keyof UserProfile, V extends UserProfile[K]>(key: K, value: V) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleInterestChange = useCallback((interest: string) => {
    setProfile(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.skills.trim() === '' || profile.interests.length === 0 || profile.location.trim() === '') {
        setError('Please fill in all fields to get the best recommendations.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setShowIntro(false);

    try {
      const result = await getInternshipRecommendations(profile);
      setRecommendations(result);
    } catch (err) {
      console.error(err);
      setError('Sorry, we encountered an issue while generating recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Find Your Perfect Internship
          </h1>
          <p className="text-slate-600 mb-6">
            Tell us about yourself, and our AI will suggest the best opportunities for you from the PM Internship Scheme.
          </p>
          <InternshipForm 
            profile={profile} 
            onProfileChange={handleProfileChange} 
            onInterestChange={handleInterestChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && recommendations.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Your Top Internship Matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                  <RecommendationCard key={index} internship={rec} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && !error && recommendations.length === 0 && showIntro && (
             <div className="mt-8 text-center bg-blue-50 p-6 rounded-2xl border border-blue-200">
                <InfoIcon className="w-12 h-12 mx-auto text-blue-500 mb-3" />
                <h3 className="text-lg font-semibold text-slate-800">Welcome, Future Leader!</h3>
                <p className="text-slate-600 max-w-2xl mx-auto mt-1">
                    This tool is designed to help you discover internships that fit your unique talents and goals. Fill out the form above to get started on your career journey.
                </p>
             </div>
          )}

          {!isLoading && !error && recommendations.length === 0 && !showIntro && (
            <div className="text-center p-6 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">No Recommendations Found</h3>
                <p className="text-gray-500">We couldn't find any recommendations based on your input. Please try adjusting your preferences.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by the Ministry of Corporate Affairs</p>
      </footer>
    </div>
  );
};

export default App;
