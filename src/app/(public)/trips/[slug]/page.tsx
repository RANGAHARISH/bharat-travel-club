import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Check, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createServer } from "@/lib/supabase/server";
import { formatPrice, formatDate } from "@/lib/utils";
import { ReviewCard } from "@/components/features/review-card";
import { TripCard } from "@/components/features/trip-card";
import type { Trip, Review } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const supabase = await createServer();
    if (!supabase) return { title: "Trip" };
    const { data: trip } = await supabase.from("trips").select("title, description").eq("slug", slug).single();
    if (!trip) return { title: "Trip Not Found" };
    return { title: trip.title, description: trip.description?.slice(0, 160) };
  } catch { return { title: "Trip" }; }
}

async function getTripData(slug: string) {
  try {
    const supabase = await createServer();
    if (!supabase) return { trip: null, reviews: [], related: [] };
    const { data: trip } = await supabase
      .from("trips")
      .select("*, category:categories(*), batches:trip_batches(*)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (!trip) return { trip: null, reviews: [], related: [] };
    const typedTrip = trip as unknown as Trip;
    const [reviewsRes, relatedRes] = await Promise.all([
      supabase.from("reviews").select("*, profile:profiles(full_name, avatar_url)").eq("trip_id", trip.id).eq("is_approved", true).order("created_at", { ascending: false }).limit(10),
      supabase.from("trips").select("*, category:categories(*)").eq("status", "published").neq("id", trip.id).limit(3),
    ]);
    return {
      trip: typedTrip,
      reviews: (reviewsRes.data || []) as Review[],
      related: (relatedRes.data || []) as unknown as Trip[],
    };
  } catch {
    return { trip: null, reviews: [], related: [] };
  }
}

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { trip: typedTrip, reviews: typedReviews, related } = await getTripData(slug);
  if (!typedTrip) notFound();

  const hasDiscount = typedTrip.discounted_price && typedTrip.discounted_price < typedTrip.price;
  const activeBatches = (typedTrip.batches || []).filter((b: any) => b.status === "active");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <nav className="flex items-center gap-2 text-sm text-brand-ink/50 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span>/</span>
        <Link href="/trips" className="hover:text-brand-teal">Trips</Link>
        <span>/</span>
        <span className="text-brand-ink/80">{typedTrip.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-brand-cream">
            {typedTrip.cover_image_url ? (
              <img src={typedTrip.cover_image_url} alt={typedTrip.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">🏕️</div>
            )}
            <Badge variant="accent" className="absolute left-4 top-4 text-sm">
              {typedTrip.category?.name || typedTrip.departure_city}
            </Badge>
          </div>

          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink">{typedTrip.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-ink/60">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {typedTrip.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {typedTrip.duration_days}D / {typedTrip.duration_nights}N</span>
            <span>From {typedTrip.departure_city}</span>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({typedReviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p className="text-brand-ink/80 leading-relaxed whitespace-pre-line">{typedTrip.description}</p>
            </TabsContent>
            <TabsContent value="itinerary" className="space-y-4">
              {typedTrip.itinerary?.length > 0 ? typedTrip.itinerary.map((day: any) => (
                <div key={day.day} className="rounded-lg border border-brand-teal/10 p-4">
                  <h3 className="font-semibold text-brand-teal">Day {day.day}: {day.title}</h3>
                  <p className="text-sm text-brand-ink/70 mt-1">{day.description}</p>
                </div>
              )) : <p className="text-brand-ink/60">Itinerary details coming soon.</p>}
            </TabsContent>
            <TabsContent value="inclusions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-brand-ink">Inclusions</h3>
                  {typedTrip.inclusions?.map((item: string, i: number) => (
                    <p key={i} className="flex items-start gap-2 text-sm text-brand-ink/70"><Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> {item}</p>
                  ))}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-brand-ink">Exclusions</h3>
                  {typedTrip.exclusions?.map((item: string, i: number) => (
                    <p key={i} className="flex items-start gap-2 text-sm text-brand-ink/70"><XIcon className="h-4 w-4 text-brand-coral mt-0.5 flex-shrink-0" /> {item}</p>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              {typedReviews.length > 0 ? typedReviews.map((review) => <ReviewCard key={review.id} review={review} />) : <p className="text-brand-ink/60">No reviews yet. Be the first!</p>}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-brand-teal/10 bg-white p-6 shadow-sm space-y-5">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-ink">{formatPrice(hasDiscount ? typedTrip.discounted_price! : typedTrip.price)}</span>
                {hasDiscount && <span className="text-lg text-brand-ink/40 line-through">{formatPrice(typedTrip.price)}</span>}
              </div>
              <p className="text-sm text-brand-ink/60">per person</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-ink/80">Select Departure Date</label>
              {activeBatches.length > 0 ? activeBatches.map((batch: any) => (
                <label key={batch.id} className="flex items-center gap-3 rounded-lg border border-brand-teal/20 p-3 cursor-pointer hover:border-brand-teal transition-colors has-checked:border-brand-teal has-checked:bg-brand-teal/5">
                  <input type="radio" name="batch" value={batch.id} className="accent-brand-teal" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{formatDate(batch.departure_date)}</p>
                    <p className="text-xs text-brand-ink/50">{batch.total_seats - batch.seats_booked} seats left</p>
                  </div>
                </label>
              )) : <p className="text-sm text-brand-ink/50">No upcoming dates available</p>}
            </div>
            <Link href={`/booking/${typedTrip.id}`}><Button className="w-full" size="lg" variant="accent">Book Now</Button></Link>
            <p className="text-xs text-center text-brand-ink/50">Secure your spot with 25% advance</p>
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-brand-ink mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((t: Trip) => <TripCard key={t.id} trip={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}
