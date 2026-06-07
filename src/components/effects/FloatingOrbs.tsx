import { motion } from 'framer-motion'

interface Orb {
  id: number
  size: number
  x: string
  y: string
  color: string
  delay: number
  duration: number
}

const orbs: Orb[] = [
  { id: 1, size: 400, x: '10%', y: '20%', color: 'rgba(212,175,55,0.06)', delay: 0, duration: 12 },
  { id: 2, size: 600, x: '70%', y: '10%', color: 'rgba(232,100,10,0.05)', delay: 2, duration: 16 },
  { id: 3, size: 300, x: '50%', y: '60%', color: 'rgba(212,175,55,0.04)', delay: 4, duration: 10 },
  { id: 4, size: 500, x: '85%', y: '70%', color: 'rgba(255,215,0,0.04)', delay: 1, duration: 14 },
  { id: 5, size: 350, x: '20%', y: '80%', color: 'rgba(232,100,10,0.04)', delay: 3, duration: 18 },
]

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
