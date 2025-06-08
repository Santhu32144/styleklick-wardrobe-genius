
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart } from 'lucide-react';
import OutfitSuggestions from './OutfitSuggestions';
import PoseIdeas from './PoseIdeas';

interface CustomAICardProps {
  recommendation: any;
  onSaveToLookbook: (outfitData: any) => void;
  onViewDetails: () => void;
}

const CustomAICard = ({ recommendation, onSaveToLookbook, onViewDetails }: CustomAICardProps) => {
  const getRecommendationImage = (recommendation: any) => {
    const styleImages = {
      'ai-suggestion-1': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'ai-suggestion-2': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'ai-suggestion-3': 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'ai-suggestion-4': 'https://images.unsplash.com/photo-1593520126198-99a1272190e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    };

    return styleImages[recommendation?.id] || styleImages['ai-suggestion-1'];
  };

  const outfitSuggestions = recommendation?.outfitSuggestions || [];
  const aiGeneratedPoses = recommendation?.poseIdeas || [];

  const handleSave = () => {
    const outfitData = {
      title: recommendation?.title || "AI Style Suggestion",
      description: recommendation?.description || "A personalized style recommendation based on your preferences and current trends.",
      image: getRecommendationImage(recommendation),
      outfitSuggestions,
      poseIdeas: aiGeneratedPoses,
      styleMatch: recommendation?.styleMatch || 92,
      tags: ['ai-suggestion', 'saved']
    };
    
    onSaveToLookbook(outfitData);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
        <img
          src={getRecommendationImage(recommendation)}
          alt={recommendation?.title || "AI Style Suggestion"}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {recommendation?.source === 'ai' && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              AI Generated
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2">{recommendation?.title || "AI Style Suggestion"}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {recommendation?.description || "A personalized style recommendation based on your preferences and current trends."}
        </p>
        
        <OutfitSuggestions suggestions={outfitSuggestions} />
        
        <PoseIdeas poses={aiGeneratedPoses} />
        
        <div className="space-y-2 mb-4 mt-auto">
          <div className="flex justify-between text-xs">
            <span>Style Match</span>
            <span className="font-medium">{recommendation?.styleMatch || 92}%</span>
          </div>
          <Progress value={recommendation?.styleMatch || 92} className="h-2" />
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant="outline"
            onClick={handleSave}
            size="sm"
          >
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button 
            className="flex-1" 
            onClick={onViewDetails}
            size="sm"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomAICard;
