'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface HeroCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  onCtaClick: () => void;
}

export function HeroCard({
  title,
  subtitle,
  description,
  imageUrl,
  ctaText,
  onCtaClick
}: HeroCardProps) {
  return (
    <motion.div
      className="relative w-full h-[320px] rounded-3xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <GlassCard className="space-y-3" animate={false}>
          <div className="text-sm font-medium text-ruby-rose-gold uppercase tracking-wide">
            {subtitle}
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {title}
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            {description}
          </p>
        </GlassCard>
        
        <div className="mt-4">
          <Button
            onClick={onCtaClick}
            fullWidth
            size="lg"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
