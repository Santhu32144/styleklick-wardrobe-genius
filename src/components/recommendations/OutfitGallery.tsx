
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Eye } from 'lucide-react';

interface Outfit {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  items: string[];
}

interface OutfitGalleryProps {
  outfits: Outfit[];
  onOutfitSelect: (outfit: Outfit) => void;
  onSaveToLookbook: (outfitData: any) => void;
}

const OutfitGallery = ({ outfits, onOutfitSelect, onSaveToLookbook }: OutfitGalleryProps) => {
  const handleSaveOutfit = (outfit: Outfit) => {
    const outfitData = {
      title: outfit.title,
      description: outfit.description,
      image: outfit.imageUrl,
      items: outfit.items,
      tags: ['outfit', 'saved']
    };
    onSaveToLookbook(outfitData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {outfits.map((outfit) => (
        <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-64">
            <img 
              src={outfit.imageUrl} 
              alt={outfit.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{outfit.title}</CardTitle>
            <CardDescription className="text-sm">{outfit.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleSaveOutfit(outfit)}
              >
                <Heart className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => onOutfitSelect(outfit)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OutfitGallery;
