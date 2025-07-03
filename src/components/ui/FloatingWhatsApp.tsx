import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      </motion.div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Hospverse Support</h3>
                  <p className="text-sm opacity-90">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-slate-700">
                  👋 Hi there! Have questions about Hospverse? We're here to help!
                </p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-sm text-slate-700"
                >
                  💬 Start a conversation
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-sm text-slate-700"
                >
                  📅 Schedule a demo
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-sm text-slate-700"
                >
                  💰 Get pricing info
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};