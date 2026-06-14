import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryContent } from '../../content/gallery'

interface Props {
  open: boolean
  onClose: () => void
  initialCategory?: string
}

export function GalleryModal({ open, onClose, initialCategory = 'All' }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const allItems = galleryContent.items

  const filtered =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((i) => i.category === activeCategory)

  const activeLightboxItem = lightbox !== null ? allItems.find((i) => i.id === lightbox) : null
  const currentIndex      = lightbox !== null ? allItems.findIndex((i) => i.id === lightbox) : -1

  // Reset state every time the modal opens
  useEffect(() => {
    if (open) {
      setActiveCategory(initialCategory)
      setLightbox(null)
    }
  }, [open, initialCategory])

  // Body scroll lock
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top      = `-${scrollY}px`
    document.body.style.width    = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top      = ''
      document.body.style.width    = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox !== null) setLightbox(null)
        else onClose()
      }
      if (lightbox !== null) {
        if (e.key === 'ArrowLeft')
          setLightbox(allItems[(currentIndex - 1 + allItems.length) % allItems.length].id)
        if (e.key === 'ArrowRight')
          setLightbox(allItems[(currentIndex + 1) % allItems.length].id)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, lightbox, currentIndex, allItems, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] flex flex-col"
          style={{ background: 'rgba(10,5,0,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        >
          {/* ── Header ── */}
          <div
            className="flex-shrink-0 px-4 sm:px-6 pt-4 pb-3 border-b border-gold-900/30"
            style={{ background: 'rgba(10,5,0,0.96)' }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-3">
              <div>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-400 tracking-wider">
                  Full Gallery
                </h2>
                <p className="text-ivory-600 text-xs font-inter mt-0.5">
                  {filtered.length} of {allItems.length} photos
                  {activeCategory !== 'All' && ` · ${activeCategory}`}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close gallery"
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-ivory-400 hover:text-gold-400 transition-colors duration-200 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Category filters */}
            <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
              {galleryContent.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-cinzel text-xs tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? 'btn-primary py-1.5 px-4 text-xs'
                      : 'glass text-ivory-500 hover:text-gold-400 hover:border-gold-500/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Scrollable grid ── */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
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
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-all duration-500`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-60 group-hover:opacity-100 transition-all duration-300">{item.placeholder}</span>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-cinzel text-ivory-200 text-xs font-medium truncate">{item.title}</p>
                      <p className="text-gold-400 text-[10px] mt-0.5 font-inter">{item.category}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-7 h-7 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-gold-400 text-xs">⊕</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Lightbox (inside modal) ── */}
          <AnimatePresence>
            {lightbox !== null && activeLightboxItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.93)' }}
                onClick={() => setLightbox(null)}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  className="relative max-w-2xl w-full glass rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio:
                      activeLightboxItem.aspect === 'tall' ? '3/4'
                      : activeLightboxItem.aspect === 'wide' ? '4/3'
                      : '1/1',
                  }}
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
                    aria-label="Close image"
                    className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-ivory-300 hover:text-gold-400 transition-colors"
                  >✕</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox(allItems[(currentIndex - 1 + allItems.length) % allItems.length].id) }}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-gold-400 text-xl leading-none"
                  >‹</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox(allItems[(currentIndex + 1) % allItems.length].id) }}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-gold-400 text-xl leading-none"
                  >›</button>
                </motion.div>
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ivory-600 text-xs font-inter tracking-wider">
                  {currentIndex + 1} / {allItems.length}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
