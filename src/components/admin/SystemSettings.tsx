import React, { useState } from 'react';
import {
  Users,
  FileText,
  Mail,
  Settings,
  Shield,
  Database,
  Bell,
  Globe,
  Palette,
  Key,
  Save,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Inspector, Builder } from '../../types';

interface SystemSettingsProps {
  inspectors: Inspector[];
  builders: Builder[];
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  inspectors,
  builders
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'templates' | 'notifications' | 'system'>('users');
  const [showAddUser, setShowAddUser] = useState(false);

  const settingsTabs = [
    { id: 'users', name: 'User Management', icon: Users, description: 'Manage inspectors, builders, and access' },
    { id: 'templates', name: 'Templates', icon: FileText, description: 'Inspection forms and document templates' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Email and system notifications' },
    { id: 'system', name: 'System', icon: Settings, description: 'General system configuration' }
  ];

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // Save settings logic here
  };

  const UserManagementTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Inspectors Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Inspectors ({inspectors.length})</h4>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Manage All
          </button>
        </div>
        <div className="space-y-3">
          {inspectors.slice(0, 3).map((inspector) => (
            <div key={inspector.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {inspector.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{inspector.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{inspector.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  inspector.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {inspector.isActive ? 'Active' : 'Inactive'}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Builders Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Builders ({builders.length})</h4>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Manage All
          </button>
        </div>
        <div className="space-y-3">
          {builders.slice(0, 3).map((builder) => (
            <div key={builder.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {builder.companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{builder.companyName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{builder.contactName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  builder.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {builder.isActive ? 'Active' : 'Inactive'}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Document Templates</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Pre-Rock Inspection Form', type: 'Form', status: 'Active', lastModified: '2 days ago' },
          { name: 'Final Inspection Report', type: 'Report', status: 'Active', lastModified: '1 week ago' },
          { name: 'Compliance Letter Template', type: 'Letter', status: 'Active', lastModified: '3 days ago' },
          { name: 'Correction Notice', type: 'Notice', status: 'Draft', lastModified: '1 day ago' }
        ].map((template, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{template.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                template.status === 'Active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {template.status}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Modified {template.lastModified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
      
      <div className="space-y-4">
        {[
          { title: 'Inspection Completed', description: 'Notify when an inspection is completed', enabled: true },
          { title: 'Correction Submitted', description: 'Notify when correction photos are uploaded', enabled: true },
          { title: 'Payment Overdue', description: 'Alert when builder payments are overdue', enabled: true },
          { title: 'Schedule Changes', description: 'Notify about inspection schedule modifications', enabled: false },
          { title: 'System Maintenance', description: 'Alerts about system maintenance windows', enabled: true }
        ].map((setting, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{setting.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={setting.enabled}
                className="sr-only peer"
                onChange={() => {}}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const SystemTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Configuration</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">General Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="SystemHause"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Zone
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Inspection Duration (minutes)
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Security Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Additional security for admin accounts</p>
                </div>
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">API Access</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">External system integrations</p>
                </div>
              </div>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Manage Keys
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Database Backup</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last backup: 2 hours ago</p>
                </div>
              </div>
              <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                Backup Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users': return <UserManagementTab />;
      case 'templates': return <TemplatesTab />;
      case 'notifications': return <NotificationsTab />;
      case 'system': return <SystemTab />;
      default: return <UserManagementTab />;
    }
  };

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">
              System configuration and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-12 text-center">
          <Settings className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Settings Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            System settings and configuration options will be available in a future update.
            Most settings are currently managed automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;