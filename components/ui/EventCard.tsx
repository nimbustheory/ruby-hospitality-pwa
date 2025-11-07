'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { formatDate, formatTime, formatPrice } from '@/lib/utils';
import { Event } from '@/lib/types';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const eventDate = new Date(event.startDateTime);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <GlassCard className="flex gap-4 p-4" animate={false}>
        {/* Date Badge */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-ruby-red flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-white/80">{month}</span>
            <span className="text-2xl font-bold text-white">{day}</span>
          </div>
        </div>

        {/* Event Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-white/60">
            <MapPinIcon className="w-4 h-4" />
            <span className="truncate">{event.venueName}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm text-white/60">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatTime(event.startDateTime)}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 flex flex-col items-end justify-center">
          {event.ticketPrice !== undefined && event.ticketPrice > 0 ? (
            <span className="text-lg font-bold text-ruby-rose-gold">
              {formatPrice(event.ticketPrice)}
            </span>
          ) : event.ticketPriceRange ? (
            <span className="text-lg font-bold text-ruby-rose-gold">
              {formatPrice(event.ticketPriceRange.min)}+
            </span>
          ) : (
            <span className="text-lg font-bold text-white">FREE</span>
          )}
          {event.status === 'sold_out' && (
            <span className="text-xs text-ruby-red font-semibold mt-1">
              SOLD OUT
            </span>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
