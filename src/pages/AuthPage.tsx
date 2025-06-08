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
import { useAuth } from '@/hooks/use-auth';
import { Sparkles, Heart, Star } from 'lucide-react';

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
      
      if (userName) {
        setUserName(userName);
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

      if (data.user) {
        await updateProfile({
          name: userName
        });
      }
      
      toast({
        title: "Authentication successful",
        description: `Welcome ${userName}! You have been successfully logged in.`
      });

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8">
        <div className="container max-w-md mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-heading mb-2">StyleNKlick</h1>
            <p className="text-gray-600">Your AI-powered style companion</p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="space-y-1 text-center pb-4">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {authStep === AuthStep.INPUT 
                  ? "Welcome Back" 
                  : authStep === AuthStep.NAME 
                    ? "Tell us about you" 
                    : "Almost there!"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {authStep === AuthStep.INPUT 
                  ? "Sign in to discover your perfect style" 
                  : authStep === AuthStep.NAME 
                    ? "What should we call you?" 
                    : `Enter the code sent to ${otpSentTo}`}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {authStep === AuthStep.INPUT ? (
                <>
                  <Tabs defaultValue="phone" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                      <TabsTrigger value="phone" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Phone</TabsTrigger>
                      <TabsTrigger value="email" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Email</TabsTrigger>
                    </TabsList>
                    <TabsContent value="phone" className="space-y-4">
                      <PhoneEmailForm 
                        type="phone" 
                        onSubmit={(value) => handleSendOTP('phone', value)} 
                        isLoading={isLoading} 
                      />
                    </TabsContent>
                    <TabsContent value="email" className="space-y-4">
                      <PhoneEmailForm 
                        type="email" 
                        onSubmit={(value, userName) => handleSendOTP('email', value, userName)} 
                        isLoading={isLoading} 
                      />
                    </TabsContent>
                  </Tabs>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-3 text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <OAuthButtons isLoading={isLoading} />
                </>
              ) : authStep === AuthStep.NAME ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      value={userName} 
                      onChange={e => setUserName(e.target.value)} 
                      disabled={isLoading}
                      className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Button 
                      onClick={handleContinueWithName} 
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200" 
                      disabled={isLoading || !userName.trim()}
                    >
                      Continue
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleChangeContact} 
                      className="w-full h-12 border-gray-200 hover:bg-gray-50"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              ) : (
                <OTPForm 
                  onVerify={handleVerifyOTP} 
                  onChangeContact={handleChangeContact} 
                  isLoading={isLoading} 
                />
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Heart className="h-3 w-3 text-pink-500" />
                <span>Trusted by style enthusiasts worldwide</span>
              </div>
              <p className="text-xs text-center text-gray-400 leading-relaxed">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>

          {/* Floating elements for visual appeal */}
          <div className="fixed top-20 right-10 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="fixed bottom-32 left-10 w-3 h-3 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="fixed top-40 left-20 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse"></div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
