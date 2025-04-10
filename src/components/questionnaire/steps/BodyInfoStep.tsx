
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BodyInfoStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const bodyTypes = [
  { id: 'rectangle', label: 'Rectangle (Straight)' },
  { id: 'hourglass', label: 'Hourglass' },
  { id: 'pear', label: 'Pear (Triangle)' },
  { id: 'inverted-triangle', label: 'Inverted Triangle' },
  { id: 'apple', label: 'Apple (Round)' },
  { id: 'athletic', label: 'Athletic' },
  { id: 'petite', label: 'Petite' },
  { id: 'tall', label: 'Tall' },
  { id: 'plus-size', label: 'Plus Size' }
];

const genderOptions = [
  { id: 'womens', label: 'Women\'s Fashion' },
  { id: 'mens', label: 'Men\'s Fashion' },
  { id: 'unisex', label: 'Gender-Neutral Fashion' }
];

const heightOptions = [
  { id: 'petite', label: 'Petite (Under 5\'4")' },
  { id: 'average', label: 'Average (5\'4" - 5\'7")' },
  { id: 'tall', label: 'Tall (5\'8" - 6\'0")' },
  { id: 'very-tall', label: 'Very Tall (Over 6\'0")' }
];

const skinToneOptions = [
  { id: 'fair', label: 'Fair' },
  { id: 'light', label: 'Light' },
  { id: 'medium', label: 'Medium' },
  { id: 'olive', label: 'Olive' },
  { id: 'tan', label: 'Tan' },
  { id: 'deep', label: 'Deep' },
  { id: 'dark', label: 'Dark' }
];

const BodyInfoStep: React.FC<BodyInfoStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Gender Preference</h3>
        <p className="text-gray-600 mb-4">What type of fashion are you looking for?</p>
        <Select 
          value={formData.gender} 
          onValueChange={(value) => updateFormData({ gender: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gender preference" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Body Type (Optional)</h3>
        <p className="text-gray-600 mb-4">Select the body type that best represents you:</p>
        <Select 
          value={formData.bodyType} 
          onValueChange={(value) => updateFormData({ bodyType: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your body type" />
          </SelectTrigger>
          <SelectContent>
            {bodyTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Height (Optional)</h3>
        <p className="text-gray-600 mb-4">What is your height range?</p>
        <Select 
          value={formData.height} 
          onValueChange={(value) => updateFormData({ height: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your height range" />
          </SelectTrigger>
          <SelectContent>
            {heightOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Skin Tone (Optional)</h3>
        <p className="text-gray-600 mb-4">What is your skin tone?</p>
        <Select 
          value={formData.skinTone} 
          onValueChange={(value) => updateFormData({ skinTone: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your skin tone" />
          </SelectTrigger>
          <SelectContent>
            {skinToneOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BodyInfoStep;
