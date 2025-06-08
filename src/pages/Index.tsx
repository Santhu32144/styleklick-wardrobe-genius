
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const Index = () => {
  const { user, profile } = useAuth();
  
  // Get user name or default welcome
  const getUserName = () => {
    if (profile?.name) return profile.name;
    if (user && user.email) {
      const email = user.email;
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return null;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="mb-8">
              {user && (
                <div className="text-lg text-gray-600 mb-4">
                  Welcome back, {getUserName()}!
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-heading">
                Find Your Perfect Style
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Get personalized outfit recommendations tailored to your unique style, 
                body type, and destination with our AI-powered fashion assistant.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                className="bg-styleklick-purple hover:bg-styleklick-purple/90 text-white rounded-full px-8 py-6 h-auto text-lg" 
                asChild
              >
                <Link to="/questionnaire" className="flex items-center space-x-2">
                  <Sparkles size={20} />
                  <span>Start Style Quiz</span>
                  <ArrowRight size={20} />
                </Link>
              </Button>
              
              {!user && (
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-8 py-6 h-auto text-lg" 
                  asChild
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="bg-styleklick-purple/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="h-6 w-6 text-styleklick-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-gray-600">
                  Advanced AI analyzes your preferences to create perfect outfit combinations
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="bg-styleklick-purple/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-styleklick-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized</h3>
                <p className="text-gray-600">
                  Tailored recommendations based on your body type, style, and occasion
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="bg-styleklick-purple/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Heart className="h-6 w-6 text-styleklick-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Save & Share</h3>
                <p className="text-gray-600">
                  Create your lookbook and share your favorite styles with friends
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-styleklick-purple text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Style?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who have discovered their perfect style with our AI assistant.
            </p>
            <Button 
              className="bg-white text-styleklick-purple hover:bg-gray-100 rounded-full px-8 py-6 h-auto text-lg font-semibold" 
              asChild
            >
              <Link to="/questionnaire" className="flex items-center space-x-2">
                <span>Get Started Now</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
