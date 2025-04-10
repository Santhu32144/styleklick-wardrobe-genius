
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OccasionStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const occasions = [
  { id: 'daily-casual', label: 'Daily Casual / Everyday Wear' },
  { id: 'work', label: 'Work / Office' },
  { id: 'date', label: 'Date Night' },
  { id: 'party', label: 'Party / Night Out' },
  { id: 'formal-event', label: 'Formal Event (Wedding, Gala)' },
  { id: 'interview', label: 'Job Interview / Meeting' },
  { id: 'vacation', label: 'Vacation / Travel' },
  { id: 'outdoor-activity', label: 'Outdoor Activity' },
  { id: 'workout', label: 'Workout / Fitness' }
];

const seasons = [
  { id: 'spring', label: 'Spring' },
  { id: 'summer', label: 'Summer' },
  { id: 'fall', label: 'Fall / Autumn' },
  { id: 'winter', label: 'Winter' },
  { id: 'all-season', label: 'All Season / Year-round' }
];

const OccasionStep: React.FC<OccasionStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Occasion</h3>
        <p className="text-gray-600 mb-4">What occasion are you dressing for?</p>
        <RadioGroup 
          value={formData.occasion} 
          onValueChange={(value) => updateFormData({ occasion: value })}
          className="space-y-3"
        >
          {occasions.map((occasion) => (
            <div key={occasion.id} className="flex items-center space-x-2">
              <RadioGroupItem value={occasion.id} id={`occasion-${occasion.id}`} />
              <Label htmlFor={`occasion-${occasion.id}`}>{occasion.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Season / Weather</h3>
        <p className="text-gray-600 mb-4">What season are you dressing for?</p>
        <RadioGroup 
          value={formData.seasonality} 
          onValueChange={(value) => updateFormData({ seasonality: value })}
          className="space-y-3"
        >
          {seasons.map((season) => (
            <div key={season.id} className="flex items-center space-x-2">
              <RadioGroupItem value={season.id} id={`season-${season.id}`} />
              <Label htmlFor={`season-${season.id}`}>{season.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
        <p className="text-gray-600 mb-4">Anything specific about this occasion we should know?</p>
        <Textarea
          placeholder="E.g., outdoor wedding in the evening, casual office with no dress code, etc."
          value={formData.specifics || ''}
          onChange={(e) => updateFormData({ specifics: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-styleklick-purple focus:border-styleklick-purple"
        />
      </div>
    </div>
  );
};

export default OccasionStep;
