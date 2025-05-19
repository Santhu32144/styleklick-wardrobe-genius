
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    // Build system message based on the request type
    let systemMessage = '';
    
    switch (type) {
      case 'style-suggestion':
        systemMessage = `You are a professional stylist with expertise in fashion, clothing coordination, and accessories. 
          Provide specific outfit suggestions with colors, patterns, materials, and accessories. 
          Be detailed but concise, focusing on practical advice tailored to the user's specified occasion, style preferences, and destination.
          Format your response as a JSON object with three sections: 
          1) outfitSuggestion (main outfit description), 
          2) accessories (2-3 accessory ideas), 
          3) colorPalette (3-5 colors that work well together)`;
        break;
      case 'caption':
        systemMessage = `You are a social media content creator specializing in fashion. 
          Create a short, catchy Instagram-style caption (maximum 200 characters) for the outfit described.
          Make it trendy, engaging and include 3-5 relevant hashtags at the end. 
          The caption should be concise but stylish and reflect the outfit's vibe.`;
        break;
      case 'quick-response':
        systemMessage = `You are a helpful style assistant providing quick fashion advice and tips. 
          Keep responses under 150 words, be specific and practical, and offer actionable advice.
          Focus on being helpful, friendly, and direct with your fashion guidance.`;
        break;
      default:
        systemMessage = 'You are a helpful fashion assistant.';
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Try to parse JSON for style suggestions, but don't fail if it's not valid JSON
    let result = content;
    if (type === 'style-suggestion') {
      try {
        // Extract JSON if wrapped in markdown code blocks
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                           content.match(/```\n([\s\S]*?)\n```/);
        
        if (jsonMatch && jsonMatch[1]) {
          result = JSON.parse(jsonMatch[1]);
        } else {
          // Try parsing the whole response as JSON
          result = JSON.parse(content);
        }
      } catch (e) {
        console.log('Failed to parse JSON, returning raw text', e);
        result = { 
          outfitSuggestion: content,
          accessories: [],
          colorPalette: []
        };
      }
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in openai-stylist function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
