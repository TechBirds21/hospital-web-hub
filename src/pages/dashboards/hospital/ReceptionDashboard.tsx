import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Plus, Search, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';

export const ReceptionDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      const { data } = await supabase
        .from('appointments')
        .select(`
          *,
          patients (
            first_name,
            last_name,
            phone
          ),
          doctors (
            name,
            speciality
          )
        `)
        .eq('clinic_id', userProfile?.clinic_id)
        .eq('appointment_date', selectedDate)
        .order('appointment_time');

      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data } = await supabase
        .from('patients')
        .select('*')
        .limit(50);

      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
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
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (!error) {
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const todaysStats = {
    total: appointments.length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    waiting: appointments.filter(apt => apt.status === 'scheduled').length,
    completed: appointments.filter(apt => apt.status === 'completed').length
  };

  return (
    <div className="space-y-8">
      {/* Reception Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-blue-200"
        >
          <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-blue-800">{todaysStats.total}</h3>
          <p className="text-sm md:text-base text-blue-600 font-medium">Total Appointments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-green-200"
        >
          <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-green-800">{todaysStats.confirmed}</h3>
          <p className="text-sm md:text-base text-green-600 font-medium">Confirmed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-yellow-200"
        >
          <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-yellow-800">{todaysStats.waiting}</h3>
          <p className="text-sm md:text-base text-yellow-600 font-medium">Waiting</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-purple-200"
        >
          <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-purple-800">{todaysStats.completed}</h3>
          <p className="text-sm md:text-base text-purple-600 font-medium">Completed</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">Reception Dashboard</h3>
          <button
            onClick={() => setShowNewAppointment(true)}
            className="bg-teal-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
          >
            <Plus className="h-5 w-5" />
            <span>New Appointment</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Appointment Board */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Appointments for <span className="whitespace-nowrap">{new Date(selectedDate).toLocaleDateString()}</span>
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
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.token_number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {appointment.patients?.first_name} {appointment.patients?.last_name}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Dr. {appointment.doctors?.name} • {appointment.appointment_time}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {appointment.doctors?.speciality}
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

      {/* Recent Patients */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Patients</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.slice(0, 6).map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white font-bold">
                  {patient.first_name?.[0]}{patient.last_name?.[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {patient.first_name} {patient.last_name}
                  </h4>
                  <p className="text-slate-600 text-sm">{patient.phone}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};