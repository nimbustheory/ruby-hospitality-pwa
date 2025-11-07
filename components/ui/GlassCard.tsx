'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'dark';
  animate?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'default',
  animate = true,
}: GlassCardProps) {
  const variants = {
    default: 'glass',
    elevated: 'glass-elevated',
    dark: 'glass-dark',
  };

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  } : {};

  return (
    <Component
      {...animationProps}
      className={cn(
        'rounded-3xl p-6',
        variants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
