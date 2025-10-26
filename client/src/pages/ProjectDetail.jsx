import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiCode, 
  FiClock, 
  FiUser, 
  FiTag,
  FiPlay,
  FiEye,
  FiEyeOff,
  FiCopy,
  FiDownload
} from 'react-icons/fi';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      loadProject();
    }
  }, [id, isAuthenticated]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data.data.project);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`/api/projects/${id}`);
      toast.success('Project deleted successfully');
      navigate('/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/compiler/${id}`);
  };

  const handleCopyCode = () => {
    if (project && project.files[selectedFile]) {
      navigator.clipboard.writeText(project.files[selectedFile].content);
      toast.success('Code copied to clipboard!');
    }
  };

  const handleDownloadCode = () => {
    if (project && project.files[selectedFile]) {
      const file = project.files[selectedFile];
      const extension = file.name.split('.').pop() || 'txt';
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Code downloaded successfully!');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/projects')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{project.title}</h1>
              <p className="text-gray-400">{project.description || 'No description'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              {showCode ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              <span>{showCode ? 'Hide' : 'Show'} Code</span>
            </button>
            
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiEdit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
            >
              {deleting ? <LoadingSpinner size="sm" /> : <FiTrash2 className="w-4 h-4" />}
              <span>Delete</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Language</label>
                  <p className={`text-lg font-medium ${getLanguageColor(project.language)}`}>
                    {project.language.toUpperCase()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Created</label>
                  <p className="text-white flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {formatDate(project.createdAt)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Last Modified</label>
                  <p className="text-white flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {formatDate(project.lastModified)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Owner</label>
                  <p className="text-white flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    {project.owner.username}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Executions</label>
                  <p className="text-white flex items-center">
                    <FiPlay className="w-4 h-4 mr-2" />
                    {project.executionCount} runs
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Visibility</label>
                  <p className="text-white">
                    {project.isPublic ? 'Public' : 'Private'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FiTag className="w-4 h-4 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Code Section */}
          <div className="lg:col-span-2">
            {project.files && project.files.length > 0 && (
              <div className="bg-gray-900 rounded-lg">
                {/* File Tabs */}
                {project.files.length > 1 && (
                  <div className="border-b border-gray-700 p-4">
                    <div className="flex space-x-1">
                      {project.files.map((file, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedFile(index)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedFile === index
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          {file.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Actions */}
                <div className="border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <FiCode className="w-5 h-5 mr-2" />
                      {project.files[selectedFile]?.name || 'Code'}
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-1"
                        title="Copy Code"
                      >
                        <FiCopy className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                      
                      <button
                        onClick={handleDownloadCode}
                        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-1"
                        title="Download Code"
                      >
                        <FiDownload className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code Display */}
                <div className="p-4">
                  {showCode ? (
                    <pre className="bg-gray-950 rounded-lg p-4 overflow-auto text-sm text-gray-300 whitespace-pre-wrap">
                      {project.files[selectedFile]?.content || 'No content'}
                    </pre>
                  ) : (
                    <div className="text-center py-12">
                      <FiCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">Code is hidden</p>
                      <button
                        onClick={() => setShowCode(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Show Code
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
