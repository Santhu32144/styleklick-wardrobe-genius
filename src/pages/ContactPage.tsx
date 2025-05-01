
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
        duration: 5000,
      });
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-heading">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white p-6 shadow-md rounded-lg">
              <CardContent className="flex flex-col items-center p-0">
                <div className="p-3 rounded-full bg-purple-100 mb-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <a href="mailto:support@styleklick.com" className="text-purple-600 hover:underline">
                  support@styleklick.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-6 shadow-md rounded-lg">
              <CardContent className="flex flex-col items-center p-0">
                <div className="p-3 rounded-full bg-purple-100 mb-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <a href="tel:+18001234567" className="text-purple-600 hover:underline">
                  +1 (800) 123-4567
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-6 shadow-md rounded-lg">
              <CardContent className="flex flex-col items-center p-0">
                <div className="p-3 rounded-full bg-purple-100 mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-center text-gray-600">
                  We usually respond within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Your name" 
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Your email address" 
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  rows={5} 
                  required 
                  placeholder="How can we help you?" 
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
