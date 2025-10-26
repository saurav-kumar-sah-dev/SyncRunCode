import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiUsers, FiCode, FiAlertTriangle, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import Footer from '../components/Layout/Footer';

const TermsOfService = () => {
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
                  Terms of Service
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
          <section className="bg-gradient-to-r from-primary-500/5 to-purple-500/5 rounded-xl p-6 border border-primary-500/20">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center">
              <div className="p-2 rounded-lg bg-primary-600/20 mr-3">
                <FiCode className="w-5 h-5 text-primary-400" />
              </div>
              1. Introduction
            </h2>
            <div className="text-gray-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to SyncRunCode ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our online code compiler and IDE platform located at <span className="text-primary-400 font-medium">https://sync-run-code.vercel.app</span> (the "Service").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiUsers className="w-5 h-5 mr-2 text-primary-400" />
              2. Acceptance of Terms
            </h2>
            <div className="text-gray-300 space-y-3">
              <p>
                By creating an account, accessing, or using SyncRunCode, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p>
                You must be at least 13 years old to use this Service. If you are under 18, you must have parental consent to use our Service.
              </p>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Account Creation:</strong> You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p>
                <strong className="text-white">Account Security:</strong> You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
              </p>
              <p>
                <strong className="text-white">Account Termination:</strong> We reserve the right to suspend or terminate accounts that violate these Terms or engage in harmful activities.
              </p>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiAlertTriangle className="w-5 h-5 mr-2 text-primary-400" />
              4. Acceptable Use Policy
            </h2>
            <div className="text-gray-300 space-y-3">
              <p><strong className="text-white">You may use our Service to:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Write, compile, and execute code in supported programming languages</li>
                <li>Create and manage coding projects</li>
                <li>Collaborate with other users in real-time</li>
                <li>Learn programming and improve coding skills</li>
              </ul>
              
              <p className="mt-4"><strong className="text-white">You may NOT use our Service to:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Execute malicious code or malware</li>
                <li>Attempt to hack, disrupt, or damage our systems</li>
                <li>Share inappropriate, offensive, or illegal content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Spam or abuse other users</li>
                <li>Use the Service for commercial purposes without permission</li>
              </ul>
            </div>
          </section>

          {/* Code Execution */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Code Execution and Security</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Sandboxed Environment:</strong> All code execution occurs in a sandboxed environment with security restrictions. We implement timeout limits and resource constraints to protect our systems.
              </p>
              <p>
                <strong className="text-white">No Guarantee:</strong> While we strive to provide accurate code execution, we cannot guarantee that all code will run correctly or that results will be error-free.
              </p>
              <p>
                <strong className="text-white">Resource Limits:</strong> We reserve the right to limit execution time, memory usage, and other resources to ensure fair usage for all users.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Your Code:</strong> You retain ownership of the code you write using our Service. However, by using our Service, you grant us a limited license to store, process, and display your code as necessary to provide the Service.
              </p>
              <p>
                <strong className="text-white">Our Service:</strong> SyncRunCode and all its components, including the user interface, are owned by us and protected by intellectual property laws.
              </p>
              <p>
                <strong className="text-white">Open Source:</strong> Some components of our Service may use open source software, which is governed by their respective licenses.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Privacy</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information when you use our Service.
              </p>
              <p>
                By using our Service, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Disclaimers</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Service Availability:</strong> We strive to maintain high availability but cannot guarantee uninterrupted access to our Service.
              </p>
              <p>
                <strong className="text-white">Educational Purpose:</strong> Our Service is provided for educational and development purposes. We are not responsible for any decisions made based on code execution results.
              </p>
              <p>
                <strong className="text-white">Third-Party Content:</strong> We are not responsible for content created by users or third-party services integrated with our platform.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                To the maximum extent permitted by law, SyncRunCode shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.
              </p>
              <p>
                Our total liability to you for any claims arising from or relating to these Terms or the Service shall not exceed the amount you paid us for the Service in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Changes to Terms</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on our website and updating the "Last updated" date.
              </p>
              <p>
                Your continued use of the Service after any modifications constitutes acceptance of the updated Terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
              <div className="p-2 rounded-lg bg-primary-600/20 mr-3">
                <FiUsers className="w-5 h-5 text-primary-400" />
              </div>
              11. Contact Information
            </h2>
            <div className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base">
                If you have any questions about these Terms of Service, please contact us:
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
              <p>These Terms of Service are effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and will remain in effect except with respect to any changes in their provisions in the future.</p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsOfService;
