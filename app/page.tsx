import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CylinderScroll } from '@/shared/components/cylinder-scroll'
import { ArrowRight, ShoppingBag, Truck, Shield, Star, Zap, Award, TrendingUp, Users, Clock, Gift } from 'lucide-react'

export default function HomePage() {
  const sections = [
    // Hero Section
    <div key="hero" className="w-full max-w-4xl mx-auto px-6">
      <div className="flex flex-col items-center text-center space-y-8 bg-background/95 backdrop-blur rounded-2xl p-12 shadow-2xl">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Welcome to the future of shopping
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Amazing Products at{' '}
          <span className="text-primary">Great Prices</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Shop from thousands of products with fast delivery, secure payments, 
          and the best customer service in the industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products">
            <Button size="lg" className="text-lg px-8">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>
    </div>,

    // Feature 1
    <Card key="feature1" className="w-full max-w-2xl mx-auto bg-background/95 backdrop-blur shadow-2xl">
      <CardContent className="pt-12 pb-12 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Truck className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Fast Delivery</h2>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          Free shipping on orders over $100. Get your products delivered in 2-3 days with real-time tracking.
        </p>
      </CardContent>
    </Card>,

    // Feature 2
    <Card key="feature2" className="w-full max-w-2xl mx-auto bg-background/95 backdrop-blur shadow-2xl">
      <CardContent className="pt-12 pb-12 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Secure Payment</h2>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          Your payment information is encrypted and secure with industry-standard SSL protection.
        </p>
      </CardContent>
    </Card>,

    // Feature 3
    <Card key="feature3" className="w-full max-w-2xl mx-auto bg-background/95 backdrop-blur shadow-2xl">
      <CardContent className="pt-12 pb-12 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Star className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Quality Products</h2>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          Curated selection of high-quality products from trusted brands worldwide.
        </p>
      </CardContent>
    </Card>,

    // Feature 4
    <Card key="feature4" className="w-full max-w-2xl mx-auto bg-background/95 backdrop-blur shadow-2xl">
      <CardContent className="pt-12 pb-12 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Clock className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">24/7 Support</h2>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          Our customer support team is always ready to help you with any questions or concerns.
        </p>
      </CardContent>
    </Card>,

    // Stats Section
    <div key="stats" className="w-full max-w-4xl mx-auto px-6">
      <Card className="bg-background/95 backdrop-blur shadow-2xl">
        <CardContent className="pt-12 pb-12">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground text-lg">Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted-foreground text-lg">Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground text-lg">Support</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>,

    // Feature 5
    <Card key="feature5" className="w-full max-w-2xl mx-auto bg-background/95 backdrop-blur shadow-2xl">
      <CardContent className="pt-12 pb-12 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <TrendingUp className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Best Prices</h2>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          Competitive prices with regular discounts, deals, and exclusive offers for members.
        </p>
      </CardContent>
    </Card>,

    // Feature 6
    <Card key="feature6" className="w-full max-w-2xl mx-auto bg-background/95 backdrop-blur shadow-2xl">
      <CardContent className="pt-12 pb-12 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Gift className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Easy Returns</h2>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          30-day hassle-free return policy. Not satisfied? Get your money back, no questions asked.
        </p>
      </CardContent>
    </Card>,

    // CTA Section
    <div key="cta" className="w-full max-w-4xl mx-auto px-6">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur shadow-2xl border-primary/20">
        <CardContent className="pt-16 pb-16 text-center space-y-8">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing deals today. 
            Sign up now and get 10% off your first order!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="text-lg px-8">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  ]

  return (
    <div className="min-h-screen">
      <CylinderScroll>
        {sections}
      </CylinderScroll>
    </div>
  )
}
