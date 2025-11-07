'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Venue } from '@/lib/types';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getPriceRangeString } from '@/lib/utils';

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <motion.div
      className="relative cursor-pointer group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative h-64 rounded-3xl overflow-hidden">
        {/* Image */}
        <Image
          src={venue.thumbnail}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Price Range & Type */}
          <div className="flex items-center gap-2 mb-2">
            {venue.priceRange && (
              <span className="text-sm font-bold text-ruby-rose-gold">
                {getPriceRangeString(venue.priceRange)}
              </span>
            )}
            <span className="text-xs text-white/60 capitalize">
              {venue.type}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-white mb-2 leading-tight">
            {venue.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-white/60">
            <MapPinIcon className="w-3 h-3" />
            <span className="truncate">
              {venue.address.split(',')[0]}
            </span>
          </div>

          {/* Features */}
          {venue.features.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {venue.features.slice(0, 2).map((feature) => (
                <span
                  key={feature}
                  className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/80"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {venue.isFeatured && (
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 rounded-full bg-ruby-red text-white text-xs font-semibold">
              Featured
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
