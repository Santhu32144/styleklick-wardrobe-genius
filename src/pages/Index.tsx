
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeatureHighlight from '../components/home/FeatureHighlight';
import HowItWorks from '../components/home/HowItWorks';
import OutfitCategories from '../components/home/OutfitCategories';
import SlidingPhotoCarousel from '../components/home/SlidingPhotoCarousel';
import AIStyleInsights from '../components/home/AIStyleInsights';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureHighlight />
      <SlidingPhotoCarousel />
      <HowItWorks />
      <OutfitCategories />
      <AIStyleInsights />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
