import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiCode, FiZap, FiShield, FiGlobe, FiMail, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-primary-500/5"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-primary-500/25">
                    <FiCode className="text-white text-xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    SyncRunCode
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">Online Code Compiler</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Compile and run your code online with support for multiple programming languages. 
                Fast, secure, and developer-friendly.
              </p>
              
              {/* Feature Icons */}
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <FiZap className="text-yellow-400" />
                  <span>Fast</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiShield className="text-green-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiGlobe className="text-blue-400" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'Compiler', path: '/compiler' },
                  { name: 'Projects', path: '/projects' },
                  { name: 'Profile', path: '/profile' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-primary-400 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative">
                Legal
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Privacy Policy', path: '/privacy' },
                  { name: 'Terms of Service', path: '/terms' },
                  { name: 'Cookie Policy', path: '/cookies' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-primary-400 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative">
                Connect
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></div>
              </h4>
              
              {/* Contact Info */}
              <div className="mb-6">
                <a 
                  href="https://saurav-portfolio-dun.vercel.app/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 text-sm mb-2 group hover:text-primary-400 transition-colors"
                >
                  <FiMail className="mr-3 text-primary-400 group-hover:animate-pulse" />
                  <span>Contact Me</span>
                </a>
                <p className="text-gray-500 text-xs ml-6">sauravshubham903@gmail.com</p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm font-medium">Follow us</p>
                <div className="flex space-x-3">
                  {[
                    { 
                      href: 'https://github.com/saurav-kumar-sah-dev', 
                      icon: FiGithub, 
                      label: 'GitHub',
                      color: 'hover:text-gray-300'
                    },
                    { 
                      href: 'https://www.linkedin.com/in/sauravkumarsah-dev/', 
                      icon: FiLinkedin, 
                      label: 'LinkedIn',
                      color: 'hover:text-blue-400'
                    },
                    { 
                      href: 'https://saurav-portfolio-dun.vercel.app/', 
                      icon: FiExternalLink, 
                      label: 'Portfolio',
                      color: 'hover:text-purple-400'
                    }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2024 SyncRunCode. All rights reserved.</span>
              <FiHeart className="text-red-500 animate-pulse" />
            </div>


            {/* Status Indicator */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
