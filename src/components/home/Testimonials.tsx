
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'StyleNKlick helped me find the perfect outfit for my job interview. I received so many compliments on my look!',
    rating: 5
  },
  {
    name: 'Jason Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'I was skeptical at first, but the outfit recommendations were spot on for my body type. I\'ve never felt more confident!',
    rating: 5
  },
  {
    name: 'Sophia Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'The vacation style recommendations made packing for my trip so much easier. Every outfit was perfect for the occasion.',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-styleklick-neutral-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join thousands of satisfied users who have upgraded their style with StyleNKlick
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
