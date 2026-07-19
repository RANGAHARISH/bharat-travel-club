"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, formatDate } from "@/lib/utils";

const steps = ["Select Date", "Travelers", "Review", "Pay"];

export default function BookingPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState<any>(null);
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [numTravelers, setNumTravelers] = useState(1);
  const [travelers, setTravelers] = useState<{ name: string; age: number; gender: string }[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push(`/login?redirect=/booking/${tripId}`); return; }
      setUser(user);
    });
    supabase.from("trips").select("*, batches:trip_batches(*)").eq("id", tripId).single().then(({ data }) => {
      if (data) {
        setTrip(data);
        setBatches((data as any).batches?.filter((b: any) => b.status === "active") || []);
      }
    });
  }, [tripId, router]);

  useEffect(() => {
    setTravelers(Array.from({ length: numTravelers }, (_, i) => travelers[i] || { name: "", age: 25, gender: "male" }));
  }, [numTravelers]);

  function updateTraveler(index: number, field: string, value: any) {
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    setTravelers(updated);
  }

  const isDiscount = trip?.discounted_price && trip?.discounted_price < trip?.price;
  const unitPrice = isDiscount ? trip.discounted_price : trip?.price || 0;
  const total = unitPrice * numTravelers;

  async function handleSubmit() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      trip_id: tripId,
      batch_id: selectedBatch,
      num_travelers: numTravelers,
      traveler_details: travelers,
      total_amount: total,
      payment_status: "pending",
      booking_status: "pending",
    });
    if (error) {
      alert("Booking failed: " + error.message);
      setLoading(false);
    } else {
      // In production: redirect to payment gateway
      router.push(`/booking/${tripId}/confirm`);
    }
  }

  if (!trip) return <div className="p-12 text-center animate-pulse">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${i <= step ? "bg-brand-teal text-white" : "bg-brand-teal/10 text-brand-ink/40"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i <= step ? "text-brand-ink font-medium" : "text-brand-ink/40"}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-brand-teal/20" />}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-brand-teal/10 bg-white p-6 lg:p-8">
        {/* Step 0: Select Date */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-brand-ink">Select Departure Date</h2>
            {batches.map((batch) => (
              <label key={batch.id} className={`flex items-center gap-4 rounded-lg border-2 p-4 cursor-pointer transition-all ${selectedBatch === batch.id ? "border-brand-teal bg-brand-teal/5" : "border-brand-teal/10 hover:border-brand-teal/30"}`}>
                <input type="radio" name="batch" value={batch.id} checked={selectedBatch === batch.id} onChange={() => setSelectedBatch(batch.id)} className="accent-brand-teal" />
                <div className="flex-1">
                  <p className="font-semibold">{formatDate(batch.departure_date)}</p>
                  <p className="text-sm text-brand-ink/60">{batch.total_seats - batch.seats_booked} seats left</p>
                </div>
              </label>
            ))}
            <Button onClick={() => setStep(1)} disabled={!selectedBatch} className="w-full" size="lg">Continue <ArrowRight className="h-4 w-4" /></Button>
          </div>
        )}

        {/* Step 1: Travelers */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-brand-ink">Traveler Details</h2>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium">Number of Travelers:</label>
              <select value={numTravelers} onChange={(e) => setNumTravelers(Number(e.target.value))} className="rounded-lg border-2 border-brand-teal/20 px-3 py-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            {travelers.map((t, i) => (
              <div key={i} className="rounded-lg border border-brand-teal/10 p-4 space-y-3">
                <p className="font-medium text-sm text-brand-teal">Traveler {i + 1}</p>
                <Input id={`name-${i}`} label="Full Name" value={t.name} onChange={(e) => updateTraveler(i, "name", e.target.value)} required />
                <div className="grid grid-cols-2 gap-3">
                  <Input id={`age-${i}`} label="Age" type="number" value={t.age} onChange={(e) => updateTraveler(i, "age", Number(e.target.value))} required />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-brand-ink/80">Gender</label>
                    <select value={t.gender} onChange={(e) => updateTraveler(i, "gender", e.target.value)} className="w-full h-11 rounded-lg border-2 border-brand-teal/20 bg-white px-4">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
              <Button onClick={() => setStep(2)} className="flex-1" size="lg">Continue <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-brand-ink">Review Your Booking</h2>
            <div className="space-y-3 rounded-lg bg-brand-cream p-4">
              <div className="flex justify-between"><span className="text-sm text-brand-ink/60">Trip</span><span className="font-medium">{trip.title}</span></div>
              <div className="flex justify-between"><span className="text-sm text-brand-ink/60">Date</span><span className="font-medium">{batches.find((b: any) => b.id === selectedBatch)?.departure_date ? formatDate(batches.find((b: any) => b.id === selectedBatch).departure_date) : "-"}</span></div>
              <div className="flex justify-between"><span className="text-sm text-brand-ink/60">Travelers</span><span className="font-medium">{numTravelers}</span></div>
              <div className="flex justify-between"><span className="text-sm text-brand-ink/60">Unit Price</span><span className="font-medium">{formatPrice(unitPrice)}</span></div>
              <div className="border-t border-brand-teal/10 pt-3 flex justify-between"><span className="font-semibold">Total</span><span className="font-bold text-xl text-brand-teal">{formatPrice(total)}</span></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
              <Button onClick={() => setStep(3)} className="flex-1" size="lg" variant="accent">Proceed to Payment <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-brand-ink">Payment</h2>
            <p className="text-sm text-brand-ink/60">Secure your spot with a 25% advance. Balance due 7 days before departure.</p>
            <div className="space-y-3 rounded-lg border border-brand-teal/10 p-4">
              <p className="flex justify-between"><span className="text-sm text-brand-ink/60">Total Amount</span><span className="font-bold text-xl text-brand-teal">{formatPrice(total)}</span></p>
              <p className="flex justify-between"><span className="text-sm text-brand-ink/60">Advance (25%)</span><span className="font-semibold">{formatPrice(Math.round(total * 0.25))}</span></p>
            </div>
            <Button onClick={handleSubmit} loading={loading} className="w-full" size="lg" variant="accent">
              Pay {formatPrice(Math.round(total * 0.25))} Advance
            </Button>
            <p className="text-xs text-center text-brand-ink/40">Payment processed securely via Razorpay/Stripe</p>
          </div>
        )}
      </div>
    </div>
  );
}
