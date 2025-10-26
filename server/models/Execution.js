const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'cpp', 'c', 'typescript']
  },
  code: {
    type: String,
    required: true
  },
  input: {
    type: String,
    default: ''
  },
  output: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  executionTime: {
    type: Number, // in milliseconds
    default: 0
  },
  memoryUsage: {
    type: Number, // in bytes
    default: 0
  },
  status: {
    type: String,
    enum: ['success', 'error', 'timeout', 'compilation_error', 'runtime_error', 'compiler_not_found'],
    required: true
  },
  exitCode: {
    type: Number,
    default: 0
  },
  stderr: {
    type: String,
    default: ''
  },
  stdout: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
executionSchema.index({ user: 1, createdAt: -1 });
executionSchema.index({ language: 1, status: 1 });
executionSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Execution', executionSchema);
