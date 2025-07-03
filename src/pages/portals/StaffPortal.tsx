import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, Calendar, FileText, DollarSign, Settings } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

export const StaffPortal: React.FC = () => {
  const { userProfile } = useAuth();
  const [todaysShift, setTodaysShift] = useState({
    clockedIn: true,
    startTime: '09:00',
    currentHours: '4h 30m',
    breakTime: '30m'
  });

  const navigation = [
    { name: 'Dashboard', path: '/staff', icon: Users, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager'] },
    { name: 'Time Tracking', path: '/staff/time', icon: Clock, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager'] },
    { name: 'Schedule', path: '/staff/schedule', icon: Calendar, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager'] },
    { name: 'Payroll', path: '/staff/payroll', icon: DollarSign, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager'] },
    { name: 'Documents', path: '/staff/documents', icon: FileText, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager'] },
    { name: 'Settings', path: '/staff/settings', icon: Settings, roles: ['admin'] }
  ];

  const mockShifts = [
    { date: '2025-01-15', type: 'Morning', hours: '8h', status: 'completed' },
    { date: '2025-01-16', type: 'Morning', hours: '8h', status: 'completed' },
    { date: '2025-01-17', type: 'Evening', hours: '6h', status: 'scheduled' },
    { date: '2025-01-18', type: 'Morning', hours: '8h', status: 'scheduled' }
  ];

  const handleClockInOut = () => {
    setTodaysShift(prev => ({
      ...prev,
      clockedIn: !prev.clockedIn
    }));
  };

  return (
    <DashboardLayout
      title="Staff Portal"
      subtitle="Employee Management & Time Tracking"
      navigation={navigation}
      userRole={userProfile?.role}
    >
      <Routes>
        <Route path="/" element={
          <div className="space-y-8">
            {/* Clock In/Out Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${todaysShift.clockedIn ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-slate-600 to-slate-500'} text-white rounded-3xl p-8`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {todaysShift.clockedIn ? 'Currently Working' : 'Clock In to Start'}
                  </h2>
                  {todaysShift.clockedIn && (
                    <div className="space-y-1">
                      <p className="text-green-100">Started at {todaysShift.startTime}</p>
                      <p className="text-green-100">Working for {todaysShift.currentHours}</p>
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClockInOut}
                  className="bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  {todaysShift.clockedIn ? 'Clock Out' : 'Clock In'}
                </motion.button>
              </div>
            </motion.div>

            {/* Staff Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <Clock className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">40.5h</h3>
                <p className="text-slate-600 font-medium">This Week</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <Calendar className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">5</h3>
                <p className="text-slate-600 font-medium">Days Worked</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <DollarSign className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">₹28,500</h3>
                <p className="text-slate-600 font-medium">This Month</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <FileText className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">3</h3>
                <p className="text-slate-600 font-medium">Leave Days</p>
              </motion.div>
            </div>

            {/* Recent Shifts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Recent Shifts</h3>
              <div className="space-y-4">
                {mockShifts.map((shift, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border border-slate-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {new Date(shift.date).getDate()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{shift.type} Shift</h4>
                          <p className="text-slate-600">{new Date(shift.date).toLocaleDateString()}</p>
                          <p className="text-slate-500 text-sm">{shift.hours} worked</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        shift.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {shift.status.toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left">
                  <FileText className="h-8 w-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold text-slate-800 mb-2">Apply for Leave</h4>
                  <p className="text-slate-600 text-sm">Submit leave request</p>
                </button>
                <button className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left">
                  <DollarSign className="h-8 w-8 text-green-600 mb-4" />
                  <h4 className="font-semibold text-slate-800 mb-2">View Payslip</h4>
                  <p className="text-slate-600 text-sm">Download latest payslip</p>
                </button>
                <button className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left">
                  <Calendar className="h-8 w-8 text-purple-600 mb-4" />
                  <h4 className="font-semibold text-slate-800 mb-2">Shift Calendar</h4>
                  <p className="text-slate-600 text-sm">View upcoming shifts</p>
                </button>
              </div>
            </motion.div>
          </div>
        } />
        
        <Route path="/time" element={<div>Time Tracking</div>} />
        <Route path="/schedule" element={<div>Staff Schedule</div>} />
        <Route path="/payroll" element={<div>Payroll Information</div>} />
        <Route path="/documents" element={<div>Staff Documents</div>} />
        <Route path="/settings" element={<div>Staff Settings</div>} />
      </Routes>
    </DashboardLayout>
  );
};