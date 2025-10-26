const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// @route   GET /api/health
// @desc    Health check endpoint
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check database connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
    
    // Check memory usage
    const memUsage = process.memoryUsage();
    const memUsageMB = {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024)
    };

    // Check uptime
    const uptime = Math.floor(process.uptime());

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: `${uptime}s`,
      database: {
        status: dbStatus,
        readyState: dbState
      },
      memory: memUsageMB,
      version: process.version,
      platform: process.platform,
      arch: process.arch
    };

    // If database is not connected, return unhealthy status
    if (dbState !== 1) {
      health.status = 'unhealthy';
      health.database.error = 'Database connection failed';
      return res.status(503).json(health);
    }

    res.json(health);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

module.exports = router;
