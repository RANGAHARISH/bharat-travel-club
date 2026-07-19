import { createServer } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

const statusColors: Record<string, "default" | "accent" | "gold" | "outline"> = { confirmed: "accent", pending: "default", cancelled: "gold", completed: "outline" };

async function getBookings() {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data } = await supabase.from("bookings").select("*, trip:trips(title)").order("created_at", { ascending: false }).limit(50);
    return data || [];
  } catch { return []; }
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-brand-ink mb-6">Bookings</h1>
      <div className="rounded-xl border border-brand-teal/10 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-brand-ink/60 text-xs uppercase tracking-wider">
              <tr><th className="text-left px-4 py-3 font-medium">Trip</th><th className="text-left px-4 py-3 font-medium">Travelers</th><th className="text-left px-4 py-3 font-medium">Amount</th><th className="text-left px-4 py-3 font-medium">Payment</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Date</th></tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/5">
              {bookings.length > 0 ? bookings.map((b: any) => (
                <tr key={b.id} className="hover:bg-brand-cream/50">
                  <td className="px-4 py-3 font-medium text-brand-ink">{b.trip?.title || "—"}</td>
                  <td className="px-4 py-3">{b.num_travelers}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(b.total_amount)}</td>
                  <td className="px-4 py-3"><Badge variant={b.payment_status === "paid" ? "accent" : "default"}>{b.payment_status}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={statusColors[b.booking_status] || "default"}>{b.booking_status}</Badge></td>
                  <td className="px-4 py-3 text-brand-ink/60 text-xs">{formatDate(b.created_at)}</td>
                </tr>
              )) : <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-ink/40">No bookings yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
