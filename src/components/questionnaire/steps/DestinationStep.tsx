
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Card } from "@/components/ui/card";
import { 
  Mountain, Umbrella, TreePine, Building2, Palmtree
} from 'lucide-react';

interface DestinationStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const destinationTypes = [
  { 
    id: 'mountains', 
    label: 'Mountains', 
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
    description: 'Hiking, trekking, or enjoying mountain views'
  },
  { 
    id: 'beach', 
    label: 'Beach & Coast', 
    icon: Umbrella,
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
    description: 'Seaside, ocean, or coastal areas'
  },
  { 
    id: 'urban', 
    label: 'Urban/City', 
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&w=800&q=80',
    description: 'City exploration and metropolitan areas'
  },
  { 
    id: 'forest', 
    label: 'Forest/Nature', 
    icon: TreePine,
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    description: 'Woodland areas and natural reserves'
  },
  { 
    id: 'desert', 
    label: 'Desert', 
    icon: Palmtree,
    image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&q=80',
    description: 'Arid landscapes and desert adventures'
  }
];

const DestinationStep: React.FC<DestinationStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Destination</h3>
        <p className="text-gray-600 mb-6">
          Select the type of environment you'll be in.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destinationTypes.map((destination) => {
            const Icon = destination.icon;
            const isSelected = formData.destinationType === destination.id;
            
            return (
              <Card 
                key={destination.id}
                onClick={() => updateFormData({ destinationType: destination.id })}
                className={`cursor-pointer overflow-hidden transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-styleklick-purple' : ''
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.label} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={20} />
                      <h4 className="text-lg font-semibold">{destination.label}</h4>
                    </div>
                    <p className="text-sm text-white/80">{destination.description}</p>
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

export default DestinationStep;
