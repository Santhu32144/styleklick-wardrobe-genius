import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToLookbook } from '@/lib/utils';
import OutfitGallery from './OutfitGallery';

interface RecommendationResultProps {
  result: {
    id: string;
    title: string;
    description: string;
    styleId: string;
  };
  onImageClick: (styleId: string, styleName: string) => void;
}

const RecommendationResult: React.FC<RecommendationResultProps> = ({ result, onImageClick }) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleImageClick = () => {
    onImageClick(result.styleId, result.title);
  };

  const handleAddToLookbook = async () => {
    setIsAdding(true);
    try {
      await addToLookbook(result.styleId);
      toast({
        title: "Added to Lookbook!",
        description: "Check your profile to see your saved styles.",
      });
    } catch (error) {
      toast({
        title: "Failed to add to Lookbook",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {result.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{result.description}</p>
      </CardHeader>
      <CardContent className="p-4">
        
          <OutfitGallery
            styleId={result.styleId}
            styleName={result.title}
            onImageClick={handleImageClick}
            onAddToLookbook={handleAddToLookbook}
          />
        
        <Button 
          variant="secondary" 
          className="w-full mt-4 justify-center"
          onClick={handleAddToLookbook}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              Add to Lookbook
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendationResult;
