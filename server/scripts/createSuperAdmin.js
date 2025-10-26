const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/syncruncode');
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      process.exit(0);
    }

    // Get admin credentials from environment variables or prompt
    const username = process.env.ADMIN_USERNAME || 'admin';
    const email = process.env.ADMIN_EMAIL || 'admin@syncruncode.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

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
    console.log('Super admin created successfully!');
    console.log('Email:', superAdmin.email);
    console.log('Username:', superAdmin.username);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('💡 TIP: Use environment variables ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD for custom credentials');

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Run the script
createSuperAdmin();
