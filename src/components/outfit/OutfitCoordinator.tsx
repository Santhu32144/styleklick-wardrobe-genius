import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shirt, ShoppingBag, Heart, Check, 
  RefreshCcw, Bookmark, Image, Paintbrush 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

interface ClothingItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  pattern: string;
  style: string;
  category: 'top' | 'bottom';
}

const tops: ClothingItem[] = [
  {
    id: 't1',
    name: 'White Button-Down Shirt',
    description: 'Classic white button-down shirt in cotton',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'white',
    pattern: 'solid',
    style: 'formal',
    category: 'top'
  },
  {
    id: 't2',
    name: 'Navy Polo Shirt',
    description: 'Comfortable navy polo shirt in pique cotton',
    imageUrl: 'https://images.unsplash.com/photo-1608945424732-55b1040a0b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'navy',
    pattern: 'solid',
    style: 'casual',
    category: 'top'
  },
  {
    id: 't3',
    name: 'Striped T-Shirt',
    description: 'Blue and white striped cotton t-shirt',
    imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'blue',
    pattern: 'striped',
    style: 'casual',
    category: 'top'
  },
  {
    id: 't4',
    name: 'Black Turtleneck',
    description: 'Fitted black turtleneck sweater',
    imageUrl: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'black',
    pattern: 'solid',
    style: 'smart casual',
    category: 'top'
  }
];

const bottoms: ClothingItem[] = [
  {
    id: 'b1',
    name: 'Blue Jeans',
    description: 'Classic blue straight-leg jeans',
    imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'blue',
    pattern: 'solid',
    style: 'casual',
    category: 'bottom'
  },
  {
    id: 'b2',
    name: 'Black Dress Pants',
    description: 'Tailored black dress pants in wool blend',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'black',
    pattern: 'solid',
    style: 'formal',
    category: 'bottom'
  },
  {
    id: 'b3',
    name: 'Khaki Chinos',
    description: 'Relaxed fit khaki chino pants',
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'khaki',
    pattern: 'solid',
    style: 'smart casual',
    category: 'bottom'
  },
  {
    id: 'b4',
    name: 'Gray Shorts',
    description: 'Casual gray cotton shorts',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'gray',
    pattern: 'solid',
    style: 'casual',
    category: 'bottom'
  }
];

const colorMatches: Record<string, string[]> = {
  'white': ['black', 'navy', 'blue', 'gray', 'khaki'],
  'black': ['white', 'gray', 'red'],
  'navy': ['white', 'gray', 'khaki'],
  'blue': ['white', 'gray', 'khaki'],
  'gray': ['white', 'black', 'navy', 'blue'],
  'khaki': ['white', 'navy', 'blue', 'black']
};

const styleMatches: Record<string, string[]> = {
  'formal': ['formal', 'smart casual'],
  'smart casual': ['smart casual', 'formal', 'casual'],
  'casual': ['casual', 'smart casual']
};

const OutfitCoordinator: React.FC = () => {
  const [selectedTop, setSelectedTop] = useState<ClothingItem | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<ClothingItem | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<{top: ClothingItem, bottom: ClothingItem}[]>([]);
  const { toast } = useToast();
  
  const getSuggestedTops = () => {
    if (!selectedBottom) return tops;
    
    return tops.filter(top => {
      const colorMatch = colorMatches[top.color]?.includes(selectedBottom.color) || colorMatches[selectedBottom.color]?.includes(top.color);
      const styleMatch = styleMatches[top.style]?.includes(selectedBottom.style) || styleMatches[selectedBottom.style]?.includes(top.style);
      
      return colorMatch && styleMatch;
    });
  };
  
  const getSuggestedBottoms = () => {
    if (!selectedTop) return bottoms;
    
    return bottoms.filter(bottom => {
      const colorMatch = colorMatches[bottom.color]?.includes(selectedTop.color) || colorMatches[selectedTop.color]?.includes(bottom.color);
      const styleMatch = styleMatches[bottom.style]?.includes(selectedTop.style) || styleMatches[selectedTop.style]?.includes(bottom.style);
      
      return colorMatch && styleMatch;
    });
  };
  
  const handleSelectTop = (top: ClothingItem) => {
    setSelectedTop(top);
    
    if (!selectedBottom) {
      const suggestedBottoms = getSuggestedBottoms();
      if (suggestedBottoms.length > 0) {
        toast({
          title: "Outfit Coordinator",
          description: `We suggest pairing with ${suggestedBottoms[0].name} or similar ${suggestedBottoms[0].color} bottoms.`,
        });
      }
    }
  };
  
  const handleSelectBottom = (bottom: ClothingItem) => {
    setSelectedBottom(bottom);
    
    if (!selectedTop) {
      const suggestedTops = getSuggestedTops();
      if (suggestedTops.length > 0) {
        toast({
          title: "Outfit Coordinator",
          description: `We suggest pairing with ${suggestedTops[0].name} or similar ${suggestedTops[0].color} tops.`,
        });
      }
    }
  };
  
  const handleSaveOutfit = () => {
    if (selectedTop && selectedBottom) {
      const newOutfit = {
        id: Date.now().toString(),
        top: selectedTop,
        bottom: selectedBottom,
        dateSaved: new Date().toISOString().split('T')[0],
        tags: [selectedTop.style, selectedBottom.style],
      };
      
      setSavedOutfits([...savedOutfits, newOutfit]);
      
      toast({
        title: "Outfit Saved",
        description: "Your coordinated outfit has been saved to your lookbook.",
        action: (
          <Link to="/lookbook" className="text-styleklick-purple hover:underline">
            View Lookbook
          </Link>
        ),
      });
    } else {
      toast({
        title: "Cannot Save Outfit",
        description: "Please select both a top and bottom first.",
        variant: "destructive"
      });
    }
  };
  
  const handleResetSelections = () => {
    setSelectedTop(null);
    setSelectedBottom(null);
    
    toast({
      title: "Selections Cleared",
      description: "Your outfit selections have been reset.",
    });
  };
  
  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Outfit Coordinator</CardTitle>
        <CardDescription>
          Mix and match tops and bottoms to create your perfect outfit combination
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Tabs defaultValue="tops" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tops" className="flex items-center">
                  <Shirt className="mr-2 h-4 w-4" />
                  <span>Tops</span>
                </TabsTrigger>
                <TabsTrigger value="bottoms" className="flex items-center">
                  <span className="mr-2">👖</span>
                  <span>Bottoms</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tops" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {getSuggestedTops().map(top => (
                    <div 
                      key={top.id}
                      className={`border rounded-md p-2 cursor-pointer hover:shadow-md transition-all ${
                        selectedTop?.id === top.id ? 'ring-2 ring-styleklick-purple' : ''
                      }`}
                      onClick={() => handleSelectTop(top)}
                    >
                      <div className="aspect-square relative overflow-hidden rounded-md">
                        <img src={top.imageUrl} alt={top.name} className="w-full h-full object-cover" />
                        {selectedTop?.id === top.id && (
                          <div className="absolute top-2 right-2 bg-styleklick-purple text-white p-1 rounded-full">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-medium mt-2">{top.name}</h4>
                      <p className="text-xs text-gray-500">{top.color}, {top.style}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="bottoms" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {getSuggestedBottoms().map(bottom => (
                    <div 
                      key={bottom.id}
                      className={`border rounded-md p-2 cursor-pointer hover:shadow-md transition-all ${
                        selectedBottom?.id === bottom.id ? 'ring-2 ring-styleklick-purple' : ''
                      }`}
                      onClick={() => handleSelectBottom(bottom)}
                    >
                      <div className="aspect-square relative overflow-hidden rounded-md">
                        <img src={bottom.imageUrl} alt={bottom.name} className="w-full h-full object-cover" />
                        {selectedBottom?.id === bottom.id && (
                          <div className="absolute top-2 right-2 bg-styleklick-purple text-white p-1 rounded-full">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-medium mt-2">{bottom.name}</h4>
                      <p className="text-xs text-gray-500">{bottom.color}, {bottom.style}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Your Outfit Preview</h3>
            
            <div className="space-y-4">
              {selectedTop ? (
                <div className="bg-white p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <img src={selectedTop.imageUrl} alt={selectedTop.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h4 className="font-medium">{selectedTop.name}</h4>
                      <p className="text-sm text-gray-500">{selectedTop.description}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 bg-white rounded-md p-8 text-center">
                  <Shirt className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Select a top</p>
                </div>
              )}
              
              {selectedBottom ? (
                <div className="bg-white p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <img src={selectedBottom.imageUrl} alt={selectedBottom.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h4 className="font-medium">{selectedBottom.name}</h4>
                      <p className="text-sm text-gray-500">{selectedBottom.description}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 bg-white rounded-md p-8 text-center">
                  <span className="h-12 w-12 mx-auto text-gray-400 mb-2">👖</span>
                  <p className="text-gray-500">Select bottoms</p>
                </div>
              )}
              
              {selectedTop && selectedBottom && (
                <div className="bg-white p-3 rounded-md border-l-4 border-styleklick-purple">
                  <h4 className="font-medium">Style Match Analysis</h4>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Color harmony:</span> The {selectedTop.color} top pairs 
                    {colorMatches[selectedTop.color]?.includes(selectedBottom.color) ? 
                      ' perfectly ' : ' well '} 
                    with {selectedBottom.color} bottoms.
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Style compatibility:</span> This {selectedTop.style} top and {selectedBottom.style} bottom 
                    create a {selectedTop.style === selectedBottom.style ? 'cohesive' : 'balanced'} look.
                  </p>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleResetSelections}
                >
                  <RefreshCcw size={14} />
                  <span>Reset</span>
                </Button>
                
                <Button 
                  size="sm" 
                  className="gap-2 ml-auto"
                  onClick={handleSaveOutfit}
                  disabled={!selectedTop || !selectedBottom}
                >
                  <Heart size={14} />
                  <span>Save Outfit</span>
                </Button>
              </div>
            </div>
            
            {savedOutfits.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Bookmark className="h-4 w-4 mr-1" />
                  <span>Saved Outfits ({savedOutfits.length})</span>
                </h4>
                <div className="space-y-2">
                  {savedOutfits.slice(0, 2).map((outfit, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-md">
                      <img src={outfit.top.imageUrl} alt={outfit.top.name} className="w-10 h-10 object-cover rounded-md" />
                      <span className="text-gray-500">+</span>
                      <img src={outfit.bottom.imageUrl} alt={outfit.bottom.name} className="w-10 h-10 object-cover rounded-md" />
                      <span className="text-xs">{outfit.top.name} with {outfit.bottom.name}</span>
                    </div>
                  ))}
                  {savedOutfits.length > 2 && (
                    <Button variant="link" size="sm" className="text-styleklick-purple w-full">
                      View all saved outfits
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="gap-2">
            <ShoppingBag size={16} />
            <span>Shop These Items</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Image size={16} />
            <span>Share Outfit</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Paintbrush size={16} />
            <span>Get More Suggestions</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutfitCoordinator;
