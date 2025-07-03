import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Plus, Search, Phone, Smile } from 'lucide-react';


export const DentalReceptionDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      // Mock dental appointments data
      const mockAppointments = [
        {
          id: '1',
          appointment_time: '09:00',
          token_number: 1,
          status: 'confirmed',
          patients: { first_name: 'Rajesh', last_name: 'Kumar', phone: '+91 98765 43210' },
          chief_complaint: 'Dental cleaning',
          treatment_type: 'Routine Cleaning'
        },
        {
          id: '2',
          appointment_time: '10:30',
          token_number: 2,
          status: 'scheduled',
          patients: { first_name: 'Priya', last_name: 'Sharma', phone: '+91 87654 32109' },
          chief_complaint: 'Crown consultation',
          treatment_type: 'Consultation'
        },
        {
          id: '3',
          appointment_time: '11:45',
          token_number: 3,
          status: 'in_progress',
          patients: { first_name: 'Arjun', last_name: 'Reddy', phone: '+91 76543 21098' },
          chief_complaint: 'Root canal',
          treatment_type: 'Endodontic Treatment'
        }
      ];

      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status } : apt
      ));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const todaysStats = {
    total: appointments.length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    waiting: appointments.filter(apt => apt.status === 'scheduled').length,
    inProgress: appointments.filter(apt => apt.status === 'in_progress').length
  };

  return (
    <div className="space-y-8">
      {/* Reception Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
        >
          <Calendar className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-800">{todaysStats.total}</h3>
          <p className="text-blue-600 font-medium">Total Appointments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
        >
          <Users className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-800">{todaysStats.confirmed}</h3>
          <p className="text-green-600 font-medium">Confirmed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200"
        >
          <Clock className="h-8 w-8 text-yellow-600 mb-4" />
          <h3 className="text-2xl font-bold text-yellow-800">{todaysStats.waiting}</h3>
          <p className="text-yellow-600 font-medium">Waiting</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
        >
          <Smile className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-800">{todaysStats.inProgress}</h3>
          <p className="text-purple-600 font-medium">In Treatment</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Reception Dashboard</h3>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Appointment</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Appointment Board */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Appointments for {new Date(selectedDate).toLocaleDateString()}
        </h3>

        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.token_number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {appointment.patients?.first_name} {appointment.patients?.last_name}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {appointment.appointment_time} • {appointment.treatment_type}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {appointment.chief_complaint}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{appointment.patients?.phone}</span>
                  </div>
                  
                  <select
                    value={appointment.status}
                    onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(appointment.status)}`}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No appointments for this date</h3>
            <p className="text-slate-500">Schedule new appointments to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};