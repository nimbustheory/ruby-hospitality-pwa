'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getEventById } from '@/lib/demo-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { formatDate, formatTime, formatPrice } from '@/lib/utils';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  ArrowLeftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const event = getEventById(params.id as string);

  if (!event) {
    return (
      <main className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  const handleTicketPurchase = () => {
    alert('Ticket purchase would happen here! (Demo mode)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      alert('Share: ' + window.location.href);
    }
  };

  const ticketsSoldPercentage = event.capacity && event.ticketsSold
    ? (event.ticketsSold / event.capacity) * 100
    : 0;

  return (
    <main className="min-h-screen bg-charcoal pb-24">
      {/* Hero Image */}
      <div className="relative h-96 w-full">
        <Image
          src={event.heroImage}
          alt={event.title}
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
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full glass-dark flex items-center justify-center"
          >
            <ShareIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 rounded-full glass-dark text-xs font-medium text-white/90 mb-3 uppercase">
            {event.eventType}
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
          <p className="text-white/80">{event.venueName}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        {/* Quick Info */}
        <GlassCard className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ruby-red/20 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-ruby-rose-gold" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Date</p>
                <p className="text-white font-medium">{formatDate(event.startDateTime)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ruby-red/20 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-ruby-rose-gold" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Time</p>
                <p className="text-white font-medium">
                  {event.doorsOpen && `Doors: ${event.doorsOpen} • `}
                  Show: {event.showTime || formatTime(event.startDateTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ruby-red/20 flex items-center justify-center">
                <TicketIcon className="w-5 h-5 text-ruby-rose-gold" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Price</p>
                <p className="text-white font-medium">
                  {event.ticketPrice === 0 
                    ? 'Free'
                    : event.ticketPriceRange
                    ? `${formatPrice(event.ticketPriceRange.min)} - ${formatPrice(event.ticketPriceRange.max)}`
                    : formatPrice(event.ticketPrice || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Availability */}
          {event.capacity && event.ticketsSold !== undefined && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Tickets Sold</span>
                <span className="text-sm font-medium text-white">
                  {event.ticketsSold} / {event.capacity}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-ruby-red to-ruby-rose-gold transition-all"
                  style={{ width: `${ticketsSoldPercentage}%` }}
                />
              </div>
              {ticketsSoldPercentage > 80 && (
                <p className="text-xs text-ruby-rose-gold mt-2">Selling fast!</p>
              )}
            </div>
          )}
        </GlassCard>

        {/* Description */}
        <GlassCard className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3">About This Event</h2>
          <p className="text-white/80 leading-relaxed">{event.description}</p>
        </GlassCard>

        {/* Artist Info */}
        {event.artistName && (
          <GlassCard className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Featuring</h2>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{event.artistName}</h3>
                {event.artistBio && (
                  <p className="text-white/70 text-sm leading-relaxed">{event.artistBio}</p>
                )}
              </div>
            </div>
          </GlassCard>
        )}

        {/* CTA Button */}
        <div className="sticky bottom-20 left-0 right-0 p-4 -mx-4 glass-dark border-t border-white/10">
          <Button
            onClick={handleTicketPurchase}
            className="w-full"
            disabled={event.capacity && event.ticketsSold && event.ticketsSold >= event.capacity}
          >
            {event.capacity && event.ticketsSold && event.ticketsSold >= event.capacity
              ? 'Sold Out'
              : event.ticketPrice === 0
              ? 'RSVP'
              : 'Get Tickets'}
          </Button>
        </div>
      </div>
    </main>
  );
}