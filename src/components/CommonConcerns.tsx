import React from 'react';
import { type CommonConcern } from './index.ts';

interface CommonConcernsProps {
  concerns: CommonConcern[];
  onSelectConcern: (concern: CommonConcern) => void;
}

const CommonConcerns: React.FC<CommonConcernsProps> = ({ concerns, onSelectConcern }) => {
  return (
    <div className="bg-blue-50 rounded-2xl p-6 mb-4 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Common Concerns</h2>
      <div className="space-y-3">
        {concerns.map((concern) => (
          <button
            key={concern.id}
            onClick={() => onSelectConcern(concern)}
            className="flex items-center w-full p-3 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <span className="text-2xl mr-3" role="img" aria-label={concern.label}>
              {concern.icon}
            </span>
            <span className="text-gray-700 font-medium">{concern.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommonConcerns;