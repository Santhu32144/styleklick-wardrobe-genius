import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bot, User, Send, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isRecommendation?: boolean;
}

interface AIChatInterfaceProps {
  userProfile?: {
    gender?: string;
    bodyType?: string;
    stylePreference?: string;
    occasion?: string;
  };
  onRecommendation?: (recommendation: string) => void;
}

const AIChatInterface = ({
  userProfile,
  onRecommendation,
}: AIChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your personal AI fashion stylist. Ask me anything about style, outfits, colors, or fashion trends. I can give you specific outfit recommendations based on your preferences. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "ai-style-recommendations",
        {
          body: {
            action: "chat",
            formData: {
              message: inputMessage,
              ...userProfile,
            },
          },
        }
      );

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
        isRecommendation: data.isRecommendation,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If this is a recommendation and we have a callback, trigger it
      if (data.isRecommendation && onRecommendation) {
        onRecommendation(data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What should I wear for a casual day out?",
    "How can I style this outfit for work?",
    "What colors look good together?",
    "Give me a complete outfit recommendation",
    "What's trending in fashion right now?",
  ];

  // Markdown formatting helper
  const formatMarkdown = (text: string) => {
    let formatted = text;

    // Handle line breaks first
    formatted = formatted.replace(/\n/g, "<br>");

    // Handle bullet points - be more specific
    formatted = formatted.replace(
      /^\s*\*\s+(.+)$/gm,
      '<div style="margin-left: 16px; margin-bottom: 8px;">• $1</div>'
    );
    formatted = formatted.replace(
      /(<br>)\s*\*\s+(.+)/g,
      '$1<div style="margin-left: 16px; margin-bottom: 8px;">• $2</div>'
    );

    // Handle bold text - process longer patterns first to avoid conflicts
    formatted = formatted.replace(/\*{4}([^*]+)\*{4}/g, "<strong>$1</strong>");
    formatted = formatted.replace(
      /\*{3}([^*]+)\*{3}/g,
      "<strong><em>$1</em></strong>"
    );
    formatted = formatted.replace(/\*{2}([^*]+)\*{2}/g, "<strong>$1</strong>");

    return formatted;
  };

  return (
    <Card className="h-[600px] flex flex-col overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Style Expert - Ask Me Anything!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 min-h-0 overflow-hidden">
        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex-shrink-0">
            <p className="text-sm font-medium mb-2">Try asking me:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div
          className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
          style={{ maxHeight: "calc(100%-80px)" }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-2 max-w-[85%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-blue-500" : "bg-purple-500"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 break-words ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : message.isRecommendation
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 border border-purple-200"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.isRecommendation && (
                    <div className="flex items-center gap-1 mb-2">
                      <Sparkles className="h-3 w-3 text-purple-500" />
                      <span className="text-xs font-medium text-purple-600">
                        Style Recommendation
                      </span>
                    </div>
                  )}
                  <div
                    className="text-sm whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(message.content),
                    }}
                  />
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about style, outfits, colors, or request specific recommendations..."
            className="resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
            className="px-3 bg-purple-500 hover:bg-purple-600"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;
