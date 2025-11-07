'use client';

import { OfferCard } from '@/components/ui/OfferCard';
import { getFeaturedOffers } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';

interface OffersListProps {
  limit?: number;
}

export function OffersList({ limit }: OffersListProps) {
  const router = useRouter();
  let offers = getFeaturedOffers();
  
  if (limit) {
    offers = offers.slice(0, limit);
  }

  const handleRedeem = (offerId: string) => {
    router.push(`/offers/${offerId}`);
  };

  return (
    <div className="space-y-3">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onRedeem={() => handleRedeem(offer.id)}
        />
      ))}
    </div>
  );
}
