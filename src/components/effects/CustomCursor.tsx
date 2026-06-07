import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const x = useSpring(mouseX, { damping: 26, stiffness: 200, mass: 0.6 })
  const y = useSpring(mouseY, { damping: 26, stiffness: 200, mass: 0.6 })

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return
    setIsDesktop(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      setIsHovering(!!el.closest('a, button, [role="button"], label, .cursor-pointer'))
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY])

  if (!isDesktop) return null

  return (
    <>
      {/* Outer soft divine glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9990,
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(232,100,10,0.08) 40%, transparent 70%)',
          filter: 'blur(18px)',
        }}
        animate={{
          width: isHovering ? 160 : 120,
          height: isHovering ? 160 : 120,
          opacity: isHovering ? 1 : 0.75,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Inner bright glow core */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9991,
          background: 'radial-gradient(circle, rgba(255,215,0,0.55) 0%, rgba(212,175,55,0.28) 45%, transparent 70%)',
          filter: 'blur(6px)',
        }}
        animate={{
          width: isHovering ? 52 : 36,
          height: isHovering ? 52 : 36,
          opacity: isHovering ? 1 : 0.85,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Tiny bright center spark */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9992,
          background: 'radial-gradient(circle, #fff 0%, #FFD700 50%, rgba(212,175,55,0) 100%)',
          boxShadow: isHovering
            ? '0 0 16px 4px rgba(255,215,0,0.9), 0 0 32px 8px rgba(212,175,55,0.5)'
            : '0 0 10px 3px rgba(255,215,0,0.75), 0 0 22px 6px rgba(212,175,55,0.35)',
        }}
        animate={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          opacity: 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
