import { useState } from 'react'
import { motion } from 'framer-motion'
import { scheduleContent } from '../../content/schedule'
import { SectionTitle } from '../ui/SectionTitle'
import { staggerContainer, fadeInUp } from '../../utils/animations'

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0)

  if (!scheduleContent.enabled) return null

  const day = scheduleContent.days[activeDay]

  return (
    <section id="schedule" className="section-padding section-bg relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(232,100,10,0.05) 0%, transparent 55%)' }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={scheduleContent.badge}
          title={scheduleContent.title}
          titleAccent={scheduleContent.titleAccent}
          subtitle={scheduleContent.subtitle}
        />

        {/* Day tabs — scrollable on mobile */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible scrollbar-none px-1">
          {scheduleContent.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl font-cinzel text-sm tracking-wider transition-all duration-300 ${
                activeDay === i
                  ? 'bg-gradient-to-r from-gold-500 to-saffron-600 text-dark-500 font-bold shadow-gold-sm'
                  : 'glass text-ivory-500 hover:text-gold-400 hover:border-gold-500/30'
              }`}
            >
              <span className="block text-xs opacity-70 mb-0.5">{d.date}</span>
              {d.day} · {d.label}
            </button>
          ))}
        </div>

        {/* Schedule card */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={`max-w-2xl mx-auto glass rounded-3xl overflow-hidden ${day.highlight ? 'border border-gold-500/30' : ''}`}
        >
          {/* Card header */}
          <div
            className="px-8 py-5 flex items-center justify-between"
            style={{ background: day.highlight ? 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(232,100,10,0.08))' : 'rgba(255,255,255,0.02)' }}
          >
            <div>
              <p className="font-cinzel font-black text-gold-400 text-xl">{day.day}</p>
              <p className="font-inter text-ivory-600 text-sm">{day.date}</p>
            </div>
            <span className="glass-gold px-4 py-1.5 rounded-full font-cinzel text-gold-300 text-xs tracking-widest">
              {day.label}
            </span>
          </div>

          {/* Events list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gold-900/20"
          >
            {day.events.map((event, j) => (
              <motion.div
                key={j}
                variants={fadeInUp}
                className="flex items-center gap-5 px-8 py-4 hover:bg-white/[0.02] transition-colors duration-200"
              >
                <span className="text-2xl flex-shrink-0 w-8 text-center">{event.icon}</span>
                <span className="font-cinzel text-gold-500 text-sm tabular-nums flex-shrink-0 w-20">
                  {event.time}
                </span>
                <div className="w-px h-8 bg-gold-800/40 flex-shrink-0" />
                <p className="font-inter text-ivory-300 text-sm">{event.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <p className="text-center font-cormorant text-ivory-600 italic text-sm mt-8">
          All are welcome...
        </p>
      </div>
    </section>
  )
}
