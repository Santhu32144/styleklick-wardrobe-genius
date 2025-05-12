
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LocationType } from './locationData';
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Mountain, Umbrella, TreePine, Building2, Palmtree, Waves, Snowflake } from 'lucide-react';

interface LocationSelectorProps {
  locations: LocationType[];
  onSelectLocation: (location: LocationType) => void;
}

const getLocationIcon = (locationId: string) => {
  switch (locationId) {
    case 'mountains':
      return <Mountain className="h-5 w-5" />;
    case 'beaches':
      return <Umbrella className="h-5 w-5" />;
    case 'forests':
      return <TreePine className="h-5 w-5" />;
    case 'urban':
      return <Building2 className="h-5 w-5" />;
    case 'desert':
      return <Palmtree className="h-5 w-5" />;
    case 'waterfall':
      return <Waves className="h-5 w-5" />;
    case 'snow':
      return <Snowflake className="h-5 w-5" />;
    default:
      return <Mountain className="h-5 w-5" />;
  }
};

const getLocationVibe = (locationId: string): string => {
  switch (locationId) {
    case 'mountains': return 'Cozy';
    case 'beaches': return 'Relaxed';
    case 'forests': return 'Natural';
    case 'urban': return 'Urban';
    case 'desert': return 'Warm';
    case 'waterfall': return 'Refreshing';
    case 'snow': return 'Chilly';
    default: return 'Adventurous';
  }
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ locations, onSelectLocation }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Explore Destinations</h3>
      <p className="text-styleklick-airbnb-gray-dark">
        Find the perfect style for your upcoming adventure
      </p>

      {/* Horizontal scroll layout for desktop */}
      <div className="hidden md:block">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {locations.map((location) => (
              <CarouselItem key={location.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <div 
                  onClick={() => onSelectLocation(location)}
                  className="location-card cursor-pointer hover-lift group"
                >
                  <div className="relative h-64 overflow-hidden rounded-xl">
                    <img 
                      src={location.image} 
                      alt={location.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-white/90 p-2 rounded-full flex items-center justify-center">
                      {getLocationIcon(location.id)}
                    </div>
                    {location.tags && location.tags.length > 0 && (
                      <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
                        {location.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-white/90 text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="text-lg font-semibold">{location.name}</h4>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-white/90">{location.name} – {getLocationVibe(location.id)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </div>
        </Carousel>
      </div>

      {/* Card layout for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {locations.map((location) => (
          <div 
            key={location.id}
            onClick={() => onSelectLocation(location)}
            className="location-card cursor-pointer hover-lift"
          >
            <div className="relative h-48 overflow-hidden rounded-xl">
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-3 left-3 bg-white/90 p-2 rounded-full flex items-center justify-center">
                {getLocationIcon(location.id)}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h4 className="text-base font-semibold">{location.name}</h4>
                <div className="flex items-center text-xs mt-1">
                  <span className="text-white/90">{location.name} – {getLocationVibe(location.id)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
