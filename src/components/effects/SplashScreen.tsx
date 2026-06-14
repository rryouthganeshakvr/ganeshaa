import { useEffect, useState } from 'react'

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800)
    const t2 = setTimeout(onDone, 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-500"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: fading ? 'none' : 'all' }}
    >
      <div className="text-center select-none">
        <div
          className="font-cinzel text-[96px] leading-none text-gold-400 mb-6"
          style={{ textShadow: '0 0 60px rgba(212,175,55,0.7)', animation: 'pulse 1.5s ease-in-out infinite' }}
        >
          ॐ
        </div>
        <p className="font-cinzel text-xl font-bold text-ivory-200 tracking-[0.2em] mb-1">
          Round Ramalayam Youth
        </p>
        <p className="font-inter text-ivory-600 text-xs tracking-[0.5em] uppercase mb-8">
          Kovvur · Est. 2004
        </p>
        <p className="font-cinzel text-xl font-bold text-ivory-200 tracking-[0.2em] mb-1">
          A Legacy of Devotion & Celebration
        </p>
        <div className="w-48 h-px bg-gold-900/40 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-saffron-500 rounded-full origin-left"
            style={{ animation: 'splashBar 1.8s ease-out forwards' }}
          />
        </div>
      </div>
    </div>
  )
}
