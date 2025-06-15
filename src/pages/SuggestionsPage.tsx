
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import OutfitGallery from '../components/recommendations/OutfitGallery';

const SuggestionsPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockSuggestions = [
        {
          id: 'suggestion-1',
          title: 'Casual Street Style',
          description: 'Perfect for everyday wear with comfort and style',
          styleId: 'casual-street'
        },
        {
          id: 'suggestion-2', 
          title: 'Business Casual',
          description: 'Professional yet approachable look for work',
          styleId: 'business-casual'
        },
        {
          id: 'suggestion-3',
          title: 'Weekend Vibes',
          description: 'Relaxed and trendy for your leisure time',
          styleId: 'weekend-vibes'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="py-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center mb-2">
              <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Style Suggestions
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Describe what you're looking for and get instant style recommendations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                  What kind of style are you looking for?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="e.g., 'casual summer outfit for beach vacation'"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
                Your Style Suggestions
              </h2>
              
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-purple-700">
                        {suggestion.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{suggestion.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <OutfitGallery
                        styleId={suggestion.styleId}
                        styleName={suggestion.title}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {suggestions.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center text-gray-500 mt-8"
            >
              <Lightbulb className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Enter your style preferences above to get personalized suggestions!</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SuggestionsPage;
