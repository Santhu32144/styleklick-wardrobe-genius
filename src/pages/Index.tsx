
import React from 'react';
import Layout from '../components/layout/Layout';
import RecommendationGrid from '../components/home/RecommendationGrid';
import OutfitCategories from '../components/home/OutfitCategories';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <RecommendationGrid />
      <OutfitCategories />
      <CallToAction />
    </Layout>
  );
};

export default Index;
