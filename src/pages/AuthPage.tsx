
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Sparkles, Mail } from 'lucide-react';

enum AuthStep {
  INPUT = 'input',
  VERIFY = 'verify',
}

const AuthPage: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [otp, setOtp] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();

  const returnTo = location.state?.returnTo || '/';
  const formData = location.state?.formData;

  useEffect(() => {
    if (user) {
      const redirectPath = returnTo;
      const state = formData ? { formData } : undefined;
      navigate(redirectPath, { state, replace: true });
    }
  }, [user, navigate, returnTo, formData]);

  const handleSendOTP = async () => {
    if (!email || !userName) {
      toast({
        title: "All fields required",
        description: "Please enter both email and username.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email: email,
        options: {
          data: {
            name: userName
          }
        }
      });
      
      if (error) throw error;
      
      setAuthStep(AuthStep.VERIFY);
      
      toast({
        title: "Verification code sent",
        description: `We've sent a 6-digit verification code to ${email}. Please check your email.`
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

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        type: 'email',
        email: email,
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

  const handleBack = () => {
    setAuthStep(AuthStep.INPUT);
    setOtp('');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="container max-w-md mx-auto">
          <div className="relative">
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
                    ? "Enter your details to get started" 
                    : `Enter the verification code sent to ${email}`}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {authStep === AuthStep.INPUT ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                        Username
                      </Label>
                      <Input 
                        id="username" 
                        placeholder="Enter your username" 
                        value={userName} 
                        onChange={e => setUserName(e.target.value)} 
                        disabled={isLoading}
                        className="h-12 bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="Enter your email address" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        disabled={isLoading}
                        className="h-12 bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSendOTP} 
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                      disabled={isLoading || !email.trim() || !userName.trim()}
                    >
                      {isLoading ? 'Sending...' : 'Send Verification Code'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                        Verification Code
                      </Label>
                      <Input 
                        id="otp" 
                        placeholder="Enter 6-digit code" 
                        value={otp} 
                        onChange={e => setOtp(e.target.value)} 
                        disabled={isLoading}
                        maxLength={6}
                        className="h-12 bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-center text-lg font-mono"
                      />
                      <p className="text-xs text-gray-500 text-center">
                        Check your email for the 6-digit verification code
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        onClick={handleVerifyOTP} 
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? 'Verifying...' : 'Verify Code'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleBack} 
                        className="w-full h-12 border-gray-200 hover:bg-gray-50"
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
