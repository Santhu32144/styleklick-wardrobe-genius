
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Urban Chic',
    subtitle: 'Modern city style'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Beach Vibes',
    subtitle: 'Casual coastal look'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511085279-b301accad86b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Fall Fashion',
    subtitle: 'Autumn elegance'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Adventure Ready',
    subtitle: 'Outdoor essentials'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1587609847448-a1ed88447bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Formal Wear',
    subtitle: 'Elegant occasions'
  }
];

const SlidingPhotoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Style Inspiration
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover trending looks and find your perfect style across different occasions and seasons
          </p>
        </motion.div>

        <div 
          className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white"
                >
                  <h3 className="text-3xl md:text-5xl font-bold mb-2">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-200">
                    {slides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-between p-4"
          >
            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </Button>
          </motion.div>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Play/Pause control */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4"
          >
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 text-white"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </motion.div>
        </div>

        {/* Hover instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-gray-500 mt-4 text-sm"
        >
          Hover over the carousel to pause auto-play and view controls
        </motion.p>
      </div>
    </section>
  );
};

export default SlidingPhotoCarousel;
