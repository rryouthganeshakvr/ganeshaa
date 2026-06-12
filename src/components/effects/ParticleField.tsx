import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  symbol: string
  colorIdx: number
}

const SYMBOLS = ['ఓం', '✦', '◆', '✧']
const COLORS = [
  'rgba(212,175,55,',
  'rgba(255,215,0,',
  'rgba(232,100,10,',
]

const MAX_PARTICLES = 8

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    let resizeTimer: ReturnType<typeof setTimeout>
    const resize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        w = window.innerWidth
        h = window.innerHeight
        canvas.width = w
        canvas.height = h
      }, 200)
    }
    window.addEventListener('resize', resize, { passive: true })

    const createParticle = (): Particle => ({
      x: Math.random() * w,
      y: h + 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.6 + 0.25),
      size: Math.random() * 12 + 7,
      opacity: 0,
      life: 0,
      maxLife: Math.random() * 180 + 140,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      colorIdx: Math.floor(Math.random() * COLORS.length),
    })

    for (let i = 0; i < 5; i++) {
      const p = createParticle()
      p.y = Math.random() * h
      p.life = Math.random() * p.maxLife
      particlesRef.current.push(p)
    }

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw)
      frameRef.current++
      // ~30fps: skip every other frame
      if (frameRef.current % 2 !== 0) return

      ctx.clearRect(0, 0, w, h)

      if (particlesRef.current.length < MAX_PARTICLES && Math.random() < 0.015) {
        particlesRef.current.push(createParticle())
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++
        p.x += p.vx
        p.y += p.vy

        const progress = p.life / p.maxLife
        if (progress < 0.1) {
          p.opacity = progress / 0.1
        } else if (progress > 0.8) {
          p.opacity = (1 - progress) / 0.2
        } else {
          p.opacity = 1
        }

        const alpha = p.opacity * 0.45
        ctx.globalAlpha = alpha
        ctx.font = `${p.size}px serif`
        ctx.fillStyle = `${COLORS[p.colorIdx]}${alpha})`
        ctx.fillText(p.symbol, p.x, p.y)

        return p.life < p.maxLife && p.y > -30
      })

      ctx.globalAlpha = 1
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
