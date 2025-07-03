import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, Search, Plus, Calendar, TrendingDown } from 'lucide-react';


export const DentalInventoryDashboard: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [expiringItems, setExpiringItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      // Mock dental inventory data
      const mockItems = [
        {
          id: '1',
          name: 'Dental Composite Resin',
          category: 'Restorative',
          batch_number: 'DCR2024001',
          quantity_available: 5,
          reorder_level: 10,
          unit_price: 2500,
          expiry_date: '2025-06-15',
          supplier: 'Dental Supply Co.'
        },
        {
          id: '2',
          name: 'Prophylaxis Paste',
          category: 'Cleaning',
          batch_number: 'PP2024002',
          quantity_available: 25,
          reorder_level: 15,
          unit_price: 450,
          expiry_date: '2025-12-30',
          supplier: 'Oral Care Ltd.'
        },
        {
          id: '3',
          name: 'Local Anesthetic (Lidocaine)',
          category: 'Anesthesia',
          batch_number: 'LA2024003',
          quantity_available: 3,
          reorder_level: 8,
          unit_price: 180,
          expiry_date: '2025-03-20',
          supplier: 'Medical Supplies Inc.'
        },
        {
          id: '4',
          name: 'Dental Burs Set',
          category: 'Instruments',
          batch_number: 'DBS2024004',
          quantity_available: 12,
          reorder_level: 6,
          unit_price: 3200,
          expiry_date: null,
          supplier: 'Instrument Pro'
        }
      ];

      setInventoryItems(mockItems);

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

    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalItems: inventoryItems.length,
    lowStock: lowStockItems.length,
    expiring: expiringItems.length,
    totalValue: inventoryItems.reduce((sum, item) => sum + (item.quantity_available * item.unit_price), 0)
  };

  return (
    <div className="space-y-8">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span>Critical Alerts</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        <p className="text-xs text-red-500">{item.category}</p>
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
                        <p className="text-xs text-yellow-500">Batch: {item.batch_number}</p>
                      </div>
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {Math.ceil((new Date(item.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
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
          <h3 className="text-xl font-bold text-slate-800">Dental Inventory</h3>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search dental supplies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{item.name}</div>
                      <div className="text-sm text-slate-500">Batch: {item.batch_number}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
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
                    <div className="text-xs text-slate-500">Reorder: {item.reorder_level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    ₹{item.unit_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {item.supplier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No items found</h3>
            <p className="text-slate-500">Try adjusting your search or add new items to inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
};