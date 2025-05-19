
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-r from-styleklick-purple to-styleklick-purple-dark text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Your next look is just a click away.</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-white/80">
          Get personalized outfit recommendations tailored to your unique style, body type, and destination.
          Our AI-powered fashion assistant is ready to help you look your best.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button className="bg-white text-styleklick-purple hover:bg-white/90 rounded-full px-10 py-7 h-auto text-lg font-semibold shadow-lg" asChild>
            <Link to="/questionnaire" className="flex items-center space-x-2">
              <span>Start Your Style Journey</span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
