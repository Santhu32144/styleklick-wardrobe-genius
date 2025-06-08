
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { X, Heart, Share2, Eye } from 'lucide-react';

interface DetailedStyleViewProps {
  recommendation: any;
  onClose: () => void;
  onAddToLookbook: () => void;
}

const DetailedStyleView = ({ recommendation, onClose, onAddToLookbook }: DetailedStyleViewProps) => {
  const { toast } = useToast();

  // Generate 10+ outfit images for the detailed view
  const getDetailedOutfitImages = (styleId: string) => {
    const baseImages = [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506629905607-f5f14d97e60b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    ];

    return baseImages.map((url, index) => ({
      id: `${styleId}-${index + 1}`,
      url,
      title: `Outfit ${index + 1}`,
      price: Math.floor(Math.random() * 200) + 50
    }));
  };

  const outfitImages = getDetailedOutfitImages(recommendation?.id || 'default');

  const handleImageClick = (image: any) => {
    toast({
      title: "Outfit Selected",
      description: `Viewing ${image.title} - $${image.price}`,
    });
  };

  const handleAddImageToLookbook = (image: any) => {
    toast({
      title: "Added to Lookbook",
      description: `${image.title} has been saved to your lookbook!`,
    });
  };

  // Provide safe fallbacks for all recommendation properties
  const safeRecommendation = {
    title: recommendation?.title || 'Style Suggestion',
    description: recommendation?.description || 'A personalized style recommendation for you.',
    items: recommendation?.items || recommendation?.outfitSuggestions || [],
    confidence: recommendation?.confidence || recommendation?.styleMatch || 90,
    bodyTypeMatch: recommendation?.bodyTypeMatch || 85,
    styleMatch: recommendation?.styleMatch || 90,
    source: recommendation?.source || 'ai'
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-2xl">{safeRecommendation.title}</CardTitle>
            <Badge className="bg-purple-600 text-white">
              AI Match {safeRecommendation.confidence}%
            </Badge>
            {safeRecommendation.source === 'chat' && (
              <Badge className="bg-green-600 text-white">
                Chat Suggestion
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onAddToLookbook}>
              <Heart className="h-4 w-4 mr-2" />
              Save to Lookbook
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Style Description */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {safeRecommendation.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recommended Items:</h4>
                <ul className="space-y-1">
                  {safeRecommendation.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{safeRecommendation.bodyTypeMatch}%</div>
                  <div className="text-sm text-gray-600">Body Type Match</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{safeRecommendation.styleMatch}%</div>
                  <div className="text-sm text-gray-600">Style Match</div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-xl font-semibold mb-2">{safeRecommendation.title}</h3>
                  <p className="text-gray-600">Featured Style</p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Outfit Gallery</h3>
            
            <ScrollArea className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-4">
                {outfitImages.map((image) => (
                  <Card 
                    key={image.id} 
                    className="aspect-[3/4] overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="relative h-full">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                        <div className="w-full p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex justify-between items-end">
                            <div className="text-white text-xs">
                              <p className="font-medium">{image.title}</p>
                              <p className="text-gray-200">${image.price}</p>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-white hover:text-red-400 hover:bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddImageToLookbook(image);
                                }}
                              >
                                <Heart className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-white hover:text-blue-400 hover:bg-transparent"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedStyleView;
