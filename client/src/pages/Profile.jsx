import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import { 
  FiUser, 
  FiMail, 
  FiSettings, 
  FiSave, 
  FiEye, 
  FiEyeOff,
  FiSun,
  FiMoon,
  FiType,
  FiAlignLeft,
  FiMinus,
  FiAlignJustify,
  FiHash,
  FiCamera,
  FiCalendar,
  FiEdit3,
  FiLock,
  FiCheck,
  FiX
} from 'react-icons/fi';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile, uploadProfileImage, updatePassword, changeUsername } = useAuth();
  const { 
    theme, 
    setTheme, 
    fontSize, 
    setFontSize, 
    tabSize, 
    setTabSize, 
    autoSave, 
    setAutoSave,
    minimap,
    setMinimap,
    wordWrap,
    setWordWrap,
    lineNumbers,
    setLineNumbers
  } = useTheme();
  
  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: {
      firstName: '',
      lastName: ''
    },
    dateOfBirth: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
        name: {
          firstName: user.name?.firstName || '',
          lastName: user.name?.lastName || ''
        },
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleUsernameChange = async () => {
    if (!formData.username || formData.username === user.username) {
      return;
    }

    if (formData.username.length < 3) {
      setErrors({ username: 'Username must be at least 3 characters' });
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setErrors({ username: 'Username can only contain letters, numbers, and underscores' });
      return;
    }

    setUsernameLoading(true);
    const result = await changeUsername(formData.username);
    setUsernameLoading(false);

    if (!result.success) {
      setErrors({ username: result.message });
    } else {
      setErrors({});
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const updateData = {
      name: formData.name,
      dateOfBirth: formData.dateOfBirth || null,
      email: formData.email
    };

    setLoading(true);
    const result = await updateProfile(updateData);
    setLoading(false);

    if (!result.success) {
      setErrors({ general: result.message });
    } else {
      setErrors({});
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword) {
      setErrors({ currentPassword: 'Current password is required' });
      return;
    }

    if (!formData.newPassword) {
      setErrors({ newPassword: 'New password is required' });
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      setErrors({ newPassword: 'Password must contain uppercase, lowercase, number, and special character' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setPasswordLoading(true);
    const result = await updatePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    });
    setPasswordLoading(false);

    if (result.success) {
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setErrors({});
    } else {
      setErrors({ passwordError: result.message });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setImageLoading(true);
    const result = await uploadProfileImage(file);
    setImageLoading(false);

    if (!result.success) {
      setErrors({ imageError: result.message });
    } else {
      setErrors({});
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  const handleTabSizeChange = (newSize) => {
    setTabSize(newSize);
  };

  const handleAutoSaveChange = (enabled) => {
    setAutoSave(enabled);
  };

  const handleMinimapChange = (enabled) => {
    setMinimap(enabled);
  };

  const handleWordWrapChange = (enabled) => {
    setWordWrap(enabled);
  };

  const handleLineNumbersChange = (enabled) => {
    setLineNumbers(enabled);
  };

  if (!user) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Image */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiCamera className="w-5 h-5 mr-2" />
                Profile Image
              </h2>

              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={user.profileImage?.url || `https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff&size=120`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <LoadingSpinner size="sm" />
                    </div>
                  )}
                </div>
                
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                  >
                    <FiCamera className="w-4 h-4" />
                    <span>{imageLoading ? 'Uploading...' : 'Change Image'}</span>
                  </button>
                  <p className="text-sm text-gray-400 mt-2">
                    JPG, PNG, GIF up to 5MB
                  </p>
                </div>
              </div>
              
              {errors.imageError && (
                <p className="mt-2 text-sm text-red-400">{errors.imageError}</p>
              )}
            </div>

            {/* Basic Information */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiUser className="w-5 h-5 mr-2" />
                Basic Information
              </h2>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`flex-1 px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.username ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your username"
                    />
                    <button
                      type="button"
                      onClick={handleUsernameChange}
                      disabled={usernameLoading || formData.username === user.username}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {usernameLoading ? <LoadingSpinner size="sm" /> : <FiSave className="w-4 h-4" />}
                      <span>Save</span>
                    </button>
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                  )}
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name.firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="name.firstName"
                      name="name.firstName"
                      value={formData.name.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name.lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="name.lastName"
                      name="name.lastName"
                      value={formData.name.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? <LoadingSpinner size="sm" /> : <FiSave className="w-4 h-4" />}
                  <span>Save Changes</span>
                </button>
              </form>
            </div>

            {/* Password Update */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiLock className="w-5 h-5 mr-2" />
                Change Password
              </h2>

              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pr-10 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <FiEyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <FiEye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pr-10 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <FiEyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <FiEye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pr-10 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <FiEye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>

                {errors.passwordError && (
                  <p className="text-sm text-red-400">{errors.passwordError}</p>
                )}

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                >
                  {passwordLoading ? <LoadingSpinner size="sm" /> : <FiLock className="w-4 h-4" />}
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          </div>

          {/* Editor Preferences */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiSettings className="w-5 h-5 mr-2" />
                Editor Preferences
              </h2>

              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Theme
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === 'light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <FiSun className="w-4 h-4 inline mr-1" />
                      Light
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <FiMoon className="w-4 h-4 inline mr-1" />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Font Size
                  </label>
                  <div className="flex items-center space-x-2">
                    <FiType className="w-4 h-4 text-gray-400" />
                    <input
                      type="range"
                      min="10"
                      max="24"
                      value={fontSize}
                      onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400 w-8">{fontSize}px</span>
                  </div>
                </div>

                {/* Tab Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Tab Size
                  </label>
                  <div className="flex items-center space-x-2">
                    <FiAlignLeft className="w-4 h-4 text-gray-400" />
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={tabSize}
                      onChange={(e) => handleTabSizeChange(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400 w-8">{tabSize}</span>
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Auto Save</span>
                    <button
                      onClick={() => handleAutoSaveChange(!autoSave)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoSave ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoSave ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Minimap</span>
                    <button
                      onClick={() => handleMinimapChange(!minimap)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        minimap ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          minimap ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Word Wrap</span>
                    <button
                      onClick={() => handleWordWrapChange(!wordWrap)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        wordWrap ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          wordWrap ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Line Numbers</span>
                    <button
                      onClick={() => handleLineNumbersChange(!lineNumbers)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        lineNumbers ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          lineNumbers ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;