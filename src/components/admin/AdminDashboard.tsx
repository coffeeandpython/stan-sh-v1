import React from 'react';
import {
  Building2,
  ClipboardCheck,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Plus
} from 'lucide-react';
import { Property, Inspection, Inspector, Builder } from '../../types';
import { mockAdminKPI, mockActivityFeed } from '../../data/adminMockData';

interface AdminDashboardProps {
  properties: Property[];
  inspections: Inspection[];
  inspectors: Inspector[];
  builders: Builder[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  inspections,
  inspectors,
  builders
}) => {
  const kpis = mockAdminKPI;
  const activityFeed = mockActivityFeed.slice(0, 8);

  const activeInspectors = inspectors.filter(i => i.isActive);
  const pendingCorrections = properties.filter(p => p.status === 'failed').length;
  const overdueInspections = inspections.filter(i =>
    new Date(i.scheduledDate) < new Date() && i.status === 'scheduled'
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': case 'rejected': case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'in-progress': case 'scheduled': case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': case 'approved': return <CheckCircle2 className="h-4 w-4" />;
      case 'failed': case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'in-progress': case 'scheduled': case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const KPICard = ({ title, value, icon: Icon, change, color, prefix = '', suffix = '' }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change.type === 'increase' ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {change.value}% from last month
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Good morning, Stan! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your business overview. You have {pendingCorrections} pending corrections and {overdueInspections} overdue inspections that need attention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Total Properties"
          value={kpis.totalProperties}
          icon={Building2}
          change={{ type: 'increase', value: 8.2 }}
          color="bg-blue-600"
        />
        <KPICard
          title="Active Inspections"
          value={kpis.activeInspections}
          icon={ClipboardCheck}
          change={{ type: 'decrease', value: 3.1 }}
          color="bg-orange-600"
        />
        <KPICard
          title="Pass Rate"
          value={94.2}
          icon={CheckCircle2}
          change={{ type: 'increase', value: 2.1 }}
          color="bg-green-600"
          suffix="%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Actions</h3>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">{kpis.pendingActions}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Require immediate attention</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completed This Month</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{kpis.completedThisMonth}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Properties finished</p>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Activity Feed</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {activityFeed.map((activity) => (
              <div
                key={activity.id}
                onClick={() => {
                  // Handle activity click - show more details
                  console.log('Activity clicked:', activity);
                }}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(activity.status || 'pending')}`}>
                    {getStatusIcon(activity.status || 'pending')}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Bulk Assign Inspections</span>
            </button>
            <button className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <ClipboardCheck className="h-5 w-5" />
              <span className="font-medium">Review Corrections</span>
            </button>
            <button className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Send Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;