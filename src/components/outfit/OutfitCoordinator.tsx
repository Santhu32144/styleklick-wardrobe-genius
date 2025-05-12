
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { Bookmark, RefreshCcw, Heart, Calendar, Tag } from 'lucide-react';
import GenderSelectionStep from '../questionnaire/steps/GenderSelectionStep';

// Define outfit types
type ClothingItem = {
  name: string;
  image: string;
  color: string;
  type: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';
};

type OutfitSet = {
  id?: string;
  tops: ClothingItem[];
  bottoms: ClothingItem[];
  outerwear: ClothingItem[];
  shoes: ClothingItem[];
  accessories: ClothingItem[];
  tags?: string[];
  name?: string;
  savedOn?: string;
};

const OutfitCoordinator: React.FC = () => {
  const [outfitSets, setOutfitSets] = useState<OutfitSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showGenderSelection, setShowGenderSelection] = useState(true);
  const [savedOutfits, setSavedOutfits] = useState<string[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Sample outfit data - would normally come from API based on user preferences
  const generateOutfits = () => {
    setLoading(true);
    
    // This would normally be an API call to get recommendations based on the user's preferences
    setTimeout(() => {
      const newOutfits: OutfitSet[] = [
        {
          id: '1',
          tops: [{ 
            name: 'White Cotton T-Shirt', 
            image: '/placeholder.svg', 
            color: 'white',
            type: 'top'
          }],
          bottoms: [{ 
            name: 'Blue Jeans', 
            image: '/placeholder.svg', 
            color: 'blue',
            type: 'bottom'
          }],
          outerwear: [{ 
            name: 'Black Leather Jacket', 
            image: '/placeholder.svg', 
            color: 'black',
            type: 'outerwear'
          }],
          shoes: [{ 
            name: 'White Sneakers', 
            image: '/placeholder.svg', 
            color: 'white',
            type: 'shoes'
          }],
          accessories: [{ 
            name: 'Silver Watch', 
            image: '/placeholder.svg', 
            color: 'silver',
            type: 'accessory'
          }],
          tags: ['Casual', 'Weekend', 'Urban'],
          name: 'Casual Weekend Look'
        },
        {
          id: '2',
          tops: [{ 
            name: 'Blue Button-Down Shirt', 
            image: '/placeholder.svg', 
            color: 'blue',
            type: 'top'
          }],
          bottoms: [{ 
            name: 'Khaki Chinos', 
            image: '/placeholder.svg', 
            color: 'beige',
            type: 'bottom'
          }],
          outerwear: [{ 
            name: 'Navy Blazer', 
            image: '/placeholder.svg', 
            color: 'navy',
            type: 'outerwear'
          }],
          shoes: [{ 
            name: 'Brown Loafers', 
            image: '/placeholder.svg', 
            color: 'brown',
            type: 'shoes'
          }],
          accessories: [{ 
            name: 'Leather Belt', 
            image: '/placeholder.svg', 
            color: 'brown',
            type: 'accessory'
          }],
          tags: ['Business Casual', 'Office', 'Professional'],
          name: 'Business Casual Outfit'
        },
        {
          id: '3',
          tops: [{ 
            name: 'Gray Sweater', 
            image: '/placeholder.svg', 
            color: 'gray',
            type: 'top'
          }],
          bottoms: [{ 
            name: 'Black Jeans', 
            image: '/placeholder.svg', 
            color: 'black',
            type: 'bottom'
          }],
          outerwear: [{ 
            name: 'Camel Coat', 
            image: '/placeholder.svg', 
            color: 'beige',
            type: 'outerwear'
          }],
          shoes: [{ 
            name: 'Black Chelsea Boots', 
            image: '/placeholder.svg', 
            color: 'black',
            type: 'shoes'
          }],
          accessories: [{ 
            name: 'Black Scarf', 
            image: '/placeholder.svg', 
            color: 'black',
            type: 'accessory'
          }],
          tags: ['Winter', 'Elegant', 'Casual'],
          name: 'Winter Casual Look'
        }
      ];
      
      setOutfitSets(newOutfits);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (selectedGender) {
      generateOutfits();
    }
  }, [selectedGender]);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setShowGenderSelection(false);
  };

  const handleRefresh = () => {
    generateOutfits();
  };

  const toggleSaveOutfit = (outfitId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save outfits to your lookbook.",
        variant: "destructive"
      });
      return;
    }

    if (savedOutfits.includes(outfitId)) {
      setSavedOutfits(savedOutfits.filter(id => id !== outfitId));
      toast({
        title: "Outfit removed",
        description: "The outfit has been removed from your lookbook.",
      });
    } else {
      setSavedOutfits([...savedOutfits, outfitId]);
      toast({
        title: "Look saved!",
        description: "You'll find it in your Lookbook under your profile.",
      });
    }
  };
  
  const handleViewMore = (outfitId: string) => {
    // This would navigate to a detailed view in the real application
    toast({
      title: "View Details",
      description: "This would show outfit details in the full application.",
    });
  };

  if (showGenderSelection) {
    return <GenderSelectionStep onSelectGender={handleGenderSelect} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Your Style Recommendations</h2>
          <p className="text-styleklick-airbnb-gray-dark">
            Based on your {selectedGender === 'male' ? 'male' : 'female'} preferences
          </p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh Outfits
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p>Generating stylish outfit recommendations for you...</p>
          <div className="mt-4 h-2 w-40 mx-auto bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-styleklick-purple rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfitSets.map((outfit) => (
            <div key={outfit.id} className="outfit-card overflow-hidden">
              {/* Outfit Image */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="grid grid-cols-2 gap-1 p-2 w-full h-full">
                    <div className="bg-gray-200 rounded">
                      <img 
                        src={outfit.tops[0].image} 
                        alt={outfit.tops[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-200 rounded">
                      <img 
                        src={outfit.bottoms[0].image} 
                        alt={outfit.bottoms[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-200 rounded">
                      <img 
                        src={outfit.outerwear[0].image} 
                        alt={outfit.outerwear[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-200 rounded">
                      <img 
                        src={outfit.shoes[0].image} 
                        alt={outfit.shoes[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Save Button (Heart) */}
                <button 
                  onClick={() => toggleSaveOutfit(outfit.id || '')}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors z-10"
                >
                  <Heart 
                    className={`h-5 w-5 ${savedOutfits.includes(outfit.id || '') ? 'fill-styleklick-airbnb-pink text-styleklick-airbnb-pink' : 'text-gray-600'}`}
                  />
                </button>
              </div>
              
              {/* Outfit Info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{outfit.name}</h3>
                </div>
                
                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {outfit.tags && outfit.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-styleklick-soft-blue/50 border-0 text-styleklick-airbnb-navy text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-1/2 mr-2 border-styleklick-airbnb-gray-medium"
                    onClick={() => handleViewMore(outfit.id || '')}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="default"
                    size="sm"
                    className="w-1/2 bg-styleklick-airbnb-pink hover:bg-styleklick-airbnb-red"
                    onClick={() => toggleSaveOutfit(outfit.id || '')}
                  >
                    {savedOutfits.includes(outfit.id || '') ? 'Saved' : 'Save Look'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Style Calendar Preview (Optional) */}
      <div className="mt-12 style-calendar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Style Calendar</h2>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </div>
        <p className="text-styleklick-airbnb-gray-dark mb-4">
          Plan your outfits for upcoming events and save your favorite looks
        </p>
        <div className="p-4 text-center border border-dashed border-gray-300 rounded-lg">
          <p className="text-styleklick-airbnb-gray-dark">
            Coming soon! Plan and save your outfits for specific dates and events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutfitCoordinator;
