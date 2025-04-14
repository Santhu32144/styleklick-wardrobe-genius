
import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RecommendationResult from '../components/recommendations/RecommendationResult';
import { QuestionnaireData } from '../components/questionnaire/QuestionnaireForm';

// Define the available themes
export type ThemeType = 'fall' | 'adventure' | 'urban';

const RecommendationsPage = () => {
  const location = useLocation();
  const formData = location.state?.formData as QuestionnaireData;
  const [activeTheme, setActiveTheme] = useState<ThemeType>('fall');

  // If user navigates directly to this page without going through the questionnaire
  if (!formData) {
    return <Navigate to="/questionnaire" replace />;
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
