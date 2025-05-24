import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Brain, 
  RefreshCw, 
  Lightbulb,
  Bot,
  Shirt,
  Palette,
  MapPin,
  Calendar,
  DollarSign,
  User
} from 'lucide-react';
import { QuestionnaireData } from '../questionnaire/QuestionnaireForm';
import { ThemeType } from '../../pages/RecommendationsPage';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { supabase } from '@/integrations/supabase/client';
import AIChatInterface from '../ai/AIChatInterface';

interface RecommendationResultProps {
  formData: QuestionnaireData;
  activeTheme: ThemeType;
  setActiveTheme: (theme: ThemeType) => void;
  onSaveToLookbook: () => void;
}

const RecommendationResult = ({ formData, activeTheme, setActiveTheme, onSaveToLookbook }: RecommendationResultProps) => {
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  const staticOutfits = [
    {
      id: "1",
      title: "Fall Look 1",
      imageUrl: "https://images.unsplash.com/photo-1547958324-3a6422a71Dec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      theme: 'fall'
    },
    {
      id: "2",
      title: "Fall Look 2",
      imageUrl: "https://images.unsplash.com/photo-1574653244004-49f610a987ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      theme: 'fall'
    },
    {
      id: "3",
      title: "Adventure Look 1",
      imageUrl: "https://images.unsplash.com/photo-1548286342-5c41148b4c68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      theme: 'adventure'
    },
    {
      id: "4",
      title: "Adventure Look 2",
      imageUrl: "https://images.unsplash.com/photo-1571904994143-362540fe1c93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      theme: 'adventure'
    },
    {
      id: "5",
      title: "Urban Look 1",
      imageUrl: "https://images.unsplash.com/photo-1519638374633-efd93c942c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      theme: 'urban'
    },
    {
      id: "6",
      title: "Urban Look 2",
      imageUrl: "https://images.unsplash.com/photo-1543508286-79badb6b989c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      theme: 'urban'
    }
  ];

  const filteredOutfits = staticOutfits.filter(outfit => outfit.theme === activeTheme);

  const themeDefinitions = {
    fall: {
      label: 'Fall',
      icon: <Palette className="h-4 w-4 mr-2" />,
      description: 'Warm and cozy styles for autumn days'
    },
    adventure: {
      label: 'Adventure',
      icon: <MapPin className="h-4 w-4 mr-2" />,
      description: 'Durable and practical outfits for outdoor activities'
    },
    urban: {
      label: 'Urban',
      icon: <Calendar className="h-4 w-4 mr-2" />,
      description: 'Chic and trendy looks for city life'
    }
  };

  const loadAIRecommendations = async () => {
    setIsLoadingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-style-recommendations', {
        body: {
          action: 'recommendations',
          formData
        }
      });

      if (error) throw error;
      setAiRecommendations(data);
      
      toast({
        title: "AI Recommendations Ready",
        description: "Your personalized style recommendations have been generated!",
      });
    } catch (error) {
      console.error('Error loading AI recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    loadAIRecommendations();
  }, [formData]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
          Your AI Style Recommendations
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Personalized outfit suggestions powered by AI, tailored to your style preferences and occasion.
        </p>
      </div>

      {/* Chat Toggle */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setShowChat(!showChat)}
          variant={showChat ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Bot className="h-4 w-4" />
          {showChat ? 'Hide AI Chat' : 'Chat with AI Stylist'}
        </Button>
      </div>

      {/* AI Chat Interface */}
      {showChat && (
        <div className="mb-8 max-w-4xl mx-auto">
          <AIChatInterface userProfile={formData} />
        </div>
      )}

      {/* AI Recommendations Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Brain className="mr-3 h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={loadAIRecommendations}
            disabled={isLoadingAI}
          >
            {isLoadingAI ? (
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
        
        {isLoadingAI ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
            {[1, 2, 3].map((placeholder) => (
              <div 
                key={placeholder} 
                className="bg-gray-100 rounded-lg h-96 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h3 className="font-semibold text-lg mb-2">{recommendation.title}</h3>
                    <div className="flex justify-center">
                      <Badge className="bg-purple-600 text-white">
                        AI Match {recommendation.confidence}%
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {recommendation.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Items:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {recommendation.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Body Type Match</span>
                      <span className="font-medium">{recommendation.bodyTypeMatch}%</span>
                    </div>
                    <Progress value={recommendation.bodyTypeMatch} className="h-1" />
                    
                    <div className="flex justify-between text-xs">
                      <span>Style Match</span>
                      <span className="font-medium">{recommendation.styleMatch}%</span>
                    </div>
                    <Progress value={recommendation.styleMatch} className="h-1" />
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={onSaveToLookbook}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Save to Lookbook
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Style Explanation */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
          Why These Recommendations Work for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Style Preferences:</strong> {formData.stylePreferences.join(', ')}</p>
          </div>
          <div>
            <p><strong>Occasion:</strong> {formData.occasion}</p>
            <p><strong>Destination:</strong> {formData.destinationType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;
