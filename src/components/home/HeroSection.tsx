
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { user, profile } = useAuth();
  
  // Get user name or default welcome
  const getUserName = () => {
    // Primary: Use the profile name if it exists
    if (profile?.name) {
      return profile.name;
    }
    
    // Fallback: Use email username part if user exists but no profile name
    if (user?.email) {
      const emailUsername = user.email.split('@')[0];
      // Capitalize first letter
      return emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
    }
    
    // Default: Generic welcome for non-authenticated users
    return "to StyleNKlick";
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden flex items-center">
      {/* Background Image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
          alt="Fashion backdrop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          {user && (
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 inline-block mb-6">
              <p className="text-white font-medium">Welcome back, {getUserName()}!</p>
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {user ? `${getUserName()}'s` : 'Personalized'} fashion, <span className="text-styleklick-soft-green">powered by AI.</span><br/>
            <span className="text-sm md:text-xl lg:text-2xl font-normal opacity-90 mt-2 block">
              From city streets to sandy shores.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Discover the outfit that suits your vibe, destination, and style — instantly.
            {user && ` Just for you, ${getUserName()}.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-styleklick-soft-green hover:bg-styleklick-soft-green/90 text-gray-800 rounded-full px-8 py-6 h-auto text-lg shadow-lg" asChild>
              <Link to="/questionnaire" className="flex items-center gap-2">
                <span>Start Styling</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
            
            <Button variant="outline" className="border-white text-white hover:bg-white/20 rounded-full px-8 py-6 h-auto text-lg" asChild>
              <Link to="/how-it-works">Explore How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
