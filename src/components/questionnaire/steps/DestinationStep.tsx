
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DestinationStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const destinationTypes = [
  { id: 'city', label: 'City / Urban' },
  { id: 'beach', label: 'Beach / Coastal' },
  { id: 'mountains', label: 'Mountains / Hiking' },
  { id: 'countryside', label: 'Countryside / Rural' },
  { id: 'resort', label: 'Resort / Luxury Destination' },
  { id: 'cruise', label: 'Cruise Ship' },
  { id: 'desert', label: 'Desert' },
  { id: 'cold-weather', label: 'Cold Weather Destination' },
  { id: 'tropical', label: 'Tropical Destination' },
  { id: 'not-applicable', label: 'Not Applicable / General' }
];

const DestinationStep: React.FC<DestinationStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Destination</h3>
        <p className="text-gray-600 mb-4">Where will you be wearing this outfit? (Optional)</p>
        <Input
          placeholder="E.g., Paris, New York, beach resort in Bali, etc."
          value={formData.destination}
          onChange={(e) => updateFormData({ destination: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-styleklick-purple focus:border-styleklick-purple"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Destination Type</h3>
        <p className="text-gray-600 mb-4">What kind of environment will you be in?</p>
        <RadioGroup 
          value={formData.destinationType} 
          onValueChange={(value) => updateFormData({ destinationType: value })}
          className="space-y-3"
        >
          {destinationTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id} id={`dest-${type.id}`} />
              <Label htmlFor={`dest-${type.id}`}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default DestinationStep;
