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
  User,
  MessageSquare,
  X
} from 'lucide-react';
import { QuestionnaireData } from '../questionnaire/QuestionnaireForm';
import { ThemeType } from '../../pages/RecommendationsPage';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { supabase } from '@/integrations/supabase/client';
import AIChatInterface from '../ai/AIChatInterface';
import OutfitGallery from './OutfitGallery';
import DetailedStyleView from './DetailedStyleView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomAICard from './CustomAICard';
import { useAuth } from '@/hooks/use-auth';

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
  const [chatRecommendations, setChatRecommendations] = useState<any[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  const [selectedPosingPhoto, setSelectedPosingPhoto] = useState<any>(null);
  const [showOutfitInspiration, setShowOutfitInspiration] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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

  const getRecommendationImage = (recommendation: any) => {
    const styleImages = {
      'minimalist': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'bohemian': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'classic': 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'trendy': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'edgy': 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'casual': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'formal': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    };

    if (formData.stylePreferences && formData.stylePreferences.length > 0) {
      const firstPreference = formData.stylePreferences[0].toLowerCase();
      return styleImages[firstPreference as keyof typeof styleImages] || styleImages.casual;
    }

    if (recommendation.source === 'chat') {
      return 'https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    }

    return styleImages.casual;
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

  const handleSaveToLookbook = async (recommendation: any) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save items to your lookbook.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('lookbook')
        .insert({
          user_id: user.id,
          name: recommendation.title || 'Saved Look',
          outfit_data: recommendation,
          tags: recommendation.tags || []
        });

      if (error) throw error;

      toast({
        title: "Saved to Lookbook!",
        description: "This outfit has been added to your lookbook.",
      });
    } catch (error) {
      console.error('Error saving to lookbook:', error);
      toast({
        title: "Error",
        description: "Failed to save to lookbook. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChatRecommendation = (recommendation: any) => {
    const newChatRec = {
      id: `chat-${Date.now()}`,
      title: "AI Chat Suggestion",
      description: recommendation,
      confidence: 95,
      items: ["Based on your conversation"],
      footwearOptions: [
        {
          type: "Recommended Shoes",
          description: "Footwear suggestion from chat",
          occasion: "General"
        }
      ],
      posingIdeas: [
        {
          name: "Natural Pose",
          description: "Confident and natural pose suggestion",
          photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ],
      bodyTypeMatch: 90,
      styleMatch: 95,
      source: "chat"
    };
    
    setChatRecommendations(prev => [newChatRec, ...prev.slice(0, 2)]);
    
    toast({
      title: "New AI Suggestion Added",
      description: "Your chat recommendation has been added to the suggestions!",
    });
  };

  const handleOutfitImageClick = (image: any) => {
    toast({
      title: "Outfit Viewed",
      description: `Viewing ${image.title} - ${image.price ? `$${image.price}` : 'Price on request'}`,
    });
  };

  const handleAddImageToLookbook = (image: any) => {
    toast({
      title: "Added to Lookbook",
      description: `${image.title} has been saved to your lookbook!`,
    });
  };

  const handleRecommendationClick = (recommendation: any) => {
    setSelectedRecommendation(recommendation);
    setShowOutfitInspiration(true);
  };

  const handlePosingPhotoClick = (posingIdea: any, recommendation: any) => {
    setSelectedPosingPhoto({
      ...posingIdea,
      recommendationId: recommendation.id,
      recommendationTitle: recommendation.title
    });
  };

  const handleCloseDetailedView = () => {
    setSelectedRecommendation(null);
  };

  const handleClosePosingGallery = () => {
    setSelectedPosingPhoto(null);
  };

  const getPosingGalleryImages = (posingIdea: any) => {
    const galleryImages = [
      {
        id: '1',
        url: posingIdea.photoUrl,
        title: posingIdea.name,
        description: posingIdea.description
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        title: 'Variation 1',
        description: 'Similar pose with slight variation'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        title: 'Variation 2',
        description: 'Alternative angle of the same pose'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        title: 'Variation 3',
        description: 'Dynamic version of the pose'
      },
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        title: 'Variation 4',
        description: 'Professional take on the pose'
      }
    ];
    
    return galleryImages;
  };

  useEffect(() => {
    loadAIRecommendations();
  }, [formData]);

  const allRecommendations = [...chatRecommendations, ...aiRecommendations];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 gradient-heading">
          Your AI Style Recommendations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized outfit suggestions and chat with our AI stylist.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-full p-1 shadow-lg border-2 border-gray-200">
            <ToggleGroup 
              type="single" 
              value={showChat ? "chat" : "suggestions"} 
              onValueChange={(value) => setShowChat(value === "chat")}
              className="bg-transparent"
            >
              <ToggleGroupItem 
                value="suggestions" 
                className="px-4 py-2 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-pink-500 data-[state=on]:text-white transition-colors duration-200"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Style Suggestions
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="chat" 
                className="px-4 py-2 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-pink-500 data-[state=on]:text-white transition-colors duration-200"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Chat Expert
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Slider */}
      {showChat ? (
        /* Chat Section */
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardContent className="p-0">
                <AIChatInterface 
                  userProfile={formData} 
                  onRecommendation={handleChatRecommendation}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* AI Recommendations Section */
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Brain className="mr-3 h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">AI Style Suggestions</h2>
            </div>
            <div className="flex items-center gap-4">
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
          </div>
          
          {isLoadingAI ? (
            <div className="grid grid-cols-1 gap-6 opacity-50">
              <div className="bg-gray-100 rounded-lg h-96 animate-pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {allRecommendations.slice(0, 1).map((recommendation) => (
                <CustomAICard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onSaveToLookbook={() => handleSaveToLookbook(recommendation)}
                  onViewDetails={() => handleRecommendationClick(recommendation)}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
            <p><strong>Season:</strong> {formData.seasonality}</p>
            <p><strong>Destination:</strong> {formData.destinationType}</p>
          </div>
        </div>
      </div>

      {/* Outfit Inspiration Modal with Scrolling */}
      {showOutfitInspiration && selectedRecommendation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl">Outfit Inspiration for {selectedRecommendation.title}</CardTitle>
                <p className="text-sm text-gray-600">Explore items, footwear, and poses</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowOutfitInspiration(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[70vh]">
                <div className="p-6">
                  <OutfitGallery
                    styleId={selectedRecommendation.id}
                    styleName={selectedRecommendation.title}
                    onImageClick={handleOutfitImageClick}
                    onAddToLookbook={handleAddImageToLookbook}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Style View Modal */}
      {selectedRecommendation && !showOutfitInspiration && (
        <DetailedStyleView
          recommendation={selectedRecommendation}
          onClose={handleCloseDetailedView}
          onAddToLookbook={() => handleSaveToLookbook(selectedRecommendation)}
        />
      )}

      {selectedPosingPhoto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl">{selectedPosingPhoto.name} Gallery</CardTitle>
                <p className="text-sm text-gray-600">From {selectedPosingPhoto.recommendationTitle}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClosePosingGallery}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-6">
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getPosingGalleryImages(selectedPosingPhoto).map((image) => (
                    <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">{image.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{image.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecommendationResult;
