
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from 'lucide-react';

// Define the style categories
const categories = [
  {
    name: 'Urban',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Bold', 'Versatile']
  },
  {
    name: 'Beach',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Casual', 'Light']
  },
  {
    name: 'Fall',
    image: 'https://images.unsplash.com/photo-1511085279-b301accad86b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Warm', 'Layered']
  },
  {
    name: 'Adventure',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Practical', 'Durable']
  },
  {
    name: 'Formal',
    image: 'https://images.unsplash.com/photo-1587609847448-a1ed88447bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Elegant', 'Refined']
  },
  {
    name: 'Casual',
    image: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Comfortable', 'Everyday']
  }
];

const OutfitCategories = () => {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Popular Style Categories</h2>
        
        <div className="mb-6 overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {categories.map((category, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="outfit-card group">
                    <div className="relative h-[300px] overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                            <div className="flex gap-2 mt-1">
                              {category.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-colors">
                            <Heart className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <Link to={`/questionnaire?style=${category.name}`} className="absolute inset-0 z-10">
                      <span className="sr-only">View {category.name} styles</span>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 -translate-y-1/2" />
            <CarouselNext className="right-2 -translate-y-1/2" />
          </Carousel>
        </div>
        
        <div className="text-center">
          <Link 
            to="/questionnaire" 
            className="inline-block text-styleklick-purple hover:text-styleklick-purple-dark underline underline-offset-4 font-medium"
          >
            Explore all style categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OutfitCategories;
