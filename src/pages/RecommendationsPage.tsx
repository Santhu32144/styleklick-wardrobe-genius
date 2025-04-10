
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RecommendationResult from '../components/recommendations/RecommendationResult';
import { QuestionnaireData } from '../components/questionnaire/QuestionnaireForm';

const RecommendationsPage = () => {
  const location = useLocation();
  const formData = location.state?.formData as QuestionnaireData;

  // If user navigates directly to this page without going through the questionnaire
  if (!formData) {
    return <Navigate to="/questionnaire" replace />;
  }

  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <RecommendationResult formData={formData} />
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
