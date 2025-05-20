
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const CallToAction = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-16 px-4 bg-styleklick-soft-cream">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Style</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
          Get personalized outfit recommendations tailored to your unique style, body type, and destination.
          Our AI-powered fashion assistant is ready to help you look your best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-styleklick-soft-green hover:bg-styleklick-soft-green/90 text-gray-800 rounded-full px-8 py-6 h-auto" asChild>
            <Link to="/questionnaire" className="flex items-center space-x-2">
              <span>Start Style Quiz</span>
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-full px-8 py-6 h-auto" asChild>
            <Link to="/how-it-works">How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
