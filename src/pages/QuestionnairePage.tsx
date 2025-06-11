
import React from 'react';
import Layout from '../components/layout/Layout';
import QuestionnaireForm from '../components/questionnaire/QuestionnaireForm';
import { motion } from 'framer-motion';

const QuestionnairePage = () => {
  return (
    <Layout>
      <motion.div 
        className="py-12 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Find Your Perfect Style
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let us help you discover outfits that match your personality, occasion, and destination.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <QuestionnaireForm />
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default QuestionnairePage;
