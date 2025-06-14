
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PersonalizationModal } from '@/components/personalization/PersonalizationModal';

const PersonalizationPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold gradient-heading mb-4">
                Personalization Settings
              </h1>
              <p className="text-gray-600 text-lg">
                Customize your style preferences and get personalized recommendations
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <PersonalizationModal 
                isOpen={true} 
                onClose={() => {}} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalizationPage;
