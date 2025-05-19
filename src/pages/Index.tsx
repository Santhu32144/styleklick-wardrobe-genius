
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeatureHighlights from '../components/home/FeatureHighlights';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureHighlights />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
