
import React from 'react';
import { Sparkles } from 'lucide-react';

interface OutfitSuggestionsProps {
  suggestions: string[];
}

const OutfitSuggestions = ({ suggestions }: OutfitSuggestionsProps) => {
  // Add null check and fallback
  const safeSuggestions = suggestions && Array.isArray(suggestions) ? suggestions : [];

  if (safeSuggestions.length === 0) {
    return (
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-1" />
          AI Outfit Suggestions
        </h4>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border-l-4 border-purple-300">
          <p className="text-sm text-gray-700 leading-relaxed">Loading outfit suggestions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h4 className="font-medium text-sm mb-3 flex items-center">
        <Sparkles className="h-4 w-4 mr-1" />
        AI Outfit Suggestions
      </h4>
      <div className="space-y-3">
        {safeSuggestions.map((suggestion, index) => (
          <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border-l-4 border-purple-300">
            <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitSuggestions;
