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
  FiCheckCircle
} from 'react-icons/fi';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FiCode,
      title: 'Multi-Language Support',
      description: 'Write and run code in JavaScript, Python, Java, C++, TypeScript, and more.'
    },
    {
      icon: FiPlay,
      title: 'Instant Execution',
      description: 'Run your code instantly with real-time output and error handling.'
    },
    {
      icon: FiUsers,
      title: 'Real-time Collaboration',
      description: 'Collaborate with others in real-time on coding projects.'
    },
    {
      icon: FiZap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast code execution with 99.9% uptime guarantee.'
    },
    {
      icon: FiShield,
      title: 'Secure Environment',
      description: 'Your code runs in a secure, sandboxed environment.'
    },
    {
      icon: FiGlobe,
      title: 'Cloud Storage',
      description: 'Save and access your projects from anywhere in the world.'
    }
  ];

  const languages = [
    { name: 'JavaScript', color: 'lang-badge javascript' },
    { name: 'Python', color: 'lang-badge python' },
    { name: 'Java', color: 'lang-badge java' },
    { name: 'C++', color: 'lang-badge cpp' },
    { name: 'TypeScript', color: 'lang-badge typescript' },
    { name: 'C', color: 'lang-badge c' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            SyncRunCode
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
            Write, compile, and run code in multiple programming languages instantly. 
            Perfect for learning, testing, and collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Link
              to="/compiler"
              className="btn-primary text-lg px-8 py-4 group"
            >
              <FiCode className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Coding
              <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="btn-secondary text-lg px-8 py-4 group"
              >
                <FiUsers className="w-5 h-5 mr-2" />
                Sign Up Free
              </Link>
            )}
          </div>

          {/* Supported Languages */}
          <div className="mb-16 animate-fade-in">
            <h3 className="text-lg text-gray-400 mb-6">Supported Languages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((lang) => (
                <span
                  key={lang.name}
                  className={`px-4 py-2 rounded-lg font-medium ${lang.color}`}
                >
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to code, compile, and collaborate in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-hover p-6 group hover:shadow-glow transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-primary-500 mb-4 group-hover:text-primary-400 transition-colors" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started in minutes with our simple, intuitive interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Choose Language
              </h3>
              <p className="text-gray-300">
                Select from our supported programming languages and start coding.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Write Code
              </h3>
              <p className="text-gray-300">
                Use our powerful editor with syntax highlighting and auto-completion.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Run & Share
              </h3>
              <p className="text-gray-300">
                Execute your code instantly and share your projects with others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Coding?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust our platform for their coding needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/compiler"
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 group"
            >
              <FiPlay className="w-5 h-5 mr-2" />
              Try It Now
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 group"
              >
                <FiCheckCircle className="w-5 h-5 mr-2" />
                Create Account
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
