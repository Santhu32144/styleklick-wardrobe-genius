
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
  onSaveToLookbook: () => void;
  onViewDetails: () => void;
}

const CustomAICard = ({ recommendation, onSaveToLookbook, onViewDetails }: CustomAICardProps) => {
  const getRecommendationImage = (recommendation: any) => {
    const styleImages = {
      'minimalist': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'casual': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'streetwear': 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'sporty': 'https://images.unsplash.com/photo-1593520126198-99a1272190e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    };

    return styleImages.casual;
  };

  // Add safe fallbacks for undefined data
  const outfitSuggestions = recommendation?.outfitSuggestions || [];
  const aiGeneratedPoses = recommendation?.poseIdeas || [];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full">
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
        <img
          src={getRecommendationImage(recommendation)}
          alt={recommendation?.title || "AI Style Suggestion"}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-600 text-white">
            AI Match {recommendation?.confidence || 95}%
          </Badge>
        </div>
        {recommendation?.source === 'chat' && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-600 text-white">
              Chat Suggestion
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-semibold text-xl mb-2">{recommendation?.title || "AI Style Suggestion"}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {recommendation?.description || "A personalized style recommendation based on your preferences and current trends."}
        </p>
        
        <OutfitSuggestions suggestions={outfitSuggestions} />
        
        <PoseIdeas poses={aiGeneratedPoses} />
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span>Style Match</span>
            <span className="font-medium">{recommendation?.styleMatch || 92}%</span>
          </div>
          <Progress value={recommendation?.styleMatch || 92} className="h-1" />
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant="outline"
            onClick={onSaveToLookbook}
          >
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button 
            className="flex-1" 
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomAICard;
