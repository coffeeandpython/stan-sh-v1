import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  Building2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Property, Inspection, Inspector, Builder } from '../../types';
import { mockBuilders } from '../../data/adminMockData';

interface PropertiesManagementProps {
  properties: Property[];
  inspections: Inspection[];
  inspectors: Inspector[];
  builders: Builder[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddProperty?: () => void;
}

const PropertiesManagement: React.FC<PropertiesManagementProps> = ({
  properties,
  inspections,
  inspectors,
  builders,
  searchQuery,
  onSearchChange,
  onAddProperty
}) => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortBy, setSortBy] = useState<'address' | 'stage' | 'status' | 'closingDate' | 'lastActivity'>('lastActivity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    stage: 'all',
    status: 'all',
    builder: 'all',
    community: 'all',
    inspector: 'all'
  });

  const enrichedProperties = useMemo(() => {
    return properties.map(property => {
      const propertyInspections = inspections.filter(i => i.propertyId === property.id);
      const lastInspection = propertyInspections.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];

      const builder = builders.find(b =>
        property.community && b.communities.includes(property.community)
      ) || mockBuilders[0];

      const assignedInspector = lastInspection ?
        inspectors.find(i => i.name === lastInspection.inspector.name) :
        null;

      const daysInCurrentStage = Math.floor(
        (new Date().getTime() - new Date(property.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24)
      );

      const closingDays = property.closingDate ? Math.floor(
        (new Date(property.closingDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
      ) : null;

      return {
        ...property,
        builder: builder.companyName,
        builderContact: builder.contactName,
        assignedInspector: assignedInspector?.name || 'Unassigned',
        daysInCurrentStage,
        closingDays,
        lastActivity: property.updatedAt,
        inspectionCount: propertyInspections.length
      };
    });
  }, [properties, inspections, inspectors, builders]);

  const filteredProperties = useMemo(() => {
    let filtered = enrichedProperties;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(query) ||
        property.community.toLowerCase().includes(query) ||
        property.builder.toLowerCase().includes(query) ||
        property.planNumber.toLowerCase().includes(query)
      );
    }

    if (filters.stage !== 'all') {
      filtered = filtered.filter(p => p.stage === filters.stage);
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.builder !== 'all') {
      filtered = filtered.filter(p => p.builder === filters.builder);
    }
    if (filters.community !== 'all') {
      filtered = filtered.filter(p => p.community === filters.community);
    }
    if (filters.inspector !== 'all') {
      filtered = filtered.filter(p => p.assignedInspector === filters.inspector);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'address':
          aValue = a.address;
          bValue = b.address;
          break;
        case 'stage':
          aValue = a.stage;
          bValue = b.stage;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'closingDate':
          aValue = a.closingDate ? new Date(a.closingDate).getTime() : 0;
          bValue = b.closingDate ? new Date(b.closingDate).getTime() : 0;
          break;
        case 'lastActivity':
        default:
          aValue = new Date(a.lastActivity).getTime();
          bValue = new Date(b.lastActivity).getTime();
          break;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ?
          aValue.localeCompare(bValue) :
          bValue.localeCompare(aValue);
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [enrichedProperties, searchQuery, filters, sortBy, sortOrder]);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const uniqueBuilders = Array.from(new Set(enrichedProperties.map(p => p.builder)));
  const uniqueCommunities = Array.from(new Set(enrichedProperties.map(p => p.community)));
  const uniqueInspectors = Array.from(new Set(enrichedProperties.map(p => p.assignedInspector)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'in-progress': case 'scheduled': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'in-progress': case 'scheduled': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStageProgress = (stage: string) => {
    const stages = ['pre-rock', 'poly-test', 'final', 'complete'];
    const currentIndex = stages.indexOf(stage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === paginatedProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(paginatedProperties.map(p => p.id));
    }
  };

  const handleSelectProperty = (id: string) => {
    if (selectedProperties.includes(id)) {
      setSelectedProperties(selectedProperties.filter(pid => pid !== id));
    } else {
      setSelectedProperties([...selectedProperties, id]);
    }
  };

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Properties Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all properties across {uniqueBuilders.length} builders and {uniqueCommunities.length} communities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {onAddProperty && (
              <button
                onClick={onAddProperty}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Property</span>
              </button>
            )}
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center space-x-3">
            <select
              value={filters.stage}
              onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="pre-rock">Pre-Rock</option>
              <option value="poly-test">Poly Test</option>
              <option value="final">Final</option>
              <option value="complete">Complete</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>

            <select
              value={filters.builder}
              onChange={(e) => setFilters(prev => ({ ...prev, builder: e.target.value }))}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Builders</option>
              {uniqueBuilders.map(builder => (
                <option key={builder} value={builder}>{builder}</option>
              ))}
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {selectedProperties.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 dark:text-blue-300">
              {selectedProperties.length} properties selected
            </span>
            <div className="flex items-center space-x-3">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Bulk Assign Inspector
              </button>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Send Notifications
              </button>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Export Selected
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === paginatedProperties.length && paginatedProperties.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('address')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Property</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stage')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stage</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Builder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Inspector
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('closingDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Closing</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Days in Stage
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => handleSelectProperty(property.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.address}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{property.community}</span>
                        <span>•</span>
                        <span>{property.planNumber}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getStageProgress(property.stage)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-900 dark:text-white capitalize">
                        {property.stage.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                      {getStatusIcon(property.status)}
                      <span className="capitalize">{property.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.builder}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {property.builderContact}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {property.assignedInspector}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {property.closingDate ? (
                        <div>
                          <div>{new Date(property.closingDate).toLocaleDateString()}</div>
                          <div className={`text-xs ${
                            property.closingDays && property.closingDays < 14
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {property.closingDays ?
                              `${property.closingDays > 0 ? property.closingDays : 'Past'} days` :
                              'Past due'
                            }
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">TBD</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {property.daysInCurrentStage}
                      </span>
                      {property.daysInCurrentStage > 10 && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProperties.length)} of {filteredProperties.length} properties
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>

              <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesManagement;