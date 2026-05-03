import { Suspense } from 'react'
import { productsApi } from '@/features/products/api/products'
import { ProductCard } from '@/features/products/components/product-card'
import { ProductSkeleton } from '@/features/products/components/product-skeleton'
import { SearchBar } from '@/features/products/components/search-bar'
import { CategoryFilter } from '@/features/products/components/category-filter'
import { Pagination } from '@/features/products/components/pagination'

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
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index === 0} />
        ))}
      </div>

      <Pagination
        currentSkip={skip}
        limit={limit}
        total={data.total}
        hasMore={skip + limit < data.total}
        hasPrevious={skip > 0}
      />
    </>
  )
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <SearchBar />
            <CategoryFilter />
          </div>
        </div>

        <Suspense
          key={JSON.stringify(params)}
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProductsList searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
