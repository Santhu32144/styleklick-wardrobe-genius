
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OutfitGallery from './OutfitGallery';
import { ThemeType } from '@/pages/RecommendationsPage';

interface RecommendationTabsProps {
  activeTheme: ThemeType;
  setActiveTheme: (theme: ThemeType) => void;
  outfits: any[];
  onOutfitSelect: (outfit: any) => void;
  onSaveToLookbook: (outfitData: any) => void;
  showSingleCard?: boolean;
}

const RecommendationTabs = ({ 
  activeTheme, 
  setActiveTheme, 
  outfits, 
  onOutfitSelect, 
  onSaveToLookbook,
  showSingleCard = false 
}: RecommendationTabsProps) => {
  const displayedOutfits = showSingleCard ? outfits.slice(0, 1) : outfits;

  return (
    <Tabs value={activeTheme} onValueChange={(value) => setActiveTheme(value as ThemeType)} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="fall">Fall Vibes</TabsTrigger>
        <TabsTrigger value="adventure">Adventure Ready</TabsTrigger>
        <TabsTrigger value="urban">Urban Chic</TabsTrigger>
      </TabsList>
      
      <TabsContent value="fall" className="space-y-6 mt-6">
        <OutfitGallery 
          outfits={displayedOutfits}
          onOutfitSelect={onOutfitSelect}
          onSaveToLookbook={onSaveToLookbook}
        />
      </TabsContent>
      
      <TabsContent value="adventure" className="space-y-6 mt-6">
        <OutfitGallery 
          outfits={displayedOutfits}
          onOutfitSelect={onOutfitSelect}
          onSaveToLookbook={onSaveToLookbook}
        />
      </TabsContent>
      
      <TabsContent value="urban" className="space-y-6 mt-6">
        <OutfitGallery 
          outfits={displayedOutfits}
          onOutfitSelect={onOutfitSelect}
          onSaveToLookbook={onSaveToLookbook}
        />
      </TabsContent>
    </Tabs>
  );
};

export default RecommendationTabs;
