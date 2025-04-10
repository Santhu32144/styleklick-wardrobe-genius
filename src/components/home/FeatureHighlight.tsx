
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FeatureHighlight = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-6">
              AI-Powered Style Recommendations
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Our advanced AI technology analyzes your unique characteristics and preferences to generate 
              personalized outfit recommendations that flatter your body type and suit your style.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-styleklick-purple/10 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-styleklick-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Tailored to your body measurements</span>
              </li>
              <li className="flex items-start">
                <div className="bg-styleklick-purple/10 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-styleklick-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Matches your skin tone and complexion</span>
              </li>
              <li className="flex items-start">
                <div className="bg-styleklick-purple/10 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-styleklick-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Perfect for any occasion or destination</span>
              </li>
            </ul>
            <Button className="btn-primary" asChild>
              <Link to="/questionnaire">Try It Now</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-styleklick-purple/20 to-styleklick-purple-light/30 rounded-xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="AI-powered style recommendations" 
                className="relative rounded-xl shadow-lg z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
