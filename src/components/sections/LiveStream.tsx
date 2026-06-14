import { motion } from 'framer-motion'
import { livestreamContent } from '../../content/livestream'
import { SectionTitle } from '../ui/SectionTitle'
import { fadeInUp, scaleIn } from '../../utils/animations'

export function LiveStream() {
  if (!livestreamContent.enabled) return null

  const { youtubeId, badge, title, titleAccent, description, watchLabel } = livestreamContent
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`

  return (
    <section id="livestream" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(232,100,10,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={badge}
          title={title}
          titleAccent={titleAccent}
          subtitle={description}
        />

        {/* Live indicator pill */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 glass-gold px-5 py-2 rounded-full font-cinzel text-gold-300 text-sm tracking-widest uppercase">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron-500" />
            </span>
            Live Streaming
          </span>
        </motion.div>

        {youtubeId ? (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Embed wrapper — 16:9 aspect ratio */}
            <div
              className="relative w-full rounded-3xl overflow-hidden glass-gold"
              style={{
                paddingTop: '56.25%',
                boxShadow: '0 0 60px rgba(212,175,55,0.15)',
              }}
            >
              <iframe
                src={embedUrl}
                title="Round Ramalayam Youth — Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* Watch on YouTube fallback link */}
            <div className="flex justify-center mt-6">
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                {watchLabel}
              </a>
            </div>
          </motion.div>
        ) : (
          /* No ID set — show placeholder card */
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto glass-gold rounded-3xl p-12 text-center"
            style={{ boxShadow: '0 0 40px rgba(212,175,55,0.1)' }}
          >
            <p className="font-cinzel text-6xl text-gold-400 mb-4">▶</p>
            <p className="font-cormorant text-ivory-400 italic text-lg">
              Live stream will begin shortly.
            </p>
            <p className="font-inter text-ivory-600 text-sm mt-2">
              Round Ramalayam Youth, Kovvur
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
