import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { teachingsContent } from '../../content/teachings'
import { SectionTitle } from '../ui/SectionTitle'
import { staggerContainer, fadeInUp, scaleIn } from '../../utils/animations'

export function Teachings() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <section id="teachings" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(232,100,10,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={teachingsContent.badge}
          title={teachingsContent.title}
          titleAccent={teachingsContent.titleAccent}
          subtitle={teachingsContent.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teachingsContent.teachings.map((teaching, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="glass rounded-3xl p-7 cursor-pointer relative overflow-hidden group glass-hover"
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            >
              {/* Subtle glow accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl transition-all duration-500 ${
                  teaching.color === 'gold'
                    ? 'bg-gradient-to-r from-transparent via-gold-400 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-saffron-600 to-transparent'
                }`}
              />

              {/* Category badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`text-xs font-cinzel tracking-widest uppercase px-3 py-1 rounded-full ${
                    teaching.color === 'gold'
                      ? 'text-gold-400 bg-gold-400/10 border border-gold-400/20'
                      : 'text-saffron-400 bg-saffron-600/10 border border-saffron-600/20'
                  }`}
                >
                  {teaching.category}
                </span>
                <motion.div
                  animate={{ rotate: activeIdx === i ? 45 : 0 }}
                  className="text-gold-600 text-lg"
                >
                  ✦
                </motion.div>
              </div>

              {/* Mantra */}
              <p
                className={`font-cormorant text-xl italic mb-3 leading-relaxed ${
                  teaching.color === 'gold' ? 'text-gold-400' : 'text-saffron-400'
                }`}
              >
                {teaching.mantra}
              </p>

              {/* Title */}
              <h3 className="font-cinzel font-bold text-ivory-200 text-lg mb-3">
                {teaching.title}
              </h3>

              {/* Expandable text */}
              <AnimatePresence>
                {activeIdx === i ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-inter text-ivory-500 text-sm leading-relaxed overflow-hidden"
                  >
                    {teaching.text}
                  </motion.p>
                ) : (
                  <p className="font-inter text-ivory-600 text-sm leading-relaxed line-clamp-2">
                    {teaching.text}
                  </p>
                )}
              </AnimatePresence>

              {/* Read more hint */}
              <p className="text-xs text-ivory-700 mt-3 font-inter">
                {activeIdx === i ? 'Click to collapse' : 'Click to read more →'}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured quote */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 glass-gold rounded-3xl p-10 md:p-14 text-center max-w-3xl mx-auto"
        >
          <p className="text-5xl text-gold-400 mb-4 font-cinzel">❝</p>
          <blockquote className="font-cormorant text-2xl md:text-3xl text-ivory-300 italic leading-relaxed mb-6">
            Before starting any work or ceremony, we invoke Lord Ganesha — for his blessings clear all obstacles and pave the way to success.
          </blockquote>
          <div className="ornament-line max-w-xs mx-auto">
            <span className="font-cinzel text-gold-500 text-sm tracking-widest">
              — Vedic Tradition
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
