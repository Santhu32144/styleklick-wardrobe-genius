
import React from 'react';
import Layout from '../components/layout/Layout';
import LocationBasedPosingSuggestions from '../components/location-posing/LocationBasedPosingSuggestions';
import { motion } from 'framer-motion';

const LocationPosingSuggestionsPage = () => {
  return (
    <Layout>
      <motion.div 
        className="py-12 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LocationBasedPosingSuggestions />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default LocationPosingSuggestionsPage;
