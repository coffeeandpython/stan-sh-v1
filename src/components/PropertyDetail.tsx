import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Upload,
  Camera,
  FileText,
  User,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { Property, Inspection } from '../types';

interface PropertyDetailProps {
  property: Property;
  inspections: Inspection[];
  onBack: () => void;
  onRequestInspection: () => void;
  onUploadCorrections: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  inspections,
  onBack,
  onRequestInspection,
  onUploadCorrections
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-700 bg-green-100 border-green-200';
      case 'failed': return 'text-red-700 bg-red-100 border-red-200';
      case 'in-progress': case 'scheduled': return 'text-orange-700 bg-orange-100 border-orange-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-5 w-5" />;
      case 'failed': return <XCircle className="h-5 w-5" />;
      case 'in-progress': case 'scheduled': return <Clock className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const stages = [
    { key: 'pre-rock', label: 'Pre-Rock', completed: ['pre-rock', 'poly-test', 'final', 'complete'].includes(property.stage) },
    { key: 'poly-test', label: 'Poly Test', completed: ['poly-test', 'final', 'complete'].includes(property.stage) },
    { key: 'final', label: 'Final', completed: ['final', 'complete'].includes(property.stage) },
    { key: 'complete', label: 'Complete', completed: property.stage === 'complete' }
  ];

  const sortedInspections = inspections.sort((a, b) => 
    new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
  );

  const getNextAction = () => {
    if (property.status === 'failed') {
      return { text: 'Upload Corrections', action: onUploadCorrections, color: 'bg-red-600 hover:bg-red-700' };
    }
    if (property.status === 'pending' || property.status === 'passed') {
      return { text: 'Request Next Inspection', action: onRequestInspection, color: 'bg-blue-600 hover:bg-blue-700' };
    }
    return { text: 'Request Inspection', action: onRequestInspection, color: 'bg-blue-600 hover:bg-blue-700' };
  };

  const nextAction = getNextAction();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{property.address}</h1>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{property.community}</span>
            </div>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(property.status)}`}>
              {getStatusIcon(property.status)}
              <span className="capitalize">{property.status.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Inspection Progress</h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.key} className="relative flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  stage.completed 
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : property.stage === stage.key
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {stage.completed ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    stage.completed || property.stage === stage.key
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {stage.label}
                  </h3>
                  {property.stage === stage.key && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Current Stage</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Status & Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Status</h2>
        
        {property.status === 'failed' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-300">Action Required</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  This property has failed inspection and needs corrections before proceeding.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={nextAction.action}
            className={`flex-1 ${nextAction.color} text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-200 active:scale-[0.98]`}
          >
            {nextAction.text}
          </button>
          
          <button
            onClick={onRequestInspection}
            className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Schedule Inspection
          </button>
        </div>
      </div>

      {/* Inspection History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inspection History</h2>
        
        {sortedInspections.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-6">No inspections scheduled yet</p>
        ) : (
          <div className="space-y-4">
            {sortedInspections.map(inspection => (
              <div key={inspection.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                        {inspection.type.replace('-', ' ')} Inspection
                      </h3>
                      <div className={`flex items-center space-x-2 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(inspection.status)}`}>
                        {getStatusIcon(inspection.status)}
                        <span className="capitalize">{inspection.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(inspection.scheduledDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{inspection.inspector.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  {inspection.reportUrl && (
                    <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </button>
                  )}
                </div>
                
                {inspection.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{inspection.notes}</p>
                )}
                
                {inspection.photos.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {inspection.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Inspection photo ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedPhoto(photo)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Documents */}
      {property.documents.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Documents</h2>
          
          <div className="space-y-3">
            {property.documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(doc.uploadDate).toLocaleDateString()} • {(doc.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                
                <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Details */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full p-6 text-left"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Property Details</h2>
            {showDetails ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </button>
        
        {showDetails && (
          <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Plan Number:</span>
                    <span className="text-gray-900 dark:text-white">{property.planNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Community:</span>
                    <span className="text-gray-900 dark:text-white">{property.community}</span>
                  </div>
                  {property.closingDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Closing Date:</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(property.closingDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Site Contact</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="text-gray-900 dark:text-white">{property.siteContact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                    <a 
                      href={`tel:${property.siteContact.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      {property.siteContact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {property.notes && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Notes</h3>
                <p className="text-gray-600 dark:text-gray-400">{property.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
            <img
              src={selectedPhoto}
              alt="Inspection photo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;