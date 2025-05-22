
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AIStyleRecommendation } from '@/services/aiStyleService';
import { Brain } from 'lucide-react';

interface AIRecommendationCardProps {
  recommendation: AIStyleRecommendation;
  outfitImage: string;
  outfitTitle: string;
}

const AIRecommendationCard = ({ recommendation, outfitImage, outfitTitle }: AIRecommendationCardProps) => {
  const { matchScore, features, explanation } = recommendation;
  
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img 
          src={outfitImage} 
          alt={outfitTitle}
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-styleklick-purple/90 text-white flex items-center gap-1">
            <Brain size={12} />
            <span>AI Match {matchScore}%</span>
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          {outfitTitle}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{explanation}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Body Type Match</span>
            <span className="font-medium">{features.bodyTypeMatch}%</span>
          </div>
          <Progress value={features.bodyTypeMatch} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span>Color Harmony</span>
            <span className="font-medium">{features.colorHarmony}%</span>
          </div>
          <Progress value={features.colorHarmony} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span>Style Preference</span>
            <span className="font-medium">{features.stylePreferenceMatch}%</span>
          </div>
          <Progress value={features.stylePreferenceMatch} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span>Occasion Match</span>
            <span className="font-medium">{features.occasionAppropriateness}%</span>
          </div>
          <Progress value={features.occasionAppropriateness} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;
