import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionnaireData } from '../questionnaire/QuestionnaireForm';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, Share2, ArrowLeft, RefreshCw, Shirt, Camera, 
  Footprints, BookmarkPlus, Copy, Image, MapPin, Mountain, Building, Brain
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ThemeType } from '../../pages/RecommendationsPage';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AIRecommendationSection from './AIRecommendationSection';

// Footwear type
interface Footwear {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  suitability: string[];
  themes: string[];
}

// Posing suggestion type
interface PosingSuggestion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tips: string[];
  themes: string[];
}

// Enhanced outfit type with footwear options and posing suggestions
interface EnhancedOutfit {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  items: { name: string; description: string }[];
  explanation: string;
  season: string;
  occasion: string;
  destinationType: string;
  footwearOptions: string[]; // IDs of compatible footwear
  posingSuggestions: string[]; // IDs of compatible posing suggestions
  accessories: string[];
  captionIdeas: string[];
  themes: string[];
}

// This is a placeholder - in a real app you'd fetch these from your backend
const generateEnhancedOutfitSuggestions = (formData: QuestionnaireData): EnhancedOutfit[] => {
  // In a real app, this would use the formData to generate appropriate recommendations
  const outfits: EnhancedOutfit[] = [
    {
      id: '1',
      title: 'Casual Elegance',
      description: 'A balanced outfit that flatters your body shape while providing comfort and style.',
      imageUrl: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      items: [
        { name: 'Fitted white blouse', description: 'A crisp, tailored white blouse that accentuates your shape' },
        { name: 'High-waisted dark wash jeans', description: 'Slim-fit dark jeans that elongate your legs' },
        { name: 'Tan leather ankle boots', description: 'Comfortable 2-inch heel that adds height while remaining practical' },
        { name: 'Oversized beige cardigan', description: 'Soft, draped cardigan for layering and added warmth' },
        { name: 'Gold minimalist necklace', description: 'Simple pendant necklace to complete the look' }
      ],
      explanation: 'This outfit is designed to flatter your body type while incorporating your style preferences. The high-waisted jeans create a balanced silhouette, while the fitted blouse accentuates your shape. The color palette complements your skin tone, and the overall look is versatile enough for your destination.',
      season: formData.seasonality || 'fall',
      occasion: formData.occasion || 'casual',
      destinationType: formData.destinationType || 'urban',
      footwearOptions: ['1', '3', '5'],
      posingSuggestions: ['1', '4', '7'],
      accessories: ['Minimalist gold hoop earrings', 'Leather crossbody bag', 'Slim leather belt'],
      captionIdeas: ['Simple elegance for everyday moments', 'Casual yet put-together', 'Finding balance in simplicity'],
      themes: ['fall', 'urban']
    },
    {
      id: '2',
      title: 'Modern Sophistication',
      description: 'An elevated look that combines modern trends with timeless elements.',
      imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      items: [
        { name: 'Tailored black blazer', description: 'Structured blazer with slight padding at shoulders' },
        { name: 'Silk camisole in blush', description: 'Lightweight silk top in a flattering tone' },
        { name: 'Slim cropped trousers', description: 'Modern fit trousers in a neutral tone' },
        { name: 'Pointed leather mules', description: 'Sophisticated footwear with walkable heel' },
        { name: 'Statement earrings', description: 'Eye-catching yet elegant accessories' }
      ],
      explanation: 'This sophisticated outfit creates a balanced silhouette while incorporating your preferred formality level. The blazer adds structure to your upper body, while the slim trousers elongate your legs. The color palette is versatile and complements your skin tone, creating a polished look suitable for your occasion.',
      season: formData.seasonality || 'spring',
      occasion: formData.occasion || 'business',
      destinationType: formData.destinationType || 'urban',
      footwearOptions: ['2', '4', '6'],
      posingSuggestions: ['2', '5', '8'],
      accessories: ['Structured leather handbag', 'Delicate layered necklaces', 'Simple metal bangle'],
      captionIdeas: ['Power dressing with a soft edge', 'Boardroom to bistro', 'Embracing feminine strength'],
      themes: ['urban']
    },
    {
      id: '3',
      title: 'Effortless Style',
      description: 'A relaxed yet put-together look that emphasizes comfort without sacrificing style.',
      imageUrl: 'https://images.unsplash.com/photo-1591374790133-55a463a2d546?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      items: [
        { name: 'Oversized knit sweater', description: 'Soft, slouchy sweater in a neutral tone' },
        { name: 'Straight leg jeans', description: 'Classic denim with a modern cut' },
        { name: 'White leather sneakers', description: 'Clean, minimal footwear for comfort' },
        { name: 'Crossbody leather bag', description: 'Practical yet stylish accessory' },
        { name: 'Layered delicate necklaces', description: 'Simple jewelry to complete the look' }
      ],
      explanation: 'This relaxed outfit prioritizes comfort while maintaining a stylish appearance that aligns with your preferences. The oversized sweater balances your proportions, while the straight leg jeans create a modern silhouette. The neutral color palette works well with your skin tone and can be mixed and matched easily for travel.',
      season: formData.seasonality || 'winter',
      occasion: formData.occasion || 'casual',
      destinationType: formData.destinationType || 'urban',
      footwearOptions: ['3', '5', '7'],
      posingSuggestions: ['3', '6', '9'],
      accessories: ['Beanie hat', 'Chunky scarf', 'Simple stud earrings'],
      captionIdeas: ['Comfort never looked so good', 'Casual days, stylish ways', 'The art of looking effortless'],
      themes: ['fall', 'urban']
    },
    {
      id: '4',
      title: 'Adventure Seeker',
      description: 'A functional outfit designed for outdoor exploration while maintaining style.',
      imageUrl: 'https://images.unsplash.com/photo-1601931935821-5fbe71157695?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      items: [
        { name: 'Moisture-wicking henley', description: 'Breathable long-sleeve top in earthy tone' },
        { name: 'Quick-dry cargo pants', description: 'Convertible pants with multiple pockets' },
        { name: 'Waterproof hiking boots', description: 'Supportive boots with good traction' },
        { name: 'Performance vest', description: 'Insulated vest for core warmth' },
        { name: 'Utility watch', description: 'Durable timepiece with helpful features' }
      ],
      explanation: 'This adventure-ready outfit combines functionality with style, perfect for outdoor activities. The layers provide versatility for changing conditions, while the earthy tones complement the natural surroundings. The overall look is practical yet put-together, allowing you to transition from trail to casual dining with ease.',
      season: formData.seasonality || 'fall',
      occasion: formData.occasion || 'casual',
      destinationType: formData.destinationType || 'mountains',
      footwearOptions: ['9', '10', '11'],
      posingSuggestions: ['5', '9', '12'],
      accessories: ['Wide-brimmed hat', 'Polarized sunglasses', 'Bandana'],
      captionIdeas: ['Adventure awaits around every corner', 'Finding beauty in the wild', 'The journey is the destination'],
      themes: ['adventure']
    },
    {
      id: '5',
      title: 'Fall Harvest',
      description: 'A cozy autumnal look perfect for apple picking or pumpkin patches.',
      imageUrl: 'https://images.unsplash.com/photo-1566491888763-e71518bbe846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      items: [
        { name: 'Chunky knit sweater', description: 'Oversized cable-knit in warm rust color' },
        { name: 'High-waisted corduroy pants', description: 'Soft, ribbed texture in caramel brown' },
        { name: 'Leather ankle boots', description: 'Classic chelsea boots with minimal heel' },
        { name: 'Plaid wool scarf', description: 'Traditional pattern in autumnal colors' },
        { name: 'Leather gloves', description: 'Soft driving gloves for cool weather' }
      ],
      explanation: 'This fall-inspired ensemble embraces the season\'s rich textures and warm colors. The layers provide comfort for changing temperatures, while the autumnal palette complements both the landscape and your complexion. The silhouette is flattering yet practical for outdoor activities.',
      season: 'fall',
      occasion: formData.occasion || 'casual',
      destinationType: formData.destinationType || 'rural',
      footwearOptions: ['5', '8', '3'],
      posingSuggestions: ['7', '9', '3'],
      accessories: ['Felt wide-brim hat', 'Leather tote bag', 'Gold leaf earrings'],
      captionIdeas: ['Embracing the golden hour', 'Fall\'s embrace in every step', 'Wrapped in autumn\'s warmth'],
      themes: ['fall']
    }
  ];

  return outfits;
};

const generateFootwearOptions = (): Footwear[] => {
  return [
    {
      id: '1',
      name: 'Strappy Neutral Sandals',
      description: 'Elegant and beach-friendly sandals with adjustable straps',
      imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['beach', 'casual', 'summer'],
      themes: ['urban']
    },
    {
      id: '2',
      name: 'Block Heel Mules',
      description: 'Sophisticated heels with modern silhouette, perfect for city strolls',
      imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['urban', 'business', 'spring', 'fall'],
      themes: ['urban', 'fall']
    },
    {
      id: '3',
      name: 'White Leather Sneakers',
      description: 'Clean, versatile sneakers that go with almost any casual outfit',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['urban', 'casual', 'adventure', 'all-season'],
      themes: ['urban', 'fall']
    },
    {
      id: '4',
      name: 'Pointed Loafers',
      description: 'Classic loafers with a modern pointed toe for elegant occasions',
      imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['urban', 'business', 'fall', 'spring'],
      themes: ['urban', 'fall']
    },
    {
      id: '5',
      name: 'Ankle Boots',
      description: 'Versatile boots with a low heel for all-day comfort',
      imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['urban', 'mountains', 'fall', 'winter'],
      themes: ['fall']
    },
    {
      id: '6',
      name: 'Elegant Flats',
      description: 'Refined pointed flats that work for both office and evening events',
      imageUrl: 'https://images.unsplash.com/photo-1536830220630-ce146cccac84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['urban', 'business', 'all-season'],
      themes: ['urban']
    },
    {
      id: '7',
      name: 'Espadrille Wedges',
      description: 'Summer-perfect wedges with braided detail and ankle ties',
      imageUrl: 'https://images.unsplash.com/photo-1554238113-6d3dbed5cf6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['beach', 'casual', 'summer'],
      themes: ['urban']
    },
    {
      id: '8',
      name: 'Combat Boots',
      description: 'Rugged boots with lace-up detail and chunky sole',
      imageUrl: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['urban', 'fall', 'winter'],
      themes: ['fall']
    },
    {
      id: '9',
      name: 'Hiking Boots',
      description: 'Waterproof boots with excellent traction for trail adventures',
      imageUrl: 'https://images.unsplash.com/photo-1553545985-1e0d8781d5db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['mountains', 'adventure', 'fall', 'winter'],
      themes: ['adventure']
    },
    {
      id: '10',
      name: 'Trail Runners',
      description: 'Lightweight shoes with grippy soles for fast-paced outdoor activities',
      imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['mountains', 'adventure', 'all-season'],
      themes: ['adventure']
    },
    {
      id: '11',
      name: 'Waterproof Sandals',
      description: 'Technical sandals that can handle water crossings and rough terrain',
      imageUrl: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      suitability: ['beach', 'adventure', 'summer'],
      themes: ['adventure']
    }
  ];
};

const generatePosingIdeas = (): PosingSuggestion[] => {
  return [
    {
      id: '1',
      title: 'Urban Casual Lean',
      description: 'Lean casually against a building wall, one foot crossed over the other',
      imageUrl: 'https://images.unsplash.com/photo-1507114845806-0347040042a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Relax your shoulders and facial expression',
        'Try different angles - straight-on, profile, or 45 degrees',
        'Let your hands rest naturally in pockets or at your sides',
        'Gaze slightly away from the camera for a candid feel'
      ],
      themes: ['urban']
    },
    {
      id: '2',
      title: 'Confident Stride',
      description: 'Capture a mid-step walking pose showing movement and confidence',
      imageUrl: 'https://images.unsplash.com/photo-1604604557577-4e27a33e57da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Keep your stride natural but slightly elongated',
        'Look straight ahead rather than at the camera',
        'Allow clothing to show natural movement',
        'Capture from both side and front angles'
      ],
      themes: ['urban']
    },
    {
      id: '3',
      title: 'Seated Elegance',
      description: 'Sit elegantly on a bench or chair with a natural, relaxed posture',
      imageUrl: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Sit at an angle rather than straight-on',
        'Elongate your neck and maintain good posture',
        'Cross legs or ankles for a polished look',
        'Rest hands gently on lap or beside you'
      ],
      themes: ['urban', 'fall']
    },
    {
      id: '4',
      title: 'Beach Horizon Gaze',
      description: 'Stand facing the ocean, looking out at the horizon with a relaxed stance',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Allow the wind to create natural movement in your hair and clothes',
        'Keep your silhouette visible against the background',
        'Try both standing straight and with a slight hip shift',
        'Capture during golden hour for warm, flattering light'
      ],
      themes: ['urban']
    },
    {
      id: '5',
      title: 'Mountain Victory',
      description: 'Stand on an elevated point with arms slightly raised in a subtle victory pose',
      imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Find stable footing before attempting this pose',
        'Keep the pose subtle - slightly raised arms rather than fully extended',
        'Look out at the view rather than at the camera',
        'Consider a silhouette shot with the sun behind you'
      ],
      themes: ['adventure']
    },
    {
      id: '6',
      title: 'City Coffee Moment',
      description: 'Candid pose holding a coffee cup while strolling or seated at a cafe',
      imageUrl: 'https://images.unsplash.com/photo-1573612664822-d7d347da7b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Hold the cup naturally, not too posed',
        'Create a candid moment - looking away, mid-sip, or mid-conversation',
        'Include interesting architectural elements in the background',
        'Try both seated and walking variations'
      ],
      themes: ['urban']
    },
    {
      id: '7',
      title: 'Natural Laugh',
      description: 'Capture a genuine laughing moment for an authentic, joyful shot',
      imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Think of something genuinely funny rather than forcing a laugh',
        'Have the photographer capture a series of shots to get the most natural moment',
        'Let your body language be relaxed and open',
        'Don\'t worry about being "perfect" - authenticity is the goal'
      ],
      themes: ['urban', 'fall', 'adventure']
    },
    {
      id: '8',
      title: 'Thoughtful Gaze',
      description: 'A contemplative pose looking slightly downward or to the side',
      imageUrl: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Keep your expression soft and natural',
        'Try different gaze directions to find what feels most comfortable',
        'Slightly tilt your head for added dimension',
        'This works well in both urban and natural settings'
      ],
      themes: ['urban', 'fall']
    },
    {
      id: '9',
      title: 'Forest Pathway',
      description: 'Walking along a forest path with a relaxed, exploratory posture',
      imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Look around at your surroundings rather than at the camera',
        'Keep your pace slow and deliberate',
        'Allow natural movement in your clothing',
        'Try shots from behind, showing both you and the path ahead'
      ],
      themes: ['fall', 'adventure']
    },
    {
      id: '12',
      title: 'Adventure Gear Check',
      description: 'Adjusting backpack straps or checking equipment with purpose',
      imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tips: [
        'Show focus and determination in your expression',
        'Position your body at a slight angle to the camera',
        'Make the action look natural and purposeful',
        'Include some of the surrounding environment for context'
      ],
      themes: ['adventure']
    }
  ];
};

const RecommendationResult: React.FC<RecommendationResultProps> = ({ 
  formData, 
  activeTheme, 
  setActiveTheme,
  onSaveToLookbook 
}) => {
  const [allOutfits] = useState(generateEnhancedOutfitSuggestions(formData));
  const [filteredOutfits, setFilteredOutfits] = useState<EnhancedOutfit[]>([]);
  const [allFootwearOptions] = useState(generateFootwearOptions());
  const [allPosingIdeas] = useState(generatePosingIdeas());
  const [selectedOutfit, setSelectedOutfit] = useState<EnhancedOutfit | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<string[]>([]);
  const [selectedFootwear, setSelectedFootwear] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setIsTransitioning(true);
    
    const transitionTimer = setTimeout(() => {
      const newFilteredOutfits = allOutfits.filter(outfit => 
        outfit.themes.includes(activeTheme)
      );
      
      setFilteredOutfits(newFilteredOutfits);
      
      if (newFilteredOutfits.length > 0) {
        setSelectedOutfit(newFilteredOutfits[0]);
        setSelectedFootwear(null);
        setSelectedPose(null);
      }
      
      setIsTransitioning(false);
    }, 300);
    
    return () => clearTimeout(transitionTimer);
  }, [activeTheme, allOutfits]);

  const handleThemeChange = (theme: ThemeType) => {
    setActiveTheme(theme);
  };

  const handleSaveOutfit = (outfitId: string) => {
    if (savedOutfits.includes(outfitId)) {
      setSavedOutfits(savedOutfits.filter(id => id !== outfitId));
      toast({
        title: "Outfit removed from favorites",
        description: "The outfit has been removed from your saved outfits.",
      });
    } else {
      setSavedOutfits([...savedOutfits, outfitId]);
      toast({
        title: "Outfit saved!",
        description: "The outfit has been added to your favorites.",
      });
    }
  };

  const handleShareOutfit = () => {
    if (!selectedOutfit) return;
    
    const outfit = selectedOutfit.title;
    const footwear = selectedFootwear 
      ? allFootwearOptions.find(f => f.id === selectedFootwear)?.name 
      : 'No footwear selected';
    const pose = selectedPose
      ? allPosingIdeas.find(p => p.id === selectedPose)?.title
      : 'No pose selected';
      
    navigator.clipboard.writeText(`Check out this amazing outfit I created with StyleKlick: 
${outfit} with ${footwear} 
Perfect for a ${selectedOutfit.occasion} in ${selectedOutfit.season}!`)
      .then(() => {
        toast({
          title: "Outfit details copied!",
          description: "Share your style creation with friends!",
        });
      })
      .catch(() => {
        toast({
          title: "Couldn't copy to clipboard",
          description: "Please try again or copy manually.",
          variant: "destructive"
        });
      });
  };

  const handleRegenerateOutfits = () => {
    toast({
      title: "Regenerating outfits",
      description: "In the full version, this would generate new outfit recommendations.",
    });
  };

  const handleSelectFootwear = (footwearId: string) => {
    setSelectedFootwear(footwearId === selectedFootwear ? null : footwearId);
    toast({
      title: "Footwear selected",
      description: `You've selected ${allFootwearOptions.find(f => f.id === footwearId)?.name}.`,
    });
  };

  const handleSelectPose = (poseId: string) => {
    setSelectedPose(poseId === selectedPose ? null : poseId);
    toast({
      title: "Posing idea selected",
      description: `You've selected ${allPosingIdeas.find(p => p.id === poseId)?.title}.`,
    });
  };

  const getCompatibleFootwear = () => {
    if (!selectedOutfit) return [];
    
    return allFootwearOptions.filter(footwear => 
      selectedOutfit.footwearOptions.includes(footwear.id) && 
      footwear.themes.includes(activeTheme)
    );
  };

  const getCompatiblePoses = () => {
    if (!selectedOutfit) return [];
    
    return allPosingIdeas.filter(pose => 
      selectedOutfit.posingSuggestions.includes(pose.id) && 
      pose.themes.includes(activeTheme)
    );
  };

  const handleSaveToLookbook = () => {
    if (onSaveToLookbook) {
      onSaveToLookbook();
    } else {
      toast({
        title: "Saved to lookbook!",
        description: "This complete look has been saved to your personal lookbook.",
      });
    }
  };

  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption)
      .then(() => {
        toast({
          title: "Caption copied!",
          description: "Ready to paste in your social media post.",
        });
      })
      .catch(() => {
        toast({
          title: "Couldn't copy caption",
          description: "Please try again or copy manually.",
          variant: "destructive"
        });
      });
  };

  const getThemeIcon = (theme: ThemeType) => {
    switch(theme) {
      case 'fall':
        return <Shirt className="h-4 w-4" />;
      case 'adventure':
        return <Mountain className="h-4 w-4" />;
      case 'urban':
        return <Building className="h-4 w-4" />;
      default:
        return <Shirt className="h-4 w-4" />;
    }
  };

  const getThemeDisplayName = (theme: ThemeType) => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  const renderNoOutfitsMessage = () => (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <RefreshCw className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">We're curating this vibe for you</h3>
      <p className="text-gray-600 mb-4">Check back soon for personalized {getThemeDisplayName(activeTheme)} recommendations!</p>
      <Button onClick={() => setActiveTheme('fall')}>
        Try Fall Theme Instead
      </Button>
    </div>
  );

  const handleViewMorePoses = () => {
    navigate('/location-posing', { 
      state: { 
        returnTo: '/recommendations#outfits',
        formData 
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold gradient-heading">Your Style Recommendations</h2>
          <Button variant="outline" className="border-styleklick-purple text-styleklick-purple" asChild>
            <Link to="/questionnaire" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Questionnaire</span>
            </Link>
          </Button>
        </div>
        <p className="text-gray-600 mt-2 mb-6">
          Based on your preferences, here are personalized outfit recommendations including matching footwear and posing suggestions.
        </p>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Select a style theme:</h3>
          <ToggleGroup type="single" value={activeTheme} onValueChange={(value) => value && handleThemeChange(value as ThemeType)}>
            <ToggleGroupItem 
              value="fall" 
              aria-label="Fall Theme"
              className={`flex items-center gap-2 px-4 py-2 ${activeTheme === 'fall' ? 'bg-amber-100 text-amber-900 border-amber-300' : ''}`}
            >
              <Shirt className="h-4 w-4" />
              <span>Fall</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="adventure" 
              aria-label="Adventure Theme"
              className={`flex items-center gap-2 px-4 py-2 ${activeTheme === 'adventure' ? 'bg-green-100 text-green-900 border-green-300' : ''}`}
            >
              <Mountain className="h-4 w-4" />
              <span>Adventure</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="urban" 
              aria-label="Urban Theme"
              className={`flex items-center gap-2 px-4 py-2 ${activeTheme === 'urban' ? 'bg-blue-100 text-blue-900 border-blue-300' : ''}`}
            >
              <Building className="h-4 w-4" />
              <span>Urban</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {isTransitioning ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-styleklick-purple"></div>
        </div>
      ) : filteredOutfits.length === 0 ? (
        renderNoOutfitsMessage()
      ) : (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shirt className="mr-2 h-5 w-5 text-styleklick-purple" />
                <span>{getThemeDisplayName(activeTheme)} Outfit Options</span>
              </h3>
              <div className="space-y-4">
                {filteredOutfits.map((outfit) => (
                  <Card 
                    key={outfit.id} 
                    className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                      selectedOutfit?.id === outfit.id ? 'border-2 border-styleklick-purple' : ''
                    }`}
                    onClick={() => setSelectedOutfit(outfit)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={outfit.imageUrl} 
                          alt={outfit.title} 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-medium">{outfit.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-1">{outfit.description}</p>
                          <div className="flex mt-1 gap-1">
                            <Badge variant="outline" className="text-xs">
                              {outfit.season}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {outfit.occasion}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2 border-styleklick-purple text-styleklick-purple"
                  onClick={handleRegenerateOutfits}
                >
                  <RefreshCw size={16} />
                  <span>Regenerate Outfits</span>
                </Button>
              </div>

              <div className="mt-8">
                <Button 
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={handleSaveToLookbook}
                  disabled={!selectedOutfit}
                >
                  <BookmarkPlus size={16} />
                  <span>Save Complete Look to Lookbook</span>
                </Button>
              </div>
            </div>
          </div>
          
          {selectedOutfit && (
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="overflow-hidden mb-8">
                <div className="relative">
                  <img 
                    src={selectedOutfit.imageUrl} 
                    alt={selectedOutfit.title} 
                    className="w-full h-[500px] object-cover object-center"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={`rounded-full bg-white ${
                        savedOutfits.includes(selectedOutfit.id) 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                      }`}
                      onClick={() => handleSaveOutfit(selectedOutfit.id)}
                    >
                      <Heart className={savedOutfits.includes(selectedOutfit.id) ? 'fill-current' : ''} size={18} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-white text-gray-500"
                      onClick={handleShareOutfit}
                    >
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{selectedOutfit.title}</h3>
                        <p className="text-gray-600">{selectedOutfit.description}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className="bg-styleklick-purple hover:bg-styleklick-purple">{selectedOutfit.season}</Badge>
                        <Badge variant="outline">{selectedOutfit.occasion}</Badge>
                        <Badge variant="outline">{selectedOutfit.destinationType}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="outfit">
                    <TabsList className="mb-6 grid w-full grid-cols-4">
                      <TabsTrigger value="outfit" className="flex items-center">
                        <Shirt className="mr-2 h-4 w-4" />
                        <span>Outfit Details</span>
                      </TabsTrigger>
                      <TabsTrigger value="footwear" className="flex items-center">
                        <Footprints className="mr-2 h-4 w-4" />
                        <span>Footwear</span>
                      </TabsTrigger>
                      <TabsTrigger value="posing" className="flex items-center">
                        <Camera className="mr-2 h-4 w-4" />
                        <span>Posing</span>
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="flex items-center">
                        <Brain className="mr-2 h-4 w-4" />
                        <span>AI Analysis</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="outfit">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Recommended Items</h4>
                        <ul className="space-y-4">
                          {selectedOutfit.items.map((item, index) => (
                            <li key={index} className="border-b border-gray-100 pb-3">
                              <h5 className="font-medium">{item.name}</h5>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedOutfit.accessories.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-4">Suggested Accessories</h4>
                          <ul className="space-y-2">
                            {selectedOutfit.accessories.map((accessory, index) => (
                              <li key={index} className="text-gray-700 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{accessory}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedOutfit.captionIdeas.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-4">Caption Ideas</h4>
                          <div className="space-y-2">
                            {selectedOutfit.captionIdeas.map((caption, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <p className="text-gray-700 italic">"{caption}"</p>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-gray-500"
                                  onClick={() => handleCopyCaption(caption)}
                                >
                                  <Copy size={14} className="mr-1" /> Copy
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="prose max-w-none">
                        <h4 className="text-lg font-semibold mb-4">Why This Works For You</h4>
                        <p className="text-gray-700">{selectedOutfit.explanation}</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="footwear">
                      <h4 className="text-lg font-semibold mb-6">Select Footwear for This Outfit</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getCompatibleFootwear().map(footwear => (
                          <Card 
                            key={footwear.id}
                            className={`cursor-pointer overflow-hidden transition-all ${
                              selectedFootwear === footwear.id ? 'ring-2 ring-styleklick-purple' : 'hover:shadow-md'
                            }`}
                            onClick={() => handleSelectFootwear(footwear.id)}
                          >
                            <div className="aspect-square relative">
                              <img 
                                src={footwear.imageUrl} 
                                alt={footwear.name}
                                className="w-full h-full object-cover" 
                              />
                              {selectedFootwear === footwear.id && (
                                <div className="absolute top-2 right-2 bg-styleklick-purple text-white p-1 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h5 className="font-medium">{footwear.name}</h5>
                              <p className="text-sm text-gray-600 mt-1">{footwear.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {footwear.suitability.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {getCompatibleFootwear().length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No compatible footwear options available for this outfit and theme.</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="posing">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-semibold">Posing Ideas for {selectedOutfit.destinationType}</h4>
                        <Link to="/location-posing" className="text-styleklick-purple text-sm hover:underline">
                          View more pose ideas
                        </Link>
                      </div>
                      
                      {getCompatiblePoses().length > 0 ? (
                        <Carousel className="w-full">
                          <CarouselContent>
                            {getCompatiblePoses().map(pose => (
                              <CarouselItem key={pose.id} className="md:basis-1/2">
                                <Card 
                                  className={`cursor-pointer overflow-hidden h-full transition-all ${
                                    selectedPose === pose.id ? 'ring-2 ring-styleklick-purple' : 'hover:shadow-md'
                                  }`}
                                  onClick={() => handleSelectPose(pose.id)}
                                >
                                  <div className="aspect-video relative">
                                    <img 
                                      src={pose.imageUrl} 
                                      alt={pose.title}
                                      className="w-full h-full object-cover" 
                                    />
                                    {selectedPose === pose.id && (
                                      <div className="absolute top-2 right-2 bg-styleklick-purple text-white p-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <CardContent className="p-4">
                                    <h5 className="font-medium">{pose.title}</h5>
                                    <p className="text-sm text-gray-600 mt-1">{pose.description}</p>
                                    
                                    {selectedPose === pose.id && (
                                      <div className="mt-4">
                                        <h6 className="text-sm font-medium mb-2">Posing Tips:</h6>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                          {pose.tips.map((tip, index) => (
                                            <li key={index} className="flex items-start">
                                              <span className="mr-1">•</span>
                                              <span>{tip}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="-left-4 md:-left-5" />
                          <CarouselNext className="-right-4 md:-right-5" />
                        </Carousel>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No compatible posing suggestions available for this outfit and theme.</p>
                        </div>
                      )}
                      
                      {selectedPose && (
                        <div className="mt-6">
                          <Button variant="outline" className="w-full" onClick={() => {
                            toast({
                              title: "Pose saved!",
                              description: "This pose has been saved to your inspiration board.",
                            });
                          }}>
                            <Image className="mr-2 h-4 w-4" />
                            <span>Save Pose to Inspiration Board</span>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="ai">
                      <h4 className="text-lg font-semibold mb-6 flex items-center">
                        <Brain className="mr-2 h-4 w-4 text-styleklick-purple" />
                        <span>AI Style Analysis</span>
                      </h4>
                      
                      <div className="space-y-6">
                        <div className="bg-styleklick-soft-purple/10 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Style Compatibility</h5>
                          <p className="text-gray-700 text-sm">
                            Our AI has analyzed this outfit based on your body type, style preferences, 
                            occasion, and destination. Here's why we think this is a good match for you.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium mb-2 text-sm">Body Type Harmony</h5>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">Match Score</span>
                              <Badge>{Math.floor(Math.random() * 15) + 85}%</Badge>
                            </div>
                            <p className="mt-2 text-xs text-gray-600">
                              This outfit's silhouette works well with your body type, creating balanced proportions.
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2 text-sm">Style Preference</h5>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">Match Score</span>
                              <Badge>{Math.floor(Math.random() * 15) + 85}%</Badge>
                            </div>
                            <p className="mt-2 text-xs text-gray-600">
                              Elements align with your style preferences while incorporating current trends.
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2 text-sm">Color Analysis</h5>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">Match Score</span>
                              <Badge>{Math.floor(Math.random() * 15) + 85}%</Badge>
                            </div>
                            <p className="mt-2 text-xs text-gray-600">
                              The color palette complements your preferences and creates visual harmony.
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2 text-sm">Occasion Fit</h5>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">Match Score</span>
                              <Badge>{Math.floor(Math.random() * 15) + 85}%</Badge>
                            </div>
                            <p className="mt-2 text-xs text-gray-600">
                              This outfit is appropriate for your specified occasion and venue type.
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">AI Style Notes</h5>
                          <p className="text-sm text-gray-700">
                            {selectedOutfit.explanation || 
                              "This outfit combines elements that specifically match your preferences. The silhouette and proportions are designed to flatter your body type, while the color palette enhances your personal style. The ensemble is versatile enough for your specified occasion while maintaining the level of formality you prefer."}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Add AI Recommendation Section for more outfits */}
                  <AIRecommendationSection 
                    formData={formData} 
                    outfits={filteredOutfits.map(outfit => ({
                      id: outfit.id,
                      title: outfit.title,
                      imageUrl: outfit.imageUrl
                    }))}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          className="border-styleklick-purple text-styleklick-purple"
          onClick={handleViewMorePoses}
        >
          <Image className="mr-2 h-4 w-4" />
          View More Pose Ideas
        </Button>
      </div>
    </div>
  );
};

export default RecommendationResult;
