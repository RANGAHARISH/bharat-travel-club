import Link from "next/link";
import { notFound } from "next/navigation";
import { createServer } from "@/lib/supabase/server";
import { TripCard } from "@/components/features/trip-card";
import type { Trip } from "@/types";

const categoryMeta: Record<string, { title: string; icon: string; description: string }> = {
  beach: { title: "Beach Getaways", icon: "🏖️", description: "Coastal escapes, beach camping, and sunsets by the sea." },
  trek: { title: "Trekking", icon: "🏔️", description: "Mountain trails, monsoon treks, and summit adventures." },
  camp: { title: "Camping", icon: "⛺", description: "Camp under the stars by lakes, forests, and valleys." },
  couple: { title: "Couple Packages", icon: "💕", description: "Romantic getaways and private escapes for two." },
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
        <span className="text-4xl">{meta.icon}</span>
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
          <div className="text-5xl mb-4">{meta.icon}</div>
          <h2 className="font-serif text-2xl font-bold text-brand-ink mb-2">No {meta.title.toLowerCase()} yet</h2>
          <p className="text-brand-ink/60 mb-6">We&apos;re adding new trips in this category. Check back soon!</p>
          <Link href="/trips" className="text-brand-teal hover:underline font-medium">Browse all trips →</Link>
        </div>
      )}
    </div>
  );
}
