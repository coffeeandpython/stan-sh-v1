import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Navigation,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface InspectorScheduleProps {
  inspections: Inspection[];
  properties: Property[];
  onViewProperty: (property: Property) => void;
  onStartInspection: (property: Property, inspection?: Inspection) => void;
}

function InspectorSchedule({
  inspections,
  properties,
  onViewProperty,
  onStartInspection
}: InspectorScheduleProps) {
  // For demo purposes, use September 19, 2025 as "today"
  const [selectedDate, setSelectedDate] = useState(new Date('2025-09-19'));
  const [filterType, setFilterType] = useState<string>('all');

  const today = new Date('2025-09-19');
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const filteredInspections = useMemo(() => {
    return inspections.filter(inspection => {
      if (filterType !== 'all' && inspection.type !== filterType) {
        return false;
      }
      return true;
    });
  }, [inspections, filterType]);

  const getInspectionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredInspections.filter(inspection => {
      const inspectionDate = new Date(inspection.scheduledDate).toISOString().split('T')[0];
      return inspectionDate === dateStr;
    });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'in-progress':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'scheduled':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const inspectionTypes = ['all', 'pre-rock', 'poly-test', 'final', 'blower-door'];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-16">
      {/* Header with Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Schedule</h2>
          </div>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 pr-8 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {inspectionTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : formatInspectionType(type)}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {startOfWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const dayInspections = getInspectionsForDate(day);
            const isSelected = day.toDateString() === selectedDate.toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`p-3 rounded-xl text-center transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : isToday(day)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="text-xs font-medium mb-1">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold">
                  {day.getDate()}
                </div>
                {dayInspections.length > 0 && (
                  <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                    isSelected ? 'bg-white' : 'bg-blue-600'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Inspections */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {isToday(selectedDate) ? 'Today' : selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {getInspectionsForDate(selectedDate).length} inspections
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {getInspectionsForDate(selectedDate).map((inspection) => {
            const property = properties.find(p => p.id === inspection.propertyId);
            if (!property) return null;

            return (
              <div key={inspection.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                {/* Time and Type */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{formatTime(inspection.scheduledDate)}</span>
                    </div>
                    <div className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                      {formatInspectionType(inspection.type)}
                    </div>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(inspection.status)}`}>
                    {getStatusIcon(inspection.status)}
                    <span className="ml-1 capitalize">{inspection.status}</span>
                  </div>
                </div>

                {/* Property Info */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {property.address}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{property.community}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{property.siteContact.name}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {inspection.notes && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{inspection.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onStartInspection(property, inspection)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-colors min-h-[48px] ${
                      inspection.status === 'scheduled'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : inspection.status === 'in-progress'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {inspection.status === 'scheduled' ? 'Start Inspection' :
                     inspection.status === 'in-progress' ? 'Continue' : 'View Report'}
                  </button>

                  <button
                    onClick={() => {
                      const url = `https://maps.google.com/?q=${encodeURIComponent(property.address)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[48px] min-w-[48px]"
                  >
                    <Navigation className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => window.open(`tel:${property.siteContact.phone}`, '_self')}
                    className="flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 rounded-xl transition-colors min-h-[48px] min-w-[48px]"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}

          {getInspectionsForDate(selectedDate).length === 0 && (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No inspections</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You have no inspections scheduled for this date.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InspectorSchedule;