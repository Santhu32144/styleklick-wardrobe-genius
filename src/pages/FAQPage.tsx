
import React from 'react';
import Layout from '../components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "How are style recommendations made?",
      answer: "Our AI analyzes your preferences, body type, occasion, and current fashion trends to create personalized style recommendations. We consider factors like color palette preferences, fit requirements, and your style profile from the questionnaire to deliver tailored suggestions."
    },
    {
      question: "Is this service free?",
      answer: "StyleNKlick offers both free and premium options. Basic style recommendations are available at no cost, while personalized styling sessions and advanced features may require a subscription. Check our pricing page for more details."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password. If you don't receive the email, please check your spam folder or contact our support team."
    },
    {
      question: "Can I save outfits for later reference?",
      answer: "Yes! Once logged in, you can save any recommended outfit to your personal lookbook. Access your saved outfits anytime from your profile page to revisit and plan your wardrobe."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI recommendations improve over time as you interact with the platform. The more feedback you provide by saving outfits and completing style questionnaires, the more accurate your recommendations become. We're continuously improving our algorithms based on user feedback and fashion expertise."
    },
    {
      question: "Can I upload my own photos for styling advice?",
      answer: "Yes, premium users can upload photos of their existing clothing items for integration into new outfit combinations. Our AI can also analyze photos of outfits you like to better understand your style preferences."
    },
    {
      question: "How do I provide feedback on recommendations?",
      answer: "Each recommendation includes options to like, dislike, or save the outfit. Your feedback helps our AI learn your preferences better. You can also provide detailed feedback through your account settings."
    },
    {
      question: "What if I don't like the recommendations?",
      answer: "If you're not satisfied with your recommendations, you can refresh for new options or adjust your style profile for more accurate suggestions. Our personalized styling option also allows you to work directly with a human stylist for more tailored advice."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-heading">Frequently Asked Questions</h1>
          <p className="text-lg mb-12">Find answers to common questions about StyleNKlick and our services.</p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="mb-4">
              If you couldn't find the answer you're looking for, please don't hesitate to contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors text-center">
                Contact Support
              </a>
              <a href="mailto:support@styleklick.com" className="inline-block bg-white text-purple-600 px-6 py-3 rounded-md border border-purple-300 hover:bg-purple-50 transition-colors text-center">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
