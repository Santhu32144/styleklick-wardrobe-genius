
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayesha M.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'I never knew fashion could feel this personal. My vacation pics? 10/10!',
    rating: 5
  },
  {
    name: 'Jason Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'StyleNKlick helped me pack for my business trip to Tokyo. Every outfit was perfect for the meetings and exploring the city afterward.',
    rating: 5
  },
  {
    name: 'Sophia Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'The location-based recommendations made my European vacation so much easier. I felt confident and stylish everywhere I went!',
    rating: 5
  },
  {
    name: 'Miguel Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    text: 'Their pose suggestions transformed my Instagram feed. I've never gotten so many compliments on my photos before!',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join thousands of satisfied users who have upgraded their style with StyleNKlick
          </p>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 space-x-6 snap-x scroll-smooth no-scrollbar">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full sm:w-80 md:w-96 snap-center"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-styleklick-soft-cream"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
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
                  <p className="text-gray-600 italic text-lg flex-grow">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-styleklick-soft-green opacity-40"></div>
          <div className="absolute bottom-0 right-1/4 w-12 h-12 rounded-full bg-styleklick-soft-peach opacity-40"></div>
        </div>

        {/* Navigation dots for mobile scrolling */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-styleklick-purple transition-colors"
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
