import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TestTube, Clock, CheckCircle, AlertCircle, Upload, Download, Search } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';

export const LabDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    try {
      const { data } = await supabase
        .from('lab_tests')
        .select(`
          *,
          patients (
            first_name,
            last_name,
            phone
          ),
          doctors (
            name
          )
        `)
        .eq('clinic_id', userProfile?.clinic_id)
        .order('ordered_at', { ascending: false });

      setLabTests(data || []);
    } catch (error) {
      console.error('Error fetching lab tests:', error);
    }
  };

  const updateTestStatus = async (testId: string, status: string, additionalData = {}) => {
    try {
      const updateData = { status, ...additionalData };
      
      if (status === 'collected') {
        updateData.collected_at = new Date().toISOString();
      } else if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('lab_tests')
        .update(updateData)
        .eq('id', testId);

      if (!error) {
        fetchLabTests();
      }
    } catch (error) {
      console.error('Error updating test status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'collected': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ordered': return Clock;
      case 'collected': return TestTube;
      case 'processing': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredTests = labTests.filter(test => {
    const matchesSearch = 
      test.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patients?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patients?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: labTests.length,
    pending: labTests.filter(test => ['ordered', 'collected', 'processing'].includes(test.status)).length,
    completed: labTests.filter(test => test.status === 'completed').length,
    critical: labTests.filter(test => test.critical_values).length
  };

  return (
    <div className="space-y-8">
      {/* Lab Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
        >
          <TestTube className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
          <p className="text-blue-600 font-medium">Total Tests</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200"
        >
          <Clock className="h-8 w-8 text-yellow-600 mb-4" />
          <h3 className="text-2xl font-bold text-yellow-800">{stats.pending}</h3>
          <p className="text-yellow-600 font-medium">Pending</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
        >
          <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-800">{stats.completed}</h3>
          <p className="text-green-600 font-medium">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200"
        >
          <AlertCircle className="h-8 w-8 text-red-600 mb-4" />
          <h3 className="text-2xl font-bold text-red-800">{stats.critical}</h3>
          <p className="text-red-600 font-medium">Critical Values</p>
        </motion.div>
      </div>

      {/* Lab Management */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800">Laboratory Tests</h3>
          <button className="bg-teal-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-1 md:space-x-2 text-sm md:text-base">
            <Upload className="h-5 w-5" />
            <span>Upload Results</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests or patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="ordered">Ordered</option>
              <option value="collected">Collected</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTests.map((test, index) => {
            const StatusIcon = getStatusIcon(test.status);
            
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-xl p-4 hover:shadow-lg transition-all duration-200 ${
                  test.critical_values ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      test.critical_values ? 'bg-red-100' : 'bg-slate-100'
                    }`}>
                      <StatusIcon className={`h-6 w-6 ${
                        test.critical_values ? 'text-red-600' : 'text-slate-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                        <span>{test.test_name}</span>
                        {test.critical_values && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            CRITICAL
                          </span>
                        )}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Patient: {test.patients?.first_name} {test.patients?.last_name}
                      </p>
                      <p className="text-slate-500 text-sm">
                        Ordered by Dr. {test.doctors?.name} • {new Date(test.ordered_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status.toUpperCase()}
                    </span>
                    
                    {test.status === 'ordered' && (
                      <button
                        onClick={() => updateTestStatus(test.id, 'collected')}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                      >
                        Mark Collected
                      </button>
                    )}
                    
                    {test.status === 'collected' && (
                      <button
                        onClick={() => updateTestStatus(test.id, 'processing')}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Start Processing
                      </button>
                    )}
                    
                    {test.status === 'processing' && (
                      <button
                        onClick={() => updateTestStatus(test.id, 'completed')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                    
                    {test.status === 'completed' && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>
                </div>

                {test.status === 'completed' && test.results && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-slate-200"
                  >
                    <h5 className="font-semibold text-slate-800 mb-2">Results:</h5>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                        {JSON.stringify(test.results, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <TestTube className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No tests found</h3>
            <p className="text-slate-500">No lab tests match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};