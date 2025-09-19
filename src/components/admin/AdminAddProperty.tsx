import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Calendar,
  FileText,
  Save,
  X
} from 'lucide-react';
import { Builder } from '../../types';

interface AdminAddPropertyProps {
  builders: Builder[];
  onBack: () => void;
  onSave: (property: any) => void;
}

const AdminAddProperty: React.FC<AdminAddPropertyProps> = ({
  builders,
  onBack,
  onSave
}) => {
  const [formData, setFormData] = useState({
    address: '',
    community: '',
    planNumber: '',
    selectedBuilder: '',
    closingDate: '',
    siteContactName: '',
    siteContactPhone: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const communities = [
    'Meadow Park',
    'Stone Haven',
    'Winding Creek',
    'Sunset Hills',
    'Oak Ridge',
    'Pine Valley',
    'Heritage Hills'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Property address is required';
    }

    if (!formData.selectedBuilder) {
      newErrors.selectedBuilder = 'Please select a builder';
    }

    if (!formData.community) {
      newErrors.community = 'Please select a community';
    }

    if (!formData.planNumber.trim()) {
      newErrors.planNumber = 'Plan number is required';
    }

    if (!formData.siteContactName.trim()) {
      newErrors.siteContactName = 'Site contact name is required';
    }

    if (!formData.siteContactPhone.trim()) {
      newErrors.siteContactPhone = 'Site contact phone is required';
    } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.siteContactPhone)) {
      newErrors.siteContactPhone = 'Phone must be in format (555) 123-4567';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedBuilder = builders.find(b => b.id === formData.selectedBuilder);

    const newProperty = {
      id: `property-${Date.now()}`,
      address: formData.address,
      community: formData.community,
      planNumber: formData.planNumber,
      stage: 'pre-rock' as const,
      status: 'pending' as const,
      closingDate: formData.closingDate || undefined,
      siteContact: {
        name: formData.siteContactName,
        phone: formData.siteContactPhone
      },
      notes: formData.notes || undefined,
      photos: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      builder: selectedBuilder?.companyName || '',
      builderContact: selectedBuilder?.contactName || ''
    };

    onSave(newProperty);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('siteContactPhone', formatted);
  };

  const selectedBuilder = builders.find(b => b.id === formData.selectedBuilder);
  const builderCommunities = selectedBuilder ? selectedBuilder.communities : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Property</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new property in the system
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Information</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="1234 Main Street"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plan Number *
                </label>
                <input
                  type="text"
                  value={formData.planNumber}
                  onChange={(e) => handleInputChange('planNumber', e.target.value)}
                  placeholder="MP-2341"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.planNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.planNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.planNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Builder *
              </label>
              <select
                value={formData.selectedBuilder}
                onChange={(e) => {
                  handleInputChange('selectedBuilder', e.target.value);
                  // Reset community when builder changes
                  handleInputChange('community', '');
                }}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.selectedBuilder ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select a builder</option>
                {builders.filter(b => b.isActive).map(builder => (
                  <option key={builder.id} value={builder.id}>
                    {builder.companyName} - {builder.contactName}
                  </option>
                ))}
              </select>
              {errors.selectedBuilder && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.selectedBuilder}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Community *
              </label>
              <select
                value={formData.community}
                onChange={(e) => handleInputChange('community', e.target.value)}
                disabled={!formData.selectedBuilder}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.community ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">
                  {formData.selectedBuilder ? 'Select a community' : 'Select a builder first'}
                </option>
                {builderCommunities.map(community => (
                  <option key={community} value={community}>
                    {community}
                  </option>
                ))}
              </select>
              {errors.community && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.community}</p>
              )}
              {formData.selectedBuilder && builderCommunities.length === 0 && (
                <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">
                  This builder has no assigned communities
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Closing Date
              </label>
              <input
                type="date"
                value={formData.closingDate}
                onChange={(e) => handleInputChange('closingDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Site Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Site Contact</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.siteContactName}
                  onChange={(e) => handleInputChange('siteContactName', e.target.value)}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.siteContactName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.siteContactName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.siteContactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.siteContactPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(555) 123-4567"
                  maxLength={14}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.siteContactPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.siteContactPhone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.siteContactPhone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Information</h3>
            </div>
          </div>
          <div className="p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional notes or special instructions..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Create Property</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProperty;