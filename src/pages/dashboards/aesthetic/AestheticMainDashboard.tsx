import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Camera, Sparkles } from 'lucide-react';


export const AestheticMainDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [treatments, setTreatments] = useState<any[]>([]);

  useEffect(() => {
    fetchAestheticData();
  }, []);

  const fetchAestheticData = async () => {
    try {
      // Mock aesthetic appointments data
      const mockAppointments = [
        {
          id: '1',
          appointment_time: '10:00',
          token_number: 1,
          status: 'scheduled',
          clients: { first_name: 'Priya', last_name: 'Sharma', phone: '+91 98765 43210' },
          treatment_type: 'Laser Hair Removal',
          session_number: '3/6'
        },
        {
          id: '2',
          appointment_time: '11:30',
          token_number: 2,
          status: 'in_progress',
          clients: { first_name: 'Kavya', last_name: 'Reddy', phone: '+91 87654 32109' },
          treatment_type: 'Chemical Peel',
          session_number: '1/1'
        },
        {
          id: '3',
          appointment_time: '14:00',
          token_number: 3,
          status: 'scheduled',
          clients: { first_name: 'Sneha', last_name: 'Kumar', phone: '+91 76543 21098' },
          treatment_type: 'Botox Consultation',
          session_number: 'Initial'
        }
      ];

      setAppointments(mockAppointments);

      // Mock active treatments
      const mockTreatments = [
        {
          id: '1',
          client_name: 'Priya Sharma',
          treatment: 'Laser Hair Removal Package',
          progress: 50,
          next_session: '2025-01-20',
          sessions_completed: 3,
          total_sessions: 6
        },
        {
          id: '2',
          client_name: 'Anita Patel',
          treatment: 'Acne Scar Treatment',
          progress: 75,
          next_session: '2025-01-18',
          sessions_completed: 3,
          total_sessions: 4
        }
      ];

      setTreatments(mockTreatments);
    } catch (error) {
      console.error('Error fetching aesthetic data:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysStats = {
    totalAppointments: appointments.length,
    consultations: appointments.filter(apt => apt.treatment_type.includes('Consultation')).length,
    treatments: appointments.filter(apt => !apt.treatment_type.includes('Consultation')).length,
    nextAppointment: appointments.find(apt => apt.status === 'scheduled')
  };

  return (
    <div className="space-y-8">
      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
        >
          <Calendar className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-800">{todaysStats.totalAppointments}</h3>
          <p className="text-purple-600 font-medium">Today's Sessions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200"
        >
          <Users className="h-8 w-8 text-pink-600 mb-4" />
          <h3 className="text-2xl font-bold text-pink-800">{todaysStats.consultations}</h3>
          <p className="text-pink-600 font-medium">Consultations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
        >
          <Sparkles className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-800">{todaysStats.treatments}</h3>
          <p className="text-blue-600 font-medium">Treatments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200"
        >
          <Camera className="h-8 w-8 text-teal-600 mb-4" />
          <h3 className="text-2xl font-bold text-teal-800">AI</h3>
          <p className="text-teal-600 font-medium">Skin Analysis</p>
        </motion.div>
      </div>

      {/* Next Client Alert */}
      {todaysStats.nextAppointment && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Next Client</h3>
              <p className="text-lg">
                {todaysStats.nextAppointment.clients?.first_name} {todaysStats.nextAppointment.clients?.last_name}
              </p>
              <p className="text-purple-100">
                {todaysStats.nextAppointment.appointment_time} • {todaysStats.nextAppointment.treatment_type}
              </p>
              <p className="text-purple-100 text-sm mt-1">
                Session: {todaysStats.nextAppointment.session_number}
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Start Session
            </button>
          </div>
        </motion.div>
      )}

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Today's Schedule</h3>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-purple-600 font-medium">Aesthetic AI Assistant</span>
          </div>
        </div>

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
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.token_number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {appointment.clients?.first_name} {appointment.clients?.last_name}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {appointment.appointment_time} • {appointment.treatment_type}
                    </p>
                    <p className="text-slate-500 text-sm">
                      Session: {appointment.session_number}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.replace('_', ' ').toUpperCase()}
                  </span>
                  
                  {appointment.status === 'scheduled' && (
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      Start Session
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Treatments */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Active Treatment Plans</h3>
        
        <div className="space-y-4">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-800">{treatment.client_name}</h4>
                  <p className="text-slate-600">{treatment.treatment}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Progress</p>
                  <p className="text-lg font-bold text-slate-800">{treatment.progress}%</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Sessions: {treatment.sessions_completed}/{treatment.total_sessions}</span>
                  <span>Next: {new Date(treatment.next_session).toLocaleDateString()}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${treatment.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                  View Progress Photos
                </button>
                <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Schedule Next Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};