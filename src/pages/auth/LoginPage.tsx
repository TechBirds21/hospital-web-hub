import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      console.error('Login error:', error);
      setError('Invalid login credentials. Please try the demo user buttons below.');
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  const loginAsDemoUser = async (role: 'doctor' | 'receptionist' | 'patient' | 'admin') => {
    setLoading(true);
    setError('');
    
    let demoEmail = '';
    switch(role) {
      case 'doctor':
        demoEmail = 'doctor@demo.com';
        break;
      case 'receptionist':
        demoEmail = 'reception@demo.com';
        break;
      case 'patient':
        demoEmail = 'patient@demo.com';
        break;
      case 'admin':
        demoEmail = 'admin@demo.com';
        break;
    }
    
    const { error } = await signIn(demoEmail, 'demo123');

    if (error) {
      setError(`Demo login failed: ${error.message || 'Invalid credentials'}`);
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Hospverse</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-300">From Reception to Recovery, We've Got You</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-start space-x-3"
              >
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-300 mt-0.5" />
                <div>
                  <div className="font-semibold mb-2">Login Failed</div>
                  <div className="text-xs">
                    Please use one of the quick login demo buttons below for testing.
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-300 text-sm">
              Don't have an account?{' '}
              <Link to="/contact" className="text-teal-400 hover:text-teal-300 font-semibold">
                Contact us for access
              </Link>
            </p>
          </div>
          
          {/* Quick Login Buttons */}
          <div className="mt-8 space-y-4">
            <div className="text-center text-white mb-2">Quick Login as Demo User:</div>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                disabled={loading}
                onClick={() => loginAsDemoUser('doctor')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                <UserCheck size={16} />
                <span>Doctor</span>
              </motion.button>
              
              <motion.button
                disabled={loading}
                onClick={() => loginAsDemoUser('receptionist')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                <UserCheck size={16} />
                <span>Receptionist</span>
              </motion.button>
              
              <motion.button
                disabled={loading}
                onClick={() => loginAsDemoUser('admin')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                <UserCheck size={16} />
                <span>Admin</span>
              </motion.button>
              
              <motion.button
                disabled={loading}
                onClick={() => loginAsDemoUser('patient')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                <UserCheck size={16} />
                <span>Patient</span>
              </motion.button>
            </div>
            <div className="text-xs text-center text-slate-400 mt-4">
              No database setup needed! These buttons use local authentication for testing.
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition-colors inline-flex items-center space-x-2"
          >
            <span>← Back to Homepage</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};