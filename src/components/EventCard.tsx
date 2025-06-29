import React from 'react';
import { Event } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { user, toggleFavorite, isAuthenticated } = useAuth();
  const isFavorited = user?.favoriteEvents.includes(event.id) || false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(event.id);
    }
  };

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

  return (
    <div className="card p-6 relative">
      {isAuthenticated && (
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorited 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      )}

      {event.imageUrl && (
        <div className="mb-4 -mx-6 -mt-6">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 pr-8">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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

        <p className="text-gray-700 leading-relaxed">
          {event.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span key={tag} className={getTagClassName(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;