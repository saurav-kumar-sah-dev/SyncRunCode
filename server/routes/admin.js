const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Execution = require('../models/Execution');
const { adminAuth, superAdminAuth, checkPermission } = require('../middleware/adminAuth');
const { body, validationResult } = require('express-validator');

// Apply admin authentication to all routes
router.use(adminAuth);

// Dashboard Statistics
router.get('/dashboard', checkPermission('canViewAnalytics'), async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalProjects,
      publicProjects,
      totalExecutions,
      recentUsers,
      recentProjects,
      systemStats
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Project.countDocuments(),
      Project.countDocuments({ isPublic: true }),
      Execution.countDocuments(),
      User.find({ isActive: true })
        .sort({ lastLogin: -1 })
        .limit(5)
        .select('username email lastLogin createdAt'),
      Project.find()
        .sort({ lastModified: -1 })
        .limit(5)
        .populate('owner', 'username email')
        .select('title language lastModified executionCount'),
      {
        totalMemory: process.memoryUsage(),
        uptime: process.uptime(),
        nodeVersion: process.version,
        platform: process.platform
      }
    ]);

    // Calculate growth metrics
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newUsersThisMonth = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const newProjectsThisMonth = await Project.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          totalProjects,
          publicProjects,
          totalExecutions,
          newUsersThisMonth,
          newProjectsThisMonth
        },
        recentActivity: {
          users: recentUsers,
          projects: recentProjects
        },
        systemStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// User Management Routes
router.get('/users', checkPermission('canManageUsers'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const isActive = req.query.isActive;

    const query = {};
    
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      query.role = role;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

router.get('/users/:id', checkPermission('canManageUsers'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's projects and executions
    const [projects, executions] = await Promise.all([
      Project.find({ owner: user._id }).select('title language createdAt lastModified executionCount'),
      Execution.find({ user: user._id }).sort({ createdAt: -1 }).limit(10)
    ]);

    res.json({
      success: true,
      data: {
        user,
        projects,
        executions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user details'
    });
  }
});

router.put('/users/:id', checkPermission('canManageUsers'), [
  body('role').optional().isIn(['user', 'admin', 'superadmin']),
  body('isActive').optional().isBoolean(),
  body('adminPermissions.canManageUsers').optional().isBoolean(),
  body('adminPermissions.canManageProjects').optional().isBoolean(),
  body('adminPermissions.canViewAnalytics').optional().isBoolean(),
  body('adminPermissions.canManageSystem').optional().isBoolean()
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

    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent non-superadmin from modifying superadmin
    if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify super admin user'
      });
    }

    const updateData = { ...req.body };
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: {
        user: updatedUser
      },
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

router.delete('/users/:id', checkPermission('canManageUsers'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deletion of superadmin
    if (user.role === 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete super admin user'
      });
    }

    // Prevent self-deletion
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    // Delete user and related data
    await Promise.all([
      User.findByIdAndDelete(req.params.id),
      Project.deleteMany({ owner: req.params.id }),
      Execution.deleteMany({ user: req.params.id })
    ]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

// Project Management Routes
router.get('/projects', checkPermission('canManageProjects'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const language = req.query.language || '';
    const isPublic = req.query.isPublic;

    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (language) {
      query.language = language;
    }
    
    if (isPublic !== undefined) {
      query.isPublic = isPublic === 'true';
    }

    const projects = await Project.find(query)
      .populate('owner', 'username email')
      .sort({ lastModified: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

router.delete('/projects/:id', checkPermission('canManageProjects'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete project and related executions
    await Promise.all([
      Project.findByIdAndDelete(req.params.id),
      Execution.deleteMany({ project: req.params.id })
    ]);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

// Analytics Routes
router.get('/analytics/users', checkPermission('canViewAnalytics'), async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      newUsersThisWeek,
      usersByRole,
      userGrowthData
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]),
      User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
        { $limit: 30 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        newUsersThisMonth,
        newUsersThisWeek,
        usersByRole,
        userGrowthData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user analytics'
    });
  }
});

router.get('/analytics/projects', checkPermission('canViewAnalytics'), async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalProjects,
      publicProjects,
      newProjectsThisMonth,
      projectsByLanguage,
      projectGrowthData,
      topProjects
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ isPublic: true }),
      Project.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Project.aggregate([
        { $group: { _id: '$language', count: { $sum: 1 } } }
      ]),
      Project.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
        { $limit: 30 }
      ]),
      Project.find()
        .populate('owner', 'username')
        .sort({ executionCount: -1 })
        .limit(10)
        .select('title language executionCount owner')
    ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        publicProjects,
        newProjectsThisMonth,
        projectsByLanguage,
        projectGrowthData,
        topProjects
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project analytics'
    });
  }
});

router.get('/analytics/executions', checkPermission('canViewAnalytics'), async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalExecutions,
      executionsThisMonth,
      executionsThisWeek,
      executionsByLanguage,
      executionStats,
      recentExecutions
    ] = await Promise.all([
      Execution.countDocuments(),
      Execution.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Execution.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Execution.aggregate([
        { $group: { _id: '$language', count: { $sum: 1 } } }
      ]),
      Execution.aggregate([
        {
          $group: {
            _id: null,
            avgExecutionTime: { $avg: '$executionTime' },
            totalExecutionTime: { $sum: '$executionTime' },
            successRate: {
              $avg: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] }
            }
          }
        }
      ]),
      Execution.find()
        .populate('user', 'username')
        .populate('project', 'title')
        .sort({ createdAt: -1 })
        .limit(10)
        .select('language status executionTime user project createdAt')
    ]);

    res.json({
      success: true,
      data: {
        totalExecutions,
        executionsThisMonth,
        executionsThisWeek,
        executionsByLanguage,
        executionStats: executionStats[0] || {},
        recentExecutions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch execution analytics'
    });
  }
});

// System Management Routes
router.get('/system/health', checkPermission('canManageSystem'), async (req, res) => {
  try {
    const healthData = {
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch
      },
      database: {
        connected: true, // MongoDB connection status
        collections: {
          users: await User.countDocuments(),
          projects: await Project.countDocuments(),
          executions: await Execution.countDocuments()
        }
      },
      timestamp: new Date()
    };

    res.json({
      success: true,
      data: healthData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch system health'
    });
  }
});

// Create Super Admin Route (only accessible via direct API call)
router.post('/create-superadmin', superAdminAuth, [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
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

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Create super admin user
    const superAdmin = new User({
      username,
      email,
      password,
      role: 'superadmin',
      adminPermissions: {
        canManageUsers: true,
        canManageProjects: true,
        canViewAnalytics: true,
        canManageSystem: true
      }
    });

    await superAdmin.save();

    res.status(201).json({
      success: true,
      message: 'Super admin created successfully',
      data: {
        user: {
          id: superAdmin._id,
          username: superAdmin.username,
          email: superAdmin.email,
          role: superAdmin.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create super admin'
    });
  }
});

module.exports = router;
