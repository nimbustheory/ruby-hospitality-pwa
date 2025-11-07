'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  TagIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Offer, OfferType } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { venues } from '@/lib/demo-data';

export default function AdminDealsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Offer | null>(null);

  // Load actual offers from demo-data
  const [deals, setDeals] = useState<Offer[]>(() => {
    // Import offers from demo-data
    const { offers } = require('@/lib/demo-data');
    return offers;
  });

  const handleAddDeal = () => {
    setEditingDeal(null);
    setShowModal(true);
  };

  const handleEditDeal = (deal: Offer) => {
    setEditingDeal(deal);
    setShowModal(true);
  };

  const handleDeleteDeal = (dealId: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(d => d.id !== dealId));
    }
  };

  const handleSaveDeal = (deal: Offer) => {
    if (editingDeal) {
      setDeals(deals.map(d => d.id === deal.id ? deal : d));
    } else {
      setDeals([...deals, { ...deal, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  return (
    <main className="min-h-screen bg-charcoal px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Deals Management</h1>
            <p className="text-white/60">Create and manage special offers</p>
          </div>
          <Button onClick={handleAddDeal} className="flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Add Deal
          </Button>
        </div>

        {/* Deals List */}
        <div className="space-y-4">
          {deals.map((deal) => (
            <GlassCard key={deal.id} className="p-4">
              <div className="flex gap-4">
                {/* Deal Color Preview */}
                <div 
                  className="w-24 h-24 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: deal.backgroundColor }}
                />

                {/* Deal Details */}
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white flex-1">{deal.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      deal.offerType === 'flash' ? 'bg-red-500/20 text-red-400' :
                      deal.offerType === 'exclusive' ? 'bg-purple-500/20 text-purple-400' :
                      deal.offerType === 'freebie' ? 'bg-green-500/20 text-green-400' :
                      deal.offerType === 'discount' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {deal.offerType.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-white/60 mb-3">{deal.description}</p>
                  
                  <div className="space-y-1 text-sm text-white/60">
                    {deal.venueNames && (
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4" />
                        {deal.venueNames.join(', ')}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      Valid until {formatDate(deal.validUntil)}
                    </div>
                    {deal.redemptionCode && (
                      <div className="flex items-center gap-2">
                        <TagIcon className="w-4 h-4" />
                        Code: {deal.redemptionCode}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditDeal(deal)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Edit deal"
                  >
                    <PencilIcon className="w-5 h-5 text-white/60" />
                  </button>
                  <button
                    onClick={() => handleDeleteDeal(deal.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    aria-label="Delete deal"
                  >
                    <TrashIcon className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Empty State */}
        {deals.length === 0 && (
          <GlassCard className="p-12 text-center">
            <TagIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No deals yet</h3>
            <p className="text-white/60 mb-6">Get started by creating your first special offer</p>
            <Button onClick={handleAddDeal}>Add Deal</Button>
          </GlassCard>
        )}
      </div>

      {/* Deal Modal */}
      {showModal && (
        <DealModal
          deal={editingDeal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveDeal}
        />
      )}
    </main>
  );
}

function DealModal({ 
  deal, 
  onClose, 
  onSave 
}: { 
  deal: Offer | null; 
  onClose: () => void; 
  onSave: (deal: Offer) => void;
}) {
  const [formData, setFormData] = useState<Partial<Offer>>(deal || {
    title: '',
    description: '',
    offerType: 'discount',
    validFrom: new Date().toISOString().slice(0, 16),
    validUntil: '',
    backgroundColor: '#B76E79',
    textColor: '#FFFFFF',
    venues: [],
    venueNames: [],
    isFeatured: false,
    redemptionCode: '',
    termsAndConditions: '',
  });

  const [selectedVenues, setSelectedVenues] = useState<string[]>(deal?.venues || []);

  // Predefined color schemes for different offer types
  const colorSchemes = {
    discount: { bg: '#E6F3FF', text: '#1C1C1E' },
    freebie: { bg: '#B76E79', text: '#FFFFFF' },
    early_access: { bg: '#FFE4E1', text: '#8B0000' },
    exclusive: { bg: '#F0E6FF', text: '#4A0E4E' },
    flash: { bg: '#FFF8DC', text: '#8B0000' },
  };

  const handleOfferTypeChange = (type: OfferType) => {
    const colors = colorSchemes[type];
    setFormData({
      ...formData,
      offerType: type,
      backgroundColor: colors.bg,
      textColor: colors.text,
    });
  };

  const handleVenueToggle = (venueId: string) => {
    const updated = selectedVenues.includes(venueId)
      ? selectedVenues.filter(id => id !== venueId)
      : [...selectedVenues, venueId];
    setSelectedVenues(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get venue names from selected venue IDs
    const venueNames = venues
      .filter(v => selectedVenues.includes(v.id))
      .map(v => v.name);

    const dealData: Offer = {
      id: deal?.id || Date.now().toString(),
      title: formData.title || '',
      description: formData.description || '',
      offerType: formData.offerType as OfferType || 'discount',
      validFrom: formData.validFrom || new Date().toISOString(),
      validUntil: formData.validUntil || new Date().toISOString(),
      backgroundColor: formData.backgroundColor || '#B76E79',
      textColor: formData.textColor || '#FFFFFF',
      venues: selectedVenues,
      venueNames,
      isFeatured: formData.isFeatured || false,
      redemptionCode: formData.redemptionCode,
      termsAndConditions: formData.termsAndConditions,
    };

    onSave(dealData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <GlassCard className="w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {deal ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <XMarkIcon className="w-6 h-6 text-white/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Deal Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
              placeholder="🎉 Birthday Month Special"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
              placeholder="Free dessert with any entrée during your birthday month"
            />
          </div>

          {/* Offer Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Offer Type *</label>
            <select
              required
              value={formData.offerType}
              onChange={(e) => handleOfferTypeChange(e.target.value as OfferType)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
            >
              <option value="discount" className="bg-charcoal">Discount</option>
              <option value="freebie" className="bg-charcoal">Freebie</option>
              <option value="early_access" className="bg-charcoal">Early Access</option>
              <option value="exclusive" className="bg-charcoal">Exclusive</option>
              <option value="flash" className="bg-charcoal">Flash Sale</option>
            </select>
          </div>

          {/* Valid Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Valid From *</label>
              <input
                type="datetime-local"
                required
                value={formData.validFrom?.slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Valid Until *</label>
              <input
                type="datetime-local"
                required
                value={formData.validUntil?.slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
              />
            </div>
          </div>

          {/* Venues */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Valid At Venues * (select at least one)</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-white/5 rounded-lg border border-white/10">
              {venues.map((venue) => (
                <label key={venue.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white/5 rounded">
                  <input
                    type="checkbox"
                    checked={selectedVenues.includes(venue.id)}
                    onChange={() => handleVenueToggle(venue.id)}
                    className="w-4 h-4 text-ruby-red rounded"
                  />
                  <span className="text-white text-sm">{venue.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                  placeholder="#B76E79"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.textColor}
                  onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ruby-red"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Preview</label>
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: formData.backgroundColor,
                color: formData.textColor 
              }}
            >
              <h3 className="font-bold text-lg mb-1">{formData.title || 'Deal Title'}</h3>
              <p className="text-sm opacity-80">{formData.description || 'Deal description'}</p>
            </div>
          </div>

          {/* Redemption Code */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Redemption Code (optional)</label>
            <input
              type="text"
              value={formData.redemptionCode}
              onChange={(e) => setFormData({ ...formData, redemptionCode: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red uppercase"
              placeholder="BIRTHDAY2025"
            />
          </div>

          {/* Terms */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Terms & Conditions</label>
            <textarea
              value={formData.termsAndConditions}
              onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ruby-red"
              placeholder="Valid with proof of birthday. One per customer per year."
            />
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
              <span className="text-white">Feature this deal on homepage</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button type="button" onClick={onClose} className="flex-1 bg-white/10 hover:bg-white/20">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {deal ? 'Update Deal' : 'Create Deal'}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}