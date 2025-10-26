const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'cpp', 'c', 'typescript', 'html', 'css', 'json', 'markdown']
  },
  isMain: {
    type: Boolean,
    default: false
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Project title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  files: [fileSchema],
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'cpp', 'c', 'typescript', 'html', 'css', 'json', 'markdown']
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['read', 'write'],
      default: 'read'
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  lastModified: {
    type: Date,
    default: Date.now
  },
  executionCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ owner: 1, lastModified: -1 });
projectSchema.index({ isPublic: 1, lastModified: -1 });
projectSchema.index({ tags: 1 });

// Update lastModified when files are modified
projectSchema.pre('save', function(next) {
  if (this.isModified('files')) {
    this.lastModified = new Date();
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
