
import React from 'react';
import Layout from '@/components/layout/Layout';
import { SavedOutfits } from '@/components/lookbook/SavedOutfits';
import { useAuth } from '@/components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const LookbookPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" state={{ returnTo: '/lookbook' }} />;
  }

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 gradient-heading">Your Lookbook</h1>
          <p className="text-gray-600 mb-8">View and manage your saved outfit combinations</p>
          <SavedOutfits />
        </div>
      </div>
    </Layout>
  );
};

export default LookbookPage;
