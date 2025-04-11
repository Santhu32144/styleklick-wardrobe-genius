// Define types for our location data
export interface PoseSuggestion {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface OutfitSuggestion {
  id: string;
  image: string;
  title: string;
  description: string;
  items: {
    name: string;
    description: string;
  }[];
  timeOfDay?: string;
  captionIdeas?: string[];
  accessories?: string[];
}

export interface LocationType {
  id: string;
  name: string;
  description: string;
  image: string;
  poses: PoseSuggestion[];
  outfits: OutfitSuggestion[];
}

// Sample data for location-based suggestions
export const locationData: LocationType[] = [
  {
    id: 'mountains',
    name: 'Mountain Peaks',
    description: 'Majestic views and rugged terrains',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'mountain-pose-1',
        image: 'https://images.unsplash.com/photo-1568454537842-d933259bb1e6?auto=format&fit=crop&w=800&q=80',
        title: 'Summit Celebration',
        description: 'Arms outstretched at the peak, celebrating your achievement'
      },
      {
        id: 'mountain-pose-2',
        image: 'https://images.unsplash.com/photo-1508437824486-542ced7e0bc1?auto=format&fit=crop&w=800&q=80',
        title: 'Contemplative Gaze',
        description: 'Looking thoughtfully at the distant horizon'
      },
      {
        id: 'mountain-pose-3',
        image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80',
        title: 'Adventure Stance',
        description: 'Standing with hiking gear, ready for the journey'
      }
    ],
    outfits: [
      {
        id: 'mountain-outfit-1',
        image: 'https://images.unsplash.com/photo-1605973029521-8154da591bd7?auto=format&fit=crop&w=800&q=80',
        title: 'Practical Mountaineer',
        description: 'Functional yet stylish outfit for serious hikers',
        items: [
          { name: 'Moisture-wicking shirt', description: 'Breathable fabric to keep you dry during exertion' },
          { name: 'Convertible hiking pants', description: 'Versatile pants that can convert to shorts' },
          { name: 'Waterproof jacket', description: 'Lightweight protection from unexpected weather' },
          { name: 'Mid-weight hiking boots', description: 'Ankle support for uneven terrain' }
        ],
        timeOfDay: 'Early morning or golden hour',
        captionIdeas: ['Peak performance', 'Above the clouds', 'Mountain state of mind'],
        accessories: ['Wide-brimmed hat', 'Polarized sunglasses', 'Bandana']
      },
      {
        id: 'mountain-outfit-2',
        image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=800&q=80',
        title: 'Mountain Chic',
        description: 'Style-forward outfit that still works for moderate trails',
        items: [
          { name: 'Chunky knit sweater', description: 'Cozy and photogenic for cooler mountain air' },
          { name: 'Stretch hiking leggings', description: 'Comfortable movement with technical features' },
          { name: 'Fleece-lined beanie', description: 'Keeps you warm while adding style' },
          { name: 'Leather hiking boots', description: 'Classic look with practical function' }
        ],
        timeOfDay: 'Golden hour',
        captionIdeas: ['Wild and free', 'Nature\'s therapy', 'Venture high'],
        accessories: ['Woven backpack', 'Statement water bottle', 'Minimal jewelry']
      }
    ]
  },
  {
    id: 'beaches',
    name: 'Beaches & Coastlines',
    description: 'Sun-soaked shores and ocean vibes',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'beach-pose-1',
        image: 'https://images.unsplash.com/photo-1502317894028-602f87e1890d?auto=format&fit=crop&w=800&q=80',
        title: 'Ocean Gaze',
        description: 'Looking out at the horizon where sky meets water'
      },
      {
        id: 'beach-pose-2',
        image: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?auto=format&fit=crop&w=800&q=80',
        title: 'Shoreline Stroll',
        description: 'Walking casually along the water\'s edge'
      },
      {
        id: 'beach-pose-3',
        image: 'https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?auto=format&fit=crop&w=800&q=80',
        title: 'Sunset Silhouette',
        description: 'Creating a dramatic silhouette against the setting sun'
      }
    ],
    outfits: [
      {
        id: 'beach-outfit-1',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        title: 'Bohemian Beach',
        description: 'Free-spirited look with flowy fabrics and natural textures',
        items: [
          { name: 'Flowy maxi dress', description: 'Light fabric that moves beautifully in ocean breeze' },
          { name: 'Straw wide-brim hat', description: 'Sun protection with boho vibes' },
          { name: 'Leather sandals', description: 'Comfortable for walking on sand and boardwalks' },
          { name: 'Crochet beach bag', description: 'Stylish way to carry essentials' }
        ],
        timeOfDay: 'Golden hour before sunset',
        captionIdeas: ['Salt in the air, sand in my hair', 'Toes in the sand', 'Sunset chaser'],
        accessories: ['Shell jewelry', 'Colorful sarong', 'Round sunglasses']
      },
      {
        id: 'beach-outfit-2',
        image: 'https://images.unsplash.com/photo-1570976447640-ac859083c126?auto=format&fit=crop&w=800&q=80',
        title: 'Coastal Cool',
        description: 'Polished beach look that transitions well to oceanfront dining',
        items: [
          { name: 'Linen shorts', description: 'Breathable and quick-drying' },
          { name: 'Button-up shirt', description: 'Can be worn open over swimwear or buttoned for dining' },
          { name: 'Canvas slip-ons', description: 'Easy to remove for impromptu beach walks' },
          { name: 'Panama hat', description: 'Classic style with excellent sun protection' }
        ],
        timeOfDay: 'Late afternoon',
        captionIdeas: ['Life\'s a beach', 'Coastal state of mind', 'Blue horizon'],
        accessories: ['Woven bracelet', 'Aviator sunglasses', 'Woven belt']
      }
    ]
  },
  {
    id: 'forests',
    name: 'Forests & Natural Trails',
    description: 'Enchanting woodlands and lush greenery',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'forest-pose-1',
        image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
        title: 'Path Discoverer',
        description: 'Walking along a forest trail, looking back at the camera'
      },
      {
        id: 'forest-pose-2',
        image: 'https://images.unsplash.com/photo-1561361398-b8f1fe6a3696?auto=format&fit=crop&w=800&q=80',
        title: 'Forest Meditation',
        description: 'Sitting peacefully among the trees, connecting with nature'
      },
      {
        id: 'forest-pose-3',
        image: 'https://images.unsplash.com/photo-1434620915886-7b7186fc9a14?auto=format&fit=crop&w=800&q=80',
        title: 'Dappled Light',
        description: 'Standing where sunlight filters through the leaves'
      }
    ],
    outfits: [
      {
        id: 'forest-outfit-1',
        image: 'https://images.unsplash.com/photo-1516486392848-8b67ef89f113?auto=format&fit=crop&w=800&q=80',
        title: 'Woodland Explorer',
        description: 'Comfortable, practical outfit with earthy tones',
        items: [
          { name: 'Flannel shirt', description: 'Classic pattern in forest-inspired colors' },
          { name: 'Utility pants', description: 'Durable with pockets for small essentials' },
          { name: 'Weatherproof boots', description: 'Grip soles for potentially muddy trails' },
          { name: 'Lightweight pullover', description: 'Easy layer for changing forest temperatures' }
        ],
        timeOfDay: 'Mid-morning when light streams through trees',
        captionIdeas: ['Forest bathing', 'Among the ancients', 'Rooted in nature'],
        accessories: ['Leather watch', 'Small backpack', 'Compass necklace']
      },
      {
        id: 'forest-outfit-2',
        image: 'https://images.unsplash.com/photo-1598454444376-f1d96185c24a?auto=format&fit=crop&w=800&q=80',
        title: 'Forest Fairytale',
        description: 'Whimsical, feminine outfit that plays with forest light',
        items: [
          { name: 'Flowing midi dress', description: 'Preferably in emerald green or earthy tones' },
          { name: 'Ankle boots', description: 'Practical for forest floors while maintaining style' },
          { name: 'Knit cardigan', description: 'For layering in cooler forest shade' },
          { name: 'Wide-brim wool hat', description: 'Adds drama and filters dappled light' }
        ],
        timeOfDay: 'Golden hour',
        captionIdeas: ['Enchanted', 'Whispers of the forest', 'Wild at heart'],
        accessories: ['Botanical-inspired jewelry', 'Woven scarf', 'Vintage-inspired bag']
      }
    ]
  },
  {
    id: 'urban',
    name: 'Urban Cityscapes',
    description: 'Sophisticated city streets and architectural backdrops',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'urban-pose-1',
        image: 'https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?auto=format&fit=crop&w=800&q=80',
        title: 'City Strut',
        description: 'Confidently walking across a crosswalk or down a sidewalk'
      },
      {
        id: 'urban-pose-2',
        image: 'https://images.unsplash.com/photo-1621784564114-6eea05b89863?auto=format&fit=crop&w=800&q=80',
        title: 'Architectural Frame',
        description: 'Positioned within interesting architectural features'
      },
      {
        id: 'urban-pose-3',
        image: 'https://images.unsplash.com/photo-1541943181603-d8fe267a5dcf?auto=format&fit=crop&w=800&q=80',
        title: 'Café Culture',
        description: 'Enjoying city life at an outdoor café'
      }
    ],
    outfits: [
      {
        id: 'urban-outfit-1',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
        title: 'City Chic',
        description: 'Polished urban look that balances style and comfort',
        items: [
          { name: 'Tailored blazer', description: 'Structured piece that elevates any outfit' },
          { name: 'Slim-fit jeans', description: 'Dark wash for versatility' },
          { name: 'Fashion sneakers', description: 'Stylish yet comfortable for city exploration' },
          { name: 'Quality t-shirt', description: 'Simple base layer that can be dressed up or down' }
        ],
        timeOfDay: 'Blue hour (just after sunset)',
        captionIdeas: ['Concrete jungle', 'City of dreams', 'Urban explorer'],
        accessories: ['Structured handbag', 'Minimal watch', 'Statement sunglasses']
      },
      {
        id: 'urban-outfit-2',
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
        title: 'Street Style',
        description: 'Fashion-forward outfit with unique textures and proportions',
        items: [
          { name: 'Oversized statement coat', description: 'Bold outerwear that makes an impression' },
          { name: 'Cropped trousers', description: 'Modern silhouette that shows off footwear' },
          { name: 'Architectural boots', description: 'Interesting shape or material for visual interest' },
          { name: 'Monochromatic layers', description: 'Tonal dressing for sophisticated look' }
        ],
        timeOfDay: 'Early morning for empty streets or evening for city lights',
        captionIdeas: ['Street style diary', 'Urban canvas', 'Metropolitan mood'],
        accessories: ['Bold eyewear', 'Sculptural jewelry', 'Designer crossbody bag']
      }
    ]
  },
  {
    id: 'desert',
    name: 'Desert Landscapes',
    description: 'Vast sandy expanses and dramatic dunes',
    image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'desert-pose-1',
        image: 'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?auto=format&fit=crop&w=800&q=80',
        title: 'Dune Overlook',
        description: 'Standing atop a dune, surveying the vast landscape'
      },
      {
        id: 'desert-pose-2',
        image: 'https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?auto=format&fit=crop&w=800&q=80',
        title: 'Desert Dreamscape',
        description: 'Sitting on the sand with a pensive or relaxed pose'
      },
      {
        id: 'desert-pose-3',
        image: 'https://images.unsplash.com/photo-1605301535363-690e5aec35d2?auto=format&fit=crop&w=800&q=80',
        title: 'Flowing Fabric',
        description: 'Capturing movement with flowing clothes against still dunes'
      }
    ],
    outfits: [
      {
        id: 'desert-outfit-1',
        image: 'https://images.unsplash.com/photo-1515529227230-431c2825d815?auto=format&fit=crop&w=800&q=80',
        title: 'Desert Nomad',
        description: 'Flowy, lightweight fabrics in earth tones',
        items: [
          { name: 'Loose linen pants', description: 'Breathable and sand-friendly' },
          { name: 'Oversized white shirt', description: 'Reflects sun and creates dramatic desert silhouettes' },
          { name: 'Desert boots', description: 'Practical for walking on sand' },
          { name: 'Light scarf/shemagh', description: 'Can be used for sun protection or styling' }
        ],
        timeOfDay: 'Golden hour or blue hour',
        captionIdeas: ['Desert dreaming', 'Sands of time', 'Endless horizons'],
        accessories: ['Wide-brimmed hat', 'Minimal gold jewelry', 'Vintage-inspired sunglasses']
      },
      {
        id: 'desert-outfit-2',
        image: 'https://images.unsplash.com/photo-1576954288896-7470b1d3b97e?auto=format&fit=crop&w=800&q=80',
        title: 'Desert Luxe',
        description: 'Dramatic, elegant look that plays with desert colors',
        items: [
          { name: 'Maxi dress/caftan', description: 'Flowing silhouette in sunset tones' },
          { name: 'Metallic sandals', description: 'Reflects golden desert light' },
          { name: 'Structured hat', description: 'Creates interesting shadows on the face' },
          { name: 'Statement belt', description: 'Defines the waist against flowing fabrics' }
        ],
        timeOfDay: 'Sunset',
        captionIdeas: ['Desert rose', 'Oasis of style', 'Dune dreamer'],
        accessories: ['Hammered metal jewelry', 'Embroidered bag', 'Dramatic wrap or shawl']
      }
    ]
  },
  {
    id: 'waterfall',
    name: 'Waterfalls & Riversides',
    description: 'Refreshing waters and lush surroundings',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'waterfall-pose-1',
        image: 'https://images.unsplash.com/photo-1534235826905-0eb7d3ce7be9?auto=format&fit=crop&w=800&q=80',
        title: 'Waterfall Gaze',
        description: 'Looking up at the falling water in awe'
      },
      {
        id: 'waterfall-pose-2',
        image: 'https://images.unsplash.com/photo-1551776178-c59094da2c84?auto=format&fit=crop&w=800&q=80',
        title: 'Riverside Reflection',
        description: 'Seated by calm water, creating a mirror image'
      },
      {
        id: 'waterfall-pose-3',
        image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
        title: "Water's Edge",
        description: 'Standing at the edge of a pool or river, partly in the water'
      }
    ],
    outfits: [
      {
        id: 'waterfall-outfit-1',
        image: 'https://images.unsplash.com/photo-1536745311570-87b8f040f2d6?auto=format&fit=crop&w=800&q=80',
        title: 'River Wanderer',
        description: 'Practical yet photogenic outfit for water environments',
        items: [
          { name: 'Quick-dry shorts', description: 'Comfortable for sitting on rocks or wading' },
          { name: 'Lightweight technical shirt', description: 'Protection from sun while staying cool' },
          { name: 'Water shoes', description: 'Grip for slippery surfaces' },
          { name: 'Light windbreaker', description: 'Protection from waterfall spray' }
        ],
        timeOfDay: 'Mid-morning when light hits the water',
        captionIdeas: ['Chasing waterfalls', 'Go with the flow', 'Nature\'s power'],
        accessories: ['Waterproof bag', 'Climbing-inspired accessories', 'Waterproof watch']
      },
      {
        id: 'waterfall-outfit-2',
        image: 'https://images.unsplash.com/photo-1607355368885-e6ccba136808?auto=format&fit=crop&w=800&q=80',
        title: 'Ethereal Waterside',
        description: 'Romantic, flowing outfit that complements the water',
        items: [
          { name: 'Watercolor-inspired dress', description: 'Flowing fabric in blues and greens' },
          { name: 'Comfortable sandals', description: 'Can get wet but still attractive' },
          { name: 'Light cardigan', description: 'For cooler misty areas' },
          { name: 'Waterproof makeup', description: 'For looking fresh in potentially moist air' }
        ],
        timeOfDay: 'Golden hour',
        captionIdeas: ['Liquid courage', 'Mist and magic', 'Wild water dreams'],
        accessories: ['Waterproof pouches', 'Nature-inspired jewelry', 'Hair accessories']
      }
    ]
  },
  {
    id: 'snow',
    name: 'Snowy Destinations',
    description: 'Winter wonderlands and frosty landscapes',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    poses: [
      {
        id: 'snow-pose-1',
        image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80',
        title: 'Snow Angel',
        description: 'Looking joyful while playing in fresh snow'
      },
      {
        id: 'snow-pose-2',
        image: 'https://images.unsplash.com/photo-1581285480145-440999a7ef82?auto=format&fit=crop&w=800&q=80',
        title: 'Cozy Reflection',
        description: 'Gazing at a snowy vista from a warm vantage point'
      },
      {
        id: 'snow-pose-3',
        image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&w=800&q=80',
        title: 'Winter Explorer',
        description: 'Action shot of hiking or exploring a snowy landscape'
      }
    ],
    outfits: [
      {
        id: 'snow-outfit-1',
        image: 'https://images.unsplash.com/photo-1606513542745-97629752a8e8?auto=format&fit=crop&w=800&q=80',
        title: 'Alpine Chic',
        description: 'Fashionable yet functional winter wear',
        items: [
          { name: 'Statement puffer coat', description: 'Bold color that pops against white snow' },
          { name: 'Insulated snow pants', description: 'Slim-fit for a flattering silhouette' },
          { name: 'Chunky knit sweater', description: 'Texture that photographs well' },
          { name: 'Waterproof snow boots', description: 'Practical yet stylish footwear' }
        ],
        timeOfDay: 'Blue hour or bright midday for snow sparkle',
        captionIdeas: ['Winter wonderland', 'Powder perfect', 'Frost and found'],
        accessories: ['Fur or faux-fur details', 'Pom-pom beanie', 'Polarized sunglasses']
      },
      {
        id: 'snow-outfit-2',
        image: 'https://images.unsplash.com/photo-1557412603-150d6d789b37?auto=format&fit=crop&w=800&q=80',
        title: 'Cabin Cozy',
        description: 'Layered look balancing comfort and style',
        items: [
          { name: 'Oversized knit cardigan', description: 'Chunky texture that creates visual interest' },
          { name: 'Thermal base layers', description: 'Practical warmth beneath stylish pieces' },
          { name: 'Wool socks', description: 'Peek out above boots for styling detail' },
          { name: 'Fleece-lined jeans or leggings', description: 'Warmth without bulk' }
        ],
        timeOfDay: 'Golden hour when snow glows pink and orange',
        captionIdeas: ['Snug in the snow', 'Cold hands, warm heart', 'Nordic dreams'],
        accessories: ['Cozy scarf', 'Leather gloves', 'Earmuffs or headband']
      }
    ]
  }
];
