
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Pencil } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

// Interface for saved outfit type
interface SavedOutfit {
  id: string;
  createdAt: string;
  imageUrl: string; 
  tags: string[];
  location?: string;
  occasion?: string;
  style?: string;
}

// Mock data for initial testing
const mockSavedOutfits: SavedOutfit[] = [
  {
    id: '1',
    createdAt: '2025-04-30',
    imageUrl: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Beach', 'Summer'],
    location: 'Beach',
    occasion: 'Casual',
    style: 'Bohemian'
  },
  {
    id: '2',
    createdAt: '2025-04-28',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Formal', 'Evening'],
    location: 'Restaurant',
    occasion: 'Dinner',
    style: 'Elegant'
  },
  {
    id: '3',
    createdAt: '2025-04-25',
    imageUrl: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Office', 'Professional'],
    location: 'Office',
    occasion: 'Work',
    style: 'Business'
  }
];

const LookbookPage = () => {
  const { user, loading } = useAuth();
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(mockSavedOutfits);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // If not authenticated, redirect to login
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ returnTo: '/lookbook' }} />;
  }

  const handleRemoveOutfit = (outfitId: string) => {
    setSavedOutfits(savedOutfits.filter(outfit => outfit.id !== outfitId));
  };

  const handleRecreateOutfit = (outfitId: string) => {
    // Navigate to outfit coordination with the outfit data
    console.log('Recreating outfit:', outfitId);
    // In a real app, you would navigate to the outfit coordination page with the outfit data
  };

  // Filter outfits based on active filter
  const filteredOutfits = activeFilter === 'all' 
    ? savedOutfits 
    : savedOutfits.filter(outfit => 
        outfit.location === activeFilter || 
        outfit.occasion === activeFilter || 
        outfit.style === activeFilter || 
        outfit.tags.includes(activeFilter)
      );

  // Get unique filter options
  const getUniqueFilterOptions = () => {
    const locations = savedOutfits.map(o => o.location).filter(Boolean) as string[];
    const occasions = savedOutfits.map(o => o.occasion).filter(Boolean) as string[];
    const styles = savedOutfits.map(o => o.style).filter(Boolean) as string[];
    const tags = savedOutfits.flatMap(o => o.tags);
    
    return Array.from(new Set([...locations, ...occasions, ...styles, ...tags]));
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-12 bg-gray-50 min-h-screen">
          <div className="container mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <p>Loading lookbook...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl gradient-heading">My Lookbook</CardTitle>
              <CardDescription>
                View and manage your saved outfits and style inspirations
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveFilter('all')}
                  className="mb-2"
                >
                  All Outfits
                </TabsTrigger>
                {getUniqueFilterOptions().map(filter => (
                  <TabsTrigger 
                    key={filter} 
                    value={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="mb-2"
                  >
                    {filter}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {/* All outfits will show here by default */}
              </TabsContent>
              
              {getUniqueFilterOptions().map(filter => (
                <TabsContent key={filter} value={filter} className="mt-0">
                  {/* Each filter will show its filtered outfits */}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfits.length > 0 ? (
              filteredOutfits.map((outfit) => (
                <Card key={outfit.id} className="overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src={outfit.imageUrl} 
                      alt="Saved outfit" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {outfit.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Saved on {new Date(outfit.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRemoveOutfit(outfit.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleRecreateOutfit(outfit.id)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Recreate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 mb-4">You haven't saved any outfits yet.</p>
                <Button asChild>
                  <a href="/outfit-coordination">Create Your First Outfit</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LookbookPage;
