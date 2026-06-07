import { motion } from 'framer-motion'
import { staggerContainer, fadeInDown, fadeInUp } from '../../utils/animations'

interface SectionTitleProps {
  badge?: string
  title: string
  titleAccent?: string
  subtitle?: string
  center?: boolean
}

export function SectionTitle({ badge, title, titleAccent, subtitle, center = true }: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-16 ${center ? 'text-center' : ''}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {badge && (
        <motion.div variants={fadeInDown} className="inline-flex items-center mb-4">
          <span className="glass px-5 py-2 rounded-full text-sm font-cinzel tracking-widest text-gold-400 uppercase">
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
      >
        <span className="text-ivory-300">{title}</span>
        {titleAccent && (
          <>
            {' '}
            <span className="text-gradient-gold">{titleAccent}</span>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="font-cormorant text-xl md:text-2xl text-ivory-500 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div variants={fadeInUp} className="ornament-line mt-6 max-w-xs mx-auto">
        <span className="text-gold-400 text-lg">✦</span>
      </motion.div>
    </motion.div>
  )
}
