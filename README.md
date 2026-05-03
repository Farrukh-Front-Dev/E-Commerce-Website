# E-Commerce Application

A production-grade e-commerce application built with modern technologies following Next.js 16 best practices.

## Tech Stack

- **Next.js 16.2.4** (App Router with Server Components)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Styling)
- **shadcn/ui** (UI Components)
- **TanStack Query** (Client-side data fetching)
- **Zustand** (Client state - cart)
- **React Hook Form + Zod** (Forms and validation)
- **DummyJSON API** (Data source)

## Architecture Highlights

### Server vs Client Components

**Server Components** (Default):
- Product listing page (`/products`)
- Product detail page (`/products/[id]`)
- Benefits: SEO, faster initial load, automatic code splitting

**Client Components** (When needed):
- Cart page (needs Zustand state)
- Interactive components (search, filters, buttons)
- Components with `useState`, `useEffect`, or browser APIs

### State Management Strategy

- **Server State**: Products, categories (fetched in Server Components or React Query in Client Components)
- **Client State**: Shopping cart (Zustand with localStorage persistence)
- **Form State**: React Hook Form (isolated to form components)

### Key Architectural Decisions

1. **Server-First Approach**: Pages are Server Components by default for better performance and SEO
2. **Proper Hydration**: Cart uses `useMounted` hook to prevent SSR/CSR mismatches
3. **Error Boundaries**: Each route has error.tsx for graceful error handling
4. **Loading States**: Proper streaming with loading.tsx files
5. **Feature-Based Structure**: Code organized by feature, not by type

## Folder Structure

```
/app
  /products
    /[id]
      /page.tsx              # Server Component
      /loading.tsx           # Loading UI
      /error.tsx             # Error boundary
      /not-found.tsx         # 404 page
    /page.tsx                # Server Component
    /loading.tsx
    /error.tsx
  /cart
    /page.tsx                # Client Component (needs cart state)
  /layout.tsx
  /page.tsx

/features
  /products
    /components
      /product-card.tsx      # Client Component (interactive)
      /add-to-cart-button.tsx
      /search-bar.tsx
      /category-filter.tsx
      /pagination.tsx
      /product-skeleton.tsx
    /hooks
      /use-products.ts       # React Query hooks
    /api
      /products.ts           # API functions
  /cart
    /components
      /cart-item.tsx
      /cart-button.tsx
    /store
      /cart-store.ts         # Zustand store
  /auth
    /api
      /auth.ts

/shared
  /components
    /header.tsx
    /providers.tsx           # React Query provider
  /hooks
    /use-debounce.ts
    /use-mounted.ts          # Hydration helper
  /lib
    /api-client.ts           # Centralized API client
  /types
    /index.ts                # Shared TypeScript types

/components/ui                # shadcn/ui components
```

## Features

✅ Product listing with server-side rendering
✅ Product detail pages with SSR
✅ Search with debounce (500ms)
✅ Category filtering
✅ Pagination (limit/skip)
✅ Shopping cart with persistence
✅ Proper hydration handling
✅ Loading states with Suspense
✅ Error boundaries
✅ Type-safe API layer
✅ Responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Code Quality Principles

- ✅ Server Components by default
- ✅ Client Components only when needed
- ✅ Strict TypeScript (no `any`)
- ✅ Feature-based architecture
- ✅ Separation of server/client state
- ✅ Custom hooks for reusability
- ✅ Centralized API client
- ✅ Proper error handling
- ✅ Loading states with streaming

## Performance Optimizations

- Server-side rendering for better SEO and initial load
- React Query caching (5-minute stale time)
- Debounced search (500ms)
- Image optimization with Next.js Image
- Suspense boundaries for streaming
- Proper hydration to prevent mismatches

## License

MIT

