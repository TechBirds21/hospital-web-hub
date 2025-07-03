import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Bed, Users, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';


export const AdminDashboard: React.FC = () => {
  const [hospitalMetrics] = useState({
    totalBeds: 100,
    occupiedBeds: 78,
    totalPatients: 156,
    emergencyCases: 3,
    staffOnDuty: 42,
    revenue: 145600
  });

  const bedOccupancyRate = Math.round((hospitalMetrics.occupiedBeds / hospitalMetrics.totalBeds) * 100);

  const departmentData = [
    { name: 'Emergency', patients: 12, capacity: 15, urgency: 'high' },
    { name: 'ICU', patients: 8, capacity: 10, urgency: 'critical' },
    { name: 'General Ward', patients: 45, capacity: 50, urgency: 'normal' },
    { name: 'Pediatrics', patients: 15, capacity: 20, urgency: 'normal' },
    { name: 'Maternity', patients: 18, capacity: 25, urgency: 'normal' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'normal': return 'from-green-500 to-green-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hospital Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-blue-200"
        >
          <Bed className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-blue-600 mb-2 md:mb-3 lg:mb-4" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-800">{bedOccupancyRate}%</h3>
          <p className="text-xs md:text-sm lg:text-base text-blue-600 font-medium">Bed Occupancy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 md:p-4 lg:p-6 border border-green-200"
        >
          <Users className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-600 mb-2 md:mb-3 lg:mb-4" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-green-800">{hospitalMetrics.totalPatients}</h3>
          <p className="text-xs md:text-sm lg:text-base text-green-600 font-medium">Total Patients</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200"
        >
          <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
          <h3 className="text-2xl font-bold text-red-800">{hospitalMetrics.emergencyCases}</h3>
          <p className="text-red-600 font-medium">Emergency Cases</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
        >
          <Activity className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-800">{hospitalMetrics.staffOnDuty}</h3>
          <p className="text-purple-600 font-medium">Staff on Duty</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200"
        >
          <TrendingUp className="h-8 w-8 text-teal-600 mb-4" />
          <h3 className="text-2xl font-bold text-teal-800">₹{hospitalMetrics.revenue.toLocaleString()}</h3>
          <p className="text-teal-600 font-medium">Today's Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200"
        >
          <Calendar className="h-8 w-8 text-yellow-600 mb-4" />
          <h3 className="text-2xl font-bold text-yellow-800">24</h3>
          <p className="text-yellow-600 font-medium">Scheduled Today</p>
        </motion.div>
      </div>

      {/* Live Bed Occupancy Heatmap */}
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">Department Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {departmentData.map((dept, index) => {
            const occupancyRate = Math.round((dept.patients / dept.capacity) * 100);
            
            return (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 md:p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800">{dept.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getUrgencyColor(dept.urgency)}`}>
                    {dept.urgency.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Occupancy</span>
                    <span className="font-medium ml-2 whitespace-nowrap">{dept.patients}/{dept.capacity}</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyRate}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-3 rounded-full bg-gradient-to-r ${
                        occupancyRate > 90 ? 'from-red-500 to-red-600' :
                        occupancyRate > 75 ? 'from-yellow-500 to-yellow-600' :
                        'from-green-500 to-green-600'
                      }`}
                    />
                  </div>
                  
                  <div className="text-base md:text-lg font-bold text-slate-800">
                    {occupancyRate}% Occupied
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Revenue Split Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">Revenue Breakdown</h3>
          
          <div className="space-y-4">
            {[
              { category: 'OPD Consultations', amount: 45600, percentage: 31 },
              { category: 'IPD Services', amount: 67200, percentage: 46 },
              { category: 'Pharmacy', amount: 21800, percentage: 15 },
              { category: 'Laboratory', amount: 11000, percentage: 8 }
            ].map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <div>
                  <h4 className="font-medium text-slate-800">{item.category}</h4>
                  <p className="text-sm text-slate-600">₹{item.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800">{item.percentage}%</div>
                  <div className="w-20 bg-slate-200 rounded-full h-2 mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Key Performance Indicators</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-800">Average Length of Stay</h4>
                  <p className="text-2xl font-bold text-blue-900">3.2 days</p>
                </div>
                <div className="text-blue-600">
                  <TrendingUp className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-800">Patient Satisfaction</h4>
                  <p className="text-2xl font-bold text-green-900">4.7/5.0</p>
                </div>
                <div className="text-green-600">
                  <Activity className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-purple-800">Staff Efficiency</h4>
                  <p className="text-2xl font-bold text-purple-900">89%</p>
                </div>
                <div className="text-purple-600">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};