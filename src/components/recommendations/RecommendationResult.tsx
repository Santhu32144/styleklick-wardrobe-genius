import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, Check, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AIStyleRecommendation } from '@/services/aiStyleService';
import OutfitGallery from './OutfitGallery';
import { QuestionnaireData } from '@/components/questionnaire/QuestionnaireForm';

interface RecommendationResultProps {
  formData: QuestionnaireData;
}

const RecommendationResult = ({ formData }: RecommendationResultProps) => {
  const [recommendations, setRecommendations] = useState<AIStyleRecommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate fetching recommendations from an AI service
        // Replace this with your actual API call
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
        setRecommendations(mockRecommendations);
      } catch (e: any) {
        setError(e.message || "Failed to fetch recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [formData]);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleAddToLookbook = (image: any) => {
    toast({
      title: "Added to Lookbook!",
      description: "This outfit has been saved to your personal lookbook.",
    });
  };

  if (isLoading) {
    return <div className="text-center">Loading recommendations...</div>;
  }

  if (error || !recommendations || recommendations.length === 0) {
    return (
      <div className="text-center">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>No recommendations found.</div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Personalized Style Recommendations
        </h2>
        <p className="text-gray-600">
          Based on your preferences, here are some outfits we think you'll love.
        </p>
      </div>

      {recommendations.map((recommendation, index) => (
        <motion.div
          key={recommendation.outfitId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <CardHeader>
            <CardTitle>
              Recommendation {index + 1}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {recommendation.explanation}
            </p>
          </CardHeader>

          <div className="p-6">
            <OutfitGallery
              styleId={recommendation.outfitId}
              styleName={`Recommendation ${index + 1}`}
              onImageClick={handleImageClick}
              onAddToLookbook={handleAddToLookbook}
            />
          </div>
        </motion.div>
      ))}

      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.img
            src={selectedImage}
            alt="Outfit Preview"
            className="max-w-4xl max-h-4xl rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};

export default RecommendationResult;
