
import React from 'react';
import Layout from '../components/layout/Layout';
import QuestionnaireForm from '../components/questionnaire/QuestionnaireForm';

const QuestionnairePage = () => {
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <QuestionnaireForm />
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
