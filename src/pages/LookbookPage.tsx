import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Upload, Heart, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

type LookbookItem = {
  id: string;
  user_id: string;
  image_url: string;
  title: string;
  description?: string;
  created_at: string;
};

const LookbookPage = () => {
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchLookbookItems();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchLookbookItems = async () => {
    try {
      setIsLoading(true);
      
      // For now, we'll use mock data
      // In a real app, you would fetch from Supabase like:
      // const { data, error } = await supabase
      //   .from('lookbook_items')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      
      // Mock data for development
      const mockData: LookbookItem[] = [
        {
          id: '1',
          user_id: user?.id || '',
          image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Summer Casual',
          description: 'Perfect for a day out in the city',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: user?.id || '',
          image_url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Evening Elegance',
          description: 'Dinner date outfit',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          user_id: user?.id || '',
          image_url: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Business Casual',
          description: 'Office appropriate but stylish',
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
      
      setLookbookItems(mockData);
    } catch (error: any) {
      console.error('Error fetching lookbook items:', error);
      toast({
        title: "Error loading lookbook",
        description: error.message || "Could not load your lookbook items",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, you would upload to Supabase storage:
      // const { data, error } = await supabase.storage
      //   .from('lookbook')
      //   .upload(`${user.id}/${Date.now()}-${file.name}`, file);
      
      // if (error) throw error;
      
      // const imageUrl = supabase.storage.from('lookbook').getPublicUrl(data.path).publicURL;
      
      // Mock upload success
      setTimeout(() => {
        // Create a new lookbook item
        const newItem: LookbookItem = {
          id: Date.now().toString(),
          user_id: user?.id || '',
          image_url: URL.createObjectURL(file),
          title: 'New Look',
          description: 'Recently added to your lookbook',
          created_at: new Date().toISOString(),
        };
        
        setLookbookItems([newItem, ...lookbookItems]);
        
        toast({
          title: "Upload successful",
          description: "Your image has been added to your lookbook.",
        });
        
        setIsUploading(false);
      }, 1500);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload your image",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  // If user is not authenticated, redirect to auth page
  if (!user && !isLoading) {
    return <Navigate to="/auth" state={{ returnTo: '/lookbook' }} />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Lookbook</h1>
            <p className="text-gray-600">Save and organize your favorite outfits and styles</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="relative" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleUpload}
                    accept="image/*"
                    disabled={isUploading}
                  />
                </>
              )}
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-styleklick-purple" />
          </div>
        ) : lookbookItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center">
                <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Your lookbook is empty</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start building your personal style collection by uploading images or saving recommendations.
                </p>
                <Button className="relative">
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Your First Look</span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleUpload}
                    accept="image/*"
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lookbookItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <span className="text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Add new lookbook card */}
            <Card className="flex items-center justify-center h-64 border-dashed">
              <Button variant="ghost" className="flex flex-col h-full w-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 mb-2 text-gray-400" />
                  <span className="text-gray-600">Add New Look</span>
                </div>
              </Button>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LookbookPage;
