import React from 'react';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { Calendar } from 'lucide-react';

const EventFeed: React.FC = () => {
  const { filteredEvents } = useEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          What's Going On in Seattle
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing events happening in the Emerald City. From outdoor adventures to cultural experiences, find your next great Seattle moment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Search and Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <SearchAndFilter />
          </div>
        </div>

        {/* Main Content - Event Cards */}
        <div className="lg:col-span-3">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria to find more events.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFeed;