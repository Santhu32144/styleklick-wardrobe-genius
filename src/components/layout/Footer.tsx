
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, Info, Book, Shield, Gavel, File } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold gradient-heading">StyleNKlick</Link>
            <p className="mt-4 text-gray-600">Your AI-powered personal stylist for any occasion.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-styleklick-purple">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-styleklick-purple">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-styleklick-purple">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-styleklick-purple">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-styleklick-purple">Home</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-styleklick-purple">How It Works</Link></li>
              <li><Link to="/questionnaire" className="text-gray-600 hover:text-styleklick-purple">Get Started</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" />
              About Us
            </h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-styleklick-purple flex items-center">
                <Book className="mr-2 h-4 w-4" />About Us
              </Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-styleklick-purple flex items-center">
                <Mail className="mr-2 h-4 w-4" />Contact
              </Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-styleklick-purple flex items-center">
                <File className="mr-2 h-4 w-4" />FAQ
              </Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Legal
            </h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-styleklick-purple flex items-center">
                <Shield className="mr-2 h-4 w-4" />Privacy Policy
              </Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-styleklick-purple flex items-center">
                <Gavel className="mr-2 h-4 w-4" />Terms of Service
              </Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-gray-600 mt-0.5" />
                <span className="text-gray-600">support@styleklick.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-gray-600 mt-0.5" />
                <span className="text-gray-600">+1 (800) 123-4567</span>
              </li>
              <li className="text-gray-600 mt-2">
                We usually respond within 24 hours.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} StyleNKlick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
