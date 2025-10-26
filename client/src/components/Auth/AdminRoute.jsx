import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const AdminRoute = ({ children, permission }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { isAdmin, hasPermission, loading: adminLoading } = useAdmin();

  if (authLoading || adminLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-400 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have admin privileges to access this page</p>
        </div>
      </div>
    );
  }

  if (permission && !hasPermission(permission)) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-400 mb-2">Permission Denied</h2>
          <p className="text-gray-500">You don't have the required permission to access this page</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
