import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shirt, Footprints, Camera, ArrowRight } from 'lucide-react';

type Category = 'outfits' | 'footwear' | 'poses';

const StyleRecommendationsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('outfits');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample data for each category
  const outfitsData = [
    {
      id: 1,
      name: "Urban Casual",
      description: "Perfect for city adventures",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Fall Elegance",
      description: "Cozy autumn vibes",
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=300&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-d6b8f28c2fea?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&h=500&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Adventure Ready",
      description: "Outdoor exploration style",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&h=500&fit=crop"
      ]
    }
  ];

  const footwearData = [
    {
      id: 1,
      name: "Classic Sneakers",
      description: "Versatile everyday comfort",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=400&h=400&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Leather Boots",
      description: "Sturdy and stylish",
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1582897085656-0c43f23c2cba?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1582897085656-0c43f23c2cba?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586525198428-2db60de18d5f?w=400&h=400&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Summer Sandals",
      description: "Light and breathable",
      image: "https://images.unsplash.com/photo-1582897085656-0c43f23c2cba?w=300&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1582897085656-0c43f23c2cba?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1615750185825-9e0525460f5b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608667508764-6ac39f8b0267?w=400&h=400&fit=crop"
      ]
    }
  ];

  const posesData = [
    {
      id: 1,
      name: "Confident Lean",
      description: "Lean against a wall with arms crossed",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1494790108755-2616c5e2e4d3?w=400&h=500&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Walking Shot",
      description: "Natural walking pose, looking ahead",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Casual Stand",
      description: "Hands in pockets, relaxed stance",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop"
      ]
    }
  ];

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'outfits': return outfitsData;
      case 'footwear': return footwearData;
      case 'poses': return posesData;
      default: return outfitsData;
    }
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  if (selectedItem) {
    return (
      <Layout>
        <div className="py-12 bg-gray-50 min-h-screen">
          <div className="container max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedItem(null)}
              className="mb-6"
            >
              ← Back to Recommendations
            </Button>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{selectedItem.name}</h1>
              <p className="text-gray-600">{selectedItem.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedItem.gallery.map((image: string, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img 
                      src={image} 
                      alt={`${selectedItem.name} ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium">{selectedItem.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Style Recommendations</h1>
            <p className="text-gray-600">Discover your perfect look with AI-powered suggestions</p>
          </div>

          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as Category)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="outfits" className="flex items-center gap-2">
                <Shirt size={16} />
                🧥 Outfits
              </TabsTrigger>
              <TabsTrigger value="footwear" className="flex items-center gap-2">
                <Footprints size={16} />
                👟 Footwear
              </TabsTrigger>
              <TabsTrigger value="poses" className="flex items-center gap-2">
                <Camera size={16} />
                🤳 Pose Ideas
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getCurrentData().map((item) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={() => handleItemClick(item)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                            Explore this Look <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <Badge variant="outline" className="bg-styleklick-soft-blue/30">
                          {getCurrentData().length} photos
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StyleRecommendationsPage;
