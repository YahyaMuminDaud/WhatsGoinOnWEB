import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, EventContextType, EventTag, TimeFilter } from '../types';
import { isToday, isThisWeek, isWeekend, parseISO } from 'date-fns';

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Pike Place Market Food Tour',
    description: 'Join us for a delicious walking tour through Seattle\'s iconic Pike Place Market. Sample local specialties, meet vendors, and learn about the market\'s rich history.',
    shortDescription: 'Delicious walking tour through Pike Place Market with local specialties.',
    date: '2024-01-15',
    time: '10:00 AM',
    location: 'Pike Place Market, Seattle',
    tags: ['food', 'culture'],
    createdBy: '1',
    createdAt: '2024-01-10T10:00:00Z',
    approved: true,
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: '2',
    title: 'Discovery Park Nature Walk',
    description: 'Explore Seattle\'s largest park with guided nature walks. Perfect for families and nature enthusiasts. Bring comfortable walking shoes and water.',
    shortDescription: 'Guided nature walks through Seattle\'s largest park.',
    date: '2024-01-16',
    time: '2:00 PM',
    location: 'Discovery Park, Seattle',
    tags: ['outdoors', 'family'],
    createdBy: '1',
    createdAt: '2024-01-11T14:00:00Z',
    approved: true,
    imageUrl: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg'
  },
  {
    id: '3',
    title: 'Seattle Symphony Concert',
    description: 'Experience world-class classical music at Benaroya Hall. Tonight featuring works by Mozart and Beethoven performed by the renowned Seattle Symphony.',
    shortDescription: 'Classical music concert featuring Mozart and Beethoven.',
    date: '2024-01-17',
    time: '7:30 PM',
    location: 'Benaroya Hall, Seattle',
    tags: ['music', 'culture'],
    createdBy: '2',
    createdAt: '2024-01-12T19:30:00Z',
    approved: true,
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
  },
  {
    id: '4',
    title: 'Capitol Hill Art Walk',
    description: 'Monthly art walk through Capitol Hill galleries and studios. Meet local artists, view new exhibitions, and enjoy the vibrant neighborhood scene.',
    shortDescription: 'Monthly art walk through Capitol Hill galleries and studios.',
    date: '2024-01-18',
    time: '6:00 PM',
    location: 'Capitol Hill, Seattle',
    tags: ['art', 'culture'],
    createdBy: '1',
    createdAt: '2024-01-13T18:00:00Z',
    approved: true,
    imageUrl: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg'
  },
  {
    id: '5',
    title: 'Seahawks Watch Party',
    description: 'Join fellow 12s for the big game! Food, drinks, and great company. Wear your Seahawks gear and get ready to cheer loud!',
    shortDescription: 'Seahawks watch party with food, drinks, and fellow fans.',
    date: '2024-01-19',
    time: '1:00 PM',
    location: 'The Angry Beaver, Seattle',
    tags: ['sports', 'nightlife'],
    createdBy: '2',
    createdAt: '2024-01-14T13:00:00Z',
    approved: true,
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg'
  }
];

const mockPendingEvents: Event[] = [
  {
    id: 'pending-1',
    title: 'Underground Seattle Tour',
    description: 'Discover the hidden history beneath Seattle\'s streets. This fascinating tour takes you through the original city that was built over after the Great Regrade.',
    shortDescription: 'Fascinating tour through Seattle\'s underground history.',
    date: '2024-01-20',
    time: '11:00 AM',
    location: 'Pioneer Square, Seattle',
    tags: ['culture', 'family'],
    createdBy: '1',
    createdAt: '2024-01-15T11:00:00Z',
    approved: false
  }
];

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [pendingEvents, setPendingEvents] = useState<Event[]>(mockPendingEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [selectedTags, setSelectedTags] = useState<EventTag[]>([]);

  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Time filter
    const eventDate = parseISO(event.date);
    let matchesTime = true;
    
    switch (timeFilter) {
      case 'today':
        matchesTime = isToday(eventDate);
        break;
      case 'this-week':
        matchesTime = isThisWeek(eventDate);
        break;
      case 'this-weekend':
        matchesTime = isWeekend(eventDate) && isThisWeek(eventDate);
        break;
      default:
        matchesTime = true;
    }

    // Tag filter
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => event.tags.includes(tag));

    return matchesSearch && matchesTime && matchesTags;
  });

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'approved'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      createdAt: new Date().toISOString(),
      approved: false
    };
    
    setPendingEvents(prev => [...prev, newEvent]);
  };

  const approveEvent = (eventId: string) => {
    const event = pendingEvents.find(e => e.id === eventId);
    if (event) {
      setEvents(prev => [...prev, { ...event, approved: true }]);
      setPendingEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const rejectEvent = (eventId: string) => {
    setPendingEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const value: EventContextType = {
    events,
    pendingEvents,
    filteredEvents,
    searchTerm,
    timeFilter,
    selectedTags,
    setSearchTerm,
    setTimeFilter,
    setSelectedTags,
    addEvent,
    approveEvent,
    rejectEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};