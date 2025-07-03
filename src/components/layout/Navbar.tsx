import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Specialties', path: '/specialties' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleBookDemo = () => {
    navigate('/contact', { state: { fromBookDemo: true } });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Hospverse
              </span>
              <span className="text-xs text-slate-500 leading-tight">From Reception to Recovery, We've Got You</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                onClick={(e) => e.currentTarget.blur()}
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-slate-700 hover:text-teal-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookDemo}
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Book Demo
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-teal-600 hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-teal-600 bg-teal-50 rounded-md'
                    : 'text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-md'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button onClick={handleBookDemo} className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg font-medium">
              Book Demo
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};