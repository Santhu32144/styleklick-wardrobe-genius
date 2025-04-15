import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import LocationSelector from './LocationSelector';
import OutfitSuggestions from './OutfitSuggestions';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { locationData, LocationType } from './locationData';
import { useLocation, useNavigate } from 'react-router-dom';

const LocationBasedPosingSuggestions = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [currentView, setCurrentView] = useState<'locations' | 'suggestions'>('locations');
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo || '/recommendations';

  const handleBackToRecommendations = () => {
    navigate(returnTo);
  };

  const handleLocationSelect = (location: LocationType) => {
    setSelectedLocation(location);
    setCurrentView('suggestions');
    toast({
      title: `${location.name} selected!`,
      description: "Loading outfit and pose suggestions for this location.",
    });
  };

  const handleBackToLocations = () => {
    setCurrentView('locations');
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold gradient-heading">Location-Based Style Suggestions</h2>
          <Button 
            variant="outline" 
            className="border-styleklick-purple text-styleklick-purple" 
            onClick={handleBackToRecommendations}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
        </div>
        <p className="text-gray-600 mt-2">
          Discover the perfect outfit and pose ideas for your next adventure, whether you're exploring mountains, beaches, or urban landscapes.
        </p>
      </div>

      {currentView === 'locations' ? (
        <LocationSelector onSelectLocation={handleLocationSelect} locations={locationData} />
      ) : (
        <div>
          <Button 
            variant="outline" 
            className="mb-6 border-styleklick-purple text-styleklick-purple" 
            onClick={handleBackToLocations}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Button>
          
          {selectedLocation && (
            <OutfitSuggestions location={selectedLocation} />
          )}
        </div>
      )}
    </div>
  );
};

export default LocationBasedPosingSuggestions;
