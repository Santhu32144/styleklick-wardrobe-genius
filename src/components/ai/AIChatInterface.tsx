
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onClose?: () => void;
  onStyleSuggestion?: (suggestion: any) => void;
  className?: string;
}

const AIChatInterface = ({ onClose, onStyleSuggestion, className }: AIChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your personal style AI assistant. Tell me about your style preferences, occasion, or any specific look you're going for, and I'll help you create the perfect outfit!",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Great choice! Based on your request for "${userMessage.content}", I'd suggest a stylish combination. Let me create a personalized outfit recommendation for you. Would you like me to focus on any specific colors or style elements?`,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);

      // Trigger style suggestion
      if (onStyleSuggestion) {
        onStyleSuggestion({
          title: "AI Custom Suggestion",
          description: `Personalized style based on: ${userMessage.content}`,
          confidence: 95,
          source: 'chat',
          outfitSuggestions: [
            "Consider a modern minimalist approach with clean lines",
            "Mix textures for visual interest",
            "Add a statement accessory to elevate the look"
          ],
          poseIdeas: [
            {
              name: "Confident Stance",
              description: "Stand tall with shoulders back",
              caption: "Own your style with confidence"
            }
          ]
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={cn("flex flex-col h-96 w-80 shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-3 bg-gradient-to-r from-styleklick-purple to-styleklick-soft-purple text-white">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot size={16} />
          Style AI Assistant
        </CardTitle>
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
          >
            <X size={14} />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0">
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 max-w-[90%]",
                  message.role === 'user' ? "ml-auto" : "mr-auto"
                )}
              >
                <div className={cn(
                  "flex items-start gap-2",
                  message.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                    message.role === 'user' 
                      ? "bg-styleklick-purple text-white" 
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {message.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={cn(
                    "rounded-lg p-2 text-xs",
                    message.role === 'user' 
                      ? "bg-styleklick-purple text-white" 
                      : "bg-gray-100 text-gray-800"
                  )}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 mr-auto max-w-[90%]">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot size={12} className="text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t bg-gray-50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about styles, colors, or occasions..."
              className="flex-1 text-xs h-8"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="h-8 w-8 p-0 bg-styleklick-purple hover:bg-styleklick-purple/90"
            >
              <Send size={12} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;
