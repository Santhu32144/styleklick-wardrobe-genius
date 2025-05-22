
import React from 'react';
import Layout from '@/components/layout/Layout';
import StyleCalendar from '@/components/calendar/StyleCalendar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const StyleCalendarPage = () => {
  const { user, loading } = useAuth();

  // If not authenticated, redirect to login
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ returnTo: '/style-calendar' }} />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Style Calendar</h1>
            <p className="text-styleklick-airbnb-gray-dark mt-2">
              Plan your outfits for upcoming events and special occasions
            </p>
          </div>
          
          <StyleCalendar />
        </div>
      </div>
    </Layout>
  );
};

export default StyleCalendarPage;
