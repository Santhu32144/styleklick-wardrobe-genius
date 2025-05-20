
import React from 'react';
import { ClipboardCheck, ShoppingBag, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardCheck className="h-12 w-12 text-styleklick-purple" />,
    title: 'Complete the Questionnaire',
    description: 'Tell us about your body type, style preferences, and the occasion you\'re dressing for.'
  },
  {
    icon: <Sparkles className="h-12 w-12 text-styleklick-purple" />,
    title: 'Get AI Recommendations',
    description: 'Our AI analyzes your details to create personalized outfit recommendations perfect for you.'
  },
  {
    icon: <ShoppingBag className="h-12 w-12 text-styleklick-purple" />,
    title: 'Elevate Your Style',
    description: 'Save your recommendations, share them, or find similar items to purchase online.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">How StyleNKlick Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Get personalized style recommendations in just three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="card-styleklick text-center flex flex-col items-center"
            >
              <div className="mb-6 p-4 bg-styleklick-neutral-light rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
