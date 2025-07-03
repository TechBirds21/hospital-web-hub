import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  change?: string;
  description?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  description
}) => {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-slate-600'
          }`}>
            {isPositive && <TrendingUp className="h-4 w-4" />}
            {isNegative && <TrendingDown className="h-4 w-4" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        <p className="text-sm sm:text-base text-slate-600 font-medium">{title}</p>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
};