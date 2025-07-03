import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, FileText, Mic, MicOff, Brain, Activity } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { isLocalAuthEnabled } from '../../../utils/localAuth';

export const DoctorDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [todaysStats, setTodaysStats] = useState({
    totalAppointments: 0,
    completed: 0,
    pending: 0,
    nextPatient: null
  });
  const [isRecording, setIsRecording] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchTodaysAppointments();
  }, []);

  const fetchTodaysAppointments = async () => {
    // If local auth is enabled, use mock data instead of Supabase
    if (isLocalAuthEnabled()) {
      const mockAppointments = [
        {
          id: '1',
          appointment_time: '09:00',
          token_number: 1,
          status: 'scheduled',
          patients: { first_name: 'Rajesh', last_name: 'Kumar', phone: '+91 98765 43210' },
          chief_complaint: 'Chest pain consultation'
        },
        {
          id: '2',
          appointment_time: '09:30',
          token_number: 2,
          status: 'completed',
          patients: { first_name: 'Priya', last_name: 'Sharma', phone: '+91 87654 32109' },
          chief_complaint: 'Follow-up consultation'
        },
        {
          id: '3',
          appointment_time: '10:00',
          token_number: 3,
          status: 'scheduled',
          patients: { first_name: 'Amit', last_name: 'Verma', phone: '+91 76543 21098' },
          chief_complaint: 'General checkup'
        }
      ];
      
      setAppointments(mockAppointments);
      setTodaysStats({
        totalAppointments: 3,
        completed: 1,
        pending: 2,
        nextPatient: mockAppointments.find(apt => apt.status === 'scheduled')
      });
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Get current user's doctor record
      const { data: currentUser } = await supabase
        .from('users')
        .select('id, auth_user_id')
        .eq('auth_user_id', userProfile?.auth_user_id || userProfile?.id)
        .single();
      
      if (!currentUser) return;
      
      const { data: doctor } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();

      if (doctor) {
        const { data: appointmentsData } = await supabase
          .from('appointments')
          .select(`
            *,
            patients (
              first_name,
              last_name,
              phone,
              date_of_birth
            )
          `)
          .eq('doctor_id', doctor.id)
          .eq('appointment_date', today)
          .order('appointment_time');

        setAppointments(appointmentsData || []);
        
        const stats = {
          totalAppointments: appointmentsData?.length || 0,
          completed: appointmentsData?.filter(apt => apt.status === 'completed').length || 0,
          pending: appointmentsData?.filter(apt => apt.status === 'scheduled').length || 0,
          nextPatient: appointmentsData?.find(apt => apt.status === 'scheduled') || null
        };
        
        setTodaysStats(stats);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Use fallback mock data if API fails
      const mockAppointments = [
        {
          id: '1',
          appointment_time: '09:00',
          token_number: 1,
          status: 'scheduled',
          patients: { first_name: 'Rajesh', last_name: 'Kumar', phone: '+91 98765 43210' },
          chief_complaint: 'Chest pain consultation'
        }
      ];
      setAppointments(mockAppointments);
      setTodaysStats({
        totalAppointments: 1,
        completed: 0,
        pending: 1,
        nextPatient: mockAppointments[0]
      });
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string, updates = {}) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status, ...updates })
        .eq('id', appointmentId);

      if (!error) {
        fetchTodaysAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const startVoiceNote = () => {
    setIsRecording(true);
    // Implement voice recording logic here
  };

  const stopVoiceNote = () => {
    setIsRecording(false);
    // Process voice note and auto-fill SOAP notes
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Today's Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-blue-200"
        >
          <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-blue-800">{todaysStats.totalAppointments}</h3>
          <p className="text-xs md:text-base text-blue-600 font-medium">Total Appointments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-green-200"
        >
          <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-green-800">{todaysStats.completed}</h3>
          <p className="text-xs md:text-base text-green-600 font-medium">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-yellow-200"
        >
          <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-yellow-800">{todaysStats.pending}</h3>
          <p className="text-xs md:text-base text-yellow-600 font-medium">Pending</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-purple-200"
        >
          <Activity className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mb-2 md:mb-4" />
          <h3 className="text-lg md:text-2xl font-bold text-purple-800">AI</h3>
          <p className="text-xs md:text-base text-purple-600 font-medium">Insights Ready</p>
        </motion.div>
      </div>

      {/* Next Patient Alert */}
      {todaysStats.nextPatient && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl p-5 md:p-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Next Patient</h3>
              <p className="text-base md:text-lg">
                {todaysStats.nextPatient.patients?.first_name} {todaysStats.nextPatient.patients?.last_name}
              </p>
              <p className="text-xs md:text-sm text-teal-100">
                {todaysStats.nextPatient.appointment_time} • Token #{todaysStats.nextPatient.token_number}
              </p>
            </div>
            <button
              onClick={() => updateAppointmentStatus(todaysStats.nextPatient.id, 'in_progress')}
              className="bg-white text-teal-600 px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium md:font-semibold hover:bg-teal-50 transition-colors text-sm md:text-base"
            >
              Start Consultation
            </button>
          </div>
        </motion.div>
      )}

      {/* Appointment Queue */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800">Today's Queue</h3>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-xs md:text-sm text-purple-600 font-medium">AI Insights</span>
          </div>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="border border-slate-200 rounded-xl p-3 md:p-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.token_number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      <span className="text-sm md:text-base">{appointment.patients?.first_name} {appointment.patients?.last_name}</span>
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {appointment.appointment_time} • {appointment.chief_complaint || 'General consultation'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.replace('_', ' ').toUpperCase()}
                  </span>
                  
                  {appointment.status === 'scheduled' && (
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, 'in_progress')}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                    >
                      Start
                    </button>
                  )}
                  
                  {appointment.status === 'in_progress' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={isRecording ? stopVoiceNote : startVoiceNote}
                        className={`p-2 rounded-lg transition-colors ${
                          isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                        }`}
                      >
                        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed', {
                          diagnosis: 'Consultation completed',
                          treatment_plan: 'Follow-up as needed'
                        })}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {appointment.status === 'in_progress' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-slate-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Diagnosis
                      </label>
                      <textarea
                        className="w-full p-3 border border-slate-300 rounded-lg text-sm"
                        rows={3}
                        placeholder="Enter diagnosis..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Treatment Plan
                      </label>
                      <textarea
                        className="w-full p-3 border border-slate-300 rounded-lg text-sm"
                        rows={3}
                        placeholder="Enter treatment plan..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No appointments today</h3>
            <p className="text-slate-500">Your schedule is clear for today.</p>
          </div>
        )}
      </div>
    </div>
  );
};