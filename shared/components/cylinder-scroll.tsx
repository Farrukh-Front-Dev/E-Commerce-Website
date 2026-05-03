'use client'

import { useEffect, useRef, useState } from 'react'

interface CylinderScrollProps {
  children: React.ReactNode[]
}

export function CylinderScroll({ children }: CylinderScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = rect.height
      
      // Calculate scroll position relative to container
      const scrolledIntoView = -rect.top
      const totalScrollable = containerHeight - windowHeight
      
      if (scrolledIntoView < 0) {
        // Before container
        setCurrentIndex(0)
        setScrollProgress(0)
        return
      }
      
      if (scrolledIntoView > totalScrollable) {
        // After container
        setCurrentIndex(children.length - 1)
        setScrollProgress(1)
        return
      }
      
      // Calculate which section we're on
      const sectionHeight = totalScrollable / children.length
      const index = Math.floor(scrolledIntoView / sectionHeight)
      const sectionProgress = (scrolledIntoView % sectionHeight) / sectionHeight
      
      setCurrentIndex(Math.max(0, Math.min(children.length - 1, index)))
      setScrollProgress(sectionProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [children.length])

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${children.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="relative w-full"
          style={{
            perspective: '1500px',
            transformStyle: 'preserve-3d'
          }}
        >
          {children.map((child, index) => {
            const isActive = index === currentIndex
            const isPrevious = index === currentIndex - 1
            const isNext = index === currentIndex + 1
            
            let transform = ''
            let opacity = 0
            let zIndex = 0
            
            if (isActive) {
              // Current section - visible and transitioning
              if (scrollProgress < 0.5) {
                // First half - fully visible
                transform = 'translateZ(0px) rotateX(0deg)'
                opacity = 1
                zIndex = 10
              } else {
                // Second half - rotating out
                const rotateAmount = (scrollProgress - 0.5) * 2 * 90
                transform = `translateZ(-200px) rotateX(-${rotateAmount}deg)`
                opacity = 1 - (scrollProgress - 0.5) * 2
                zIndex = 10
              }
            } else if (isNext && scrollProgress >= 0.5) {
              // Next section - rotating in
              const rotateAmount = 90 - ((scrollProgress - 0.5) * 2 * 90)
              transform = `translateZ(-200px) rotateX(${rotateAmount}deg)`
              opacity = (scrollProgress - 0.5) * 2
              zIndex = 5
            } else if (isPrevious && scrollProgress < 0.5) {
              // Previous section - already rotated out
              transform = 'translateZ(-400px) rotateX(-90deg)'
              opacity = 0
              zIndex = 1
            } else {
              // Hidden sections
              if (index < currentIndex) {
                transform = 'translateZ(-400px) rotateX(-90deg)'
              } else {
                transform = 'translateZ(-400px) rotateX(90deg)'
              }
              opacity = 0
              zIndex = 0
            }
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center px-4"
                style={{
                  transform,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  transition: 'none',
                  pointerEvents: isActive && scrollProgress < 0.5 ? 'auto' : 'none'
                }}
              >
                {child}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
