import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-teal-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Profile Setup Required</h2>
            <p className="text-slate-600 mb-4">Please complete your profile setup to continue.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userProfile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h2>
            <p className="text-slate-600 mb-4">You don't have permission to access this area.</p>
            <p className="text-slate-500 mb-4">Your role: <span className="font-semibold">{userProfile?.role}</span></p>
            <button
              onClick={() => navigate('/login')}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};