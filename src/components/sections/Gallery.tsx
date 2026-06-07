import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryContent } from '../../content/gallery'
import { SectionTitle } from '../ui/SectionTitle'
import { staggerContainer, fadeInUp, scaleIn } from '../../utils/animations'

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? galleryContent.items
      : galleryContent.items.filter((item) => item.category === activeCategory)

  const activeLightboxItem = lightbox !== null ? galleryContent.items.find((i) => i.id === lightbox) : null

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={galleryContent.badge}
          title={galleryContent.title}
          titleAccent={galleryContent.titleAccent}
          subtitle={galleryContent.subtitle}
        />

        {/* Category filters */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {galleryContent.categories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeInUp}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-cinzel text-sm tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'btn-primary py-2 px-5 text-sm'
                  : 'glass text-ivory-500 hover:text-gold-400 hover:border-gold-500/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`relative break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl ${
                  item.aspect === 'tall' ? 'aspect-[3/4]' : item.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                }`}
                onClick={() => setLightbox(item.id)}
              >
                {/* Real photo or gradient fallback */}
                {'src' in item && item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-6xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        {item.placeholder}
                      </motion.span>
                    </div>
                  </>
                )}

                {/* Glass overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-cinzel text-ivory-200 text-sm font-medium">{item.title}</p>
                  <p className="text-gold-400 text-xs mt-1 font-inter">{item.category}</p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gold-400 text-xs">⊕</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full glass rounded-3xl overflow-hidden"
              style={{ aspectRatio: activeLightboxItem.aspect === 'tall' ? '3/4' : activeLightboxItem.aspect === 'wide' ? '4/3' : '1/1' }}
              onClick={(e) => e.stopPropagation()}
            >
              {'src' in activeLightboxItem && activeLightboxItem.src ? (
                <img
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeLightboxItem.gradient}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl opacity-60">{activeLightboxItem.placeholder}</span>
                  </div>
                </>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-cinzel text-ivory-200 text-xl font-bold">{activeLightboxItem.title}</p>
                <p className="text-gold-400 text-sm mt-1">{activeLightboxItem.category}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-ivory-300 hover:text-gold-400 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
