
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RecommendationResult from '../components/recommendations/RecommendationResult';
import { QuestionnaireData } from '../components/questionnaire/QuestionnaireForm';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogIn, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the available themes
export type ThemeType = 'fall' | 'adventure' | 'urban';

const RecommendationsPage = () => {
  const location = useLocation();
  const formData = location.state?.formData as QuestionnaireData;
  const [activeTheme, setActiveTheme] = useState<ThemeType>('fall');
  const { user } = useAuth();
  const { toast } = useToast();
  const authContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show toast when redirected to login
    if (!user && formData) {
      toast({
        title: "Login Required",
        description: "Please login to see your personalized style recommendations.",
      });
      
      // Scroll to auth container
      setTimeout(() => {
        if (authContainerRef.current) {
          authContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [user, formData, toast]);

  // If user navigates directly to this page without going through the questionnaire
  if (!formData) {
    return <Navigate to="/questionnaire" replace />;
  }

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
          {/* Back to Quiz Button */}
          <motion.div 
            className="absolute top-20 right-4 z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" asChild>
              <Link to="/questionnaire">
                <RotateCcw className="mr-2 h-4 w-4" />
                Back to Quiz
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            ref={authContainerRef} 
            className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Login Required
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Please login or create an account to view your personalized style recommendations.
              We'll save your questionnaire responses!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full" asChild>
                <Link to="/auth" state={{ returnTo: '/recommendations', formData }}>
                  <LogIn className="mr-2 h-4 w-4" /> Login or Sign Up
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Layout>
    );
  }

  // Generate recommendation results based on form data
  const generateRecommendations = () => {
    const baseId = `rec-${formData.gender}-${formData.occasion}-${formData.seasonality}`;
    
    return {
      id: baseId,
      title: `Perfect ${formData.seasonality} ${formData.occasion} Style`,
      description: `Curated specifically for your ${formData.gender} style preferences including ${formData.stylePreferences.slice(0, 2).join(' and ')} vibes for ${formData.destinationType} settings.`,
      styleId: baseId
    };
  };

  const handleImageClick = (styleId: string, styleName: string) => {
    toast({
      title: "Style Details",
      description: `Viewing details for ${styleName}`,
    });
  };

  return (
    <Layout>
      <motion.div 
        className="py-12 bg-gray-50 min-h-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Quiz Button */}
        <motion.div 
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="outline" asChild>
            <Link to="/questionnaire">
              <RotateCcw className="mr-2 h-4 w-4" />
              Back to Quiz
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          id="outfits"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <RecommendationResult 
            result={generateRecommendations()}
            onImageClick={handleImageClick}
          />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default RecommendationsPage;
