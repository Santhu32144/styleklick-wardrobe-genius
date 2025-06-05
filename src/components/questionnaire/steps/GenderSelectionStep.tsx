
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users } from 'lucide-react';

interface GenderSelectionStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
}

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ 
  formData, 
  updateFormData,
  onNext 
}) => {
  const handleGenderSelect = (gender: 'male' | 'female') => {
    updateFormData({ gender });
  };

  const handleDoubleClick = (gender: 'male' | 'female') => {
    updateFormData({ gender });
    setTimeout(onNext, 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">I identify as</h3>
        <p className="text-gray-600 mb-6">This helps us provide more personalized recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            formData.gender === 'male' ? 'ring-2 ring-styleklick-purple border-styleklick-purple' : 'border-gray-200'
          }`}
          onClick={() => handleGenderSelect('male')}
          onDoubleClick={() => handleDoubleClick('male')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <div className={`p-4 rounded-full mb-4 ${
              formData.gender === 'male' ? 'bg-styleklick-purple text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <User size={24} />
            </div>
            <h4 className="font-medium text-lg mb-2">Male</h4>
            <p className="text-sm text-gray-500 text-center">Menswear styles and fits</p>
            {formData.gender === 'male' && (
              <Badge className="mt-3 bg-styleklick-purple">
                Selected - Double click to continue
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            formData.gender === 'female' ? 'ring-2 ring-styleklick-purple border-styleklick-purple' : 'border-gray-200'
          }`}
          onClick={() => handleGenderSelect('female')}
          onDoubleClick={() => handleDoubleClick('female')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <div className={`p-4 rounded-full mb-4 ${
              formData.gender === 'female' ? 'bg-styleklick-purple text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <Users size={24} />
            </div>
            <h4 className="font-medium text-lg mb-2">Female</h4>
            <p className="text-sm text-gray-500 text-center">Womenswear styles and fits</p>
            {formData.gender === 'female' && (
              <Badge className="mt-3 bg-styleklick-purple">
                Selected - Double click to continue
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenderSelectionStep;
