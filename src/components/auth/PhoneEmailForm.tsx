import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
interface PhoneEmailFormProps {
  type: 'phone' | 'email';
  onSubmit: (value: string) => void;
  isLoading: boolean;
}
const PhoneEmailForm: React.FC<PhoneEmailFormProps> = ({
  type,
  onSubmit,
  isLoading
}) => {
  // Define separate schemas for phone and email
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
    })
  });

  // Use the appropriate schema based on the type
  const formSchema = type === 'phone' ? phoneSchema : emailSchema;
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(type === 'phone' ? {
        phone: ''
      } : {
        email: ''
      })
    }
  });
  const handleSubmit = (values: FormValues) => {
    // Correctly extract the value based on the form type
    const value = type === 'phone' ? (values as z.infer<typeof phoneSchema>).phone : (values as z.infer<typeof emailSchema>).email;
    onSubmit(value);
  };
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField control={form.control} name={type as any} render={({
        field
      }) => <FormItem className="addtion to that email\nask username also addtion to the email address in next line">
              <FormLabel>{type === 'phone' ? 'Phone Number' : 'Email Address'}</FormLabel>
              <FormControl>
                <Input type={type === 'phone' ? 'tel' : 'email'} placeholder={type === 'phone' ? '+1 (555) 123-4567' : 'you@example.com'} autoComplete={type === 'phone' ? 'tel' : 'email'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : `Send Verification Code to ${type === 'phone' ? 'Phone' : 'Email'}`}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          We'll send you a secure code to verify your identity.
          <br />
          No password needed.
        </p>
      </form>
    </Form>;
};
export default PhoneEmailForm;