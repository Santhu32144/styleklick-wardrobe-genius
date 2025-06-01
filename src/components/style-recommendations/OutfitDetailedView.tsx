
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { OutfitSuggestion } from '../../pages/StyleRecommendationsPage';

interface OutfitDetailedViewProps {
  outfit: OutfitSuggestion;
  onBack: () => void;
}

interface OutfitDetails {
  items: string[];
  footwear: string[];
  poses: Array<{
    name: string;
    description: string;
  }>;
}

// Mock API function - simulates dynamic loading
const fetchOutfitDetails = async (outfitId: string): Promise<OutfitDetails> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data based on outfit ID
  const details: Record<string, OutfitDetails> = {
    'fall-1': {
      items: [
        'Cashmere turtleneck sweater in camel',
        'High-waisted wool trousers in charcoal',
        'Tailored wool coat in navy',
        'Leather crossbody bag in cognac',
        'Silk scarf with autumn print'
      ],
      footwear: [
        'Leather ankle boots with block heel',
        'Suede loafers in taupe',
        'Knee-high boots in dark brown'
      ],
      poses: [
        {
          name: 'Confident Stride',
          description: 'Walk with purpose, one hand in coat pocket, looking ahead with a slight smile'
        },
        {
          name: 'Casual Lean',
          description: 'Lean against a wall with arms crossed, showcasing the outfit\'s silhouette'
        },
        {
          name: 'Scarf Adjustment',
          description: 'Gently adjust the scarf while looking to the side, creating movement in the shot'
        }
      ]
    },
    'fall-2': {
      items: [
        'Oversized knit cardigan in cream',
        'Soft cotton t-shirt in sage green',
        'Corduroy pants in rust brown',
        'Canvas tote bag with leather handles',
        'Knit beanie in matching cream'
      ],
      footwear: [
        'Canvas sneakers in white',
        'Comfortable slip-on shoes in brown',
        'Warm lined boots for colder days'
      ],
      poses: [
        {
          name: 'Cozy Reading',
          description: 'Sit cross-legged with a book, cardigan draped naturally over shoulders'
        },
        {
          name: 'Gentle Walking',
          description: 'Hands in cardigan pockets, taking a leisurely stroll with relaxed shoulders'
        },
        {
          name: 'Thoughtful Moment',
          description: 'Stand with one hand adjusting the beanie, looking contemplatively to the distance'
        }
      ]
    }
    // Add more mock data for other outfits as needed
  };

  return details[outfitId] || {
    items: ['Loading failed - please try again'],
    footwear: ['Loading failed - please try again'],
    poses: [{ name: 'Error', description: 'Loading failed - please try again' }]
  };
};

const OutfitDetailedView = ({ outfit, onBack }: OutfitDetailedViewProps) => {
  const [details, setDetails] = useState<OutfitDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      try {
        const outfitDetails = await fetchOutfitDetails(outfit.id);
        setDetails(outfitDetails);
      } catch (error) {
        console.error('Error loading outfit details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [outfit.id]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading outfit details...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to suggestions
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{outfit.name}</h2>
          <p className="text-gray-600">{outfit.description}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Outfit Details</TabsTrigger>
              <TabsTrigger value="footwear">Footwear Options</TabsTrigger>
              <TabsTrigger value="poses">Posing Ideas</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Clothing Items</h3>
                <div className="grid gap-3">
                  {details?.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="footwear" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommended Footwear</h3>
                <div className="grid gap-3">
                  {details?.footwear.map((shoe, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>{shoe}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="poses" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Posing Suggestions</h3>
                <div className="grid gap-4">
                  {details?.poses.map((pose, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-medium text-purple-700 mb-2">{pose.name}</h4>
                      <p className="text-gray-600 text-sm">{pose.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutfitDetailedView;
