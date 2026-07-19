# Bharat Travel Club

A production-quality, full-stack group travel booking platform built with Next.js 14+, Supabase, and Tailwind CSS.

**Tagline:** Beach · Trek · Camp

## Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Database & Auth:** Supabase (Postgres, Row Level Security, Auth)
- **Styling:** Tailwind CSS + custom design system
- **Components:** Radix UI primitives + custom components
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Charts:** Recharts (admin dashboard)
- **Payment:** Abstracted behind `PaymentProvider` interface (Razorpay/Stripe ready)

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd bharat-travel-club
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration file:
   ```
   supabase/migrations/001_schema.sql
   ```
3. Enable **Auth** with Email/Password + Google OAuth

### 3. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Set Up Admin User

After signing up, manually set your role to `admin` in the Supabase SQL Editor:

```sql
UPDATE profiles SET role = 'admin' WHERE id = '<your-user-id>';
```

### 5. Seed Sample Data (Optional)

Run in SQL Editor to seed trips and blog posts.

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (home, trips, blog, legal)
│   ├── (auth)/            # Auth pages (login, signup, forgot-password)
│   ├── account/           # User account & booking history
│   ├── booking/           # Multi-step booking flow
│   ├── admin/             # Admin dashboard (sidebar layout)
│   └── api/               # API routes
├── components/
│   ├── ui/                # Shared primitives (Button, Card, Input, Dialog, etc.)
│   ├── layout/            # Header, Footer, AdminSidebar
│   └── features/          # TripCard, CategoryCard, BlogCard, ReviewCard, StatsStrip
├── lib/
│   ├── supabase/          # Client, Server, and Admin Supabase clients
│   ├── validations/       # Zod schemas
│   └── utils.ts           # Shared utilities
└── types/                 # TypeScript type definitions

supabase/
└── migrations/            # SQL migration files
```

## Routes

### Public
| Route | Description |
|-------|-------------|
| `/` | Home page with hero, categories, featured trips, stats, testimonials, blog |
| `/trips` | All trips listing |
| `/trips/[slug]` | Trip detail with itinerary, reviews, booking widget |
| `/category/[slug]` | Category landing (beach, trek, camp, couple) |
| `/about` | About us |
| `/contact` | Contact form |
| `/blog` | Travel blog |
| `/blog/[slug]` | Blog post |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms & conditions |
| `/refund-policy` | Refund policy |

### Auth
| Route | Description |
|-------|-------------|
| `/login` | Sign in (email + Google OAuth) |
| `/signup` | Create account |
| `/forgot-password` | Reset password |

### Account
| Route | Description |
|-------|-------------|
| `/account` | Profile, booking history, wishlist |

### Booking
| Route | Description |
|-------|-------------|
| `/booking/[tripId]` | Multi-step booking (date → travelers → review → payment) |
| `/booking/[tripId]/confirm` | Booking confirmation |

### Admin (requires `role = 'admin'`)
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard with stats |
| `/admin/trips` | Manage trips (CRUD) |
| `/admin/bookings` | View all bookings |
| `/admin/users` | View registered users |
| `/admin/blog` | Manage blog posts |

## Design System

Derived from the brand's round-stamp logo with an Ashoka Chakra motif:

- **Primary:** Deep teal `#0E6E6B`
- **Accent:** Saffron/gold `#E8A23D`
- **Background secondary:** Warm cream `#F3E6C8`
- **Page background:** Off-white `#FAF7F1`
- **Text:** Near-black ink `#1B2A28`
- **Typography:** Playfair Display (serif, headings) + Inter (sans, body)
- **Spacing:** 8px base system
- **Motif:** Circular "stamp ring" badge treatment echoing the round logo
- **Motion:** 150-250ms transitions, respects `prefers-reduced-motion`

## Database Schema

- `profiles` — User profiles (extends auth.users)
- `categories` — Trip categories (beach, trek, camp, couple)
- `trips` — Trip packages with itinerary, pricing, images
- `trip_batches` — Departure dates with seat counts
- `bookings` — Customer bookings with traveler details
- `reviews` — Trip reviews and ratings
- `blog_posts` — Travel blog content
- `wishlists` — Saved trips

RLS policies enforced on all tables.

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Set environment variables in Vercel dashboard. Run Supabase migrations before deploying.

## Payment Integration

The booking flow includes a payment step ready for integration. The current implementation captures the booking with `payment_status: 'pending'`. To wire up a real payment gateway:

1. Create a `PaymentProvider` component
2. Integrate Razorpay or Stripe Elements
3. On success, update `payment_status` to `paid` and `booking_status` to `confirmed`
4. Use Supabase Edge Functions to handle webhooks

## License

MIT
