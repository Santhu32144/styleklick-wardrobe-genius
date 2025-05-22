
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AIStyleInsights = () => {
  const insights = [
    {
      title: "Casual Elegance",
      description: "Achieve effortless style with these balanced proportions",
      score: "94% match"
    },
    {
      title: "Urban Explorer",
      description: "Versatile pieces for your city adventures",
      score: "87% match"
    },
    {
      title: "Seasonal Transition",
      description: "Adaptable layers for changing weather",
      score: "82% match"
    }
  ];

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="mr-3 h-6 w-6 text-styleklick-purple" />
          <h2 className="text-2xl font-bold">AI Style Insights</h2>
        </div>
        <Link to="/questionnaire" className="text-styleklick-purple text-sm font-medium">
          Get personalized insights
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-between items-start">
                <div className="p-2 bg-styleklick-soft-purple/20 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-styleklick-purple" />
                </div>
                <span className="text-sm font-medium text-styleklick-purple">{insight.score}</span>
              </div>
              
              <h3 className="text-lg font-medium mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
              
              <Button variant="ghost" className="p-0 h-auto text-styleklick-purple hover:text-styleklick-purple/80" asChild>
                <Link to="/recommendations" className="flex items-center gap-1 text-sm">
                  <span>See recommendations</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AIStyleInsights;
