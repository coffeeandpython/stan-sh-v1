import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Settings,
  Bell,
  Moon,
  Sun,
  Download,
  LogOut,
  Shield,
  Clock,
  Award,
  Camera,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface InspectorProfileProps {
  inspectorName: string;
}

function InspectorProfile({ inspectorName }: InspectorProfileProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  // Mock inspector data
  const inspectorData = {
    name: inspectorName,
    email: 'david.chen@systemhause.com',
    phone: '(555) 111-2222',
    badge: 'INS-001',
    specialties: ['Pre-Rock', 'Poly Test', 'Final', 'Blower Door'],
    serviceAreas: ['Dallas', 'Plano', 'Frisco', 'McKinney'],
    stats: {
      totalInspections: 342,
      completionRate: 98.5,
      avgInspectionTime: 45,
      rating: 4.9
    },
    certifications: [
      { name: 'Energy Efficiency Inspector', expires: '2025-12-31' },
      { name: 'Building Code Inspector', expires: '2025-08-15' },
      { name: 'Blower Door Certified', expires: '2026-03-20' }
    ]
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleEmergencyContact = () => {
    window.open('tel:+15551234567', '_self');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      // Handle logout logic
      console.log('Logging out...');
    }
  };

  const handleDownloadOfflineData = () => {
    // Simulate offline data download
    alert('Downloading today\'s inspections for offline access...');
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-16">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">DC</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{inspectorData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{inspectorData.badge}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.floor(inspectorData.stats.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {inspectorData.stats.rating}/5.0
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{inspectorData.stats.totalInspections}</div>
            <div className="text-sm text-blue-600 font-medium">Total Inspections</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{inspectorData.stats.completionRate}%</div>
            <div className="text-sm text-green-600 font-medium">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contact Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white font-medium">{inspectorData.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white font-medium">{inspectorData.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties & Service Areas */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Specialties</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {inspectorData.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Service Areas</p>
            <div className="flex flex-wrap gap-2">
              {inspectorData.serviceAreas.map((area, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">App Settings</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-600" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use dark theme</p>
              </div>
            </div>
            <button
              onClick={handleToggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Push notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Offline Mode Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              {offlineMode ? (
                <WifiOff className="h-5 w-5 text-orange-600" />
              ) : (
                <Wifi className="h-5 w-5 text-blue-600" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Offline Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Work without internet</p>
              </div>
            </div>
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                offlineMode ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
                  offlineMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto Sync Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto Sync</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Auto upload when online</p>
              </div>
            </div>
            <button
              onClick={() => setAutoSync(!autoSync)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSync ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
                  autoSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Offline Data */}
      {offlineMode && (
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-200 dark:border-orange-900/40 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Download className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">Offline Data</h3>
          </div>
          <p className="text-orange-800 dark:text-orange-200 mb-4">
            Download your scheduled inspections to work offline.
          </p>
          <button
            onClick={handleDownloadOfflineData}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors min-h-[48px]"
          >
            <Download className="h-5 w-5" />
            <span className="font-medium">Download Today's Schedule</span>
          </button>
        </div>
      )}

      {/* Certifications */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Certifications</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {inspectorData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expires: {new Date(cert.expires).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & Support */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Support & Emergency</h3>
        <div className="space-y-3">
          <button
            onClick={handleEmergencyContact}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors min-h-[48px]"
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Emergency Contact</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl transition-colors min-h-[48px]">
            <Phone className="h-5 w-5" />
            <span className="font-medium">Call Admin Support</span>
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          SystemHause Inspector App
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Version 2.1.0 • Build 2024.12
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[48px] mx-auto"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default InspectorProfile;