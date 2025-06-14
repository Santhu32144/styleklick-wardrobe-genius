
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Send, Sparkles, Camera, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import OutfitGallery from '../components/recommendations/OutfitGallery';

const SuggestionsPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleGetStarted = () => {
    navigate('/questionnaire');
  };

  const handleARResult = () => {
    // Placeholder for AR functionality
    console.log('AR Result clicked');
    // In a real app, this would integrate with AR capabilities
  };

  return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8 text-yellow-500 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Style Suggestions
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Describe what you're looking for and get instant style recommendations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                  What kind of style are you looking for?
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Your Style Suggestions
              </h2>
              
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-700">
                        {suggestion.title}
                      </CardTitle>
                      <p className="text-gray-600">{suggestion.description}</p>
                    </CardHeader>
                    <CardContent>
                      <OutfitGallery
                        styleId={suggestion.styleId}
                        styleName={suggestion.title}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* AR Result Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center mt-12"
              >
                <Card className="max-w-md mx-auto">
                  <CardContent className="p-6">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-semibold mb-2">Try AR Experience</h3>
                    <p className="text-gray-600 mb-4">
                      See how these outfits look on you with our AR feature
                    </p>
                    <Button onClick={handleARResult} className="w-full">
                      <Camera className="mr-2 h-4 w-4" />
                      Try AR Result
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {suggestions.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-gray-500 mt-12"
            >
              <Lightbulb className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-6">Enter your style preferences above to get personalized suggestions!</p>
              
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Want More Detailed Recommendations?</h3>
                  <p className="text-gray-600 mb-4">
                    Take our comprehensive style questionnaire for personalized outfit suggestions
                  </p>
                  <Button onClick={handleGetStarted} className="w-full">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SuggestionsPage;
