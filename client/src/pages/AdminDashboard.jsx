import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiUsers, 
  FiCode, 
  FiPlay, 
  FiTrendingUp, 
  FiActivity,
  FiServer,
  FiEye,
  FiEdit,
  FiTrash2,
  FiRefreshCw,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiShield
} from 'react-icons/fi';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const AdminDashboard = () => {
  const { isAdmin, hasPermission } = useAdmin();
  const { isAuthenticated } = useAuth();
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isAdmin && isAuthenticated) {
      loadDashboardData();
    }
  }, [isAdmin, isAuthenticated]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/dashboard');
      setDashboardData(response.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-400', '-900')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const RecentActivityItem = ({ item, type }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
      <div className={`p-2 rounded-lg ${
        type === 'user' ? 'bg-blue-900' : 'bg-green-900'
      }`}>
        {type === 'user' ? (
          <FiUsers className="w-4 h-4 text-blue-400" />
        ) : (
          <FiCode className="w-4 h-4 text-green-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {type === 'user' ? item.username : item.title}
        </p>
        <p className="text-xs text-gray-400">
          {type === 'user' ? item.email : item.language.toUpperCase()}
        </p>
      </div>
      <div className="text-xs text-gray-500">
        {new Date(type === 'user' ? item.lastLogin : item.lastModified).toLocaleDateString()}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <FiShield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-400 mb-2">Authentication Required</h2>
          <p className="text-gray-500">Please login to access the admin dashboard</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <FiShield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-400 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have admin privileges to access this page</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Monitor and manage your SyncRunCode platform</p>
          </div>
          <button
            onClick={loadDashboardData}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
          >
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: FiActivity },
            { id: 'users', label: 'Users', icon: FiUsers },
            { id: 'projects', label: 'Projects', icon: FiCode },
            { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
            { id: 'system', label: 'System', icon: FiServer }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && dashboardData && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={dashboardData.overview.totalUsers}
                icon={FiUsers}
                color="text-blue-400"
                subtitle={`${dashboardData.overview.newUsersThisMonth} this month`}
              />
              <StatCard
                title="Active Users"
                value={dashboardData.overview.activeUsers}
                icon={FiActivity}
                color="text-green-400"
                subtitle={`${Math.round((dashboardData.overview.activeUsers / dashboardData.overview.totalUsers) * 100)}% active`}
              />
              <StatCard
                title="Total Projects"
                value={dashboardData.overview.totalProjects}
                icon={FiCode}
                color="text-purple-400"
                subtitle={`${dashboardData.overview.newProjectsThisMonth} this month`}
              />
              <StatCard
                title="Total Executions"
                value={dashboardData.overview.totalExecutions}
                icon={FiPlay}
                color="text-yellow-400"
                subtitle="Code runs"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <FiUsers className="w-5 h-5 mr-2 text-blue-400" />
                    Recent Users
                  </h3>
                </div>
                <div className="p-6">
                  {dashboardData.recentActivity.users.length > 0 ? (
                    <div className="space-y-2">
                      {dashboardData.recentActivity.users.map((user, index) => (
                        <RecentActivityItem key={index} item={user} type="user" />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent users</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <FiCode className="w-5 h-5 mr-2 text-green-400" />
                    Recent Projects
                  </h3>
                </div>
                <div className="p-6">
                  {dashboardData.recentActivity.projects.length > 0 ? (
                    <div className="space-y-2">
                      {dashboardData.recentActivity.projects.map((project, index) => (
                        <RecentActivityItem key={index} item={project} type="project" />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent projects</p>
                  )}
                </div>
              </div>
            </div>

            {/* System Stats */}
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FiServer className="w-5 h-5 mr-2 text-gray-400" />
                  System Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Uptime</p>
                    <p className="text-lg font-semibold text-white">
                      {dashboardData.systemStats?.uptime ? 
                        `${Math.floor(dashboardData.systemStats.uptime / 3600)}h ${Math.floor((dashboardData.systemStats.uptime % 3600) / 60)}m` : 
                        'N/A'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Memory Usage</p>
                    <p className="text-lg font-semibold text-white">
                      {dashboardData.systemStats?.memory?.heapUsed ? 
                        Math.round(dashboardData.systemStats.memory.heapUsed / 1024 / 1024) : 0} MB
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Node Version</p>
                    <p className="text-lg font-semibold text-white">
                      {dashboardData.systemStats?.nodeVersion || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && hasPermission('canManageUsers') && (
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FiUsers className="w-5 h-5 mr-2 text-blue-400" />
                User Management
              </h3>
              <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <FiUsers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">User Management</h3>
                <p className="text-gray-500 mb-6">Advanced user management features coming soon</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View All Users
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && hasPermission('canManageProjects') && (
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FiCode className="w-5 h-5 mr-2 text-green-400" />
                Project Management
              </h3>
              <p className="text-gray-400 mt-1">Monitor and manage user projects</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <FiCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Project Management</h3>
                <p className="text-gray-500 mb-6">Advanced project management features coming soon</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && hasPermission('canViewAnalytics') && (
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FiTrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                Analytics & Reports
              </h3>
              <p className="text-gray-400 mt-1">View detailed analytics and reports</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <FiTrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-500 mb-6">Advanced analytics features coming soon</p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && hasPermission('canManageSystem') && (
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FiServer className="w-5 h-5 mr-2 text-gray-400" />
                System Management
              </h3>
              <p className="text-gray-400 mt-1">Monitor system health and performance</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <FiServer className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">System Management</h3>
                <p className="text-gray-500 mb-6">Advanced system management features coming soon</p>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  View System Health
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Permission Denied */}
        {!hasPermission('canViewAnalytics') && activeTab === 'analytics' && (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="text-center">
              <FiShield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Permission Denied</h3>
              <p className="text-gray-500">You don't have permission to view analytics</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
