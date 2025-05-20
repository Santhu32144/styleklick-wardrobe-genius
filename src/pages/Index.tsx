
import React from 'react';
import Layout from '../components/layout/Layout';
import RecommendationGrid from '../components/home/RecommendationGrid';
import OutfitCategories from '../components/home/OutfitCategories';
import CallToAction from '../components/home/CallToAction';
import HeroSection from '../components/home/HeroSection';
import { useAuth } from '@/hooks/use-auth';

const Index = () => {
  const { user, profile } = useAuth();
  
  return (
    <Layout>
      <HeroSection />
      <RecommendationGrid />
      <OutfitCategories />
      <CallToAction />
    </Layout>
  );
};

export default Index;
