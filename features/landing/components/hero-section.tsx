'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, ShoppingBag, Truck, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div 
            className={`flex flex-col items-center text-center space-y-10 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Promo Badge */}
            <Badge 
              variant="secondary" 
              className="px-5 py-2.5 text-sm font-semibold shadow-sm border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors animate-in fade-in slide-in-from-top-4 duration-700"
            >
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Get 10% off your first order
            </Badge>
            
            {/* Main Headline */}
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Shop Quality
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Discover thousands of premium products with fast delivery and secure checkout
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link href="/products">
                <Button size="lg" className="text-lg px-12 h-14 shadow-lg hover:shadow-xl transition-all group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-shadow">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground text-sm">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-shadow">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">50K+ Customers</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-shadow">
                <Truck className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
