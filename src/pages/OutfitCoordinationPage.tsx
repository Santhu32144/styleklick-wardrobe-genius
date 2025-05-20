import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import OutfitCoordinator from '@/components/outfit/OutfitCoordinator';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const OutfitCoordinationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Login Required</h2>
            <p className="text-gray-600 mb-6 text-center">
              Please login to access the Outfit Coordination feature.
            </p>
            <Button className="w-full" onClick={() => navigate('/auth')}>
              <LogIn className="mr-2 h-4 w-4" /> Login
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
          <h1 className="text-3xl font-bold mb-6 text-center">Outfit Coordination</h1>
          <OutfitCoordinator />
        </div>
      </div>
    </Layout>
  );
};

export default OutfitCoordinationPage;

