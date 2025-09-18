import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  FileText, 
  Upload,
  CheckCircle,
  Home
} from 'lucide-react';

interface AddPropertyProps {
  onBack: () => void;
  onSave: () => void;
}

const AddProperty: React.FC<AddPropertyProps> = ({ onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    community: '',
    planNumber: '',
    closingDate: '',
    contactName: '',
    contactPhone: '',
    notes: '',
    photos: [] as File[]
  });
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const communities = [
    'Frisco',
    'Plano',
    'McKinney',
    'Allen',
    'Richardson',
    'Carrollton',
    'The Colony',
    'Irving',
    'Garland',
    'Flower Mound',
    'Lewisville',
    'Dallas',
    'Rockwall'
  ];

  const steps = [
    { number: 1, title: 'Property Details', icon: Home },
    { number: 2, title: 'Contact Info', icon: User },
    { number: 3, title: 'Additional Info', icon: FileText }
  ];

  const mockAddressSuggestions = [
    '5432 Pine Valley Lane, Frisco, TX 75034',
    '7890 Heritage Oak Street, Plano, TX 75024',
    '7125 Adderly Road, McKinney, TX 75070',
    '2156 Sunset Hills Drive, Allen, TX 75013',
    '7612 Spicebush Drive, Richardson, TX 75081',
    '1408 Quasar Drive, Carrollton, TX 75006',
    '8934 Timber Ridge Court, The Colony, TX 75056',
    '3215 Meadow Park Boulevard, Irving, TX 75038',
    '4567 Stone Haven Drive, Garland, TX 75040',
    '6789 Winding Creek Lane, Flower Mound, TX 75022',
    '9876 Oak Ridge Court, Lewisville, TX 75057',
    '1234 Champions Drive, Dallas, TX 75201',
    '5678 Legacy Drive, Plano, TX 75023',
    '8901 Preston Road, Frisco, TX 75035',
    '2468 Main Street, Rockwall, TX 75087'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Show address suggestions when typing in address field
    if (field === 'address' && value.length > 0) {
      // TODO: Replace with Google Maps Places API call
      // const service = new google.maps.places.AutocompleteService();
      // service.getPlacePredictions({
      //   input: value,
      //   componentRestrictions: { country: 'US' },
      //   types: ['address'],
      //   bounds: new google.maps.LatLngBounds(
      //     new google.maps.LatLng(32.7767, -97.3807), // Southwest DFW
      //     new google.maps.LatLng(33.2148, -96.5119)  // Northeast DFW
      //   )
      // }, (predictions, status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {
      //     setAddressSuggestions(predictions.map(p => p.description));
      //     setShowSuggestions(true);
      //   }
      // });

      // Demo implementation with DFW addresses
      const filtered = mockAddressSuggestions.filter(addr =>
        addr.toLowerCase().includes(value.toLowerCase()) ||
        addr.toLowerCase().split(',')[0].includes(value.toLowerCase()) ||
        addr.toLowerCase().split(' ').some(word => word.startsWith(value.toLowerCase()))
      ).slice(0, 6);
      setAddressSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else if (field === 'address') {
      setShowSuggestions(false);
      setAddressSuggestions([]);
    }
  };

  const handleAddressSelect = (address: string) => {
    setFormData(prev => ({ ...prev, address }));
    setShowSuggestions(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.address && formData.community && formData.planNumber;
      case 2:
        return formData.contactName && formData.contactPhone;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!isStepValid(1) || !isStepValid(2)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSave();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Property Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  onFocus={() => {
                    if (formData.address.length > 0) {
                      const filtered = mockAddressSuggestions.filter(addr =>
                        addr.toLowerCase().includes(formData.address.toLowerCase()) ||
                        addr.toLowerCase().split(',')[0].includes(formData.address.toLowerCase()) ||
                        addr.toLowerCase().split(' ').some(word => word.startsWith(formData.address.toLowerCase()))
                      ).slice(0, 6);
                      setAddressSuggestions(filtered);
                      setShowSuggestions(filtered.length > 0);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Enter full property address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                
                {/* Address Suggestions Dropdown */}
                {showSuggestions && addressSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {addressSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAddressSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-900 dark:text-white">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Community *
              </label>
              <select
                value={formData.community}
                onChange={(e) => handleInputChange('community', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select a community</option>
                {communities.map(community => (
                  <option key={community} value={community}>{community}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plan Number *
              </label>
              <input
                type="text"
                value={formData.planNumber}
                onChange={(e) => handleInputChange('planNumber', e.target.value)}
                placeholder="e.g., MP-2341"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Closing Date (Optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) => handleInputChange('closingDate', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Site Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Site superintendent or contact person"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Additional Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special instructions, requirements, or notes..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload photos</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        multiple 
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Property</h1>
          <p className="text-gray-600 dark:text-gray-400">Create a new property for inspection tracking</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : isCurrent
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div className="hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isCompleted || isCurrent 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-px mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="flex-1 py-3 px-6 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
        )}
        
        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            disabled={!isStepValid(currentStep)}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              !isStepValid(currentStep)
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
            }`}
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isStepValid(1) || !isStepValid(2) || isSubmitting}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              !isStepValid(1) || !isStepValid(2) || isSubmitting
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving Property...</span>
              </div>
            ) : (
              'Save Property'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProperty;