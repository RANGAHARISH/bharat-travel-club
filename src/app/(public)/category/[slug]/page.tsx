import Link from "next/link";
import { notFound } from "next/navigation";
import { createServer } from "@/lib/supabase/server";
import { TripCard } from "@/components/features/trip-card";
import type { Trip } from "@/types";

const categoryMeta: Record<string, { title: string; icon: string; description: string }> = {
  beach: { title: "Beach Getaways", icon: "beach", description: "Coastal escapes, beach camping, and sunsets by the sea." },
  trek: { title: "Trekking", icon: "trek", description: "Mountain trails, monsoon treks, and summit adventures." },
  camp: { title: "Camping", icon: "camp", description: "Camp under the stars by lakes, forests, and valleys." },
  couple: { title: "Couple Packages", icon: "couple", description: "Romantic getaways and private escapes for two." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  if (!meta) return { title: "Category" };
  return { title: meta.title, description: meta.description };
}

async function getCategoryTrips(slug: string) {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data: cat } = await supabase.from("categories").select("id").eq("slug", slug).single();
    if (!cat) return [];
    const { data } = await supabase
      .from("trips")
      .select("*, category:categories(*)")
      .eq("status", "published")
      .eq("category_id", cat.id)
      .order("created_at", { ascending: false });
    return (data || []) as Trip[];
  } catch { return []; }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  if (!meta) notFound();

  const typedTrips = await getCategoryTrips(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <span className="text-4xl">
          {meta.icon === "beach" ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22 12 2l10 20"/><path d="M2 22h20"/><path d="M7 22 12 8l5 14"/></svg>
          ) : meta.icon === "trek" ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.5 15 8 12l3.5 3"/></svg>
          ) : meta.icon === "camp" ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21 12 2l9 19"/><path d="M7 21 12 9l5 12"/><path d="M2 21h20"/></svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          )}
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mt-2">{meta.title}</h1>
        <p className="text-brand-ink/60 mt-2">{meta.description}</p>
      </div>

      {typedTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {typedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">
            {meta.icon === "beach" ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22 12 2l10 20"/><path d="M2 22h20"/><path d="M7 22 12 8l5 14"/></svg>
            ) : meta.icon === "trek" ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.5 15 8 12l3.5 3"/></svg>
            ) : meta.icon === "camp" ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21 12 2l9 19"/><path d="M7 21 12 9l5 12"/><path d="M2 21h20"/></svg>
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            )}
          </div>
          <h2 className="font-serif text-2xl font-bold text-brand-ink mb-2">No {meta.title.toLowerCase()} yet</h2>
          <p className="text-brand-ink/60 mb-6">We&apos;re adding new trips in this category. Check back soon!</p>
          <Link href="/trips" className="text-brand-teal hover:underline font-medium">Browse all trips →</Link>
        </div>
      )}
    </div>
  );
}
