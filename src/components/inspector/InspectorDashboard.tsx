import React, { useMemo } from 'react';
import {
  Calendar,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Navigation,
  Camera,
  FileText,
  Sun,
  CloudRain,
  Thermometer
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface InspectorDashboardProps {
  inspections: Inspection[];
  properties: Property[];
  onViewProperty: (property: Property) => void;
  onStartInspection: (property: Property, inspection?: Inspection) => void;
  inspectorName: string;
}

function InspectorDashboard({
  inspections,
  properties,
  onViewProperty,
  onStartInspection,
  inspectorName
}: InspectorDashboardProps) {
  // For demo purposes, use September 19, 2025 as "today"
  const today = '2025-09-19';

  // Get today's inspections
  const todaysInspections = useMemo(() => {
    return inspections
      .filter(inspection => {
        const inspectionDate = new Date(inspection.scheduledDate).toISOString().split('T')[0];
        return inspectionDate === today;
      })
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
  }, [inspections, today]);

  // Get property details for each inspection
  const todaysProperties = useMemo(() => {
    return todaysInspections.map(inspection => {
      const property = properties.find(p => p.id === inspection.propertyId);
      return { inspection, property };
    }).filter(item => item.property);
  }, [todaysInspections, properties]);

  // Statistics
  const stats = useMemo(() => {
    const total = todaysInspections.length;
    const completed = todaysInspections.filter(i => i.status === 'passed' || i.status === 'failed').length;
    const inProgress = todaysInspections.filter(i => i.status === 'in-progress').length;
    const pending = todaysInspections.filter(i => i.status === 'scheduled').length;

    return { total, completed, inProgress, pending };
  }, [todaysInspections]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'in-progress':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'scheduled':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatInspectionType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-16">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Good morning, {inspectorName.split(' ')[0]}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-blue-600 font-medium">Total</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-green-600 font-medium">Done</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
            <div className="text-xs text-orange-600 font-medium">Active</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.pending}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Pending</div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h3>
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {stats.total} inspections
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {todaysProperties.length > 0 ? (
            todaysProperties.map(({ inspection, property }) => (
              <div
                key={inspection.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {/* Property Address */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {property!.address}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {property!.community} • {property!.planNumber}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inspection.status)}`}>
                      {getStatusIcon(inspection.status)}
                      <span className="ml-1 capitalize">{inspection.status}</span>
                    </div>
                  </div>
                </div>

                {/* Inspection Details */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{formatTime(inspection.scheduledDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">{formatInspectionType(inspection.type)}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{property!.siteContact.name}</span>
                    <span className="text-sm font-medium">{property!.siteContact.phone}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onStartInspection(property!, inspection)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-colors min-h-[48px] ${
                      inspection.status === 'scheduled'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : inspection.status === 'in-progress'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {inspection.status === 'scheduled' ? (
                      <>
                        <Camera className="h-5 w-5" />
                        <span>Start Inspection</span>
                      </>
                    ) : inspection.status === 'in-progress' ? (
                      <>
                        <FileText className="h-5 w-5" />
                        <span>Continue</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>View Report</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const url = `https://maps.google.com/?q=${encodeURIComponent(property!.address)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[48px] min-w-[48px]"
                  >
                    <Navigation className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => {
                      window.open(`tel:${property!.siteContact.phone}`, '_self');
                    }}
                    className="flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 rounded-xl transition-colors min-h-[48px] min-w-[48px]"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No inspections today</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You have no scheduled inspections for today. Enjoy your free time!
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default InspectorDashboard;