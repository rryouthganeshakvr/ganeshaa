import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { heroContent } from '../../content/hero'
import { staggerContainer, fadeInUp, fadeInDown, blurIn, scaleIn } from '../../utils/animations'

function CountUp({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.textContent = `0${suffix}`
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            el.textContent = `${Math.round(eased * target)}${suffix}`
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return (
    <p
      ref={ref}
      className="font-cinzel text-lg sm:text-2xl md:text-3xl font-bold text-gradient-gold leading-tight tabular-nums"
      style={{ willChange: 'transform', contain: 'strict', minWidth: '3ch', minHeight: '1.2em' }}
    >
      0{suffix}
    </p>
  )
}

const SacredMandala = () => (
  <svg
    viewBox="0 0 400 400"
    className="w-full h-full"
    style={{ opacity: 0.15 }}
  >
    {[0, 30, 60, 90, 120, 150].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 200 200)`}>
        <ellipse cx="200" cy="200" rx="160" ry="40" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
      </g>
    ))}
    {[80, 120, 160].map((r) => (
      <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#D4AF37" strokeWidth="0.6" />
    ))}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16
      const rad = (angle * Math.PI) / 180
      const x1 = 200 + 60 * Math.cos(rad)
      const y1 = 200 + 60 * Math.sin(rad)
      const x2 = 200 + 160 * Math.cos(rad)
      const y2 = 200 + 160 * Math.sin(rad)
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="0.5" />
    })}
    <circle cx="200" cy="200" r="30" fill="none" stroke="#E8640A" strokeWidth="1" />
    <text x="200" y="212" textAnchor="middle" fontSize="28" fill="#D4AF37" fontFamily="serif">ॐ</text>
  </svg>
)

const DECO_SYMBOLS = ['卐', 'ॐ', '卐', 'ॐ', '卐']

const FloatingDeco = ({ delay, x, y, size, idx }: { delay: number; x: string; y: string; size: number; idx: number }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{
      left: x,
      top: y,
      fontSize: size,
      color: idx % 2 === 0 ? 'rgba(212,175,55,0.55)' : 'rgba(232,100,10,0.5)',
      fontFamily: 'serif',
      lineHeight: 1,
    }}
    animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    {DECO_SYMBOLS[idx % DECO_SYMBOLS.length]}
  </motion.div>
)

export function Hero() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-procession.jpg"
          alt="Ganesh Chaturthi Procession"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.28 }}
        />
      </div>

      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(232,100,10,0.08) 0%, transparent 50%), linear-gradient(180deg, rgba(10,5,0,0.75) 0%, rgba(21,9,0,0.6) 50%, rgba(10,5,0,0.85) 100%)',
        }}
      />

      {/* Sacred geometric background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.div
          className="w-[900px] h-[900px] max-w-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <SacredMandala />
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <FloatingDeco delay={0}   x="8%"  y="15%" size={36} idx={0} />
      <FloatingDeco delay={1.5} x="88%" y="20%" size={28} idx={1} />
      <FloatingDeco delay={3}   x="5%"  y="70%" size={32} idx={2} />
      <FloatingDeco delay={0.8} x="90%" y="65%" size={40} idx={3} />
      <FloatingDeco delay={2}   x="45%" y="88%" size={24} idx={4} />

      {/* Top-left brand badge */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-[72px] sm:top-[76px] left-4 sm:left-6 z-20 flex items-center gap-2.5 glass-gold px-4 py-2.5 rounded-2xl"
        style={{ boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-saffron-600 flex items-center justify-center text-dark-500 font-bold text-sm flex-shrink-0 shadow-gold-sm">
          ॐ
        </div>
        <div className="min-w-0">
          <p className="font-cinzel font-bold text-gold-400 text-xs sm:text-sm leading-tight tracking-wide">
            Round Ramalayam Youth
          </p>
          <p className="font-inter text-ivory-600 text-[9px] sm:text-[10px] tracking-widest">
            KOVVUR · EST. 2004
          </p>
        </div>
      </motion.div>

      {/* Top-right corner ornament */}
      <div className="absolute top-24 right-8 w-20 h-20 opacity-20" style={{ transform: 'scaleX(-1)' }}>
        <svg viewBox="0 0 80 80">
          <path d="M0,0 L80,0 M80,0 L80,80" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
          <path d="M70,0 L70,30 L40,30" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
          <circle cx="70" cy="30" r="3" fill="#D4AF37" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 container-custom px-4 md:px-8 text-center pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInDown} className="inline-flex mb-8">
            <motion.span
              className="glass-gold px-6 py-2.5 rounded-full font-cinzel text-gold-300 tracking-[0.3em] text-sm uppercase glow-text"
              animate={{ boxShadow: ['0 0 20px rgba(212,175,55,0.2)', '0 0 40px rgba(212,175,55,0.4)', '0 0 20px rgba(212,175,55,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {heroContent.badge}
            </motion.span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={blurIn}>
            <h1 className="font-cinzel font-black leading-none mb-4">
              <span
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-ivory-200"
                style={{ textShadow: '0 0 60px rgba(212,175,55,0.2)' }}
              >
                {heroContent.title}
              </span>
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gradient-gold mt-2">
                {heroContent.titleHighlight}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="font-cormorant text-2xl md:text-3xl text-ivory-500 italic mb-4 mt-6"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="font-inter text-ivory-600 text-lg max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <button
              onClick={() => scrollTo(heroContent.primaryCta.href)}
              className="btn-primary text-sm sm:text-base w-full sm:w-auto sm:min-w-[180px]"
            >
              {heroContent.primaryCta.label}
            </button>
            <button
              onClick={() => scrollTo(heroContent.secondaryCta.href)}
              className="btn-secondary text-sm sm:text-base w-full sm:w-auto sm:min-w-[180px] text-center"
            >
              {heroContent.secondaryCta.label}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={scaleIn}
            className="glass rounded-3xl p-4 sm:p-6 md:p-8 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 w-full max-w-lg mx-auto"
          >
            {heroContent.floatingStats.map((stat, i) => (
              <div key={i} className="text-center overflow-hidden">
                <CountUp target={stat.num} suffix={stat.suffix} duration={900 + i * 200} />
                <p className="font-inter text-[10px] sm:text-xs text-ivory-600 tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
