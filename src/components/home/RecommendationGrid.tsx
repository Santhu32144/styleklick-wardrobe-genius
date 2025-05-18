
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Check, Plus } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const RecommendationGrid = () => {
  const { user, profile } = useAuth();
  
  // Get user name or default welcome
  const getUserName = () => {
    if (profile?.name) return profile.name;
    if (user && user.email) {
      const email = user.email;
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "Fashion";
  };

  // Get initials for avatar
  const getInitials = () => {
    if (profile?.name) {
      const nameParts = profile.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return profile.name.substring(0, 2).toUpperCase();
    }
    
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return "FK";
  };

  // Fashion items for the grid
  const recentOutfits = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      saved: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      saved: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      saved: false
    }
  ];

  const savedLooks = [
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="py-10 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Section with Soft Background Shapes */}
        <div className="relative mb-12">
          {/* Decorative Shape - Top Right */}
          <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-styleklick-soft-peach opacity-20 -z-10"></div>
          
          {/* Decorative Shape - Left */}
          <div className="absolute -left-20 top-20 w-80 h-80 rounded-full bg-styleklick-soft-blue opacity-20 -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left side - Text content */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                {user && (
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm mr-4">
                    <AvatarImage src="" alt={getUserName()} />
                    <AvatarFallback className="bg-styleklick-purple text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="text-lg text-gray-700">
                  {user ? 'Logged in' : 'Welcome'}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Hi {getUserName()}<br />Recommendations
              </h1>
              <p className="text-gray-600 mb-6 max-w-md">
                Personalized style recommendations tailored just for you. Browse your suggestions and save your favorite looks.
              </p>
              
              <div className="flex gap-3">
                <Button className="bg-styleklick-soft-green hover:bg-styleklick-soft-green/90 text-gray-800 rounded-full px-6">
                  Get recommendations
                </Button>
                {!user && (
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link to="/auth">Login</Link>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Right side - Outfit cards */}
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {/* Featured recommendation card */}
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden bg-styleklick-soft-cream shadow-sm relative h-96">
                <img 
                  src="https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Featured look" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white font-medium">Get Recommendations</span>
                  <p className="text-white/90 text-sm mt-1">Start your style journey</p>
                </div>
              </div>
              
              {/* Recent outfit card */}
              <div className="rounded-2xl overflow-hidden bg-styleklick-soft-sand shadow-sm relative h-44">
                <img 
                  src="https://images.unsplash.com/photo-1582142306909-195724d33ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Recent outfit" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm">
                    <Check className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white font-medium">Recent</span>
                </div>
              </div>
              
              {/* Lookbook card */}
              <div className="rounded-2xl overflow-hidden bg-styleklick-soft-peach shadow-sm relative h-44">
                <img 
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Lookbook" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white font-medium">Lookbook</span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm">
                    <Plus className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Outfit Suggestions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Heart className="mr-3 h-5 w-5" /> 
              Recent Outfit Suggestions
            </h2>
            <Link to="/recommendations" className="text-styleklick-purple text-sm font-medium">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentOutfits.map((outfit) => (
              <div key={outfit.id} className="rounded-2xl overflow-hidden shadow-sm relative group h-64">
                <img 
                  src={outfit.image}
                  alt={`Outfit suggestion ${outfit.id}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm">
                    <Heart className={`h-4 w-4 ${outfit.saved ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                  </button>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
            <div className="rounded-2xl overflow-hidden bg-styleklick-soft-blue shadow-sm relative h-64 flex items-center justify-center">
              <Link to="/questionnaire" className="flex flex-col items-center p-6 text-center">
                <div className="bg-white rounded-full p-4 mb-4 shadow-sm">
                  <Plus className="h-6 w-6 text-styleklick-purple" />
                </div>
                <span className="font-medium text-gray-800">Get New Suggestions</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Saved Lookbook */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Saved Lookbook</h2>
            <Link to="/lookbook" className="text-styleklick-purple text-sm font-medium">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedLooks.map((look) => (
              <div key={look.id} className="rounded-2xl overflow-hidden shadow-sm relative group h-72">
                <img 
                  src={look.image}
                  alt={`Saved look ${look.id}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
            <div className="rounded-2xl overflow-hidden bg-styleklick-soft-peach shadow-sm relative h-72 flex items-center justify-center">
              <Link to="/lookbook" className="flex flex-col items-center p-6 text-center">
                <div className="bg-white rounded-full p-4 mb-4 shadow-sm">
                  <Plus className="h-6 w-6 text-styleklick-purple" />
                </div>
                <span className="font-medium text-gray-800">Create New Lookbook</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecommendationGrid;
