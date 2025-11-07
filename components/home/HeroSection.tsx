'use client';

import { HeroCard } from '@/components/ui/HeroCard';
import { getFeaturedEvents } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();
  const featuredEvents = getFeaturedEvents();
  const heroEvent = featuredEvents[0];

  if (!heroEvent) return null;

  return (
    <HeroCard
      title={heroEvent.title}
      subtitle={`🎵 ${heroEvent.venueName}`}
      description={heroEvent.description}
      imageUrl={heroEvent.heroImage}
      ctaText={heroEvent.ticketPrice === 0 ? 'View Details' : 'Get Tickets'}
      onCtaClick={() => router.push(`/events/${heroEvent.id}`)}
    />
  );
}
