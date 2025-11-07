'use client';

import { useState } from 'react';
import { EventCard } from '@/components/ui/EventCard';
import { getUpcomingEvents } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';
import { EventType } from '@/lib/types';

const filterOptions: { label: string; value: EventType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Concerts', value: 'concert' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Tastings', value: 'tasting' },
  { label: 'Theater', value: 'theater' },
];

export default function EventsPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>('all');
  const allEvents = getUpcomingEvents();

  const filteredEvents = selectedFilter === 'all' 
    ? allEvents 
    : allEvents.filter(event => event.eventType === selectedFilter);

  return (
    <main className="min-h-screen bg-charcoal">
      <div className="px-4 pt-4">
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 -mx-4 px-4">
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

        {/* Events List */}
        <div className="space-y-3 pb-8">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => router.push(`/events/${event.id}`)}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No upcoming events</p>
          </div>
        )}
      </div>
    </main>
  );
}