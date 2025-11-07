'use client';

import { OfferCard } from '@/components/ui/OfferCard';
import { offers } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';

export default function OffersPage() {
  const router = useRouter();

  const handleRedeem = (offerId: string) => {
    router.push(`/offers/${offerId}`);
  };

  return (
    <main className="min-h-screen bg-charcoal">
      <div className="px-4">
        {/* Offers List */}
        <div className="space-y-4 py-6 pb-8">
          {offers.map(offer => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onRedeem={() => handleRedeem(offer.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}