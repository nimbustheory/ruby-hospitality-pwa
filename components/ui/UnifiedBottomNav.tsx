'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  TicketIcon,
  TagIcon,
  UserIcon,
  ChartBarIcon,
  CalendarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  TicketIcon as TicketIconSolid,
  TagIcon as TagIconSolid,
  UserIcon as UserIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  CalendarIcon as CalendarIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from '@heroicons/react/24/solid';
import { useAdmin } from '@/lib/admin-context';

const consumerNavItems = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: 'Discover',
    path: '/discover',
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
  {
    name: 'Events',
    path: '/events',
    icon: TicketIcon,
    activeIcon: TicketIconSolid,
  },
  {
    name: 'Offers',
    path: '/offers',
    icon: TagIcon,
    activeIcon: TagIconSolid,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

const adminNavItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: ChartBarIcon,
    activeIcon: ChartBarIconSolid,
  },
  {
    name: 'Events',
    path: '/admin/events',
    icon: CalendarIcon,
    activeIcon: CalendarIconSolid,
  },
  {
    name: 'Deals',
    path: '/admin/deals',
    icon: ShoppingBagIcon,
    activeIcon: ShoppingBagIconSolid,
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: Cog6ToothIcon,
    activeIcon: Cog6ToothIconSolid,
  },
];

export function UnifiedBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminMode } = useAdmin();

  const navItems = isAdminMode ? adminNavItems : consumerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe max-w-[430px] mx-auto">
      <div className="glass-dark border-t border-white/10">
        <div className="px-4">
          <div className="flex items-center justify-around h-20">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = isActive ? item.activeIcon : item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="relative flex flex-col items-center justify-center gap-1 min-w-[60px]"
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 w-12 h-1 bg-ruby-red rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors ${
                        isActive ? 'text-ruby-red' : 'text-white/60'
                      }`}
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}