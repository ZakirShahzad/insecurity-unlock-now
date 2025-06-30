
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get conversation history
    const { data: messages } = await supabaseClient
      .from('messages')
      .select('content, role')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    // Build conversation context
    const conversationHistory = messages?.map(msg => ({
      role: msg.role,
      content: msg.content
    })) || [];

    // Add the new user message
    conversationHistory.push({ role: 'user', content: message });

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are MindMirror AI, a psychological insight assistant. Your role is to:
            1. Listen actively and empathetically to the user
            2. Ask thoughtful follow-up questions to understand patterns
            3. Help users explore their thoughts, behaviors, and emotions
            4. Identify recurring themes in their conversations
            5. Provide gentle insights without being prescriptive
            6. Encourage self-reflection and awareness
            
            Be warm, non-judgmental, and supportive. Focus on helping users discover their own patterns rather than diagnosing them.`
          },
          ...conversationHistory
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const aiResponse = await response.json();
    const assistantMessage = aiResponse.choices[0].message.content;

    // Save both messages to database
    await supabaseClient.from('messages').insert([
      {
        conversation_id: conversationId,
        content: message,
        role: 'user'
      },
      {
        conversation_id: conversationId,
        content: assistantMessage,
        role: 'assistant'
      }
    ]);

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-agent function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
