import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Image, 
  File, 
  Calendar,
  Folder,
  Share,
  Eye
} from 'lucide-react';
import { Property } from '../types';

interface DocumentsReportsProps {
  properties: Property[];
}

const DocumentsReports: React.FC<DocumentsReportsProps> = ({ properties }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Flatten all documents from all properties
  const allDocuments = useMemo(() => {
    const docs = [];
    for (const property of properties) {
      for (const document of property.documents) {
        docs.push({
          ...document,
          propertyAddress: property.address,
          community: property.community,
          propertyId: property.id
        });
      }
    }
    return docs.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }, [properties]);

  const filteredDocuments = useMemo(() => {
    return allDocuments.filter(doc => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.community.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || doc.type === selectedFilter;
      const matchesProperty = selectedProperty === 'all' || doc.propertyId === selectedProperty;
      
      return matchesSearch && matchesFilter && matchesProperty;
    });
  }, [allDocuments, searchQuery, selectedFilter, selectedProperty]);

  const documentTypes = [
    { key: 'all', label: 'All Documents', count: allDocuments.length },
    { key: 'certificate', label: 'Certificates', count: allDocuments.filter(d => d.type === 'certificate').length },
    { key: 'report', label: 'Reports', count: allDocuments.filter(d => d.type === 'report').length },
    { key: 'photo', label: 'Photos', count: allDocuments.filter(d => d.type === 'photo').length },
    { key: 'plan', label: 'Plans', count: allDocuments.filter(d => d.type === 'plan').length },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'certificate': return FileText;
      case 'report': return FileText;
      case 'photo': return Image;
      case 'plan': return File;
      default: return File;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'certificate': return 'bg-green-100 text-green-700 border-green-200';
      case 'report': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'photo': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'plan': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Access all your inspection documents and certificates</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, properties, or communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          {documentTypes.map(type => (
            <button
              key={type.key}
              onClick={() => setSelectedFilter(type.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === type.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {type.label} ({type.count})
            </button>
          ))}
        </div>

        {/* Property Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Properties</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>{property.address}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? 'Try adjusting your search terms' : 'No documents match your current filters'}
          </p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredDocuments.map((doc) => {
              const FileIcon = getFileIcon(doc.type);
              return (
                <div key={doc.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getFileTypeColor(doc.type)}`}>
                        <FileIcon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{doc.propertyAddress}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{doc.community}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500 dark:text-gray-500">{formatFileSize(doc.size)}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-500">
                            {new Date(doc.uploadDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                        <Share className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => {
            const FileIcon = getFileIcon(doc.type);
            return (
              <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${getFileTypeColor(doc.type)}`}>
                    <FileIcon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.name}
                  </h3>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                    <p className="line-clamp-1">{doc.propertyAddress}</p>
                    <p className="line-clamp-1">{doc.community}</p>
                    <p>{formatFileSize(doc.size)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                    <span>
                      {new Date(doc.uploadDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className={`px-2 py-1 rounded-full capitalize ${getFileTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button className="p-2 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentsReports;