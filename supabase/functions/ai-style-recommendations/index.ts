
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
    
    // Check for both possible API keys
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

    console.log('Available API keys:', { 
      hasGemini: !!geminiApiKey, 
      hasOpenAI: !!openaiApiKey 
    });

    if (!geminiApiKey && !openaiApiKey) {
      throw new Error('No API key configured. Please set either GEMINI_API_KEY or OPENAI_API_KEY');
    }

    let prompt = '';
    
    if (action === 'recommendations') {
      prompt = `You are a professional fashion stylist. Based on the following user preferences, provide 5 specific outfit recommendations with detailed explanations:

User Preferences:
- Gender: ${formData.gender}
- Style Preference: ${formData.stylePreferences?.join(', ') || 'Not specified'}
- Occasion: ${formData.occasion}
- Seasonality: ${formData.seasonality || 'Not specified'}
- Destination: ${formData.destinationType}

For each recommendation, provide:
1. A descriptive outfit title
2. Detailed clothing items and colors
3. Why this outfit works for their preferences and occasion
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
]

Please return only valid JSON without any markdown formatting or additional text.`;
    } else if (action === 'chat') {
      prompt = `You are a professional fashion stylist and personal style consultant. The user is asking: "${formData.message}"

Based on their style profile:
- Gender: ${formData.gender || 'Not specified'}
- Style Preference: ${formData.stylePreferences?.join(', ') || 'Not specified'}
- Occasion: ${formData.occasion || 'Not specified'}

Provide helpful, personalized fashion advice. Be conversational, encouraging, and specific with your recommendations.`;
    }

    let response;
    let data;

    // Try OpenAI first if available
    if (openaiApiKey) {
      console.log('Using OpenAI API');
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: action === 'recommendations' ? 2000 : 500,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenAI API');
      }

      let result;
      if (action === 'recommendations') {
        try {
          let cleanContent = content.trim();
          if (cleanContent.startsWith('```json')) {
            cleanContent = cleanContent.replace(/```json\n?/, '').replace(/\n?```$/, '');
          } else if (cleanContent.startsWith('```')) {
            cleanContent = cleanContent.replace(/```\n?/, '').replace(/\n?```$/, '');
          }
          
          result = JSON.parse(cleanContent);
        } catch (e) {
          console.error('JSON parsing error:', e);
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
    }

    // Fallback to Gemini if OpenAI is not available
    if (geminiApiKey) {
      console.log('Using Gemini API');
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: action === 'recommendations' ? 2000 : 500,
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error('No content received from Gemini API');
      }

      let result;
      if (action === 'recommendations') {
        try {
          let cleanContent = content.trim();
          if (cleanContent.startsWith('```json')) {
            cleanContent = cleanContent.replace(/```json\n?/, '').replace(/\n?```$/, '');
          } else if (cleanContent.startsWith('```')) {
            cleanContent = cleanContent.replace(/```\n?/, '').replace(/\n?```$/, '');
          }
          
          result = JSON.parse(cleanContent);
        } catch (e) {
          console.error('JSON parsing error:', e);
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
    }

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
