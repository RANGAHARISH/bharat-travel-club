"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Clock, Heart, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, formatDate } from "@/lib/utils";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const statusColors: Record<string, "default" | "accent" | "coral" | "outline"> = {
  confirmed: "accent",
  pending: "default",
  cancelled: "coral",
  completed: "outline",
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Fetch bookings
      supabase
        .from("bookings")
        .select("*, trip:trips(title, slug, cover_image_url)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => setBookings(data || []));
      setLoading(false);
    });
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brand-teal/10 rounded w-1/3" />
          <div className="h-4 bg-brand-teal/5 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-ink">My Account</h1>
          <p className="text-brand-ink/60 text-sm mt-1">{user?.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>

      <Tabs defaultValue="bookings">
        <TabsList>
          <TabsTrigger value="bookings"><Clock className="h-4 w-4 mr-2" />My Bookings</TabsTrigger>
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4 mt-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 rounded-xl border border-brand-teal/10 bg-white p-4">
                <div className="w-20 h-20 rounded-lg bg-brand-cream flex items-center justify-center text-2xl flex-shrink-0">
                  🏕️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-ink truncate">{booking.trip?.title || "Trip"}</p>
                  <p className="text-sm text-brand-ink/60">
                    {booking.num_travelers} traveler{booking.num_travelers > 1 ? "s" : ""} · {formatPrice(booking.total_amount)}
                  </p>
                  <p className="text-xs text-brand-ink/40">{formatDate(booking.created_at)}</p>
                </div>
                <Badge variant={statusColors[booking.booking_status] || "default"}>
                  {booking.booking_status}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-brand-ink/20 mb-4" />
              <h3 className="font-serif text-xl font-bold text-brand-ink mb-2">No bookings yet</h3>
              <p className="text-brand-ink/60 mb-4">Start your adventure with us!</p>
              <Link href="/trips"><Button variant="accent">Browse Trips</Button></Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="max-w-md space-y-4">
            <Input id="name" label="Full Name" defaultValue={user?.user_metadata?.full_name || ""} />
            <Input id="email" label="Email" defaultValue={user?.email || ""} disabled />
            <Button variant="accent">Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
