import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container py-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Welcome to E-Shop
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover amazing products at great prices. Built with modern
          technologies for the best shopping experience.
        </p>
        <div className="flex gap-4">
          <Link href="/products">
            <Button size="lg">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
