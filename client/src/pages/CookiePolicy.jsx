import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiSettings, FiEye, FiFileText, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import Footer from '../components/Layout/Footer';

const CookiePolicy = () => {
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
                <FiFileText className="w-8 h-8 text-primary-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Cookie Policy
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
              1. What Are Cookies?
            </h2>
            <div className="text-gray-300 space-y-3">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.
              </p>
              <p>
                SyncRunCode uses cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our Service.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiSettings className="w-5 h-5 mr-2 text-primary-400" />
              2. Types of Cookies We Use
            </h2>
            <div className="text-gray-300 space-y-4">
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">2.1 Essential Cookies</h3>
                <p>These cookies are necessary for the Service to function properly:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li><strong className="text-white">Authentication:</strong> Remember your login status</li>
                  <li><strong className="text-white">Security:</strong> Protect against CSRF attacks</li>
                  <li><strong className="text-white">Session Management:</strong> Maintain your active session</li>
                  <li><strong className="text-white">Preferences:</strong> Remember your editor settings and theme</li>
                </ul>
                <p className="mt-2 text-sm text-gray-400">
                  These cookies cannot be disabled as they are essential for the Service to work.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">2.2 Functional Cookies</h3>
                <p>These cookies enhance your experience by remembering your preferences:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li><strong className="text-white">Theme Settings:</strong> Remember your dark/light mode preference</li>
                  <li><strong className="text-white">Editor Settings:</strong> Font size, tab size, and other editor preferences</li>
                  <li><strong className="text-white">Language Settings:</strong> Remember your preferred programming language</li>
                  <li><strong className="text-white">UI Preferences:</strong> Panel sizes, layout preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">2.3 Analytics Cookies</h3>
                <p>These cookies help us understand how you use our Service:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li><strong className="text-white">Usage Statistics:</strong> Track which features are most used</li>
                  <li><strong className="text-white">Performance Monitoring:</strong> Monitor Service performance</li>
                  <li><strong className="text-white">Error Tracking:</strong> Identify and fix issues</li>
                  <li><strong className="text-white">User Behavior:</strong> Understand how users navigate the Service</li>
                </ul>
                <p className="mt-2 text-sm text-gray-400">
                  This data is anonymized and used only to improve our Service.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Third-Party Cookies</h2>
            <div className="text-gray-300 space-y-3">
              <p>Our Service may use third-party services that set their own cookies:</p>
              
              <div className="bg-gray-800 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium text-white mb-2">Third-Party Services:</h3>
                <ul className="space-y-2">
                  <li>
                    <strong className="text-white">Vercel:</strong> Frontend hosting and analytics
                    <br />
                    <span className="text-sm text-gray-400">Privacy Policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">https://vercel.com/legal/privacy-policy</a></span>
                  </li>
                  <li>
                    <strong className="text-white">Render:</strong> Backend hosting and monitoring
                    <br />
                    <span className="text-sm text-gray-400">Privacy Policy: <a href="https://render.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">https://render.com/privacy</a></span>
                  </li>
                  <li>
                    <strong className="text-white">MongoDB Atlas:</strong> Database hosting
                    <br />
                    <span className="text-sm text-gray-400">Privacy Policy: <a href="https://www.mongodb.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">https://www.mongodb.com/legal/privacy-policy</a></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Management */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Managing Your Cookie Preferences</h2>
            <div className="text-gray-300 space-y-4">
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">4.1 Browser Settings</h3>
                <p>You can control cookies through your browser settings:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li><strong className="text-white">Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong className="text-white">Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong className="text-white">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong className="text-white">Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">4.2 Service Settings</h3>
                <p>Within our Service, you can:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Change your theme preferences</li>
                  <li>Adjust editor settings</li>
                  <li>Manage your account preferences</li>
                  <li>Clear your execution history</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-300 mb-2">⚠️ Important Note</h3>
                <p className="text-yellow-200">
                  Disabling essential cookies may prevent certain features of our Service from working properly, including authentication and real-time collaboration.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Duration */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Cookie Duration</h2>
            <div className="text-gray-300 space-y-3">
              <p>Cookies have different lifespans:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong className="text-white">Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong className="text-white">Persistent Cookies:</strong> Remain on your device for a set period (typically 30 days to 1 year)</li>
                <li><strong className="text-white">Authentication Cookies:</strong> Typically expire after 7 days of inactivity</li>
                <li><strong className="text-white">Preference Cookies:</strong> Remain until you clear them or they expire</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiShield className="w-5 h-5 mr-2 text-primary-400" />
              6. Data Protection and Security
            </h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Secure Transmission:</strong> All cookies are transmitted over secure HTTPS connections.
              </p>
              <p>
                <strong className="text-white">Encrypted Storage:</strong> Sensitive information in cookies is encrypted.
              </p>
              <p>
                <strong className="text-white">Limited Access:</strong> Only our Service can access the cookies we set.
              </p>
              <p>
                <strong className="text-white">Regular Review:</strong> We regularly review and update our cookie practices to ensure they align with privacy best practices.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights Regarding Cookies</h2>
            <div className="text-gray-300 space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Accept or reject non-essential cookies</li>
                <li>Delete cookies from your device</li>
                <li>Modify your browser settings to control cookies</li>
                <li>Request information about the cookies we use</li>
                <li>Withdraw your consent at any time</li>
              </ul>
              <p className="mt-3">
                Please note that disabling certain cookies may affect the functionality of our Service.
              </p>
            </div>
          </section>

          {/* Updates to Cookie Policy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Updates to This Cookie Policy</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                We will notify you of any material changes by posting the updated Cookie Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
              <div className="p-2 rounded-lg bg-primary-600/20 mr-3">
                <FiSettings className="w-5 h-5 text-primary-400" />
              </div>
              9. Contact Information
            </h2>
            <div className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base">
                If you have any questions about this Cookie Policy or our use of cookies, please contact us:
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
              <p>This Cookie Policy is effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and will remain in effect except with respect to any changes in its provisions in the future.</p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CookiePolicy;
