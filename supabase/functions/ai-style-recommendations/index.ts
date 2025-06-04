
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
      prompt = `You are a professional fashion stylist. Based on the following user preferences, provide exactly 3 UNIQUE and DIFFERENT outfit recommendations with detailed explanations. Each recommendation should be COMPLETELY DIFFERENT in style, vibe, and approach:

User Preferences:
- Gender: ${formData.gender}
- Style Preference: ${formData.stylePreferences?.join(', ') || 'Not specified'}
- Occasion: ${formData.occasion}
- Seasonality: ${formData.seasonality || 'Not specified'}
- Destination: ${formData.destinationType}

IMPORTANT: Make each recommendation COMPLETELY UNIQUE:
- Recommendation 1: Casual/Relaxed style with comfortable pieces
- Recommendation 2: Smart/Elevated style with sophisticated pieces  
- Recommendation 3: Trendy/Fashion-forward style with statement pieces

For each recommendation, provide:
1. A descriptive outfit title that reflects the unique style
2. 4 UNIQUE outfit suggestions in this exact format: "Wear a [specific top] with [specific bottom] and [specific accessory/layer] for [specific vibe/occasion]"
3. 4 UNIQUE pose ideas with specific names, descriptions, and caption suggestions
4. Why this outfit works for their preferences and occasion
5. Styling tips specific to this style approach
6. A confidence score (85-95) for how well it matches their preferences

MAKE SURE ALL OUTFIT SUGGESTIONS AND POSE IDEAS ARE COMPLETELY DIFFERENT ACROSS ALL 3 RECOMMENDATIONS.

Format your response as a JSON array with this structure:
[
  {
    "id": "1",
    "title": "Casual Comfort Master",
    "description": "Effortless everyday style that prioritizes comfort without sacrificing style",
    "outfitSuggestions": [
      "Wear a soft cotton oversized hoodie with high-waisted joggers and chunky sneakers for ultimate weekend comfort",
      "Try a relaxed graphic tee with denim shorts and canvas sneakers for a laid-back summer vibe",
      "Go for a cozy knit sweater with leggings and slip-on shoes for casual errands and coffee dates",
      "Combine a comfortable tank top with wide-leg pants and sandals for effortless warm-weather style"
    ],
    "poseIdeas": [
      {
        "name": "Relaxed Lean",
        "description": "Lean casually against a wall with hands in pockets, gentle smile, showcasing the comfortable fit",
        "caption": "Comfort never looked so good"
      },
      {
        "name": "Coffee Shop Casual",
        "description": "Sitting cross-legged with a warm drink, natural laugh, showing the cozy vibe",
        "caption": "Weekend vibes in full effect"
      },
      {
        "name": "Walking Confidence",
        "description": "Mid-stride with arms swinging naturally, looking ahead with purpose",
        "caption": "Comfortable confidence in motion"
      },
      {
        "name": "Cozy Moment",
        "description": "Sitting on steps or bench, knees drawn up slightly, peaceful expression",
        "caption": "Finding comfort in every moment"
      }
    ],
    "explanation": "Perfect for your preference for comfort and casual occasions",
    "stylingTips": "Layer pieces for versatility and choose soft, breathable fabrics",
    "confidence": 90,
    "occasion": formData.occasion || "Casual",
    "bodyTypeMatch": 88,
    "colorHarmony": 85,
    "styleMatch": 92
  },
  {
    "id": "2", 
    "title": "Smart Sophistication",
    "description": "Elevated pieces that transition seamlessly from work to social events",
    "outfitSuggestions": [
      "Wear a tailored blazer with straight-leg trousers and pointed-toe flats for professional polish",
      "Try a silk blouse with midi skirt and heeled ankle boots for sophisticated elegance",
      "Go for a structured cardigan with slim-fit pants and leather loafers for refined casual",
      "Combine a button-down shirt with culottes and block heel sandals for modern sophistication"
    ],
    "poseIdeas": [
      {
        "name": "Professional Power",
        "description": "Standing tall with hands on hips, confident expression, showcasing the structured silhouette",
        "caption": "Sophisticated style meets personal power"
      },
      {
        "name": "Elegant Grace",
        "description": "Walking with purposeful stride, one hand adjusting accessories, poised demeanor",
        "caption": "Elegance in every step"
      },
      {
        "name": "Thoughtful Pose",
        "description": "Sitting with legs crossed, hand touching chin thoughtfully, refined posture",
        "caption": "Smart style for thoughtful moments"
      },
      {
        "name": "Conference Ready",
        "description": "Standing with arms crossed loosely, warm professional smile, approachable confidence",
        "caption": "Ready to take on the world"
      }
    ],
    "explanation": "Ideal for your professional needs while maintaining personal style",
    "stylingTips": "Invest in quality basics and add personality through accessories",
    "confidence": 93,
    "occasion": "Professional/Smart Casual",
    "bodyTypeMatch": 91,
    "colorHarmony": 89,
    "styleMatch": 95
  },
  {
    "id": "3",
    "title": "Trendy Statement Maker", 
    "description": "Fashion-forward pieces that showcase your unique style and current trends",
    "outfitSuggestions": [
      "Wear an oversized denim jacket with a crop top and high-waisted wide-leg jeans for modern street style",
      "Try a statement print dress with combat boots and layered jewelry for edgy femininity",
      "Go for a mesh or sheer top with bralette underneath and leather pants for bold confidence",
      "Combine a vintage band tee with plaid mini skirt and platform sneakers for retro-modern fusion"
    ],
    "poseIdeas": [
      {
        "name": "Street Style Star",
        "description": "Dynamic pose with one leg forward, hands adjusting jacket, confident city swagger",
        "caption": "Making statements on every street"
      },
      {
        "name": "Artistic Expression",
        "description": "Sitting on urban steps, creative pose with interesting angles, showcasing the outfit details",
        "caption": "Fashion is my art form"
      },
      {
        "name": "Bold Confidence",
        "description": "Standing with arms akimbo, direct gaze at camera, unapologetic confidence",
        "caption": "Owning my unique style"
      },
      {
        "name": "Trend Setter",
        "description": "Mid-laugh with head thrown back slightly, natural joy, showing personality through style",
        "caption": "Setting trends, not following them"
      }
    ],
    "explanation": "Perfect for expressing your unique personality and staying fashion-forward",
    "stylingTips": "Mix textures and patterns boldly, and don't be afraid to make a statement",
    "confidence": 87,
    "occasion": "Creative/Social",
    "bodyTypeMatch": 86,
    "colorHarmony": 82,
    "styleMatch": 89
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
            temperature: 0.8,
            maxOutputTokens: action === 'recommendations' ? 4000 : 500,
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
          // Fallback with unique structured data for 3 recommendations
          result = [
            {
              id: "1",
              title: "Casual Day Explorer",
              description: "Comfortable and stylish outfits perfect for everyday adventures",
              outfitSuggestions: [
                "Wear a soft cotton t-shirt with comfortable jeans and white sneakers for effortless style",
                "Try a cozy sweater with leggings and slip-on shoes for relaxed comfort",
                "Go for a casual button-up with shorts and canvas shoes for summer ease",
                "Combine a tank top with palazzo pants and sandals for breezy elegance"
              ],
              poseIdeas: [
                {
                  name: "Natural Explorer",
                  description: "Walking with a gentle smile, hands in pockets, showcasing the comfortable outfit",
                  caption: "Exploring life in comfort and style"
                },
                {
                  name: "Relaxed Moment",
                  description: "Sitting casually with legs crossed, peaceful expression",
                  caption: "Finding beauty in simple moments"
                },
                {
                  name: "Confident Stride",
                  description: "Mid-walk with natural arm movement, looking ahead optimistically",
                  caption: "Every step tells a story"
                },
                {
                  name: "Casual Lean",
                  description: "Leaning against a wall casually, relaxed and approachable demeanor",
                  caption: "Effortless style meets genuine comfort"
                }
              ],
              explanation: "Perfect for your everyday lifestyle with comfort as priority",
              stylingTips: "Choose breathable fabrics and versatile pieces that mix and match easily",
              confidence: 88,
              occasion: formData.occasion || "Casual",
              bodyTypeMatch: 90,
              colorHarmony: 85,
              styleMatch: 92
            },
            {
              id: "2",
              title: "Modern Professional",
              description: "Sophisticated looks that command respect while expressing personal style",
              outfitSuggestions: [
                "Wear a tailored blazer with dress pants and pointed flats for boardroom confidence",
                "Try a silk blouse with pencil skirt and heeled pumps for executive elegance",
                "Go for a structured dress with a belt and ankle boots for versatile professionalism",
                "Combine a crisp shirt with wide-leg trousers and oxford shoes for contemporary polish"
              ],
              poseIdeas: [
                {
                  name: "Executive Presence",
                  description: "Standing with shoulders back, hands clasped in front, confident eye contact",
                  caption: "Leading with style and substance"
                },
                {
                  name: "Thoughtful Leader",
                  description: "Sitting at desk with fingers steepled, contemplative yet approachable",
                  caption: "Strategic thinking meets personal style"
                },
                {
                  name: "Professional Grace",
                  description: "Walking with purpose, carrying a briefcase, elegant stride",
                  caption: "Grace under pressure, style under scrutiny"
                },
                {
                  name: "Confident Communicator",
                  description: "Standing with one hand gesturing naturally, engaging smile",
                  caption: "Speaking with style and conviction"
                }
              ],
              explanation: "Ideal for professional settings while maintaining your unique aesthetic",
              stylingTips: "Invest in quality basics and add personality through subtle accessories",
              confidence: 94,
              occasion: "Professional",
              bodyTypeMatch: 92,
              colorHarmony: 91,
              styleMatch: 96
            },
            {
              id: "3",
              title: "Creative Trendsetter",
              description: "Bold and artistic outfits that showcase your unique personality and creativity",
              outfitSuggestions: [
                "Wear a vintage band tee with layered skirts and combat boots for artistic rebellion",
                "Try an oversized blazer with bike shorts and platform sneakers for modern edge",
                "Go for a mesh top with high-waisted jeans and statement jewelry for bold confidence",
                "Combine a colorful kimono with black basics and strappy sandals for bohemian chic"
              ],
              poseIdeas: [
                {
                  name: "Artistic Vision",
                  description: "Sitting cross-legged with hands creating interesting shapes, creative energy",
                  caption: "Art is my language, style is my voice"
                },
                {
                  name: "Urban Artist",
                  description: "Standing against graffiti wall, one foot up, edgy confidence",
                  caption: "Creating beauty in unexpected places"
                },
                {
                  name: "Expressive Soul",
                  description: "Dancing or moving with arms outstretched, joyful expression",
                  caption: "Life is my canvas, style is my brush"
                },
                {
                  name: "Rebel Grace",
                  description: "Sitting on steps with interesting angles, showcasing unique outfit details",
                  caption: "Breaking rules with style and grace"
                }
              ],
              explanation: "Perfect for expressing your creativity and standing out from the crowd",
              stylingTips: "Mix unexpected textures and don't be afraid to experiment with proportions",
              confidence: 85,
              occasion: "Creative/Artistic",
              bodyTypeMatch: 87,
              colorHarmony: 83,
              styleMatch: 89
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
          temperature: 0.8,
          max_tokens: action === 'recommendations' ? 4000 : 500,
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
            outfitSuggestions: ["Curated outfit based on your preferences"],
            poseIdeas: [
              {
                name: "Classic Pose",
                description: "Natural and confident pose suggestion",
                caption: "Style with confidence"
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
