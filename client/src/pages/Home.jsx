import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Layout/Footer';
import { 
  FiCode, 
  FiPlay, 
  FiUsers, 
  FiZap, 
  FiShield, 
  FiGlobe,
  FiArrowRight,
  FiCheckCircle,
  FiStar,
  FiTrendingUp,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiLock,
  FiSend,
  FiTarget,
  FiAward,
  FiHeart,
  FiSun
} from 'react-icons/fi';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FiCode,
      title: 'Multi-Language Support',
      description: 'Write and run code in JavaScript, Python, Java, C++, TypeScript, and more.',
      gradient: 'from-blue-500 to-purple-600',
      delay: '0'
    },
    {
      icon: FiPlay,
      title: 'Instant Execution',
      description: 'Run your code instantly with real-time output and error handling.',
      gradient: 'from-green-500 to-emerald-600',
      delay: '100'
    },
    {
      icon: FiUsers,
      title: 'Real-time Collaboration',
      description: 'Collaborate with others in real-time on coding projects.',
      gradient: 'from-pink-500 to-rose-600',
      delay: '200'
    },
    {
      icon: FiZap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast code execution with 99.9% uptime guarantee.',
      gradient: 'from-yellow-500 to-orange-600',
      delay: '300'
    },
    {
      icon: FiShield,
      title: 'Secure Environment',
      description: 'Your code runs in a secure, sandboxed environment.',
      gradient: 'from-indigo-500 to-blue-600',
      delay: '400'
    },
    {
      icon: FiGlobe,
      title: 'Cloud Storage',
      description: 'Save and access your projects from anywhere in the world.',
      gradient: 'from-teal-500 to-cyan-600',
      delay: '500'
    }
  ];

  const languages = [
    { name: 'JavaScript', color: 'lang-badge javascript', icon: '🟨' },
    { name: 'Python', color: 'lang-badge python', icon: '🐍' },
    { name: 'Java', color: 'lang-badge java', icon: '☕' },
    { name: 'C++', color: 'lang-badge cpp', icon: '⚡' },
    { name: 'TypeScript', color: 'lang-badge typescript', icon: '🔷' },
    { name: 'C', color: 'lang-badge c', icon: '⚙️' }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: FiUsers },
    { number: '50K+', label: 'Code Executions', icon: FiPlay },
    { number: '99.9%', label: 'Uptime', icon: FiTrendingUp },
    { number: '6', label: 'Languages', icon: FiCode }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      content: 'SyncRunCode has revolutionized how I prototype and test my ideas. The real-time collaboration is incredible!',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Chen',
      role: 'Computer Science Student',
      content: 'Perfect for learning new languages. The instant feedback helps me understand concepts faster.',
      avatar: '👨‍🎓'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Tech Lead',
      content: 'Our team uses SyncRunCode for code reviews and pair programming. It\'s become an essential tool.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <FiSun className="w-4 h-4 mr-2" />
            Trusted by 10,000+ developers worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SyncRunCode
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed">
            The ultimate <span className="text-blue-400 font-semibold">real-time collaborative</span> code compiler. 
            Write, compile, and run code in multiple languages instantly with your team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up">
            <Link
              to="/compiler"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-glow-lg transform hover:scale-105"
            >
              <FiCode className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              Start Coding Now
              <FiArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 text-white text-lg font-semibold rounded-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
              >
                <FiUsers className="w-5 h-5 mr-3" />
                Join for Free
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Supported Languages */}
          <div className="animate-fade-in">
            <h3 className="text-lg text-gray-400 mb-6 flex items-center justify-center">
              <FiCpu className="w-5 h-5 mr-2" />
              Supported Languages
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {languages.map((lang, index) => (
                <div
                  key={lang.name}
                  className={`group flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${lang.color}`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <span className="text-lg mr-2">{lang.icon}</span>
                  {lang.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-6">
              <FiAward className="w-4 h-4 mr-2" />
              Why Choose SyncRunCode?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need to <span className="text-gradient bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">code better</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From instant execution to real-time collaboration, we've got all the tools you need to build amazing projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-gray-600 transition-all duration-500 hover:shadow-glow-lg hover:scale-105"
                style={{animationDelay: `${feature.delay}ms`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              <FiSend className="w-4 h-4 mr-2" />
              Get Started in Minutes
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to start coding and collaborating with your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Choose Language',
                description: 'Select from our supported programming languages and start coding.',
                icon: FiTarget,
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                step: '2',
                title: 'Write Code',
                description: 'Use our powerful editor with syntax highlighting and auto-completion.',
                icon: FiCode,
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                step: '3',
                title: 'Run & Share',
                description: 'Execute your code instantly and share your projects with others.',
                icon: FiSend,
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-xl mb-4 mx-auto`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium mb-6">
              <FiHeart className="w-4 h-4 mr-2" />
              Loved by Developers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-gradient bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers who trust SyncRunCode for their coding needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-gray-600 transition-all duration-300 hover:shadow-glow">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start <span className="text-yellow-300">Coding?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of developers who trust our platform for their coding needs. 
            Start building amazing projects today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/compiler"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-glow-lg transform hover:scale-105"
            >
              <FiPlay className="w-5 h-5 mr-3" />
              Try It Now
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <FiCheckCircle className="w-5 h-5 mr-3" />
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
