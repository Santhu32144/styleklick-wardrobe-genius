
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Card } from "@/components/ui/card";
import { 
  Snowflake, Sun, Leaf, Flower
} from 'lucide-react';

interface OccasionStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const seasons = [
  { 
    id: 'winter', 
    label: 'Winter', 
    icon: Snowflake,
    image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'summer', 
    label: 'Summer', 
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'fall', 
    label: 'Fall / Autumn', 
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'spring', 
    label: 'Spring', 
    icon: Flower,
    image: 'https://images.unsplash.com/photo-1482376292551-62dc5894cf0e?auto=format&fit=crop&w=800&q=80'
  }
];

const OccasionStep: React.FC<OccasionStepProps> = ({ formData, updateFormData }) => {
  // Set a default occasion value since we're removing the occasion selection
  React.useEffect(() => {
    if (!formData.occasion) {
      updateFormData({ occasion: 'casual' });
    }
  }, [formData.occasion, updateFormData]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">What Season?</h3>
        <p className="text-gray-600 mb-6">
          Select the season you'll be dressing for.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {seasons.map((season) => {
            const Icon = season.icon;
            const isSelected = formData.seasonality === season.id;
            
            return (
              <Card 
                key={season.id}
                onClick={() => updateFormData({ seasonality: season.id })}
                className={`cursor-pointer overflow-hidden transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-styleklick-purple' : ''
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={season.image} 
                    alt={season.label} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Icon size={20} />
                      <h4 className="text-lg font-semibold">{season.label}</h4>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-styleklick-purple text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OccasionStep;
