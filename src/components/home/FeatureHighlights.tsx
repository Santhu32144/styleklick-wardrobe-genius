
import React from 'react';
import { Sparkles, MapPin, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-styleklick-purple" />,
    title: 'Smart Recommendations',
    description: 'Get outfits tailored to your body, preferences & destination.'
  },
  {
    icon: <MapPin className="h-10 w-10 text-styleklick-purple" />,
    title: 'Location-Based Styling',
    description: 'Suggestions adapt to your trip — beach, mountain, city, and more.'
  },
  {
    icon: <Camera className="h-10 w-10 text-styleklick-purple" />,
    title: 'Pose & Photo Tips',
    description: 'Nail the look and the picture, with AI-suggested poses.'
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-heading">
          Features That Set Us Apart
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:-translate-y-1 transform transition-transform"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="p-4 bg-styleklick-neutral-light rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
