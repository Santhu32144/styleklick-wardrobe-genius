
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OTPForm from '@/components/auth/OTPForm';
import PhoneEmailForm from '@/components/auth/PhoneEmailForm';
import OAuthButtons from '@/components/auth/OAuthButtons';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthContext';

enum AuthStep {
  INPUT = 'input',
  NAME = 'name',
  VERIFY = 'verify',
}

const AuthPage: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [contactValue, setContactValue] = useState('');
  const [userName, setUserName] = useState('');
  const [otpSentTo, setOtpSentTo] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();

  // Get return path and form data from location state if available
  const returnTo = location.state?.returnTo || '/';
  const formData = location.state?.formData;

  // Redirect authenticated users away from auth page
  useEffect(() => {
    if (user) {
      const redirectPath = returnTo;
      const state = formData ? { formData } : undefined;
      navigate(redirectPath, { state, replace: true });
    }
  }, [user, navigate, returnTo, formData]);

  const handleSendOTP = async (type: 'phone' | 'email', value: string, userName?: string) => {
    setIsLoading(true);
    try {
      let { error } = type === 'phone' 
        ? await supabase.auth.signInWithOtp({ phone: value }) 
        : await supabase.auth.signInWithOtp({ email: value });
      
      if (error) throw error;
      
      setContactMethod(type);
      setContactValue(value);
      setOtpSentTo(value);
      
      // If username is provided (from email flow), save it
      if (userName) {
        setUserName(userName);
        // Skip name step since we already have the name
        setAuthStep(AuthStep.VERIFY);
      } else {
        setAuthStep(AuthStep.NAME);
      }
      
      const messageText = type === 'phone'
        ? `We've sent a 6-digit code to ${value}. Please enter your name, and then the code to continue.`
        : `We've sent a 6-digit verification code to ${value}. Please verify your identity.`;
      
      toast({
        title: "Verification code sent",
        description: messageText
      });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Failed to send verification code",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithName = () => {
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive"
      });
      return;
    }
    setAuthStep(AuthStep.VERIFY);
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

      // After successful verification, update the user profile with the name
      if (data.user) {
        await updateProfile({
          name: userName
        });
        
        // Log to check if the name is being sent correctly
        console.log("Updating profile with name:", userName);
      }
      
      toast({
        title: "Authentication successful",
        description: `Welcome ${userName}! You have been successfully logged in.`
      });

      // Redirect will be handled by the useEffect when user state updates
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification failed",
        description: error.message || "Invalid or expired code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeContact = () => {
    setAuthStep(AuthStep.INPUT);
    setOtpSentTo('');
    setUserName('');
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-10 bg-gray-50">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome to StyleNKlick</CardTitle>
            <CardDescription className="text-center">
              {authStep === AuthStep.INPUT 
                ? "Enter your phone or email to get started" 
                : authStep === AuthStep.NAME 
                  ? "Please tell us your name" 
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
                    onSubmit={(value, userName) => handleSendOTP('email', value, userName)} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
              </Tabs>
            ) : authStep === AuthStep.NAME ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)} 
                    disabled={isLoading} 
                  />
                </div>
                <Button 
                  onClick={handleContinueWithName} 
                  className="w-full" 
                  disabled={isLoading || !userName.trim()}
                >
                  Continue
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleChangeContact} 
                  className="w-full"
                >
                  Back
                </Button>
              </div>
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
