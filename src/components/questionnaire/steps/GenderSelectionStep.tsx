
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Male, Female, User } from 'lucide-react';

interface GenderSelectionStepProps {
  onSelectGender: (gender: string) => void;
}

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ onSelectGender }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Choose Your Style Preference</CardTitle>
        <CardDescription>
          This helps us personalize your outfit recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-200"
            onClick={() => onSelectGender('male')}
          >
            <Male size={32} className="text-blue-500" />
            <span>Male</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-200"
            onClick={() => onSelectGender('female')}
          >
            <Female size={32} className="text-pink-500" />
            <span>Female</span>
          </Button>
        </div>
        
        <div className="text-center pt-4">
          <Button
            variant="ghost"
            className="text-xs text-gray-500 hover:text-gray-700"
            onClick={() => onSelectGender('neutral')}
          >
            <User size={14} className="mr-1" />
            I prefer not to say
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenderSelectionStep;
