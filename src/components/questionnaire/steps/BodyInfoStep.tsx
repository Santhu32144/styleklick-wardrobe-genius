
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Label } from "@/components/ui/label";
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
  { id: 'rectangle', label: 'Rectangle (straight)', description: 'Shoulder and hip measurements are about the same with little waist definition' },
  { id: 'hourglass', label: 'Hourglass', description: 'Well-defined waist with balanced shoulder and hip measurements' },
  { id: 'pear', label: 'Pear / Triangle', description: 'Hips are wider than shoulders' },
  { id: 'inverted-triangle', label: 'Inverted Triangle', description: 'Shoulders are wider than hips' },
  { id: 'apple', label: 'Apple / Round', description: 'Fuller midsection with slimmer legs and hips' }
];

const genders = [
  { id: 'female', label: 'Female' },
  { id: 'male', label: 'Male' },
  { id: 'non-binary', label: 'Non-Binary' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say' }
];

const heights = [
  { id: 'petite', label: 'Petite (under 5\'4")' },
  { id: 'average', label: 'Average (5\'4" - 5\'9")' },
  { id: 'tall', label: 'Tall (above 5\'9")' }
];

const skinTones = [
  { id: 'fair', label: 'Fair' },
  { id: 'light', label: 'Light' },
  { id: 'medium', label: 'Medium' },
  { id: 'olive', label: 'Olive' },
  { id: 'tan', label: 'Tan' },
  { id: 'deep', label: 'Deep' }
];

const BodyInfoStep: React.FC<BodyInfoStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Body Type</h3>
        <p className="text-gray-600 mb-4">Choose the option that best describes your body type:</p>
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
        <h3 className="text-lg font-semibold mb-4">Gender</h3>
        <p className="text-gray-600 mb-4">Select your gender (for clothing recommendations):</p>
        <Select 
          value={formData.gender} 
          onValueChange={(value) => updateFormData({ gender: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map((gender) => (
              <SelectItem key={gender.id} value={gender.id}>
                {gender.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Height</h3>
        <Select 
          value={formData.height} 
          onValueChange={(value) => updateFormData({ height: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your height range" />
          </SelectTrigger>
          <SelectContent>
            {heights.map((height) => (
              <SelectItem key={height.id} value={height.id}>
                {height.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Skin Tone</h3>
        <Select 
          value={formData.skinTone} 
          onValueChange={(value) => updateFormData({ skinTone: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your skin tone" />
          </SelectTrigger>
          <SelectContent>
            {skinTones.map((tone) => (
              <SelectItem key={tone.id} value={tone.id}>
                {tone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BodyInfoStep;
