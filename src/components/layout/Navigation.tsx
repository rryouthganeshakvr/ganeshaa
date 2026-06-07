import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { settings } from '../../content/settings'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = settings.navLinks.map((l) => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-auto"
      >
        <div
          className={`glass rounded-2xl px-4 sm:px-6 flex items-center justify-center gap-1 sm:gap-2 transition-all duration-500 ${
            scrolled ? 'py-2' : 'py-2.5'
          }`}
          style={{
            background: scrolled ? 'rgba(10,5,0,0.92)' : 'rgba(10,5,0,0.68)',
            willChange: 'transform',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          {/* ॐ logo icon — centered with links */}
          <button
            onClick={() => scrollTo('#home')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-gold-400 to-saffron-600 flex items-center justify-center text-dark-500 font-bold text-sm sm:text-base flex-shrink-0 mr-1 sm:mr-2"
            aria-label="Home"
          >
            ॐ
          </button>

          {/* Desktop nav links — centered */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {settings.navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3 xl:px-4 py-2 font-cinzel text-sm tracking-wider transition-all duration-300 rounded-lg ${
                      isActive ? 'text-gold-400' : 'text-ivory-500 hover:text-gold-400'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg glass-gold"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Donate — centered in row */}
          <button
            onClick={() => scrollTo('#donation')}
            className="hidden sm:block btn-primary text-xs sm:text-sm py-2 px-3 sm:px-5 ml-1 sm:ml-2"
          >
            Donate Now
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden glass p-2 rounded-xl text-gold-400 ml-1"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span className="block h-0.5 bg-current rounded" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} />
              <motion.span className="block h-0.5 bg-current rounded" animate={{ opacity: menuOpen ? 0 : 1 }} />
              <motion.span className="block h-0.5 bg-current rounded" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[48] lg:hidden"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-20 left-3 right-3 z-[49] glass rounded-2xl p-5 lg:hidden"
              style={{ background: 'rgba(10,5,0,0.97)' }}
            >
              <ul className="space-y-1">
                {settings.navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className={`w-full text-left px-4 py-3.5 font-cinzel text-base tracking-wider rounded-xl transition-all duration-200 ${
                          isActive ? 'text-gold-400 glass-gold' : 'text-ivory-300 hover:text-gold-400 hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className="pt-3 mt-2 border-t border-gold-900/30">
                <button onClick={() => scrollTo('#donation')} className="w-full btn-primary text-center py-3">
                  Donate Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
