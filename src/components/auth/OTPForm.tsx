
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

interface OTPFormProps {
  onVerify: (otp: string) => void;
  onChangeContact: () => void;
  isLoading: boolean;
}

const OTPFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Please enter the complete verification code.",
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
    // We would use the same function as before to resend the code
    setTimeLeft(30);
    setCanResend(false);
  };

  const onSubmit = (values: z.infer<typeof OTPFormSchema>) => {
    onVerify(values.otp);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex flex-col items-center gap-1">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
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
            Change phone/email
          </button>
        </div>
      </form>
    </Form>
  );
};

export default OTPForm;
