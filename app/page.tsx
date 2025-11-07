import { StoriesCarousel } from '@/components/home/StoriesCarousel';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickActions } from '@/components/home/QuickActions';
import { EventsList } from '@/components/home/EventsList';
import { OffersList } from '@/components/home/OffersList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-charcoal">
      {/* Stories Carousel */}
      <section className="py-4">
        <StoriesCarousel />
      </section>

      {/* Hero Event */}
      <section className="px-4 pb-6">
        <HeroSection />
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-8">
        <QuickActions />
      </section>

      {/* Happening Now */}
      <section className="px-4 pb-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Happening Now
        </h2>
        <EventsList type="featured" limit={3} />
      </section>

      {/* Special Offers */}
      <section className="px-4 pb-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Special Offers
        </h2>
        <OffersList limit={3} />
      </section>
    </main>
  );
}