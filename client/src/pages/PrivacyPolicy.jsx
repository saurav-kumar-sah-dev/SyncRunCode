import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiEye, FiDatabase, FiLock, FiUser, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import Footer from '../components/Layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-all duration-200 mb-6 group"
          >
            <FiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="p-3 rounded-xl bg-primary-600/20 mr-4">
                <FiShield className="w-8 h-8 text-primary-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Privacy Policy
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 shadow-2xl">
          
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiEye className="w-5 h-5 mr-2 text-primary-400" />
              1. Introduction
            </h2>
            <div className="text-gray-300 space-y-3">
              <p>
                This Privacy Policy explains how SyncRunCode ("we," "our," or "us") collects, uses, and protects your information when you use our online code compiler and IDE platform located at <span className="text-primary-400">https://sync-run-code.vercel.app</span> (the "Service").
              </p>
              <p>
                We are committed to protecting your privacy and ensuring the security of your personal information. By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiDatabase className="w-5 h-5 mr-2 text-primary-400" />
              2. Information We Collect
            </h2>
            <div className="text-gray-300 space-y-4">
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">2.1 Personal Information</h3>
                <p>When you create an account, we collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Password (encrypted and hashed)</li>
                  <li>Profile information (optional)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">2.2 Usage Information</h3>
                <p>We automatically collect information about how you use our Service:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Code you write and execute</li>
                  <li>Projects you create and manage</li>
                  <li>Collaboration activities</li>
                  <li>Execution history and results</li>
                  <li>Browser type and version</li>
                  <li>IP address and location data</li>
                  <li>Device information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">2.3 Cookies and Tracking</h3>
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Remember your login status</li>
                  <li>Store your preferences</li>
                  <li>Analyze usage patterns</li>
                  <li>Improve our Service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <div className="text-gray-300 space-y-3">
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide and maintain our Service</li>
                <li>Process your code execution requests</li>
                <li>Enable real-time collaboration features</li>
                <li>Save and manage your projects</li>
                <li>Send you important updates about the Service</li>
                <li>Improve our Service and develop new features</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Ensure security and prevent abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <div className="text-gray-300 space-y-4">
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">4.1 We Do NOT Share Your Personal Information</h3>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following limited circumstances:</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">4.2 Limited Sharing Scenarios</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong className="text-white">Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our Service (e.g., hosting providers, database services)</li>
                  <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                  <li><strong className="text-white">Business Transfers:</strong> In the event of a merger or acquisition, user information may be transferred as part of the business assets</li>
                  <li><strong className="text-white">Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">4.3 Public Information</h3>
                <p>If you choose to make your projects public, the code and project information will be visible to other users of our Service.</p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiLock className="w-5 h-5 mr-2 text-primary-400" />
              5. Data Security
            </h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Encryption:</strong> We use industry-standard encryption to protect your data both in transit and at rest.
              </p>
              <p>
                <strong className="text-white">Secure Storage:</strong> Your personal information is stored on secure servers with restricted access.
              </p>
              <p>
                <strong className="text-white">Password Protection:</strong> Passwords are hashed using bcrypt with salt before storage.
              </p>
              <p>
                <strong className="text-white">Regular Security Updates:</strong> We regularly update our systems and dependencies to address security vulnerabilities.
              </p>
              <p>
                <strong className="text-white">Access Controls:</strong> Only authorized personnel have access to user data, and access is logged and monitored.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Data Retention</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Account Data:</strong> We retain your account information for as long as your account is active or as needed to provide our Service.
              </p>
              <p>
                <strong className="text-white">Code and Projects:</strong> Your code and projects are stored until you delete them or your account is terminated.
              </p>
              <p>
                <strong className="text-white">Execution Logs:</strong> We may retain execution logs for a limited period for debugging and improvement purposes.
              </p>
              <p>
                <strong className="text-white">Account Deletion:</strong> When you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal or regulatory purposes.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-2 text-primary-400" />
              7. Your Rights and Choices
            </h2>
            <div className="text-gray-300 space-y-3">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                <li><strong className="text-white">Correction:</strong> Update or correct your personal information</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
                <li><strong className="text-white">Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong className="text-white">Opt-out:</strong> Unsubscribe from non-essential communications</li>
                <li><strong className="text-white">Account Closure:</strong> Delete your account at any time</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us using the information provided in the Contact section below.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Third-Party Services</h2>
            <div className="text-gray-300 space-y-3">
              <p>Our Service may integrate with third-party services:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong className="text-white">Vercel:</strong> Frontend hosting and deployment</li>
                <li><strong className="text-white">Render:</strong> Backend hosting and deployment</li>
                <li><strong className="text-white">MongoDB Atlas:</strong> Database hosting</li>
                <li><strong className="text-white">Cloudinary:</strong> File storage and management</li>
              </ul>
              <p className="mt-3">
                These third-party services have their own privacy policies. We encourage you to review their privacy policies to understand how they handle your information.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Children's Privacy</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we discover that we have collected personal information from a child under 13, we will delete such information promptly.
              </p>
            </div>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. International Users</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                Our Service is hosted and operated from various locations worldwide. If you are accessing our Service from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States and other countries.
              </p>
              <p>
                By using our Service, you consent to the transfer of your information to these countries and the processing of your information in accordance with this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Changes to This Privacy Policy</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
              <div className="p-2 rounded-lg bg-primary-600/20 mr-3">
                <FiUser className="w-5 h-5 text-primary-400" />
              </div>
              12. Contact Information
            </h2>
            <div className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Developer: Saurav Kumar Sah</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a 
                    href="https://github.com/saurav-kumar-sah-dev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200 group"
                  >
                    <FiGithub className="w-5 h-5 text-gray-400 group-hover:text-white mr-3" />
                    <span className="text-sm text-gray-300 group-hover:text-white">GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/sauravkumarsah-dev/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200 group"
                  >
                    <FiLinkedin className="w-5 h-5 text-gray-400 group-hover:text-white mr-3" />
                    <span className="text-sm text-gray-300 group-hover:text-white">LinkedIn</span>
                  </a>
                  <a 
                    href="https://saurav-portfolio-dun.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200 group"
                  >
                    <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white mr-3" />
                    <span className="text-sm text-gray-300 group-hover:text-white">Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Effective Date */}
          <section className="border-t border-gray-700 pt-6">
            <div className="text-gray-400 text-sm">
              <p>This Privacy Policy is effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and will remain in effect except with respect to any changes in its provisions in the future.</p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
