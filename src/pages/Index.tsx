
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FeatureHighlight from '../components/home/FeatureHighlight';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <FeatureHighlight />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
