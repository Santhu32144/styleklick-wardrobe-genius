
import React from 'react';
import Layout from '@/components/layout/Layout';
import StyleCalendar from '@/components/calendar/StyleCalendar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';

const StyleCalendarPage = () => {
  const { user, loading } = useAuth();

  // If not authenticated, redirect to login
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ returnTo: '/style-calendar' }} />;
  }

  return (
    <Layout>
      <motion.div 
        className="container mx-auto py-10 px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold">Your Style Calendar</h1>
            <p className="text-styleklick-airbnb-gray-dark mt-2">
              Plan your outfits for upcoming events and special occasions
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <StyleCalendar />
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default StyleCalendarPage;
