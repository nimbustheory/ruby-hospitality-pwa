'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
  HomeModernIcon,
} from '@heroicons/react/24/outline';

const quickActions = [
  {
    id: 'dine',
    label: 'Dine',
    icon: BuildingStorefrontIcon,
    color: 'from-ruby-red to-ruby-crimson',
    path: '/discover?type=restaurant',
  },
  {
    id: 'drink',
    label: 'Drink',
    icon: GlobeAltIcon,
    color: 'from-ruby-rose-gold to-ruby-red',
    path: '/discover?type=bar',
  },
  {
    id: 'stay',
    label: 'Stay',
    icon: HomeModernIcon,
    color: 'from-ruby-crimson to-ruby-rose-gold',
    path: '/discover?type=hotel',
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-3">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            onClick={() => router.push(action.path)}
            className="glass rounded-2xl p-4 flex flex-col items-center gap-3"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">
              {action.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
