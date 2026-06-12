import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const x = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.5 })
  const y = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.5 })

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
      {/* Soft glow halo — scale instead of width/height (GPU-only, no layout) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: 90,
          height: 90,
          zIndex: 9990,
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(232,100,10,0.07) 50%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 1.44 : 1,
          opacity: isHovering ? 1 : 0.7,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Bright center spark — scale only, static box-shadow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: 7,
          height: 7,
          zIndex: 9991,
          background: 'radial-gradient(circle, #fff 0%, #FFD700 60%, transparent 100%)',
          boxShadow: '0 0 8px 2px rgba(255,215,0,0.6)',
          willChange: 'transform',
        }}
        animate={{ scale: isHovering ? 1.57 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
