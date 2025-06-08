
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface PhoneEmailFormProps {
  type: 'phone' | 'email';
  onSubmit: (value: string, userName?: string) => void;
  isLoading: boolean;
}

const PhoneEmailForm: React.FC<PhoneEmailFormProps> = ({
  type,
  onSubmit,
  isLoading
}) => {
  const phoneSchema = z.object({
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 digits"
    }).refine(val => /^\+?[0-9\s\-\(\)]+$/.test(val), {
      message: "Please enter a valid phone number"
    })
  });
  
  const emailSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address"
    }),
    userName: z.string().min(2, {
      message: "Username must be at least 2 characters"
    }).max(50, {
      message: "Username must not exceed 50 characters"
    })
  });

  const formSchema = type === 'phone' ? phoneSchema : emailSchema;
  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(type === 'phone' ? {
        phone: ''
      } : {
        email: '',
        userName: ''
      })
    }
  });
  
  const handleSubmit = (values: FormValues) => {
    if (type === 'phone') {
      const value = (values as z.infer<typeof phoneSchema>).phone;
      onSubmit(value);
    } else {
      const { email, userName } = values as z.infer<typeof emailSchema>;
      onSubmit(email, userName);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {type === 'email' && (
          <FormField 
            control={form.control} 
            name="userName" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="Your username" 
                    autoComplete="name" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        )}
        
        <FormField 
          control={form.control} 
          name={type as any} 
          render={({ field }) => (
            <FormItem>
              <FormLabel>{type === 'phone' ? 'Phone Number' : 'Email Address'}</FormLabel>
              <FormControl>
                <Input 
                  type={type === 'phone' ? 'tel' : 'email'} 
                  placeholder={type === 'phone' ? '+1 (555) 123-4567' : 'you@example.com'} 
                  autoComplete={type === 'phone' ? 'tel' : 'email'} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : `Send Verification Code to ${type === 'phone' ? 'Phone' : 'Email'}`}
        </Button>
        
        <p className="text-sm text-center text-muted-foreground">
          We'll send you a secure code to verify your identity.
          <br />
          No password needed.
        </p>
      </form>
    </Form>
  );
};

export default PhoneEmailForm;
