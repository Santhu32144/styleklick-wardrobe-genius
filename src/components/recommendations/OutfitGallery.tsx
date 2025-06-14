import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Heart, Eye, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';

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
  showTabsFirst?: boolean;
}

const OutfitGallery = ({ styleId, styleName, onImageClick, onAddToLookbook, showTabsFirst = false }: OutfitGalleryProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<OutfitImage | null>(null);

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
    setSelectedImage(image);
    if (onImageClick) {
      onImageClick(image);
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

  const closeModal = () => {
    setSelectedImage(null);
  };

  const renderImageGrid = (images: OutfitImage[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="relative h-full">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Aesthetic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(image);
                  }}
                >
                  <ZoomIn className="h-4 w-4 text-gray-700" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToLookbook(image);
                  }}
                >
                  <Heart className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-white">
                  <p className="font-medium text-sm truncate">{image.title}</p>
                  {image.price && (
                    <p className="text-xs text-gray-200">${image.price}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const TabsSection = () => (
    <Tabs defaultValue="items" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1">
        <TabsTrigger 
          value="items" 
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Items ({items.length})
        </TabsTrigger>
        <TabsTrigger 
          value="footwear"
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Footwear ({footwear.length})
        </TabsTrigger>
        <TabsTrigger 
          value="poses"
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Poses ({poses.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="items" className="mt-6">
        {renderImageGrid(items)}
      </TabsContent>
      
      <TabsContent value="footwear" className="mt-6">
        {renderImageGrid(footwear)}
      </TabsContent>
      
      <TabsContent value="poses" className="mt-6">
        {renderImageGrid(poses)}
      </TabsContent>
    </Tabs>
  );

  return (
    <>
      <div className="mt-6">
        <motion.h4 
          className="text-lg font-semibold mb-4 text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Outfit Inspiration for {styleName}
        </motion.h4>
        
        <TabsSection />
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="aspect-[4/5] max-h-[80vh]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedImage.title}</h3>
                    {selectedImage.price && (
                      <p className="text-lg font-medium text-green-600 mt-1">${selectedImage.price}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleAddToLookbook(selectedImage)}
                    className="flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    Add to Lookbook
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OutfitGallery;
