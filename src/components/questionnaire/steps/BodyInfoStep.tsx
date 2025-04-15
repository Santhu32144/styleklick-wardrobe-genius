
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, UserRound, Users } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

interface BodyInfoStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const genders = [
  { id: 'female', label: 'Female', icon: User },
  { id: 'male', label: 'Male', icon: UserRound },
  { id: 'non-binary', label: 'Non-Binary', icon: Users },
  { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: User }
];

const BodyInfoStep: React.FC<BodyInfoStepProps> = ({ formData, updateFormData }) => {
  const { user, profile, updateProfile } = useAuth();

  // Update user's profile with the selected gender if they're logged in
  const handleGenderSelect = (gender: string) => {
    updateFormData({ gender });
    
    // If user is logged in, update their profile
    if (user && updateProfile && gender !== 'prefer-not-to-say') {
      updateProfile({ gender: gender as 'male' | 'female' });
    }
  };

  // If user is logged in and has a gender set in their profile, use that as default
  React.useEffect(() => {
    if (profile?.gender && !formData.gender) {
      updateFormData({ gender: profile.gender });
    }
  }, [profile, formData.gender, updateFormData]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">About You</h3>
        <p className="text-gray-600 mb-6">
          Select your gender to help us tailor clothing recommendations.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {genders.map((gender) => {
            const Icon = gender.icon;
            const isSelected = formData.gender === gender.id;
            
            return (
              <div 
                key={gender.id}
                onClick={() => handleGenderSelect(gender.id)}
                className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all ${
                  isSelected 
                    ? 'border-styleklick-purple bg-styleklick-purple bg-opacity-10' 
                    : 'border-gray-200 hover:border-styleklick-purple hover:bg-gray-50'
                }`}
              >
                <Icon 
                  size={40} 
                  className={`${isSelected ? 'text-styleklick-purple' : 'text-gray-500'} mb-3`} 
                />
                <div className="text-center">
                  <div className={`font-medium ${isSelected ? 'text-styleklick-purple' : 'text-gray-800'}`}>
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

export default BodyInfoStep;
