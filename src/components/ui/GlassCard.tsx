import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { scaleIn } from '../../utils/animations'

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gold' | 'saffron' | 'dark'
  hover?: boolean
  delay?: number
  animate?: boolean
  onClick?: () => void
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  delay = 0,
  animate = true,
  onClick,
}: GlassCardProps) {
  const variantClasses = {
    default: 'glass',
    gold: 'glass-gold',
    saffron: 'glass-saffron',
    dark: 'bg-black/30 backdrop-blur-glass border border-white/5',
  }

  const baseClass = `rounded-2xl ${variantClasses[variant]} ${hover ? 'glass-hover' : ''} ${className}`

  if (!animate) {
    return (
      <div className={baseClass} onClick={onClick}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={baseClass}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
