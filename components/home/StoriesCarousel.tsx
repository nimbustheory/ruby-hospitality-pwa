'use client';

import { StoryCircle } from '@/components/ui/StoryCircle';
import { venues } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';

export function StoriesCarousel() {
  const router = useRouter();
  const featuredVenues = venues.filter(v => 
    (v.type === 'restaurant' || v.type === 'bar') && 
    v.id !== 'carusos' && 
    v.id !== 'farmhouse-kitchen'
  );

  return (
    <div className="relative px-4">
      <div className="grid grid-cols-6 gap-2">
        {featuredVenues.map((venue, index) => {
          // Get better display names
          let displayName = venue.name.split(' ')[0];
          if (venue.id === 'steam-plant') displayName = 'Steam Plant';
          if (venue.id === 'rosies') displayName = "Rosie's";
          if (venue.id === 'gilded-unicorn') displayName = 'Gilded Unicorn';
          
          return (
            <StoryCircle
              key={venue.id}
              name={displayName}
              imageUrl={venue.thumbnail}
              isActive={index === 0}
              onClick={() => router.push(`/discover/${venue.slug}`)}
            />
          );
        })}
      </div>
    </div>
  );
}