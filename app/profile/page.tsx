'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { 
  UserCircleIcon, 
  HeartIcon, 
  BellIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    icon: UserCircleIcon,
    label: 'Account Settings',
    description: 'Manage your profile and preferences',
  },
  {
    icon: HeartIcon,
    label: 'Favorites',
    description: 'Your saved venues and events',
  },
  {
    icon: BellIcon,
    label: 'Notifications',
    description: 'Manage notification preferences',
  },
  {
    icon: CreditCardIcon,
    label: 'Payment Methods',
    description: 'Manage your payment options',
  },
  {
    icon: QuestionMarkCircleIcon,
    label: 'Help & Support',
    description: 'Get help with your account',
  },
  {
    icon: Cog6ToothIcon,
    label: 'Settings',
    description: 'App settings and preferences',
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <div className="px-4">
        {/* User Info Card */}
        <GlassCard className="mt-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ruby-red to-ruby-rose-gold flex items-center justify-center">
              <UserCircleIcon className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">Guest User</h2>
              <p className="text-sm text-white/60">Sign in to unlock all features</p>
            </div>
          </div>
          
          <button className="w-full mt-4 py-3 rounded-full bg-ruby-red hover:bg-ruby-crimson text-white font-semibold transition-colors">
            Sign In
          </button>
        </GlassCard>

        {/* Menu Items */}
        <div className="space-y-3 pb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full text-left"
              >
                <GlassCard className="flex items-center gap-4 hover:glass-elevated transition-all" animate={false}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-ruby-red/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-ruby-rose-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{item.label}</h3>
                    <p className="text-sm text-white/60 truncate">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </button>
            );
          })}
        </div>

        {/* App Version */}
        <div className="text-center pb-8">
          <p className="text-sm text-white/40">
            Ruby Hospitality v1.0.0
          </p>
        </div>
      </div>
    </main>
  );
}