
import React from 'react';
import { Camera, Hanger, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingIconsProps {
  size?: number;
  className?: string;
}

const LoadingIcons = ({ size = 24, className = "" }: LoadingIconsProps) => {
  const iconVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div 
      className={`flex space-x-4 justify-center items-center ${className}`}
      variants={containerVariants}
      animate="animate"
    >
      <motion.div variants={iconVariants}>
        <Camera size={size} className="text-purple-500" />
      </motion.div>
      <motion.div variants={iconVariants}>
        <Hanger size={size} className="text-pink-500" />
      </motion.div>
      <motion.div variants={iconVariants}>
        <Search size={size} className="text-indigo-500" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingIcons;
