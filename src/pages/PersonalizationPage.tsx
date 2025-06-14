
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Sparkles, Star, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const PersonalizationPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send this data to your backend
    // For now we'll just simulate a submission with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request sent!",
        description: "One of our stylists will reach out to you soon.",
        duration: 5000,
      });
      setEmail('');
      setPhone('');
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-indigo-200/30 rounded-full blur-lg"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          {/* Header with Gradient */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Get Personalized Styling Help
              </h1>
              <p className="text-purple-100 text-lg">
                Connect with our expert stylists for tailored fashion advice
              </p>
            </motion.div>
          </div>

          {/* Content Card */}
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/50 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm border border-purple-200/50 rounded-xl p-1">
                      <TabsTrigger 
                        value="email" 
                        className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                      >
                        <Mail size={16} />
                        <span className="font-medium">Email</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="phone" 
                        className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                      >
                        <Phone size={16} />
                        <span className="font-medium">Phone</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="email" className="mt-6">
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 shadow-lg">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Email address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={activeTab === "email"}
                            className="border-purple-200/50 focus:border-purple-400 bg-white/80 backdrop-blur-sm rounded-lg h-12"
                          />
                          <p className="text-sm text-gray-600 mt-3 flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-pink-500" />
                            We'll send you styling advice and recommendations via email.
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="phone" className="mt-6">
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 shadow-lg">
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Phone number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(123) 456-7890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required={activeTab === "phone"}
                            className="border-purple-200/50 focus:border-purple-400 bg-white/80 backdrop-blur-sm rounded-lg h-12"
                          />
                          <p className="text-sm text-gray-600 mt-3 flex items-center">
                            <User className="h-4 w-4 mr-2 text-purple-500" />
                            One of our stylists will text or call you to discuss your fashion needs.
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
                
                <motion.div 
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="font-semibold text-gray-700">What to expect</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    One of our stylists will reach out to you soon via email or phone.
                  </p>
                  <p className="text-sm text-purple-600 font-medium">
                    We're excited to help you look and feel your best! ✨
                  </p>
                </motion.div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white shadow-lg rounded-lg px-8 py-3 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Request Styling Help
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <motion.div 
                className="text-center text-sm mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-purple-200/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-gray-600 mb-2">Need immediate assistance?</p>
                <a 
                  href="mailto:contact@styleklick.com" 
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors duration-200"
                >
                  Contact our support team
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalizationPage;
