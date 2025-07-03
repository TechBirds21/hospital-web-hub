import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, MessageCircle, MapPin, Phone, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Hospverse</span>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered healthcare technology platform developed in Hyderabad, India. 
              From Reception to Recovery, We've Got You.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/your-number"
                className="p-2 bg-slate-800 rounded-lg hover:bg-teal-600 transition-colors duration-200"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@hospverse.com"
                className="p-2 bg-slate-800 rounded-lg hover:bg-teal-600 transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/product" className="text-slate-400 hover:text-white transition-colors">AI Features</Link></li>
              <li><Link to="/specialties" className="text-slate-400 hover:text-white transition-colors">Healthcare Solutions</Link></li>
              <li><Link to="/roadmap" className="text-slate-400 hover:text-white transition-colors">Development Roadmap</Link></li>
            </ul>
          </div>

          {/* Pilot Program */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pilot Program</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Join Pilot</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Early Access</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">AI Demo</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Developer API</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@hospverse.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Pilot Launch: July-Aug 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Hospverse HealthTech Pvt Ltd. All rights reserved. Made in India 🇮🇳
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-xs text-slate-500">In Development</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};