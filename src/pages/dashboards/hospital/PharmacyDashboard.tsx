import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertTriangle, Package, Search, Plus, Calendar, TrendingDown } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { isLocalAuthEnabled } from '../../../utils/localAuth';

export const PharmacyDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [pharmacyItems, setPharmacyItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPharmacyData();
  }, []);

  const fetchPharmacyData = async () => {
    // If local auth is enabled, use mock data instead of Supabase
    if (isLocalAuthEnabled()) {
      const mockItems = [
        {
          id: '1',
          name: 'Paracetamol 500mg',
          generic_name: 'Paracetamol',
          quantity_available: 50,
          reorder_level: 20,
          unit_price: 5.50,
          supplier: 'MedSupply Co.',
          batch_number: 'PC001',
          expiry_date: '2025-12-31'
        },
        {
          id: '2',
          name: 'Ibuprofen 400mg',
          generic_name: 'Ibuprofen',
          quantity_available: 15,
          reorder_level: 20,
          unit_price: 8.75,
          supplier: 'PharmaSupply Ltd.',
          batch_number: 'IB002',
          expiry_date: '2024-08-15'
        },
        {
          id: '3',
          name: 'Amoxicillin 250mg',
          generic_name: 'Amoxicillin',
          quantity_available: 100,
          reorder_level: 30,
          unit_price: 12.25,
          supplier: 'MedSupply Co.',
          batch_number: 'AM003',
          expiry_date: '2025-03-20'
        }
      ];
      
      setPharmacyItems(mockItems);
      
      // Filter low stock items
      const lowStock = mockItems.filter(item => 
        item.quantity_available <= item.reorder_level
      );
      setLowStockItems(lowStock);

      // Filter expiring items (within 60 days)
      const expiringDate = new Date();
      expiringDate.setDate(expiringDate.getDate() + 60);
      
      const expiring = mockItems.filter(item => 
        item.expiry_date && new Date(item.expiry_date) <= expiringDate
      );
      setExpiringItems(expiring);
      return;
    }

    try {
      // Get current user's clinic
      const { data: currentUser } = await supabase
        .from('users')
        .select('clinic_id, hospital_id')
        .eq('auth_user_id', userProfile?.auth_user_id)
        .single();
      
      const clinicId = currentUser?.clinic_id || currentUser?.hospital_id;
      if (!clinicId) return;
      
      const { data: items } = await supabase
        .from('pharmacy_items')
        .select('*')
        .eq('clinic_id', clinicId)
        .eq('is_active', true)
        .order('name');

      setPharmacyItems(items || []);

      // Filter low stock items
      const lowStock = items?.filter(item => 
        item.quantity_available <= item.reorder_level
      ) || [];
      setLowStockItems(lowStock);

      // Filter expiring items (within 60 days)
      const expiringDate = new Date();
      expiringDate.setDate(expiringDate.getDate() + 60);
      
      const expiring = items?.filter(item => 
        item.expiry_date && new Date(item.expiry_date) <= expiringDate
      ) || [];
      setExpiringItems(expiring);

    } catch (error) {
      console.error('Error fetching pharmacy data:', error);
      // Use fallback mock data
      const mockItems = [
        {
          id: '1',
          name: 'Paracetamol 500mg',
          generic_name: 'Paracetamol',
          quantity_available: 50,
          reorder_level: 20,
          unit_price: 5.50,
          supplier: 'MedSupply Co.',
          batch_number: 'PC001',
          expiry_date: '2025-12-31'
        }
      ];
      setPharmacyItems(mockItems);
      setLowStockItems([]);
      setExpiringItems([]);
    }
  };

  const updateStock = async (itemId: string, newQuantity: number) => {
    try {
      const { error } = await supabase
        .from('pharmacy_items')
        .update({ quantity_available: newQuantity })
        .eq('id', itemId);

      if (!error) {
        fetchPharmacyData();
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const filteredItems = pharmacyItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.generic_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalItems: pharmacyItems.length,
    lowStock: lowStockItems.length,
    expiring: expiringItems.length,
    totalValue: pharmacyItems.reduce((sum, item) => sum + (item.quantity_available * item.unit_price), 0)
  };

  return (
    <div className="space-y-8">
      {/* Pharmacy Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
        >
          <Package className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-800">{stats.totalItems}</h3>
          <p className="text-blue-600 font-medium">Total Items</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200"
        >
          <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
          <h3 className="text-2xl font-bold text-red-800">{stats.lowStock}</h3>
          <p className="text-red-600 font-medium">Low Stock Alerts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200"
        >
          <Calendar className="h-8 w-8 text-yellow-600 mb-4" />
          <h3 className="text-2xl font-bold text-yellow-800">{stats.expiring}</h3>
          <p className="text-yellow-600 font-medium">Expiring Soon</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
        >
          <TrendingDown className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-800">₹{stats.totalValue.toLocaleString()}</h3>
          <p className="text-green-600 font-medium">Inventory Value</p>
        </motion.div>
      </div>

      {/* Critical Alerts */}
      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span>Critical Alerts</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Low Stock Items */}
            {lowStockItems.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-800 mb-4">Low Stock Items</h4>
                <div className="space-y-3">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-800">{item.name}</p>
                        <p className="text-sm text-red-600">Stock: {item.quantity_available} | Reorder: {item.reorder_level}</p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Reorder
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expiring Items */}
            {expiringItems.length > 0 && (
              <div>
                <h4 className="font-semibold text-yellow-800 mb-4">Expiring Soon</h4>
                <div className="space-y-3">
                  {expiringItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium text-yellow-800">{item.name}</p>
                        <p className="text-sm text-yellow-600">
                          Expires: {new Date(item.expiry_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {Math.ceil((new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inventory Management */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800">Inventory Management</h3>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{item.name}</div>
                      <div className="text-sm text-slate-500">{item.generic_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.batch_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        item.quantity_available <= item.reorder_level ? 'text-red-600' : 'text-slate-900'
                      }`}>
                        {item.quantity_available}
                      </span>
                      {item.quantity_available <= item.reorder_level && (
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    ₹{item.unit_price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateStock(item.id, item.quantity_available + 1)}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        +
                      </button>
                      <button
                        onClick={() => updateStock(item.id, Math.max(0, item.quantity_available - 1))}
                        className="text-red-600 hover:text-red-900"
                      >
                        -
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Pill className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No items found</h3>
            <p className="text-slate-500">Try adjusting your search or add new items to inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
};