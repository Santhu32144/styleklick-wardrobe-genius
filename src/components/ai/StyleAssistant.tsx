
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Wand2, Clock, Trash2, PlusCircle } from 'lucide-react';

interface StyleSuggestion {
  outfitSuggestion: string;
  accessories: string[];
  colorPalette: string[];
}

const StyleAssistant = ({ formData }: { formData?: any }) => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [suggestions, setSuggestions] = useState<StyleSuggestion | null>(null);
  const { toast } = useToast();
  
  const generateStyleSuggestion = async () => {
    if (!formData) {
      toast({
        title: "Missing information",
        description: "Please complete the style questionnaire first.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      // Creating a detailed, structured prompt with all available user preferences
      const genderText = formData.gender ? 
        `a ${formData.gender} person` : 'someone';
      
      const styleText = formData.stylePreferences?.length > 0 ? 
        `who prefers ${formData.stylePreferences.join(', ')} style` : 
        'with no specific style preference';
      
      const occasionText = formData.occasion ? 
        `attending ${formData.occasion}` : 
        'attending a casual gathering';
      
      const seasonText = formData.seasonality ? 
        `during ${formData.seasonality} season` : 
        'during the current season';
      
      const destinationText = formData.destinationType ? 
        `at ${formData.destinationType} location` : 
        'at a typical venue';
      
      let prompt = `Create a detailed outfit recommendation for ${genderText} ${styleText}, ${occasionText}, ${seasonText}, ${destinationText}.`;
      
      prompt += `\n\nInclude specific pieces of clothing with colors and materials, how they should be paired together, and appropriate footwear.`;
      
      if (question) {
        prompt += `\n\nUser's specific request: "${question}"`;
      }
      
      prompt += `\n\nBe specific, trendy, and provide a cohesive look that matches all these parameters.`;

      console.log("Sending prompt to AI:", prompt);

      const { data, error } = await supabase.functions.invoke('openai-stylist', {
        body: { prompt, type: 'style-suggestion' }
      });

      if (error) throw error;
      
      console.log("Received AI response:", data);
      setSuggestions(data.result);
      setQuestion('');
    } catch (error) {
      console.error('Error generating style suggestion:', error);
      toast({
        title: "Something went wrong",
        description: "Failed to generate style suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );

  return (
    <Card className="mt-8 border-styleklick-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-styleklick-purple" />
          AI Style Assistant
        </CardTitle>
        <CardDescription>
          Get personalized outfit recommendations based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask something specific about your style needs..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={generateStyleSuggestion}
            disabled={loading}
          >
            {loading ? <Clock className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4 mr-2" />}
            {loading ? 'Generating...' : 'Get Ideas'}
          </Button>
        </div>

        {loading ? (
          <Card className="p-4 bg-muted/50">
            {renderSkeleton()}
          </Card>
        ) : suggestions ? (
          <div className="space-y-4">
            <div className="p-4 bg-styleklick-purple/5 rounded-md border border-styleklick-purple/20">
              <h4 className="font-medium mb-2 text-styleklick-purple">Outfit Suggestion</h4>
              <p className="text-sm">{suggestions.outfitSuggestion}</p>
            </div>
            
            {suggestions.accessories && suggestions.accessories.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Accessories</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.accessories.map((accessory, index) => (
                    <Badge key={index} variant="outline" className="bg-styleklick-soft-blue/30 border-none">
                      {accessory}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {suggestions.colorPalette && suggestions.colorPalette.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Color Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.colorPalette.map((color, index) => (
                    <Badge key={index} variant="outline" className="bg-styleklick-soft-peach/30 border-none">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSuggestions(null)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button 
                size="sm" 
                onClick={generateStyleSuggestion}
                className="bg-styleklick-purple hover:bg-styleklick-purple/80"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate New
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default StyleAssistant;
