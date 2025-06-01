
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Heart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OutfitImage {
  id: string;
  url: string;
  title: string;
  price?: number;
}

interface OutfitGalleryProps {
  styleId: string;
  styleName: string;
  onImageClick?: (image: OutfitImage) => void;
  onAddToLookbook?: (image: OutfitImage) => void;
}

const OutfitGallery = ({ styleId, styleName, onImageClick, onAddToLookbook }: OutfitGalleryProps) => {
  const { toast } = useToast();

  // Mock data for outfit images - in a real app, this would come from an API
  const getOutfitImages = (styleId: string): OutfitImage[] => {
    const imageData = {
      'chat-': [ // For chat recommendations
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Casual Beach Look',
          price: 89
        },
        {
          id: '2', 
          url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Summer Breeze',
          price: 125
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Minimal Elegance',
          price: 95
        }
      ],
      'default': [
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Urban Chic',
          price: 110
        },
        {
          id: '5',
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Smart Casual',
          price: 145
        },
        {
          id: '6',
          url: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Weekend Vibes',
          price: 78
        },
        {
          id: '7',
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Evening Casual',
          price: 165
        }
      ]
    };

    // Return chat images for chat recommendations, default for others
    return styleId.startsWith('chat-') ? imageData['chat-'] : imageData['default'];
  };

  const images = getOutfitImages(styleId);

  const handleImageClick = (image: OutfitImage) => {
    if (onImageClick) {
      onImageClick(image);
    } else {
      toast({
        title: "Image Selected",
        description: `Viewing ${image.title}`,
      });
    }
  };

  const handleAddToLookbook = (image: OutfitImage) => {
    if (onAddToLookbook) {
      onAddToLookbook(image);
    } else {
      toast({
        title: "Added to Lookbook",
        description: `${image.title} has been saved to your lookbook!`,
      });
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-3 text-gray-700">
        Outfit Inspiration for {styleName}
      </h4>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {images.map((image) => (
            <Card 
              key={image.id} 
              className="flex-none w-32 h-40 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative h-full">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                  <div className="w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-end">
                      <div className="text-white text-xs">
                        <p className="font-medium truncate">{image.title}</p>
                        {image.price && (
                          <p className="text-gray-200">${image.price}</p>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-white hover:text-red-400 hover:bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToLookbook(image);
                        }}
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default OutfitGallery;
