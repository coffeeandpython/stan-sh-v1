import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Plus,
  Edit,
  MoreHorizontal,
  UserCheck,
  UserX
} from 'lucide-react';
import { Inspector, Property, Inspection } from '../../types';

interface InspectorManagementProps {
  inspectors: Inspector[];
  properties: Property[];
  inspections: Inspection[];
}

const InspectorManagement: React.FC<InspectorManagementProps> = ({
  inspectors,
  properties,
  inspections
}) => {
  const [selectedInspector, setSelectedInspector] = useState<Inspector | null>(null);

  const getInspectorProperties = (inspectorName: string) => {
    const inspectorInspections = inspections.filter(i => i.inspector.name === inspectorName);
    return inspectorInspections.map(inspection => {
      const property = properties.find(p => p.id === inspection.propertyId);
      return { inspection, property };
    }).filter(item => item.property);
  };

  const InspectorCard = ({ inspector }: { inspector: Inspector }) => {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setSelectedInspector(inspector)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div>
              {inspector.avatar ? (
                <img
                  src={inspector.avatar}
                  alt={inspector.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {inspector.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {inspector.name}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Inspector ID: {inspector.id}
              </div>
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
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{inspector.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{inspector.email}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {inspector.serviceAreas.slice(0, 2).join(', ')}
              {inspector.serviceAreas.length > 2 && ` +${inspector.serviceAreas.length - 2} more`}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {inspector.specialties.map(s => s.replace('-', ' ')).join(', ')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inspector Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your team of {inspectors.length} inspectors. {inspectors.filter(i => i.isActive).length} are currently active.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Inspector</span>
            </button>
          </div>
        </div>

      </div>


      {/* Inspector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inspectors.map(inspector => (
          <InspectorCard key={inspector.id} inspector={inspector} />
        ))}
      </div>

      {/* Inspector Detail Modal */}
      {selectedInspector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedInspector.name} Details
              </h3>
              <button
                onClick={() => setSelectedInspector(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{selectedInspector.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{selectedInspector.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInspector.serviceAreas.map(area => (
                    <span key={area} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInspector.specialties.map(specialty => (
                    <span key={specialty} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                      {specialty.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent Properties</h4>
                <div className="space-y-2">
                  {getInspectorProperties(selectedInspector.name).slice(0, 5).map(({ inspection, property }) => (
                    <div key={inspection.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{property?.address}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {inspection.type.replace('-', ' ')} • {inspection.status}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(inspection.scheduledDate).toLocaleDateString()}
                      </div>
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

export default InspectorManagement;