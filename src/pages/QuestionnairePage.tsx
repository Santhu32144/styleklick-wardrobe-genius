
import React from 'react';
import Layout from '../components/layout/Layout';
import QuestionnaireForm from '../components/questionnaire/QuestionnaireForm';

const QuestionnairePage = () => {
  return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Find Your Perfect Style
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let us help you discover outfits that match your personality, occasion, and destination.
            </p>
          </div>
          
          <QuestionnaireForm />
        </div>
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
