import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Loader2, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface ChatInterfaceProps {
  conversationId: string;
}

export const ChatInterface = ({ conversationId }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    // Type assertion to ensure role is properly typed
    const typedMessages = (data || []).map(msg => ({
      ...msg,
      role: msg.role as 'user' | 'assistant'
    }));

    setMessages(typedMessages);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: {
          message: userMessage,
          conversationId: conversationId
        }
      });

      if (error) throw error;

      // Reload messages to get the latest
      await loadMessages();
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const analyzePatterns = async () => {
    if (messages.length < 4) {
      toast({
        title: "Not enough data",
        description: "Please have a longer conversation before analyzing patterns.",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-patterns', {
        body: { conversationId }
      });

      if (error) throw error;

      toast({
        title: "Pattern Analysis Complete! 🧠",
        description: "Your conversation patterns have been analyzed and saved to your insights.",
      });

      // You could navigate to insights page or show results here
      
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze patterns. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-mind-blue-200 bg-white/80 backdrop-blur-sm rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-mind-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">MindMirror AI Assistant</h2>
        </div>
        <Button
          onClick={analyzePatterns}
          disabled={isAnalyzing || messages.length < 4}
          variant="outline"
          size="sm"
          className="border-mind-purple-200 text-mind-purple-700 hover:bg-mind-purple-50"
        >
          {isAnalyzing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <BarChart3 className="h-4 w-4 mr-2" />
          )}
          Analyze Patterns
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-mind-blue-50/50 to-mind-purple-50/50">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-mind-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Welcome to MindMirror AI</h3>
            <p className="text-gray-600">I'm here to help you explore your thoughts, patterns, and insights. What's on your mind today?</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-gradient-to-r from-mind-blue-500 to-mind-purple-600 text-white' 
                : 'bg-white/80 border-mind-blue-200'
            }`}>
              <CardContent className="p-3">
                {message.role === 'assistant' && (
                  <Badge variant="outline" className="mb-2 text-xs border-mind-purple-200 text-mind-purple-700">
                    AI Assistant
                  </Badge>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-white/80 border-mind-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-mind-purple-600" />
                  <span className="text-sm text-gray-600">MindMirror is thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-mind-blue-200 bg-white/80 backdrop-blur-sm rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            disabled={isLoading}
            className="flex-1 border-mind-blue-200 focus:border-mind-purple-400"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
