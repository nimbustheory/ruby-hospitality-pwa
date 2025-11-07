'use client';

import { EventCard } from '@/components/ui/EventCard';
import { getFeaturedEvents } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';

interface EventsListProps {
  type?: 'featured' | 'all';
  limit?: number;
}

export function EventsList({ type = 'all', limit }: EventsListProps) {
  const router = useRouter();
  let events = type === 'featured' ? getFeaturedEvents() : getFeaturedEvents();
  
  if (limit) {
    events = events.slice(0, limit);
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => router.push(`/events/${event.id}`)}
        />
      ))}
    </div>
  );
}
