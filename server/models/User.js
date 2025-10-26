const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function(v) {
        // Only validate password strength if it's a new password (not hashed)
        // Hashed passwords start with $2a$ or $2b$ (bcrypt)
        if (v.startsWith('$2a$') || v.startsWith('$2b$')) {
          return true; // Skip validation for existing hashed passwords
        }
        // Strong password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message: 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character'
    }
  },
  name: {
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    }
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(v) {
        // Must be at least 13 years old
        const today = new Date();
        const age = today.getFullYear() - v.getFullYear();
        const monthDiff = today.getMonth() - v.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < v.getDate())) {
          return age - 1 >= 13;
        }
        return age >= 13;
      },
      message: 'You must be at least 13 years old to register'
    }
  },
  profileImage: {
    publicId: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  },
  avatar: {
    type: String,
    default: null
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    fontSize: {
      type: Number,
      default: 14,
      min: 10,
      max: 24
    },
    tabSize: {
      type: Number,
      default: 2,
      min: 2,
      max: 8
    },
    autoSave: {
      type: Boolean,
      default: true
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  adminPermissions: {
    canManageUsers: {
      type: Boolean,
      default: false
    },
    canManageProjects: {
      type: Boolean,
      default: false
    },
    canViewAnalytics: {
      type: Boolean,
      default: false
    },
    canManageSystem: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
