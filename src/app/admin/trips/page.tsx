import Link from "next/link";
import { Plus } from "lucide-react";
import { createServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

async function getTrips() {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data } = await supabase.from("trips").select("*, category:categories(name)").order("created_at", { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function AdminTripsPage() {
  const trips = await getTrips();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-brand-ink">Trips</h1>
        <Link href="/admin/trips/new"><Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Trip</Button></Link>
      </div>
      <div className="rounded-xl border border-brand-teal/10 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-brand-ink/60 text-xs uppercase tracking-wider">
              <tr><th className="text-left px-4 py-3 font-medium">Title</th><th className="text-left px-4 py-3 font-medium">Category</th><th className="text-left px-4 py-3 font-medium">Price</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/5">
              {trips.length > 0 ? trips.map((trip: any) => (
                <tr key={trip.id} className="hover:bg-brand-cream/50">
                  <td className="px-4 py-3 font-medium text-brand-ink">{trip.title}</td>
                  <td className="px-4 py-3 text-brand-ink/60">{trip.category?.name || "-"}</td>
                  <td className="px-4 py-3">{formatPrice(trip.price)}</td>
                  <td className="px-4 py-3"><Badge variant={trip.status === "published" ? "accent" : "default"}>{trip.status}</Badge></td>
                  <td className="px-4 py-3"><Link href={`/admin/trips/${trip.id}`} className="text-brand-teal hover:underline text-xs">Edit</Link></td>
                </tr>
              )) : <tr><td colSpan={5} className="px-4 py-8 text-center text-brand-ink/40">No trips yet. Connect Supabase to manage trips.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
