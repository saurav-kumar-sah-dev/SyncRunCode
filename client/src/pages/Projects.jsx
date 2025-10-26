import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiCode,
  FiClock,
  FiUser,
  FiTag
} from 'react-icons/fi';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Projects = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'typescript', label: 'TypeScript' }
  ];

  const sortOptions = [
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'title', label: 'Title' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'executionCount', label: 'Execution Count' }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated, searchTerm, languageFilter, sortBy, sortOrder, currentPage]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        search: searchTerm,
        language: languageFilter,
        sortBy,
        sortOrder
      });

      const response = await axios.get(`/api/projects?${params}`);
      const data = response.data.data;
      
      setProjects(data.projects);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setDeletingId(projectId);
      await axios.delete(`/api/projects/${projectId}`);
      
      setProjects(prev => prev.filter(p => p._id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageFilter = (e) => {
    setLanguageFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'text-yellow-400',
      python: 'text-green-400',
      java: 'text-red-400',
      cpp: 'text-blue-400',
      c: 'text-gray-400',
      typescript: 'text-blue-500'
    };
    return colors[language] || 'text-gray-400';
  };

  if (loading && projects.length === 0) {
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
                    <FiCode className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      My Projects
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base mt-1">
                      Manage and organize your code projects
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/compiler"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">New Project</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-700/20 to-gray-800/20 rounded-2xl blur-sm"></div>
          <div className="relative bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={languageFilter}
                  onChange={handleLanguageFilter}
                  className="px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm sm:text-base min-w-[140px]"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={handleSort}
                  className="px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm sm:text-base min-w-[140px]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleSortOrder}
                  className={`px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white hover:bg-gray-700/80 transition-all duration-300 flex items-center justify-center ${
                    sortOrder === 'asc' ? 'ring-2 ring-green-500/50' : 'ring-2 ring-blue-500/50'
                  }`}
                  title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                >
                  <FiFilter className={`w-4 h-4 ${sortOrder === 'asc' ? 'text-green-400' : 'text-blue-400'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Empty State */}
        {projects.length === 0 ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 sm:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                  <FiCode className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {searchTerm || languageFilter ? 'No projects found' : 'No projects yet'}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {searchTerm || languageFilter 
                    ? 'Try adjusting your search criteria or create a new project'
                    : 'Start your coding journey by creating your first project'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {searchTerm || languageFilter ? (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setLanguageFilter('');
                      }}
                      className="px-6 py-3 bg-gray-700/80 text-white rounded-xl hover:bg-gray-600/80 transition-all duration-300 hover:scale-105 font-medium"
                    >
                      Clear Filters
                    </button>
                  ) : null}
                  <Link
                    to="/compiler"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium"
                  >
                    <FiPlus className="w-5 h-5 mr-2" />
                    Create Your First Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-blue-200 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                          {project.description || 'No description available'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        <button
                          onClick={() => navigate(`/compiler/${project._id}`)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300 hover:scale-110"
                          title="Edit Project"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          disabled={deletingId === project._id}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Project"
                        >
                          {deletingId === project._id ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <FiTrash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Language and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getLanguageColor(project.language)} bg-gray-800/50 border border-gray-700/50`}>
                        <FiCode className="w-3 h-3 mr-1.5" />
                        {project.language.toUpperCase()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 bg-gray-800/30 px-2 py-1 rounded-lg">
                        <FiClock className="w-3 h-3 mr-1" />
                        {formatDate(project.lastModified)}
                      </div>
                    </div>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 text-xs rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-400 text-xs rounded-lg border border-gray-600/30">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div className="flex items-center text-xs text-gray-400 bg-gray-800/30 px-2 py-1 rounded-lg">
                        <FiUser className="w-3 h-3 mr-1.5" />
                        <span className="truncate max-w-[80px]">{project.owner.username}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400 bg-gray-800/30 px-2 py-1 rounded-lg">
                        <FiCode className="w-3 h-3 mr-1.5" />
                        {project.executionCount} runs
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-700/20 to-gray-800/20 rounded-2xl blur-sm"></div>
                <div className="relative bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-800/80 text-white rounded-xl hover:bg-gray-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base border border-gray-600/50 disabled:border-gray-700/50"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {/* Page Numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base font-medium ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-800/80 text-white rounded-xl hover:bg-gray-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base border border-gray-600/50 disabled:border-gray-700/50"
                    >
                      Next
                    </button>
                  </div>
                  
                  {/* Page Info */}
                  <div className="text-center mt-3">
                    <span className="text-sm text-gray-400 bg-gray-800/30 px-3 py-1 rounded-lg">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
