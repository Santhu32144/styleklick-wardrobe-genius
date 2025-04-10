
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shirt, Briefcase, TShirt, Palette } from 'lucide-react';

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
  { id: 'very-casual', label: 'Very Casual', icon: TShirt, description: 'Loungewear, errands' },
  { id: 'casual', label: 'Casual', icon: TShirt, description: 'Everyday wear' },
  { id: 'smart-casual', label: 'Smart Casual', icon: Shirt, description: 'Nice dinner, casual office' },
  { id: 'business-casual', label: 'Business Casual', icon: Shirt, description: 'Professional setting' },
  { id: 'formal', label: 'Formal', icon: Briefcase, description: 'Business formal, cocktail' },
  { id: 'very-formal', label: 'Very Formal', icon: Briefcase, description: 'Black tie, gala' }
];

const colorOptions = [
  { id: 'neutrals', label: 'Neutrals', color: '#E0E0E0', description: 'Black, white, gray, beige' },
  { id: 'earth-tones', label: 'Earth Tones', color: '#A0522D', description: 'Browns, olive green, terracotta' },
  { id: 'pastels', label: 'Pastels', color: '#FFD1DC', description: 'Soft, light colors' },
  { id: 'bold-colors', label: 'Bold & Bright', color: '#FF5733', description: 'Vibrant colors' },
  { id: 'darks', label: 'Dark Colors', color: '#2E4053', description: 'Navy, burgundy, forest green' },
  { id: 'monochrome', label: 'Monochrome', color: '#000000', description: 'Single color looks' },
  { id: 'jewel-tones', label: 'Jewel Tones', color: '#9B59B6', description: 'Emerald, sapphire, ruby' }
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
        <h3 className="text-lg font-semibold mb-4">Formality Level (Optional)</h3>
        <p className="text-gray-600 mb-4">How formal should your outfit be?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {formalityLevels.map((level) => {
            const Icon = level.icon;
            const isSelected = formData.formalityLevel === level.id;
            
            return (
              <div 
                key={level.id}
                onClick={() => updateFormData({ formalityLevel: level.id })}
                className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all ${
                  isSelected 
                    ? 'border-styleklick-purple bg-styleklick-purple bg-opacity-10' 
                    : 'border-gray-200 hover:border-styleklick-purple hover:bg-gray-50'
                }`}
              >
                <Icon 
                  size={36} 
                  className={`${isSelected ? 'text-styleklick-purple' : 'text-gray-500'} mb-2`} 
                />
                <div className="text-center">
                  <div className={`font-medium ${isSelected ? 'text-styleklick-purple' : 'text-gray-800'}`}>
                    {level.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{level.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Color Preferences (Optional)</h3>
        <p className="text-gray-600 mb-4">Select colors you prefer to wear:</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {colorOptions.map((color) => {
            const isSelected = formData.colors.includes(color.id);
            
            return (
              <div 
                key={color.id}
                onClick={() => {
                  if (isSelected) {
                    updateFormData({
                      colors: formData.colors.filter(id => id !== color.id)
                    });
                  } else {
                    updateFormData({
                      colors: [...formData.colors, color.id]
                    });
                  }
                }}
                className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center transition-all ${
                  isSelected 
                    ? 'border-styleklick-purple bg-styleklick-purple bg-opacity-5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-full mb-2 border"
                  style={{ backgroundColor: color.color }}
                ></div>
                <div className="text-center">
                  <div className={`font-medium text-sm ${isSelected ? 'text-styleklick-purple' : 'text-gray-800'}`}>
                    {color.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{color.description}</div>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-styleklick-purple rounded-full flex items-center justify-center">
                    <Palette className="text-white" size={12} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StylePreferencesStep;
