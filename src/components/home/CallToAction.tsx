
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-styleklick-purple to-styleklick-purple-dark text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Style?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
          Get personalized outfit recommendations tailored to your unique style and body type.
          It only takes a few minutes to get started!
        </p>
        <Button className="bg-white text-styleklick-purple hover:bg-styleklick-neutral-light text-lg font-medium px-8 py-3 rounded-md shadow-lg transition-all duration-300" asChild>
          <Link to="/questionnaire" className="flex items-center space-x-2">
            <span>Find Your Style Now</span>
            <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
