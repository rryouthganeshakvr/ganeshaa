import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Place your audio file at: public/audio/aarti.mp3
const AUDIO_SRC = '/audio/jai deva jai deva.mp3'

export function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!playing) {
      // First click — button click IS a user interaction, play always works here
      audio.muted = false
      audio.play()
        .then(() => { setPlaying(true); setMuted(false) })
        .catch(() => {})
    } else {
      // Already playing — toggle mute
      const next = !muted
      audio.muted = next
      setMuted(next)
    }
  }

  return (
    <div className="fixed left-6 safe-bottom z-40 flex flex-col items-center gap-2">
      <AnimatePresence>
        {playing && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="font-cinzel text-[9px] tracking-widest uppercase select-none"
            style={{ color: muted ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,1)' }}
          >
            {muted ? 'Muted' : 'Music'}
          </motion.span>
        )}
      </AnimatePresence>

      <div className="relative">
        {playing && !muted && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-gold-500 opacity-20" />
            <span
              className="absolute -inset-1.5 rounded-full animate-ping bg-gold-400 opacity-10"
              style={{ animationDelay: '0.4s' }}
            />
          </>
        )}

        <button
          onClick={toggle}
          aria-label={!playing ? 'Play devotional music' : muted ? 'Unmute' : 'Mute'}
          title={!playing ? 'Play Music' : muted ? 'Unmute' : 'Mute'}
          className="relative w-11 h-11 glass-gold rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            color: playing && !muted ? 'rgba(212,175,55,1)' : 'rgba(212,175,55,0.5)',
            boxShadow: playing && !muted
              ? '0 0 20px rgba(212,175,55,0.35)'
              : '0 0 16px rgba(212,175,55,0.15)',
          }}
        >
          {playing && !muted ? (
            /* Sound waves — playing */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : playing && muted ? (
            /* Speaker with x — muted but running */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
              <path d="M23 9l-6 6M17 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            /* Music note — not started */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
