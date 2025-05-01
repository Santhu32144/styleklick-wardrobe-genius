
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
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
      onClose();
      setEmail('');
      setPhone('');
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Personalized Styling Help</DialogTitle>
          <DialogDescription>
            Let our expert stylists provide personalized fashion advice tailored just for you.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail size={16} />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone size={16} />
                <span>Phone</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={activeTab === "email"}
                />
                <p className="text-sm text-muted-foreground">
                  We'll send you styling advice and recommendations via email.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={activeTab === "phone"}
                />
                <p className="text-sm text-muted-foreground">
                  One of our stylists will text or call you to discuss your fashion needs.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="pt-4 text-center text-sm text-muted-foreground">
            <p>One of our stylists will reach out to you soon via email or phone.</p>
            <p className="mt-1">We're excited to help you look and feel your best!</p>
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Request Styling Help"}
            </Button>
          </DialogFooter>
        </form>
        
        <div className="text-center text-sm mt-2">
          <p>Need immediate assistance?</p>
          <a href="mailto:contact@styleklick.com" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
