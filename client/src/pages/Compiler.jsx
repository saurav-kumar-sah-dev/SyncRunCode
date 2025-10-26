import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSocket } from '../contexts/SocketContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiPlay, 
  FiSave, 
  FiDownload, 
  FiUpload, 
  FiSettings, 
  FiCopy,
  FiRefreshCw,
  FiCode,
  FiTerminal,
  FiFileText,
  FiEdit3,
  FiX
} from 'react-icons/fi';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { formatCode, validateCode } from '../utils/codeFormatter';

const Compiler = () => {
  const { projectId } = useParams();
  const { isAuthenticated } = useAuth();
  const { theme, fontSize, tabSize, minimap, wordWrap, lineNumbers } = useTheme();
  const { joinRoom, sendCodeChange, onCodeChange, offCodeChange } = useSocket();
  
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [saveDescription, setSaveDescription] = useState('');
  const [showProjectSettings, setShowProjectSettings] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'input', 'output'
  
  const editorRef = useRef(null);
  const outputRef = useRef(null);

  const languages = [
    { value: 'javascript', label: 'JavaScript', extension: 'js' },
    { value: 'python', label: 'Python', extension: 'py' },
    { value: 'java', label: 'Java', extension: 'java' },
    { value: 'cpp', label: 'C++', extension: 'cpp' },
    { value: 'c', label: 'C', extension: 'c' },
    { value: 'typescript', label: 'TypeScript', extension: 'ts' }
  ];

  const defaultCode = {
    javascript: `// Welcome to JavaScript!
console.log("Hello, World!");`,
    python: `# Welcome to Python!
print("Hello, World!")`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    typescript: `// Welcome to TypeScript!
console.log("Hello, World!");`
  };

  // Load project if projectId is provided
  useEffect(() => {
    if (projectId && isAuthenticated) {
      loadProject();
    } else {
      setCode(defaultCode[language]);
    }
  }, [projectId, isAuthenticated]);

  // Handle language change for new projects
  useEffect(() => {
    if (!projectId) {
      setCode(defaultCode[language]);
    }
  }, [language]);

  // Set up real-time collaboration
  useEffect(() => {
    if (projectId && isAuthenticated) {
      joinRoom(projectId);
      
      const handleCodeChange = (data) => {
        if (data.userId !== isAuthenticated.user?._id) {
          setCode(data.code);
        }
      };

      onCodeChange(handleCodeChange);

      return () => {
        offCodeChange(handleCodeChange);
      };
    }
  }, [projectId, isAuthenticated]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/projects/${projectId}`);
      const projectData = response.data.data.project;
      setProject(projectData);
      setProjectTitle(projectData.title || '');
      setProjectDescription(projectData.description || '');
      setCode(projectData.files[0]?.content || defaultCode[projectData.language]);
      setLanguage(projectData.language);
    } catch (error) {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor
    editor.updateOptions({
      fontSize: fontSize,
      tabSize: tabSize,
      minimap: { enabled: minimap },
      wordWrap: wordWrap ? 'on' : 'off',
      lineNumbers: lineNumbers ? 'on' : 'off',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: 'blink',
      cursorSmoothCaretAnimation: true,
      renderWhitespace: 'selection',
      renderLineHighlight: 'line',
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      contextmenu: true,
      mouseWheelZoom: true,
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      wordBasedSuggestions: 'matchingDocuments'
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });
  };

  const handleCodeChange = (value) => {
    setCode(value || '');
    
    // Send real-time updates
    if (projectId && isAuthenticated) {
      sendCodeChange(projectId, {
        code: value,
        userId: isAuthenticated.user?._id
      });
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (!projectId) {
      setCode(defaultCode[newLanguage]);
    } else {
      // For existing projects, update the project's language
      setProject(prev => prev ? { ...prev, language: newLanguage } : null);
    }
  };

  const handleRun = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please login to run code');
      // Redirect to login page
      window.location.href = '/login';
      return;
    }

    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(0);

    try {
      const response = await axios.post('/api/execution/run', {
        language,
        code,
        input,
        projectId: projectId || null
      });

      const result = response.data.data.result;
      setOutput(result.output);
      setError(result.error);
      setExecutionTime(result.executionTime);

      if (result.status === 'success') {
        toast.success('Code executed successfully!');
      } else {
        toast.error('Code execution failed');
      }
    } catch (error) {
      toast.error('Failed to execute code');
      setError('Failed to execute code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save your code');
      return;
    }

    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    if (projectId) {
      // Update existing project
      handleUpdateProject();
    } else {
      // Show save modal for new project
      setSaveTitle(`My ${language.charAt(0).toUpperCase() + language.slice(1)} Project`);
      setSaveDescription('');
      setShowSaveModal(true);
    }
  };

  const handleSaveProject = async () => {
    if (!saveTitle.trim()) {
      toast.error('Project title is required');
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.post('/api/projects', {
        title: saveTitle.trim(),
        description: saveDescription.trim(),
        language,
        files: [{
          name: `main.${languages.find(l => l.value === language)?.extension}`,
          content: code,
          language,
          isMain: true
        }]
      });
      
      const newProject = response.data.data.project;
      setProject(newProject);
      setProjectTitle(newProject.title);
      setProjectDescription(newProject.description || '');
      window.history.replaceState(null, '', `/compiler/${newProject._id}`);
      setShowSaveModal(false);
      toast.success('Project created and saved!');
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormat = () => {
    try {
      const formattedCode = formatCode(code, language);
      setCode(formattedCode);
      toast.success('Code formatted successfully!');
    } catch (error) {
      toast.error('Failed to format code');
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success('Output copied to clipboard!');
  };

  const handleClearOutput = () => {
    setOutput('');
    setError('');
    setExecutionTime(0);
  };

  const handleDownload = () => {
    const extension = languages.find(l => l.value === language)?.extension || 'txt';
    const filename = `code.${extension}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded successfully!');
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
      toast.success('File uploaded successfully!');
    };
    reader.readAsText(file);
  };

  const handleOpenProjectSettings = () => {
    if (project) {
      setProjectTitle(project.title || '');
      setProjectDescription(project.description || '');
    }
    setShowProjectSettings(true);
  };

  const handleUpdateProject = async () => {
    if (!projectId) {
      toast.error('No project to update');
      return;
    }

    if (!projectTitle.trim()) {
      toast.error('Project title is required');
      return;
    }

    setIsUpdatingProject(true);

    try {
      const response = await axios.put(`/api/projects/${projectId}`, {
        title: projectTitle.trim(),
        description: projectDescription.trim(),
        files: [{
          name: `main.${languages.find(l => l.value === language)?.extension}`,
          content: code,
          language,
          isMain: true
        }]
      });

      const updatedProject = response.data.data.project;
      setProject(updatedProject);
      setShowProjectSettings(false);
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error('Failed to update project');
    } finally {
      setIsUpdatingProject(false);
    }
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Enhanced Header */}
      <div className="h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 flex items-center justify-between px-3 sm:px-4 shadow-lg">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            {project ? project.title : 'Code Compiler'}
          </h1>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-2 sm:px-3 py-1 bg-gray-800/80 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/80 transition-colors"
            aria-label="Select programming language"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile-First Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Mobile: Show only essential buttons, Desktop: Show all */}
          <div className="hidden sm:flex items-center space-x-2">
            {project && (
              <button
                onClick={handleOpenProjectSettings}
                className="px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                title="Project Settings"
                aria-label="Open project settings"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={handleFormat}
              className="px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105"
              title="Format Code"
              aria-label="Format code"
            >
              <FiCode className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 hover:scale-105"
              title="Save Project"
              aria-label="Save project"
            >
              {isSaving ? <LoadingSpinner size="sm" /> : <FiSave className="w-4 h-4" />}
            </button>

            {projectId && (
              <button
                onClick={() => {
                  setSaveTitle(`${projectTitle} (Copy)`);
                  setSaveDescription(projectDescription || '');
                  setShowSaveModal(true);
                }}
                className="px-3 py-2 bg-green-600/90 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105"
                title="Save As New Project"
                aria-label="Save as new project"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleDownload}
              className="px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105"
              title="Download Code"
              aria-label="Download code"
            >
              <FiDownload className="w-4 h-4" />
            </button>

            <label className="px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer">
              <FiUpload className="w-4 h-4" />
              <input
                type="file"
                accept=".js,.py,.java,.cpp,.c,.ts,.txt"
                onChange={handleUpload}
                className="hidden"
                aria-label="Upload file"
              />
            </label>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-colors"
              aria-label="Open mobile menu"
            >
              <FiSettings className="w-4 h-4" />
            </button>
            
            {/* Mobile Menu Dropdown */}
            {showMobileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="py-2">
                  {project && (
                    <button
                      onClick={() => {
                        handleOpenProjectSettings();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <FiEdit3 className="w-4 h-4 mr-3" />
                      Project Settings
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      handleFormat();
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <FiCode className="w-4 h-4 mr-3" />
                    Format Code
                  </button>
                  
                  <button
                    onClick={() => {
                      handleSave();
                      setShowMobileMenu(false);
                    }}
                    disabled={isSaving}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    <FiSave className="w-4 h-4 mr-3" />
                    Save Project
                  </button>

                  <button
                    onClick={() => {
                      handleDownload();
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <FiDownload className="w-4 h-4 mr-3" />
                    Download
                  </button>

                  <label className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center cursor-pointer">
                    <FiUpload className="w-4 h-4 mr-3" />
                    Upload File
                    <input
                      type="file"
                      accept=".js,.py,.java,.cpp,.c,.ts,.txt"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Run Button - Always Visible */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-4 py-2 text-white rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 ${
              !isAuthenticated 
                ? 'bg-gray-600/90 hover:bg-gray-700 border border-gray-500' 
                : 'bg-green-600/90 hover:bg-green-700'
            } disabled:opacity-50 shadow-lg`}
            title={!isAuthenticated ? "Login required to run code" : "Run Code (Ctrl+Enter)"}
            aria-label={!isAuthenticated ? "Login required to run code" : "Run code"}
          >
            {isRunning ? <LoadingSpinner size="sm" /> : <FiPlay className="w-4 h-4" />}
            <span className="hidden sm:inline text-sm font-medium">
              {!isAuthenticated ? 'Login to Run' : 'Run'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content - Mobile Responsive */}
      <div className="h-[calc(100vh-4rem)]">
        {/* Mobile Layout */}
        <div className="sm:hidden h-full flex flex-col">
          {/* Mobile Tab Navigation */}
          <div className="flex bg-gray-800/50 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'editor'
                  ? 'text-white bg-gray-700 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiCode className="w-4 h-4 inline mr-2" />
              Editor
            </button>
            <button
              onClick={() => setActiveTab('input')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'input'
                  ? 'text-white bg-gray-700 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiFileText className="w-4 h-4 inline mr-2" />
              Input
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'output'
                  ? 'text-white bg-gray-700 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiTerminal className="w-4 h-4 inline mr-2" />
              Output
            </button>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'editor' && (
              <div className="h-full">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={handleCodeChange}
                  onMount={handleEditorDidMount}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    fontSize: fontSize,
                    tabSize: tabSize,
                    minimap: { enabled: false }, // Disable minimap on mobile
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: 'blink',
                    cursorSmoothCaretAnimation: true,
                    renderWhitespace: 'selection',
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    contextmenu: true,
                    mouseWheelZoom: true,
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on',
                    wordBasedSuggestions: 'matchingDocuments'
                  }}
                />
              </div>
            )}

            {activeTab === 'input' && (
              <div className="h-full p-4 bg-gray-900">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <FiFileText className="w-4 h-4 mr-2" />
                    Program Input
                  </h3>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input for your program..."
                    className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    aria-label="Program input"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Enter any input data your program needs (e.g., numbers, text, etc.)
                </div>
              </div>
            )}

            {activeTab === 'output' && (
              <div className="h-full bg-gray-900">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-300 flex items-center">
                      <FiTerminal className="w-4 h-4 mr-2" />
                      Program Output
                    </h3>
                    <div className="flex items-center space-x-2">
                      {executionTime > 0 && (
                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                          {executionTime}ms
                        </span>
                      )}
                      <button
                        onClick={handleCopyOutput}
                        className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-lg"
                        title="Copy Output"
                        aria-label="Copy output"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleClearOutput}
                        className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-lg"
                        title="Clear Output"
                        aria-label="Clear output"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-[calc(100%-4rem)] p-4 overflow-auto">
                  <div
                    ref={outputRef}
                    className="h-full font-mono text-sm whitespace-pre-wrap"
                  >
                    {!isAuthenticated ? (
                      <div className="text-center text-gray-400 py-8">
                        <FiTerminal className="w-8 h-8 mx-auto mb-4 opacity-50" />
                        <p className="text-sm mb-4">Login to run code and see results</p>
                        <button
                          onClick={() => window.location.href = '/login'}
                          className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 underline bg-gray-800 rounded-lg"
                        >
                          Sign in to get started
                        </button>
                      </div>
                    ) : isRunning ? (
                      <div className="flex items-center justify-center space-x-2 text-blue-400 py-8">
                        <LoadingSpinner size="sm" />
                        <span>Running your code...</span>
                      </div>
                    ) : error ? (
                      <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                        <div className="font-semibold mb-2">Error:</div>
                        <div>{error}</div>
                      </div>
                    ) : output ? (
                      <div className="text-green-400 bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                        <div className="font-semibold mb-2">Output:</div>
                        <div>{output}</div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <FiTerminal className="w-8 h-8 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Click "Run" to execute your code</p>
                        <p className="text-xs text-gray-600 mt-2">Results will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block h-full">
          <PanelGroup direction="horizontal" className="h-full">
            {/* Editor Panel */}
            <Panel defaultSize={60} minSize={30} className="flex flex-col">
              <div className="h-full">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={handleCodeChange}
                  onMount={handleEditorDidMount}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    fontSize: fontSize,
                    tabSize: tabSize,
                    minimap: { enabled: minimap },
                    wordWrap: wordWrap ? 'on' : 'off',
                    lineNumbers: lineNumbers ? 'on' : 'off',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: 'blink',
                    cursorSmoothCaretAnimation: true,
                    renderWhitespace: 'selection',
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    contextmenu: true,
                    mouseWheelZoom: true,
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on',
                    wordBasedSuggestions: 'matchingDocuments'
                  }}
                />
              </div>
            </Panel>

            <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-gray-600 transition-colors" />

            {/* Output Panel */}
            <Panel defaultSize={40} minSize={20} className="flex flex-col bg-gray-900">
              {/* Input Section */}
              <div className="border-b border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-300 flex items-center">
                    <FiFileText className="w-4 h-4 mr-2" />
                    Input
                  </h3>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter input for your program..."
                  className="w-full h-20 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Output Section */}
              <div className="flex-1 flex flex-col">
                <div className="border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-300 flex items-center">
                      <FiTerminal className="w-4 h-4 mr-2" />
                      Output
                    </h3>
                    <div className="flex items-center space-x-2">
                      {executionTime > 0 && (
                        <span className="text-xs text-gray-400">
                          {executionTime}ms
                        </span>
                      )}
                      <button
                        onClick={handleCopyOutput}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="Copy Output"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleClearOutput}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="Clear Output"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-auto">
                  <div
                    ref={outputRef}
                    className="h-full font-mono text-sm whitespace-pre-wrap"
                  >
                    {!isAuthenticated ? (
                      <div className="text-center text-gray-400 py-8">
                        <FiTerminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Login to run code and see results</p>
                        <button
                          onClick={() => window.location.href = '/login'}
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
                        >
                          Sign in to get started
                        </button>
                      </div>
                    ) : isRunning ? (
                      <div className="flex items-center space-x-2 text-blue-400">
                        <LoadingSpinner size="sm" />
                        <span>Running...</span>
                      </div>
                    ) : error ? (
                      <div className="text-red-400">
                        {error}
                      </div>
                    ) : output ? (
                      <div className="text-green-400">
                        {output}
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        Click "Run" to execute your code
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>

      {/* Project Settings Modal */}
      {showProjectSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-gray-800 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Project Settings</h2>
              <button
                onClick={() => setShowProjectSettings(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter project title..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {projectTitle.length}/100 characters
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Enter project description..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {projectDescription.length}/500 characters
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-800">
              <button
                onClick={() => setShowProjectSettings(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProject}
                disabled={isUpdatingProject || !projectTitle.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdatingProject ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Project Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-gray-800 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Save Project</h2>
              <button
                onClick={() => setShowSaveModal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="Enter project title..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={100}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {saveTitle.length}/100 characters
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={saveDescription}
                  onChange={(e) => setSaveDescription(e.target.value)}
                  placeholder="Enter project description..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {saveDescription.length}/500 characters
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-800">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                disabled={isSaving || !saveTitle.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? <LoadingSpinner size="sm" /> : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compiler;
