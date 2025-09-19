import React from 'react';
import { Settings } from 'lucide-react';

function InspectorSettings() {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-16">
      {/* Settings Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 text-center">
        <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Settings panel will be configured based on your requirements.
        </p>
      </div>
    </div>
  );
}

export default InspectorSettings;