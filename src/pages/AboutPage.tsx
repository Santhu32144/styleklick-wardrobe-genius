
import React from 'react';
import Layout from '../components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-heading">About StyleNKlick</h1>
          
          <div className="prose max-w-none">
            <p className="text-xl mb-6">
              Blending personal expression with AI-powered fashion — we're here to help you feel confident, stylish, and seen.
            </p>
            
            <p className="mb-6">
              At StyleNKlick, we believe that fashion is more than just clothing—it's a powerful form of self-expression. Our AI-powered platform is designed to understand your unique style preferences, body type, and lifestyle needs to create personalized fashion recommendations that truly reflect who you are.
            </p>
            
            <p className="mb-6">
              Whether you're preparing for a special occasion, refreshing your wardrobe, or simply exploring new style possibilities, our technology combines the art of fashion with the precision of artificial intelligence to guide you toward choices that will make you look and feel your best.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              We're on a mission to democratize personal styling and make fashion more accessible, enjoyable, and sustainable for everyone. By leveraging the latest advancements in AI, we aim to reduce decision fatigue and help you build a wardrobe that works for your unique needs.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Team</h2>
            <p className="mb-6">
              StyleNKlick was founded by a diverse team of fashion enthusiasts, tech innovators, and design thinkers who shared a vision of making personalized fashion advice available to everyone, not just those who can afford personal shoppers or stylists.
            </p>
            
            <p className="mb-12">
              Together, we're building a platform that respects individuality while providing guidance that helps you express yourself confidently through your style choices.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
