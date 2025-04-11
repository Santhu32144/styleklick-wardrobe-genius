
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LocationType } from './locationData';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Mountain, Beach, TreePine, Building2, Palmtree, Waves, Snowflake } from 'lucide-react';

interface LocationSelectorProps {
  locations: LocationType[];
  onSelectLocation: (location: LocationType) => void;
}

const getLocationIcon = (locationId: string) => {
  switch (locationId) {
    case 'mountains':
      return <Mountain className="h-6 w-6" />;
    case 'beaches':
      return <Beach className="h-6 w-6" />;
    case 'forests':
      return <TreePine className="h-6 w-6" />;
    case 'urban':
      return <Building2 className="h-6 w-6" />;
    case 'desert':
      return <Palmtree className="h-6 w-6" />;
    case 'waterfall':
      return <Waves className="h-6 w-6" />;
    case 'snow':
      return <Snowflake className="h-6 w-6" />;
    default:
      return <Mountain className="h-6 w-6" />;
  }
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ locations, onSelectLocation }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Select Your Destination Vibe</h3>
      <p className="text-gray-600">
        Choose the type of location that matches your upcoming trip or photoshoot destination.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card 
            key={location.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer hover-scale"
            onClick={() => onSelectLocation(location)}
          >
            <div className="relative h-48">
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-white/80 rounded-full p-2">
                {getLocationIcon(location.id)}
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg mb-1">{location.name}</h4>
              <p className="text-sm text-gray-600">{location.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
