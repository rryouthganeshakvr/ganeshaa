// 3 orbs (down from 5), blur 40px→12px, CSS animation instead of framer-motion
const orbs = [
  { id: 1, size: 360, x: '10%', y: '20%', color: 'rgba(212,175,55,0.07)', duration: 14 },
  { id: 2, size: 500, x: '72%', y: '12%', color: 'rgba(232,100,10,0.05)', duration: 18 },
  { id: 3, size: 420, x: '82%', y: '68%', color: 'rgba(255,215,0,0.05)',  duration: 16 },
]

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
            animation: `orbFloat ${orb.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
