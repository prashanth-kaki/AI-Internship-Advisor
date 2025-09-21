
import React from 'react';
import type { UserProfile } from '../types';
import { EDUCATION_LEVELS, SECTOR_INTERESTS } from '../constants';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { WrenchIcon } from './icons/WrenchIcon';
import { HeartIcon } from './icons/HeartIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface InternshipFormProps {
  profile: UserProfile;
  onProfileChange: <K extends keyof UserProfile, V extends UserProfile[K]>(key: K, value: V) => void;
  onInterestChange: (interest: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const FormField: React.FC<{ label: string; icon: React.ReactNode; children: React.ReactNode }> = ({ label, icon, children }) => (
  <div>
    <label className="flex items-center text-md font-semibold text-slate-700 mb-2">
      {icon}
      {label}
    </label>
    {children}
  </div>
);

export const InternshipForm: React.FC<InternshipFormProps> = ({ profile, onProfileChange, onInterestChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Highest Education" icon={<GraduationCapIcon className="w-5 h-5 mr-2 text-slate-500" />}>
          <select
            value={profile.education}
            onChange={(e) => onProfileChange('education', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {EDUCATION_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Preferred Location" icon={<MapPinIcon className="w-5 h-5 mr-2 text-slate-500" />}>
          <input
            type="text"
            placeholder="e.g., Delhi, Rural Bihar"
            value={profile.location}
            onChange={(e) => onProfileChange('location', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </FormField>
      </div>

      <FormField label="Your Skills" icon={<WrenchIcon className="w-5 h-5 mr-2 text-slate-500" />}>
        <input
          type="text"
          placeholder="e.g., Data Analysis, Public Speaking, Java"
          value={profile.skills}
          onChange={(e) => onProfileChange('skills', e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </FormField>

      <FormField label="Sector Interests" icon={<HeartIcon className="w-5 h-5 mr-2 text-slate-500" />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SECTOR_INTERESTS.map(interest => (
            <label key={interest} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${profile.interests.includes(interest) ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-50 border-slate-300 hover:border-slate-400'}`}>
              <input
                type="checkbox"
                checked={profile.interests.includes(interest)}
                onChange={() => onInterestChange(interest)}
                className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span className="text-sm font-medium">{interest}</span>
            </label>
          ))}
        </div>
      </FormField>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding Internships...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Find My Internships
            </>
          )}
        </button>
      </div>
    </form>
  );
};
