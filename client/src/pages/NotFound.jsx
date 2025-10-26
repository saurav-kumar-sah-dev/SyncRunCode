import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiCode, 
  FiArrowLeft, 
  FiSearch,
  FiZap,
  FiUsers
} from 'react-icons/fi';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home', icon: FiHome, color: 'from-blue-500 to-blue-600' },
    { path: '/compiler', label: 'Compiler', icon: FiCode, color: 'from-green-500 to-green-600' },
    { path: '/projects', label: 'Projects', icon: FiSearch, color: 'from-purple-500 to-purple-600' },
    { path: '/profile', label: 'Profile', icon: FiUsers, color: 'from-pink-500 to-pink-600' },
  ];

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden" role="main" aria-labelledby="error-title">
      {/* Animated Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-bounce-slow" />
        
        {/* Floating Particles */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
                404
              </h1>
              {/* Glow Effect */}
              <div className="absolute inset-0 text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none blur-sm opacity-50 animate-glow" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <h2 id="error-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have vanished into the digital void. 
              Don't worry, even the best developers get lost sometimes! 🚀
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              aria-label="Navigate to home page"
            >
              <FiHome className="w-6 h-6 mr-3 group-hover:animate-wiggle" aria-hidden="true" />
              <span>Go Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-500/50"
              aria-label="Go back to previous page"
            >
              <FiArrowLeft className="w-6 h-6 mr-3 group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center">
              <FiZap className="w-6 h-6 mr-2 text-yellow-400" />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.path}
                      className={`group relative block p-6 bg-gradient-to-br ${link.color} rounded-xl text-white transition-all duration-300 hover:shadow-glow-lg focus:outline-none focus:ring-4 focus:ring-white/20`}
                      aria-label={`Navigate to ${link.label} page`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <IconComponent className="w-8 h-8 group-hover:animate-bounce" aria-hidden="true" />
                        <span className="font-medium text-sm sm:text-base">{link.label}</span>
                      </div>
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default NotFound;
