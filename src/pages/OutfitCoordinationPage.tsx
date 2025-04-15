
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OutfitCoordinator from '../components/outfit/OutfitCoordinator';
import AvatarStyler from '../components/avatar/AvatarStyler';
import { useAuth } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const OutfitCoordinationPage = () => {
  const [activeTab, setActiveTab] = useState('coordinator');
  const { user } = useAuth();

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <Layout>
        <div className="py-20 bg-gray-50 min-h-screen">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login or create an account to access the outfit coordination features.
            </p>
            <Button className="w-full" asChild>
              <Link to="/auth" state={{ returnTo: '/outfit-coordination' }}>
                <LogIn className="mr-2 h-4 w-4" /> Login or Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 gradient-heading">Your Style Lab</h1>
          <p className="text-gray-600 mb-8">
            Create and personalize your outfits with our interactive styling tools
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger value="coordinator">Outfit Coordinator</TabsTrigger>
              <TabsTrigger value="avatar">Avatar Styling</TabsTrigger>
            </TabsList>
            
            <TabsContent value="coordinator">
              <OutfitCoordinator />
            </TabsContent>
            
            <TabsContent value="avatar">
              <AvatarStyler onStyleComplete={() => setActiveTab('coordinator')} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default OutfitCoordinationPage;
