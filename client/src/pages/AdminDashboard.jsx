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
    <div className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
            <p className={`text-3xl sm:text-4xl font-bold ${color} mb-1`}>{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className={`p-4 rounded-xl ${color.replace('text-', 'bg-').replace('-400', '-900')} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </div>
    </div>
  );

  const RecentActivityItem = ({ item, type }) => (
    <div className="group flex items-center space-x-3 p-4 hover:bg-gray-800/50 rounded-xl transition-all duration-300 hover:scale-[1.01]">
      <div className={`p-3 rounded-xl shadow-lg ${
        type === 'user' ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-green-900 to-green-800'
      } group-hover:scale-110 transition-transform duration-300`}>
        {type === 'user' ? (
          <FiUsers className="w-5 h-5 text-blue-400" />
        ) : (
          <FiCode className="w-5 h-5 text-green-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition-colors duration-300">
          {type === 'user' ? item.username : item.title}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {type === 'user' ? item.email : item.language.toUpperCase()}
        </p>
      </div>
      <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-6 sm:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base mt-1">
                      Monitor and manage your SyncRunCode platform
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={loadDashboardData}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium"
              >
                <FiRefreshCw className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-700/20 to-gray-800/20 rounded-2xl blur-sm"></div>
          <div className="relative bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-2">
            <div className="flex flex-wrap gap-2">
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
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700/80 hover:text-white border border-gray-600/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && dashboardData && (
          <div className="space-y-6">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Enhanced Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                <div className="relative p-6 border-b border-gray-700/50">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-blue-500/30">
                      <FiUsers className="w-4 h-4 text-white" />
                    </div>
                    Recent Users
                  </h3>
                </div>
                <div className="relative p-6">
                  {dashboardData.recentActivity.users.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentActivity.users.map((user, index) => (
                        <RecentActivityItem key={index} item={user} type="user" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiUsers className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500">No recent users</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5"></div>
                <div className="relative p-6 border-b border-gray-700/50">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-green-500/30">
                      <FiCode className="w-4 h-4 text-white" />
                    </div>
                    Recent Projects
                  </h3>
                </div>
                <div className="relative p-6">
                  {dashboardData.recentActivity.projects.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentActivity.projects.map((project, index) => (
                        <RecentActivityItem key={index} item={project} type="project" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiCode className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500">No recent projects</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced System Information */}
            <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-gray-600/5 to-gray-500/5"></div>
              <div className="relative p-6 border-b border-gray-700/50">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-gray-500/30">
                    <FiServer className="w-4 h-4 text-white" />
                  </div>
                  System Information
                </h3>
              </div>
              <div className="relative p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <FiClock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Uptime</p>
                        <p className="text-lg font-bold text-white">
                          {dashboardData.systemStats?.uptime ? 
                            `${Math.floor(dashboardData.systemStats.uptime / 3600)}h ${Math.floor((dashboardData.systemStats.uptime % 3600) / 60)}m` : 
                            'N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                        <FiActivity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Memory Usage</p>
                        <p className="text-lg font-bold text-white">
                          {dashboardData.systemStats?.memory?.heapUsed ? 
                            Math.round(dashboardData.systemStats.memory.heapUsed / 1024 / 1024) : 0} MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <FiGlobe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Node Version</p>
                        <p className="text-lg font-bold text-white">
                          {dashboardData.systemStats?.nodeVersion || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Users Tab */}
        {activeTab === 'users' && hasPermission('canManageUsers') && (
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-blue-500/30">
                  <FiUsers className="w-4 h-4 text-white" />
                </div>
                User Management
              </h3>
              <p className="text-gray-400 mt-2">Manage user accounts and permissions</p>
            </div>
            <div className="relative p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                  <FiUsers className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">User Management</h3>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">
                  Advanced user management features coming soon. Monitor user activity, manage permissions, and oversee account security.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium">
                  View All Users
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Projects Tab */}
        {activeTab === 'projects' && hasPermission('canManageProjects') && (
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5"></div>
            <div className="relative p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-green-500/30">
                  <FiCode className="w-4 h-4 text-white" />
                </div>
                Project Management
              </h3>
              <p className="text-gray-400 mt-2">Monitor and manage user projects</p>
            </div>
            <div className="relative p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <FiCode className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Project Management</h3>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">
                  Advanced project management features coming soon. Track project usage, manage resources, and monitor code execution.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 font-medium">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Analytics Tab */}
        {activeTab === 'analytics' && hasPermission('canViewAnalytics') && (
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-rose-500/5"></div>
            <div className="relative p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-purple-500/30">
                  <FiTrendingUp className="w-4 h-4 text-white" />
                </div>
                Analytics & Reports
              </h3>
              <p className="text-gray-400 mt-2">View detailed analytics and reports</p>
            </div>
            <div className="relative p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                  <FiTrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Analytics Dashboard</h3>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">
                  Advanced analytics features coming soon. Track user engagement, monitor system performance, and generate detailed reports.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 font-medium">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced System Tab */}
        {activeTab === 'system' && hasPermission('canManageSystem') && (
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-gray-600/5 to-gray-500/5"></div>
            <div className="relative p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-gray-500/30">
                  <FiServer className="w-4 h-4 text-white" />
                </div>
                System Management
              </h3>
              <p className="text-gray-400 mt-2">Monitor system health and performance</p>
            </div>
            <div className="relative p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-500/30">
                  <FiServer className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">System Management</h3>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">
                  Advanced system management features coming soon. Monitor server health, manage configurations, and oversee system performance.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-gray-500/25 hover:shadow-gray-500/40 font-medium">
                  View System Health
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Permission Denied */}
        {!hasPermission('canViewAnalytics') && activeTab === 'analytics' && (
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5"></div>
            <div className="relative p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                  <FiShield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Permission Denied</h3>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">
                  You don't have permission to view analytics. Contact your administrator for access.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 font-medium">
                  Request Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
