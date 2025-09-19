import React, { useState } from 'react';
import {
  Bot,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Camera,
  MapPin,
  User,
  Building2,
  AlertTriangle,
  Zap,
  Eye
} from 'lucide-react';

interface EmailRequest {
  id: string;
  from: string;
  fromCompany: string;
  subject: string;
  body: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'denied';
  aiSuggestion: {
    action: string;
    confidence: number;
    reasoning: string;
    parameters: any;
  };
  priority: 'high' | 'medium' | 'low';
}

const mockEmailRequests: EmailRequest[] = [
  {
    id: 'email-1',
    from: 'john.davis@mihomes.com',
    fromCompany: 'MI Homes',
    subject: 'Need Pre-Rock Report for 7612 Spicebush Drive',
    body: 'Hi Stan, Can you send me the pre-rock inspection report for 7612 Spicebush Drive in Meadow Park? We need it for the next phase of construction. Thanks, John',
    timestamp: '2025-09-19T14:30:00Z',
    status: 'pending',
    aiSuggestion: {
      action: 'Generate and Send Report',
      confidence: 95,
      reasoning: 'Email clearly requests a pre-rock report for a specific property address. Property exists in system and inspection was completed.',
      parameters: {
        reportType: 'pre-rock',
        propertyAddress: '7612 Spicebush Drive',
        community: 'Meadow Park',
        inspectionId: 'insp-001',
        recipientEmail: 'john.davis@mihomes.com'
      }
    },
    priority: 'high'
  },
  {
    id: 'email-2',
    from: 'lisa.rodriguez@mihomes.com',
    fromCompany: 'MI Homes',
    subject: 'Electrical Corrections Completed - 5432 Pine Valley Lane',
    body: 'Stan, We have completed the electrical corrections for 5432 Pine Valley Lane as requested in the failed inspection. Photos attached showing the corrected wiring in the main panel. Please schedule follow-up inspection. Best, Lisa',
    timestamp: '2025-09-19T13:15:00Z',
    status: 'pending',
    aiSuggestion: {
      action: 'Process Correction Submission',
      confidence: 92,
      reasoning: 'Email indicates corrections have been completed with photo evidence. Should create correction request entry and notify inspector.',
      parameters: {
        propertyAddress: '5432 Pine Valley Lane',
        correctionType: 'electrical',
        photos: ['attached_photo_1.jpg', 'attached_photo_2.jpg'],
        nextAction: 'schedule_followup_inspection',
        originalInspectionId: 'insp-007'
      }
    },
    priority: 'medium'
  },
  {
    id: 'email-3',
    from: 'manager@highland.com',
    fromCompany: 'Highland Homes',
    subject: 'Schedule Final Inspection - 2156 Sunset Hills Drive',
    body: 'Hello, We are ready for the final inspection at 2156 Sunset Hills Drive. All previous corrections have been addressed. Can we schedule for next Tuesday morning? Thanks',
    timestamp: '2025-09-19T11:45:00Z',
    status: 'pending',
    aiSuggestion: {
      action: 'Schedule Inspection',
      confidence: 88,
      reasoning: 'Request to schedule final inspection for specific property. Should check inspector availability and create calendar entry.',
      parameters: {
        inspectionType: 'final',
        propertyAddress: '2156 Sunset Hills Drive',
        preferredDate: 'Next Tuesday morning',
        builderEmail: 'manager@highland.com',
        requiredPrerequisites: ['previous_corrections_completed']
      }
    },
    priority: 'medium'
  },
  {
    id: 'email-4',
    from: 'supervisor@tollbrothers.com',
    fromCompany: 'Toll Brothers',
    subject: 'Question about Failed Poly Test',
    body: 'Stan, Our poly test failed at 4521 Maple Grove Lane yesterday. The report mentions air leakage around windows. Can you provide more details about what specifically needs to be fixed? We want to make sure we address everything before the re-test.',
    timestamp: '2025-09-19T10:20:00Z',
    status: 'pending',
    aiSuggestion: {
      action: 'Send Detailed Inspection Notes',
      confidence: 90,
      reasoning: 'Builder is requesting clarification on failed inspection details. Should send detailed notes and photos from the inspection.',
      parameters: {
        propertyAddress: '4521 Maple Grove Lane',
        inspectionType: 'poly-test',
        failureReason: 'air_leakage_windows',
        requestType: 'clarification',
        includePhotos: true,
        includeTechnicalDetails: true
      }
    },
    priority: 'high'
  },
  {
    id: 'email-5',
    from: 'amanda@sunrisebuilders.com',
    fromCompany: 'Sunrise Builders',
    subject: 'Update Contact Information',
    body: 'Hi Stan, We have a new site supervisor for our Sunset Hills projects. Please update our contact information: Mike Johnson, phone: (555) 987-6543, email: mike.johnson@sunrisebuilders.com. Thanks!',
    timestamp: '2025-09-19T09:10:00Z',
    status: 'approved',
    aiSuggestion: {
      action: 'Update Contact Information',
      confidence: 96,
      reasoning: 'Clear request to update contact details for builder. Straightforward administrative task.',
      parameters: {
        builderCompany: 'Sunrise Builders',
        newContact: {
          name: 'Mike Johnson',
          phone: '(555) 987-6543',
          email: 'mike.johnson@sunrisebuilders.com',
          role: 'Site Supervisor'
        },
        affectedCommunities: ['Sunset Hills']
      }
    },
    priority: 'low'
  }
];

function AutomationsCenter() {
  const [requests, setRequests] = useState<EmailRequest[]>(mockEmailRequests);
  const [selectedRequest, setSelectedRequest] = useState<EmailRequest | null>(null);

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleDeny = (requestId: string) => {
    setRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'denied' as const } : req
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'denied': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-orange-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const deniedCount = requests.filter(r => r.status === 'denied').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Bot className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Automations</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          AI-powered email analysis with human approval for automated actions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved Today</p>
              <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Denied Today</p>
              <p className="text-3xl font-bold text-red-600">{deniedCount}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Confidence Avg</p>
              <p className="text-3xl font-bold text-purple-600">92%</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Email Requests List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Requests</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {requests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="space-y-4">
                {/* Request Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {request.subject}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{request.from}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{request.fromCompany}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(request.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {request.status}
                    </span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {request.body}
                  </p>
                </div>

                {/* AI Suggestion */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                      <Bot className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                          AI Suggested Action
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-purple-700 dark:text-purple-300">
                            Confidence: {request.aiSuggestion.confidence}%
                          </span>
                          <div className="w-16 bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${request.aiSuggestion.confidence}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-purple-900 dark:text-purple-100">
                            {request.aiSuggestion.action}
                          </span>
                        </div>
                        <p className="text-sm text-purple-800 dark:text-purple-200">
                          {request.aiSuggestion.reasoning}
                        </p>

                        {/* Action Parameters */}
                        <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Action Parameters:</h5>
                          <div className="space-y-1">
                            {Object.entries(request.aiSuggestion.parameters).map(([key, value]) => (
                              <div key={key} className="flex text-sm">
                                <span className="w-32 text-gray-600 dark:text-gray-400 font-medium">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {request.status === 'pending' && (
                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleDeny(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Deny</span>
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve & Execute</span>
                    </button>
                  </div>
                )}

                {request.status !== 'pending' && (
                  <div className="text-right">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {getStatusIcon(request.status)}
                      <span>Action {request.status}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Full Email Content</h4>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedRequest.body}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="font-medium">Confidence Score</span>
                    <span className="text-purple-600 font-bold">{selectedRequest.aiSuggestion.confidence}%</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">Reasoning:</span>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedRequest.aiSuggestion.reasoning}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    handleDeny(selectedRequest.id);
                    setSelectedRequest(null);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                  <span>Deny</span>
                </button>
                <button
                  onClick={() => {
                    handleApprove(selectedRequest.id);
                    setSelectedRequest(null);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Approve & Execute</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AutomationsCenter;