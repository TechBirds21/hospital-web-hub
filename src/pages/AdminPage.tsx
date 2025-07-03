import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, BarChart3, Settings, Eye, Trash2, Download } from 'lucide-react';
import { apiService } from '../services/api';

interface Contact {
  id: string;
  name: string;
  email: string;
  organization: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

interface AdminMetrics {
  totalContacts: number;
  newContacts: number;
  totalUsers: number;
  conversionRate: number;
}

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalContacts: 0,
    newContacts: 0,
    totalUsers: 0,
    conversionRate: 0
  });
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const fetchAdminData = async () => {
    try {
      const [contactsData, metricsData] = await Promise.all([
        apiService.getContacts(),
        apiService.getAdminMetrics()
      ]);
      setContacts(contactsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      // Fallback data
      setContacts([
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@medicenter.com',
          organization: 'MediCenter Hospital',
          phone: '+91 98765 43210',
          subject: 'demo',
          message: 'Interested in scheduling a demo for our 200-bed hospital. Looking for comprehensive patient management solution.',
          createdAt: '2024-03-15T10:30:00Z',
          status: 'new'
        },
        {
          id: '2',
          name: 'Rajesh Kumar',
          email: 'rajesh@dentalcare.com',
          organization: 'Dental Care Clinic',
          phone: '+91 87654 32109',
          subject: 'pricing',
          message: 'Need pricing information for dental module for 5 locations.',
          createdAt: '2024-03-14T14:15:00Z',
          status: 'contacted'
        }
      ]);
      setMetrics({
        totalContacts: 156,
        newContacts: 23,
        totalUsers: 1250,
        conversionRate: 12.5
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real implementation, this would call the auth API
      if (loginForm.email === 'admin@hospverse.com' && loginForm.password === 'admin123') {
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const updateContactStatus = async (contactId: string, status: Contact['status']) => {
    try {
      await apiService.updateContactStatus(contactId, status);
      setContacts(prev => prev.map(c => c.id === contactId ? { ...c, status } : c));
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContact = async (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await apiService.deleteContact(contactId);
        setContacts(prev => prev.filter(c => c.id !== contactId));
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const exportContacts = () => {
    const csv = [
      ['Name', 'Email', 'Organization', 'Phone', 'Subject', 'Status', 'Created At'],
      ...contacts.map(c => [
        c.name, c.email, c.organization, c.phone, c.subject, c.status,
        new Date(c.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hospverse-contacts.csv';
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Login</h1>
            <p className="text-slate-600">Access the admin dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="admin@hospverse.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Contacts</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.totalContacts}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">New Contacts</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.newContacts}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.conversionRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Contact Inquiries</h2>
            <button
              onClick={exportContacts}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{contact.name}</div>
                        <div className="text-sm text-slate-500">{contact.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {contact.organization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {contact.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value as Contact['status'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${
                          contact.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                          contact.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Contact Details</h3>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Name</label>
                      <p className="text-slate-800">{selectedContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Email</label>
                      <p className="text-slate-800">{selectedContact.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Organization</label>
                      <p className="text-slate-800">{selectedContact.organization}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Phone</label>
                      <p className="text-slate-800">{selectedContact.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Subject</label>
                    <p className="text-slate-800">{selectedContact.subject}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Message</label>
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{selectedContact.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};