
import React from 'react';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-heading">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">Last Updated: May 1, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Introduction</h2>
            <p className="mb-6">
              StyleNKlick ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Personal Information:</strong> Name, email address, phone number, and other information you provide when creating an account or filling out forms.</li>
              <li className="mb-2"><strong>Style Preferences:</strong> Information about your fashion preferences, body type, and style goals collected through our questionnaires.</li>
              <li className="mb-2"><strong>Usage Data:</strong> Information about how you interact with our website, including which recommendations you view, save, or reject.</li>
              <li className="mb-2"><strong>Device Information:</strong> Information about your device, operating system, browser type, and IP address.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Provide personalized style recommendations</li>
              <li className="mb-2">Create and manage your account</li>
              <li className="mb-2">Process your requests and transactions</li>
              <li className="mb-2">Improve our services and develop new features</li>
              <li className="mb-2">Communicate with you about our services</li>
              <li className="mb-2">Analyze usage patterns and optimize user experience</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Compliance with Laws</h2>
            <p className="mb-6">
              StyleNKlick complies with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the European Union and the California Consumer Privacy Act (CCPA) for California residents.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Access the personal information we have about you</li>
              <li className="mb-2">Correct inaccurate personal information</li>
              <li className="mb-2">Delete your personal information</li>
              <li className="mb-2">Restrict or object to the processing of your personal information</li>
              <li className="mb-2">Receive your personal information in a structured, commonly used format</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mb-12">
              <strong>Email:</strong> privacy@styleklick.com<br />
              <strong>Address:</strong> StyleNKlick Privacy Office, 123 Fashion Street, Style City, SC 12345
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
