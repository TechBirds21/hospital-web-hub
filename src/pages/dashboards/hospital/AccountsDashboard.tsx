import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';

export const AccountsDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    fetchTransactions();
  }, [selectedPeriod]);

  const fetchTransactions = async () => {
    try {
      let startDate = new Date();
      
      if (selectedPeriod === 'today') {
        startDate.setHours(0, 0, 0, 0);
      } else if (selectedPeriod === 'week') {
        startDate.setDate(startDate.getDate() - 7);
      } else if (selectedPeriod === 'month') {
        startDate.setDate(startDate.getDate() - 30);
      }

      const { data } = await supabase
        .from('accounts_tx')
        .select('*')
        .eq('clinic_id', userProfile?.clinic_id)
        .gte('transaction_date', startDate.toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const stats = {
    totalIncome: transactions
      .filter(tx => tx.transaction_type === 'income')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0),
    totalExpenses: transactions
      .filter(tx => tx.transaction_type === 'expense')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0),
    cashPayments: transactions
      .filter(tx => tx.payment_method === 'cash')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0),
    digitalPayments: transactions
      .filter(tx => ['card', 'upi', 'bank_transfer'].includes(tx.payment_method))
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
  };

  const netIncome = stats.totalIncome - stats.totalExpenses;

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income': return 'text-green-600';
      case 'expense': return 'text-red-600';
      case 'refund': return 'text-orange-600';
      default: return 'text-slate-600';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return '💵';
      case 'card': return '💳';
      case 'upi': return '📱';
      case 'bank_transfer': return '🏦';
      default: return '💰';
    }
  };

  return (
    <div className="space-y-8">
      {/* Financial Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
        >
          <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-800">₹{stats.totalIncome.toLocaleString()}</h3>
          <p className="text-green-600 font-medium">Total Income</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200"
        >
          <TrendingDown className="h-8 w-8 text-red-600 mb-4" />
          <h3 className="text-2xl font-bold text-red-800">₹{stats.totalExpenses.toLocaleString()}</h3>
          <p className="text-red-600 font-medium">Total Expenses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-br rounded-2xl p-6 border ${
            netIncome >= 0 
              ? 'from-blue-50 to-blue-100 border-blue-200' 
              : 'from-orange-50 to-orange-100 border-orange-200'
          }`}
        >
          <DollarSign className={`h-8 w-8 mb-4 ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
          <h3 className={`text-2xl font-bold ${netIncome >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
            ₹{Math.abs(netIncome).toLocaleString()}
          </h3>
          <p className={`font-medium ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            Net {netIncome >= 0 ? 'Profit' : 'Loss'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
        >
          <CreditCard className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-800">
            {Math.round((stats.digitalPayments / (stats.totalIncome || 1)) * 100)}%
          </h3>
          <p className="text-purple-600 font-medium">Digital Payments</p>
        </motion.div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-800">Financial Transactions</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' }
            ].map(period => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period.key ?
                    'bg-teal-600 text-white' : 
                    'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl mb-2">💵</div>
            <div className="text-lg font-bold text-slate-800">₹{stats.cashPayments.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Cash</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl mb-2">💳</div>
            <div className="text-lg font-bold text-slate-800">₹{stats.digitalPayments.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Digital</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-lg font-bold text-slate-800">{transactions.length}</div>
            <div className="text-sm text-slate-600">Transactions</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-lg font-bold text-slate-800">
              ₹{transactions.length > 0 ? Math.round(stats.totalIncome / transactions.length).toLocaleString() : 0}
            </div>
            <div className="text-sm text-slate-600">Avg. Transaction</div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.slice(0, 10).map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">
                  {getPaymentMethodIcon(transaction.payment_method)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{transaction.category}</h4>
                  <p className="text-slate-600 text-sm">{transaction.description}</p>
                  <p className="text-slate-500 text-xs">
                    {new Date(transaction.created_at).toLocaleDateString()} • {transaction.payment_method}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-bold ${getTransactionColor(transaction.transaction_type)}`}>
                  {transaction.transaction_type === 'expense' ? '-' : '+'}₹{parseFloat(transaction.amount).toLocaleString()}
                </div>
                <div className="text-sm text-slate-500 capitalize">
                  {transaction.transaction_type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No transactions found</h3>
            <p className="text-slate-500">No financial transactions for the selected period.</p>
          </div>
        )}
      </div>
    </div>
  );
};