
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ZoomIn, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface OutfitImage {
  id: string;
  url: string;
  title: string;
  type: 'pose';
}

interface OutfitGalleryProps {
  styleId: string;
  styleName: string;
  onImageClick?: (image: OutfitImage) => void;
  onAddToLookbook?: (image: OutfitImage) => void;
}

const OutfitGallery = ({ styleId, styleName, onImageClick, onAddToLookbook }: OutfitGalleryProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<OutfitImage | null>(null);

  // Mock data for pose images only
  const getPoseImages = (styleId: string): OutfitImage[] => {
    const poseData = {
      'chat-': [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Confident Stance',
          type: 'pose' as const
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Relaxed Pose',
          type: 'pose' as const
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Urban Style',
          type: 'pose' as const
        },
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Casual Look',
          type: 'pose' as const
        }
      ],
      'default': [
        {
          id: '5',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Professional Pose',
          type: 'pose' as const
        },
        {
          id: '6',
          url: 'https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Casual Standing',
          type: 'pose' as const
        },
        {
          id: '7',
          url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Dynamic Pose',
          type: 'pose' as const
        },
        {
          id: '8',
          url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Street Style',
          type: 'pose' as const
        },
        {
          id: '9',
          url: 'https://images.unsplash.com/photo-1511085279-b301accad86b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Fashion Forward',
          type: 'pose' as const
        },
        {
          id: '10',
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          title: 'Modern Look',
          type: 'pose' as const
        }
      ]
    };

    return styleId.startsWith('chat-') ? poseData['chat-'] : poseData['default'];
  };

  const poseImages = getPoseImages(styleId);

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

  return (
    <>
      <div className="mt-6">
        <motion.h4 
          className="text-lg font-semibold mb-4 text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pose Inspiration for {styleName}
        </motion.h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {poseImages.map((image, index) => (
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
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
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
