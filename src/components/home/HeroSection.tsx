
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { user, profile } = useAuth();
  
  // Get user name or default welcome
  const getUserName = () => {
    if (profile?.name) return profile.name;
    if (user && user.email) {
      const email = user.email;
      // Extract name before @ in email
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "Fashion";
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
        alt="Fashion backdrop" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Welcome {getUserName()}
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 inline-block mb-8">
            <h2 className="text-xl md:text-2xl text-white font-medium">
              Your Trending Style
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="/questionnaire" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#F2A65A] text-white rounded-xl p-4 text-center shadow-lg">
                <h3 className="font-medium">Start New Style</h3>
              </div>
            </Link>
            
            <Link to="/style-calendar" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#58C1C5] text-white rounded-xl p-4 text-center shadow-lg">
                <h3 className="font-medium">Style Quiz</h3>
              </div>
            </Link>
            
            <Link to="/lookbook" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#F2837B] text-white rounded-xl p-4 text-center shadow-lg">
                <h3 className="font-medium">Your Lookbook</h3>
              </div>
            </Link>
            
            <Link to="/recommendations" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#C96BC9] text-white rounded-xl p-4 text-center shadow-lg">
                <h3 className="font-medium">Past Recommendations</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
