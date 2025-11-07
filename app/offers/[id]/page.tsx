'use client';

import { useRouter } from 'next/navigation';
import { offers } from '@/lib/demo-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  XMarkIcon, 
  MapPinIcon, 
  ClockIcon, 
  TagIcon,
  QrCodeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const offerImages: { [key: string]: string } = {
  'offer-1': '/images/venues/gilded-unicorn-food.webp',
  'offer-2': '/images/venues/griffin-tavern-interior.webp',
  'offer-3': '/images/venues/bing-exterior.webp',
  'offer-4': '/images/venues/steam-plant-dining.webp',
  'offer-5': '/images/venues/osprey-food.webp',
};

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [showQRCode, setShowQRCode] = useState(false);
  const offer = offers.find(o => o.id === params.id);

  if (!offer) {
    return (
      <main className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Offer Not Found</h1>
          <Button onClick={() => router.push('/offers')}>Back to Offers</Button>
        </div>
      </main>
    );
  }

  const isFlash = offer.offerType === 'flash';
  const validUntil = new Date(offer.validUntil);
  const now = new Date();
  const hoursLeft = Math.floor((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60));

  return (
    <main className="min-h-screen bg-charcoal">
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <Image
          src={offerImages[offer.id] || '/images/venues/steam-plant-bar.webp'}
          alt={offer.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        {/* Flash Badge */}
        {isFlash && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-ruby-red text-white text-xs font-bold uppercase shadow-lg">
              ⚡ Flash Sale
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 pb-24">
        <GlassCard className="p-6 mb-4">
          {/* Type Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ruby-red/20 text-ruby-rose-gold text-xs font-semibold uppercase mb-3">
            {offer.offerType.replace('_', ' ')}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3">
            {offer.title}
          </h1>

          {/* Description */}
          <p className="text-white/80 leading-relaxed mb-4">
            {offer.description}
          </p>

          {/* Details Grid */}
          <div className="space-y-3 mb-6">
            {/* Venues */}
            {offer.venueNames && offer.venueNames.length > 0 && (
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-ruby-rose-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Valid At</p>
                  <p className="text-white">{offer.venueNames.join(', ')}</p>
                </div>
              </div>
            )}

            {/* Expiry */}
            <div className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-ruby-rose-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/60 text-sm mb-1">Valid Until</p>
                <p className="text-white">
                  {isFlash && hoursLeft < 24 ? (
                    <span className="font-semibold text-ruby-rose-gold">
                      {hoursLeft} hours left!
                    </span>
                  ) : (
                    formatDate(offer.validUntil)
                  )}
                </p>
              </div>
            </div>

            {/* Redemption Code */}
            {offer.redemptionCode && (
              <div className="flex items-start gap-3">
                <TagIcon className="w-5 h-5 text-ruby-rose-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Code</p>
                  <p className="text-white font-mono font-bold text-lg">{offer.redemptionCode}</p>
                </div>
              </div>
            )}
          </div>

          {/* Redeem Button */}
          <Button 
            onClick={() => setShowQRCode(true)}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <QrCodeIcon className="w-5 h-5" />
            Show QR Code to Redeem
          </Button>
        </GlassCard>

        {/* Terms & Conditions */}
        {offer.termsAndConditions && (
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-3">Terms & Conditions</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              {offer.termsAndConditions}
            </p>
          </GlassCard>
        )}
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowQRCode(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <GlassCard className="p-6 text-center">
                {/* Close Button */}
                <button
                  onClick={() => setShowQRCode(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-white/60" />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-2">Show to Staff</h2>
                <p className="text-white/60 text-sm mb-6">
                  Present this QR code at {offer.venueNames?.[0] || 'the venue'}
                </p>

                {/* QR Code */}
                <div className="bg-white p-6 rounded-2xl mb-6">
                  <div className="aspect-square w-full flex items-center justify-center">
                    {/* SVG QR Code - In production, use a real QR code library */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Simple QR-like pattern for demo */}
                      <rect width="100" height="100" fill="white"/>
                      <rect x="5" y="5" width="20" height="20" fill="black"/>
                      <rect x="75" y="5" width="20" height="20" fill="black"/>
                      <rect x="5" y="75" width="20" height="20" fill="black"/>
                      <rect x="10" y="10" width="10" height="10" fill="white"/>
                      <rect x="80" y="10" width="10" height="10" fill="white"/>
                      <rect x="10" y="80" width="10" height="10" fill="white"/>
                      {/* Data modules */}
                      {Array.from({ length: 15 }).map((_, i) => (
                        Array.from({ length: 15 }).map((_, j) => {
                          const shouldFill = (i + j) % 3 === 0 && i > 3 && j > 3 && i < 12 && j < 12;
                          return shouldFill ? (
                            <rect
                              key={`${i}-${j}`}
                              x={30 + j * 4}
                              y={30 + i * 4}
                              width="3"
                              height="3"
                              fill="black"
                            />
                          ) : null;
                        })
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Redemption Code */}
                {offer.redemptionCode && (
                  <div className="mb-6">
                    <p className="text-white/60 text-xs mb-2">Or use code:</p>
                    <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-white font-mono font-bold text-xl tracking-wider">
                        {offer.redemptionCode}
                      </p>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="flex items-start gap-3 text-left bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-1">
                      How to Redeem
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Show this screen to your server or bartender. They'll validate and apply your discount.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}