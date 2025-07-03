import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Users, TrendingUp, Camera, FileText, DollarSign, Settings } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { useAuth } from '../../contexts/AuthContext';

// Aesthetic-specific dashboards
import { AestheticMainDashboard } from './aesthetic/AestheticMainDashboard';
import { AestheticReceptionDashboard } from './aesthetic/AestheticReceptionDashboard';

export const AestheticDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [metrics] = useState({
    todayAppointments: 12,
    activeTreatments: 8,
    consultations: 5,
    revenue: 45600,
    treatmentCompletion: 92,
    newClients: 4
  });

  const navigation = [
    { name: 'Dashboard', path: '/aesthetic', icon: Sparkles, roles: ['admin', 'doctor', 'practitioner', 'receptionist'] },
    { name: 'Appointments', path: '/aesthetic/appointments', icon: Calendar, roles: ['admin', 'doctor', 'practitioner', 'receptionist'] },
    { name: 'Clients', path: '/aesthetic/clients', icon: Users, roles: ['admin', 'doctor', 'practitioner', 'receptionist'] },
    { name: 'Treatments', path: '/aesthetic/treatments', icon: FileText, roles: ['admin', 'doctor', 'practitioner'] },
    { name: 'Gallery', path: '/aesthetic/gallery', icon: Camera, roles: ['admin', 'doctor', 'practitioner'] },
    { name: 'Billing', path: '/aesthetic/billing', icon: DollarSign, roles: ['admin', 'receptionist'] },
    { name: 'Settings', path: '/aesthetic/settings', icon: Settings, roles: ['admin'] }
  ];

  const getRoleDashboard = () => {
    switch (userProfile?.role) {
      case 'doctor':
      case 'practitioner':
        return <AestheticMainDashboard />;
      case 'receptionist':
        return <AestheticReceptionDashboard />;
      case 'admin':
        return <AestheticMainDashboard />;
      default:
        return <AestheticMainDashboard />;
    }
  };

  const dashboardCards = [
    { title: "Today's Appointments", value: metrics.todayAppointments, icon: Calendar, color: 'from-purple-500 to-purple-600', change: '+15%' },
    { title: 'Active Treatments', value: metrics.activeTreatments, icon: Sparkles, color: 'from-pink-500 to-pink-600', change: '+10%' },
    { title: 'Consultations', value: metrics.consultations, icon: Users, color: 'from-blue-500 to-blue-600', change: '+20%' },
    { title: 'Daily Revenue', value: `₹${metrics.revenue.toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-green-600', change: '+25%' },
    { title: 'Treatment Success', value: `${metrics.treatmentCompletion}%`, icon: TrendingUp, color: 'from-teal-500 to-teal-600', change: '+5%' },
    { title: 'New Clients', value: metrics.newClients, icon: Users, color: 'from-orange-500 to-orange-600', change: '+30%' }
  ];

  return (
    <DashboardLayout
      title="Aesthetic & Dermatology"
      subtitle="AI-Powered Aesthetic Practice Management"
      navigation={navigation}
      userRole={userProfile?.role}
    >
      <Routes>
        <Route path="/" element={
          <div className="space-y-8">
            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DashboardCard {...card} />
                </motion.div>
              ))}
            </div>

            {/* Role-specific Dashboard */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {userProfile?.role ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) : 'User'} Dashboard
              </h2>
              {getRoleDashboard()}
            </div>
          </div>
        } />
        
        <Route path="/appointments" element={<div>Aesthetic Appointments Management</div>} />
        <Route path="/clients" element={<div>Client Management</div>} />
        <Route path="/treatments" element={<div>Treatment Plans</div>} />
        <Route path="/gallery" element={<div>Before/After Gallery</div>} />
        <Route path="/billing" element={<div>Aesthetic Billing</div>} />
        <Route path="/settings" element={<div>Aesthetic Settings</div>} />
      </Routes>
    </DashboardLayout>
  );
};