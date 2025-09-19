import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  FileText,
  Settings,
  Moon,
  Sun,
  Building2,
  Phone,
  Bell
} from 'lucide-react';
import InspectorDashboard from './InspectorDashboard';
import InspectorSchedule from './InspectorSchedule';
import InspectorHistory from './InspectorHistory';
import InspectorProfile from './InspectorProfile';
import PropertyInspection from './PropertyInspection';
import InspectionForm from './InspectionForm';
import PhotoManager from './PhotoManager';
import InspectionReview from './InspectionReview';
import { Property, Inspection } from '../../types';
import { mockProperties, mockInspections } from '../../data/mockData';

type View = 'dashboard' | 'schedule' | 'history' | 'profile' | 'property' | 'inspection-form' | 'photo-manager' | 'inspection-review';

function InspectorApp() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [properties] = useState<Property[]>(mockProperties);
  const [inspections] = useState<Inspection[]>(mockInspections);

  // Inspector name (for demo purposes - David Chen)
  const inspectorName = "David Chen";
  const inspectorInitials = "DC";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filter inspections assigned to this inspector
  const myInspections = inspections.filter(inspection =>
    inspection.inspector.name === inspectorName
  );

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property');
  };

  const handleStartInspection = (property: Property, inspection?: Inspection) => {
    setSelectedProperty(property);
    setSelectedInspection(inspection || null);
    setCurrentView('inspection-form');
  };

  const handleViewPhotos = (property: Property, inspection?: Inspection) => {
    setSelectedProperty(property);
    setSelectedInspection(inspection || null);
    setCurrentView('photo-manager');
  };

  const handleReviewInspection = (property: Property, inspection?: Inspection) => {
    setSelectedProperty(property);
    setSelectedInspection(inspection || null);
    setCurrentView('inspection-review');
  };

  const renderHeader = () => (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Building2 className="h-7 w-7 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">SystemHause</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Inspector Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">2</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">{inspectorInitials}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-bottom">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-3">
          {[
            { key: 'dashboard', icon: Home, label: 'Today' },
            { key: 'schedule', icon: Calendar, label: 'Schedule' },
            { key: 'history', icon: FileText, label: 'History' },
            { key: 'profile', icon: Settings, label: 'Profile' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as View)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors min-h-[56px] min-w-[56px] ${
                currentView === key
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <InspectorDashboard
            inspections={myInspections}
            properties={properties}
            onViewProperty={handleViewProperty}
            onStartInspection={handleStartInspection}
            inspectorName={inspectorName}
          />
        );
      case 'schedule':
        return (
          <InspectorSchedule
            inspections={myInspections}
            properties={properties}
            onViewProperty={handleViewProperty}
            onStartInspection={handleStartInspection}
          />
        );
      case 'history':
        return (
          <InspectorHistory
            inspections={myInspections}
            properties={properties}
            onViewProperty={handleViewProperty}
            onViewPhotos={handleViewPhotos}
          />
        );
      case 'profile':
        return (
          <InspectorProfile
            inspectorName={inspectorName}
          />
        );
      case 'property':
        return selectedProperty ? (
          <PropertyInspection
            property={selectedProperty}
            inspections={myInspections.filter(i => i.propertyId === selectedProperty.id)}
            onBack={() => setCurrentView('dashboard')}
            onStartInspection={(inspection) => handleStartInspection(selectedProperty, inspection)}
            onViewPhotos={(inspection) => handleViewPhotos(selectedProperty, inspection)}
          />
        ) : null;
      case 'inspection-form':
        return selectedProperty ? (
          <InspectionForm
            property={selectedProperty}
            inspection={selectedInspection}
            onBack={() => setCurrentView('property')}
            onSubmitForReview={handleReviewInspection}
            onViewPhotos={() => handleViewPhotos(selectedProperty, selectedInspection)}
          />
        ) : null;
      case 'photo-manager':
        return selectedProperty ? (
          <PhotoManager
            property={selectedProperty}
            inspection={selectedInspection}
            onBack={() => setCurrentView('inspection-form')}
          />
        ) : null;
      case 'inspection-review':
        return selectedProperty ? (
          <InspectionReview
            property={selectedProperty}
            inspection={selectedInspection}
            onBack={() => setCurrentView('inspection-form')}
            onSubmit={() => setCurrentView('dashboard')}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {renderHeader()}

      <main className="pb-32 safe-area-bottom min-h-screen">
        {renderContent()}
      </main>

      {renderBottomNav()}
    </div>
  );
}

export default InspectorApp;