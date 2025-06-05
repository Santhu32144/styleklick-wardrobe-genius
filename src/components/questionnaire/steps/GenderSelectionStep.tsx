
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, UserX } from 'lucide-react';

interface GenderSelectionStepProps {
  value?: string;
  onChange?: (value: string) => void;
  onNext?: () => void;
  onSelectGender?: (gender: string) => void;
}

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ 
  value = '', 
  onChange, 
  onNext, 
  onSelectGender 
}) => {
  const handleGenderSelect = (gender: string) => {
    if (onChange) {
      onChange(gender);
    }
    if (onSelectGender) {
      onSelectGender(gender);
    }
  };

  const handleDoubleClick = (gender: string) => {
    handleGenderSelect(gender);
    // Small delay to ensure state updates
    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">What's your gender?</h2>
        <p className="text-gray-600">
          💡 Tip: Double-click any option to automatically move to the next step
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
            value === 'male' ? 'ring-2 ring-styleklick-purple bg-styleklick-purple/10' : ''
          }`}
          onClick={() => handleGenderSelect('male')}
          onDoubleClick={() => handleDoubleClick('male')}
        >
          <CardContent className="p-6 text-center">
            <User className="mx-auto mb-4 h-12 w-12 text-styleklick-purple" />
            <h3 className="text-xl font-semibold">Male</h3>
            {value === 'male' && (
              <div className="mt-2 text-styleklick-purple font-medium">
                Selected ✓
              </div>
            )}
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
            value === 'female' ? 'ring-2 ring-styleklick-purple bg-styleklick-purple/10' : ''
          }`}
          onClick={() => handleGenderSelect('female')}
          onDoubleClick={() => handleDoubleClick('female')}
        >
          <CardContent className="p-6 text-center">
            <UserX className="mx-auto mb-4 h-12 w-12 text-styleklick-purple" />
            <h3 className="text-xl font-semibold">Female</h3>
            {value === 'female' && (
              <div className="mt-2 text-styleklick-purple font-medium">
                Selected ✓
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenderSelectionStep;
