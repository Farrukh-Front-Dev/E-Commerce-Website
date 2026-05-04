'use client'

import { Card, CardContent } from '@/components/ui/card'
import { BorderGlow } from '@/components/BorderGlow'
import { ShoppingBag, Users, Star, Package } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCounter } from '@/shared/hooks/use-counter'

interface StatItemProps {
  icon: React.ElementType
  value: number
  suffix?: string
  label: string
  color: string
  iconColor: string
  isVisible: boolean
}

function StatItem({ icon: Icon, value, suffix = '', label, color, iconColor, isVisible }: StatItemProps) {
  const count = useCounter({ end: value, duration: 2500, enabled: isVisible })
  const IconComponent = Icon as React.ComponentType<{ className?: string }>

  return (
    <div className="text-center space-y-4">
      <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <IconComponent className={`h-8 w-8 ${iconColor}`} />
      </div>
      <div>
        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  )
}

const stats = [
  {
    icon: ShoppingBag,
    value: 10000,
    suffix: '+',
    label: 'Products',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Happy Customers',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Star,
    value: 4.8,
    suffix: '/5',
    label: 'Average Rating',
    color: 'from-yellow-500/10 to-yellow-500/5',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: Package,
    value: 99,
    suffix: '%',
    label: 'Satisfaction Rate',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
]

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <BorderGlow glowSize={300}>
            <Card className="relative overflow-hidden shadow-xl bg-gradient-to-br from-background to-muted/20 border-0">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(white,transparent_85%)] dark:bg-grid-slate-700/25" />
            
            <CardContent className="relative pt-16 pb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Trusted by Thousands
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join our growing community of satisfied customers
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`transition-all duration-700 delay-${index * 100} ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <StatItem {...stat} isVisible={isVisible} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </BorderGlow>
        </div>
      </div>
    </section>
  )
}
