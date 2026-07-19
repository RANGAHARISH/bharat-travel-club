import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/features/trip-card";
import { CategoryCard } from "@/components/features/category-card";
import { ReviewCard } from "@/components/features/review-card";
import { BlogCard } from "@/components/features/blog-card";
import { StatsStrip } from "@/components/features/stats-strip";
import { createServer } from "@/lib/supabase/server";
import type { Trip, Category, Review, BlogPost } from "@/types";

const routeDestinations = ["Goa", "Gokarna", "Coorg", "Spiti", "Meghalaya", "Kerala", "Manali", "Kashmir"];

const categories: (Category & { icon: string })[] = [
  { id: "1", name: "Beach", slug: "beach", description: "Coastal getaways & beach camping", icon: "🏖️" },
  { id: "2", name: "Trek", slug: "trek", description: "Mountain trails & monsoon treks", icon: "🏔️" },
  { id: "3", name: "Camp", slug: "camp", description: "Camping under the stars", icon: "⛺" },
  { id: "4", name: "Couple", slug: "couple", description: "Romantic escapes for two", icon: "💕" },
];

async function getSupabaseData() {
  try {
    const supabase = await createServer();
    if (!supabase) return { featuredTrips: [], reviews: [], posts: [] };

    const [tripsRes, reviewsRes, postsRes] = await Promise.all([
      supabase.from("trips").select("*, category:categories(*)").eq("status", "published").eq("is_featured", true).limit(6),
      supabase.from("reviews").select("*, profile:profiles(full_name, avatar_url)").eq("is_approved", true).limit(6),
      supabase.from("blog_posts").select("*, author:profiles(full_name, avatar_url)").eq("published", true).order("published_at", { ascending: false }).limit(3),
    ]);

    return {
      featuredTrips: (tripsRes.data || []) as Trip[],
      reviews: (reviewsRes.data || []) as Review[],
      posts: (postsRes.data || []) as BlogPost[],
    };
  } catch {
    return { featuredTrips: [], reviews: [], posts: [] };
  }
}

export default async function HomePage() {
  const { featuredTrips, reviews, posts } = await getSupabaseData();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-ink via-brand-teal-dark to-brand-ink py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full border border-white/20" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white/10" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-brand-saffron font-semibold mb-4">
            India&apos;s Favorite Group Travel Club
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
            Explore India with <span className="text-brand-saffron">Strangers</span> Who Become Friends
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Weekend trips, treks, and camping experiences from Hyderabad and Bangalore. Budget-friendly, community-driven, departures every week.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trips">
              <Button size="xl" variant="accent">Browse Trips</Button>
            </Link>
            <Link href="/category/trek">
              <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">View Treks</Button>
            </Link>
          </div>
          {/* Route destinations strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {routeDestinations.map((dest) => (
              <span key={dest} className="text-xs text-white/50 border border-white/20 rounded-full px-3 py-1">
                {dest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20 bg-brand-cream-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-saffron font-semibold">Choose Your Adventure</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mt-2">Find Your Kind of Travel</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} icon={cat.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-brand-saffron font-semibold">Featured</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mt-2">Popular Trips</h2>
            </div>
            <Link href="/trips" className="text-sm font-medium text-brand-teal hover:underline whitespace-nowrap">
              View All Trips →
            </Link>
          </div>
          {featuredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-brand-ink/60">
              <p className="text-lg">No featured trips yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <StatsStrip />

      {/* Why Travel With Us */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink">Why Travel With Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "👥", title: "Community Vibes", desc: "Travel with a group of like-minded explorers. Solo travellers welcome — you'll never feel alone." },
              { icon: "💰", title: "Budget-Friendly", desc: "Quality trips starting at just ₹1,999. No hidden costs, no commission traps." },
              { icon: "✅", title: "Guaranteed Departures", desc: "Every listed trip departs as scheduled. No last-minute cancellations." },
              { icon: "🛡️", title: "Safe & Verified", desc: "Verified accommodations, experienced leads, and 24/7 support on every trip." },
              { icon: "🌿", title: "Offbeat Destinations", desc: "We take you beyond the tourist traps to hidden gems across India." },
              { icon: "📸", title: "Memories for Life", desc: "Every trip comes with a shared album, inside jokes, and friends for life." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="stamp-ring flex-shrink-0 flex items-center justify-center w-12 h-12 text-xl bg-brand-cream">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-brand-ink">{item.title}</h3>
                  <p className="text-sm text-brand-ink/60 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {reviews.length > 0 && (
        <section className="py-16 lg:py-20 bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink">What Travellers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Teaser */}
      {posts.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-brand-saffron font-semibold">Blog</span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mt-2">Travel Stories & Guides</h2>
              </div>
              <Link href="/blog" className="text-sm font-medium text-brand-teal hover:underline">View All Posts →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-brand-teal to-brand-teal-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">Ready for Your Next Adventure?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">Join thousands of travellers who've discovered India with us. Your next weekend escape is one click away.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trips"><Button size="xl" variant="accent">Explore Trips</Button></Link>
            <Link href="/contact"><Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
