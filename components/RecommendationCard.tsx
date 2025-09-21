
import React from 'react';
import type { Internship } from '../types';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface RecommendationCardProps {
  internship: Internship;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ internship }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{internship.title}</h3>
        
        <div className="space-y-3 text-slate-600 text-sm">
          <div className="flex items-start">
            <BuildingOfficeIcon className="w-5 h-5 mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
            <p><span className="font-semibold">Organization:</span> {internship.organization}</p>
          </div>
          <div className="flex items-start">
            <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
            <p><span className="font-semibold">Location:</span> {internship.location}</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
           <div className="flex items-start">
             <CheckCircleIcon className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
             <div>
                <p className="text-sm font-semibold text-green-800">Why it's a good match:</p>
                <p className="text-sm text-green-700">{internship.reason}</p>
             </div>
           </div>
        </div>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-xl">
        <a 
          href="https://pminternship.mca.gov.in/login/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full block text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};
