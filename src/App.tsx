import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Calendar, 
  FileText, 
  Plus, 
  Search,
  Filter,
  Bell,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import PropertiesList from './components/PropertiesList';
import PropertyDetail from './components/PropertyDetail';
import CalendarView from './components/CalendarView';
import DocumentsReports from './components/DocumentsReports';
import AddProperty from './components/AddProperty';
import RequestInspectionModal from './components/RequestInspectionModal';
import UploadCorrections from './components/UploadCorrections';
import { Property, Inspection } from './types';
import { mockProperties, mockInspections } from './data/mockData';

type View = 'dashboard' | 'properties' | 'property-detail' | 'calendar' | 'documents' | 'add-property' | 'upload-corrections';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties] = useState<Property[]>(mockProperties);
  const [inspections] = useState<Inspection[]>(mockInspections);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property-detail');
  };

  const handleBackToProperties = () => {
    setCurrentView('properties');
    setSelectedProperty(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProperty(null);
  };

  const renderHeader = () => (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">SystemHause</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">MI Homes Portal</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
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
                <span className="text-xs text-white font-medium">3</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block">John Davis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          {[
            { key: 'dashboard', icon: Home, label: 'Dashboard' },
            { key: 'properties', icon: Building2, label: 'Properties' },
            { key: 'calendar', icon: Calendar, label: 'Calendar' },
            { key: 'documents', icon: FileText, label: 'Documents' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as View)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentView === key
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  const renderFloatingActionButton = () => (
    <button
      onClick={() => setCurrentView('add-property')}
      className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group active:scale-95"
    >
      <Plus className="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-200" />
    </button>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            properties={properties}
            inspections={inspections}
            onViewProperties={() => setCurrentView('properties')}
            onViewProperty={handleViewProperty}
            onAddProperty={() => setCurrentView('add-property')}
            onRequestInspection={() => setShowRequestModal(true)}
          />
        );
      case 'properties':
        return (
          <PropertiesList
            properties={properties}
            onViewProperty={handleViewProperty}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      case 'property-detail':
        return selectedProperty ? (
          <PropertyDetail
            property={selectedProperty}
            inspections={inspections.filter(i => i.propertyId === selectedProperty.id)}
            onBack={handleBackToProperties}
            onRequestInspection={() => setShowRequestModal(true)}
            onUploadCorrections={() => setCurrentView('upload-corrections')}
          />
        ) : null;
      case 'calendar':
        return <CalendarView inspections={inspections} properties={properties} />;
      case 'documents':
        return <DocumentsReports properties={properties} />;
      case 'add-property':
        return <AddProperty onBack={handleBackToDashboard} onSave={handleBackToDashboard} />;
      case 'upload-corrections':
        return selectedProperty ? (
          <UploadCorrections
            property={selectedProperty}
            onBack={() => setCurrentView('property-detail')}
            onSubmit={() => setCurrentView('property-detail')}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {renderHeader()}
      
      <main className="pb-20">
        {renderContent()}
      </main>

      {renderBottomNav()}
      {renderFloatingActionButton()}

      {showRequestModal && selectedProperty && (
        <RequestInspectionModal
          property={selectedProperty}
          onClose={() => setShowRequestModal(false)}
          onSubmit={() => {
            setShowRequestModal(false);
            // Handle inspection request
          }}
        />
      )}

      {showRequestModal && !selectedProperty && (
        <RequestInspectionModal
          onClose={() => setShowRequestModal(false)}
          onSubmit={() => {
            setShowRequestModal(false);
            // Handle bulk inspection request
          }}
        />
      )}
    </div>
  );
}

export default App;