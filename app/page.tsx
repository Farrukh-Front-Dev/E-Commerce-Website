'use client'

import { HeroSection } from '@/features/landing/components/hero-section'
import { FeaturesSection } from '@/features/landing/components/features-section'
import { StatsSection } from '@/features/landing/components/stats-section'
import { CategoriesSection } from '@/features/landing/components/categories-section'
import { CtaSection } from '@/features/landing/components/cta-section'
import Dither from '@/components/Deither'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Full Page Dither Background */}
      <div className="fixed inset-0 w-full h-full -z-10 opacity-20">
        <Dither
          waveSpeed={0.02}
          waveFrequency={2.5}
          waveAmplitude={0.35}
          waveColor={[0.06, 0.73, 0.51]}
          colorNum={8}
          pixelSize={2}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={1.2}
        />
      </div>

      {/* Gradient Overlay for better readability */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/95 via-background/90 to-background/95 pointer-events-none" />

      {/* Content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CategoriesSection />
      <CtaSection />
    </div>
  )
}
