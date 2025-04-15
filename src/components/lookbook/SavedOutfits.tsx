
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Trash2, Edit, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SavedOutfit {
  id: string;
  top: {
    name: string;
    imageUrl: string;
  };
  bottom: {
    name: string;
    imageUrl: string;
  };
  dateSaved: string;
  tags: string[];
}

// Temporary mock data - will be replaced with actual data from storage
const mockSavedOutfits: SavedOutfit[] = [
  {
    id: '1',
    top: {
      name: 'White Button-Down Shirt',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    },
    bottom: {
      name: 'Blue Jeans',
      imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
    },
    dateSaved: '2025-04-15',
    tags: ['Casual', 'Everyday'],
  },
  {
    id: '2',
    top: {
      name: 'Black Turtleneck',
      imageUrl: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f',
    },
    bottom: {
      name: 'Black Dress Pants',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
    },
    dateSaved: '2025-04-14',
    tags: ['Formal', 'Business'],
  },
];

export const SavedOutfits = () => {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [outfits, setOutfits] = React.useState<SavedOutfit[]>(mockSavedOutfits);

  const handleRemoveOutfit = (outfitId: string) => {
    setOutfits(outfits.filter(outfit => outfit.id !== outfitId));
  };

  const availableTags = Array.from(
    new Set(outfits.flatMap(outfit => outfit.tags))
  );

  const filteredOutfits = activeFilter
    ? outfits.filter(outfit => outfit.tags.includes(activeFilter))
    : outfits;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Filter className="h-5 w-5 text-gray-500" />
        <div className="flex gap-2">
          {availableTags.map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutfits.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <img 
                    src={outfit.top.imageUrl} 
                    alt={outfit.top.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <img 
                    src={outfit.bottom.imageUrl} 
                    alt={outfit.bottom.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Saved on {new Date(outfit.dateSaved).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {outfit.tags.map((tag, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleRemoveOutfit(outfit.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <Link to="/outfit-coordination" state={{ outfitToEdit: outfit }}>
                      <Edit className="h-4 w-4" />
                      Recreate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredOutfits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No saved outfits found</p>
          <Button asChild>
            <Link to="/outfit-coordination">Create Your First Outfit</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
