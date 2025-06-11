
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Heart, Zap, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';

const Index = () => {
  const { user, profile } = useAuth();
  
  // Get user name or default welcome
  const getUserName = () => {
    if (profile?.name) return profile.name;
    if (user && user.email) {
      const email = user.email;
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          {/* Gradient Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl -z-10"></div>
          
          <motion.div 
            className="container mx-auto max-w-6xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-8" variants={itemVariants}>
              {user && (
                <motion.div 
                  className="text-lg text-gray-600 mb-4 bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block"
                  variants={itemVariants}
                >
                  Welcome back, {getUserName()}! ✨
                </motion.div>
              )}
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-transparent bg-clip-text"
                variants={itemVariants}
              >
                Find Your Perfect Style
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
                variants={itemVariants}
              >
                Get personalized outfit recommendations tailored to your unique style, 
                body type, and destination with our AI-powered fashion assistant.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 h-auto text-lg shadow-lg" 
                  asChild
                >
                  <Link to="/questionnaire" className="flex items-center space-x-2">
                    <Sparkles size={20} />
                    <span>Start Style Quiz</span>
                    <ArrowRight size={20} />
                  </Link>
                </Button>
              </motion.div>
              
              {!user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full px-8 py-6 h-auto text-lg backdrop-blur-sm bg-white/50" 
                    asChild
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Feature Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">AI-Powered</h3>
                <p className="text-gray-600">
                  Advanced AI analyzes your preferences to create perfect outfit combinations
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Personalized</h3>
                <p className="text-gray-600">
                  Tailored recommendations based on your body type, style, and occasion
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-pink-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-600 to-red-600 text-transparent bg-clip-text">Save & Share</h3>
                <p className="text-gray-600">
                  Create your lookbook and share your favorite styles with friends
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <motion.div 
            className="container mx-auto max-w-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized style recommendations in just three simple steps
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Palette className="h-8 w-8 text-white" />,
                  title: 'Complete Quiz',
                  description: 'Tell us about your style preferences and body type',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: <Zap className="h-8 w-8 text-white" />,
                  title: 'AI Analysis',
                  description: 'Our AI creates personalized recommendations for you',
                  gradient: 'from-indigo-500 to-blue-500'
                },
                {
                  icon: <Heart className="h-8 w-8 text-white" />,
                  title: 'Save & Enjoy',
                  description: 'Save your favorites and build your style collection',
                  gradient: 'from-pink-500 to-red-500'
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`bg-gradient-to-br ${step.gradient} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div 
            className="container mx-auto max-w-4xl text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Style?
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of users who have discovered their perfect style with our AI assistant.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-6 h-auto text-lg font-semibold shadow-lg" 
                asChild
              >
                <Link to="/questionnaire" className="flex items-center space-x-2">
                  <span>Get Started Now</span>
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
