
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto p-4 flex items-center space-x-3">
        <LogoIcon className="h-10 w-10 text-blue-600" />
        <div>
          <h1 className="text-lg font-bold text-slate-800">
            AI Internship Advisor
          </h1>
          <p className="text-sm text-slate-500">
            PM Internship Scheme
          </p>
        </div>
      </div>
    </header>
  );
};
