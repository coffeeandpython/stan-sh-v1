import React from 'react';
import { 
  Building2, 
  ClipboardCheck, 
  Calendar, 
  AlertCircle, 
  Plus, 
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Property, Inspection } from '../types';

interface DashboardProps {
  properties: Property[];
  inspections: Inspection[];
  onViewProperties: () => void;
  onViewProperty: (property: Property) => void;
  onAddProperty: () => void;
  onRequestInspection: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  properties,
  inspections,
  onViewProperties,
  onViewProperty,
  onAddProperty,
  onRequestInspection
}) => {
  const totalProperties = properties.length;
  const activeInspections = inspections.filter(i => i.status === 'in-progress' || i.status === 'scheduled').length;
  const completedThisMonth = inspections.filter(i => 
    i.completedDate && new Date(i.completedDate).getMonth() === new Date().getMonth() && new Date(i.completedDate).getFullYear() === new Date().getFullYear()
  ).length;
  const pendingActions = properties.filter(p => p.status === 'failed').length;

  const recentActivity = inspections
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
    .map(inspection => {
      const property = properties.find(p => p.id === inspection.propertyId);
      return { inspection, property };
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'in-progress': case 'scheduled': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'in-progress': case 'scheduled': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Good morning, John! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalProperties}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Inspections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeInspections}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{completedThisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{pendingActions}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onAddProperty}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group active:scale-[0.98]"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Add New Property</h4>
                <p className="text-sm text-blue-100">Start a new inspection workflow</p>
              </div>
            </div>
          </button>

          <button
            onClick={onRequestInspection}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group active:scale-[0.98]"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Bulk Request Inspections</h4>
                <p className="text-sm text-green-100">Schedule multiple properties at once</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <button 
            onClick={onViewProperties}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map(({ inspection, property }) => (
            <div
              key={inspection.id}
              onClick={() => property && onViewProperty(property)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-28 flex-shrink-0">
                  <div className={`flex items-center justify-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inspection.status)}`}>
                    {getStatusIcon(inspection.status)}
                    <span className="capitalize">{inspection.status.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {property?.address || 'Unknown Property'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {inspection.type.charAt(0).toUpperCase() + inspection.type.slice(1).replace('-', ' ')} Inspection
                  </p>
                </div>

                <div className="text-right w-32 flex-shrink-0">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                    {new Date(inspection.scheduledDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{property?.community}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;