
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OTPFormProps {
  onVerify: (otp: string) => void;
  onChangeContact: () => void;
  isLoading: boolean;
}

const OTPFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Please enter the complete verification code.",
  }).max(6, {
    message: "Verification code should be exactly 6 digits.",
  }),
});

const OTPForm: React.FC<OTPFormProps> = ({ onVerify, onChangeContact, isLoading }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft]);

  const handleResendCode = () => {
    setTimeLeft(30);
    setCanResend(false);
  };

  const onSubmit = (values: z.infer<typeof OTPFormSchema>) => {
    onVerify(values.otp);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Code</AlertTitle>
          <AlertDescription>
            <p>Please enter the 6-digit code sent to your email.</p>
            <p className="mt-1">The code should look like "123456" in your email.</p>
            <p className="mt-1">If you don't see the code, check your spam folder.</p>
          </AlertDescription>
        </Alert>
        
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </Label>
              <FormControl>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="text-center text-lg font-mono h-12"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || form.watch('otp').length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {canResend ? (
              <button 
                type="button"
                className="text-primary hover:underline focus:outline-none"
                onClick={handleResendCode}
              >
                Resend code
              </button>
            ) : (
              <span>Resend code in {timeLeft}s</span>
            )}
          </p>
          
          <button 
            type="button"
            className="text-sm text-primary hover:underline focus:outline-none"
            onClick={onChangeContact}
          >
            Change email
          </button>
        </div>
      </form>
    </Form>
  );
};

export default OTPForm;
