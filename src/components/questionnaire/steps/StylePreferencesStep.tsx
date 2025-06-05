
import React from 'react';
import { QuestionnaireData, StylePreference } from '../QuestionnaireForm';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StylePreferencesStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
}

const styleOptions: Array<{
  value: StylePreference;
  label: string;
  description: string;
  image: string;
}> = [
  {
    value: 'minimalist',
    label: 'Minimalist',
    description: 'Clean lines, neutral colors, timeless pieces',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Comfortable, relaxed, everyday wear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    value: 'streetwear',
    label: 'Streetwear',
    description: 'Urban, trendy, bold statement pieces',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    value: 'sporty',
    label: 'Sporty',
    description: 'Athletic, active, performance-focused',
    image: 'https://images.unsplash.com/photo-1593520126198-99a1272190e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
];

const StylePreferencesStep: React.FC<StylePreferencesStepProps> = ({ 
  formData, 
  updateFormData,
  onNext 
}) => {
  const handleStyleSelect = (style: StylePreference) => {
    updateFormData({ stylePreference: style, stylePreferences: [style] });
  };

  const handleDoubleClick = (style: StylePreference) => {
    updateFormData({ stylePreference: style, stylePreferences: [style] });
    setTimeout(onNext, 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">What's your style vibe?</h3>
        <p className="text-gray-600 mb-6">Choose the style that best represents your personality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {styleOptions.map((option) => (
          <Card 
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden ${
              (formData.stylePreference === option.value || formData.stylePreferences.includes(option.value)) ? 'ring-2 ring-styleklick-purple border-styleklick-purple' : 'border-gray-200'
            }`}
            onClick={() => handleStyleSelect(option.value)}
            onDoubleClick={() => handleDoubleClick(option.value)}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={option.image} 
                alt={option.label}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-lg mb-2">{option.label}</h4>
              <p className="text-sm text-gray-500 mb-3">{option.description}</p>
              {(formData.stylePreference === option.value || formData.stylePreferences.includes(option.value)) && (
                <Badge className="bg-styleklick-purple">
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

export default StylePreferencesStep;
