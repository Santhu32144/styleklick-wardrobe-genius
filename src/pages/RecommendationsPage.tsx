
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RecommendationResult from '../components/recommendations/RecommendationResult';
import { QuestionnaireData } from '../components/questionnaire/QuestionnaireForm';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the available themes
export type ThemeType = 'fall' | 'adventure' | 'urban';

const RecommendationsPage = () => {
  const location = useLocation();
  const formData = location.state?.formData as QuestionnaireData;
  const [activeTheme, setActiveTheme] = useState<ThemeType>('fall');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast when redirected to login
    if (!user && formData) {
      toast({
        title: "Login Required",
        description: "Please login to see your personalized style recommendations.",
      });
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
        <div className="py-20 bg-gray-50 min-h-screen">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login or create an account to view your personalized style recommendations.
              We'll save your questionnaire responses!
            </p>
            <Button className="w-full" asChild>
              <Link to="/auth" state={{ returnTo: '/recommendations', formData }}>
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
        <RecommendationResult 
          formData={formData} 
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
        />
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
