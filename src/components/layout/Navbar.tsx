
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          
          {user ? (
            <Button variant="outline" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
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
            
            {user ? (
              <Button variant="outline" onClick={() => { signOut(); toggleMenu(); }}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
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
