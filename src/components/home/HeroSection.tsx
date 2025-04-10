
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-styleklick-neutral-light to-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-heading">
              Dress Smarter, Not Harder
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Discover your perfect style with AI-powered recommendations tailored to your body type, destination, and personal preferences.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button className="btn-primary" asChild>
                <Link to="/questionnaire" className="flex items-center space-x-2">
                  <span>Find Your Style</span>
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" className="border-styleklick-purple text-styleklick-purple hover:bg-styleklick-purple hover:text-white" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-scale-in">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 md:w-80 md:h-80 bg-styleklick-purple/10 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 md:w-80 md:h-80 bg-styleklick-purple/20 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Stylish outfit example" 
                className="rounded-lg w-full h-auto relative z-10 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
