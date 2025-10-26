const express = require('express');
const { body, validationResult } = require('express-validator');
const CodeExecutor = require('../services/CodeExecutor');
const Execution = require('../models/Execution');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();
const codeExecutor = new CodeExecutor();

// @route   POST /api/execution/run
// @desc    Execute code
// @access  Private
router.post('/run', [
  auth,
  body('language')
    .isIn(['javascript', 'python', 'java', 'cpp', 'c', 'typescript'])
    .withMessage('Invalid language'),
  body('code')
    .notEmpty()
    .withMessage('Code is required')
    .isLength({ max: 10000 })
    .withMessage('Code is too long'),
  body('input')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Input is too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { language, code, input = '', projectId } = req.body;

    // Execute code
    const result = await codeExecutor.executeCode(language, code, input);

    // Save execution record
    const execution = new Execution({
      user: req.user._id,
      project: projectId || null,
      language,
      code,
      input,
      output: result.output,
      error: result.error,
      executionTime: result.executionTime,
      memoryUsage: result.memoryUsage,
      status: result.status,
      exitCode: result.exitCode,
      stderr: result.error,
      stdout: result.output
    });

    await execution.save();

    res.json({
      success: true,
      data: {
        executionId: execution._id,
        result: {
          output: result.output,
          error: result.error,
          executionTime: result.executionTime,
          memoryUsage: result.memoryUsage,
          status: result.status,
          exitCode: result.exitCode
        }
      }
    });
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during code execution'
    });
  }
});

// @route   GET /api/execution/history
// @desc    Get execution history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const executions = await Execution.find({ user: req.user._id })
      .populate('project', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-code -input'); // Exclude code and input for performance

    const total = await Execution.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: {
        executions,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching execution history'
    });
  }
});

// @route   GET /api/execution/:id
// @desc    Get specific execution details
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const execution = await Execution.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('project', 'title');

    if (!execution) {
      return res.status(404).json({
        success: false,
        message: 'Execution not found'
      });
    }

    res.json({
      success: true,
      data: {
        execution
      }
    });
  } catch (error) {
    console.error('Get execution error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching execution'
    });
  }
});

// @route   DELETE /api/execution/:id
// @desc    Delete execution record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const execution = await Execution.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!execution) {
      return res.status(404).json({
        success: false,
        message: 'Execution not found'
      });
    }

    res.json({
      success: true,
      message: 'Execution deleted successfully'
    });
  } catch (error) {
    console.error('Delete execution error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting execution'
    });
  }
});

module.exports = router;
