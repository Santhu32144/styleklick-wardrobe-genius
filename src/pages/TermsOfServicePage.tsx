
import React from 'react';
import Layout from '../components/layout/Layout';

const TermsOfServicePage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-heading">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">Last Updated: May 1, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Welcome to StyleNKlick</h2>
            <p className="mb-6">
              These Terms of Service ("Terms") govern your access to and use of StyleNKlick's website and services. By using our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Account Registration</h2>
            <p className="mb-6">
              To access certain features of our service, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account and keep your account information updated.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Acceptable Use</h2>
            <p className="mb-4">When using our services, you agree not to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Violate any applicable laws or regulations</li>
              <li className="mb-2">Use the services for any illegal or unauthorized purpose</li>
              <li className="mb-2">Attempt to interfere with or disrupt the integrity or performance of our services</li>
              <li className="mb-2">Collect or harvest any personal information from other users</li>
              <li className="mb-2">Impersonate any person or entity or falsely state your affiliation with a person or entity</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">AI and Recommendations</h2>
            <p className="mb-6">
              Our service uses artificial intelligence to provide fashion recommendations. These recommendations are generated based on the information you provide and our algorithms. While we strive for accuracy, we do not guarantee that all recommendations will perfectly match your style preferences or needs. The recommendations should be considered as suggestions only.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Intellectual Property</h2>
            <p className="mb-6">
              All content included on our website, such as text, graphics, logos, images, and software, is the property of StyleNKlick or our content suppliers and protected by copyright and other laws. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Limitation of Liability</h2>
            <p className="mb-6">
              In no event shall StyleNKlick, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p className="mb-12">
              If you have any questions about these Terms, please contact us at:<br />
              <strong>Email:</strong> legal@styleklick.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;
