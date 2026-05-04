import { useEffect, useState } from 'react'

interface UseCounterOptions {
  end: number
  duration?: number
  start?: number
  enabled?: boolean
}

export function useCounter({ end, duration = 2000, start = 0, enabled = true }: UseCounterOptions) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!enabled) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(start + (end - start) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, start, enabled])

  return count
}
