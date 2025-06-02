
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OutfitImage {
  id: string;
  url: string;
  title: string;
  price?: number;
  type?: 'item' | 'footwear' | 'pose';
}

interface OutfitGalleryProps {
  styleId: string;
  styleName: string;
  onImageClick?: (image: OutfitImage) => void;
  onAddToLookbook?: (image: OutfitImage) => void;
}

const OutfitGallery = ({ styleId, styleName, onImageClick, onAddToLookbook }: OutfitGalleryProps) => {
  const { toast } = useToast();

  // Mock data for outfit images - categorized by type
  const getOutfitImages = (styleId: string): { items: OutfitImage[], footwear: OutfitImage[], poses: OutfitImage[] } => {
    const imageData = {
      'chat-': {
        items: [
          {
            id: '1',
            url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Casual T-Shirt',
            price: 45,
            type: 'item' as const
          },
          {
            id: '2', 
            url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Summer Shorts',
            price: 35,
            type: 'item' as const
          },
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Light Jacket',
            price: 89,
            type: 'item' as const
          }
        ],
        footwear: [
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Canvas Sneakers',
            price: 75,
            type: 'footwear' as const
          },
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Casual Loafers',
            price: 120,
            type: 'footwear' as const
          }
        ],
        poses: [
          {
            id: '6',
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Confident Stance',
            type: 'pose' as const
          },
          {
            id: '7',
            url: 'https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Relaxed Pose',
            type: 'pose' as const
          }
        ]
      },
      'default': {
        items: [
          {
            id: '8',
            url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Urban Shirt',
            price: 65,
            type: 'item' as const
          },
          {
            id: '9',
            url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Smart Trousers',
            price: 95,
            type: 'item' as const
          },
          {
            id: '10',
            url: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Denim Jacket',
            price: 110,
            type: 'item' as const
          },
          {
            id: '11',
            url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Casual Blazer',
            price: 155,
            type: 'item' as const
          }
        ],
        footwear: [
          {
            id: '12',
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Running Shoes',
            price: 130,
            type: 'footwear' as const
          },
          {
            id: '13',
            url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Dress Shoes',
            price: 180,
            type: 'footwear' as const
          },
          {
            id: '14',
            url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Ankle Boots',
            price: 160,
            type: 'footwear' as const
          }
        ],
        poses: [
          {
            id: '15',
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Professional Pose',
            type: 'pose' as const
          },
          {
            id: '16',
            url: 'https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Casual Standing',
            type: 'pose' as const
          },
          {
            id: '17',
            url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            title: 'Dynamic Pose',
            type: 'pose' as const
          }
        ]
      }
    };

    // Return chat images for chat recommendations, default for others
    return styleId.startsWith('chat-') ? imageData['chat-'] : imageData['default'];
  };

  const { items, footwear, poses } = getOutfitImages(styleId);

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

  const renderImageGrid = (images: OutfitImage[]) => (
    <ScrollArea className="w-full">
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
  );

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-3 text-gray-700">
        Outfit Inspiration for {styleName}
      </h4>
      
      <Tabs defaultValue="items" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="items">Items ({items.length})</TabsTrigger>
          <TabsTrigger value="footwear">Footwear ({footwear.length})</TabsTrigger>
          <TabsTrigger value="poses">Poses ({poses.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="mt-4">
          {renderImageGrid(items)}
        </TabsContent>
        
        <TabsContent value="footwear" className="mt-4">
          {renderImageGrid(footwear)}
        </TabsContent>
        
        <TabsContent value="poses" className="mt-4">
          {renderImageGrid(poses)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutfitGallery;
