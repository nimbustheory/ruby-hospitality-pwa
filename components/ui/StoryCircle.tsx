'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StoryCircleProps {
  name: string;
  imageUrl: string;
  isActive?: boolean;
  onClick: () => void;
}

export function StoryCircle({ 
  name, 
  imageUrl, 
  isActive = false,
  onClick 
}: StoryCircleProps) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-2 cursor-pointer"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Gradient Ring */}
        <div className={cn(
          "absolute inset-0 rounded-full p-[3px]",
          "bg-gradient-to-tr from-ruby-red via-ruby-rose-gold to-ruby-red",
          isActive && "animate-pulse"
        )}>
          <div className="h-full w-full rounded-full bg-charcoal" />
        </div>
        
        {/* Image */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden m-[3px]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        
        {/* Live Indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 right-0 w-4 h-4 bg-ruby-red rounded-full border-2 border-charcoal"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      <span className="text-xs text-white/80 text-center max-w-[80px] truncate">
        {name}
      </span>
    </motion.div>
  );
}
