
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CategorySelector from '../components/style-recommendations/CategorySelector';
import OutfitSuggestionsList from '../components/style-recommendations/OutfitSuggestionsList';
import OutfitDetailedView from '../components/style-recommendations/OutfitDetailedView';

export type StyleCategory = 'fall' | 'adventure' | 'urban';

export interface OutfitSuggestion {
  id: string;
  name: string;
  description: string;
  category: StyleCategory;
}

const StyleRecommendationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory>('fall');
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(null);

  const handleCategorySelect = (category: StyleCategory) => {
    setSelectedCategory(category);
    setSelectedOutfit(null); // Clear selected outfit when changing category
  };

  const handleOutfitSelect = (outfit: OutfitSuggestion) => {
    setSelectedOutfit(outfit);
  };

  const handleBackToList = () => {
    setSelectedOutfit(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Style Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your perfect style with our curated outfit suggestions
            </p>
          </div>

          <CategorySelector
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          <div className="mt-8">
            {selectedOutfit ? (
              <OutfitDetailedView
                outfit={selectedOutfit}
                onBack={handleBackToList}
              />
            ) : (
              <OutfitSuggestionsList
                category={selectedCategory}
                onOutfitSelect={handleOutfitSelect}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StyleRecommendationsPage;
