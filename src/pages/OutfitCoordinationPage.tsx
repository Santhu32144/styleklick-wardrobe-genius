
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OutfitCoordinator from '../components/outfit/OutfitCoordinator';
import AvatarStyler from '../components/avatar/AvatarStyler';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const OutfitCoordinationPage = () => {
  const [activeTab, setActiveTab] = useState('coordinator');
  const { user } = useAuth();

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <Layout>
        <motion.div 
          className="py-20 bg-gray-50 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Login Required
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Please login or create an account to access the outfit coordination features.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full" asChild>
                <Link to="/auth" state={{ returnTo: '/outfit-coordination' }}>
                  <LogIn className="mr-2 h-4 w-4" /> Login or Sign Up
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="py-12 bg-gray-50 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-3xl font-bold mb-2 gradient-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your Style Lab
          </motion.h1>
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create and personalize your outfits with our interactive styling tools
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
                  <TabsTrigger value="coordinator">Outfit Coordinator</TabsTrigger>
                  <TabsTrigger value="avatar">Avatar Styling</TabsTrigger>
                </TabsList>
              </motion.div>
              
              <TabsContent value="coordinator">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <OutfitCoordinator />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="avatar">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AvatarStyler onStyleComplete={() => setActiveTab('coordinator')} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default OutfitCoordinationPage;
