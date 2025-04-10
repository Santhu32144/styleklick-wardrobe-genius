
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Select
          value={formData.occasion}
          onValueChange={(value) => updateFormData({ occasion: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select the occasion" />
          </SelectTrigger>
          <SelectContent>
            {occasions.map((occasion) => (
              <SelectItem key={occasion.id} value={occasion.id}>
                {occasion.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Season / Weather</h3>
        <p className="text-gray-600 mb-4">What season are you dressing for?</p>
        <Select
          value={formData.seasonality}
          onValueChange={(value) => updateFormData({ seasonality: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select the season" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season.id} value={season.id}>
                {season.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OccasionStep;
