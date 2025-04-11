
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import OTPForm from '@/components/auth/OTPForm';
import PhoneEmailForm from '@/components/auth/PhoneEmailForm';
import OAuthButtons from '@/components/auth/OAuthButtons';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

enum AuthStep {
  INPUT = 'input',
  VERIFY = 'verify'
}

const AuthPage: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [contactValue, setContactValue] = useState('');
  const [otpSentTo, setOtpSentTo] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOTP = async (type: 'phone' | 'email', value: string) => {
    setIsLoading(true);
    try {
      let { error } = type === 'phone' 
        ? await supabase.auth.signInWithOtp({ phone: value })
        : await supabase.auth.signInWithOtp({ email: value });
      
      if (error) throw error;
      
      setContactMethod(type);
      setContactValue(value);
      setOtpSentTo(value);
      setAuthStep(AuthStep.VERIFY);
      
      toast({
        title: "Verification code sent",
        description: `We've sent a code to ${value}. Please enter it to continue.`,
      });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Failed to send verification code",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      // Use the correct parameter structure based on contact method
      const { data, error } = contactMethod === 'phone'
        ? await supabase.auth.verifyOtp({
            type: 'sms',
            phone: contactValue,
            token: otp
          })
        : await supabase.auth.verifyOtp({
            type: 'email',
            email: contactValue,
            token: otp
          });
      
      if (error) throw error;
      
      toast({
        title: "Authentication successful",
        description: "You have been successfully logged in.",
      });
      
      // Redirect to home or dashboard page
      navigate('/');
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification failed",
        description: error.message || "Invalid or expired code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeContact = () => {
    setAuthStep(AuthStep.INPUT);
    setOtpSentTo('');
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome to StyleNKlick</CardTitle>
            <CardDescription className="text-center">
              {authStep === AuthStep.INPUT 
                ? "Enter your phone or email to get started" 
                : `Enter the verification code sent to ${otpSentTo}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {authStep === AuthStep.INPUT ? (
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent value="phone">
                  <PhoneEmailForm 
                    type="phone" 
                    onSubmit={(value) => handleSendOTP('phone', value)} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
                <TabsContent value="email">
                  <PhoneEmailForm 
                    type="email" 
                    onSubmit={(value) => handleSendOTP('email', value)} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <OTPForm 
                onVerify={handleVerifyOTP} 
                onChangeContact={handleChangeContact}
                isLoading={isLoading}
              />
            )}

            {authStep === AuthStep.INPUT && (
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            )}

            {authStep === AuthStep.INPUT && <OAuthButtons isLoading={isLoading} />}
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-center text-muted-foreground mt-2">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AuthPage;
