# E-Commerce Application

Modern, production-grade e-commerce application built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.4 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: 
  - Zustand (client state: auth, cart, orders)
  - TanStack Query (server state)
- **Forms**: React Hook Form + Zod validation
- **API**: DummyJSON (demo API)
- **Theme**: next-themes (dark/light mode)

## ✨ Features

### Core E-Commerce
- ✅ Product browsing with search, filters, and pagination
- ✅ Product detail pages with image galleries
- ✅ Shopping cart with quantity management
- ✅ Stock validation and inventory checks
- ✅ User authentication (login/register)
- ✅ Protected routes
- ✅ User profile management
- ✅ Order history with local storage
- ✅ Complete checkout flow with validation
- ✅ Toast notifications for user feedback

### UI/UX
- ✅ 3D cylinder scroll animation on landing page
- ✅ Dark/Light mode with system preference detection
- ✅ Responsive design (mobile-first)
- ✅ Loading skeletons for all async operations
- ✅ Error boundaries and error states
- ✅ Empty states with clear CTAs
- ✅ Success feedback throughout
- ✅ Smooth transitions and animations

### Architecture
- ✅ Feature-based folder structure
- ✅ Server Components by default
- ✅ Client Components only when needed
- ✅ Proper SSR/CSR separation
- ✅ Hydration-safe state management
- ✅ Type-safe API client with retry logic
- ✅ Token expiration handling
- ✅ Image optimization with Next.js Image

## 📁 Project Structure

```
/app                    # Next.js App Router pages
  /products            # Product listing & details
  /cart                # Shopping cart
  /checkout            # Checkout flow
  /orders              # Order history
  /profile             # User profile
  /login               # Authentication
  /register            # User registration
  
/features              # Feature modules
  /auth                # Authentication logic
  /cart                # Cart management
  /products            # Product catalog
  /orders              # Order management
  /checkout            # Checkout flow
  
/shared                # Shared utilities
  /components          # Reusable UI components
  /hooks               # Custom React hooks
  /lib                 # Utilities (API client, etc.)
  /types               # TypeScript type definitions
  
/components/ui         # shadcn/ui components
```

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Demo Credentials

```
Username: emilys
Password: emilyspass
```

## 🎨 Key Features Showcase

### 1. Landing Page
- Unique 3D cylinder scroll animation
- Hero section with CTAs
- Feature cards with icons
- Statistics section
- Final call-to-action

### 2. Product Catalog
- Server-side rendering for SEO
- Real-time search with debounce
- Category filtering
- Pagination
- Loading skeletons

### 3. Shopping Cart
- Persistent cart (localStorage)
- Stock validation
- Quantity controls
- Real-time total calculation
- Toast notifications

### 4. Checkout Flow
- Form validation (React Hook Form + Zod)
- Stock validation before checkout
- Loading states during processing
- Success confirmation screen
- Error handling with retry

### 5. Order Management
- Local order storage
- Order status tracking
- Full order details
- Shipping address display
- Success notifications

## 🏗️ Architecture Decisions

### State Management Strategy
- **Zustand**: Client-side state (cart, auth, orders) with persistence
- **React Query**: Server state with caching and automatic refetching
- **Separation**: Clear boundary between client and server state

### Component Architecture
- **Server Components**: Default for all pages (products, orders, etc.)
- **Client Components**: Only for interactivity (forms, cart, theme toggle)
- **Hydration Safety**: `useMounted` hook prevents SSR/CSR mismatches

### Data Flow
```
DummyJSON API → React Query → Server Components → UI
User Actions → Zustand Store → localStorage → UI
```

### Error Handling
- API client with retry logic (exponential backoff)
- User-friendly error messages
- Error boundaries at route level
- Graceful degradation

## 📊 Performance Optimizations

- ✅ Server-side rendering for initial load
- ✅ Image optimization with Next.js Image
- ✅ Priority loading for LCP images
- ✅ Code splitting by route
- ✅ React Query caching (5-minute stale time)
- ✅ Debounced search (500ms)
- ✅ Lazy loading for images

## 🎯 Portfolio Highlights

### What Makes This Project Stand Out

1. **Production-Grade Architecture**
   - Feature-based structure
   - Proper separation of concerns
   - Type-safe throughout

2. **Real-World Patterns**
   - Stock validation
   - Token expiration handling
   - Retry logic with backoff
   - Optimistic UI updates

3. **Attention to Detail**
   - Loading states everywhere
   - Error handling with recovery
   - Empty states with CTAs
   - Success feedback

4. **Modern Stack**
   - Next.js 16 App Router
   - Server Components
   - TypeScript strict mode
   - Tailwind CSS + shadcn/ui

5. **Unique Features**
   - 3D cylinder scroll animation
   - Dark mode support
   - Toast notification system
   - Local order management

## 🚧 Known Limitations (By Design)

This is a **frontend portfolio project** using DummyJSON as a demo API:

1. **Authentication**: Demo auth with localStorage (not production-secure)
2. **Orders**: Stored locally (not in database)
3. **Cart**: Browser-only (no cross-device sync)
4. **Payment**: Simulated (no real payment gateway)
5. **Inventory**: Validation exists but no real inventory system

**These limitations are acceptable for a frontend demonstration.**

## 🔮 Future Improvements

If this were to become a production system:

### Phase 1: Backend Integration
- Real authentication with httpOnly cookies
- Database for users, products, orders
- Server-side cart management
- Payment gateway integration (Stripe)
- Inventory management system

### Phase 2: Enhanced Features
- Product reviews and ratings
- Wishlist functionality
- Order tracking timeline
- Product comparison
- Advanced search filters

### Phase 3: Internationalization
- Multi-language support (i18n with next-intl)
- Currency conversion
- Localized content

### Phase 4: Advanced Features
- Real-time notifications
- Email confirmations
- Admin dashboard
- Analytics integration
- A/B testing

## 📝 Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint configuration
- ✅ Consistent code style
- ✅ Component composition
- ✅ Custom hooks for reusability
- ✅ Proper error boundaries
- ✅ Accessibility basics (ARIA labels, semantic HTML)

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- Next.js 16 App Router and Server Components
- TypeScript and type-safe development
- State management (Zustand + React Query)
- Form handling and validation
- API integration and error handling
- Responsive design and dark mode
- Performance optimization
- User experience design

## 📄 License

This is a portfolio project for demonstration purposes.

## 👤 Author

Built as a portfolio project to demonstrate modern React/Next.js development skills.

---

**Note**: This project uses DummyJSON API for demonstration. It showcases frontend architecture, UI/UX design, and modern React patterns without requiring a backend setup.
