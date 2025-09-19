import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Camera,
  Download,
  Calendar,
  MapPin,
  ArrowUpDown
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface InspectorHistoryProps {
  inspections: Inspection[];
  properties: Property[];
  onViewProperty: (property: Property) => void;
  onViewPhotos: (property: Property, inspection: Inspection) => void;
}

function InspectorHistory({
  inspections,
  properties,
  onViewProperty,
  onViewPhotos
}: InspectorHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'address'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedInspections = useMemo(() => {
    let filtered = inspections.filter(inspection => {
      // Filter by status
      if (filterStatus !== 'all' && inspection.status !== filterStatus) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const property = properties.find(p => p.id === inspection.propertyId);
        const searchLower = searchQuery.toLowerCase();

        if (property && (
          property.address.toLowerCase().includes(searchLower) ||
          property.community.toLowerCase().includes(searchLower) ||
          property.planNumber.toLowerCase().includes(searchLower)
        )) {
          return true;
        }

        if (inspection.type.toLowerCase().includes(searchLower) ||
            (inspection.notes && inspection.notes.toLowerCase().includes(searchLower))) {
          return true;
        }

        return false;
      }

      return true;
    });

    // Sort inspections
    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'date':
          compareValue = new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
          break;
        case 'status':
          compareValue = a.status.localeCompare(b.status);
          break;
        case 'address':
          const propertyA = properties.find(p => p.id === a.propertyId);
          const propertyB = properties.find(p => p.id === b.propertyId);
          compareValue = (propertyA?.address || '').localeCompare(propertyB?.address || '');
          break;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [inspections, properties, searchQuery, filterStatus, sortBy, sortOrder]);

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
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const formatInspectionType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleSort = (field: 'date' | 'status' | 'address') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const total = inspections.length;
    const completed = inspections.filter(i => i.status === 'passed' || i.status === 'failed').length;
    const passed = inspections.filter(i => i.status === 'passed').length;
    const failed = inspections.filter(i => i.status === 'failed').length;

    return { total, completed, passed, failed };
  }, [inspections]);

  const statusOptions = ['all', 'scheduled', 'in-progress', 'passed', 'failed'];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-16">
      {/* Statistics */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inspection History</h2>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-blue-600 font-medium">Total</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
            <div className="text-xs text-green-600 font-medium">Passed</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-xs text-red-600 font-medium">Failed</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.completed}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Done</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inspections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[48px]"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => handleSort('date')}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-sm font-medium">Sort</span>
          </button>
        </div>
      </div>

      {/* Inspections List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredAndSortedInspections.length > 0 ? (
            filteredAndSortedInspections.map((inspection) => {
              const property = properties.find(p => p.id === inspection.propertyId);
              if (!property) return null;

              const { date, time } = formatDateTime(inspection.scheduledDate);

              return (
                <div
                  key={inspection.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  onClick={() => onViewProperty(property)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {property.address}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{property.community}</span>
                        </div>
                        <div className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                          {formatInspectionType(inspection.type)}
                        </div>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inspection.status)}`}>
                      {getStatusIcon(inspection.status)}
                      <span className="ml-1 capitalize">{inspection.status}</span>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{date}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{time}</span>
                    </div>
                    {inspection.photos && inspection.photos.length > 0 && (
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Camera className="h-4 w-4" />
                        <span className="text-sm">{inspection.photos.length} photos</span>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {inspection.notes && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{inspection.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProperty(property);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl transition-colors min-h-[48px]"
                    >
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">View Details</span>
                    </button>

                    {inspection.photos && inspection.photos.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewPhotos(property, inspection);
                        }}
                        className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[48px]"
                      >
                        <Camera className="h-5 w-5" />
                      </button>
                    )}

                    {inspection.reportUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(inspection.reportUrl, '_blank');
                        }}
                        className="flex items-center justify-center px-4 py-3 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 rounded-xl transition-colors min-h-[48px]"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No inspections found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You have no completed inspections yet.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InspectorHistory;