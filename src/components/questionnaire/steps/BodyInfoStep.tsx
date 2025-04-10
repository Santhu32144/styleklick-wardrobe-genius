
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
        <RadioGroup 
          value={formData.bodyType} 
          onValueChange={(value) => updateFormData({ bodyType: value })}
          className="space-y-3"
        >
          {bodyTypes.map((type) => (
            <div key={type.id} className="flex items-start space-x-2">
              <RadioGroupItem value={type.id} id={`body-${type.id}`} className="mt-1" />
              <div className="flex flex-col">
                <Label htmlFor={`body-${type.id}`} className="font-medium">{type.label}</Label>
                <p className="text-gray-500 text-sm">{type.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Gender</h3>
        <p className="text-gray-600 mb-4">Select your gender (for clothing recommendations):</p>
        <RadioGroup 
          value={formData.gender} 
          onValueChange={(value) => updateFormData({ gender: value })}
          className="space-y-3"
        >
          {genders.map((gender) => (
            <div key={gender.id} className="flex items-center space-x-2">
              <RadioGroupItem value={gender.id} id={`gender-${gender.id}`} />
              <Label htmlFor={`gender-${gender.id}`}>{gender.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Height</h3>
        <RadioGroup 
          value={formData.height} 
          onValueChange={(value) => updateFormData({ height: value })}
          className="space-y-3"
        >
          {heights.map((height) => (
            <div key={height.id} className="flex items-center space-x-2">
              <RadioGroupItem value={height.id} id={`height-${height.id}`} />
              <Label htmlFor={`height-${height.id}`}>{height.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Skin Tone</h3>
        <RadioGroup 
          value={formData.skinTone} 
          onValueChange={(value) => updateFormData({ skinTone: value })}
          className="space-y-3"
        >
          {skinTones.map((tone) => (
            <div key={tone.id} className="flex items-center space-x-2">
              <RadioGroupItem value={tone.id} id={`tone-${tone.id}`} />
              <Label htmlFor={`tone-${tone.id}`}>{tone.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default BodyInfoStep;
