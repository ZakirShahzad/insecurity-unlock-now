
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageSquare, Plus, Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    setConversations(data || []);
    
    // Auto-select the most recent conversation if none is selected
    if (data && data.length > 0 && !currentConversationId) {
      setCurrentConversationId(data[0].id);
    }
  };

  const createNewConversation = async () => {
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to start a conversation.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: `Conversation ${conversations.length + 1}`
        })
        .select()
        .single();

      if (error) throw error;

      await loadConversations();
      setCurrentConversationId(data.id);
      
      toast({
        title: "New conversation started! 💬",
        description: "You can now share your thoughts with MindMirror AI.",
      });
      
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create new conversation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mind-blue-50 via-white to-mind-purple-50">
      {/* Header */}
      <header className="border-b border-mind-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-mind-blue-500 to-mind-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 bg-clip-text text-transparent">
              MindMirror
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-mind-blue-200 text-mind-blue-700 hover:bg-mind-blue-50">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="border-mind-purple-200 text-mind-purple-700 hover:bg-mind-purple-50">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-mind-blue-500" />
                    Conversations
                  </span>
                  <Button
                    onClick={createNewConversation}
                    disabled={isLoading}
                    size="sm"
                    className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {conversations.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No conversations yet.<br />
                      Start your first chat!
                    </p>
                  ) : (
                    conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setCurrentConversationId(conversation.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentConversationId === conversation.id
                            ? 'bg-gradient-to-r from-mind-blue-100 to-mind-purple-100 border border-mind-purple-200'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <p className="font-medium text-gray-800 truncate">{conversation.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(conversation.created_at).toLocaleDateString()}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {currentConversationId ? (
              <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
                <ChatInterface conversationId={currentConversationId} />
              </Card>
            ) : (
              <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Brain className="h-16 w-16 text-mind-purple-400 mb-6" />
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                    Welcome to MindMirror AI
                  </h2>
                  <p className="text-gray-600 text-center mb-6 max-w-md">
                    Start a conversation with our AI assistant to explore your thoughts, patterns, and gain psychological insights.
                  </p>
                  <Button
                    onClick={createNewConversation}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Start Your First Conversation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
