import React, { useEffect, useState } from 'react';
import { FiCode, FiZap, FiShield, FiGlobe, FiHeart, FiMail, FiGithub, FiLinkedin, FiExternalLink, FiAward, FiUsers, FiTrendingUp, FiStar, FiCpu, FiDatabase, FiCloud, FiLock, FiTarget, FiCheckCircle, FiArrowRight, FiLayers } from 'react-icons/fi';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs with Enhanced Animation */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse delay-4000"></div>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/8 via-purple-500/8 to-primary-500/8"></div>
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className={`text-center max-w-6xl mx-auto transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Enhanced Profile Image with More Effects */}
            <div className="relative inline-block mb-10 sm:mb-14">
              <div className="relative">
                {/* Main Profile Circle */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30 mx-auto animate-pulse">
                  <FiCode className="text-white text-3xl sm:text-4xl lg:text-5xl" />
                </div>
                
                {/* Multiple Rotating Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary-400/20 animate-spin" style={{animationDuration: '12s'}}></div>
                <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
                
                {/* Enhanced Status Indicator */}
                <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <FiHeart className="text-white text-sm sm:text-base" />
                </div>
                
                {/* Enhanced Floating Elements */}
                <div className="absolute -top-6 -left-6 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping shadow-lg"></div>
                <div className="absolute -bottom-6 -right-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-ping delay-1000 shadow-lg"></div>
                <div className="absolute top-0 -left-8 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-ping delay-2000 shadow-lg"></div>
                <div className="absolute bottom-0 -right-8 w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full animate-ping delay-3000 shadow-lg"></div>
                
                {/* Sparkle Effects */}
                <div className="absolute top-4 right-4">
                  <FiStar className="text-yellow-400 text-sm animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <FiStar className="text-blue-400 text-sm animate-pulse delay-1000" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Title with Better Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight tracking-tight">
              SyncRunCode
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 sm:mb-10 font-medium leading-relaxed">
              Online Code Compiler & Execution Platform
            </p>
            
            {/* Enhanced Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-5xl mx-auto mb-10 sm:mb-14 px-4 font-light">
              A powerful online code compiler that supports multiple programming languages with real-time execution. 
              Built for developers who want to write, compile, and test code instantly without any setup.
            </p>
            
            {/* Enhanced Status Badge */}
            <div className="inline-flex items-center space-x-4 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-full px-8 sm:px-10 py-4 sm:py-5 mb-14 sm:mb-18 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gray-800/80">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-gray-300 font-semibold text-base sm:text-lg">Live & Ready to Use</span>
              <FiCheckCircle className="text-green-400 text-lg sm:text-xl" />
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mb-16">
              {[
                { icon: FiCode, label: '6+ Languages', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
                { icon: FiZap, label: 'Instant Run', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' },
                { icon: FiUsers, label: 'Real-time', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
                { icon: FiShield, label: 'Secure', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' }
              ].map((stat, index) => (
                <div key={index} className={`${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-4 sm:p-5 hover:scale-110 transition-all duration-500 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 150}ms`}}>
                  <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-3 ${stat.color}`} />
                  <p className="text-sm sm:text-base text-gray-300 font-semibold text-center">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
          
          {/* Left Column - About */}
          <div className="space-y-10 sm:space-y-14">
            {/* Enhanced About Project Section */}
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 sm:p-10 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '200ms'}}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-10 flex items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg">
                  <FiCode className="text-white text-xl sm:text-2xl" />
                </div>
                About SyncRunCode
              </h2>
              <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl">
                <div className="flex items-start group">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <FiStar className="text-yellow-400 text-lg" />
                  </div>
                  <p>
                    SyncRunCode is a comprehensive online code compiler designed to make programming accessible to everyone. 
                    Whether you're a beginner learning to code or an experienced developer testing snippets, our platform provides 
                    instant compilation and execution.
                  </p>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <FiTarget className="text-blue-400 text-lg" />
                  </div>
                  <p>
                    The platform supports multiple programming languages including Python, JavaScript, Java, C++, and more. 
                    With real-time code execution, syntax highlighting, and error handling, it's the perfect tool for 
                    learning, testing, and sharing code.
                  </p>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <FiShield className="text-green-400 text-lg" />
                  </div>
                  <p>
                    Built with modern web technologies, SyncRunCode ensures fast performance, security, and reliability. 
                    All code execution happens in secure, isolated environments to protect both users and the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Features Section */}
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 sm:p-10 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '400ms'}}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-10 flex items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg">
                  <FiTrendingUp className="text-white text-xl sm:text-2xl" />
                </div>
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { name: 'Multi-Language Support', description: 'Python, JavaScript, Java, C++, and more', icon: FiCode, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
                  { name: 'Real-time Execution', description: 'Instant code compilation and output', icon: FiZap, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' },
                  { name: 'Syntax Highlighting', description: 'Beautiful code formatting and highlighting', icon: FiStar, color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
                  { name: 'Error Handling', description: 'Comprehensive error messages and debugging', icon: FiTarget, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' },
                  { name: 'Project Management', description: 'Save and organize your code projects', icon: FiDatabase, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
                  { name: 'User Authentication', description: 'Secure login and profile management', icon: FiLock, color: 'text-indigo-400', bgColor: 'bg-indigo-500/10', borderColor: 'border-indigo-500/20' },
                  { name: 'Admin Dashboard', description: 'Advanced user and system management', icon: FiUsers, color: 'text-pink-400', bgColor: 'bg-pink-500/10', borderColor: 'border-pink-500/20' },
                  { name: 'Responsive Design', description: 'Works perfectly on all devices', icon: FiGlobe, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/20' }
                ].map((feature, index) => (
                  <div key={feature.name} className={`${feature.bgColor} backdrop-blur-sm border ${feature.borderColor} rounded-2xl p-5 sm:p-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{feature.name}</h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Projects */}
          <div className="space-y-10 sm:space-y-14">
            {/* Enhanced Technology Stack */}
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 sm:p-10 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '600ms'}}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-10 flex items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg">
                  <FiAward className="text-white text-xl sm:text-2xl" />
                </div>
                Technology Stack
              </h2>
              <div className="space-y-8 sm:space-y-10">
                <div className="bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:from-blue-500/25 hover:to-purple-500/25 transition-all duration-500 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <FiCpu className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">Frontend</h3>
                  </div>
                  <p className="text-blue-400 text-base sm:text-lg mb-3 font-semibold">React.js, Vite, Tailwind CSS</p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Modern React application with Vite for fast development and Tailwind CSS for beautiful, responsive design.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/30 rounded-2xl p-6 sm:p-8 hover:from-green-500/25 hover:to-emerald-500/25 transition-all duration-500 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <FiDatabase className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">Backend</h3>
                  </div>
                  <p className="text-green-400 text-base sm:text-lg mb-3 font-semibold">Node.js, Express.js, MongoDB</p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Robust server-side architecture with Express.js framework and MongoDB for data persistence.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/15 to-orange-500/15 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 hover:from-yellow-500/25 hover:to-orange-500/25 transition-all duration-500 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                      <FiCloud className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">Code Execution</h3>
                  </div>
                  <p className="text-yellow-400 text-base sm:text-lg mb-3 font-semibold">Docker, Isolated Environments</p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Secure code execution using Docker containers to ensure safety and isolation.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced About Developer */}
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 sm:p-10 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '800ms'}}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-10 flex items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg">
                  <FiUsers className="text-white text-xl sm:text-2xl" />
                </div>
                About Developer
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-gradient-to-r from-primary-500/15 to-purple-500/15 border border-primary-500/30 rounded-2xl p-6 sm:p-8 hover:from-primary-500/25 hover:to-purple-500/25 transition-all duration-500 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <FiCode className="text-white text-xl" />
                    </div>
                    <h3 className="text-white font-semibold text-lg sm:text-xl">Saurav Kumar Sah</h3>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    Full-stack developer passionate about creating innovative web solutions. 
                    Built SyncRunCode to make coding accessible to everyone.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {['React', 'Node.js', 'MongoDB', 'Docker', 'Express', 'Tailwind'].map((tech) => (
                      <span key={tech} className="text-xs sm:text-sm bg-primary-400/20 text-primary-300 px-3 sm:px-4 py-2 rounded-full hover:bg-primary-400/30 transition-colors font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/30 rounded-2xl p-6 sm:p-8 hover:from-green-500/25 hover:to-emerald-500/25 transition-all duration-500 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <FiMail className="text-green-400 text-xl sm:text-2xl mr-4" />
                    <h3 className="text-white font-semibold text-lg sm:text-xl">Connect With Me</h3>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    For questions, feedback, or collaboration opportunities.
                  </p>
                  
                  {/* Enhanced Social Links Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <a 
                      href="https://github.com/saurav-kumar-sah-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group border border-gray-600/50 hover:border-gray-500/50"
                    >
                      <FiGithub className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium">GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/sauravkumarsah-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group border border-blue-500/30 hover:border-blue-400/50"
                    >
                      <FiLinkedin className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium">LinkedIn</span>
                    </a>
                    <a 
                      href="https://saurav-portfolio-dun.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group border border-purple-500/30 hover:border-purple-400/50"
                    >
                      <FiExternalLink className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium">Portfolio</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Contact CTA */}
        <div className="mt-20 sm:mt-24 lg:mt-28 text-center">
          <div className={`bg-gradient-to-br from-primary-500/15 via-purple-500/15 to-primary-500/15 backdrop-blur-sm border border-primary-500/30 rounded-3xl p-10 sm:p-12 lg:p-16 hover:from-primary-500/25 hover:via-purple-500/25 hover:to-primary-500/25 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '1000ms'}}>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
                Let's Work Together
              </h2>
              <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl mb-10 sm:mb-12 leading-relaxed font-light">
                Have a project in mind? I'd love to hear about it. 
                Let's discuss how we can bring your ideas to life.
              </p>
              
              {/* Enhanced Portfolio Contact */}
              <div className="flex justify-center">
                <a 
                  href="https://saurav-portfolio-dun.vercel.app/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-primary-500/25 to-purple-500/25 hover:from-primary-500/35 hover:to-purple-500/35 border border-primary-500/40 hover:border-primary-400/60 rounded-3xl p-10 sm:p-12 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30 max-w-lg w-full"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <FiMail className="text-white text-3xl" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-2xl sm:text-3xl mb-4 text-center">Portfolio Contact</h3>
                  <p className="text-gray-300 text-base sm:text-lg mb-6 text-center leading-relaxed">Professional contact form for project inquiries</p>
                  <div className="flex items-center justify-center text-primary-400 group-hover:text-primary-300 text-lg font-semibold transition-colors">
                    <span>Visit Contact Form</span>
                    <FiExternalLink className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

