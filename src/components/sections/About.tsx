import { motion } from 'framer-motion'
import { aboutContent } from '../../content/about'
import { SectionTitle } from '../ui/SectionTitle'
import { GlassCard } from '../ui/GlassCard'
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from '../../utils/animations'

export function About() {
  return (
    <section id="about" className="section-padding section-bg relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={aboutContent.badge}
          title={aboutContent.title}
          titleAccent={aboutContent.titleAccent}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Description & stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.p
              variants={fadeInLeft}
              className="font-cormorant text-xl md:text-2xl text-ivory-400 leading-relaxed mb-8"
            >
              {aboutContent.description}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {aboutContent.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass rounded-2xl p-5 text-center glass-hover"
                >
                  <div className="text-3xl mb-2">{h.icon}</div>
                  <p className="font-cinzel text-2xl font-bold text-gradient-gold">{h.value}</p>
                  <p className="text-ivory-600 text-xs mt-1 tracking-wide">{h.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Ganesha photo */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
              {/* Gold border glow ring */}
              <div
                className="absolute -inset-1 rounded-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(232,100,10,0.2), rgba(212,175,55,0.4))', filter: 'blur(8px)' }}
              />
              <div className="relative rounded-3xl overflow-hidden shadow-gold">
                <img
                  src="/images/idol-pandal-full.jpg"
                  alt="Ganesha at Round Ramalayam Kovvur"
                  className="w-full h-full object-cover object-center"
                  style={{ aspectRatio: '3/4' }}
                />
                {/* Bottom caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5"
                  style={{ background: 'linear-gradient(to top, rgba(10,5,0,0.85) 0%, transparent 100%)' }}>
                  <p className="font-cinzel font-bold text-gold-400 text-base tracking-wide">Round Ramalayam</p>
                  <p className="font-cormorant text-ivory-400 italic text-sm">Kovvur · Est. 2004</p>
                </div>
                {/* Top Om badge */}
                <div className="absolute top-4 right-4 w-12 h-12 glass-gold rounded-full flex items-center justify-center shadow-gold">
                  <span className="font-cinzel text-gold-400 text-xl font-bold">ॐ</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cards row */}
        <div className="grid md:grid-cols-3 gap-6">
          {aboutContent.cards.map((card, i) => (
            <GlassCard key={i} delay={i * 0.1} className="p-8">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-cinzel font-bold text-gold-400 text-xl mb-3">{card.title}</h3>
              <p className="font-inter text-ivory-500 leading-relaxed">{card.description}</p>
            </GlassCard>
          ))}
        </div>

        {aboutContent.timeline && aboutContent.timeline.length > 0 && (
          <div className="mt-16">
            <div className="mb-10 text-center">
              <p className="text-gold-400 text-sm uppercase tracking-[0.3em] font-cinzel mb-3">Our Journey</p>
              <h3 className="font-cinzel text-4xl text-ivory-200">A Story Written in Devotion</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
              {aboutContent.timeline.map((entry, i) => (
                <div key={i} className="glass rounded-3xl p-6 glass-hover">
                  <p className="text-gold-400 font-cinzel text-sm uppercase tracking-[0.3em] mb-3">
                    {entry.year}
                  </p>
                  <h4 className="font-cinzel text-xl text-ivory-200 font-bold mb-3">
                    {entry.title}
                  </h4>
                  <p className="text-ivory-500 text-sm leading-relaxed">{entry.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
