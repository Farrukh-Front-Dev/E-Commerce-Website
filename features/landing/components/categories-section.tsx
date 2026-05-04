'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BorderGlow } from '@/components/BorderGlow'
import { Tag, Flower2, Home, ShoppingCart, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const categories = [
  {
    name: 'Beauty',
    slug: 'beauty',
    description: 'Cosmetics & Skincare',
    icon: Tag,
    gradient: 'from-gray-50 to-background dark:from-gray-900/20 dark:to-background',
    iconBg: 'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverGradient: 'from-emerald-500/5 to-transparent',
  },
  {
    name: 'Fragrances',
    slug: 'fragrances',
    description: 'Perfumes & Scents',
    icon: Flower2,
    gradient: 'from-gray-50 to-background dark:from-gray-900/20 dark:to-background',
    iconBg: 'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverGradient: 'from-emerald-500/5 to-transparent',
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Home & Living',
    icon: Home,
    gradient: 'from-gray-50 to-background dark:from-gray-900/20 dark:to-background',
    iconBg: 'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverGradient: 'from-emerald-500/5 to-transparent',
  },
  {
    name: 'Groceries',
    slug: 'groceries',
    description: 'Food & Essentials',
    icon: ShoppingCart,
    gradient: 'from-gray-50 to-background dark:from-gray-900/20 dark:to-background',
    iconBg: 'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverGradient: 'from-emerald-500/5 to-transparent',
  },
]

export function CategoriesSection() {
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
    <section ref={sectionRef} className="w-full py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection across multiple categories
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={category.slug}
                  className={`transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <Link href={`/products?category=${category.slug}`} className="group block h-full">
                    <BorderGlow glowSize={200}>
                      <Card className={`relative overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full bg-linear-to-br ${category.gradient} border-0`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <CardContent className="relative pt-12 pb-12 text-center space-y-4">
                        <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${category.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-10 w-10 ${category.iconColor}`} />
                        </div>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </CardContent>
                    </Card>
                    </BorderGlow>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* View All Button */}
          <div 
            className={`text-center mt-12 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link href="/products">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 shadow-sm hover:shadow-md transition-all group">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
