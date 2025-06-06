

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import RecommendationHeader from './RecommendationHeader';
import RecommendationTabs from './RecommendationTabs';
import DetailedStyleView from './DetailedStyleView';
import CustomAICard from './CustomAICard';
import AIRecommendationSection from './AIRecommendationSection';
import { QuestionnaireData } from '@/components/questionnaire/QuestionnaireForm';
import { ThemeType } from '@/pages/RecommendationsPage';
import { useToast } from "@/hooks/use-toast";
import { mockOutfits } from './MockOutfitData';

interface RecommendationResultProps {
  formData: QuestionnaireData;
  activeTheme: ThemeType;
  setActiveTheme: (theme: ThemeType) => void;
  onSaveToLookbook: (outfitData: any) => void;
  showSingleCard?: boolean;
}

const RecommendationResult = ({ 
  formData, 
  activeTheme, 
  setActiveTheme, 
  onSaveToLookbook,
  showSingleCard = false 
}: RecommendationResultProps) => {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const { toast } = useToast();

  const currentOutfits = mockOutfits[activeTheme] || [];

  const mockRecommendation = {
    id: 'ai-suggestion-1',
    title: 'Perfect Fall Look',
    description: 'A curated outfit that matches your style preferences and the season.',
    outfitSuggestions: [
      'Layer a cozy sweater over a collared shirt for a polished yet comfortable look',
      'Pair high-waisted jeans with ankle boots to elongate your silhouette',
      'Add a statement scarf to bring warmth and visual interest to your outfit'
    ],
    poseIdeas: [
      { id: '1', title: 'Casual Walking Pose', description: 'Natural stride with hands in pockets' },
      { id: '2', title: 'Leaning Against Wall', description: 'Relaxed pose against urban backdrop' }
    ],
    styleMatch: 94,
    bodyTypeMatch: 91,
    confidence: 94,
    items: ['Wool sweater', 'High-waisted jeans', 'Ankle boots', 'Statement scarf'],
    source: 'ai'
  };

  const handleViewDetails = () => {
    toast({
      title: "Coming Soon!",
      description: "Detailed view will be available soon.",
    });
  };

  if (selectedOutfit) {
    return (
      <DetailedStyleView 
        recommendation={selectedOutfit} 
        onClose={() => setSelectedOutfit(null)}
        onAddToLookbook={() => onSaveToLookbook(selectedOutfit)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <RecommendationHeader formData={formData} />

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">AI Style Suggestion</h3>
        <CustomAICard 
          recommendation={mockRecommendation}
          onSaveToLookbook={onSaveToLookbook}
          onViewDetails={handleViewDetails}
        />
      </div>

      <RecommendationTabs
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        outfits={currentOutfits}
        onOutfitSelect={setSelectedOutfit}
        onSaveToLookbook={onSaveToLookbook}
        showSingleCard={showSingleCard}
      />

      <AIRecommendationSection formData={formData} outfits={currentOutfits} />
    </div>
  );
};

export default RecommendationResult;

