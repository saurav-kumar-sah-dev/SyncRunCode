import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
  fontSize: parseInt(localStorage.getItem('fontSize')) || 14,
  tabSize: parseInt(localStorage.getItem('tabSize')) || 2,
  autoSave: localStorage.getItem('autoSave') !== 'false',
  minimap: localStorage.getItem('minimap') !== 'false',
  wordWrap: localStorage.getItem('wordWrap') === 'true',
  lineNumbers: localStorage.getItem('lineNumbers') !== 'false'
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      };
    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.payload
      };
    case 'SET_TAB_SIZE':
      return {
        ...state,
        tabSize: action.payload
      };
    case 'SET_AUTO_SAVE':
      return {
        ...state,
        autoSave: action.payload
      };
    case 'SET_MINIMAP':
      return {
        ...state,
        minimap: action.payload
      };
    case 'SET_WORD_WRAP':
      return {
        ...state,
        wordWrap: action.payload
      };
    case 'SET_LINE_NUMBERS':
      return {
        ...state,
        lineNumbers: action.payload
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    localStorage.setItem('fontSize', state.fontSize.toString());
    localStorage.setItem('tabSize', state.tabSize.toString());
    localStorage.setItem('autoSave', state.autoSave.toString());
    localStorage.setItem('minimap', state.minimap.toString());
    localStorage.setItem('wordWrap', state.wordWrap.toString());
    localStorage.setItem('lineNumbers', state.lineNumbers.toString());
  }, [state]);

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setFontSize = (fontSize) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: fontSize });
  };

  const setTabSize = (tabSize) => {
    dispatch({ type: 'SET_TAB_SIZE', payload: tabSize });
  };

  const setAutoSave = (autoSave) => {
    dispatch({ type: 'SET_AUTO_SAVE', payload: autoSave });
  };

  const setMinimap = (minimap) => {
    dispatch({ type: 'SET_MINIMAP', payload: minimap });
  };

  const setWordWrap = (wordWrap) => {
    dispatch({ type: 'SET_WORD_WRAP', payload: wordWrap });
  };

  const setLineNumbers = (lineNumbers) => {
    dispatch({ type: 'SET_LINE_NUMBERS', payload: lineNumbers });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const value = {
    ...state,
    setTheme,
    setFontSize,
    setTabSize,
    setAutoSave,
    setMinimap,
    setWordWrap,
    setLineNumbers,
    updatePreferences
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
