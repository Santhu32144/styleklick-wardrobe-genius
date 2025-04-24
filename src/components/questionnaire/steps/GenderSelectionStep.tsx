
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { User, Heart, LogIn } from 'lucide-react';

interface GenderSelectionStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const genders = [
  { id: 'female', label: 'Female', icon: Heart },
  { id: 'male', label: 'Male', icon: LogIn },
  { id: 'other', label: 'Other', icon: User }
];

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ formData, updateFormData }) => {
  const handleSelectGender = (gender: string) => {
    updateFormData({ gender });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Select Your Gender</h3>
        <p className="text-gray-600 mb-6">
          This helps us customize style recommendations specifically for you.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {genders.map((gender) => {
            const Icon = gender.icon;
            const isSelected = formData.gender === gender.id;
            
            return (
              <div 
                key={gender.id}
                onClick={() => handleSelectGender(gender.id)}
                className={`cursor-pointer border rounded-lg p-6 flex flex-col items-center transition-all ${
                  isSelected 
                    ? 'border-styleklick-purple bg-styleklick-purple bg-opacity-10' 
                    : 'border-gray-200 hover:border-styleklick-purple hover:bg-gray-50'
                }`}
              >
                <Icon 
                  size={48} 
                  className={`${isSelected ? 'text-styleklick-purple' : 'text-gray-500'} mb-4`} 
                />
                <div className="text-center">
                  <div className={`text-lg font-medium ${isSelected ? 'text-styleklick-purple' : 'text-gray-800'}`}>
                    {gender.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenderSelectionStep;
