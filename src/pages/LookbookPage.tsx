
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LookbookItem {
  id: string;
  name: string;
  outfit_data: any;
  tags: string[];
  created_at: string;
}

const LookbookPage = () => {
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchLookbookItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('lookbook')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLookbookItems(data || []);
    } catch (error) {
      console.error('Error fetching lookbook items:', error);
      toast({
        title: "Error",
        description: "Failed to load your lookbook items.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('lookbook')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setLookbookItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Removed from Lookbook",
        description: "The item has been removed from your lookbook.",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from lookbook.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchLookbookItems();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Login Required</h1>
            <p className="text-gray-600 mb-6">Please login to view your lookbook.</p>
            <Button asChild>
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">My Lookbook</h1>
            <p className="text-gray-600">Your saved style recommendations</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : lookbookItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Your lookbook is empty</h2>
              <p className="text-gray-500 mb-6">Start saving outfits you love to build your personal collection.</p>
              <Button asChild>
                <Link to="/questionnaire">
                  <Plus className="mr-2 h-4 w-4" />
                  Find Your Style
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lookbookItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100">
                    {item.outfit_data?.imageUrl && (
                      <img
                        src={item.outfit_data.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    {item.outfit_data?.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.outfit_data.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      Saved {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LookbookPage;
