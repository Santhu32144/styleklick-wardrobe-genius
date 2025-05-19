
import React, { useState, useEffect } from 'react';
import { QuestionnaireData } from '../questionnaire/QuestionnaireForm';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeType } from '@/pages/RecommendationsPage';
import { Heart, Bookmark, Calendar, Sparkles } from 'lucide-react';
import StyleAssistant from '../ai/StyleAssistant';
import CaptionGenerator from '../ai/CaptionGenerator';

interface RecommendationProps {
  formData: QuestionnaireData;
  activeTheme: ThemeType;
  setActiveTheme: (theme: ThemeType) => void;
  onSaveToLookbook: () => void;
}

const RecommendationResult: React.FC<RecommendationProps> = ({ 
  formData, 
  activeTheme, 
  setActiveTheme,
  onSaveToLookbook
}) => {
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  
  // Sample outfit data - would normally come from API based on user preferences
  const outfitsByTheme = {
    fall: [
      {
        id: 'fall-1',
        image: '/placeholder.svg',
        name: 'Cozy Autumn Layers',
        description: 'A warm layered look perfect for fall weather.',
        items: ['Beige turtleneck sweater', 'Brown leather jacket', 'Dark jeans', 'Ankle boots'],
        colors: ['beige', 'brown', 'indigo', 'tan'],
        saved: false
      },
      {
        id: 'fall-2',
        image: '/placeholder.svg',
        name: 'Fall Weekend Casual',
        description: 'Perfect for pumpkin patches and apple picking.',
        items: ['Flannel shirt', 'Thermal undershirt', 'Chinos', 'Hiking boots'],
        colors: ['red', 'black', 'khaki', 'brown'],
        saved: false
      }
    ],
    adventure: [
      {
        id: 'adventure-1',
        image: '/placeholder.svg',
        name: 'Mountain Explorer',
        description: 'Functional and stylish for outdoor adventures.',
        items: ['Moisture-wicking tee', 'Fleece mid-layer', 'Hiking pants', 'Trail shoes'],
        colors: ['navy', 'gray', 'olive', 'black'],
        saved: false
      },
      {
        id: 'adventure-2',
        image: '/placeholder.svg',
        name: 'Weekend Getaway',
        description: 'Versatile outfit for exploring new destinations.',
        items: ['Light jacket', 'Performance shirt', 'Convertible pants', 'All-terrain shoes'],
        colors: ['blue', 'white', 'tan', 'gray'],
        saved: false
      }
    ],
    urban: [
      {
        id: 'urban-1',
        image: '/placeholder.svg',
        name: 'City Streetwear',
        description: 'Modern urban style for city exploration.',
        items: ['Graphic tee', 'Bomber jacket', 'Slim jeans', 'Sneakers'],
        colors: ['black', 'white', 'gray', 'red'],
        saved: false
      },
      {
        id: 'urban-2',
        image: '/placeholder.svg',
        name: 'Metropolitan Smart',
        description: 'Polished look for city museums and dining.',
        items: ['Button-down shirt', 'Light blazer', 'Chinos', 'Leather sneakers'],
        colors: ['light blue', 'navy', 'beige', 'white'],
        saved: false
      }
    ]
  };

  const outfits = outfitsByTheme[activeTheme] || [];
  
  const themes = [
    { id: 'fall', label: 'Fall Outfit', color: 'orange' },
    { id: 'adventure', label: 'Adventure', color: 'green' },
    { id: 'urban', label: 'Urban Look', color: 'blue' }
  ];

  // This would be computed based on the user's preferences and questionnaire data
  const userStylePreferences = formData.stylePreferences.join(', ');
  const occasion = formData.occasion;
  const seasonality = formData.seasonality;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">Your Style Recommendations</h1>
      <p className="text-gray-600 mb-6">Based on your preferences for {occasion} in {seasonality} season</p>

      {/* Theme Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Explore Different Themes</h3>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as ThemeType)}
              variant={activeTheme === theme.id ? "default" : "outline"}
              className={`${activeTheme === theme.id ? 'bg-styleklick-purple text-white' : 'text-styleklick-purple'}`}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Outfit Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {outfits.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden">
            <div className="aspect-[3/2] bg-gray-100">
              <img 
                src={outfit.image} 
                alt={outfit.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{outfit.name}</h3>
              <p className="text-gray-600 mb-3">{outfit.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Items:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {outfit.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Color Palette:</h4>
                <div className="flex gap-2">
                  {outfit.colors.map((color, idx) => (
                    <Badge key={idx} variant="outline">{color}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={onSaveToLookbook}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save to Lookbook
                </Button>
                <Button variant="default" onClick={() => setShowAiAssistant(true)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Stylist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Stylist and Caption Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StyleAssistant formData={formData} />
        <CaptionGenerator 
          outfitDescription={outfits.length > 0 ? `${outfits[0].name}: ${outfits[0].description}` : undefined}
          occasion={formData.occasion}
          style={formData.stylePreferences.join(', ')}
        />
      </div>

      {/* Additional Chat Interface */}
      <div className="mb-12">
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/style-assistant"}
          className="w-full py-8 flex flex-col items-center justify-center border-dashed border-2"
        >
          <Sparkles className="h-6 w-6 mb-2 text-styleklick-purple" />
          <span className="text-lg font-medium">Open Full Style Chat Assistant</span>
          <p className="text-sm text-gray-500 mt-1">Ask detailed questions about your style and outfits</p>
        </Button>
      </div>
    </div>
  );
};

export default RecommendationResult;
