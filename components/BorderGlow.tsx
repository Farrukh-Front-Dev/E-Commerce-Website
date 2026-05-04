'use client'

import { useEffect, useRef, useState } from 'react'

interface BorderGlowProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  borderRadius?: string
}

export function BorderGlow({
  children,
  className = '',
  glowColor = 'rgba(var(--primary-rgb), 0.5)',
  glowSize = 200,
  borderRadius = '1rem',
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        borderRadius,
      }}
    >
      {/* Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 80%)`,
          borderRadius,
        }}
      />
      
      {/* Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          borderRadius,
          padding: '2px',
          background: `radial-gradient(${glowSize * 0.8}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
