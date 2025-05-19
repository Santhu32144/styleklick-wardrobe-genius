
import React from 'react';
import { ClipboardCheck, MapPin, Sparkles, ShoppingBag } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardCheck className="h-12 w-12 text-styleklick-purple" />,
    title: 'Tell Us About You',
    description: 'Share your preferences and style — just your vibe, not your measurements.',
    visual: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    icon: <MapPin className="h-12 w-12 text-styleklick-purple" />,
    title: 'Pick a Location',
    description: "Choose where you're headed — beach, mountain, city… we style you accordingly.",
    visual: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    icon: <Sparkles className="h-12 w-12 text-styleklick-purple" />,
    title: 'Get Your Look',
    description: 'Instantly view personalized outfits with full details and photo posing ideas.',
    visual: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    icon: <ShoppingBag className="h-12 w-12 text-styleklick-purple" />,
    title: 'Save, Share or Shop',
    description: 'Love the look? Save it to your LookBook or explore matching pieces online.',
    visual: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-styleklick-neutral-light" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">How StyleNKlick Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your perfect style in four simple steps
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-20">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative">
                  <div className="bg-styleklick-purple/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-styleklick-purple">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-700 mb-6">{step.description}</p>
                  
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <span className="text-styleklick-purple font-medium">Step {index + 1}</span>
                  </div>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-styleklick-purple/20 to-styleklick-purple-light/30 transform rotate-3"></div>
                  <img 
                    src={step.visual}
                    alt={`Step ${index + 1}: ${step.title}`} 
                    className="relative rounded-xl shadow-lg z-10 w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
