
import React from 'react';

const FashionShowcase = () => {
  const fashionImages = [
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Fashion model in urban setting",
      caption: "Urban Chic"
    },
    {
      url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Elegant outfit on model",
      caption: "Elegant Simplicity"
    },
    {
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Modern living room fashion",
      caption: "Home Comfort Style"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-heading">Fashion That Inspires</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fashionImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <div className="aspect-w-4 aspect-h-5">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-white text-xl font-medium">{image.caption}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover your unique style with our AI-powered recommendations, 
            tailored to your preferences and destinations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FashionShowcase;
