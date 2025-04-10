
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, Sparkles, ShoppingBag, Image, PencilRuler, Users } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-heading mb-6">How StyleNKlick Works</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our AI-powered platform creates personalized outfit recommendations tailored to your unique preferences and needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-24">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="p-8 bg-styleklick-purple/10 rounded-full">
                  <ClipboardCheck className="h-20 w-20 text-styleklick-purple" />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-4">1. Complete Your Style Questionnaire</h3>
                  <p className="text-gray-700 mb-6">
                    Answer questions about your body type, skin tone, style preferences, and the occasion you're dressing for. The more details you provide, the better your recommendations will be.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Provide your body measurements and type</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Share your personal style preferences</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Tell us about the occasion and destination</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 order-2 md:order-1">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-4">2. Our AI Generates Recommendations</h3>
                  <p className="text-gray-700 mb-6">
                    Our advanced style algorithm processes your information to create personalized outfit suggestions that are perfect for your body type, preferences, and the occasion.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Analyze what styles flatter your body type</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Match colors to your skin tone and preferences</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Consider occasion, destination, and weather</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-2 order-1 md:order-2 flex justify-center">
                <div className="p-8 bg-styleklick-purple/10 rounded-full">
                  <Sparkles className="h-20 w-20 text-styleklick-purple" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="p-8 bg-styleklick-purple/10 rounded-full">
                  <Image className="h-20 w-20 text-styleklick-purple" />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-4">3. View Your Personalized Outfits</h3>
                  <p className="text-gray-700 mb-6">
                    See visual representations of your recommended outfits, complete with detailed explanations of why they work for you and specific item recommendations.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>View outfit visualizations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Read detailed style explanations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Get specific item recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 order-2 md:order-1">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-4">4. Explore Multiple Options</h3>
                  <p className="text-gray-700 mb-6">
                    Browse through multiple outfit options, all tailored to your preferences. Need something different? You can regenerate recommendations until you find the perfect match.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Compare different outfit options</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Generate alternative recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-styleklick-purple">•</div>
                      <span>Find the perfect style for your needs</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-2 order-1 md:order-2 flex justify-center">
                <div className="p-8 bg-styleklick-purple/10 rounded-full">
                  <PencilRuler className="h-20 w-20 text-styleklick-purple" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8 gradient-heading">Ready to Elevate Your Style?</h2>
            <Button className="btn-primary text-lg" asChild>
              <Link to="/questionnaire" className="flex items-center space-x-2">
                <span>Try StyleNKlick Now</span>
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
