import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, Calendar, Activity, Pill, TestTube, UserCog, DollarSign } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { useAuth } from '../../contexts/AuthContext';
// Role-specific dashboards
import { DoctorDashboard } from './hospital/DoctorDashboard';
import { ReceptionDashboard } from './hospital/ReceptionDashboard';
import { PharmacyDashboard } from './hospital/PharmacyDashboard';
import { LabDashboard } from './hospital/LabDashboard';
import { HRDashboard } from './hospital/HRDashboard';
import { AccountsDashboard } from './hospital/AccountsDashboard';
import { AdminDashboard } from './hospital/AdminDashboard';

export const HospitalDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [metrics] = useState({
    totalPatients: 156,
    todayAppointments: 24,
    bedOccupancy: 78,
    revenue: 45600,
    emergencyCases: 3,
    staffOnDuty: 42
  });

  const navigation = [
    { name: 'Dashboard', path: '/hospital', icon: Building2, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { name: 'Appointments', path: '/hospital/appointments', icon: Calendar, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { name: 'Patients', path: '/hospital/patients', icon: Users, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { name: 'Emergency', path: '/hospital/emergency', icon: Activity, roles: ['admin', 'doctor', 'nurse'] },
    { name: 'Pharmacy', path: '/hospital/pharmacy', icon: Pill, roles: ['admin', 'pharmacist', 'doctor'] },
    { name: 'Laboratory', path: '/hospital/lab', icon: TestTube, roles: ['admin', 'lab_tech', 'doctor'] },
    { name: 'HR Management', path: '/hospital/hr', icon: UserCog, roles: ['admin', 'hr_manager'] },
    { name: 'Accounts', path: '/hospital/accounts', icon: DollarSign, roles: ['admin', 'receptionist'] }
  ];

  const getRoleDashboard = () => {
    switch (userProfile?.role) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'receptionist':
        return <ReceptionDashboard />;
      case 'pharmacist':
        return <PharmacyDashboard />;
      case 'lab_tech':
        return <LabDashboard />;
      case 'hr_manager':
        return <HRDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  const dashboardCards = [
    { title: 'Total Patients', value: metrics.totalPatients, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { title: "Today's Appointments", value: metrics.todayAppointments, icon: Calendar, color: 'from-green-500 to-green-600', change: '+8%' },
    { title: 'Bed Occupancy', value: `${metrics.bedOccupancy}%`, icon: Building2, color: 'from-yellow-500 to-yellow-600', change: '-3%' },
    { title: 'Daily Revenue', value: `₹${metrics.revenue.toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-purple-600', change: '+15%' },
    { title: 'Emergency Cases', value: metrics.emergencyCases, icon: Activity, color: 'from-red-500 to-red-600', change: '0%' },
    { title: 'Staff on Duty', value: metrics.staffOnDuty, icon: UserCog, color: 'from-teal-500 to-teal-600', change: '+5%' }
  ];

  return (
    <DashboardLayout
      title="Hospital Dashboard"
      subtitle="AI-Powered Hospital Operations"
      navigation={navigation}
      userRole={userProfile?.role}
    >
      <Routes>
        <Route path="/" element={
          <div className="space-y-6 md:space-y-8">
            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
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
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">
                {userProfile?.role ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) : 'User'} Dashboard
              </h2>
              {getRoleDashboard()}
            </div>
          </div>
        } />
        
        <Route path="/appointments" element={<div>Appointments Management</div>} />
        <Route path="/patients" element={<div>Patient Management</div>} />
        <Route path="/emergency" element={<div>Emergency Department</div>} />
        <Route path="/pharmacy" element={<PharmacyDashboard />} />
        <Route path="/lab" element={<LabDashboard />} />
        <Route path="/hr" element={<HRDashboard />} />
        <Route path="/accounts" element={
          <div className="p-1">
            <AccountsDashboard />
          </div>
        } />
      </Routes>
    </DashboardLayout>
  );
};