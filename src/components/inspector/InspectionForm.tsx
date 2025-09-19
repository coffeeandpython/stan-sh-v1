import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Camera,
  Save,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  X,
  FileText,
  MapPin,
  Clock,
  User,
  Image as ImageIcon
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface InspectionFormProps {
  property: Property;
  inspection: Inspection | null;
  onBack: () => void;
  onSubmitForReview: (property: Property, inspection?: Inspection) => void;
  onViewPhotos: () => void;
}

interface Issue {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
  photos: string[];
}

function InspectionForm({
  property,
  inspection,
  onBack,
  onSubmitForReview,
  onViewPhotos
}: InspectionFormProps) {
  const [formData, setFormData] = useState({
    status: inspection?.status || 'in-progress',
    notes: inspection?.notes || '',
    overallResult: 'pending' as 'pass' | 'fail' | 'pending'
  });

  const [issues, setIssues] = useState<Issue[]>([]);
  const [photos, setPhotos] = useState<string[]>(inspection?.photos || []);
  const [newIssue, setNewIssue] = useState('');
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatInspectionType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePhotoCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const addIssue = (description: string, severity: 'low' | 'medium' | 'high') => {
    const issue: Issue = {
      id: Date.now().toString(),
      description,
      severity,
      location: property.address,
      photos: []
    };
    setIssues(prev => [...prev, issue]);
    setNewIssue('');
    setShowAddIssue(false);
  };

  const removeIssue = (id: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== id));
  };

  const calculateProgress = () => {
    let completed = 0;
    let total = 4; // Notes, Photos, Overall Result, Review

    if (formData.notes.length > 0) completed++;
    if (photos.length > 0) completed++;
    if (formData.overallResult !== 'pending') completed++;
    if (issues.length >= 0) completed++; // Issues are optional

    return Math.round((completed / total) * 100);
  };

  const handleSaveDraft = () => {
    // Save form data locally or to backend
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    if (formData.overallResult === 'pending') {
      alert('Please select Pass or Fail before submitting.');
      return;
    }
    onSubmitForReview(property, inspection);
  };

  const commonIssues = [
    { text: 'Electrical panel wiring issues', severity: 'high' as const },
    { text: 'HVAC ductwork not properly secured', severity: 'medium' as const },
    { text: 'Insulation gaps found', severity: 'medium' as const },
    { text: 'Plumbing connections need attention', severity: 'high' as const },
    { text: 'Minor drywall imperfections', severity: 'low' as const },
    { text: 'Window sealing needs improvement', severity: 'medium' as const }
  ];

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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {inspection ? 'Continue' : 'Start'} Inspection
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatInspectionType(inspection?.type || 'pre-rock')}
            </p>
          </div>
          <div className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
            {calculateProgress()}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Property Info Quick View */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {property.address}
              </h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">{property.community}</span>
                {inspection && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    • {formatDateTime(inspection.scheduledDate)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Capture Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Photos</h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {photos.length} photos
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Photo Grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Inspection photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Camera Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePhotoCapture}
                className="flex items-center justify-center space-x-2 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors min-h-[56px]"
              >
                <Camera className="h-6 w-6" />
                <span className="font-medium">Take Photo</span>
              </button>
              <button
                onClick={onViewPhotos}
                className="flex items-center justify-center space-x-2 py-4 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[56px]"
              >
                <ImageIcon className="h-6 w-6" />
                <span className="font-medium">Manage Photos</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Issues Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Issues Found</h3>
              <button
                onClick={() => setShowAddIssue(!showAddIssue)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span className="text-sm font-medium">Add Issue</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Add Issue Form */}
            {showAddIssue && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <textarea
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  placeholder="Describe the issue found..."
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-base"
                  rows={3}
                />
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <button
                    onClick={() => addIssue(newIssue, 'low')}
                    disabled={!newIssue.trim()}
                    className="py-2 px-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm font-medium disabled:opacity-50 min-h-[40px]"
                  >
                    Low Priority
                  </button>
                  <button
                    onClick={() => addIssue(newIssue, 'medium')}
                    disabled={!newIssue.trim()}
                    className="py-2 px-3 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium disabled:opacity-50 min-h-[40px]"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => addIssue(newIssue, 'high')}
                    disabled={!newIssue.trim()}
                    className="py-2 px-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium disabled:opacity-50 min-h-[40px]"
                  >
                    High Priority
                  </button>
                </div>
              </div>
            )}

            {/* Quick Issues */}
            {!showAddIssue && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Common Issues:</p>
                <div className="grid grid-cols-1 gap-2">
                  {commonIssues.map((issue, index) => (
                    <button
                      key={index}
                      onClick={() => addIssue(issue.text, issue.severity)}
                      className="flex items-center justify-between p-3 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]"
                    >
                      <span className="text-sm text-gray-900 dark:text-white">{issue.text}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                        issue.severity === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {issue.severity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Issues List */}
            {issues.length > 0 && (
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div key={issue.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      issue.severity === 'high' ? 'text-red-500' :
                      issue.severity === 'medium' ? 'text-orange-500' :
                      'text-yellow-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">{issue.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {issue.severity.toUpperCase()} • {issue.location}
                      </p>
                    </div>
                    <button
                      onClick={() => removeIssue(issue.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {issues.length === 0 && !showAddIssue && (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">No issues found yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Inspection Notes</h3>
          </div>
          <div className="p-6">
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add detailed notes about the inspection..."
              className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-base"
              rows={4}
            />
          </div>
        </div>

        {/* Pass/Fail Decision */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Inspection Result</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormData(prev => ({ ...prev, overallResult: 'pass' }))}
                className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-medium transition-colors min-h-[56px] ${
                  formData.overallResult === 'pass'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/40'
                }`}
              >
                <CheckCircle className="h-6 w-6" />
                <span>PASS</span>
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, overallResult: 'fail' }))}
                className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-medium transition-colors min-h-[56px] ${
                  formData.overallResult === 'fail'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40'
                }`}
              >
                <XCircle className="h-6 w-6" />
                <span>FAIL</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pb-20">
          <button
            onClick={handleSaveDraft}
            className="flex-1 flex items-center justify-center space-x-2 py-4 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[56px]"
          >
            <Save className="h-5 w-5" />
            <span className="font-medium">Save Draft</span>
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center space-x-2 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors min-h-[56px]"
          >
            <FileText className="h-5 w-5" />
            <span className="font-medium">Submit for Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InspectionForm;