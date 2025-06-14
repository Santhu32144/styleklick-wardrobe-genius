
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, User, BookOpen, Lightbulb } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (profile?.name) {
      const nameParts = profile.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return profile.name.substring(0, 2).toUpperCase();
    }
    if (!user) return "?";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-heading">StyleNKlick</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-styleklick-purple font-medium">Home</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-styleklick-purple font-medium">How It Works</Link>
          <Link to="/questionnaire" className="text-gray-700 hover:text-styleklick-purple font-medium">Get Started</Link>
          <Link to="/suggestions" className="text-gray-700 hover:text-styleklick-purple font-medium">Suggestions</Link>
          <Link to="/personalization" className="text-gray-700 hover:text-styleklick-purple font-medium">
            Personalization
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src={profile?.avatar_url || ""} alt={user.email || "User"} />
                      <AvatarFallback className="bg-styleklick-purple text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/lookbook" className="flex items-center cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Lookbook</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button className="btn-primary">
              <Link to="/auth" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-styleklick-purple font-medium py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-styleklick-purple font-medium py-2" onClick={toggleMenu}>How It Works</Link>
            <Link to="/questionnaire" className="text-gray-700 hover:text-styleklick-purple font-medium py-2" onClick={toggleMenu}>Get Started</Link>
            <Link to="/suggestions" className="text-gray-700 hover:text-styleklick-purple font-medium py-2" onClick={toggleMenu}>Suggestions</Link>
            <Link to="/personalization" className="text-gray-700 hover:text-styleklick-purple font-medium py-2" onClick={toggleMenu}>
              Personalization
            </Link>
            
            {user ? (
              <>
                <Link to="/profile" className="text-styleklick-purple font-medium py-2" onClick={toggleMenu}>
                  <User className="inline mr-1 h-4 w-4" /> My Profile
                </Link>
                <Link to="/lookbook" className="text-styleklick-purple font-medium py-2" onClick={toggleMenu}>
                  <BookOpen className="inline mr-1 h-4 w-4" /> My Lookbook
                </Link>
                <Button variant="outline" onClick={() => { signOut(); toggleMenu(); }} className="justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button className="btn-primary w-full">
                <Link to="/auth" className="flex items-center justify-center w-full" onClick={toggleMenu}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
