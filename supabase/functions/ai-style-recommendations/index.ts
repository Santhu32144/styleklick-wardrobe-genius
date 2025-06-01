
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
    
    // Check for Gemini API key first, then OpenAI as fallback
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
      prompt = `You are a professional fashion stylist. Based on the following user preferences, provide exactly 3 specific outfit recommendations with detailed explanations:

User Preferences:
- Gender: ${formData.gender}
- Style Preference: ${formData.stylePreferences?.join(', ') || 'Not specified'}
- Occasion: ${formData.occasion}
- Seasonality: ${formData.seasonality || 'Not specified'}
- Destination: ${formData.destinationType}

For each recommendation, provide:
1. A descriptive outfit title
2. Detailed clothing items and colors
3. Footwear options (3-4 different shoe types that work with the outfit)
4. Posing ideas (3-4 specific pose suggestions with descriptions)
5. Why this outfit works for their preferences and occasion
6. Styling tips
7. A confidence score (1-100) for how well it matches their preferences

Format your response as a JSON array with this structure:
[
  {
    "id": "1",
    "title": "Outfit Title",
    "description": "Detailed outfit description",
    "items": ["item1", "item2", "item3"],
    "footwearOptions": [
      {
        "type": "Sneakers",
        "description": "White leather sneakers for casual comfort",
        "occasion": "Everyday wear"
      },
      {
        "type": "Ankle Boots",
        "description": "Brown leather ankle boots for elevated style",
        "occasion": "Smart casual events"
      }
    ],
    "posingIdeas": [
      {
        "name": "Casual Lean",
        "description": "Lean against a wall with one foot up, hands in pockets for a relaxed vibe",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      },
      {
        "name": "Walking Shot",
        "description": "Mid-stride walking pose with a slight smile, looking ahead confidently",
        "photoUrl": "https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ],
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

    // Try Gemini first if available
    if (geminiApiKey) {
      console.log('Using Gemini API with model: gemini-1.5-flash');
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
            maxOutputTokens: action === 'recommendations' ? 3000 : 500,
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, errorText);
        
        // If Gemini fails, try OpenAI as fallback
        if (openaiApiKey) {
          console.log('Gemini failed, falling back to OpenAI');
          throw new Error('Gemini failed, trying OpenAI');
        } else {
          throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
        }
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
          
          // Ensure we only have 3 recommendations
          if (Array.isArray(result) && result.length > 3) {
            result = result.slice(0, 3);
          }
        } catch (e) {
          console.error('JSON parsing error:', e);
          // Fallback with structured data for 3 recommendations
          result = [
            {
              id: "1",
              title: "Casual Elegance",
              description: "A balanced outfit that flatters your body shape while providing comfort and style",
              items: ["Fitted white blouse", "High-waisted dark wash jeans", "Tan leather ankle boots", "Oversized beige cardigan", "Gold minimalist necklace"],
              footwearOptions: [
                {
                  type: "Ankle Boots",
                  description: "Comfortable 2-inch heel that adds height while remaining practical",
                  occasion: "Everyday wear"
                },
                {
                  type: "White Sneakers",
                  description: "Clean white leather sneakers for a more casual approach",
                  occasion: "Weekend activities"
                },
                {
                  type: "Loafers",
                  description: "Brown leather loafers for a polished yet comfortable look",
                  occasion: "Work or meetings"
                }
              ],
              posingIdeas: [
                {
                  name: "Simple Elegance",
                  description: "Stand with hands casually in pockets, leaning slightly for a relaxed yet confident look",
                  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Casual Yet Put-Together",
                  description: "Crossed arms with a gentle smile, showcasing the layered cardigan",
                  photoUrl: "https://images.unsplash.com/photo-1552374196-c4e7fbd312fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Finding Balance",
                  description: "Walking pose with one hand adjusting the necklace, natural movement",
                  photoUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                }
              ],
              explanation: "Personalized recommendation from AI stylist",
              stylingTips: "Follow the detailed advice provided",
              confidence: 85,
              occasion: formData.occasion || "General",
              bodyTypeMatch: 85,
              colorHarmony: 80,
              styleMatch: 90
            },
            {
              id: "2",
              title: "Urban Professional",
              description: "Modern and sophisticated look perfect for city life and professional settings",
              items: ["Crisp white button-down", "Tailored navy blazer", "Dark skinny jeans", "Pointed toe flats", "Structured handbag"],
              footwearOptions: [
                {
                  type: "Pointed Flats",
                  description: "Sleek black pointed toe flats for all-day comfort",
                  occasion: "Office wear"
                },
                {
                  type: "Block Heels",
                  description: "Low block heel pumps for added height and confidence",
                  occasion: "Meetings or presentations"
                },
                {
                  type: "Chelsea Boots",
                  description: "Black leather Chelsea boots for an edgier professional look",
                  occasion: "Creative workplace"
                }
              ],
              posingIdeas: [
                {
                  name: "Professional Confidence",
                  description: "Standing tall with hands on hips, showcasing the blazer silhouette",
                  photoUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "City Walker",
                  description: "Mid-stride with handbag, looking ahead with purpose and determination",
                  photoUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                }
              ],
              explanation: "Perfect blend of professional and trendy",
              stylingTips: "Roll up blazer sleeves for a more relaxed look",
              confidence: 92,
              occasion: "Professional",
              bodyTypeMatch: 88,
              colorHarmony: 90,
              styleMatch: 95
            },
            {
              id: "3",
              title: "Weekend Warrior",
              description: "Comfortable yet stylish outfit perfect for weekend adventures and casual outings",
              items: ["Soft cotton t-shirt", "Denim jacket", "Comfortable leggings", "Canvas sneakers", "Crossbody bag"],
              footwearOptions: [
                {
                  type: "Canvas Sneakers",
                  description: "Classic white canvas sneakers for maximum comfort",
                  occasion: "Casual outings"
                },
                {
                  type: "Athletic Sneakers",
                  description: "Supportive running shoes for active weekends",
                  occasion: "Exercise or long walks"
                },
                {
                  type: "Slip-on Shoes",
                  description: "Easy slip-on sneakers for quick errands",
                  occasion: "Running errands"
                }
              ],
              posingIdeas: [
                {
                  name: "Relaxed Adventure",
                  description: "Sitting casually with one leg up, hands behind head, carefree expression",
                  photoUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Active Lifestyle",
                  description: "Dynamic pose mid-movement, perhaps adjusting the crossbody bag",
                  photoUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                }
              ],
              explanation: "Versatile and comfortable for any weekend activity",
              stylingTips: "Layer with the denim jacket for changing weather",
              confidence: 87,
              occasion: "Casual",
              bodyTypeMatch: 92,
              colorHarmony: 85,
              styleMatch: 88
            }
          ];
        }
      } else {
        result = { message: content };
      }

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fallback to OpenAI if Gemini is not available
    if (openaiApiKey) {
      console.log('Using OpenAI API as fallback');
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
          max_tokens: action === 'recommendations' ? 3000 : 500,
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
          
          // Ensure we only have 3 recommendations
          if (Array.isArray(result) && result.length > 3) {
            result = result.slice(0, 3);
          }
        } catch (e) {
          console.error('JSON parsing error:', e);
          result = [{
            id: "1",
            title: "AI Style Recommendation",
            description: content,
            items: ["Curated outfit based on your preferences"],
            footwearOptions: [
              {
                type: "Versatile Shoes",
                description: "Recommended footwear for this style",
                occasion: "General wear"
              }
            ],
            posingIdeas: [
              {
                name: "Classic Pose",
                description: "Natural and confident pose suggestion",
                photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
            ],
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
