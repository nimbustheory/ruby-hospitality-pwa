'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Offer } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface OfferCardProps {
  offer: Offer;
  onRedeem: () => void;
}

// Map offers to relevant images
const offerImages: { [key: string]: string } = {
  'offer-1': '/images/venues/gilded-unicorn-food.webp', // Birthday dessert
  'offer-2': '/images/venues/griffin-tavern-interior.webp', // Happy hour beers
  'offer-3': '/images/venues/bing-exterior.webp', // Concert tickets
  'offer-4': '/images/venues/steam-plant-dining.webp', // Hotel guest dining
  'offer-5': '/images/venues/osprey-food.webp', // Brunch mimosa
};

export function OfferCard({ offer, onRedeem }: OfferCardProps) {
  const isFlash = offer.offerType === 'flash';
  const validUntil = new Date(offer.validUntil);
  const now = new Date();
  const hoursLeft = Math.floor((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onRedeem}
      className="cursor-pointer"
    >
      <div className="relative h-48 rounded-3xl overflow-hidden group">
        {/* Background Image */}
        <Image
          src={offerImages[offer.id] || '/images/venues/steam-plant-bar.webp'}
          alt={offer.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        
        {/* Flash Badge */}
        {isFlash && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-ruby-red text-white text-[10px] font-bold uppercase shadow-lg">
              <SparklesIcon className="w-3 h-3" />
              Flash
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Offer Type Badge */}
          <div className="inline-flex self-start items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-ruby-rose-gold text-[10px] font-semibold uppercase mb-2">
            {offer.offerType.replace('_', ' ')}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-1 leading-tight">
            {offer.title.replace(/🎉|⚡|🎵/g, '').trim()}
          </h3>

          {/* Description */}
          <p className="text-xs text-white/80 leading-snug mb-3 line-clamp-2">
            {offer.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Expiry */}
            <div className="flex items-center gap-1.5 text-[11px] text-white/60">
              <ClockIcon className="w-3.5 h-3.5" />
              {isFlash && hoursLeft < 24 ? (
                <span className="font-semibold text-ruby-rose-gold">
                  {hoursLeft}h left
                </span>
              ) : (
                <span>{formatDate(offer.validUntil)}</span>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1 text-xs font-semibold text-white group-hover:text-ruby-rose-gold transition-colors">
              View
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}