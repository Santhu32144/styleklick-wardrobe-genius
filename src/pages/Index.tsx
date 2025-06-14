
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Heart, Zap, Star, Wand, Camera, Calendar, Book, Palette } from 'lucide-react';
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
        duration: 0.6
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Enhanced Hero Banner Section */}
        <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
              alt="Fashion banner" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-800/70 to-indigo-900/80"></div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 text-white/20"
            variants={floatingVariants}
            animate="animate"
          >
            <Sparkles size={60} />
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-white/20"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            <Heart size={80} />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-20 text-white/20"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          >
            <Star size={70} />
          </motion.div>
          
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
              className="max-w-5xl"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 text-transparent bg-clip-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Welcome back, {getUserName()}!
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-12 opacity-90"
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-12 py-8 h-auto text-xl shadow-2xl border-2 border-white/20" 
                  asChild
                >
                  <Link to="/questionnaire" className="flex items-center space-x-3">
                    <Sparkles size={28} />
                    <span>Start Style Quiz</span>
                    <ArrowRight size={28} />
                  </Link>
                </Button>
              </motion.div>

              {/* Quick Navigation Cards */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { to: "/questionnaire", icon: <Palette size={24} />, label: "Style Quiz", color: "from-purple-500 to-pink-500" },
                  { to: "/style-calendar", icon: <Calendar size={24} />, label: "Style Calendar", color: "from-blue-500 to-indigo-500" },
                  { to: "/lookbook", icon: <Book size={24} />, label: "My Lookbook", color: "from-pink-500 to-rose-500" },
                  { to: "/location-posing", icon: <Camera size={24} />, label: "Posing Ideas", color: "from-green-500 to-teal-500" }
                ].map((item, index) => (
                  <motion.div key={index} variants={itemVariants} whileHover={{ y: -5, scale: 1.05 }}>
                    <Link to={item.to} className="block">
                      <div className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-6 text-center shadow-xl border border-white/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}>
                        <div className="mb-3">{item.icon}</div>
                        <h3 className="font-medium text-sm">{item.label}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-white opacity-80 flex flex-col items-center"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <ArrowRight className="rotate-90" size={24} />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* What is StyleNKlick Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500 rounded-full"></div>
          </div>
          
          <motion.div 
            className="container mx-auto max-w-6xl relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                What is StyleNKlick?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                StyleNKlick is your personal AI-powered fashion assistant that understands your unique style, 
                body type, and lifestyle to create perfect outfit recommendations tailored just for you.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
              variants={containerVariants}
            >
              {[
                {
                  icon: <Sparkles className="h-10 w-10 text-white" />,
                  title: "AI-Powered Intelligence",
                  description: "Advanced machine learning algorithms analyze fashion trends and your personal preferences",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Users className="h-10 w-10 text-white" />,
                  title: "Personalized Experience",
                  description: "Every recommendation is tailored to your body type, style preferences, and occasion",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: <Heart className="h-10 w-10 text-white" />,
                  title: "Save & Share",
                  description: "Build your personal collection and share your favorite styles with friends",
                  gradient: "from-pink-500 to-red-500"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/30 text-center hover:shadow-2xl transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -15, scale: 1.05 }}
                >
                  <div className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Real World Use Cases Section */}
        <section className="py-24 px-4 bg-white relative overflow-hidden">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Real-World Use Cases
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                See how StyleNKlick helps people in everyday situations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Star className="h-8 w-8 text-white" />,
                  title: 'Job Interviews',
                  description: 'Professional outfits that make the right impression',
                  gradient: 'from-blue-500 to-indigo-500',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
                },
                {
                  icon: <Heart className="h-8 w-8 text-white" />,
                  title: 'Date Nights',
                  description: 'Romantic looks that boost your confidence',
                  gradient: 'from-pink-500 to-rose-500',
                  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop'
                },
                {
                  icon: <Users className="h-8 w-8 text-white" />,
                  title: 'Social Events',
                  description: 'Perfect outfits for parties and gatherings',
                  gradient: 'from-purple-500 to-pink-500',
                  image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop'
                },
                {
                  icon: <Zap className="h-8 w-8 text-white" />,
                  title: 'Daily Wear',
                  description: 'Comfortable yet stylish everyday looks',
                  gradient: 'from-green-500 to-teal-500',
                  image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop'
                }
              ].map((useCase, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl border hover:shadow-2xl transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.03 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-4 left-4 bg-gradient-to-br ${useCase.gradient} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                      {useCase.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How Technology Works Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                How Our Technology Works
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Advanced AI and machine learning power your personalized style experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: '01',
                  icon: <Users className="h-10 w-10 text-white" />,
                  title: 'Data Collection',
                  description: 'We analyze your style preferences, body type, lifestyle, and fashion goals through our interactive questionnaire',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  step: '02',
                  icon: <Wand className="h-10 w-10 text-white" />,
                  title: 'AI Processing',
                  description: 'Our advanced AI algorithms process thousands of fashion combinations and trends to find your perfect matches',
                  gradient: 'from-indigo-500 to-blue-500'
                },
                {
                  step: '03',
                  icon: <Sparkles className="h-10 w-10 text-white" />,
                  title: 'Smart Recommendations',
                  description: 'Receive personalized outfit suggestions with styling tips, shopping links, and coordination advice',
                  gradient: 'from-pink-500 to-red-500'
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ y: -15 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-8xl font-bold text-gray-100 -mr-4 -mt-4">
                      {step.step}
                    </div>
                    <div className={`bg-gradient-to-br ${step.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg relative z-10`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-6 relative z-10">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed relative z-10">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* What StyleNKlick Does For You Section */}
        <section className="py-24 px-4 bg-white relative overflow-hidden">
          <motion.div 
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                What StyleNKlick Does For You
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Transform your wardrobe and boost your confidence with our comprehensive fashion solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  icon: <Zap className="h-16 w-16 text-purple-600" />,
                  title: 'Saves You Time',
                  description: 'No more hours spent deciding what to wear. Get instant outfit recommendations that work perfectly for any occasion.',
                  benefits: ['Instant recommendations', 'No decision fatigue', 'Quick styling solutions']
                },
                {
                  icon: <Star className="h-16 w-16 text-pink-600" />,
                  title: 'Boosts Confidence',
                  description: 'Feel amazing in outfits that flatter your body type and reflect your personal style authentically.',
                  benefits: ['Body-flattering fits', 'Personal style expression', 'Confidence building']
                },
                {
                  icon: <Wand className="h-16 w-16 text-indigo-600" />,
                  title: 'Expands Your Style',
                  description: 'Discover new fashion combinations and trends that you might never have considered before.',
                  benefits: ['Style exploration', 'Trend discovery', 'Fashion education']
                },
                {
                  icon: <Heart className="h-16 w-16 text-rose-600" />,
                  title: 'Builds Your Wardrobe',
                  description: 'Get smart shopping suggestions and learn how to mix and match your existing pieces effectively.',
                  benefits: ['Smart shopping', 'Wardrobe optimization', 'Cost-effective styling']
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 shadow-xl border hover:shadow-2xl transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="mb-8">
                    {benefit.icon}
                  </div>
                  <h3 className="text-3xl font-semibold mb-6">{benefit.title}</h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{benefit.description}</p>
                  <ul className="space-y-3">
                    {benefit.benefits.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center text-gray-500"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          <motion.div 
            className="container mx-auto max-w-5xl text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Style?
            </motion.h2>
            <motion.p 
              className="text-xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of users who have discovered their perfect style with StyleNKlick. 
              Start your personalized fashion journey today.
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
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-12 py-8 h-auto text-xl font-semibold shadow-2xl border-2 border-white/20" 
                asChild
              >
                <Link to="/questionnaire" className="flex items-center space-x-3">
                  <span>Start Your Style Journey</span>
                  <ArrowRight size={24} />
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
