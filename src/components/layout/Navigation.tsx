import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { settings } from '../../content/settings'
import { livestreamContent } from '../../content/livestream'

interface Props {
  onOpenSeva: () => void
  bannerShown?: boolean
}

export function Navigation({ onOpenSeva, bannerShown = false }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    ...settings.navLinks,
    ...(livestreamContent.enabled ? [{ label: '🔴 Live', href: '#livestream' }] : []),
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = navLinks.map((l) => l.href.replace('#', ''))
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

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const bannerOffset = bannerShown ? 40 : 0

  return (
    <>
      {/* ── MOBILE NAV BAR (full-width, below banner) ── */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="lg:hidden fixed left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{
          top: bannerOffset,
          height: 52,
          background: scrolled ? 'rgba(10,5,0,0.96)' : 'rgba(10,5,0,0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          transition: 'background 0.3s ease, top 0.3s ease',
        }}
      >
        {/* ॐ home button */}
        <button
          onClick={() => scrollTo('#home')}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-saffron-600 flex items-center justify-center text-dark-500 font-bold text-sm flex-shrink-0"
          aria-label="Home"
        >
          ॐ
        </button>

        {/* Org name — center */}
        <button
          onClick={() => scrollTo('#home')}
          className="font-cinzel font-bold text-gold-400 text-xs tracking-wider truncate px-2"
        >
          Round Ramalayam Youth
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gold-400 flex-shrink-0"
          aria-label="Toggle menu"
        >
          <div className="w-4 h-3.5 flex flex-col justify-between">
            <motion.span className="block h-0.5 bg-current rounded" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} />
            <motion.span className="block h-0.5 bg-current rounded" animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.span className="block h-0.5 bg-current rounded" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} />
          </div>
        </button>
      </motion.div>

      {/* ── DESKTOP FLOATING PILL (hidden on mobile) ── */}
      <div
        className="hidden lg:flex fixed left-0 right-0 justify-center z-50 pointer-events-none"
        style={{ top: bannerShown ? 52 : 12, transition: 'top 0.3s ease' }}
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto w-auto"
        >
          <div
            className={`glass rounded-2xl px-6 flex items-center justify-center gap-2 transition-all duration-500 ${
              scrolled ? 'py-2' : 'py-2.5'
            }`}
            style={{
              background: scrolled ? 'rgba(10,5,0,0.92)' : 'rgba(10,5,0,0.68)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          >
            <button
              onClick={() => scrollTo('#home')}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-saffron-600 flex items-center justify-center text-dark-500 font-bold text-base flex-shrink-0 mr-2"
              aria-label="Home"
            >
              ॐ
            </button>

            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => {
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

            <button
              onClick={onOpenSeva}
              className="btn-primary text-sm py-2 px-5 ml-2"
            >
              Serve with Love
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[48] lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', top: bannerOffset + 52 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 right-0 z-[49] lg:hidden"
              style={{
                top: bannerOffset + 52,
                background: 'rgba(10,5,0,0.98)',
                borderBottom: '1px solid rgba(212,175,55,0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <ul className="px-4 py-3 space-y-0.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className={`w-full text-left px-4 py-3 font-cinzel text-sm tracking-wider rounded-xl transition-all duration-200 flex items-center justify-between ${
                          isActive
                            ? 'text-gold-400 glass-gold'
                            : 'text-ivory-400 hover:text-gold-400 hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                        {isActive && <span className="text-gold-500 text-xs">●</span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className="px-4 pb-4">
                <button
                  onClick={() => { onOpenSeva(); setMenuOpen(false) }}
                  className="w-full btn-primary text-center py-3 text-sm"
                >
                  Serve with Love
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
