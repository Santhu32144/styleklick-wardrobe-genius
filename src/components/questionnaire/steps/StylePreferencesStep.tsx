
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
  { id: 'very-casual', label: 'Very Casual (loungewear, errands)' },
  { id: 'casual', label: 'Casual (everyday wear)' },
  { id: 'smart-casual', label: 'Smart Casual (nice dinner, casual office)' },
  { id: 'business-casual', label: 'Business Casual' },
  { id: 'formal', label: 'Formal (business formal, cocktail)' },
  { id: 'very-formal', label: 'Very Formal (black tie, gala)' }
];

const colorOptions = [
  { id: 'neutrals', label: 'Neutrals (black, white, gray, beige)' },
  { id: 'earth-tones', label: 'Earth Tones (browns, olive green, terracotta)' },
  { id: 'pastels', label: 'Pastels' },
  { id: 'bold-colors', label: 'Bold & Bright Colors' },
  { id: 'darks', label: 'Dark Colors (navy, burgundy, forest green)' },
  { id: 'monochrome', label: 'Monochrome (single color looks)' },
  { id: 'jewel-tones', label: 'Jewel Tones (emerald, sapphire, ruby)' }
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

  const handleColorChange = (colorId: string, checked: boolean) => {
    if (checked) {
      updateFormData({ 
        colors: [...formData.colors, colorId] 
      });
    } else {
      updateFormData({ 
        colors: formData.colors.filter(id => id !== colorId) 
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
        <h3 className="text-lg font-semibold mb-4">Formality Level</h3>
        <p className="text-gray-600 mb-4">How formal should your outfit be?</p>
        <Select
          value={formData.formalityLevel}
          onValueChange={(value) => updateFormData({ formalityLevel: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select formality level" />
          </SelectTrigger>
          <SelectContent>
            {formalityLevels.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Color Preference</h3>
        <p className="text-gray-600 mb-4">Select your preferred color palette:</p>
        <Select
          value={formData.colors[0] || ''}
          onValueChange={(value) => updateFormData({ colors: [value] })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your color preference" />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((color) => (
              <SelectItem key={color.id} value={color.id}>
                {color.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StylePreferencesStep;
