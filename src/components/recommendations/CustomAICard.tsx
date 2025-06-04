
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Camera, Sparkles, Shirt, ShoppingBag } from 'lucide-react';

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

  const clothingSuggestions = [
    {
      item: "White Cotton T-Shirt",
      description: "Classic fit, breathable fabric",
      price: "$25-35"
    },
    {
      item: "Dark Denim Jeans",
      description: "Slim fit, versatile styling",
      price: "$60-80"
    },
    {
      item: "Light Cardigan",
      description: "Soft knit, perfect layering piece",
      price: "$45-65"
    },
    {
      item: "Crossbody Bag",
      description: "Hands-free convenience",
      price: "$30-50"
    }
  ];

  const posesData = [
    {
      name: "Confident Stand",
      description: "Stand tall with shoulders back, one hand on hip",
      caption: "Perfect for showcasing your outfit with confidence"
    },
    {
      name: "Casual Lean",
      description: "Lean against a wall or surface naturally",
      caption: "Relaxed and effortless style expression"
    },
    {
      name: "Walking Pose",
      description: "Mid-stride with natural arm movement",
      caption: "Dynamic and lifestyle-oriented shot"
    },
    {
      name: "Sitting Relaxed",
      description: "Comfortable seated position with good posture",
      caption: "Great for showing full outfit details"
    }
  ];

  const shoesSuggestions = [
    {
      type: "White Sneakers",
      description: "Clean, minimalist design for everyday wear",
      occasion: "Casual daily activities"
    },
    {
      type: "Canvas Shoes",
      description: "Comfortable and breathable for warm weather",
      occasion: "Weekend outings"
    },
    {
      type: "Ankle Boots",
      description: "Versatile boots for transitional weather",
      occasion: "Smart casual events"
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
        
        {/* Clothing Suggestions Section */}
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <Shirt className="h-4 w-4 mr-1" />
            Clothing Items
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {clothingSuggestions.slice(0, 4).map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-3 w-3 text-purple-500" />
                  <span className="font-medium text-xs">{item.item}</span>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
                <p className="text-xs text-green-600 font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footwear Suggestions Section */}
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <ShoppingBag className="h-4 w-4 mr-1" />
            Footwear Options
          </h4>
          <div className="space-y-2">
            {shoesSuggestions.slice(0, 3).map((shoe, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-3 w-3 text-blue-500" />
                  <span className="font-medium text-xs">{shoe.type}</span>
                </div>
                <p className="text-xs text-gray-600">{shoe.description}</p>
                <p className="text-xs text-blue-600 mt-1 italic">Best for: {shoe.occasion}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pose Ideas Section */}
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <Camera className="h-4 w-4 mr-1" />
            Pose Ideas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {posesData.slice(0, 4).map((pose, index) => (
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
