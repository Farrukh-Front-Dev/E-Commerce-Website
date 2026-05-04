'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BorderGlow } from '@/components/BorderGlow'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function CtaSection() {
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
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <BorderGlow glowSize={300}>
            <Card className="relative overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border-0">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(white,transparent_85%)] dark:bg-grid-slate-700/25" />
            
            <CardContent className="relative pt-16 pb-16 md:pt-20 md:pb-20 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Start Shopping Today
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join thousands of happy customers. Discover premium products at unbeatable prices.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/products">
                  <Button size="lg" className="text-lg px-12 h-14 shadow-xl hover:shadow-2xl transition-all group">
                    Explore All Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          </BorderGlow>
        </div>
      </div>
    </section>
  )
}
