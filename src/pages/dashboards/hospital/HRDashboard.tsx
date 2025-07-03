import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { isLocalAuthEnabled } from '../../../utils/localAuth';

export const HRDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    // If local auth is enabled, use mock data instead of Supabase
    if (isLocalAuthEnabled()) {
      const mockStaff = [
        {
          id: '1',
          employee_id: 'EMP001',
          position: 'Senior Nurse',
          department: 'Emergency',
          salary: 45000,
          shift_type: 'morning',
          status: 'active',
          join_date: '2023-01-15',
          users: {
            email: 'nurse1@hospital.com',
            phone: '+91 98765 43210'
          }
        },
        {
          id: '2',
          employee_id: 'EMP002',
          position: 'Receptionist',
          department: 'Administration',
          salary: 25000,
          shift_type: 'evening',
          status: 'active',
          join_date: '2023-03-20',
          users: {
            email: 'reception@hospital.com',
            phone: '+91 87654 32109'
          }
        },
        {
          id: '3',
          employee_id: 'EMP003',
          position: 'Lab Technician',
          department: 'Laboratory',
          salary: 35000,
          shift_type: 'morning',
          status: 'active',
          join_date: '2024-01-10',
          users: {
            email: 'lab.tech@hospital.com',
            phone: '+91 76543 21098'
          }
        }
      ];
      
      setStaff(mockStaff);
      return;
    }

    try {
      const { data: staffData } = await supabase
        .from('hr_staff')
        .select(`
          *,
          users (
            email,
            phone
          )
        `)
        .eq('clinic_id', userProfile?.clinic_id)
        .eq('status', 'active');

      setStaff(staffData || []);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const stats = {
    totalStaff: staff.length,
    onDuty: staff.filter(s => s.shift_type !== 'off').length,
    avgSalary: staff.reduce((sum, s) => sum + (s.salary || 0), 0) / staff.length || 0,
    newHires: staff.filter(s => {
      const joinDate = new Date(s.join_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate >= thirtyDaysAgo;
    }).length
  };

  return (
    <div className="space-y-8">
      {/* HR Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
        >
          <Users className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-800">{stats.totalStaff}</h3>
          <p className="text-blue-600 font-medium">Total Staff</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
        >
          <Clock className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-800">{stats.onDuty}</h3>
          <p className="text-green-600 font-medium">On Duty Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
        >
          <DollarSign className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-800">₹{Math.round(stats.avgSalary).toLocaleString()}</h3>
          <p className="text-purple-600 font-medium">Avg. Salary</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200"
        >
          <UserPlus className="h-8 w-8 text-teal-600 mb-4" />
          <h3 className="text-2xl font-bold text-teal-800">{stats.newHires}</h3>
          <p className="text-teal-600 font-medium">New Hires (30 days)</p>
        </motion.div>
      </div>

      {/* Staff Management */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800">Staff Management</h3>
          <button className="bg-teal-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-1 md:space-x-2 text-sm md:text-base">
            <UserPlus className="h-5 w-5" />
            <span>Add Staff</span>
          </button>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {staff.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{employee.employee_id}</div>
                      <div className="text-sm text-slate-500">{employee.users?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.shift_type === 'morning' ? 'bg-yellow-100 text-yellow-800' :
                      employee.shift_type === 'evening' ? 'bg-orange-100 text-orange-800' :
                      employee.shift_type === 'night' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.shift_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    ₹{employee.salary?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {staff.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No staff members found</h3>
            <p className="text-slate-500">Add staff members to get started with HR management.</p>
          </div>
        )}
      </div>
    </div>
  );
};