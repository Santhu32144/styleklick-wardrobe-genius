
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BodyInfoStep from './steps/BodyInfoStep';
import StylePreferencesStep from './steps/StylePreferencesStep';
import OccasionStep from './steps/OccasionStep';
import DestinationStep from './steps/DestinationStep';
import BudgetStep from './steps/BudgetStep';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define types for our form data
export interface QuestionnaireData {
  bodyType: string;
  gender: string;
  height: string;
  skinTone: string;
  stylePreferences: string[];
  formalityLevel: string;
  colors: string[];
  occasion: string;
  seasonality: string;
  destination: string;
  destinationType: string;
  budgetRange: string;
  specifics: string;
}

const steps = [
  { name: 'Body Info', description: 'Your body measurements and features' },
  { name: 'Style', description: 'Your style preferences and tastes' },
  { name: 'Occasion', description: 'What you\'re dressing for' },
  { name: 'Destination', description: 'Where you\'ll be wearing this outfit' },
  { name: 'Budget', description: 'Your spending preferences' }
];

const initialFormData: QuestionnaireData = {
  bodyType: '',
  gender: '',
  height: '',
  skinTone: '',
  stylePreferences: [],
  formalityLevel: '',
  colors: [],
  occasion: '',
  seasonality: '',
  destination: '',
  destinationType: '',
  budgetRange: '',
  specifics: ''
};

const QuestionnaireForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>(initialFormData);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    } else {
      toast({
        title: "Please complete all required fields",
        description: "All required fields in this step need to be filled before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Updated validation to make specified fields optional
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Body Info - Only gender is required
        return formData.gender !== '';
      case 1: // Style Preferences - Only stylePreferences is required
        return formData.stylePreferences.length > 0;
      case 2: // Occasion - Keep occasion and seasonality required
        return formData.occasion && formData.seasonality;
      case 3: // Destination
        return formData.destination && formData.destinationType;
      case 4: // Budget - All fields optional
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    // In a real app, you would send this data to your API
    console.log("Form submitted:", formData);
    
    // For demo purposes, we'll just redirect to the recommendations page with the data in state
    navigate('/recommendations', { state: { formData } });
  };

  const updateFormData = (data: Partial<QuestionnaireData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BodyInfoStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <StylePreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <OccasionStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <DestinationStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <BudgetStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Style Questionnaire</h2>
        <p className="text-gray-600 mb-6">Help us understand your style needs to provide personalized recommendations.</p>
        
        <Progress value={(currentStep + 1) / steps.length * 100} className="h-2 bg-gray-200" />
        
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{steps[currentStep].name}</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="hidden md:flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${index < currentStep 
                  ? 'bg-styleklick-purple text-white' 
                  : index === currentStep 
                    ? 'bg-styleklick-purple-light border-2 border-styleklick-purple text-styleklick-purple' 
                    : 'bg-gray-100 text-gray-400'}`}
            >
              {index < currentStep ? <Check size={16} /> : index + 1}
            </div>
            <div className="text-center">
              <p className={`font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.name}
              </p>
              <p className={`text-xs ${index <= currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="border-styleklick-purple text-styleklick-purple"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleNextStep}
              className="btn-primary"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <span>Get Recommendations</span>
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionnaireForm;
