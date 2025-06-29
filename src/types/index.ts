export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  time: string;
  location: string;
  tags: EventTag[];
  createdBy: string;
  createdAt: string;
  approved: boolean;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  favoriteEvents: string[];
  createdEvents: string[];
}

export type EventTag = 
  | 'family' 
  | 'outdoors' 
  | 'music' 
  | 'food' 
  | 'art' 
  | 'sports' 
  | 'nightlife' 
  | 'culture';

export type TimeFilter = 'all' | 'today' | 'this-week' | 'this-weekend';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleFavorite: (eventId: string) => void;
}

export interface EventContextType {
  events: Event[];
  pendingEvents: Event[];
  filteredEvents: Event[];
  searchTerm: string;
  timeFilter: TimeFilter;
  selectedTags: EventTag[];
  setSearchTerm: (term: string) => void;
  setTimeFilter: (filter: TimeFilter) => void;
  setSelectedTags: (tags: EventTag[]) => void;
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'approved'>) => void;
  approveEvent: (eventId: string) => void;
  rejectEvent: (eventId: string) => void;
}