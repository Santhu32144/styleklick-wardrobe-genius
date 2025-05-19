
import React from 'react';
import Layout from '../components/layout/Layout';
import StyleChat from '../components/ai/StyleChat';
import CaptionGenerator from '../components/ai/CaptionGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, MessageSquare, Wand2 } from 'lucide-react';

const StyleAssistantPage = () => {
  return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Your AI Style Assistant
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get personalized style advice, outfit suggestions, and social media captions powered by AI.
            </p>
          </div>
          
          <Tabs defaultValue="chat" className="mb-12">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Style Chat</span>
              </TabsTrigger>
              <TabsTrigger value="caption" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Caption Generator</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                <span>Style Tips</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <div className="h-[600px]">
                <StyleChat />
              </div>
            </TabsContent>
            
            <TabsContent value="caption">
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-2xl mx-auto">
                    <CaptionGenerator />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Style Tips & Tricks</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-styleklick-purple/5 p-4 rounded-lg border border-styleklick-purple/20">
                        <h3 className="text-lg font-medium mb-2 text-styleklick-purple">Color Coordination</h3>
                        <p className="text-sm">Learn how to combine colors effectively using complementary, analogous, or monochromatic schemes for a cohesive look.</p>
                      </div>
                      
                      <div className="bg-styleklick-purple/5 p-4 rounded-lg border border-styleklick-purple/20">
                        <h3 className="text-lg font-medium mb-2 text-styleklick-purple">Proportions Matter</h3>
                        <p className="text-sm">Balance your silhouette by pairing fitted items with loose ones. Tight top? Try relaxed bottoms. Baggy pants? Consider a more fitted shirt.</p>
                      </div>
                      
                      <div className="bg-styleklick-purple/5 p-4 rounded-lg border border-styleklick-purple/20">
                        <h3 className="text-lg font-medium mb-2 text-styleklick-purple">Accessorize Wisely</h3>
                        <p className="text-sm">Choose accessories that complement rather than overwhelm your outfit. Sometimes one statement piece is more effective than multiple competing items.</p>
                      </div>
                      
                      <div className="bg-styleklick-purple/5 p-4 rounded-lg border border-styleklick-purple/20">
                        <h3 className="text-lg font-medium mb-2 text-styleklick-purple">Dress for Your Body</h3>
                        <p className="text-sm">Understand your body type and choose clothes that flatter your proportions. Emphasize your favorite features while creating visual balance.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StyleAssistantPage;
