
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
        <p className="text-gray-600 mb-4">Select all styles you're interested in (select 2-4 for best results):</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styleOptions.map((style) => (
            <div key={style.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`style-${style.id}`} 
                checked={formData.stylePreferences.includes(style.id)}
                onCheckedChange={(checked) => handleStyleChange(style.id, checked as boolean)}
              />
              <Label htmlFor={`style-${style.id}`}>{style.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Formality Level</h3>
        <p className="text-gray-600 mb-4">How formal should your outfit be?</p>
        <RadioGroup 
          value={formData.formalityLevel} 
          onValueChange={(value) => updateFormData({ formalityLevel: value })}
          className="space-y-3"
        >
          {formalityLevels.map((level) => (
            <div key={level.id} className="flex items-center space-x-2">
              <RadioGroupItem value={level.id} id={`formality-${level.id}`} />
              <Label htmlFor={`formality-${level.id}`}>{level.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Color Preferences</h3>
        <p className="text-gray-600 mb-4">Select colors you prefer to wear:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {colorOptions.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`color-${color.id}`} 
                checked={formData.colors.includes(color.id)}
                onCheckedChange={(checked) => handleColorChange(color.id, checked as boolean)}
              />
              <Label htmlFor={`color-${color.id}`}>{color.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylePreferencesStep;
