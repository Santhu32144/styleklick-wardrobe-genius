
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const AboutPage = () => {
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
      <motion.div 
        className="container mx-auto py-16 px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl font-bold mb-6 text-styleklick-airbnb-navy"
            variants={itemVariants}
          >
            About StyleNKlick
          </motion.h1>
          
          {/* Hero Section */}
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-airbnb mb-12"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-80">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000"
                alt="StyleNKlick Team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-2">Our Story</h2>
                <p className="text-white/90 max-w-2xl">
                  Blending personal expression with AI-powered fashion — we're here to help you feel confident, stylish, and seen.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4 text-styleklick-airbnb-navy">Our Mission</h2>
              <p className="text-styleklick-airbnb-gray-dark mb-4">
                At StyleNKlick, we believe that fashion is more than just clothing—it's a powerful form of self-expression.
              </p>
              <p className="text-styleklick-airbnb-gray-dark">
                Our AI-powered platform is designed to understand your unique style preferences, body type, and lifestyle needs to create personalized fashion recommendations that truly reflect who you are.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-styleklick-soft-peach p-6 rounded-2xl shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-styleklick-airbnb-navy">What We Do</h2>
              <p className="text-styleklick-airbnb-gray-dark">
                Whether you're preparing for a special occasion, refreshing your wardrobe, or simply exploring new style possibilities, our technology combines the art of fashion with the precision of artificial intelligence to guide you toward choices that will make you look and feel your best.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 mb-12"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-styleklick-airbnb-navy">Our Team</h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="hover-lift overflow-hidden border-none shadow-airbnb">
                    <div className="h-48 bg-gray-200">
                      <img 
                        src={`/placeholder.svg`}
                        alt={`Team Member ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Team Member {i}</h3>
                      <p className="text-sm text-styleklick-airbnb-gray-dark">Fashion Expert & Stylist</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-styleklick-soft-blue/30 rounded-2xl p-8 mb-12"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-styleklick-airbnb-navy">Our Values</h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[
                { title: "Inclusivity", desc: "Fashion for everyone, regardless of size, age, or background." },
                { title: "Sustainability", desc: "Promoting conscious fashion choices and sustainable brands." },
                { title: "Innovation", desc: "Using technology to create better fashion experiences." }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-styleklick-airbnb-gray-dark">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="prose max-w-none"
            variants={itemVariants}
          >
            <p className="mb-6 text-styleklick-airbnb-gray-dark">
              StyleNKlick was founded by a diverse team of fashion enthusiasts, tech innovators, and design thinkers who shared a vision of making personalized fashion advice available to everyone, not just those who can afford personal shoppers or stylists.
            </p>
            
            <p className="text-styleklick-airbnb-gray-dark">
              Together, we're building a platform that respects individuality while providing guidance that helps you express yourself confidently through your style choices.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
