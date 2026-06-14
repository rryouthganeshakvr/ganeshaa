import { motion } from 'framer-motion'
import { darshanContent } from '../../content/darshan'

export function Darshan() {
  if (!darshanContent.enabled) return null

  return (
    <section id="darshan" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-gold px-5 py-2 rounded-full font-cinzel text-gold-300 text-xs tracking-[0.3em] uppercase mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron-500" />
            </span>
            {darshanContent.day} · {darshanContent.date}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-ivory-200 mb-2"
          >
            {darshanContent.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-cormorant text-gold-400 italic text-xl"
          >
            {darshanContent.blessing}
          </motion.p>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="glass-gold rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(212,175,55,0.15)' }}
          >
            {/* Image */}
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <img
                src={darshanContent.imageSrc}
                alt={darshanContent.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,5,0,0.75) 0%, transparent 50%)',
                }}
              />
              {/* Day badge on image */}
              <div className="absolute top-4 left-4 glass-gold px-4 py-1.5 rounded-full">
                <span className="font-cinzel text-gold-300 text-xs tracking-widest uppercase">
                  {darshanContent.day}
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="px-6 sm:px-8 py-6 text-center">
              <p className="font-inter text-ivory-400 text-sm sm:text-base leading-relaxed">
                {darshanContent.description}
              </p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-px flex-1 bg-gold-800/40" />
                <span className="font-cinzel text-gold-600 text-xs tracking-widest">
                  ROUND RAMALAYAM · KOVVUR
                </span>
                <div className="h-px flex-1 bg-gold-800/40" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
