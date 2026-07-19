import Link from "next/link";
import { createServer } from "@/lib/supabase/server";
import { TripCard } from "@/components/features/trip-card";
import type { Trip } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Trips",
  description: "Browse our curated selection of weekend trips, treks, camping, and couple packages across India.",
};

async function getTrips() {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data } = await supabase
      .from("trips")
      .select("*, category:categories(*)")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    return (data || []) as Trip[];
  } catch { return []; }
}

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink">All Trips</h1>
        <p className="text-brand-ink/60 mt-2">Find your next adventure from our curated collection.</p>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏕️</div>
          <h2 className="font-serif text-2xl font-bold text-brand-ink mb-2">No trips yet</h2>
          <p className="text-brand-ink/60 mb-6">We&apos;re adding new adventures soon. Check back later! (Connect Supabase to see trips)</p>
          <Link href="/" className="text-brand-teal hover:underline font-medium">Go home →</Link>
        </div>
      )}
    </div>
  );
}
