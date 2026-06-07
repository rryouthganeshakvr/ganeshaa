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
}

const SYMBOLS = ['ఓం', '卐', '✦', '◆', '●', '✧']
const COLORS = [
  'rgba(212, 175, 55,',
  'rgba(255, 215, 0,',
  'rgba(232, 100, 10,',
  'rgba(255, 159, 58,',
]

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.random() * 14 + 8,
      opacity: 0,
      life: 0,
      maxLife: Math.random() * 200 + 150,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    })

    for (let i = 0; i < 12; i++) {
      const p = createParticle()
      p.y = Math.random() * canvas.height
      p.life = Math.random() * p.maxLife
      particlesRef.current.push(p)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (particlesRef.current.length < 15 && Math.random() < 0.02) {
        particlesRef.current.push(createParticle())
      }

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

        const colorIdx = Math.floor(p.life / 30) % COLORS.length
        const color = COLORS[colorIdx]
        ctx.save()
        ctx.globalAlpha = p.opacity * 0.5
        ctx.font = `${p.size}px serif`
        ctx.fillStyle = `${color} ${p.opacity * 0.5})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.symbol, p.x, p.y)
        ctx.restore()

        return p.life < p.maxLife && p.y > -30
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
