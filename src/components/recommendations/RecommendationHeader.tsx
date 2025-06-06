
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from 'lucide-react';
import { QuestionnaireData } from '@/components/questionnaire/QuestionnaireForm';

interface RecommendationHeaderProps {
  formData: QuestionnaireData;
}

const RecommendationHeader = ({ formData }: RecommendationHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold gradient-heading">Your Style Recommendations</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-styleklick-purple text-styleklick-purple" 
            asChild
          >
            <Link to="/location-posing-suggestions" state={{ returnTo: '/recommendations' }}>
              <MapPin className="mr-2 h-4 w-4" />
              Location Ideas
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/questionnaire">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quiz
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">
        Based on your preferences for {formData.stylePreferences.join(', ')} style, 
        {formData.occasion && ` ${formData.occasion} occasions,`}
        {formData.destinationType && ` and ${formData.destinationType} environments.`}
      </p>
    </div>
  );
};

export default RecommendationHeader;
