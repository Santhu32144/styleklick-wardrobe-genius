
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { SendHorizonal, User2, Bot, Clock } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const StyleChat = () => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi${profile?.name ? ' ' + profile.name : ''}! I'm your personal style assistant. How can I help with your fashion needs today?`,
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Update welcome message when profile changes
  useEffect(() => {
    if (profile?.name && messages.length > 0 && messages[0].id === '1') {
      setMessages(prevMessages => [
        {
          ...prevMessages[0],
          content: `Hi ${profile.name}! I'm your personal style assistant. How can I help with your fashion needs today?`
        },
        ...prevMessages.slice(1)
      ]);
    }
  }, [profile?.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Enhance the prompt with user context if available
      let enrichedPrompt = input;
      
      if (profile) {
        let contextPrefix = "User context: ";
        if (profile.gender) {
          contextPrefix += `gender: ${profile.gender}, `;
        }
        if (profile.name) {
          contextPrefix += `name: ${profile.name}`;
        }
        
        // Add the context to the prompt
        enrichedPrompt = `${contextPrefix}\n\nUser question: ${input}`;
      }
      
      console.log("Sending chat message to AI:", enrichedPrompt);
      
      const { data, error } = await supabase.functions.invoke('openai-stylist', {
        body: {
          prompt: enrichedPrompt,
          type: 'quick-response'
        }
      });

      if (error) throw error;
      
      console.log("Received AI chat response:", data.result);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.result,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message failed",
        description: "Unable to send your message. Please try again.",
        variant: "destructive"
      });
      
      // Remove the user's message if it failed
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border-styleklick-purple/30 flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-styleklick-purple" />
          Style Chat
        </CardTitle>
        <CardDescription>
          Ask questions about fashion, outfits, and style
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={message.sender === 'assistant' ? 'bg-styleklick-purple text-white' : ''}>
                    {message.sender === 'user' ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div 
                  className={`rounded-lg p-3 text-sm ${
                    message.sender === 'user' 
                      ? 'bg-styleklick-purple text-white' 
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-styleklick-purple text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Input
            placeholder="Ask about style advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleChat;
