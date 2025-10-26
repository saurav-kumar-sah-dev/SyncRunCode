import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowLeft, FiCode, FiLogIn } from 'react-icons/fi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.login) {
      newErrors.login = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(formData.login, formData.password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
          theme === 'dark' ? 'bg-primary-500' : 'bg-primary-300'
        } blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
          theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
        } blur-3xl`}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link 
            to="/" 
            className={`inline-flex items-center mb-6 transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-primary-400 hover:text-primary-300' 
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' 
                ? 'bg-primary-600/20 text-primary-400' 
                : 'bg-primary-100 text-primary-600'
            }`}>
              <FiLogIn className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome Back
          </h1>
          <p className={`text-sm sm:text-base ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Sign in to your account to continue coding
          </p>
        </div>

        {/* Form Card */}
        <div className={`rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-glow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/80 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Login Field (Email or Username) */}
              <div className="space-y-2">
                <label 
                  htmlFor="login" 
                  className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Email or Username
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-500 group-focus-within:text-primary-400' : 'text-gray-400 group-focus-within:text-primary-500'
                  }`}>
                    <FiMail className="h-5 w-5" />
                  </div>
                  <input
                    id="login"
                    name="login"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.login}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme === 'dark' 
                        ? `bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 ${errors.login ? 'border-red-500 focus:ring-red-500' : ''}`
                        : `bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 ${errors.login ? 'border-red-500 focus:ring-red-500' : ''}`
                    }`}
                    placeholder="Enter your email or username"
                  />
                </div>
                {errors.login && (
                  <p className="text-sm text-red-500 animate-slide-up">{errors.login}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Password
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-500 group-focus-within:text-primary-400' : 'text-gray-400 group-focus-within:text-primary-500'
                  }`}>
                    <FiLock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme === 'dark' 
                        ? `bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`
                        : `bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 animate-slide-up">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded border-2 focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-primary-500 focus:ring-primary-500 border-gray-600 bg-gray-800' 
                        : 'text-primary-600 focus:ring-primary-500 border-gray-300 bg-white'
                    }`}
                  />
                  <label 
                    htmlFor="remember-me" 
                    className={`ml-2 block text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a 
                    href="#" 
                    className={`font-medium transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-700'
                    }`}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  loading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : theme === 'dark'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-glow'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-glow'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>


              {/* Register Link */}
              <div className="text-center pt-4">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className={`font-semibold transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-700'
                    }`}
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
