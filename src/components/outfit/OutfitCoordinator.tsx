
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { Bookmark, RefreshCcw } from 'lucide-react';
import GenderSelectionStep from '../questionnaire/steps/GenderSelectionStep';

// Define outfit types
type ClothingItem = {
  name: string;
  image: string;
  color: string;
  type: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';
};

type OutfitSet = {
  tops: ClothingItem[];
  bottoms: ClothingItem[];
  outerwear: ClothingItem[];
  shoes: ClothingItem[];
  accessories: ClothingItem[];
};

const OutfitCoordinator: React.FC = () => {
  const [outfitSets, setOutfitSets] = useState<OutfitSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showGenderSelection, setShowGenderSelection] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Sample outfit data - would normally come from API based on user preferences
  const generateOutfits = () => {
    setLoading(true);
    
    // This would normally be an API call to get recommendations based on the user's preferences
    setTimeout(() => {
      const newOutfits: OutfitSet[] = [
        {
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
          }]
        },
        {
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
          }]
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

  const saveLookToLookbook = async (outfit: OutfitSet) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save outfits to your lookbook.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Prepare the outfit data for saving
      const outfitData = {
        user_id: user.id,
        outfit_data: outfit,
        created_at: new Date().toISOString(),
        tags: ["casual"], // Default tag, could be customized later
        name: "My Outfit" // Default name, could be customized later
      };

      // Save to Supabase
      const { error } = await supabase
        .from('lookbook')
        .insert(outfitData);

      if (error) throw error;

      toast({
        title: "Look saved!",
        description: "You'll find it in your Lookbook under your profile.",
      });
    } catch (error: any) {
      console.error('Error saving outfit:', error);
      toast({
        title: "Failed to save outfit",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (showGenderSelection) {
    return <GenderSelectionStep onSelectGender={handleGenderSelect} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Your Style Recommendations</h2>
          <p className="text-gray-600">
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
        <div className="grid gap-8">
          {outfitSets.map((outfit, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>Look {index + 1}</CardTitle>
                <CardDescription>
                  A perfectly coordinated outfit for your style
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <OutfitItemCard items={outfit.tops} type="Top" />
                  <OutfitItemCard items={outfit.bottoms} type="Bottom" />
                  <OutfitItemCard items={outfit.outerwear} type="Outerwear" />
                  <OutfitItemCard items={outfit.shoes} type="Shoes" />
                  <OutfitItemCard items={outfit.accessories} type="Accessories" />
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <h4 className="font-medium">Complete Look</h4>
                    <p className="text-sm text-gray-500">All items coordinate perfectly</p>
                  </div>
                  
                  <Button 
                    variant="default" 
                    onClick={() => saveLookToLookbook(outfit)}
                    className="gap-2"
                  >
                    <Bookmark size={16} />
                    Save to Lookbook
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Component for displaying a clothing item card
const OutfitItemCard: React.FC<{ 
  items: ClothingItem[],
  type: string
}> = ({ items, type }) => {
  if (!items.length) return null;
  
  const item = items[0]; // For now just display first item
  
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden h-full">
      <div className="bg-gray-100 aspect-square flex items-center justify-center">
        <img 
          src={item.image} 
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-3 bg-white">
        <h4 className="font-medium text-sm">{type}</h4>
        <p className="text-xs text-gray-500 truncate">{item.name}</p>
      </div>
    </div>
  );
};

export default OutfitCoordinator;
