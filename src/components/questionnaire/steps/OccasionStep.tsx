
import React from 'react';
import { QuestionnaireData, Occasion } from '../QuestionnaireForm';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Heart, Users, Coffee, Plane } from 'lucide-react';

interface OccasionStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
}

const occasionOptions: Array<{
  value: Occasion;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    value: 'work',
    label: 'Work/Professional',
    description: 'Office meetings, presentations',
    icon: <Briefcase size={24} />
  },
  {
    value: 'casual',
    label: 'Casual Daily',
    description: 'Everyday comfort and style',
    icon: <Coffee size={24} />
  },
  {
    value: 'date',
    label: 'Date Night',
    description: 'Romantic dinners, special moments',
    icon: <Heart size={24} />
  },
  {
    value: 'party',
    label: 'Party/Event',
    description: 'Celebrations, social gatherings',
    icon: <Users size={24} />
  },
  {
    value: 'formal',
    label: 'Formal Event',
    description: 'Weddings, galas, ceremonies',
    icon: <Calendar size={24} />
  },
  {
    value: 'travel',
    label: 'Travel',
    description: 'Vacation, exploring new places',
    icon: <Plane size={24} />
  },
];

const OccasionStep: React.FC<OccasionStepProps> = ({ 
  formData, 
  updateFormData,
  onNext 
}) => {
  const handleOccasionSelect = (occasion: Occasion) => {
    updateFormData({ occasion });
  };

  const handleDoubleClick = (occasion: Occasion) => {
    updateFormData({ occasion });
    setTimeout(onNext, 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">What's the occasion?</h3>
        <p className="text-gray-600 mb-6">Choose the primary setting where you'll wear this outfit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {occasionOptions.map((option) => (
          <Card 
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              formData.occasion === option.value ? 'ring-2 ring-styleklick-purple border-styleklick-purple' : 'border-gray-200'
            }`}
            onClick={() => handleOccasionSelect(option.value)}
            onDoubleClick={() => handleDoubleClick(option.value)}
          >
            <CardContent className="flex flex-col items-center p-4">
              <div className={`p-3 rounded-full mb-3 ${
                formData.occasion === option.value ? 'bg-styleklick-purple text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {option.icon}
              </div>
              <h4 className="font-medium text-center mb-1">{option.label}</h4>
              <p className="text-xs text-gray-500 text-center">{option.description}</p>
              {formData.occasion === option.value && (
                <Badge className="mt-2 bg-styleklick-purple text-xs">
                  Selected
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OccasionStep;
