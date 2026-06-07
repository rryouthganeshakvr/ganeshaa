import { motion } from 'framer-motion'
import { eventsContent } from '../../content/events'
import { SectionTitle } from '../ui/SectionTitle'
import { fadeInRight, scaleIn } from '../../utils/animations'

export function Events() {
  return (
    <section id="events" className="section-padding section-bg relative overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={eventsContent.badge}
          title={eventsContent.title}
          titleAccent={eventsContent.titleAccent}
          subtitle={eventsContent.subtitle}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {eventsContent.programs.map((program, i) => (
            <motion.div
              key={program.title}
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-3xl p-8"
            >
              <h3 className="font-cinzel font-bold text-2xl text-ivory-200 mb-4">
                {program.title}
              </h3>
              <ul className="space-y-3 text-ivory-400 text-sm font-inter">
                {program.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-gold-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured event */}
        {eventsContent.events.filter((e) => e.featured).map((event) => (
          <motion.div
            key={event.id}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="glass-gold rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="glass px-4 py-1.5 rounded-full text-xs font-cinzel tracking-widest text-gold-400 uppercase">
                  卐 {event.category}
                </span>
                <span className="text-ivory-600 text-sm font-inter">{event.duration}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 md:gap-8 items-start">
                <div>
                  <h3 className="font-cinzel font-bold text-3xl md:text-4xl text-gold-300 mb-2">
                    {event.title}
                  </h3>
                  <p className="font-cormorant text-xl text-ivory-500 italic mb-4">{event.subtitle}</p>
                  <p className="font-inter text-ivory-400 leading-relaxed mb-6">{event.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {event.highlights.map((h, i) => (
                      <span key={i} className="glass px-3 py-1 rounded-full text-xs text-ivory-400 font-inter">
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '📅', label: 'Date', value: event.date },
                    { icon: '⏰', label: 'Time', value: event.time },
                    { icon: '📍', label: 'Location', value: event.location },
                    { icon: '⏳', label: 'Duration', value: event.duration },
                  ].map((info, i) => (
                    <div key={i} className="glass rounded-2xl p-4">
                      <p className="text-2xl mb-1">{info.icon}</p>
                      <p className="text-xs text-ivory-600 font-inter mb-0.5">{info.label}</p>
                      <p className="text-ivory-300 text-sm font-cinzel font-medium">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  )
}
