
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

interface BudgetStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const budgetRanges = [
  { id: 'budget', label: 'Budget-Friendly (Under $100)' },
  { id: 'mid-range', label: 'Mid-Range ($100-$300)' },
  { id: 'high-end', label: 'High-End ($300-$1,000)' },
  { id: 'luxury', label: 'Luxury (Over $1,000)' },
  { id: 'mixed', label: 'Mixed (Some splurges, some budget items)' },
  { id: 'no-preference', label: 'No Preference' }
];

const BudgetStep: React.FC<BudgetStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Budget Range</h3>
        <p className="text-gray-600 mb-4">What's your preferred budget range for this outfit?</p>
        
        <Select 
          value={formData.budgetRange} 
          onValueChange={(value) => updateFormData({ budgetRange: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your budget range" />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Comments</h3>
        <p className="text-gray-600 mb-4">Anything else you'd like to tell us about your preferences?</p>
        <Textarea
          placeholder="E.g., prefer sustainable brands, looking for outfit that can be worn multiple ways, etc."
          value={formData.specifics || ''}
          onChange={(e) => updateFormData({ specifics: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-styleklick-purple focus:border-styleklick-purple"
        />
      </div>
    </div>
  );
};

export default BudgetStep;
