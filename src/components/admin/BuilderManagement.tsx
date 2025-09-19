import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { Builder, Property, Inspector } from '../../types';

interface BuilderManagementProps {
  builders: Builder[];
  properties: Property[];
  inspectors: Inspector[];
}

const BuilderManagement: React.FC<BuilderManagementProps> = ({
  builders,
  properties
}) => {
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);

  const getBuilderProperties = (builderId: string) => {
    const builder = builders.find(b => b.id === builderId);
    if (!builder) return [];
    return properties.filter(p => builder.communities.includes(p.community));
  };


  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Builder Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage relationships with {builders.length} builder companies
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Builders</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {builders.filter(b => b.isActive).length}
              </p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Communities</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {[...new Set(builders.flatMap(b => b.communities))].length}
              </p>
            </div>
            <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {builders.map(builder => {
          const builderProperties = getBuilderProperties(builder.id);
          
          return (
            <div
              key={builder.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md cursor-pointer ${
                builder.isActive
                  ? 'border-gray-100 dark:border-gray-700'
                  : 'border-red-200 dark:border-red-800 opacity-75'
              }`}
              onClick={() => setSelectedBuilder(builder)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {builder.companyName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{builder.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  builder.isActive
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {builder.isActive ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  <span>{builder.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {builder.communities.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Communities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {builder.totalProperties.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Properties</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {builder.communities.slice(0, 2).join(', ')}
                    {builder.communities.length > 2 && ` +${builder.communities.length - 2} more`}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {builder.correctionRate.toFixed(1)}% correction rate
                  </span>
                </div>
              </div>

              {builder.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {builder.notes}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Builder Detail Modal */}
      {selectedBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedBuilder.companyName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedBuilder.contactName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBuilder(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedBuilder.totalProperties.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Properties</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {selectedBuilder.communities.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Communities</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {selectedBuilder.correctionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Correction Rate</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{selectedBuilder.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{selectedBuilder.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Service Communities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBuilder.communities.map(community => (
                    <span key={community} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {community}
                    </span>
                  ))}
                </div>
              </div>

              {selectedBuilder.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notes</h4>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-yellow-800 dark:text-yellow-200">{selectedBuilder.notes}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent Properties</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {getBuilderProperties(selectedBuilder.id).slice(0, 10).map(property => (
                    <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{property.address}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {property.stage} • {property.status}
                        </div>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderManagement;