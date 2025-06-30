
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
    const { conversationId } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get all messages from the conversation
    const { data: messages } = await supabaseClient
      .from('messages')
      .select('content, role')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (!messages || messages.length < 4) {
      return new Response(JSON.stringify({ 
        error: 'Not enough conversation data for pattern analysis' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare conversation text for analysis
    const conversationText = messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n\n');

    // Call OpenAI for pattern analysis
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
            content: `You are a psychological pattern analyst. Analyze the following conversation and identify:

1. Recurring themes and topics
2. Emotional patterns
3. Behavioral patterns
4. Thinking patterns
5. Relationship patterns
6. Areas of concern or growth

Provide your analysis in the following JSON format:
{
  "patterns": {
    "emotional": ["pattern1", "pattern2"],
    "behavioral": ["pattern1", "pattern2"],
    "thinking": ["pattern1", "pattern2"],
    "relationship": ["pattern1", "pattern2"],
    "themes": ["theme1", "theme2"]
  },
  "insights": "Detailed insights about the user's patterns and what they reveal",
  "recommendations": "Specific, actionable recommendations for growth and awareness"
}

Be empathetic, non-judgmental, and focus on growth opportunities.`
          },
          {
            role: 'user',
            content: `Please analyze this conversation for psychological patterns:\n\n${conversationText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    const aiResponse = await response.json();
    const analysisText = aiResponse.choices[0].message.content;
    
    // Try to parse JSON from the response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch {
      // If JSON parsing fails, create a structured response
      analysis = {
        patterns: {
          emotional: ["Complex emotional responses detected"],
          behavioral: ["Various behavioral patterns observed"],
          thinking: ["Unique thinking patterns identified"],
          relationship: ["Interpersonal dynamics noted"],
          themes: ["Multiple themes present in conversation"]
        },
        insights: analysisText.slice(0, 500) + "...",
        recommendations: "Continue exploring these patterns through self-reflection and awareness."
      };
    }

    // Save pattern analysis to database
    await supabaseClient.from('pattern_analyses').insert({
      conversation_id: conversationId,
      patterns: analysis.patterns,
      insights: analysis.insights,
      recommendations: analysis.recommendations
    });

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-patterns function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
