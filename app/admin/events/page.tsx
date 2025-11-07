'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Event, EventType } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { venues } from '@/lib/demo-data';

export default function AdminEventsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Load actual events from demo-data
  const [events, setEvents] = useState<Event[]>(() => {
    // Import events from demo-data
    const { events: demoEvents } = require('@/lib/demo-data');
    return demoEvents;
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const handleSaveEvent = (event: Event) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, { ...event, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  return (
    <main className="min-h-screen bg-charcoal px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
            <p className="text-white/60">Add and manage events across all venues</p>
          </div>
          <Button onClick={handleAddEvent} className="flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Add Event
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <GlassCard key={event.id} className="p-4">
              <div className="flex gap-4">
                {/* Event Poster Thumbnail */}
                <div className="w-24 h-24 rounded-lg bg-white/5 flex-shrink-0 overflow-hidden">
                  {event.posterUrl && (
                    <img 
                      src={event.posterUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                  
                  <div className="space-y-1 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      {event.venueName}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {formatDate(event.startDateTime)}
                    </div>
                    {event.ticketPriceRange && (
                      <div className="flex items-center gap-2">
                        <TicketIcon className="w-4 h-4" />
                        ${event.ticketPriceRange.min} - ${event.ticketPriceRange.max}
                      </div>
                    )}
                  </div>

                  {/* Status & Stats */}
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                      event.status === 'sold_out' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {event.status.replace('_', ' ').toUpperCase()}
                    </span>
                    
                    {event.capacity && event.ticketsSold !== undefined && (
                      <span className="text-xs text-white/60">
                        {event.ticketsSold} / {event.capacity} tickets sold
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Edit event"
                  >
                    <PencilIcon className="w-5 h-5 text-white/60" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    aria-label="Delete event"
                  >
                    <TrashIcon className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <GlassCard className="p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No events yet</h3>
            <p className="text-white/60 mb-6">Get started by adding your first event</p>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </GlassCard>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
        <EventModal
          event={editingEvent}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
        />
      )}
    </main>
  );
}

function EventModal({ 
  event, 
  onClose, 
  onSave 
}: { 
  event: Event | null; 
  onClose: () => void; 
  onSave: (event: Event) => void;
}) {
  const [formData, setFormData] = useState<Partial<Event>>(event || {
    title: '',
    venueId: '',
    venueName: '',
    description: '',
    eventType: 'concert',
    posterUrl: '',
    heroImage: '',
    startDateTime: '',
    doorsOpen: '',
    showTime: '',
    ticketPrice: undefined,
    ticketPriceRange: undefined,
    artistName: '',
    artistBio: '',
    status: 'upcoming',
    isFeatured: false,
    capacity: undefined,
    ticketsSold: 0,
    slug: '',
  });

  const [priceType, setPriceType] = useState<'single' | 'range' | 'free'>(
    event?.ticketPrice === 0 ? 'free' : 
    event?.ticketPriceRange ? 'range' : 
    event?.ticketPrice ? 'single' : 'free'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug from title
    const slug = formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
    
    // Get venue name from venue ID
    const selectedVenue = venues.find(v => v.id === formData.venueId);
    
    // Build event object based on price type
    const eventData: Event = {
      id: event?.id || Date.now().toString(),
      title: formData.title || '',
      venueId: formData.venueId || '',
      venueName: selectedVenue?.name || formData.venueName || '',
      slug,
      description: formData.description || '',
      eventType: formData.eventType as EventType || 'concert',
      posterUrl: formData.posterUrl || '',
      heroImage: formData.heroImage || formData.posterUrl || '',
      startDateTime: formData.startDateTime || new Date().toISOString(),
      doorsOpen: formData.doorsOpen,
      showTime: formData.showTime,
      artistName: formData.artistName,
      artistBio: formData.artistBio,
      status: formData.status as any || 'upcoming',
      isFeatured: formData.isFeatured || false,
      capacity: formData.capacity,
      ticketsSold: formData.ticketsSold || 0,
    };

    // Add price based on type
    if (priceType === 'free') {
      eventData.ticketPrice = 0;
    } else if (priceType === 'single') {
      eventData.ticketPrice = formData.ticketPrice;
    } else if (priceType === 'range') {
      eventData.ticketPriceRange = formData.ticketPriceRange;
    }

    onSave(eventData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <GlassCard className="w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <XMarkIcon className="w-6 h-6 text-white/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Event Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
              placeholder="Marty Stuart and His Fabulous Superlatives"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Venue *</label>
            <select
              required
              value={formData.venueId}
              onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
            >
              <option value="">Select a venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id} className="bg-charcoal">
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Event Type *</label>
            <select
              required
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
            >
              <option value="concert" className="bg-charcoal">Concert</option>
              <option value="comedy" className="bg-charcoal">Comedy</option>
              <option value="tasting" className="bg-charcoal">Tasting</option>
              <option value="special_dinner" className="bg-charcoal">Special Dinner</option>
              <option value="theater" className="bg-charcoal">Theater</option>
              <option value="other" className="bg-charcoal">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
              placeholder="Grammy-winning country legend brings his show to Spokane..."
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Start Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.startDateTime?.slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Doors Open</label>
              <input
                type="time"
                value={formData.doorsOpen}
                onChange={(e) => setFormData({ ...formData, doorsOpen: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Ticket Pricing *</label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="free"
                  checked={priceType === 'free'}
                  onChange={(e) => setPriceType(e.target.value as any)}
                  className="text-ruby-red"
                />
                <span className="text-white">Free</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="single"
                  checked={priceType === 'single'}
                  onChange={(e) => setPriceType(e.target.value as any)}
                  className="text-ruby-red"
                />
                <span className="text-white">Single Price</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="range"
                  checked={priceType === 'range'}
                  onChange={(e) => setPriceType(e.target.value as any)}
                  className="text-ruby-red"
                />
                <span className="text-white">Price Range</span>
              </label>
            </div>

            {priceType === 'single' && (
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.ticketPrice || ''}
                onChange={(e) => setFormData({ ...formData, ticketPrice: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                placeholder="45.00"
              />
            )}

            {priceType === 'range' && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.ticketPriceRange?.min || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    ticketPriceRange: { 
                      min: parseFloat(e.target.value), 
                      max: formData.ticketPriceRange?.max || 0 
                    } 
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.ticketPriceRange?.max || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    ticketPriceRange: { 
                      min: formData.ticketPriceRange?.min || 0, 
                      max: parseFloat(e.target.value) 
                    } 
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                  placeholder="Max Price"
                />
              </div>
            )}
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Poster URL</label>
              <input
                type="url"
                value={formData.posterUrl}
                onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
                placeholder="/images/events/poster.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Hero Image URL</label>
              <input
                type="url"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
                placeholder="/images/events/hero.jpg"
              />
            </div>
          </div>

          {/* Artist Info */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Artist/Performer Name</label>
            <input
              type="text"
              value={formData.artistName}
              onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
              placeholder="Marty Stuart"
            />
          </div>

          {/* Capacity & Status */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Capacity</label>
              <input
                type="number"
                min="0"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                placeholder="720"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tickets Sold</label>
              <input
                type="number"
                min="0"
                value={formData.ticketsSold || 0}
                onChange={(e) => setFormData({ ...formData, ticketsSold: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
              >
                <option value="upcoming" className="bg-charcoal">Upcoming</option>
                <option value="sold_out" className="bg-charcoal">Sold Out</option>
                <option value="cancelled" className="bg-charcoal">Cancelled</option>
                <option value="completed" className="bg-charcoal">Completed</option>
              </select>
            </div>
          </div>

          {/* Featured */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-ruby-red rounded"
              />
              <span className="text-white">Feature this event on homepage</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button type="button" onClick={onClose} className="flex-1 bg-white/10 hover:bg-white/20">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}