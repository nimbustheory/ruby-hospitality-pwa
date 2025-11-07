'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { 
  UserGroupIcon, 
  TagIcon, 
  ChartBarIcon,
  CalendarIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  // Mock data - replace with real API calls
  const stats = {
    activeUsers: 1247,
    dealsRedeemedToday: 34,
    dealsRedeemedThisWeek: 189,
    dealsRedeemedThisMonth: 756,
    upcomingEvents: 12,
    activeDeals: 8,
  };

  const recentActivity = [
    { type: 'deal', user: 'Sarah M.', action: 'Redeemed Happy Hour Deal', venue: 'The Griffin', time: '5 mins ago' },
    { type: 'event', user: 'John D.', action: 'Purchased ticket', venue: 'Bing Crosby Theater', time: '12 mins ago' },
    { type: 'deal', user: 'Mike R.', action: 'Redeemed Birthday Deal', venue: 'Steam Plant', time: '28 mins ago' },
    { type: 'event', user: 'Lisa K.', action: 'RSVP to event', venue: 'Osprey', time: '1 hour ago' },
  ];

  return (
    <main className="min-h-screen bg-charcoal px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/60">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Active Users</p>
                <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
              </div>
              <div className="p-2 bg-ruby-red/20 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-ruby-rose-gold" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Deals Today</p>
                <p className="text-3xl font-bold text-white">{stats.dealsRedeemedToday}</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TagIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Deals Redeemed Stats */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBagIcon className="w-5 h-5 text-ruby-rose-gold" />
            <h2 className="text-xl font-bold text-white">Deals Redeemed</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Today</p>
              <p className="text-2xl font-bold text-white">{stats.dealsRedeemedToday}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">This Week</p>
              <p className="text-2xl font-bold text-white">{stats.dealsRedeemedThisWeek}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">This Month</p>
              <p className="text-2xl font-bold text-white">{stats.dealsRedeemedThisMonth}</p>
            </div>
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Upcoming Events</p>
                <p className="text-xl font-bold text-white">{stats.upcomingEvents}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TagIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Active Deals</p>
                <p className="text-xl font-bold text-white">{stats.activeDeals}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="w-5 h-5 text-ruby-rose-gold" />
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'deal' ? 'bg-green-500/20' : 'bg-blue-500/20'
                }`}>
                  {activity.type === 'deal' ? (
                    <TagIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <CalendarIcon className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-white/60 text-sm">{activity.action}</p>
                  <p className="text-white/40 text-xs mt-1">{activity.venue} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </main>
  );
}