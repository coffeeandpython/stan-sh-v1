import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Send,
  Edit,
  Camera,
  AlertTriangle,
  FileText,
  MapPin,
  Calendar,
  User,
  Phone
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface InspectionReviewProps {
  property: Property;
  inspection: Inspection | null;
  onBack: () => void;
  onSubmit: () => void;
}

function InspectionReview({ property, inspection, onBack, onSubmit }: InspectionReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockInspectionData = {
    type: inspection?.type || 'pre-rock',
    status: 'fail',
    notes: 'Electrical panel wiring does not meet current code requirements. HVAC ductwork connections are loose and need to be properly secured. Overall installation quality needs improvement before proceeding to next phase.',
    overallResult: 'fail' as 'pass' | 'fail',
    photos: [
      { url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=400', caption: 'Electrical panel - code violations' },
      { url: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400', caption: 'HVAC ductwork - loose connections' },
      { url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', caption: 'Overall view of mechanical room' }
    ],
    issues: [
      { id: '1', description: 'Electrical panel wiring not to code', severity: 'high', location: 'Basement electrical room' },
      { id: '2', description: 'HVAC ductwork not properly secured', severity: 'medium', location: 'Basement mechanical room' },
      { id: '3', description: 'Minor insulation gaps', severity: 'low', location: 'Attic space' }
    ]
  };

  const formatInspectionType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

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
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Review & Submit</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Final inspection review</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Property Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {property.address}
              </h2>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.community} • {property.planNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatInspectionType(mockInspectionData.type)} Inspection</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{property.siteContact.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Result */}
          <div className="flex items-center justify-center py-6">
            <div className={`flex items-center space-x-3 px-6 py-4 rounded-2xl text-lg font-bold ${
              mockInspectionData.overallResult === 'pass'
                ? 'bg-green-50 text-green-600 border-2 border-green-200'
                : 'bg-red-50 text-red-600 border-2 border-red-200'
            }`}>
              {mockInspectionData.overallResult === 'pass' ? (
                <CheckCircle className="h-8 w-8" />
              ) : (
                <XCircle className="h-8 w-8" />
              )}
              <span className="uppercase tracking-wide">
                {mockInspectionData.overallResult === 'pass' ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </div>

        {/* Issues Found */}
        {mockInspectionData.issues.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Issues Found</h3>
                <span className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                  {mockInspectionData.issues.length} issues
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {mockInspectionData.issues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    issue.severity === 'high' ? 'text-red-500' :
                    issue.severity === 'medium' ? 'text-orange-500' :
                    'text-yellow-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{issue.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{issue.location}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                    {issue.severity.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inspection Notes */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Inspection Notes</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {mockInspectionData.notes}
            </p>
          </div>
        </div>

        {/* Photo Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Photos</h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {mockInspectionData.photos.length} photos
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              {mockInspectionData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-opacity flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Inspection Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{mockInspectionData.issues.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Issues Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockInspectionData.photos.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Photos Taken</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">1.5h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pb-20">
          <button
            onClick={onBack}
            className="flex items-center justify-center space-x-2 py-4 px-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[56px]"
          >
            <Edit className="h-5 w-5" />
            <span className="font-medium">Edit</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-colors min-h-[56px]"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="font-medium">Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span className="font-medium">Submit Report</span>
              </>
            )}
          </button>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/40">
          <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">Next Steps</h4>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            This report will be sent to the builder and admin for review. The builder will be notified of the required corrections.
          </p>
          <button
            onClick={() => window.open(`tel:${property.siteContact.phone}`, '_self')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium">Call {property.siteContact.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InspectionReview;