import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Calendar, Users, TrendingUp, DollarSign, Package } from 'lucide-react';

export const DentalDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Smile className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dental Practice Dashboard</h1>
              <p className="text-slate-600">AI-Powered Dental Practice Management</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Today\'s Patients', value: '24', color: 'from-blue-500 to-blue-600' },
            { icon: Calendar, label: 'Appointments', value: '18', color: 'from-green-500 to-green-600' },
            { icon: TrendingUp, label: 'Revenue Today', value: '₹45,200', color: 'from-purple-500 to-purple-600' },
            { icon: Package, label: 'Low Stock Items', value: '3', color: 'from-orange-500 to-orange-600' }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Today's Appointments</h2>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', patient: 'John Doe', treatment: 'Cleaning', status: 'Confirmed' },
                { time: '10:30 AM', patient: 'Jane Smith', treatment: 'Root Canal', status: 'In Progress' },
                { time: '12:00 PM', patient: 'Mike Johnson', treatment: 'Filling', status: 'Waiting' }
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{appointment.patient}</p>
                    <p className="text-sm text-slate-600">{appointment.treatment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{appointment.time}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Treatment Plans */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Active Treatment Plans</h2>
            <div className="space-y-4">
              {[
                { patient: 'Sarah Wilson', treatment: 'Orthodontic Treatment', progress: 65 },
                { patient: 'Robert Brown', treatment: 'Implant Procedure', progress: 40 },
                { patient: 'Emily Davis', treatment: 'Periodontal Treatment', progress: 80 }
              ].map((plan, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-slate-800">{plan.patient}</p>
                    <span className="text-sm text-slate-600">{plan.progress}%</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{plan.treatment}</p>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};