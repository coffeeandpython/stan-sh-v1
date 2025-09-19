import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Plus,
  Phone
} from 'lucide-react';
import { Inspection, Property } from '../types';

interface CalendarViewProps {
  inspections: Inspection[];
  properties: Property[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ inspections, properties }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [hoveredEvent, setHoveredEvent] = useState<{ inspection: Inspection; property: Property; x: number; y: number } | null>(null);
  const [touchedEvent, setTouchedEvent] = useState<{ inspection: Inspection; property: Property } | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInspectionTypeColor = (type: string) => {
    switch (type) {
      case 'pre-rock': return 'bg-purple-500';
      case 'poly-test': return 'bg-orange-500';
      case 'final': return 'bg-blue-500';
      case 'follow-up': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    
    return week;
  };

  const getInspectionsForDate = (date: Date) => {
    return inspections.filter(inspection => {
      const inspectionDate = new Date(inspection.scheduledDate);
      return (
        inspectionDate.getFullYear() === date.getFullYear() &&
        inspectionDate.getMonth() === date.getMonth() &&
        inspectionDate.getDate() === date.getDate()
      );
    });
  };

  const monthDays = useMemo(() => getDaysInMonth(currentDate), [currentDate]);
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatWeekRange = (days: Date[]) => {
    const start = days[0];
    const end = days[6];
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${start.getFullYear()}`;
    } else {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${start.getFullYear()}`;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const handleEventHover = (inspection: Inspection, property: Property, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredEvent({
      inspection,
      property,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleEventTouch = (inspection: Inspection, property: Property) => {
    setTouchedEvent({ inspection, property });
    // Auto-hide after 5 seconds
    setTimeout(() => setTouchedEvent(null), 5000);
  };

  const formatInspectionType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule and track inspections</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'month'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'week'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => view === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {view === 'month' ? formatDate(currentDate) : formatWeekRange(weekDays)}
          </h2>
          
          <button
            onClick={() => view === 'month' ? navigateMonth('next') : navigateWeek('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 dark:bg-gray-800 p-4 text-center">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        {view === 'month' ? (
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
            {monthDays.map((date, index) => {
              if (!date) {
                return <div key={index} className="bg-white dark:bg-gray-800 p-2 h-32"></div>;
              }
              
              const dayInspections = getInspectionsForDate(date);
              const today = isToday(date);
              
              return (
                <div
                  key={date.toISOString()}
                  className={`bg-white dark:bg-gray-800 p-2 h-32 ${
                    today ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    today 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1 overflow-hidden">
                    {dayInspections.slice(0, 2).map((inspection) => {
                      const property = properties.find(p => p.id === inspection.propertyId);
                      if (!property) return null;

                      return (
                        <div
                          key={inspection.id}
                          className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(inspection.status)}`}
                          onMouseEnter={(e) => handleEventHover(inspection, property, e)}
                          onMouseLeave={() => setHoveredEvent(null)}
                          onClick={() => handleEventTouch(inspection, property)}
                        >
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getInspectionTypeColor(inspection.type)}`}></div>
                            <span className="truncate font-medium">
                              {formatTime(inspection.scheduledDate)} {formatInspectionType(inspection.type)}
                            </span>
                          </div>
                          <div className="truncate text-xs opacity-75">
                            {property.address.split(' ').slice(0, 3).join(' ')}
                          </div>
                        </div>
                      );
                    })}
                    
                    {dayInspections.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                        +{dayInspections.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Week View
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
            {weekDays.map((date) => {
              const dayInspections = getInspectionsForDate(date);
              const today = isToday(date);
              
              return (
                <div
                  key={date.toISOString()}
                  className={`bg-white dark:bg-gray-800 p-3 h-96 ${
                    today ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className={`text-center mb-4 ${
                    today 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    <div className="text-sm font-medium">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${
                      today ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mt-1' : ''
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-2 overflow-y-auto max-h-80">
                    {dayInspections.map((inspection) => {
                      const property = properties.find(p => p.id === inspection.propertyId);
                      const inspectionTime = new Date(inspection.scheduledDate);
                      
                      return (
                        <div
                          key={inspection.id}
                          className={`p-2 rounded-lg border text-xs ${getStatusColor(inspection.status)}`}
                        >
                          <div className="font-medium mb-1">
                            {inspectionTime.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getInspectionTypeColor(inspection.type)}`}></div>
                              <span className="font-medium capitalize">
                                {inspection.type.replace('-', ' ')}
                              </span>
                            </div>
                            
                            <div className="flex items-start space-x-1">
                              <MapPin className="h-3 w-3 mt-0.5 opacity-60" />
                              <span className="line-clamp-2">
                                {property?.address}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3 opacity-60" />
                              <span>{inspection.inspector.name}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Legend</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pre-Rock</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Poly Test</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Final</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Follow-up</span>
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredEvent && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoveredEvent.x}px`,
            top: `${hoveredEvent.y}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl max-w-xs border border-gray-700">
            <div className="space-y-3">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getInspectionTypeColor(hoveredEvent.inspection.type)}`}></div>
                  <span className="font-semibold text-sm">
                    {formatInspectionType(hoveredEvent.inspection.type)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(hoveredEvent.inspection.status).replace('bg-', 'bg-opacity-20 bg-').replace('text-', 'text-').replace('border-', 'border-opacity-30 border-')}`}>
                    {hoveredEvent.inspection.status}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(hoveredEvent.inspection.scheduledDate)}</span>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-1 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                  <span className="text-gray-200">{hoveredEvent.property.address}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {hoveredEvent.property.community} • {hoveredEvent.property.planNumber}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-1 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-200">{hoveredEvent.inspection.inspector.name}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-200">{hoveredEvent.property.siteContact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Touch Tooltip */}
      {touchedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${getInspectionTypeColor(touchedEvent.inspection.type)}`}></div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {formatInspectionType(touchedEvent.inspection.type)}
                    </span>
                  </div>
                  <button
                    onClick={() => setTouchedEvent(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {formatTime(touchedEvent.inspection.scheduledDate)}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(touchedEvent.inspection.status)}`}>
                    {touchedEvent.inspection.status}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-2 mb-2">
                  <MapPin className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {touchedEvent.property.address}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {touchedEvent.property.community} • {touchedEvent.property.planNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Inspector: {touchedEvent.inspection.inspector.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Site Contact: {touchedEvent.property.siteContact.phone}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => {
                    const url = `https://maps.google.com/?q=${encodeURIComponent(touchedEvent.property.address)}`;
                    window.open(url, '_blank');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  Navigate
                </button>
                <button
                  onClick={() => {
                    window.open(`tel:${touchedEvent.property.siteContact.phone}`, '_self');
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;