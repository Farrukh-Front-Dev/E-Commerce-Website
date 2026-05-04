'use client'

import { Card, CardContent } from '@/components/ui/card'
import { BorderGlow } from '@/components/BorderGlow'
import { Truck, Shield, Package } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const features = [
  {
    icon: Truck,
    title: 'Fast & Free Delivery',
    description: 'Free shipping on orders over $100. Get your products in 2-3 days with real-time tracking.',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Bank-level SSL encryption. Your payment information is always protected and secure.',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Package,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not satisfied? Get your money back, no questions asked.',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Why Shop With Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a seamless shopping experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <BorderGlow glowSize={250}>
                  <Card className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20 h-full border-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="relative pt-10 pb-10 text-center space-y-5">
                    <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-10 w-10 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
                </BorderGlow>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
