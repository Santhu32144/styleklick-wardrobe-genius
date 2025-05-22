
import { QuestionnaireData } from "@/components/questionnaire/QuestionnaireForm";

// Mock AI model for style recommendations
// In a production app, this would be replaced with a call to an AI service like OpenAI or a custom ML model
export interface AIStyleRecommendation {
  outfitId: string;
  confidence: number;
  explanation: string;
  matchScore: number;
  features: {
    bodyTypeMatch: number;
    colorHarmony: number;
    occasionAppropriateness: number;
    stylePreferenceMatch: number;
  };
}

export async function getAIStyleRecommendations(
  userPreferences: QuestionnaireData
): Promise<AIStyleRecommendation[]> {
  console.log("Getting AI style recommendations for:", userPreferences);
  
  // In a real implementation, this would call an AI service
  // For now, we'll simulate AI recommendations with a mock implementation
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Generate some mock AI recommendations based on user preferences
  const mockRecommendations: AIStyleRecommendation[] = [
    {
      outfitId: "1",
      confidence: 0.92,
      explanation: "This outfit aligns perfectly with your style preferences and body shape. The color palette complements your preferred aesthetic while the silhouette creates balanced proportions.",
      matchScore: 92,
      features: {
        bodyTypeMatch: 95,
        colorHarmony: 90,
        occasionAppropriateness: 98,
        stylePreferenceMatch: 85
      }
    },
    {
      outfitId: "2",
      confidence: 0.87,
      explanation: "Based on your occasion and style preferences, this sophisticated ensemble offers versatility while maintaining the level of formality you prefer.",
      matchScore: 87,
      features: {
        bodyTypeMatch: 82,
        colorHarmony: 95,
        occasionAppropriateness: 89,
        stylePreferenceMatch: 82
      }
    },
    {
      outfitId: "3",
      confidence: 0.85,
      explanation: "The casual comfort of this outfit combined with its on-trend elements makes it ideal for your specified preferences and destination type.",
      matchScore: 85,
      features: {
        bodyTypeMatch: 88,
        colorHarmony: 84,
        occasionAppropriateness: 90,
        stylePreferenceMatch: 78
      }
    },
    {
      outfitId: "4",
      confidence: 0.89,
      explanation: "This adventure-ready outfit is tailored to your outdoor preferences while maintaining style elements that align with your personal aesthetic.",
      matchScore: 89,
      features: {
        bodyTypeMatch: 90,
        colorHarmony: 87,
        occasionAppropriateness: 94,
        stylePreferenceMatch: 85
      }
    },
    {
      outfitId: "5",
      confidence: 0.91,
      explanation: "The seasonal relevance and color harmony of this outfit make it particularly well-suited to your preferences and stated occasion needs.",
      matchScore: 91,
      features: {
        bodyTypeMatch: 93,
        colorHarmony: 92,
        occasionAppropriateness: 88,
        stylePreferenceMatch: 91
      }
    }
  ];
  
  // Filter based on some simple rules related to preferences
  let filtered = [...mockRecommendations];
  
  // If user has specified an occasion, adjust the recommendations
  if (userPreferences.occasion === 'formal') {
    filtered = filtered.filter(rec => rec.features.occasionAppropriateness > 85);
  }
  
  // Sort by overall match score
  filtered.sort((a, b) => b.matchScore - a.matchScore);
  
  return filtered;
}
