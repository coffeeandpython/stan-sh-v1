import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Camera, 
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Property } from '../types';

interface UploadCorrectionsProps {
  property: Property;
  onBack: () => void;
  onSubmit: () => void;
}

interface CorrectionItem {
  id: string;
  description: string;
  beforePhoto?: File;
  afterPhoto?: File;
  notes: string;
}

const UploadCorrections: React.FC<UploadCorrectionsProps> = ({
  property,
  onBack,
  onSubmit
}) => {
  const [corrections, setCorrections] = useState<CorrectionItem[]>([
    { id: '1', description: '', beforePhoto: undefined, afterPhoto: undefined, notes: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCorrection = () => {
    const newCorrection: CorrectionItem = {
      id: Date.now().toString(),
      description: '',
      beforePhoto: undefined,
      afterPhoto: undefined,
      notes: ''
    };
    setCorrections(prev => [...prev, newCorrection]);
  };

  const removeCorrection = (id: string) => {
    if (corrections.length > 1) {
      setCorrections(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateCorrection = (id: string, field: keyof CorrectionItem, value: any) => {
    setCorrections(prev => 
      prev.map(c => c.id === id ? { ...c, [field]: value } : c)
    );
  };

  const handlePhotoUpload = (correctionId: string, type: 'beforePhoto' | 'afterPhoto') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      updateCorrection(correctionId, type, file);
    }
  };

  const removePhoto = (correctionId: string, type: 'beforePhoto' | 'afterPhoto') => {
    updateCorrection(correctionId, type, undefined);
  };

  const isFormValid = () => {
    return corrections.every(c => 
      c.description.trim() && 
      (c.beforePhoto || c.afterPhoto) // At least one photo required
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit();
  };

  const PhotoUploadBox: React.FC<{
    photo?: File;
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    label: string;
    type: 'before' | 'after';
  }> = ({ photo, onUpload, onRemove, label, type }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      {photo ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(photo)}
            alt={label}
            className="w-full h-48 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
            type === 'before' 
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {type === 'before' ? 'Before' : 'After'}
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6">
          <div className="text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
              <span>Upload {type} photo</span>
              <input 
                type="file" 
                className="sr-only" 
                accept="image/*"
                onChange={onUpload}
              />
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Corrections</h1>
          <p className="text-gray-600 dark:text-gray-400">{property.address}</p>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-orange-900 dark:text-orange-300">Correction Documentation Required</h3>
            <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
              Please document all corrections made to address the failed inspection items. 
              Include before/after photos and detailed descriptions for each correction.
            </p>
          </div>
        </div>
      </div>

      {/* Corrections Form */}
      <div className="space-y-8">
        {corrections.map((correction, index) => (
          <div 
            key={correction.id} 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Correction {index + 1}
              </h3>
              {corrections.length > 1 && (
                <button
                  onClick={() => removeCorrection(correction.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Description *
                </label>
                <input
                  type="text"
                  value={correction.description}
                  onChange={(e) => updateCorrection(correction.id, 'description', e.target.value)}
                  placeholder="Describe the issue that was corrected (e.g., 'Fixed electrical panel wiring')"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Photo Upload Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhotoUploadBox
                  photo={correction.beforePhoto}
                  onUpload={handlePhotoUpload(correction.id, 'beforePhoto')}
                  onRemove={() => removePhoto(correction.id, 'beforePhoto')}
                  label="Before Photo (Optional)"
                  type="before"
                />
                
                <PhotoUploadBox
                  photo={correction.afterPhoto}
                  onUpload={handlePhotoUpload(correction.id, 'afterPhoto')}
                  onRemove={() => removePhoto(correction.id, 'afterPhoto')}
                  label="After Photo *"
                  type="after"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={correction.notes}
                  onChange={(e) => updateCorrection(correction.id, 'notes', e.target.value)}
                  placeholder="Additional details about the correction work performed..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Correction Button */}
        <button
          onClick={addCorrection}
          className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center space-x-2"
        >
          <FileText className="h-5 w-5" />
          <span className="font-medium">Add Another Correction</span>
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
            !isFormValid() || isSubmitting
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Submitting Corrections...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Submit for Review</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadCorrections;