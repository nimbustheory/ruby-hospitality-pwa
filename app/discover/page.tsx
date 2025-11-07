'use client';

import { useState } from 'react';
import { VenueCard } from '@/components/ui/VenueCard';
import { venues } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';
import { VenueType } from '@/lib/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const filterOptions: { label: string; value: VenueType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Restaurants', value: 'restaurant' },
  { label: 'Bars', value: 'bar' },
  { label: 'Hotels', value: 'hotel' },
  { label: 'Event Spaces', value: 'event_space' },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<VenueType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter(venue => {
    const matchesFilter = selectedFilter === 'all' || venue.type === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-charcoal">
      <div className="px-4 pt-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full glass text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === option.value
                  ? 'bg-ruby-red text-white'
                  : 'glass text-white/60 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-2 gap-4 pb-8">
          {filteredVenues.map(venue => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onClick={() => router.push(`/discover/${venue.slug}`)}
            />
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No venues found</p>
          </div>
        )}
      </div>
    </main>
  );
}