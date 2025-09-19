import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Phone,
  Home
} from 'lucide-react';
import { Inspection, Property, Inspector } from '../../types';

interface CalendarSchedulingProps {
  inspections: Inspection[];
  properties: Property[];
  inspectors: Inspector[];
}

interface SelectedInspection extends Inspection {
  property?: Property;
}

const CalendarScheduling: React.FC<CalendarSchedulingProps> = ({
  inspections,
  properties,
  inspectors
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedInspector, setSelectedInspector] = useState<string>('all');
  const [selectedInspection, setSelectedInspection] = useState<SelectedInspection | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
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
    const dateString = date.toDateString();
    return inspections.filter(inspection => {
      const inspectionDate = new Date(inspection.scheduledDate).toDateString();
      const matchesDate = inspectionDate === dateString;
      const matchesInspector = selectedInspector === 'all' || inspection.inspector.name === selectedInspector;
      const matchesSearch = searchQuery === '' ||
        properties.find(p => p.id === inspection.propertyId)?.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.inspector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDate && matchesInspector && matchesSearch;
    });
  };

  const getInspectorColor = (inspectorName: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-yellow-500'
    ];
    const index = inspectorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'scheduled': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pre-rock': return '🏗️';
      case 'poly-test': return '🔬';
      case 'blower-door': return '🚪';
      case 'final': return '✅';
      default: return '📋';
    }
  };

  const formatDateHeader = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `${start} - ${end}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  const todayStats = useMemo(() => {
    const today = new Date();
    const todayInspections = getInspectionsForDate(today);
    const completed = todayInspections.filter(i => i.status === 'passed' || i.status === 'failed').length;
    const inProgress = todayInspections.filter(i => i.status === 'in-progress').length;
    const scheduled = todayInspections.filter(i => i.status === 'scheduled').length;
    const overdue = todayInspections.filter(i =>
      i.status === 'scheduled' && new Date(i.scheduledDate) < today
    ).length;

    return { total: todayInspections.length, completed, inProgress, scheduled, overdue };
  }, [inspections, selectedInspector, searchQuery]);

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
      timeSlots.push(`${hour}:00`);
    }
    return timeSlots;
  };

  const renderMonthView = () => (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
          {day}
        </div>
      ))}
      {getDaysInMonth(currentDate).map((date, index) => {
        if (!date) {
          return <div key={index} className="h-32 bg-gray-25 dark:bg-gray-900"></div>;
        }

        const dayInspections = getInspectionsForDate(date);
        const isToday = date.toDateString() === new Date().toDateString();
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();

        return (
          <div
            key={date.toISOString()}
            className={`h-32 p-2 border border-gray-100 dark:border-gray-700 transition-colors cursor-pointer ${
              isToday
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            } ${!isCurrentMonth ? 'opacity-50' : ''}`}
            onClick={() => {
              setCurrentDate(new Date(date));
              setViewMode('day');
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                isToday
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {date.getDate()}
              </span>
              {dayInspections.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-blue-600 text-white rounded-full">
                  {dayInspections.length}
                </span>
              )}
            </div>

            <div className="space-y-1 overflow-hidden">
              {dayInspections.slice(0, 3).map(inspection => {
                const property = properties.find(p => p.id === inspection.propertyId);
                const time = new Date(inspection.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <div
                    key={inspection.id}
                    className={`px-2 py-1 rounded text-xs cursor-pointer border ${getStatusColor(inspection.status)} ${getInspectorColor(inspection.inspector.name)} bg-opacity-20`}
                    title={`${property?.address} - ${inspection.type} - ${inspection.inspector.name} at ${time}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInspection({ ...inspection, property });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{getTypeIcon(inspection.type)}</span>
                      <span className="font-medium">{time}</span>
                    </div>
                    <div className="truncate mt-1">
                      {property?.address?.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>
                );
              })}
              {dayInspections.length > 3 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 px-2 font-medium">
                  +{dayInspections.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const timeSlots = renderTimeSlots();

    return (
      <div>
        {/* Week header */}
        <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-600 mb-px">
          <div className="bg-white dark:bg-gray-800 p-3"></div>
          {weekDays.map(day => {
            const dayInspections = getInspectionsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div key={day.toISOString()} className={`bg-white dark:bg-gray-800 p-3 text-center ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                  {day.getDate()}
                </div>
                {dayInspections.length > 0 && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {dayInspections.length} inspections
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Week grid */}
        <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-600">
          {/* Time column */}
          <div className="bg-white dark:bg-gray-800">
            {timeSlots.map(time => (
              <div key={time} className="h-16 flex items-center justify-end pr-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                {time}
              </div>
            ))}
          </div>

          {/* Days columns */}
          {weekDays.map(day => {
            const dayInspections = getInspectionsForDate(day);
            return (
              <div key={day.toISOString()} className="bg-white dark:bg-gray-800">
                {timeSlots.map(time => {
                  const timeInspections = dayInspections.filter(inspection => {
                    const inspectionTime = new Date(inspection.scheduledDate);
                    const hourTime = `${inspectionTime.getHours()}:00`;
                    return hourTime === time;
                  });

                  return (
                    <div key={time} className="h-16 p-1 border-b border-gray-100 dark:border-gray-700 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      {timeInspections.map((inspection, idx) => {
                        const property = properties.find(p => p.id === inspection.propertyId);
                        return (
                          <div
                            key={inspection.id}
                            className={`absolute top-1 left-1 right-1 px-2 py-1 rounded text-xs border cursor-pointer z-10 ${getStatusColor(inspection.status)}`}
                            style={{ top: `${4 + idx * 20}px` }}
                            onClick={() => setSelectedInspection({ ...inspection, property })}
                            title={`${property?.address} - ${inspection.inspector.name}`}
                          >
                            <div className="flex items-center space-x-1">
                              <span>{getTypeIcon(inspection.type)}</span>
                              <span className="truncate">{property?.address}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayInspections = getInspectionsForDate(currentDate);
    const timeSlots = renderTimeSlots();

    return (
      <div className="max-w-4xl">
        <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-600">
          {/* Time column */}
          <div className="bg-white dark:bg-gray-800">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dayInspections.length} inspections scheduled
              </p>
            </div>

            {timeSlots.map(time => {
              const timeInspections = dayInspections.filter(inspection => {
                const inspectionTime = new Date(inspection.scheduledDate);
                const hourTime = `${inspectionTime.getHours()}:00`;
                return hourTime === time;
              });

              return (
                <div key={time} className="flex border-b border-gray-100 dark:border-gray-700">
                  <div className="w-20 flex items-center justify-end pr-4 py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                    {time}
                  </div>
                  <div className="flex-1 p-4 space-y-2">
                    {timeInspections.map(inspection => {
                      const property = properties.find(p => p.id === inspection.propertyId);
                      return (
                        <div
                          key={inspection.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors hover:shadow-md ${getStatusColor(inspection.status)}`}
                          onClick={() => setSelectedInspection({ ...inspection, property })}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getTypeIcon(inspection.type)}</span>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {inspection.type.replace('-', ' ')} Inspection
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {property?.address}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {new Date(inspection.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {inspection.inspector.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {timeInspections.length === 0 && (
                      <div
                        className="h-12 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                        onClick={() => setShowAddModal(true)}
                      >
                        <span className="text-sm text-gray-400 dark:text-gray-500">Click to schedule</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Calendar</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage inspection schedules with intelligent scheduling
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Quick Schedule</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{todayStats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Today's Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{todayStats.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600">{todayStats.inProgress}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{todayStats.scheduled}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Scheduled</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600">{todayStats.overdue}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as typeof viewMode)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === mode
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <select
              value={selectedInspector}
              onChange={(e) => setSelectedInspector(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Inspectors</option>
              {inspectors.filter(i => i.isActive).map(inspector => (
                <option key={inspector.id} value={inspector.name}>{inspector.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inspections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDateHeader()}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateDate('next')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Views */}
        <div className="p-6">
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>
      </div>

      {/* Inspection Detail Modal */}
      {selectedInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(selectedInspection.type)}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedInspection.type.replace('-', ' ')} Inspection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedInspection.property?.address}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInspection(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Schedule</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(selectedInspection.scheduledDate).toLocaleDateString()} at{' '}
                          {new Date(selectedInspection.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Inspector</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedInspection.inspector.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedInspection.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInspection.status)}`}>
                          {selectedInspection.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Property Details</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Home className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedInspection.property?.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedInspection.property?.community}
                        </span>
                      </div>
                      {selectedInspection.property?.siteContact && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {selectedInspection.property.siteContact.name} - {selectedInspection.property.siteContact.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedInspection.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notes</h4>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedInspection.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedInspection(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Schedule
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Quick scheduling functionality coming soon!
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  This will allow you to quickly schedule inspections with drag & drop
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarScheduling;