import React from 'react';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Check, X, Calendar, Clock, MapPin, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const AdminPanel: React.FC = () => {
  const { pendingEvents, approveEvent, rejectEvent, events } = useEvents();
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const getTagClassName = (tag: string) => {
    const baseClass = 'tag';
    return `${baseClass} tag-${tag}`;
  };

  const handleApprove = (eventId: string) => {
    approveEvent(eventId);
  };

  const handleReject = (eventId: string) => {
    rejectEvent(eventId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-seattle-600" />
          Admin Panel
        </h1>
        <p className="text-gray-600">
          Review and manage pending events. Welcome, {user?.name}!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingEvents.length}</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              <p className="text-sm text-gray-600">Approved Events</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-seattle-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-seattle-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Admin</p>
              <p className="text-sm text-gray-600">Access Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-yellow-600" />
          Pending Events ({pendingEvents.length})
        </h2>

        {pendingEvents.length > 0 ? (
          <div className="space-y-6">
            {pendingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Event Image */}
                  {event.imageUrl && (
                    <div className="lg:w-48 lg:flex-shrink-0">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-32 lg:h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag) => (
                          <span key={tag} className={getTagClassName(tag)}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500">
                        Created: {format(parseISO(event.createdAt), 'MMM dd, yyyy at h:mm a')}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex lg:flex-col gap-3 lg:w-32">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(event.id)}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline">Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <Check className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              All caught up!
            </h3>
            <p className="text-gray-600">
              No pending events to review at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;