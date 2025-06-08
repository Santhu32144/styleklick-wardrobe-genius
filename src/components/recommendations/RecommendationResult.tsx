
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import RecommendationHeader from './RecommendationHeader';
// import RecommendationTabs from './RecommendationTabs';
import DetailedStyleView from './DetailedStyleView';
import CustomAICard from './CustomAICard';
// import AIRecommendationSection from './AIRecommendationSection';
import { QuestionnaireData } from '@/components/questionnaire/QuestionnaireForm';
import { ThemeType } from '@/pages/RecommendationsPage';
import { useToast } from "@/hooks/use-toast";

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

  // 4 AI outfit suggestions with pose ideas and captions
  const aiRecommendations = [
    {
      id: 'ai-suggestion-1',
      title: 'Chic Fall Layers',
      description: 'Perfect layered look combining comfort with elegance for autumn days.',
      outfitSuggestions: [
        'Layer a soft cashmere sweater over a crisp white button-down',
        'Pair with high-waisted wide-leg trousers for a sophisticated silhouette',
        'Add ankle boots with a slight heel for comfort and style',
        'Finish with a structured blazer and delicate gold jewelry'
      ],
      poseIdeas: [
        { name: 'Confident Stride', description: 'Walking naturally with hands in blazer pockets', caption: 'Effortless elegance in motion' },
        { name: 'Casual Lean', description: 'Leaning against a brick wall with one foot crossed', caption: 'Relaxed sophistication' }
      ],
      styleMatch: 94,
      source: 'ai'
    },
    {
      id: 'ai-suggestion-2',
      title: 'Modern Minimalist',
      description: 'Clean lines and neutral tones for a timeless, sophisticated appearance.',
      outfitSuggestions: [
        'Choose a tailored midi dress in a neutral tone like beige or soft gray',
        'Add a structured coat or long cardigan for dimension',
        'Wear sleek pointed-toe flats or low-heeled mules',
        'Accessorize with a minimalist watch and small crossbody bag'
      ],
      poseIdeas: [
        { name: 'Profile Grace', description: 'Standing in profile with hands clasped behind back', caption: 'Timeless elegance captured' },
        { name: 'Window Light', description: 'Sitting by a large window with natural lighting', caption: 'Soft and sophisticated' }
      ],
      styleMatch: 91,
      source: 'ai'
    },
    {
      id: 'ai-suggestion-3',
      title: 'Street Style Edge',
      description: 'Contemporary urban look with personality and flair for city adventures.',
      outfitSuggestions: [
        'Start with high-waisted mom jeans in a classic blue wash',
        'Layer a fitted crop top under an oversized denim jacket',
        'Add chunky white sneakers for comfort and street appeal',
        'Complete with a baseball cap and small backpack or fanny pack'
      ],
      poseIdeas: [
        { name: 'Urban Explorer', description: 'Walking with purpose down a city street', caption: 'City vibes and confidence' },
        { name: 'Casual Squat', description: 'Crouching down with elbows on knees', caption: 'Street style meets comfort' }
      ],
      styleMatch: 88,
      source: 'ai'
    },
    {
      id: 'ai-suggestion-4',
      title: 'Romantic Bohemian',
      description: 'Flowing fabrics and earthy tones for a dreamy, artistic aesthetic.',
      outfitSuggestions: [
        'Choose a flowing maxi dress with floral or paisley patterns',
        'Layer with a cropped denim jacket or lightweight kimono',
        'Wear strappy sandals or ankle boots depending on the season',
        'Add layered necklaces, bangles, and a wide-brim hat'
      ],
      poseIdeas: [
        { name: 'Field Dreamer', description: 'Twirling in an open field with arms extended', caption: 'Free-spirited and joyful' },
        { name: 'Sunset Silhouette', description: 'Standing against golden hour light', caption: 'Dreamy and romantic vibes' }
      ],
      styleMatch: 92,
      source: 'ai'
    }
  ];

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <RecommendationHeader formData={formData} />

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center gradient-heading">
            Your Personalized Style Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {aiRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="w-full">
                <CustomAICard 
                  recommendation={recommendation}
                  onSaveToLookbook={onSaveToLookbook}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Commented out for later use - can be added back when needed */}
        {/* 
        <RecommendationTabs
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
          outfits={currentOutfits}
          onOutfitSelect={setSelectedOutfit}
          onSaveToLookbook={onSaveToLookbook}
          showSingleCard={showSingleCard}
        />

        <AIRecommendationSection formData={formData} outfits={currentOutfits} />
        */}
      </div>
    </div>
  );
};

export default RecommendationResult;
