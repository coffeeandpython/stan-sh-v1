import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Home,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Property } from '../types';

interface PropertiesListProps {
  properties: Property[];
  onViewProperty: (property: Property) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PropertiesList: React.FC<PropertiesListProps> = ({
  properties,
  onViewProperty,
  searchQuery,
  onSearchChange
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');

  const communities = useMemo(() => {
    const uniqueCommunities = [...new Set(properties.map(p => p.community))];
    return uniqueCommunities.sort();
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = 
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.planNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || property.status === selectedFilter;
      const matchesCommunity = selectedCommunity === 'all' || property.community === selectedCommunity;
      
      return matchesSearch && matchesFilter && matchesCommunity;
    });
  }, [properties, searchQuery, selectedFilter, selectedCommunity]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-700 bg-green-100 border-green-200';
      case 'failed': return 'text-red-700 bg-red-100 border-red-200';
      case 'in-progress': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'complete': return 'text-green-700 bg-green-50';
      case 'final': return 'text-blue-700 bg-blue-50';
      case 'poly-test': return 'text-orange-700 bg-orange-50';
      case 'pre-rock': return 'text-purple-700 bg-purple-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const filters = [
    { key: 'all', label: 'All Properties', count: properties.length },
    { key: 'pending', label: 'Pending', count: properties.filter(p => p.status === 'pending').length },
    { key: 'in-progress', label: 'In Progress', count: properties.filter(p => p.status === 'in-progress').length },
    { key: 'failed', label: 'Failed', count: properties.filter(p => p.status === 'failed').length },
    { key: 'passed', label: 'Passed', count: properties.filter(p => p.status === 'passed').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Properties</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track your construction properties
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by address, community, or plan number..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Community Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Communities</option>
            {communities.map(community => (
              <option key={community} value={community}>{community}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No properties found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? 'Try adjusting your search terms' : 'No properties match your current filters'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProperties.map(property => (
            <div
              key={property.id}
              onClick={() => onViewProperty(property)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {property.address}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{property.community}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Plan {property.planNumber}</span>
                      </div>

                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStageColor(property.stage)}`}>
                          <span className="capitalize">{property.stage.replace('-', ' ')}</span>
                        </div>
                        
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                          {getStatusIcon(property.status)}
                          <span className="capitalize">{property.status.replace('-', ' ')}</span>
                        </div>
                      </div>

                      {property.closingDate && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Closing: {new Date(property.closingDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;