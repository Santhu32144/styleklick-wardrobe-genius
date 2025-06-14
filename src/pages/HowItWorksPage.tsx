
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Sparkles, Palette, Zap, Heart, Stars } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingIcons from '@/components/ui/loading-icons';

const HowItWorksPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-styleklick-purple/5 via-white to-styleklick-soft-pink/10 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <LoadingIcons size={32} className="mb-6" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold gradient-heading mb-6">
              Style Made
              <span className="block text-styleklick-purple">Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover your perfect style with AI-powered recommendations tailored just for you
            </p>
          </motion.div>
        </div>
      </div>

      {/* What is StyleNKlick Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What is StyleNKlick?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Your personal AI stylist that understands your unique body type, preferences, and lifestyle to create outfits that make you look and feel amazing.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center p-8 rounded-2xl bg-gradient-to-br from-styleklick-soft-blue to-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-styleklick-purple/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-styleklick-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered</h3>
              <p className="text-gray-600">Advanced algorithms analyze your preferences to deliver personalized style recommendations</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-8 rounded-2xl bg-gradient-to-br from-styleklick-soft-green to-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-styleklick-purple/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-styleklick-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized</h3>
              <p className="text-gray-600">Every recommendation is tailored to your body type, style preferences, and occasion</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-8 rounded-2xl bg-gradient-to-br from-styleklick-soft-peach to-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-styleklick-purple/10 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-styleklick-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant</h3>
              <p className="text-gray-600">Get style recommendations in seconds, not hours of browsing and guessing</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-styleklick-neutral-light/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-heading mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to your perfect style</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="space-y-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Step 1 */}
              <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-styleklick-purple text-white font-bold text-xl mb-4">1</div>
                  <h3 className="text-2xl font-bold mb-4">Tell Us About You</h3>
                  <p className="text-gray-600 text-lg">Answer a few quick questions about your style preferences, body type, and the occasion you're dressing for.</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-styleklick-purple/10 to-styleklick-purple/5 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-styleklick-purple" />
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div variants={fadeInUp} className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-styleklick-purple text-white font-bold text-xl mb-4">2</div>
                  <h3 className="text-2xl font-bold mb-4">AI Creates Your Look</h3>
                  <p className="text-gray-600 text-lg">Our AI analyzes your information and creates personalized outfit recommendations that flatter your unique style.</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-styleklick-purple/10 to-styleklick-purple/5 flex items-center justify-center">
                    <Sparkles className="h-16 w-16 text-styleklick-purple" />
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-styleklick-purple text-white font-bold text-xl mb-4">3</div>
                  <h3 className="text-2xl font-bold mb-4">Look Amazing</h3>
                  <p className="text-gray-600 text-lg">Get visual outfit recommendations with detailed explanations and shopping suggestions to complete your perfect look.</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-styleklick-purple/10 to-styleklick-purple/5 flex items-center justify-center">
                    <Stars className="h-16 w-16 text-styleklick-purple" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-heading mb-6">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our technology combines machine learning, body type analysis, and fashion expertise to deliver recommendations that actually work for you.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-gradient-to-br from-styleklick-soft-blue/50 to-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-styleklick-purple/10 rounded-lg flex items-center justify-center">
                <Palette className="h-6 w-6 text-styleklick-purple" />
              </div>
              <h4 className="font-semibold mb-2">Color Analysis</h4>
              <p className="text-sm text-gray-600">Matches colors to your skin tone</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-gradient-to-br from-styleklick-soft-green/50 to-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-styleklick-purple/10 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-styleklick-purple" />
              </div>
              <h4 className="font-semibold mb-2">Body Type AI</h4>
              <p className="text-sm text-gray-600">Identifies flattering silhouettes</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-gradient-to-br from-styleklick-soft-peach/50 to-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-styleklick-purple/10 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-styleklick-purple" />
              </div>
              <h4 className="font-semibold mb-2">Style Learning</h4>
              <p className="text-sm text-gray-600">Adapts to your preferences</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-gradient-to-br from-styleklick-soft-pink/50 to-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-styleklick-purple/10 rounded-lg flex items-center justify-center">
                <Stars className="h-6 w-6 text-styleklick-purple" />
              </div>
              <h4 className="font-semibold mb-2">Trend Analysis</h4>
              <p className="text-sm text-gray-600">Keeps you fashion-forward</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-styleklick-purple to-styleklick-purple-dark">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Style?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who've discovered their perfect style with StyleNKlick
            </p>
            <Button 
              className="bg-white text-styleklick-purple hover:bg-gray-50 text-lg px-8 py-4 rounded-full font-semibold" 
              asChild
            >
              <Link to="/questionnaire" className="flex items-center space-x-2">
                <span>Start Your Style Journey</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorksPage;
