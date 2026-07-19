import { createServer } from "@/lib/supabase/server";
import { TrendingUp, Users, CalendarCheck, DollarSign } from "lucide-react";

async function getStats() {
  try {
    const supabase = await createServer();
    if (!supabase) return { total: 0, confirmed: 0, revenue: 0, users: 0 };
    const [bookingsRes, usersRes] = await Promise.all([
      supabase.from("bookings").select("*"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ]);
    const data = bookingsRes.data || [];
    return {
      total: data.length,
      confirmed: data.filter(b => b.booking_status === "confirmed").length,
      revenue: data.reduce((s, b) => s + (b.total_amount || 0), 0),
      users: usersRes.count || 0,
    };
  } catch { return { total: 0, confirmed: 0, revenue: 0, users: 0 }; }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Bookings", value: stats.total, icon: CalendarCheck, color: "bg-brand-teal" },
    { label: "Confirmed", value: stats.confirmed, icon: TrendingUp, color: "bg-green-600" },
    { label: "Total Revenue", value: `₹${(stats.revenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "bg-brand-saffron" },
    { label: "Users", value: stats.users, icon: Users, color: "bg-brand-coral" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-brand-ink mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((s) => (
          <div key={s.label} className="rounded-xl border border-brand-teal/10 bg-white p-5 flex items-center gap-4">
            <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-brand-ink/60">{s.label}</p>
              <p className="text-2xl font-bold text-brand-ink">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-brand-ink/40">Connect Supabase to see live data.</p>
    </div>
  );
}
