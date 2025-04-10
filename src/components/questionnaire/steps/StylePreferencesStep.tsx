
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

interface StylePreferencesStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const styleOptions = [
  { id: 'casual', label: 'Casual' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'bohemian', label: 'Bohemian' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'preppy', label: 'Preppy' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'classic', label: 'Classic / Timeless' },
  { id: 'glamorous', label: 'Glamorous / Luxe' },
  { id: 'sporty', label: 'Sporty / Athletic' },
  { id: 'artsy', label: 'Artsy / Creative' },
  { id: 'business', label: 'Business / Professional' }
];

const formalityLevels = [
  { id: 'very-casual', label: 'Very Casual', image: '/images/formality/very-casual.jpg', description: 'Loungewear, errands' },
  { id: 'casual', label: 'Casual', image: '/images/formality/casual.jpg', description: 'Everyday wear' },
  { id: 'smart-casual', label: 'Smart Casual', image: '/images/formality/smart-casual.jpg', description: 'Nice dinner, casual office' },
  { id: 'business-casual', label: 'Business Casual', image: '/images/formality/business-casual.jpg', description: 'Office attire' },
  { id: 'formal', label: 'Formal', image: '/images/formality/formal.jpg', description: 'Business formal, cocktail' },
  { id: 'very-formal', label: 'Very Formal', image: '/images/formality/very-formal.jpg', description: 'Black tie, gala' }
];

const colorOptions = [
  { id: 'neutrals', label: 'Neutrals', image: '/images/colors/neutrals.jpg', description: 'Black, white, gray, beige' },
  { id: 'earth-tones', label: 'Earth Tones', image: '/images/colors/earth-tones.jpg', description: 'Browns, olive green, terracotta' },
  { id: 'pastels', label: 'Pastels', image: '/images/colors/pastels.jpg', description: 'Soft, light colors' },
  { id: 'bold-colors', label: 'Bold & Bright', image: '/images/colors/bold-colors.jpg', description: 'Vibrant, eye-catching colors' },
  { id: 'darks', label: 'Dark Colors', image: '/images/colors/darks.jpg', description: 'Navy, burgundy, forest green' },
  { id: 'monochrome', label: 'Monochrome', image: '/images/colors/monochrome.jpg', description: 'Single color looks' },
  { id: 'jewel-tones', label: 'Jewel Tones', image: '/images/colors/jewel-tones.jpg', description: 'Emerald, sapphire, ruby' }
];

const StylePreferencesStep: React.FC<StylePreferencesStepProps> = ({ formData, updateFormData }) => {
  const handleStyleChange = (styleId: string, checked: boolean) => {
    if (checked) {
      updateFormData({ 
        stylePreferences: [...formData.stylePreferences, styleId] 
      });
    } else {
      updateFormData({ 
        stylePreferences: formData.stylePreferences.filter(id => id !== styleId) 
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Style Preferences</h3>
        <p className="text-gray-600 mb-4">Select the style you're most interested in:</p>
        <Select
          value={formData.stylePreferences[0] || ''}
          onValueChange={(value) => updateFormData({ stylePreferences: [value] })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your preferred style" />
          </SelectTrigger>
          <SelectContent>
            {styleOptions.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Formality Level (Optional)</h3>
        <p className="text-gray-600 mb-4">How formal should your outfit be?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {formalityLevels.map((level) => (
            <Card 
              key={level.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                formData.formalityLevel === level.id 
                  ? 'ring-2 ring-styleklick-purple' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateFormData({ formalityLevel: level.id })}
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {level.label}
                </div>
                {/* Image would be displayed here if available */}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm">{level.label}</h4>
                <p className="text-xs text-gray-500">{level.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Color Preference (Optional)</h3>
        <p className="text-gray-600 mb-4">Select your preferred color palette:</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {colorOptions.map((color) => (
            <Card 
              key={color.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                formData.colors[0] === color.id 
                  ? 'ring-2 ring-styleklick-purple' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateFormData({ colors: [color.id] })}
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {color.label}
                </div>
                {/* Image would be displayed here if available */}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm">{color.label}</h4>
                <p className="text-xs text-gray-500">{color.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylePreferencesStep;
