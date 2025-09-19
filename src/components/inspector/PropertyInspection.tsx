import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  FileText,
  Camera,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Navigation,
  Building,
  User,
  Mail
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface PropertyInspectionProps {
  property: Property;
  inspections: Inspection[];
  onBack: () => void;
  onStartInspection: (inspection: Inspection) => void;
  onViewPhotos: (inspection: Inspection) => void;
}

function PropertyInspection({
  property,
  inspections,
  onBack,
  onStartInspection,
  onViewPhotos
}: PropertyInspectionProps) {
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
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
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

  // Sort inspections by date
  const sortedInspections = [...inspections].sort((a, b) =>
    new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  );

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-16 bg-gray-50 dark:bg-gray-950 z-30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Property Details</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Inspection Information</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-16">
        {/* Property Information */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {property.address}
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">{property.community}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Plan: {property.planNumber}</span>
                  </div>
                  {property.closingDate && (
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Closing: {new Date(property.closingDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium border ${getStatusColor(property.status)}`}>
                {getStatusIcon(property.status)}
                <span className="ml-2 capitalize">{property.status}</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Site Contact</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{property.siteContact.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{property.siteContact.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`tel:${property.siteContact.phone}`, '_self')}
                    className="p-2 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 rounded-xl transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => {
                  const url = `https://maps.google.com/?q=${encodeURIComponent(property.address)}`;
                  window.open(url, '_blank');
                }}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl transition-colors min-h-[48px]"
              >
                <Navigation className="h-5 w-5" />
                <span className="font-medium">Get Directions</span>
              </button>
              <button
                onClick={() => window.open(`tel:${property.siteContact.phone}`, '_self')}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl transition-colors min-h-[48px]"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium">Call Site</span>
              </button>
            </div>

            {/* Special Notes */}
            {property.notes && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40 rounded-xl">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">Special Notes</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{property.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Inspections List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Inspections</h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {inspections.length} scheduled
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {sortedInspections.length > 0 ? (
              sortedInspections.map((inspection) => {
                const { date, time } = formatDateTime(inspection.scheduledDate);
                return (
                  <div key={inspection.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    {/* Inspection Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {formatInspectionType(inspection.type)}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{date}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{time}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inspection.status)}`}>
                        {getStatusIcon(inspection.status)}
                        <span className="ml-1 capitalize">{inspection.status}</span>
                      </div>
                    </div>

                    {/* Inspection Notes */}
                    {inspection.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{inspection.notes}</p>
                      </div>
                    )}

                    {/* Photos Count */}
                    {inspection.photos && inspection.photos.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Camera className="h-4 w-4" />
                          <span className="text-sm">{inspection.photos.length} photos</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onStartInspection(inspection)}
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

                      {inspection.photos && inspection.photos.length > 0 && (
                        <button
                          onClick={() => onViewPhotos(inspection)}
                          className="flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[48px] min-w-[48px]"
                        >
                          <Camera className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No inspections</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No inspections have been scheduled for this property yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyInspection;