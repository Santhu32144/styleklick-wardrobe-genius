
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Copy, CheckCheck, Clock, RefreshCw } from 'lucide-react';

interface CaptionGeneratorProps {
  outfitDescription?: string;
  occasion?: string;
  style?: string;
}

const CaptionGenerator = ({ outfitDescription, occasion, style }: CaptionGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [outfitDetails, setOutfitDetails] = useState(outfitDescription || '');
  const [caption, setCaption] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const generateCaption = async () => {
    if (!outfitDetails) {
      toast({
        title: "Missing information",
        description: "Please describe your outfit first.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      let prompt = `Generate a catchy, engaging Instagram caption for this outfit: ${outfitDetails}`;
      
      if (occasion) {
        prompt += `\nThe occasion is: ${occasion}`;
      }
      
      if (style) {
        prompt += `\nThe style is: ${style}`;
      }
      
      prompt += "\nInclude 3-5 relevant hashtags at the end.";

      const { data, error } = await supabase.functions.invoke('openai-stylist', {
        body: { prompt, type: 'caption' }
      });

      if (error) throw error;
      
      setCaption(data.result);
    } catch (error) {
      console.error('Error generating caption:', error);
      toast({
        title: "Something went wrong",
        description: "Failed to generate caption. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (caption) {
      navigator.clipboard.writeText(caption);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Caption copied to clipboard.",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <Card className="border-styleklick-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-styleklick-purple" />
          Caption Generator
        </CardTitle>
        <CardDescription>
          Create stylish captions for your outfit posts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="outfitDetails" className="text-sm font-medium">
            Describe your outfit
          </label>
          <Textarea
            id="outfitDetails"
            placeholder="E.g., A floral summer dress with white sandals and a straw hat..."
            value={outfitDetails}
            onChange={(e) => setOutfitDetails(e.target.value)}
            rows={3}
          />
        </div>
        
        <Button 
          onClick={generateCaption}
          disabled={loading || !outfitDetails}
          className="w-full"
        >
          {loading ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4 mr-2" />
              Generate Caption
            </>
          )}
        </Button>
        
        {loading ? (
          <div className="p-4 bg-muted/50 rounded-md">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6 mt-2" />
          </div>
        ) : caption ? (
          <div className="p-4 bg-styleklick-purple/5 rounded-md border border-styleklick-purple/20 relative">
            <p className="text-sm">{caption}</p>
            <div className="absolute right-2 top-2 flex gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={copyToClipboard} 
                className="h-7 w-7"
              >
                {copied ? (
                  <CheckCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={generateCaption} 
                className="h-7 w-7"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CaptionGenerator;
