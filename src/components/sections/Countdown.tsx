import { useEffect, useState } from 'react'
import { countdownContent } from '../../content/countdown'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

const units = ['Days', 'Hours', 'Minutes', 'Seconds'] as const

export function Countdown() {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(countdownContent.targetDate))

  useEffect(() => {
    if (!countdownContent.enabled) return
    const timer = setInterval(() => setTime(getTimeLeft(countdownContent.targetDate)), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!countdownContent.enabled || time.expired) return null

  const values = [time.days, time.hours, time.minutes, time.seconds]

  return (
    <section className="py-12 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 65%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-700/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-700/30 to-transparent" />

      <div className="container-custom relative z-10 text-center">
        <p className="font-cinzel text-gold-500 text-xs tracking-[0.4em] uppercase mb-2">
          {countdownContent.subtitle}
        </p>
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-ivory-200 mb-8">
          {countdownContent.festivalName}
        </h2>

        <div className="flex items-center justify-center gap-3 sm:gap-5">
          {units.map((label, i) => (
            <div key={label}>
              <div className="glass-gold rounded-2xl px-4 sm:px-7 py-4 sm:py-5 text-center min-w-[68px] sm:min-w-[90px]">
                <p className="font-cinzel text-3xl sm:text-5xl font-black text-gradient-gold tabular-nums leading-none">
                  {String(values[i]).padStart(2, '0')}
                </p>
                <p className="font-inter text-[9px] sm:text-[10px] text-ivory-600 tracking-[0.25em] uppercase mt-2">
                  {label}
                </p>
              </div>
              {i < units.length - 1 && (
                <span className="hidden sm:block text-gold-600 text-2xl font-bold mt-[-8px] mx-1 select-none">:</span>
              )}
            </div>
          ))}
        </div>

        <p className="font-cormorant text-ivory-600 italic text-base mt-6">
          ॐ गं गणपतये नमः ॐ
        </p>
      </div>
    </section>
  )
}
