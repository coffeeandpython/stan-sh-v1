import React from 'react';
import {
  BarChart3,
  FileText,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Property, Inspection, Inspector, Builder } from '../../types';

interface ReportsAnalyticsProps {
  properties: Property[];
  inspections: Inspection[];
  inspectors: Inspector[];
  builders: Builder[];
}

const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  properties,
  inspections,
  inspectors,
  builders
}) => {
  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced reporting and analytics features
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
          <BarChart3 className="h-16 w-16 text-gray-400" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Reports Coming Soon
        </h3>

        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          Advanced reporting and analytics features will be available in the next release.
          This will include comprehensive data visualization, export capabilities, and performance insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-fit mx-auto mb-3">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Custom Reports</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate detailed reports for properties, inspections, and performance metrics
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 w-fit mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Analytics Dashboard</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interactive charts and graphs to visualize key business metrics
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 w-fit mx-auto mb-3">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Scheduled Reports</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automated report generation and delivery via email or dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;