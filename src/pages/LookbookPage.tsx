
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { Search, Tag, Calendar, Trash2, Edit, ArrowRight, BookOpen } from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Types for lookbook entries
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

type LookbookEntry = {
  id: string;
  user_id: string;
  outfit_data: OutfitSet;
  created_at: string;
  tags: string[];
  name: string;
};

const LookbookPage = () => {
  const [lookbookItems, setLookbookItems] = useState<LookbookEntry[]>([]);
  const [filteredItems, setFilteredItems] = useState<LookbookEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ returnTo: '/lookbook' }} />;
  }

  useEffect(() => {
    if (user) {
      fetchLookbookItems();
    }
  }, [user]);

  useEffect(() => {
    if (lookbookItems.length > 0) {
      let filtered = [...lookbookItems];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      // Apply tag filter
      if (selectedTag) {
        filtered = filtered.filter(item => 
          item.tags.includes(selectedTag)
        );
      }
      
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [lookbookItems, searchTerm, selectedTag]);

  const fetchLookbookItems = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('lookbook')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setLookbookItems(data || []);
    } catch (error: any) {
      console.error('Error fetching lookbook items:', error);
      toast({
        title: "Failed to load lookbook",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveOutfit = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('lookbook')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
      
      // Update the local state to remove the deleted item
      setLookbookItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "Outfit removed",
        description: "The outfit has been removed from your lookbook",
      });
    } catch (error: any) {
      console.error('Error removing outfit:', error);
      toast({
        title: "Failed to remove outfit",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleRecreateOutfit = (outfit: OutfitSet) => {
    // Navigate to outfit coordinator with the outfit data
    // This is a placeholder - in a real implementation you would pass the outfit data
    navigate('/outfit-coordination');
    toast({
      title: "Recreating outfit",
      description: "You can now modify this outfit in the Style Lab",
    });
  };

  // Get all unique tags from lookbook items
  const getAllTags = () => {
    const tagSet = new Set<string>();
    lookbookItems.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 gradient-heading">My Lookbook</h1>
              <p className="text-gray-600">Your collection of saved outfits and styles</p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0" 
              onClick={() => navigate('/outfit-coordination')}
            >
              Create New Outfit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr,auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or tags..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs 
              defaultValue="all" 
              className="md:w-64"
              onValueChange={(value) => setSelectedTag(value === 'all' ? null : value)}
            >
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                {getAllTags().slice(0, 2).map(tag => (
                  <TabsTrigger key={tag} value={tag} className="flex-1 capitalize">
                    {tag}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-300 animate-pulse" />
              <p className="mt-4 text-gray-500">Loading your lookbook...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(item.created_at)}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="flex overflow-x-auto snap-x snap-mandatory pb-2">
                      {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map((category) => {
                        const items = item.outfit_data[category as keyof OutfitSet] as ClothingItem[];
                        if (!items || items.length === 0) return null;
                        
                        const clothingItem = items[0];
                        return (
                          <div 
                            key={category} 
                            className="snap-start w-32 shrink-0 p-2"
                          >
                            <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                              <img 
                                src={clothingItem.image || '/placeholder.svg'} 
                                alt={clothingItem.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs mt-1 text-center truncate">{clothingItem.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="px-6 py-2 flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="capitalize">
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <Separator />
                  
                  <CardFooter className="flex justify-between p-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRecreateOutfit(item.outfit_data)}
                    >
                      <Edit size={14} className="mr-1" />
                      Recreate
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveOutfit(item.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <BookOpen className="mx-auto h-16 w-16 text-gray-300" />
              <h2 className="mt-4 text-xl font-semibold">Your lookbook is empty</h2>
              <p className="mt-2 text-gray-500">
                Save outfits from the Style Lab to see them here
              </p>
              <Button 
                className="mt-6" 
                onClick={() => navigate('/outfit-coordination')}
              >
                Create Your First Outfit
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LookbookPage;
