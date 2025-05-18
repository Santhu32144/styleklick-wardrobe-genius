
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-styleklick-soft-cream">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Style</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
          Get personalized outfit recommendations tailored to your unique style, body type, and destination.
          Our AI-powered fashion assistant is ready to help you look your best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-primary" asChild>
            <Link to="/questionnaire" className="flex items-center space-x-2">
              <span>Start Style Quiz</span>
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button variant="outline" className="border-styleklick-purple text-styleklick-purple hover:bg-styleklick-purple hover:text-white" asChild>
            <Link to="/how-it-works">How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
