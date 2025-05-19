
import React, { useState } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../auth/AuthContext";
import { Menu, LogIn, User, LogOut, Camera, BookMarked, Sparkles } from "lucide-react";

interface NavLinkType {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const mainLinks: NavLinkType[] = [
    { path: "/how-it-works", label: "How It Works" },
    { path: "/questionnaire", label: "Style Quiz" },
    { path: "/outfit-coordination", label: "Outfit Coordinator" },
    { path: "/lookbook", label: "Lookbook" },
    { path: "/style-assistant", label: "AI Style Assistant", icon: <Sparkles className="h-4 w-4" /> },
    { path: "/location-posing", label: "Location Posing" },
  ];

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? "bg-styleklick-purple text-white"
        : "text-gray-700 hover:bg-styleklick-purple/10"
    }`;
  };

  const getMobileNavClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full ${
      isActive
        ? "bg-styleklick-purple text-white"
        : "text-gray-700 hover:bg-styleklick-purple/10"
    }`;
  };

  const getInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Camera
              strokeWidth={2.5}
              size={28}
              className="text-styleklick-purple"
            />
            <span className="text-xl font-bold tracking-tighter">StyleNKlick</span>
          </Link>

          <nav className="hidden lg:flex ml-10 space-x-1">
            {mainLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={getLinkClass(link.path)}>
                <div className="flex items-center gap-1">
                  {link.icon && <span className="h-4 w-4">{link.icon}</span>}
                  {link.label}
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                >
                  <Avatar className="h-8 w-8 border border-styleklick-purple/50">
                    <AvatarFallback className="bg-styleklick-purple text-white text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/lookbook" className="flex items-center cursor-pointer">
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Lookbook
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/style-assistant" className="flex items-center cursor-pointer">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Style Assistant
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm" className="hidden md:flex">
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Camera
                    strokeWidth={2.5}
                    size={24}
                    className="text-styleklick-purple"
                  />
                  <span className="text-lg font-bold">StyleNKlick</span>
                </Link>
                <nav className="grid gap-2">
                  {mainLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={getMobileNavClass(link.path)}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon && <span>{link.icon}</span>}
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-4">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className={getMobileNavClass("/profile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md mt-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <Button asChild className="w-full mt-4">
                      <Link
                        to="/auth"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
