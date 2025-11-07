'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getVenueById, getEventsByVenue } from '@/lib/demo-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/ui/EventCard';
import { getPriceRangeString } from '@/lib/utils';
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const venue = getVenueById(params.slug as string);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!venue) {
    return (
      <main className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Venue Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  const upcomingEvents = getEventsByVenue(venue.id);

  const handleReservation = () => {
    alert('Reservation system would open here! (Demo mode)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: venue.description,
        url: window.location.href,
      });
    } else {
      alert('Share: ' + window.location.href);
    }
  };

  return (
    <main className="min-h-screen bg-charcoal pb-24">
      {/* Hero Image */}
      <div className="relative h-96 w-full">
        <Image
          src={venue.heroImage}
          alt={venue.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-safe">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full glass-dark flex items-center justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center"
            >
              <HeartIcon className={`w-5 h-5 ${isFavorite ? 'fill-ruby-red text-ruby-red' : 'text-white'}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center"
            >
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Venue Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{venue.name}</h1>
              <p className="text-white/80">{venue.shortDescription}</p>
            </div>
            {venue.priceRange && (
              <div className="ml-4 px-3 py-1 rounded-full glass-dark">
                <span className="text-white font-medium">{getPriceRangeString(venue.priceRange)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        {/* Quick Info */}
        <GlassCard className="mb-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-5 h-5 text-ruby-rose-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/90">{venue.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneIcon className="w-5 h-5 text-ruby-rose-gold flex-shrink-0 mt-0.5" />
              <div>
                <a href={`tel:${venue.phone}`} className="text-white/90 hover:text-white">
                  {venue.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-ruby-rose-gold flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                {Object.entries(venue.hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span className="text-white/60">{day}</span>
                    <span className="text-white/90">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Description */}
        <GlassCard className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3">About</h2>
          <p className="text-white/80 leading-relaxed">{venue.description}</p>
        </GlassCard>

        {/* Features */}
        {venue.features.length > 0 && (
          <GlassCard className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Features</h2>
            <div className="flex flex-wrap gap-2">
              {venue.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full glass text-sm text-white/80"
                >
                  {feature}
                </span>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Gallery */}
        {venue.gallery.length > 0 && (
          <GlassCard className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {venue.gallery.map((image, index) => (
                <div key={index} className="relative h-32 rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={`${venue.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => router.push(`/events/${event.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="sticky bottom-20 left-0 right-0 p-4 -mx-4 glass-dark border-t border-white/10">
          <Button
            onClick={handleReservation}
            className="w-full"
          >
            {venue.type === 'hotel' ? 'Book Now' : venue.type === 'venue' ? 'Request Info' : 'Make Reservation'}
          </Button>
        </div>
      </div>
    </main>
  );
}