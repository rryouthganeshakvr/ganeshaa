import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonialsContent } from '../../content/testimonials'
import { SectionTitle } from '../ui/SectionTitle'
import { fadeInUp } from '../../utils/animations'

function SacredRating({ count }: { count: number }) {
  const symbols = ['卐', 'ॐ', '卐', 'ॐ', '卐']
  return (
    <div className="flex gap-2 justify-center">
      {symbols.slice(0, count).map((sym, i) => (
        <span key={i} className={`text-base font-bold ${i % 2 === 0 ? 'text-saffron-400' : 'text-gold-400'}`}>
          {sym}
        </span>
      ))}
    </div>
  )
}

export function Testimonials() {
  const { testimonials } = testimonialsContent
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length, isPaused])

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.95 }),
  }

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(232,100,10,0.06) 0%, transparent 55%)' }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={testimonialsContent.badge}
          title={testimonialsContent.title}
          titleAccent={testimonialsContent.titleAccent}
          subtitle={testimonialsContent.subtitle}
        />

        <div className="max-w-3xl mx-auto mb-10">
          {/* Pause on hover — stops auto-rotate while reading */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="glass-gold rounded-3xl p-8 md:p-12 text-center"
              >
                <p className="font-cinzel text-6xl text-gold-500/40 mb-2 leading-none">❝</p>

                <div className="flex justify-center mb-4">
                  <SacredRating count={testimonials[current].stars} />
                </div>

                <p className="font-cormorant text-xl md:text-2xl text-ivory-300 italic leading-relaxed mb-8">
                  {testimonials[current].text}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-cinzel font-bold text-lg text-dark-500 ${
                      testimonials[current].avatarColor === 'gold'
                        ? 'bg-gradient-to-br from-gold-300 to-gold-600'
                        : 'bg-gradient-to-br from-saffron-400 to-saffron-700'
                    }`}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-cinzel font-bold text-ivory-200">{testimonials[current].name}</p>
                    <p className="text-ivory-600 text-sm font-inter">
                      {testimonials[current].role} · {testimonials[current].location}
                    </p>
                  </div>
                </div>

                {/* Pause indicator */}
                {isPaused && (
                  <p className="mt-4 text-ivory-700 text-xs font-inter tracking-wider">⏸ Auto-play paused</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-gold-400 hover:glass-gold transition-all duration-300"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-6 h-2 bg-gradient-to-r from-gold-400 to-saffron-600'
                      : 'w-2 h-2 bg-ivory-700 hover:bg-gold-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-gold-400 hover:glass-gold transition-all duration-300"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
