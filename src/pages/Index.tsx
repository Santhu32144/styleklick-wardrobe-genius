
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import OutfitCategories from '../components/home/OutfitCategories';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <OutfitCategories />
      <CallToAction />
    </Layout>
  );
};

export default Index;
