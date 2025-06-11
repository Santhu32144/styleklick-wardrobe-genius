
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Heart, Zap, Star, Wand } from 'lucide-react';
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
    return 'Fashion Lover';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Banner Section */}
        <section className="relative h-screen overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
              alt="Fashion banner" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-pink-800/60 to-indigo-900/70"></div>
          </div>
          
          {/* Content */}
          <motion.div 
            className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Welcome back, {getUserName()}!
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Discover your perfect style with AI-powered recommendations
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 h-auto text-lg shadow-xl" 
                  asChild
                >
                  <Link to="/questionnaire" className="flex items-center space-x-2">
                    <Sparkles size={24} />
                    <span>Start Style Quiz</span>
                    <ArrowRight size={24} />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white opacity-70"
              >
                <ArrowRight className="rotate-90" size={24} />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* What is StyleNKlick Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                What is StyleNKlick?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                StyleNKlick is your personal AI-powered fashion assistant that understands your unique style, 
                body type, and lifestyle to create perfect outfit recommendations tailored just for you.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-Powered Intelligence</h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms analyze fashion trends and your personal preferences
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Personalized Experience</h3>
                <p className="text-gray-600">
                  Every recommendation is tailored to your body type, style preferences, and occasion
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Save & Share</h3>
                <p className="text-gray-600">
                  Build your personal lookbook and share your favorite styles with friends
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Real World Use Cases Section */}
        <section className="py-20 px-4 bg-white">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Real-World Use Cases
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how StyleNKlick helps people in everyday situations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Star className="h-6 w-6 text-white" />,
                  title: 'Job Interviews',
                  description: 'Professional outfits that make the right impression',
                  gradient: 'from-blue-500 to-indigo-500'
                },
                {
                  icon: <Heart className="h-6 w-6 text-white" />,
                  title: 'Date Nights',
                  description: 'Romantic looks that boost your confidence',
                  gradient: 'from-pink-500 to-rose-500'
                },
                {
                  icon: <Users className="h-6 w-6 text-white" />,
                  title: 'Social Events',
                  description: 'Perfect outfits for parties and gatherings',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: <Zap className="h-6 w-6 text-white" />,
                  title: 'Daily Wear',
                  description: 'Comfortable yet stylish everyday looks',
                  gradient: 'from-green-500 to-teal-500'
                }
              ].map((useCase, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-br ${useCase.gradient} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    {useCase.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How Technology Works Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                How Our Technology Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced AI and machine learning power your personalized style experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  icon: <Users className="h-8 w-8 text-white" />,
                  title: 'Data Collection',
                  description: 'We analyze your style preferences, body type, lifestyle, and fashion goals through our interactive questionnaire',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  step: '02',
                  icon: <Wand className="h-8 w-8 text-white" />,
                  title: 'AI Processing',
                  description: 'Our advanced AI algorithms process thousands of fashion combinations and trends to find your perfect matches',
                  gradient: 'from-indigo-500 to-blue-500'
                },
                {
                  step: '03',
                  icon: <Sparkles className="h-8 w-8 text-white" />,
                  title: 'Smart Recommendations',
                  description: 'Receive personalized outfit suggestions with styling tips, shopping links, and coordination advice',
                  gradient: 'from-pink-500 to-red-500'
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                    <div className="text-right mb-4">
                      <span className="text-6xl font-bold text-gray-200">{step.step}</span>
                    </div>
                    <div className={`bg-gradient-to-br ${step.gradient} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* What StyleNKlick Does For You Section */}
        <section className="py-20 px-4 bg-white">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                What StyleNKlick Does For You
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your wardrobe and boost your confidence with our comprehensive fashion solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Zap className="h-12 w-12 text-purple-600" />,
                  title: 'Saves You Time',
                  description: 'No more hours spent deciding what to wear. Get instant outfit recommendations that work perfectly for any occasion.',
                  benefits: ['Instant recommendations', 'No decision fatigue', 'Quick styling solutions']
                },
                {
                  icon: <Star className="h-12 w-12 text-pink-600" />,
                  title: 'Boosts Confidence',
                  description: 'Feel amazing in outfits that flatter your body type and reflect your personal style authentically.',
                  benefits: ['Body-flattering fits', 'Personal style expression', 'Confidence building']
                },
                {
                  icon: <Wand className="h-12 w-12 text-indigo-600" />,
                  title: 'Expands Your Style',
                  description: 'Discover new fashion combinations and trends that you might never have considered before.',
                  benefits: ['Style exploration', 'Trend discovery', 'Fashion education']
                },
                {
                  icon: <Heart className="h-12 w-12 text-rose-600" />,
                  title: 'Builds Your Wardrobe',
                  description: 'Get smart shopping suggestions and learn how to mix and match your existing pieces effectively.',
                  benefits: ['Smart shopping', 'Wardrobe optimization', 'Cost-effective styling']
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
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
              Join thousands of users who have discovered their perfect style with StyleNKlick.
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
                  <span>Start Your Style Journey</span>
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
