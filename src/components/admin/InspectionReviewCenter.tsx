import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Camera,
  Download,
  Filter,
  Search,
  AlertTriangle,
  FileText,
  MapPin,
  User,
  Calendar,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Image as ImageIcon,
  X,
  CheckCircle2,
  Send,
  Loader
} from 'lucide-react';
import { Property, Inspection, Inspector } from '../../types';
import { mockCorrectionRequests } from '../../data/adminMockData';

interface InspectionReviewCenterProps {
  properties: Property[];
  inspections: Inspection[];
  inspectors: Inspector[];
}

interface CorrectionRequest {
  id: string;
  propertyId: string;
  inspectionId: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  builderNotes: string;
  photos: string[];
  reviewedBy?: string;
  reviewedDate?: string;
  reviewNotes?: string;
  priority: 'high' | 'medium' | 'low';
}

const InspectionReviewCenter: React.FC<InspectionReviewCenterProps> = ({
  properties,
  inspections
}) => {
  const [correctionRequests, setCorrectionRequests] = useState<CorrectionRequest[]>(
    mockCorrectionRequests.map(req => ({ ...req, priority: req.priority || 'medium' }))
  );
  const [selectedRequest, setSelectedRequest] = useState<CorrectionRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState<string[]>([]);
  const [showReviewModal, setShowReviewModal] = useState<CorrectionRequest | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());


  const filteredRequests = correctionRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = searchQuery === '' ||
      properties.find(p => p.id === request.propertyId)?.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.builderNotes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleReviewSubmit = async () => {
    if (!showReviewModal || !reviewAction) return;

    setIsSubmittingReview(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const updatedRequests = correctionRequests.map(req =>
      req.id === showReviewModal.id
        ? {
            ...req,
            status: reviewAction,
            reviewedBy: 'Stan',
            reviewedDate: new Date().toISOString(),
            reviewNotes: reviewNotes
          }
        : req
    );

    setCorrectionRequests(updatedRequests);
    setNotification({
      type: 'success',
      message: `Correction request ${reviewAction === 'approve' ? 'approved' : 'rejected'} successfully!`
    });

    setShowReviewModal(null);
    setReviewAction(null);
    setReviewNotes('');
    setIsSubmittingReview(false);
  };

  const handleBulkApprove = async () => {
    if (selectedRequests.size === 0) return;

    setIsSubmittingReview(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const updatedRequests = correctionRequests.map(req =>
      selectedRequests.has(req.id) && req.status === 'pending'
        ? {
            ...req,
            status: 'approved' as const,
            reviewedBy: 'Stan',
            reviewedDate: new Date().toISOString(),
            reviewNotes: 'Bulk approved'
          }
        : req
    );

    setCorrectionRequests(updatedRequests);
    setSelectedRequests(new Set());
    setNotification({
      type: 'success',
      message: `${selectedRequests.size} correction requests approved successfully!`
    });
    setIsSubmittingReview(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg ${
          notification.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Review Center</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Review and approve correction submissions with advanced workflows
            </p>
          </div>
          {selectedRequests.size > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRequests.size} selected
              </span>
              <button
                onClick={handleBulkApprove}
                disabled={isSubmittingReview}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {isSubmittingReview ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ThumbsUp className="h-4 w-4" />
                )}
                <span>Bulk Approve</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'pending' && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">
                    {correctionRequests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search corrections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {correctionRequests.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {correctionRequests.filter(r => r.status === 'pending' && r.priority === 'high').length} high priority
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved Today</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {correctionRequests.filter(r => r.status === 'approved').length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">+2 from yesterday</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                {correctionRequests.filter(r => r.status === 'rejected').length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Need rework</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Review Time</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">1.8h</p>
              <p className="text-xs text-green-500 dark:text-green-400 mt-1">↓ 0.5h from last week</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Enhanced Correction Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Correction Requests</h3>
            <div className="flex items-center space-x-3">
              {filter === 'pending' && correctionRequests.filter(r => r.status === 'pending').length > 0 && (
                <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={selectedRequests.size === correctionRequests.filter(r => r.status === 'pending').length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRequests(new Set(correctionRequests.filter(r => r.status === 'pending').map(r => r.id)));
                      } else {
                        setSelectedRequests(new Set());
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Select all</span>
                </label>
              )}
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredRequests.map((request) => {
            const property = properties.find(p => p.id === request.propertyId);
            const inspection = inspections.find(i => i.id === request.inspectionId);

            return (
              <div key={request.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start space-x-4">
                  {request.status === 'pending' && (
                    <input
                      type="checkbox"
                      checked={selectedRequests.has(request.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedRequests);
                        if (e.target.checked) {
                          newSelected.add(request.id);
                        } else {
                          newSelected.delete(request.id);
                        }
                        setSelectedRequests(newSelected);
                      }}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-1 h-12 rounded-full ${getPriorityColor(request.priority)}`} />
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                            {property?.address || 'Unknown Property'}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <div className="flex items-center space-x-1">
                              <FileText className="h-3 w-3" />
                              <span>{inspection?.type.replace('-', ' ')} inspection</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(request.submittedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getPriorityIcon(request.priority)}
                              <span className="capitalize">{request.priority} priority</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                        {request.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {request.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {request.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                        <span className="capitalize">{request.status}</span>
                      </div>
                    </div>

                    {request.builderNotes && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Builder Notes:</p>
                            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">{request.builderNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {request.photos.length > 0 && (
                      <div className="flex items-center space-x-3 mb-4">
                        <Camera className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {request.photos.length} correction photo{request.photos.length !== 1 ? 's' : ''}
                        </span>
                        <button
                          onClick={() => setShowPhotoModal(request.photos)}
                          className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <ImageIcon className="h-3 w-3" />
                          <span>View Photos</span>
                        </button>
                      </div>
                    )}

                    {request.status === 'approved' && request.reviewNotes && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-900 dark:text-green-100">
                              Approved by {request.reviewedBy} on {new Date(request.reviewedDate!).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-green-800 dark:text-green-200 mt-1">{request.reviewNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {request.status === 'rejected' && request.reviewNotes && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-900 dark:text-red-100">
                              Rejected by {request.reviewedBy} on {new Date(request.reviewedDate!).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-red-800 dark:text-red-200 mt-1">{request.reviewNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all">
                      <Download className="h-4 w-4" />
                    </button>
                    {request.status === 'pending' && (
                      <div className="flex items-center space-x-2 ml-2">
                        <button
                          onClick={() => {
                            setShowReviewModal(request);
                            setReviewAction('approve');
                          }}
                          className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowReviewModal(request);
                            setReviewAction('reject');
                          }}
                          className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {filter === 'all' ? '' : filter} requests found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'pending'
                ? 'All caught up! No pending corrections to review.'
                : `No ${filter} correction requests at this time.`}
            </p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {showPhotoModal.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Correction Photos ({showPhotoModal.length})
              </h3>
              <button
                onClick={() => setShowPhotoModal([])}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[70vh]">
              {showPhotoModal.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Correction ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button className="text-white hover:text-gray-300">
                      <Eye className="h-8 w-8" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    reviewAction === 'approve' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {reviewAction === 'approve' ? <ThumbsUp className="h-5 w-5" /> : <ThumbsDown className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {reviewAction === 'approve' ? 'Approve' : 'Reject'} Correction
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {properties.find(p => p.id === showReviewModal.propertyId)?.address}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowReviewModal(null);
                    setReviewAction(null);
                    setReviewNotes('');
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Builder Notes:</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{showReviewModal.builderNotes}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Review Notes {reviewAction === 'reject' && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={4}
                    placeholder={reviewAction === 'approve'
                      ? 'Add any additional notes (optional)...'
                      : 'Please explain why this correction is being rejected...'
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowReviewModal(null);
                    setReviewAction(null);
                    setReviewNotes('');
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={isSubmittingReview || (reviewAction === 'reject' && !reviewNotes.trim())}
                  className={`flex items-center space-x-2 px-6 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    reviewAction === 'approve'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isSubmittingReview ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>{reviewAction === 'approve' ? 'Approve' : 'Reject'} Correction</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Correction Request Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {properties.find(p => p.id === selectedRequest.propertyId)?.address}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Property Information</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {properties.find(p => p.id === selectedRequest.propertyId)?.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {inspections.find(i => i.id === selectedRequest.inspectionId)?.type.replace('-', ' ')} inspection
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status & Priority</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedRequest.status)}`}>
                          <span className="capitalize">{selectedRequest.status}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedRequest.priority)}`} />
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{selectedRequest.priority} priority</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timeline</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Submitted: {new Date(selectedRequest.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                      {selectedRequest.reviewedDate && (
                        <div className="flex items-center space-x-2 text-sm mt-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Reviewed: {new Date(selectedRequest.reviewedDate).toLocaleDateString()} by {selectedRequest.reviewedBy}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Builder Notes</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-gray-800 dark:text-gray-200">{selectedRequest.builderNotes}</p>
                </div>
              </div>

              {/* Photos Section */}
              {selectedRequest.photos.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Correction Photos ({selectedRequest.photos.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedRequest.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Correction ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            className="text-white hover:text-gray-300 p-2 rounded-full bg-black bg-opacity-50"
                            onClick={() => setShowPhotoModal(selectedRequest.photos)}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          Photo {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.reviewNotes && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Review Notes</h4>
                  <div className={`border rounded-lg p-4 ${
                    selectedRequest.status === 'approved'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}>
                    <p className="text-gray-800 dark:text-gray-200">{selectedRequest.reviewNotes}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Close
                </button>
                {selectedRequest.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setShowReviewModal(selectedRequest);
                        setReviewAction('reject');
                        setSelectedRequest(null);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowReviewModal(selectedRequest);
                        setReviewAction('approve');
                        setSelectedRequest(null);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionReviewCenter;