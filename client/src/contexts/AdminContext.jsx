import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../config/api';

const AdminContext = createContext();

const initialState = {
  isAdmin: false,
  adminPermissions: {
    canManageUsers: false,
    canManageProjects: false,
    canViewAnalytics: false,
    canManageSystem: false
  },
  loading: true
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'ADMIN_CHECK_START':
      return {
        ...state,
        loading: true
      };
    case 'ADMIN_CHECK_SUCCESS':
      return {
        ...state,
        isAdmin: true,
        adminPermissions: action.payload.adminPermissions,
        loading: false
      };
    case 'ADMIN_CHECK_FAILURE':
      return {
        ...state,
        isAdmin: false,
        adminPermissions: initialState.adminPermissions,
        loading: false
      };
    case 'ADMIN_CHECK_FROM_USER':
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        adminPermissions: action.payload.adminPermissions,
        loading: false
      };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Check admin status when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      checkAdminFromUser(user);
    } else {
      dispatch({ type: 'ADMIN_CHECK_FAILURE' });
    }
  }, [isAuthenticated, user]);

  const checkAdminFromUser = (userData) => {
    const isAdmin = userData.role === 'admin' || userData.role === 'superadmin';
    const adminPermissions = userData.adminPermissions || {
      canManageUsers: false,
      canManageProjects: false,
      canViewAnalytics: false,
      canManageSystem: false
    };

    dispatch({
      type: 'ADMIN_CHECK_FROM_USER',
      payload: {
        isAdmin,
        adminPermissions
      }
    });
  };

  const checkAdminStatus = async () => {
    try {
      dispatch({ type: 'ADMIN_CHECK_START' });
      
      // Try to access admin dashboard to check permissions
      const response = await axios.get('/api/admin/dashboard');
      
      if (response.data.success) {
        dispatch({
          type: 'ADMIN_CHECK_SUCCESS',
          payload: {
            adminPermissions: response.data.data.adminPermissions || {
              canManageUsers: true,
              canManageProjects: true,
              canViewAnalytics: true,
              canManageSystem: true
            }
          }
        });
      } else {
        dispatch({ type: 'ADMIN_CHECK_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'ADMIN_CHECK_FAILURE' });
    }
  };

  const hasPermission = (permission) => {
    return state.isAdmin && state.adminPermissions[permission];
  };

  const value = {
    ...state,
    hasPermission,
    checkAdminStatus
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
