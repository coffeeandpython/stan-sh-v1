import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Home, 
  Zap, 
  Shield,
  FileCheck
} from 'lucide-react';
import { Property } from '../types';

interface RequestInspectionModalProps {
  property?: Property;
  onClose: () => void;
  onSubmit: (inspectionData: any) => void;
}

const RequestInspectionModal: React.FC<RequestInspectionModalProps> = ({
  property,
  onClose,
  onSubmit
}) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>(property ? [property.id] : []);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [closingDate, setClosingDate] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock properties for bulk selection (in real app, this would come from props)
  const availableProperties = [
    { id: '1', address: '7125 Adderly Road', stage: 'poly-test' },
    { id: '5', address: '8934 Timber Ridge Court', stage: 'pre-rock' },
    { id: '6', address: '2156 Sunset Hills Drive', stage: 'poly-test' },
    { id: '7', address: '5432 Pine Valley Lane', stage: 'final' }
  ];

  const inspectionTypes = [
    {
      id: 'pre-rock',
      name: 'Pre-Rock Inspection',
      description: 'Electrical, plumbing, and framing inspection',
      icon: Home,
      estimatedTime: '2-3 hours',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    {
      id: 'poly-test',
      name: 'Poly Test',
      description: 'Pressure testing for plumbing systems',
      icon: Zap,
      estimatedTime: '1-2 hours',
      color: 'bg-orange-50 border-orange-200 text-orange-700'
    },
    {
      id: 'final',
      name: 'Final Inspection',
      description: 'Complete system verification and certification',
      icon: Shield,
      estimatedTime: '2-4 hours',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 'follow-up',
      name: 'Follow-up Inspection',
      description: 'Re-inspection after corrections',
      icon: FileCheck,
      estimatedTime: '1-2 hours',
      color: 'bg-green-50 border-green-200 text-green-700'
    }
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date('2025-10-05'); // Using future date as requested
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (assuming inspections are weekdays only)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || selectedProperties.length === 0 || (property && (!selectedDate || !selectedTime))) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit({
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      closingDate,
      notes,
      propertyIds: selectedProperties
    });
    
    setIsSubmitting(false);
  };

  const selectedInspectionType = inspectionTypes.find(type => type.id === selectedType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl sm:mx-4 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {property ? 'Request Inspection' : 'Bulk Request Inspections'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {property ? property.address : `${selectedProperties.length} properties selected`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Inspection Type Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Select Inspection Type
              </h3>
              <div className="grid gap-3">
                {inspectionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedType === type.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{type.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{type.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{type.estimatedTime}</span>
                          </div>
                        </div>
                        {selectedType === type.id && (
                          <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Selection (only for bulk requests) */}
            {!property && selectedType && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Select Eligible Properties
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableProperties.map((prop) => (
                    <label
                      key={prop.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(prop.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProperties(prev => [...prev, prop.id]);
                          } else {
                            setSelectedProperties(prev => prev.filter(id => id !== prop.id));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{prop.address}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          Current stage: {prop.stage.replace('-', ' ')}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Closing Date for Bulk Requests */}
            {!property && selectedProperties.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Target Closing Date (Optional)
                </h3>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={closingDate}
                    onChange={(e) => setClosingDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  This helps prioritize inspection scheduling based on your closing timeline
                </p>
              </div>
            )}

            {/* Date Selection (only for single property) */}
            {property && selectedType && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Select Date
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {getAvailableDates().slice(0, 6).map((date) => {
                    const dateString = date.toISOString().split('T')[0];
                    const isSelected = selectedDate === dateString;
                    
                    return (
                      <button
                        key={dateString}
                        type="button"
                        onClick={() => setSelectedDate(dateString)}
                        className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-semibold">
                          {date.getDate()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Time Selection (only for single property) */}
            {property && selectedDate && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Select Time
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="font-medium">{time}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {(selectedTime || (!property && selectedProperties.length > 0)) && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Special Notes (Optional)
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions or notes for the inspector..."
                  className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  rows={3}
                />
              </div>
            )}

            {/* Summary */}
            {selectedInspectionType && ((property && selectedDate && selectedTime) || (!property && selectedProperties.length > 0)) && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Inspection Summary</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p><strong>Properties:</strong> {selectedProperties.length} selected</p>
                  <p><strong>Type:</strong> {selectedInspectionType.name}</p>
                  {property && selectedDate && (
                    <>
                      <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
                      })}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                    </>
                  )}
                  {!property && closingDate && (
                    <p><strong>Target Closing:</strong> {new Date(closingDate).toLocaleDateString('en-US', { 
                      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
                    })}</p>
                  )}
                  <p><strong>Duration:</strong> {selectedInspectionType.estimatedTime}</p>
                  {!property && <p className="text-orange-600 dark:text-orange-400"><strong>Note:</strong> Individual scheduling will be coordinated separately</p>}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!selectedType || selectedProperties.length === 0 || (property && (!selectedDate || !selectedTime)) || isSubmitting}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                  !selectedType || selectedProperties.length === 0 || (property && (!selectedDate || !selectedTime)) || isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Requesting...</span>
                  </div>
                ) : (
                  selectedProperties.length > 1 ? 'Request Inspections' : 'Request Inspection'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestInspectionModal;