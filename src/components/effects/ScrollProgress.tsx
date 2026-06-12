import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setVisible(v > 0.02))
    return unsub
  }, [scrollYProgress])

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #D4AF37, #E8640A, #FFD700)',
      }}
    />
  )
}
