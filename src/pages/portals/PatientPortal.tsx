import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, FileText, Heart, Bell, Download } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export const PatientPortal: React.FC = () => {

  const navigation = [
    { name: 'Dashboard', path: '/patient', icon: Heart, roles: ['patient'] },
    { name: 'My Appointments', path: '/patient/appointments', icon: Calendar, roles: ['patient'] },
    { name: 'Health Records', path: '/patient/records', icon: FileText, roles: ['patient'] },
    { name: 'Prescriptions', path: '/patient/prescriptions', icon: FileText, roles: ['patient'] },
    { name: 'Lab Results', path: '/patient/lab-results', icon: FileText, roles: ['patient'] },
    { name: 'Profile', path: '/patient/profile', icon: User, roles: ['patient'] }
  ];

  const mockAppointments = [
    {
      id: '1',
      date: '2025-01-20',
      time: '10:30',
      doctor: 'Dr. Rajesh Kumar',
      department: 'Cardiology',
      status: 'confirmed',
      location: 'Apollo Hospital'
    },
    {
      id: '2',
      date: '2025-01-25',
      time: '14:00',
      doctor: 'Dr. Priya Sharma',
      department: 'Dental',
      status: 'scheduled',
      location: 'SmileCare Clinic'
    }
  ];

  const mockHealthRecords = [
    {
      id: '1',
      date: '2025-01-10',
      type: 'Consultation',
      doctor: 'Dr. Rajesh Kumar',
      diagnosis: 'Routine Check-up',
      prescription: 'Available'
    },
    {
      id: '2',
      date: '2025-01-05',
      type: 'Lab Test',
      test: 'Complete Blood Count',
      status: 'Normal',
      downloadable: true
    }
  ];

  return (
    <DashboardLayout
      title="Patient Portal"
      subtitle="Manage Your Health Journey"
      navigation={navigation}
      userRole="patient"
    >
      <Routes>
        <Route path="/" element={
          <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-3xl p-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Welcome back!</h2>
                  <p className="text-teal-100">Stay on top of your health with easy access to all your medical information.</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <Calendar className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">{mockAppointments.length}</h3>
                <p className="text-slate-600 font-medium">Upcoming Appointments</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <FileText className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">{mockHealthRecords.length}</h3>
                <p className="text-slate-600 font-medium">Health Records</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <Download className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">3</h3>
                <p className="text-slate-600 font-medium">Downloadable Reports</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
              >
                <Bell className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">2</h3>
                <p className="text-slate-600 font-medium">Notifications</p>
              </motion.div>
            </div>

            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Upcoming Appointments</h3>
              <div className="space-y-4">
                {mockAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                          {new Date(appointment.date).getDate()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{appointment.doctor}</h4>
                          <p className="text-slate-600">{appointment.department} • {appointment.location}</p>
                          <p className="text-slate-500 text-sm">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.status.toUpperCase()}
                        </span>
                        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Health Records */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Recent Health Records</h3>
              <div className="space-y-4">
                {mockHealthRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border border-slate-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-800">{record.type}</h4>
                        <p className="text-slate-600">
                          {record.doctor || record.test} • {new Date(record.date).toLocaleDateString()}
                        </p>
                        <p className="text-slate-500 text-sm">
                          {record.diagnosis || record.status}
                        </p>
                      </div>
                      {record.downloadable && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        } />
        
        <Route path="/appointments" element={<div>My Appointments</div>} />
        <Route path="/records" element={<div>Health Records</div>} />
        <Route path="/prescriptions" element={<div>My Prescriptions</div>} />
        <Route path="/lab-results" element={<div>Lab Results</div>} />
        <Route path="/profile" element={<div>Patient Profile</div>} />
      </Routes>
    </DashboardLayout>
  );
};