
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, action = 'recommendations' } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let prompt = '';
    
    if (action === 'recommendations') {
      prompt = `You are a professional fashion stylist. Based on the following user preferences, provide 5 specific outfit recommendations with detailed explanations:

User Preferences:
- Gender: ${formData.gender}
- Body Type: ${formData.bodyType}
- Style Preference: ${formData.stylePreference}
- Occasion: ${formData.occasion}
- Destination: ${formData.destination}
- Budget: ${formData.budget}
- Color Preferences: ${formData.colorPreferences?.join(', ') || 'No specific preference'}

For each recommendation, provide:
1. A descriptive outfit title
2. Detailed clothing items and colors
3. Why this outfit works for their body type and occasion
4. Styling tips
5. A confidence score (1-100) for how well it matches their preferences

Format your response as a JSON array with this structure:
[
  {
    "id": "1",
    "title": "Outfit Title",
    "description": "Detailed outfit description",
    "items": ["item1", "item2", "item3"],
    "explanation": "Why this works for the user",
    "stylingTips": "Additional styling advice",
    "confidence": 95,
    "occasion": "appropriate occasion",
    "bodyTypeMatch": 90,
    "colorHarmony": 85,
    "styleMatch": 95
  }
]`;
    } else if (action === 'chat') {
      prompt = `You are a professional fashion stylist and personal style consultant. The user is asking: "${formData.message}"

Based on their style profile:
- Gender: ${formData.gender || 'Not specified'}
- Body Type: ${formData.bodyType || 'Not specified'}
- Style Preference: ${formData.stylePreference || 'Not specified'}
- Occasion: ${formData.occasion || 'Not specified'}

Provide helpful, personalized fashion advice. Be conversational, encouraging, and specific with your recommendations.`;
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
          { 
            role: 'system', 
            content: 'You are a professional fashion stylist with expertise in personal styling, body types, color theory, and current fashion trends.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: action === 'recommendations' ? 2000 : 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    let result;
    if (action === 'recommendations') {
      try {
        result = JSON.parse(content);
      } catch (e) {
        // If JSON parsing fails, create a structured response
        result = [{
          id: "1",
          title: "AI Style Recommendation",
          description: content,
          items: ["Curated outfit based on your preferences"],
          explanation: "Personalized recommendation from AI stylist",
          stylingTips: "Follow the detailed advice provided",
          confidence: 85,
          occasion: formData.occasion || "General",
          bodyTypeMatch: 85,
          colorHarmony: 80,
          styleMatch: 90
        }];
      }
    } else {
      result = { message: content };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
