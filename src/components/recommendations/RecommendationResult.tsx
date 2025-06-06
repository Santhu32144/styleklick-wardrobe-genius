
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import OutfitGallery from './OutfitGallery';
import DetailedStyleView from './DetailedStyleView';
import CustomAICard from './CustomAICard';
import AIRecommendationSection from './AIRecommendationSection';
import { QuestionnaireData } from '@/components/questionnaire/QuestionnaireForm';
import { ThemeType } from '@/pages/RecommendationsPage';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin } from 'lucide-react';

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

  const mockOutfits = {
    fall: [
      {
        id: 'fall-1',
        title: 'Autumn Elegance',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
        description: 'Sophisticated layers with warm earth tones perfect for fall weather.',
        items: ['Wool coat', 'Cashmere sweater', 'High-waisted trousers', 'Ankle boots'],
        bodyTypeMatch: 88,
        styleMatch: 92,
        confidence: 94
      },
      {
        id: 'fall-2',
        title: 'Cozy Comfort',
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81df0e73ca6a?auto=format&fit=crop&w=800&q=80',
        description: 'Soft textures and comfortable fits for crisp days.',
        items: ['Oversized knit sweater', 'Fleece-lined leggings', 'Knee-high socks', 'Suede boots'],
        bodyTypeMatch: 90,
        styleMatch: 87,
        confidence: 89
      },
      {
        id: 'fall-3',
        title: 'Harvest Chic',
        imageUrl: 'https://images.unsplash.com/photo-1549298713-24f4c47b8544?auto=format&fit=crop&w=800&q=80',
        description: 'Modern silhouettes with seasonal accents.',
        items: ['Corduroy blazer', 'Silk blouse', 'Wide-leg jeans', 'Loafers'],
        bodyTypeMatch: 85,
        styleMatch: 91,
        confidence: 88
      },
      {
        id: 'fall-4',
        title: 'Golden Hour',
        imageUrl: 'https://images.unsplash.com/photo-1519699047764-416314e4d1e3?auto=format&fit=crop&w=800&q=80',
        description: 'Warm palettes perfect for autumn sunsets.',
        items: ['Rust-colored dress', 'Denim jacket', 'Scarf', 'Cowboy boots'],
        bodyTypeMatch: 82,
        styleMatch: 89,
        confidence: 86
      }
    ],
    adventure: [
      {
        id: 'adventure-1',
        title: 'Trail Ready',
        imageUrl: 'https://images.unsplash.com/photo-1517842067494-48247259b8ca?auto=format&fit=crop&w=800&q=80',
        description: 'Durable fabrics with outdoor functionality.',
        items: ['Waterproof jacket', 'Hiking pants', 'Moisture-wicking tee', 'Hiking boots'],
        bodyTypeMatch: 93,
        styleMatch: 88,
        confidence: 91
      },
      {
        id: 'adventure-2',
        title: 'Urban Explorer',
        imageUrl: 'https://images.unsplash.com/photo-1483729558042-f63371c8da49?auto=format&fit=crop&w=800&q=80',
        description: 'City adventures meet outdoor comfort.',
        items: ['Lightweight parka', 'Cargo pants', 'Graphic tee', 'Sneakers'],
        bodyTypeMatch: 87,
        styleMatch: 90,
        confidence: 89
      },
      {
        id: 'adventure-3',
        title: 'Mountain Casual',
        imageUrl: 'https://images.unsplash.com/photo-1532274402911-5a369e2e94cd?auto=format&fit=crop&w=800&q=80',
        description: 'Relaxed fits for weekend getaways.',
        items: ['Flannel shirt', 'Chinos', 'Beanie', 'Chelsea boots'],
        bodyTypeMatch: 84,
        styleMatch: 86,
        confidence: 85
      },
      {
        id: 'adventure-4',
        title: 'Summit Style',
        imageUrl: 'https://images.unsplash.com/photo-1541460824-9104232f3969?auto=format&fit=crop&w=800&q=80',
        description: 'Performance meets fashion for active days.',
        items: ['Athletic leggings', 'Sports bra', 'Windbreaker', 'Trail running shoes'],
        bodyTypeMatch: 91,
        styleMatch: 83,
        confidence: 87
      }
    ],
    urban: [
      {
        id: 'urban-1',
        title: 'City Professional',
        imageUrl: 'https://images.unsplash.com/photo-1495384995813-3667b399a962?auto=format&fit=crop&w=800&q=80',
        description: 'Sharp lines and contemporary cuts.',
        items: ['Tailored suit', 'Button-down shirt', 'Pencil skirt', 'Pointed heels'],
        bodyTypeMatch: 89,
        styleMatch: 94,
        confidence: 92
      },
      {
        id: 'urban-2',
        title: 'Street Smart',
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd6ca6ac9e?auto=format&fit=crop&w=800&q=80',
        description: 'Trendy pieces with metropolitan flair.',
        items: ['Bomber jacket', 'Hoodie', 'Skinny jeans', 'High-top sneakers'],
        bodyTypeMatch: 86,
        styleMatch: 91,
        confidence: 89
      },
      {
        id: 'urban-3',
        title: 'Modern Minimalist',
        imageUrl: 'https://images.unsplash.com/photo-1521369909827-4ac6ef131396?auto=format&fit=crop&w=800&q=80',
        description: 'Clean aesthetics for the urban lifestyle.',
        items: ['Turtleneck sweater', 'Straight-leg trousers', 'Trench coat', 'Ankle boots'],
        bodyTypeMatch: 88,
        styleMatch: 90,
        confidence: 89
      },
      {
        id: 'urban-4',
        title: 'Downtown Edge',
        imageUrl: 'https://images.unsplash.com/photo-1503435980610-a60293d45d20?auto=format&fit=crop&w=800&q=80',
        description: 'Bold statements for city nights.',
        items: ['Leather jacket', 'Graphic tee', 'Ripped jeans', 'Combat boots'],
        bodyTypeMatch: 83,
        styleMatch: 87,
        confidence: 85
      }
    ]
  };

  const currentOutfits = mockOutfits[activeTheme] || [];
  const displayedOutfits = showSingleCard ? currentOutfits.slice(0, 1) : currentOutfits;

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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold gradient-heading">Your Style Recommendations</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-styleklick-purple text-styleklick-purple" 
              asChild
            >
              <Link to="/location-posing-suggestions" state={{ returnTo: '/recommendations' }}>
                <MapPin className="mr-2 h-4 w-4" />
                Location Ideas
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/questionnaire">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quiz
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Based on your preferences for {formData.stylePreferences.join(', ')} style, 
          {formData.occasion && ` ${formData.occasion} occasions,`}
          {formData.destinationType && ` and ${formData.destinationType} environments.`}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">AI Style Suggestion</h3>
        <CustomAICard 
          recommendation={mockRecommendation}
          onSaveToLookbook={onSaveToLookbook}
          onViewDetails={handleViewDetails}
        />
      </div>

      <Tabs value={activeTheme} onValueChange={(value) => setActiveTheme(value as ThemeType)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fall">Fall Vibes</TabsTrigger>
          <TabsTrigger value="adventure">Adventure Ready</TabsTrigger>
          <TabsTrigger value="urban">Urban Chic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fall" className="space-y-6 mt-6">
          <OutfitGallery 
            outfits={displayedOutfits}
            onOutfitSelect={setSelectedOutfit}
            onSaveToLookbook={onSaveToLookbook}
          />
        </TabsContent>
        
        <TabsContent value="adventure" className="space-y-6 mt-6">
          <OutfitGallery 
            outfits={displayedOutfits}
            onOutfitSelect={setSelectedOutfit}
            onSaveToLookbook={onSaveToLookbook}
          />
        </TabsContent>
        
        <TabsContent value="urban" className="space-y-6 mt-6">
          <OutfitGallery 
            outfits={displayedOutfits}
            onOutfitSelect={setSelectedOutfit}
            onSaveToLookbook={onSaveToLookbook}
          />
        </TabsContent>
      </Tabs>

      <AIRecommendationSection formData={formData} outfits={currentOutfits} />
    </div>
  );
};

export default RecommendationResult;
