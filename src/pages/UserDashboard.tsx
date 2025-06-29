import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import { Heart, Calendar, User } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();

  const favoriteEvents = events.filter(event => 
    user?.favoriteEvents.includes(event.id)
  );

  const createdEvents = events.filter(event => 
    user?.createdEvents.includes(event.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-seattle-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">Manage your events and favorites</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{favoriteEvents.length}</p>
              <p className="text-sm text-gray-600">Favorite Events</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-seattle-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-seattle-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{createdEvents.length}</p>
              <p className="text-sm text-gray-600">Events Created</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {user?.isAdmin ? 'Admin' : 'User'}
              </p>
              <p className="text-sm text-gray-600">Account Type</p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Events */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Your Favorite Events
        </h2>
        
        {favoriteEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No favorite events yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start exploring events and save your favorites!
            </p>
          </div>
        )}
      </div>

      {/* Created Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-seattle-600" />
          Events You Created
        </h2>
        
        {createdEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No events created yet
            </h3>
            <p className="text-gray-600 mb-4">
              Share your events with the Seattle community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;