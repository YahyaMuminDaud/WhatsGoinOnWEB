import React from 'react';
import { useEvents } from '../contexts/EventContext';
import { Search, Filter } from 'lucide-react';
import { EventTag, TimeFilter } from '../types';

const SearchAndFilter: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    timeFilter,
    setTimeFilter,
    selectedTags,
    setSelectedTags
  } = useEvents();

  const timeFilters: { value: TimeFilter; label: string }[] = [
    { value: 'all', label: 'All Events' },
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-weekend', label: 'This Weekend' }
  ];

  const availableTags: EventTag[] = [
    'family', 'outdoors', 'music', 'food', 'art', 'sports', 'nightlife', 'culture'
  ];

  const handleTagToggle = (tag: EventTag) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events, locations, or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Time Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          When
        </h3>
        <div className="flex flex-wrap gap-2">
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTimeFilter(filter.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === filter.value
                  ? 'bg-seattle-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedTags.includes(tag)
                  ? 'bg-seattle-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(searchTerm || timeFilter !== 'all' || selectedTags.length > 0) && (
        <button
          onClick={() => {
            setSearchTerm('');
            setTimeFilter('all');
            setSelectedTags([]);
          }}
          className="text-sm text-seattle-600 hover:text-seattle-700 font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default SearchAndFilter;