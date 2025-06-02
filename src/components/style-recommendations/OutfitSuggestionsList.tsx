
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StyleCategory, OutfitSuggestion } from '@/types/style';

interface OutfitSuggestionsListProps {
  category: StyleCategory;
  onOutfitSelect: (outfit: OutfitSuggestion) => void;
}

// Mock data - in a real app, this would come from an API
const getOutfitsByCategory = (category: StyleCategory): OutfitSuggestion[] => {
  const outfits = {
    fall: [
      {
        id: 'fall-1',
        name: 'Autumn Elegance',
        description: 'Sophisticated layers with warm earth tones',
        category: 'fall' as StyleCategory
      },
      {
        id: 'fall-2',
        name: 'Cozy Comfort',
        description: 'Soft textures and comfortable fits for crisp days',
        category: 'fall' as StyleCategory
      },
      {
        id: 'fall-3',
        name: 'Harvest Chic',
        description: 'Modern silhouettes with seasonal accents',
        category: 'fall' as StyleCategory
      },
      {
        id: 'fall-4',
        name: 'Golden Hour',
        description: 'Warm palettes perfect for autumn sunsets',
        category: 'fall' as StyleCategory
      }
    ],
    adventure: [
      {
        id: 'adventure-1',
        name: 'Trail Ready',
        description: 'Durable fabrics with outdoor functionality',
        category: 'adventure' as StyleCategory
      },
      {
        id: 'adventure-2',
        name: 'Urban Explorer',
        description: 'City adventures meet outdoor comfort',
        category: 'adventure' as StyleCategory
      },
      {
        id: 'adventure-3',
        name: 'Mountain Casual',
        description: 'Relaxed fits for weekend getaways',
        category: 'adventure' as StyleCategory
      },
      {
        id: 'adventure-4',
        name: 'Summit Style',
        description: 'Performance meets fashion for active days',
        category: 'adventure' as StyleCategory
      }
    ],
    urban: [
      {
        id: 'urban-1',
        name: 'City Professional',
        description: 'Sharp lines and contemporary cuts',
        category: 'urban' as StyleCategory
      },
      {
        id: 'urban-2',
        name: 'Street Smart',
        description: 'Trendy pieces with metropolitan flair',
        category: 'urban' as StyleCategory
      },
      {
        id: 'urban-3',
        name: 'Modern Minimalist',
        description: 'Clean aesthetics for the urban lifestyle',
        category: 'urban' as StyleCategory
      },
      {
        id: 'urban-4',
        name: 'Downtown Edge',
        description: 'Bold statements for city nights',
        category: 'urban' as StyleCategory
      }
    ]
  };

  return outfits[category] || [];
};

const OutfitSuggestionsList = ({ category, onOutfitSelect }: OutfitSuggestionsListProps) => {
  const outfits = getOutfitsByCategory(category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {outfits.map((outfit) => (
        <Card
          key={outfit.id}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => onOutfitSelect(outfit)}
        >
          <CardHeader>
            <CardTitle className="text-lg">{outfit.name}</CardTitle>
            <CardDescription>{outfit.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-600 hover:text-blue-800">
              Click to view details →
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OutfitSuggestionsList;
