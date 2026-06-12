import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { countdownContent } from '../../content/countdown'

function getFestivalState(): 'before' | 'active' | 'after' {
  const now = Date.now()
  const start = new Date(countdownContent.targetDate).getTime()
  const end = new Date(countdownContent.festivalEndDate).getTime()
  if (now < start) return 'before'
  if (now <= end) return 'active'
  return 'after'
}

function getFestivalDays() {
  const start = new Date(countdownContent.targetDate).getTime()
  const end = new Date(countdownContent.festivalEndDate).getTime()
  return Math.round((end - start) / 86400000) + 1
}

function getDayOfFestival() {
  const now = Date.now()
  const start = new Date(countdownContent.targetDate).getTime()
  return Math.min(Math.floor((now - start) / 86400000) + 1, getFestivalDays())
}

const SPARKS = [
  { x: 0,    y: -140, e: '✨' },
  { x: 99,   y: -99,  e: '🌟' },
  { x: 140,  y: 0,    e: '✨' },
  { x: 99,   y: 99,   e: '🎉' },
  { x: 0,    y: 140,  e: '✨' },
  { x: -99,  y: 99,   e: '🌟' },
  { x: -140, y: 0,    e: '✨' },
  { x: -99,  y: -99,  e: '🎊' },
  { x: 50,   y: -160, e: '⭐' },
  { x: -50,  y: -160, e: '⭐' },
  { x: 160,  y: -50,  e: '🌸' },
  { x: 160,  y: 50,   e: '🌸' },
]

export function FestivalBlast() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!countdownContent.enabled || getFestivalState() !== 'active') return
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const day = getDayOfFestival()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
          onClick={() => setVisible(false)}
        >
          {/* Burst particles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {SPARKS.map((s, i) => (
              <motion.span
                key={i}
                className="absolute text-xl sm:text-2xl select-none"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ x: s.x, y: s.y, opacity: [0, 1, 1, 0], scale: [0, 1.5, 1.2, 0] }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
              >
                {s.e}
              </motion.span>
            ))}
          </div>

          {/* Card */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="glass-gold rounded-3xl p-8 md:p-12 text-center max-w-sm w-full relative"
            style={{ boxShadow: '0 0 60px rgba(212,175,55,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pulsing Om */}
            <motion.p
              className="font-cinzel text-7xl text-gold-400 leading-none mb-3 select-none"
              animate={{ textShadow: [
                '0 0 20px rgba(212,175,55,0.4)',
                '0 0 60px rgba(212,175,55,1)',
                '0 0 20px rgba(212,175,55,0.4)',
              ]}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ॐ
            </motion.p>

            <p className="font-inter text-ivory-600 text-[10px] tracking-[0.35em] uppercase mb-1">
              {countdownContent.festivalName}
            </p>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-gradient-gold leading-tight mb-2">
              Celebrations<br />Have Begun!
            </h2>
            <p className="font-cormorant text-ivory-400 italic text-lg mb-1">
              Day {day} of {getFestivalDays()}
            </p>
            <p className="font-inter text-ivory-600 text-xs mb-7">
              Round Ramalayam Youth, Kovvur
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setVisible(false)
                  setTimeout(() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }), 200)
                }}
                className="btn-primary text-sm py-2.5 px-5"
              >
                View Schedule
              </button>
              <button
                onClick={() => setVisible(false)}
                className="glass px-5 py-2.5 rounded-xl text-ivory-400 hover:text-gold-400 font-cinzel text-sm transition-colors"
              >
                Continue →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
