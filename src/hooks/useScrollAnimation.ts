import { useInView } from 'react-intersection-observer'

export function useScrollAnimation(threshold = 0.15) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: '-60px',
  })

  return { ref, inView }
}
