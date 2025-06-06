
// Mock outfit data separated into its own file for better organization
export const mockOutfits = {
  fall: [
    {
      id: 'fall-1',
      title: 'Autumn Elegance',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      description: 'Sophisticated layers with warm earth tones perfect for fall weather.',
      items: ['Wool coat', 'Cashmere sweater', 'High-waisted trousers', 'Ankle boots'],
      bodyTypeMatch: 88,
      styleMatch: 92,
      confidence: 94
    },
    {
      id: 'fall-2',
      title: 'Cozy Comfort',
      imageUrl: 'https://images.unsplash.com/photo-1547996160-81df0e73ca6a?auto=format&fit=crop&w=800&q=80',
      description: 'Soft textures and comfortable fits for crisp days.',
      items: ['Oversized knit sweater', 'Fleece-lined leggings', 'Knee-high socks', 'Suede boots'],
      bodyTypeMatch: 90,
      styleMatch: 87,
      confidence: 89
    },
    {
      id: 'fall-3',
      title: 'Harvest Chic',
      imageUrl: 'https://images.unsplash.com/photo-1549298713-24f4c47b8544?auto=format&fit=crop&w=800&q=80',
      description: 'Modern silhouettes with seasonal accents.',
      items: ['Corduroy blazer', 'Silk blouse', 'Wide-leg jeans', 'Loafers'],
      bodyTypeMatch: 85,
      styleMatch: 91,
      confidence: 88
    },
    {
      id: 'fall-4',
      title: 'Golden Hour',
      imageUrl: 'https://images.unsplash.com/photo-1519699047764-416314e4d1e3?auto=format&fit=crop&w=800&q=80',
      description: 'Warm palettes perfect for autumn sunsets.',
      items: ['Rust-colored dress', 'Denim jacket', 'Scarf', 'Cowboy boots'],
      bodyTypeMatch: 82,
      styleMatch: 89,
      confidence: 86
    }
  ],
  adventure: [
    {
      id: 'adventure-1',
      title: 'Trail Ready',
      imageUrl: 'https://images.unsplash.com/photo-1517842067494-48247259b8ca?auto=format&fit=crop&w=800&q=80',
      description: 'Durable fabrics with outdoor functionality.',
      items: ['Waterproof jacket', 'Hiking pants', 'Moisture-wicking tee', 'Hiking boots'],
      bodyTypeMatch: 93,
      styleMatch: 88,
      confidence: 91
    },
    {
      id: 'adventure-2',
      title: 'Urban Explorer',
      imageUrl: 'https://images.unsplash.com/photo-1483729558042-f63371c8da49?auto=format&fit=crop&w=800&q=80',
      description: 'City adventures meet outdoor comfort.',
      items: ['Lightweight parka', 'Cargo pants', 'Graphic tee', 'Sneakers'],
      bodyTypeMatch: 87,
      styleMatch: 90,
      confidence: 89
    },
    {
      id: 'adventure-3',
      title: 'Mountain Casual',
      imageUrl: 'https://images.unsplash.com/photo-1532274402911-5a369e2e94cd?auto=format&fit=crop&w=800&q=80',
      description: 'Relaxed fits for weekend getaways.',
      items: ['Flannel shirt', 'Chinos', 'Beanie', 'Chelsea boots'],
      bodyTypeMatch: 84,
      styleMatch: 86,
      confidence: 85
    },
    {
      id: 'adventure-4',
      title: 'Summit Style',
      imageUrl: 'https://images.unsplash.com/photo-1541460824-9104232f3969?auto=format&fit=crop&w=800&q=80',
      description: 'Performance meets fashion for active days.',
      items: ['Athletic leggings', 'Sports bra', 'Windbreaker', 'Trail running shoes'],
      bodyTypeMatch: 91,
      styleMatch: 83,
      confidence: 87
    }
  ],
  urban: [
    {
      id: 'urban-1',
      title: 'City Professional',
      imageUrl: 'https://images.unsplash.com/photo-1495384995813-3667b399a962?auto=format&fit=crop&w=800&q=80',
      description: 'Sharp lines and contemporary cuts.',
      items: ['Tailored suit', 'Button-down shirt', 'Pencil skirt', 'Pointed heels'],
      bodyTypeMatch: 89,
      styleMatch: 94,
      confidence: 92
    },
    {
      id: 'urban-2',
      title: 'Street Smart',
      imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd6ca6ac9e?auto=format&fit=crop&w=800&q=80',
      description: 'Trendy pieces with metropolitan flair.',
      items: ['Bomber jacket', 'Hoodie', 'Skinny jeans', 'High-top sneakers'],
      bodyTypeMatch: 86,
      styleMatch: 91,
      confidence: 89
    },
    {
      id: 'urban-3',
      title: 'Modern Minimalist',
      imageUrl: 'https://images.unsplash.com/photo-1521369909827-4ac6ef131396?auto=format&fit=crop&w=800&q=80',
      description: 'Clean aesthetics for the urban lifestyle.',
      items: ['Turtleneck sweater', 'Straight-leg trousers', 'Trench coat', 'Ankle boots'],
      bodyTypeMatch: 88,
      styleMatch: 90,
      confidence: 89
    },
    {
      id: 'urban-4',
      title: 'Downtown Edge',
      imageUrl: 'https://images.unsplash.com/photo-1503435980610-a60293d45d20?auto=format&fit=crop&w=800&q=80',
      description: 'Bold statements for city nights.',
      items: ['Leather jacket', 'Graphic tee', 'Ripped jeans', 'Combat boots'],
      bodyTypeMatch: 83,
      styleMatch: 87,
      confidence: 85
    }
  ]
};
