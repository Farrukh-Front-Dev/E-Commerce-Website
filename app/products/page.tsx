import { Suspense } from 'react'
import { productsApi } from '@/features/products/api/products'
import { ProductCard } from '@/features/products/components/product-card'
import { ProductSkeleton } from '@/features/products/components/product-skeleton'
import { SearchBar } from '@/features/products/components/search-bar'
import { CategoryFilter } from '@/features/products/components/category-filter'
import { Pagination } from '@/features/products/components/pagination'
import { Separator } from '@/components/ui/separator'

interface PageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    skip?: string
  }>
}

async function ProductsList({ searchParams }: { searchParams: Awaited<PageProps['searchParams']> }) {
  const limit = 20
  const skip = Number(searchParams.skip) || 0
  const q = searchParams.q
  const category = searchParams.category

  const data = await productsApi.getProducts({ limit, skip, q, category })

  if (data.products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">No products found.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{skip + 1}-{Math.min(skip + limit, data.total)}</span> of <span className="font-medium text-foreground">{data.total}</span> products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index === 0} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentSkip={skip}
        limit={limit}
        total={data.total}
        hasMore={skip + limit < data.total}
        hasPrevious={skip > 0}
      />
    </div>
  )
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <div className="container py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground text-lg">
            Discover our curated collection of quality products
          </p>
        </div>
        
        <Separator />

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <SearchBar />
          </div>
          <CategoryFilter />
        </div>
      </div>

      {/* Products List */}
      <Suspense
        key={JSON.stringify(params)}
        fallback={
          <div className="space-y-8">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <ProductsList searchParams={params} />
      </Suspense>
    </div>
  )
}
