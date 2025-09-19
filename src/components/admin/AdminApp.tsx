import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Building2,
  Users,
  Calendar,
  ClipboardCheck,
  FileText,
  Settings,
  Bell,
  Moon,
  Sun,
  Search,
  Filter,
  Plus,
  Bot
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import PropertiesManagement from './PropertiesManagement';
import InspectorManagement from './InspectorManagement';
import CalendarScheduling from './CalendarScheduling';
import BuilderManagement from './BuilderManagement';
import InspectionReviewCenter from './InspectionReviewCenter';
import ReportsAnalytics from './ReportsAnalytics';
import SystemSettings from './SystemSettings';
import AdminAddProperty from './AdminAddProperty';
import AdminFiles from './AdminFiles';
import AutomationsCenter from './AutomationsCenter';
import { Property, Inspection, Inspector, Builder } from '../../types';
import { mockProperties, mockInspections } from '../../data/mockData';
import { mockInspectors, mockBuilders, mockAdminKPI, mockActivityFeed, mockCorrectionRequests } from '../../data/adminMockData';

type AdminView = 'dashboard' | 'properties' | 'inspectors' | 'calendar' | 'builders' | 'review' | 'reports' | 'files' | 'automations' | 'settings' | 'add-property';

function AdminApp() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [properties] = useState<Property[]>(mockProperties);
  const [inspections] = useState<Inspection[]>(mockInspections);
  const [inspectors] = useState<Inspector[]>(mockInspectors);
  const [builders] = useState<Builder[]>(mockBuilders);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigationItems = [
    { key: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null },
    { key: 'properties', icon: Building2, label: 'Properties', badge: properties.length },
    { key: 'inspectors', icon: Users, label: 'Inspectors', badge: inspectors.length },
    { key: 'calendar', icon: Calendar, label: 'Calendar', badge: null },
    { key: 'builders', icon: Building2, label: 'Builders', badge: builders.length },
    { key: 'review', icon: ClipboardCheck, label: 'Review Center', badge: mockCorrectionRequests.filter(c => c.status === 'pending').length },
    { key: 'automations', icon: Bot, label: 'Automations', badge: 4 },
    { key: 'reports', icon: BarChart3, label: 'Reports', badge: null },
    { key: 'files', icon: FileText, label: 'Files', badge: null },
    { key: 'settings', icon: Settings, label: 'Settings', badge: null }
  ];

  const renderHeader = () => (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">SystemHause</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties, builders, inspectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">

            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

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
                <span className="text-xs text-white font-medium">5</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">SA</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block">Stan</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-16 bottom-0 z-30 overflow-y-auto`}>
      <nav className="p-4">
        <div className="space-y-2">
          {navigationItems.map(({ key, icon: Icon, label, badge }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as AdminView)}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2 rounded-lg text-left transition-colors ${
                currentView === key
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="font-medium">{label}</span>}
              </div>
              {!sidebarCollapsed && badge !== null && (
                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${
                  currentView === key
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );

  const renderContent = () => {
    const contentProps = {
      properties,
      inspections,
      inspectors,
      builders,
      searchQuery,
      onSearchChange: setSearchQuery
    };

    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard {...contentProps} />;
      case 'properties':
        return <PropertiesManagement {...contentProps} onAddProperty={() => setCurrentView('add-property')} />;
      case 'inspectors':
        return <InspectorManagement {...contentProps} />;
      case 'calendar':
        return <CalendarScheduling {...contentProps} />;
      case 'builders':
        return <BuilderManagement {...contentProps} />;
      case 'review':
        return <InspectionReviewCenter {...contentProps} />;
      case 'automations':
        return <AutomationsCenter />;
      case 'reports':
        return <ReportsAnalytics {...contentProps} />;
      case 'files':
        return <AdminFiles properties={properties} builders={builders} />;
      case 'settings':
        return <SystemSettings {...contentProps} />;
      case 'add-property':
        return (
          <AdminAddProperty
            builders={builders}
            onBack={() => setCurrentView('properties')}
            onSave={(property) => {
              console.log('New property created:', property);
              setCurrentView('properties');
            }}
          />
        );
      default:
        return <AdminDashboard {...contentProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {renderHeader()}
      {renderSidebar()}

      <main className={`${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-4 transition-all duration-300`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminApp;