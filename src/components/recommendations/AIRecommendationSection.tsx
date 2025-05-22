
import React, { useState, useEffect } from 'react';
import { QuestionnaireData } from '@/components/questionnaire/QuestionnaireForm';
import { AIStyleRecommendation, getAIStyleRecommendations } from '@/services/aiStyleService';
import { Button } from '@/components/ui/button';
import { Brain, RefreshCw } from 'lucide-react';
import AIRecommendationCard from '../ai/AIRecommendationCard';
import { useToast } from '@/hooks/use-toast';

interface AIRecommendationSectionProps {
  formData: QuestionnaireData;
  outfits: Array<{
    id: string;
    title: string;
    imageUrl: string;
  }>;
}

const AIRecommendationSection = ({ formData, outfits }: AIRecommendationSectionProps) => {
  const [recommendations, setRecommendations] = useState<AIStyleRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const aiRecommendations = await getAIStyleRecommendations(formData);
      setRecommendations(aiRecommendations);
    } catch (error) {
      console.error("Failed to get AI recommendations:", error);
      toast({
        title: "Recommendation Error",
        description: "Failed to generate AI recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadRecommendations();
  }, [formData]);
  
  const regenerateRecommendations = () => {
    loadRecommendations();
    toast({
      title: "Regenerating Recommendations",
      description: "We're creating new personalized outfit suggestions for you.",
    });
  };
  
  // Match outfits with recommendations
  const recommendedOutfits = recommendations.map(rec => {
    const matchedOutfit = outfits.find(outfit => outfit.id === rec.outfitId);
    return {
      recommendation: rec,
      outfit: matchedOutfit || { id: rec.outfitId, title: "Outfit", imageUrl: "" }
    };
  });
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-styleklick-purple" />
          <h3 className="text-xl font-semibold">AI-Powered Style Matches</h3>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={regenerateRecommendations}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Regenerate</span>
            </>
          )}
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
          {[1, 2, 3].map((placeholder) => (
            <div 
              key={placeholder} 
              className="bg-gray-100 rounded-lg h-96 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedOutfits.slice(0, 3).map(({ recommendation, outfit }) => (
            <AIRecommendationCard 
              key={recommendation.outfitId}
              recommendation={recommendation}
              outfitImage={outfit.imageUrl}
              outfitTitle={outfit.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendationSection;
