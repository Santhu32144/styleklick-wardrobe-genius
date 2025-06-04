
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Camera, Sparkles } from 'lucide-react';

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

  // AI-generated outfit suggestions in row format
  const outfitSuggestions = [
    "Wear a classic white cotton t-shirt with dark blue jeans and finish with a denim jacket for a timeless casual look",
    "Try a soft knit sweater paired with black leggings and layer with a long cardigan for comfort and style",
    "Go for a striped long-sleeve shirt with khaki chinos and add a baseball cap for a relaxed weekend vibe",
    "Combine a fitted blouse with high-waisted trousers and accessorize with a statement necklace for elevated casual"
  ];

  // AI-generated pose ideas
  const aiGeneratedPoses = [
    {
      name: "Natural Confidence",
      description: "Stand with one hand casually in your pocket, slight smile, looking directly at camera",
      caption: "Effortless confidence that showcases your outfit naturally"
    },
    {
      name: "Relaxed Lean",
      description: "Lean against a wall or surface with arms crossed loosely, gentle expression",
      caption: "Casual and approachable while highlighting your style choices"
    },
    {
      name: "Dynamic Movement",
      description: "Mid-walk pose with natural arm swing, looking ahead with purpose",
      caption: "Action shot that captures your outfit in real-life motion"
    },
    {
      name: "Thoughtful Pause",
      description: "Sitting position with one hand touching face thoughtfully, relaxed posture",
      caption: "Contemplative pose that shows both personality and outfit details"
    }
  ];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full">
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
        <img
          src={getRecommendationImage(recommendation)}
          alt={recommendation.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-600 text-white">
            AI Match {recommendation.confidence || 95}%
          </Badge>
        </div>
        {recommendation.source === 'chat' && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-600 text-white">
              Chat Suggestion
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-semibold text-xl mb-2">{recommendation.title || "AI Style Suggestion"}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {recommendation.description || "A personalized style recommendation based on your preferences and current trends."}
        </p>
        
        {/* AI Outfit Suggestions in Rows */}
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-3 flex items-center">
            <Sparkles className="h-4 w-4 mr-1" />
            AI Outfit Suggestions
          </h4>
          <div className="space-y-3">
            {outfitSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border-l-4 border-purple-300">
                <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Generated Pose Ideas Section */}
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <Camera className="h-4 w-4 mr-1" />
            AI Pose Ideas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {aiGeneratedPoses.map((pose, index) => (
              <div key={index} className="bg-pink-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-3 w-3 text-pink-500" />
                  <span className="font-medium text-xs">{pose.name}</span>
                </div>
                <p className="text-xs text-gray-600">{pose.description}</p>
                <p className="text-xs text-pink-600 mt-1 italic">"{pose.caption}"</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span>Style Match</span>
            <span className="font-medium">{recommendation.styleMatch || 92}%</span>
          </div>
          <Progress value={recommendation.styleMatch || 92} className="h-1" />
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
