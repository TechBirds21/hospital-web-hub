import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Heart, Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  navigation: NavigationItem[];
  userRole?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  navigation,
  userRole = 'admin'
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  );

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 md:w-80 bg-white shadow-2xl lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-300 ease-in-out lg:transition-none`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <div>
                  <span className="text-base sm:text-xl font-bold text-slate-800">Hospverse</span>
                </div>
                <p className="text-xs text-slate-500 leading-tight">From Reception to Recovery</p>
                <p className="text-xs text-slate-500 leading-tight">{title}</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 md:px-4 py-4 md:py-6 space-y-1.5 md:space-y-2 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/hospital' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-lg'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 ${isActive ? 'text-teal-600' : ''}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-slate-200 p-3 md:p-4">
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 md:space-x-3 w-full p-2 md:p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-800 text-sm md:text-base truncate max-w-[140px] md:max-w-[180px]">{userProfile?.email}</p>
                  <p className="text-xs md:text-sm text-slate-500 capitalize">{userProfile?.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                >
                  <button className="flex items-center space-x-3 px-4 py-2 text-slate-600 hover:bg-slate-50 w-full">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="lg:pl-80 flex-1 min-w-0 w-full"
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20 w-full">
          <div className="px-4 sm:px-6 lg:px-6">
            <div className="flex items-center justify-between h-14 md:h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-1.5 md:p-2 text-slate-500 hover:text-slate-700"
                >
                  <Menu className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold text-slate-800">{title}</h1>
                  {subtitle && <p className="text-xs md:text-sm text-slate-600">{subtitle}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-500 hover:text-slate-700 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-3 sm:p-5 md:p-6 lg:p-6 animate-fadeIn">
          {children}
        </main>
      </motion.div>
    </div>
  );
};