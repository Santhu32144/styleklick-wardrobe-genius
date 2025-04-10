
import React, { useState } from 'react';
import { QuestionnaireData } from '../questionnaire/QuestionnaireForm';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

interface RecommendationResultProps {
  formData: QuestionnaireData;
}

// This is a placeholder - in a real app you'd fetch these from your backend
const generateOutfitSuggestions = (formData: QuestionnaireData) => {
  // In a real app, this would use the formData to generate appropriate recommendations
  return [
    {
      id: '1',
      title: 'Casual Elegance',
      description: 'A balanced outfit that flatters your body shape while providing comfort and style.',
      imageUrl: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
      items: [
        { name: 'Fitted white blouse', description: 'A crisp, tailored white blouse that accentuates your shape' },
        { name: 'High-waisted dark wash jeans', description: 'Slim-fit dark jeans that elongate your legs' },
        { name: 'Tan leather ankle boots', description: 'Comfortable 2-inch heel that adds height while remaining practical' },
        { name: 'Oversized beige cardigan', description: 'Soft, draped cardigan for layering and added warmth' },
        { name: 'Gold minimalist necklace', description: 'Simple pendant necklace to complete the look' }
      ],
      explanation: 'This outfit is designed to flatter your body type while incorporating your style preferences. The high-waisted jeans create a balanced silhouette, while the fitted blouse accentuates your shape. The color palette complements your skin tone, and the overall look is versatile enough for your destination.'
    },
    {
      id: '2',
      title: 'Modern Sophistication',
      description: 'An elevated look that combines modern trends with timeless elements.',
      imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
      items: [
        { name: 'Tailored black blazer', description: 'Structured blazer with slight padding at shoulders' },
        { name: 'Silk camisole in blush', description: 'Lightweight silk top in a flattering tone' },
        { name: 'Slim cropped trousers', description: 'Modern fit trousers in a neutral tone' },
        { name: 'Pointed leather mules', description: 'Sophisticated footwear with walkable heel' },
        { name: 'Statement earrings', description: 'Eye-catching yet elegant accessories' }
      ],
      explanation: 'This sophisticated outfit creates a balanced silhouette while incorporating your preferred formality level. The blazer adds structure to your upper body, while the slim trousers elongate your legs. The color palette is versatile and complements your skin tone, creating a polished look suitable for your occasion.'
    },
    {
      id: '3',
      title: 'Effortless Style',
      description: 'A relaxed yet put-together look that emphasizes comfort without sacrificing style.',
      imageUrl: 'https://images.unsplash.com/photo-1591374790133-55a463a2d546?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
      items: [
        { name: 'Oversized knit sweater', description: 'Soft, slouchy sweater in a neutral tone' },
        { name: 'Straight leg jeans', description: 'Classic denim with a modern cut' },
        { name: 'White leather sneakers', description: 'Clean, minimal footwear for comfort' },
        { name: 'Crossbody leather bag', description: 'Practical yet stylish accessory' },
        { name: 'Layered delicate necklaces', description: 'Simple jewelry to complete the look' }
      ],
      explanation: 'This relaxed outfit prioritizes comfort while maintaining a stylish appearance that aligns with your preferences. The oversized sweater balances your proportions, while the straight leg jeans create a modern silhouette. The neutral color palette works well with your skin tone and can be mixed and matched easily for travel.'
    }
  ];
};

const RecommendationResult: React.FC<RecommendationResultProps> = ({ formData }) => {
  const [outfits] = useState(generateOutfitSuggestions(formData));
  const [selectedOutfit, setSelectedOutfit] = useState(outfits[0]);
  const [savedOutfits, setSavedOutfits] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSaveOutfit = (outfitId: string) => {
    if (savedOutfits.includes(outfitId)) {
      setSavedOutfits(savedOutfits.filter(id => id !== outfitId));
      toast({
        title: "Outfit removed from favorites",
        description: "The outfit has been removed from your saved outfits.",
      });
    } else {
      setSavedOutfits([...savedOutfits, outfitId]);
      toast({
        title: "Outfit saved!",
        description: "The outfit has been added to your favorites.",
      });
    }
  };

  const handleShareOutfit = () => {
    // In a real app, this would implement social sharing functionality
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here in the full version.",
    });
  };

  const handleRegenerateOutfits = () => {
    // In a real app, this would call the API to generate new recommendations
    toast({
      title: "Regenerating outfits",
      description: "In the full version, this would generate new outfit recommendations.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold gradient-heading">Your Style Recommendations</h2>
          <Button variant="outline" className="border-styleklick-purple text-styleklick-purple" asChild>
            <Link to="/questionnaire" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Questionnaire</span>
            </Link>
          </Button>
        </div>
        <p className="text-gray-600 mt-2">
          Based on your preferences, here are personalized outfit recommendations for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Outfit Options</h3>
            <div className="space-y-4">
              {outfits.map((outfit) => (
                <Card 
                  key={outfit.id} 
                  className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                    selectedOutfit.id === outfit.id ? 'border-2 border-styleklick-purple' : ''
                  }`}
                  onClick={() => setSelectedOutfit(outfit)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={outfit.imageUrl} 
                        alt={outfit.title} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium">{outfit.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{outfit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center space-x-2 border-styleklick-purple text-styleklick-purple"
                onClick={handleRegenerateOutfits}
              >
                <RefreshCw size={16} />
                <span>Regenerate Outfits</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src={selectedOutfit.imageUrl} 
                alt={selectedOutfit.title} 
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`rounded-full bg-white ${
                    savedOutfits.includes(selectedOutfit.id) 
                      ? 'text-red-500' 
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleSaveOutfit(selectedOutfit.id)}
                >
                  <Heart className={savedOutfits.includes(selectedOutfit.id) ? 'fill-current' : ''} size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white text-gray-500"
                  onClick={handleShareOutfit}
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{selectedOutfit.title}</h3>
                <p className="text-gray-600">{selectedOutfit.description}</p>
              </div>
              
              <Tabs defaultValue="outfit">
                <TabsList className="mb-6">
                  <TabsTrigger value="outfit">Outfit Details</TabsTrigger>
                  <TabsTrigger value="explanation">Style Explanation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="outfit" className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Recommended Items</h4>
                    <ul className="space-y-4">
                      {selectedOutfit.items.map((item, index) => (
                        <li key={index} className="border-b border-gray-100 pb-3">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="explanation">
                  <div className="prose max-w-none">
                    <h4 className="text-lg font-semibold mb-4">Why This Works For You</h4>
                    <p className="text-gray-700">{selectedOutfit.explanation}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;
