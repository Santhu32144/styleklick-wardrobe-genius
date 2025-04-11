
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationType, OutfitSuggestion, PoseSuggestion } from './locationData';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock, Tag, MessageCircle, Shirt, Camera, Package, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface OutfitSuggestionsProps {
  location: LocationType;
}

const OutfitSuggestions: React.FC<OutfitSuggestionsProps> = ({ location }) => {
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(
    location.outfits.length > 0 ? location.outfits[0] : null
  );
  const [selectedPose, setSelectedPose] = useState<PoseSuggestion | null>(
    location.poses.length > 0 ? location.poses[0] : null
  );
  const { toast } = useToast();

  const handleSaveOutfit = () => {
    toast({
      title: "Outfit saved!",
      description: "This outfit has been saved to your favorites.",
    });
  };

  const handleShareOutfit = () => {
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here in the full version.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Card className="overflow-hidden mb-6">
            <div className="relative">
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-60 object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white text-2xl font-bold">{location.name}</h3>
                <p className="text-white/90">{location.description}</p>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="outfits" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="outfits" className="flex items-center">
                <Shirt className="mr-2 h-4 w-4" />
                <span>Outfit Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="poses" className="flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                <span>Pose Inspiration</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="outfits" className="space-y-4 mt-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {location.outfits.map((outfit) => (
                    <CarouselItem key={outfit.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card 
                        className={`h-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer ${
                          selectedOutfit?.id === outfit.id ? 'border-2 border-styleklick-purple' : ''
                        }`}
                        onClick={() => setSelectedOutfit(outfit)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={outfit.image} 
                            alt={outfit.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-semibold mb-1">{outfit.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{outfit.description}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-5" />
                <CarouselNext className="-right-4 md:-right-5" />
              </Carousel>

              {selectedOutfit && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <img 
                          src={selectedOutfit.image} 
                          alt={selectedOutfit.title} 
                          className="w-full h-60 object-cover rounded-md mb-4" 
                        />
                        <div className="flex space-x-2 mb-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-1/2"
                            onClick={handleSaveOutfit}
                          >
                            Save
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-1/2"
                            onClick={handleShareOutfit}
                          >
                            Share
                          </Button>
                        </div>
                        {selectedOutfit.timeOfDay && (
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Best time: {selectedOutfit.timeOfDay}</span>
                          </div>
                        )}
                        {selectedOutfit.captionIdeas && selectedOutfit.captionIdeas.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              <span>Caption ideas:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedOutfit.captionIdeas.map((caption, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {caption}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-2/3">
                        <h3 className="text-xl font-semibold mb-2">{selectedOutfit.title}</h3>
                        <p className="text-gray-700 mb-4">{selectedOutfit.description}</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <Package className="h-5 w-5 text-styleklick-purple mt-0.5" />
                            <div>
                              <h4 className="font-medium">Recommended Items</h4>
                              <ul className="mt-2 space-y-3">
                                {selectedOutfit.items.map((item, index) => (
                                  <li key={index} className="border-b border-gray-100 pb-2">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {selectedOutfit.accessories && selectedOutfit.accessories.length > 0 && (
                            <div className="flex items-start gap-2">
                              <Tag className="h-5 w-5 text-styleklick-purple mt-0.5" />
                              <div>
                                <h4 className="font-medium">Suggested Accessories</h4>
                                <ul className="mt-2 list-disc list-inside space-y-1">
                                  {selectedOutfit.accessories.map((accessory, index) => (
                                    <li key={index} className="text-gray-700">
                                      {accessory}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="poses" className="space-y-4 mt-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {location.poses.map((pose) => (
                    <CarouselItem key={pose.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card 
                        className={`h-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer ${
                          selectedPose?.id === pose.id ? 'border-2 border-styleklick-purple' : ''
                        }`}
                        onClick={() => setSelectedPose(pose)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={pose.image} 
                            alt={pose.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-semibold mb-1">{pose.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{pose.description}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-5" />
                <CarouselNext className="-right-4 md:-right-5" />
              </Carousel>

              {selectedPose && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/2">
                        <img 
                          src={selectedPose.image} 
                          alt={selectedPose.title} 
                          className="w-full h-80 object-cover rounded-md" 
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="text-xl font-semibold mb-2">{selectedPose.title}</h3>
                        <div className="flex items-start gap-2 mb-4">
                          <Info className="h-5 w-5 text-styleklick-purple mt-0.5" />
                          <p className="text-gray-700">{selectedPose.description}</p>
                        </div>
                        
                        <div className="space-y-4 mt-6">
                          <h4 className="font-medium">Tips for this pose:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="flex-shrink-0 bg-styleklick-purple-light text-styleklick-purple w-6 h-6 rounded-full flex items-center justify-center">1</span>
                              <span>Find good natural lighting, preferably during golden hour.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="flex-shrink-0 bg-styleklick-purple-light text-styleklick-purple w-6 h-6 rounded-full flex items-center justify-center">2</span>
                              <span>Consider the composition and where you'll stand in relation to the background.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="flex-shrink-0 bg-styleklick-purple-light text-styleklick-purple w-6 h-6 rounded-full flex items-center justify-center">3</span>
                              <span>Try multiple variations of this pose to find what feels most natural.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="flex-shrink-0 bg-styleklick-purple-light text-styleklick-purple w-6 h-6 rounded-full flex items-center justify-center">4</span>
                              <span>Pay attention to small details like hand placement and facial expression.</span>
                            </li>
                          </ul>

                          <div className="mt-6">
                            <Button 
                              className="w-full"
                              onClick={() => {
                                toast({
                                  title: "Pose saved!",
                                  description: "This pose has been saved to your inspiration board.",
                                });
                              }}
                            >
                              Save to Inspiration Board
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg mb-4">Location Tips</h4>
              
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h5 className="font-medium mb-1">Best Time to Visit</h5>
                  <p className="text-sm text-gray-700">
                    {location.id === 'mountains' && 'Early morning or golden hour for dramatic lighting on the peaks.'}
                    {location.id === 'beaches' && 'Golden hour before sunset for warm, flattering light.'}
                    {location.id === 'forests' && 'Mid-morning when light filters through the trees creating magical rays.'}
                    {location.id === 'urban' && 'Blue hour (just after sunset) for city lights or early morning for empty streets.'}
                    {location.id === 'desert' && 'Sunrise or sunset for dramatic shadows and colors on the dunes.'}
                    {location.id === 'waterfall' && 'Mid-morning when light hits the water creating rainbow effects.'}
                    {location.id === 'snow' && 'Golden hour when snow takes on pink and orange hues, or bright day for sparkle.'}
                  </p>
                </div>
                
                <div className="pb-3 border-b border-gray-100">
                  <h5 className="font-medium mb-1">Photography Tips</h5>
                  <p className="text-sm text-gray-700">
                    {location.id === 'mountains' && 'Use a polarizing filter to enhance sky contrast. Include foreground elements for depth.'}
                    {location.id === 'beaches' && 'Protect your camera from sand and spray. Consider a lower angle to capture reflections.'}
                    {location.id === 'forests' && 'Look for spots where light beams through trees. Adjust white balance for green cast.'}
                    {location.id === 'urban' && 'Use leading lines from architecture. Try both wide shots and detail crops.'}
                    {location.id === 'desert' && 'Protect gear from sand and heat. Use low angles to emphasize dune shapes.'}
                    {location.id === 'waterfall' && 'Use a tripod for long exposures. Bring microfiber cloth for lens mist.'}
                    {location.id === 'snow' && 'Overexpose slightly to compensate for snow brightness. Keep batteries warm.'}
                  </p>
                </div>
                
                <div className="pb-3 border-b border-gray-100">
                  <h5 className="font-medium mb-1">Style Considerations</h5>
                  <p className="text-sm text-gray-700">
                    {location.id === 'mountains' && 'Layer clothing for changing temperatures. Choose colors that contrast with natural backdrops.'}
                    {location.id === 'beaches' && 'Flowy fabrics capture movement in ocean breezes. Consider how colors work with sand and water.'}
                    {location.id === 'forests' && 'Earth tones blend beautifully. Consider the contrast between your outfit and green surroundings.'}
                    {location.id === 'urban' && 'Consider the city\'s architectural style. Clean lines and monochrome often work well.'}
                    {location.id === 'desert' && 'Breathable natural fabrics. Colors that complement or contrast with sand tones.'}
                    {location.id === 'waterfall' && 'Water-friendly fabrics that won\'t be ruined by spray. Blues and greens complement the environment.'}
                    {location.id === 'snow' && 'Layer for warmth without bulk. Bright colors pop beautifully against white snow.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OutfitSuggestions;
