import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryContent } from '../../content/gallery'
import { SectionTitle } from '../ui/SectionTitle'
import { staggerContainer, fadeInUp } from '../../utils/animations'

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? galleryContent.items
      : galleryContent.items.filter((item) => item.category === activeCategory)

  const allItems = galleryContent.items
  const activeLightboxItem = lightbox !== null ? allItems.find((i) => i.id === lightbox) : null
  const currentIndex = lightbox !== null ? allItems.findIndex(i => i.id === lightbox) : -1

  // Escape key + scroll lock
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') setLightbox(allItems[(currentIndex - 1 + allItems.length) % allItems.length].id)
      if (e.key === 'ArrowRight') setLightbox(allItems[(currentIndex + 1) % allItems.length].id)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, currentIndex, allItems])

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightbox(allItems[(currentIndex - 1 + allItems.length) % allItems.length].id)
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightbox(allItems[(currentIndex + 1) % allItems.length].id)
  }

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)' }}
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
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
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
                {'src' in item && item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 transition-all duration-500 group-hover:opacity-100`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-60 group-hover:opacity-100 transition-all duration-300">
                        {item.placeholder}
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-cinzel text-ivory-200 text-sm font-medium">{item.title}</p>
                  <p className="text-gold-400 text-xs mt-1 font-inter">{item.category}</p>
                </div>
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
            role="dialog"
            aria-modal="true"
            aria-label={`Image: ${activeLightboxItem.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
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

              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close image"
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-ivory-300 hover:text-gold-400 transition-colors"
              >
                ✕
              </button>

              {/* Prev */}
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-gold-400 hover:glass-gold transition-all duration-200 text-xl leading-none"
              >
                ‹
              </button>

              {/* Next */}
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-gold-400 hover:glass-gold transition-all duration-200 text-xl leading-none"
              >
                ›
              </button>
            </motion.div>

            {/* Counter */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ivory-600 text-xs font-inter tracking-wider">
              {currentIndex + 1} / {allItems.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
