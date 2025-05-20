
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StyleCalendar from '@/components/calendar/StyleCalendar';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const StyleCalendarPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="py-20 bg-gray-50 min-h-screen">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login or create an account to access the Style Calendar.
            </p>
            <Button className="w-full" asChild>
              <Link to="/auth" state={{ returnTo: '/style-calendar' }}>
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
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Style Calendar</h1>
          <StyleCalendar />
        </div>
      </div>
    </Layout>
  );
};

export default StyleCalendarPage;
