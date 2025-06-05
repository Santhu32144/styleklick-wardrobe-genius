
import React from 'react';
import { QuestionnaireData, Destination } from '../QuestionnaireForm';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TreePine, MapPin, Home } from 'lucide-react';

interface DestinationStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
}

const destinationOptions: Array<{
  value: Destination;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    value: 'urban',
    label: 'Urban/City',
    description: 'City streets, urban environments',
    icon: <Building2 size={24} />
  },
  {
    value: 'outdoor',
    label: 'Outdoor/Nature',
    description: 'Parks, hiking, outdoor activities',
    icon: <TreePine size={24} />
  },
  {
    value: 'beach',
    label: 'Beach/Coastal',
    description: 'Seaside, beach towns, coastal areas',
    icon: <MapPin size={24} />
  },
  {
    value: 'indoor',
    label: 'Indoor/Climate Controlled',
    description: 'Malls, offices, indoor venues',
    icon: <Home size={24} />
  },
];

const DestinationStep: React.FC<DestinationStepProps> = ({ 
  formData, 
  updateFormData,
  onNext 
}) => {
  const handleDestinationSelect = (destination: Destination) => {
    updateFormData({ destination });
  };

  const handleDoubleClick = (destination: Destination) => {
    updateFormData({ destination });
    setTimeout(onNext, 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Where are you going?</h3>
        <p className="text-gray-600 mb-6">Your destination helps us suggest weather-appropriate outfits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinationOptions.map((option) => (
          <Card 
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              formData.destination === option.value ? 'ring-2 ring-styleklick-purple border-styleklick-purple' : 'border-gray-200'
            }`}
            onClick={() => handleDestinationSelect(option.value)}
            onDoubleClick={() => handleDoubleClick(option.value)}
          >
            <CardContent className="flex flex-col items-center p-6">
              <div className={`p-4 rounded-full mb-4 ${
                formData.destination === option.value ? 'bg-styleklick-purple text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {option.icon}
              </div>
              <h4 className="font-medium text-lg mb-2">{option.label}</h4>
              <p className="text-sm text-gray-500 text-center">{option.description}</p>
              {formData.destination === option.value && (
                <Badge className="mt-3 bg-styleklick-purple">
                  Selected - Double click to continue
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationStep;
