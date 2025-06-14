import React from "react";
import { QuestionnaireData } from "../QuestionnaireForm";
import { Card } from "@/components/ui/card";
import { Shirt, Palette, Camera, Zap } from "lucide-react";
import { images } from "@/constants";

interface StylePreferencesStepProps {
  formData: QuestionnaireData;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
  onNext?: () => void;
}

const styleOptions = [
  {
    id: "casual",
    label: "Casual",
    icon: Shirt,
    image: images.casual,
  },
  {
    id: "minimalist",
    label: "Minimalist",
    icon: Palette,
    image: images.miniGirl,
  },
  {
    id: "streetwear",
    label: "Streetwear",
    icon: Camera,
    image: images.streetwear,
  },
  {
    id: "sporty",
    label: "Sporty",
    icon: Zap,
    image: images.sporty,
  },
];

const StylePreferencesStep: React.FC<StylePreferencesStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const handleStyleSelect = (styleId: string) => {
    // Allow only single selection
    updateFormData({
      stylePreferences: [styleId],
    });
  };

  const handleDoubleClick = (styleId: string) => {
    // Select the style and move to next step
    updateFormData({
      stylePreferences: [styleId],
    });
    // Small delay to ensure state updates
    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Style Preference</h3>
        <p className="text-gray-600 mb-6">
          Select the style that best represents you. Choose only one option. 💡
          Tip: Double-click any option to automatically move to the next step
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {styleOptions.map((style) => {
            const Icon = style.icon;
            const isSelected = formData.stylePreferences.includes(style.id);

            return (
              <Card
                key={style.id}
                onClick={() => handleStyleSelect(style.id)}
                onDoubleClick={() => handleDoubleClick(style.id)}
                className={`cursor-pointer overflow-hidden transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-styleklick-purple" : ""
                }`}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.label}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Icon size={18} />
                      <h4 className="font-semibold">{style.label}</h4>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-styleklick-purple text-white p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StylePreferencesStep;
