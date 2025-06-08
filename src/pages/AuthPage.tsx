
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
import { Sparkles, Mail, Phone } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="container max-w-md mx-auto">
          {/* Modern Auth Card */}
          <div className="relative">
            {/* Background decorations */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <Card className="relative backdrop-blur-sm bg-white/90 border border-white/20 shadow-2xl">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to StyleNKlick
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {authStep === AuthStep.INPUT 
                    ? "Discover your perfect style with AI" 
                    : authStep === AuthStep.NAME 
                      ? "Tell us your name to personalize your experience" 
                      : `Enter the verification code sent to ${otpSentTo}`}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {authStep === AuthStep.INPUT ? (
                  <div className="space-y-6">
                    <Tabs defaultValue="phone" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100/50">
                        <TabsTrigger value="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </TabsTrigger>
                        <TabsTrigger value="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="phone" className="mt-6">
                        <PhoneEmailForm 
                          type="phone" 
                          onSubmit={(value) => handleSendOTP('phone', value)} 
                          isLoading={isLoading} 
                        />
                      </TabsContent>
                      <TabsContent value="email" className="mt-6">
                        <PhoneEmailForm 
                          type="email" 
                          onSubmit={(value, userName) => handleSendOTP('email', value, userName)} 
                          isLoading={isLoading} 
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : authStep === AuthStep.NAME ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Your Name
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your full name" 
                        value={userName} 
                        onChange={e => setUserName(e.target.value)} 
                        disabled={isLoading}
                        className="h-12 bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <Button 
                        onClick={handleContinueWithName} 
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                        disabled={isLoading || !userName.trim()}
                      >
                        Continue to Verification
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

                {authStep === AuthStep.INPUT && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-gray-500 font-medium">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <OAuthButtons isLoading={isLoading} />
                  </>
                )}
              </CardContent>
              
              <CardFooter className="pt-6">
                <p className="text-xs text-center text-gray-500 w-full leading-relaxed">
                  By continuing, you agree to our{' '}
                  <span className="text-purple-600 hover:underline cursor-pointer">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-purple-600 hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
