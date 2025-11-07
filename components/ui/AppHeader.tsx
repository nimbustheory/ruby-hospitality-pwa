'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheckIcon, UserIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon as ShieldCheckIconSolid } from '@heroicons/react/24/solid';
import { useAdmin } from '@/lib/admin-context';
import { motion } from 'framer-motion';

export function AppHeader() {
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const router = useRouter();

  const handleToggle = () => {
    toggleAdminMode();
    // Navigate to appropriate page after toggling
    if (isAdminMode) {
      // Switching to consumer mode - go to home
      router.push('/');
    } else {
      // Switching to admin mode - go to dashboard
      router.push('/admin');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-ruby-red border-b border-ruby-crimson shadow-lg max-w-[430px] mx-auto">
      <div className="px-4 py-5 flex items-center justify-between">
        <Image
          src="/images/logos/ruby-logo.png"
          alt="Ruby Hospitality"
          width={240}
          height={80}
          className="h-16 w-auto"
        />
        
        {/* Admin Toggle */}
        <motion.button
          onClick={handleToggle}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isAdminMode ? 'Switch to Consumer View' : 'Switch to Admin View'}
        >
          {isAdminMode ? (
            <UserIcon className="w-7 h-7 text-white/80 hover:text-white" />
          ) : (
            <ShieldCheckIcon className="w-7 h-7 text-white/60 hover:text-white" />
          )}
        </motion.button>
      </div>
    </header>
  );
}