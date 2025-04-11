
import React from 'react';
import { QuestionnaireData } from '../QuestionnaireForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BudgetStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

// Since we've removed the Budget step from the questionnaire flow,
// this component is simplified to work with the existing QuestionnaireData type
const BudgetStep: React.FC<BudgetStepProps> = ({ formData, updateFormData }) => {
  // This component is kept as a placeholder but no longer used in the main flow
  // It could be reintegrated later if budget considerations are added back to the flow
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Budget Range (Optional)</h3>
        <p className="text-gray-600 mb-4">
          Budget preferences can be adjusted at the recommendation stage.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Comments</h3>
        <p className="text-gray-600 mb-4">
          Additional preferences can be specified during the recommendation refinement.
        </p>
      </div>
    </div>
  );
};

export default BudgetStep;
