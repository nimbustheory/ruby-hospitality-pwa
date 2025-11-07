'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { 
  UserGroupIcon,
  BellIcon,
  ShieldCheckIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-charcoal px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60">Manage your admin preferences and settings</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserGroupIcon className="w-6 h-6 text-ruby-rose-gold" />
              <h2 className="text-xl font-bold text-white">User Management</h2>
            </div>
            <p className="text-white/60">Manage admin users and permissions</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BellIcon className="w-6 h-6 text-ruby-rose-gold" />
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>
            <p className="text-white/60">Configure alert preferences</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-ruby-rose-gold" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>
            <p className="text-white/60">Manage security settings and access</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cog6ToothIcon className="w-6 h-6 text-ruby-rose-gold" />
              <h2 className="text-xl font-bold text-white">General Settings</h2>
            </div>
            <p className="text-white/60">App configuration and preferences</p>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}