import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

// ===== TRIP DETAILS DATABASE (fallback when Supabase not connected) =====
const tripDetails: Record<string, {
  title: string;
  tagline: string;
  price: number;
  origPrice: number;
  duration: string;
  location: string;
  contact: string;
  image: string;
  description: string;
  itinerary: { day: string; title: string; details: string[] }[];
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  cancelPolicy: string[];
  highlights: string[];
}> = {
  "gokarna-weekend-group-tour": {
    title: "Gokarna Weekend Group Tour",
    tagline: "🌊 GOKARNA • MURUDESHWAR • DANDELI TRIP 🌊",
    price: 4999,
    origPrice: 6500,
    duration: "2 Nights | 3 Days",
    location: "Gokarna, Karnataka",
    contact: "7396952195",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
    description: "Join us for an unforgettable weekend exploring the coastal gems of Karnataka — Gokarna, Murudeshwar, and Dandeli. This budget-friendly group trip includes train tickets, water activities, and memories that last a lifetime.",
    highlights: ["🌊 Gokarna • Murudeshwar • Dandeli", "🚆 Train Tickets Included", "🛶 Kayaking, Coracle & Zipline", "🏖️ Om Beach & 4 Beaches Trek"],
    itinerary: [
      {
        day: "Day 0",
        title: "Departure",
        details: [
          "🚆 Start your journey from your city to Hubli",
          "Train tickets provided"
        ]
      },
      {
        day: "Day 1",
        title: "Dandeli Adventure",
        details: [
          "☀️ Morning:",
          "  • Reach Hubli Railway Station",
          "  • Pickup and transfer to Dandeli Resort",
          "  • Check-in & freshen up",
          "  • Finish breakfast",
          "",
          "🌊 Water Activities:",
          "  • Kayaking",
          "  • Coracle Ride",
          "  • Zipline",
          "",
          "⏳ If time permits:",
          "  • Crocodile Park",
          "  • Elephant Camp",
          "  • Eco Park",
          "",
          "🌙 Evening at Dandeli Resort:",
          "  • Music & Campfire",
          "  • Rain Dance",
          "  • Swimming Pool",
          "  • Indoor Games",
          "",
          "🍽️ Dinner & overnight stay"
        ]
      },
      {
        day: "Day 2",
        title: "Coastal Explorer",
        details: [
          "Wake up early and proceed to:",
          "",
          "  • Mirjan Fort",
          "  • Apsarakonda Waterfalls",
          "  • Mangrove Boardwalk",
          "  • Murudeshwar Temple & Beach",
          "",
          "🏠 Check-in to stay & overnight rest"
        ]
      },
      {
        day: "Day 3",
        title: "Gokarna Exploration",
        details: [
          "☀️ Morning Visit:",
          "  • Mahabaleshwar Temple",
          "  • Gokarna Main Beach",
          "  • Om Beach",
          "",
          "OR",
          "",
          "🥾 4 Beaches Trek:",
          "  • Belekan Beach",
          "  • Paradise Beach",
          "  • Half Moon Beach",
          "  • Om Beach",
          "",
          "🍽️ Finish lunch and proceed to Hubli Railway Station"
        ]
      }
    ],
    inclusions: [
      "🚆 Train Tickets (Both Sides)",
      "🚐 3 Days Local Transport",
      "🏠 2 Nights Accommodation",
      "🍳 1 Day Food (Dandeli Resort)",
      "🛶 3 Water Activities (Kayaking, Coracle Ride & Zipline)",
      "👨‍✈️ Trip Organizer",
      "🛣️ Toll & Driver Allowance"
    ],
    exclusions: [
      "🍽️ Food for 2 Days",
      "❌ Anything not mentioned in inclusions",
      "💰 Extra charges for AC Train Tickets",
      "💑 Couple Room Charges"
    ],
    notes: [
      "Water activities are managed by Dandeli Forest Authorities. If activities are closed due to forest decisions, Bharat Travel Club is not responsible; however, we will try our best to arrange alternatives.",
      "Advance payment is non-refundable.",
      "Carry a valid ID proof and a copy of train tickets.",
      "Extra charges applicable for Tatkal & Premium Tatkal train bookings.",
      "This is a budget-friendly trip and not a luxury package. We strive to make your journey comfortable and memorable within budget.",
      "Trip management reserves the right to modify routes, activities, timings, duration, or participant allocation depending on weather and operational conditions.",
      "In case of vehicle breakdowns, traffic issues, or weather conditions, some places may be skipped.",
      "Charges are collected for the services provided (travel, stay, arrangements, and coordination), not for specific sightseeing points."
    ],
    cancelPolicy: [
      "Cancellation within 2 days prior to trip → Full amount payable",
      "Cancellation within 1 week prior → 50% of trip cost payable"
    ]
  },
  "gokarna-dandeli-2n-3d-couple-package": {
    title: "Gokarna Dandeli 2N/3D Couple Package",
    tagline: "💕 GOKARNA • DANDELI COUPLE GETAWAY",
    price: 37000,
    origPrice: 40000,
    duration: "2 Nights | 3 Days",
    location: "Gokarna & Dandeli, Karnataka",
    contact: "7396952195",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    description: "A romantic getaway for couples exploring the best of Karnataka's coast and forests.",
    highlights: ["💕 Couple Friendly", "🏖️ Gokarna Beaches", "🌲 Dandeli Resort", "🛶 Water Activities"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Dandeli", details: ["Check-in at Dandeli Resort", "Evening campfire & dinner"] },
      { day: "Day 2", title: "Coastal Tour", details: ["Visit Murudeshwar Temple", "Gokarna Beach walk", "Overnight stay"] },
      { day: "Day 3", title: "Departure", details: ["Morning beach trek", "Check-out & return"] }
    ],
    inclusions: ["🏠 2 Nights Accommodation", "🚐 Local Transport", "🍳 Breakfast", "👨‍✈️ Trip Organizer"],
    exclusions: ["🍽️ Lunch & Dinner", "💰 Extra charges"],
    notes: ["Advance payment is non-refundable.", "Carry valid ID proof."],
    cancelPolicy: ["Cancellation within 2 days → Full amount", "Cancellation within 1 week → 50%"]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = tripDetails[slug];
  if (!trip) return { title: "Trip Not Found" };
  return { title: trip.title, description: trip.description };
}

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = tripDetails[slug];
  if (!trip) notFound();

  const hasDiscount = trip.origPrice > trip.price;

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#F3EEE3", color: "#1a1a1a", lineHeight: 1.6 }}>
      <style>{`
        @media (max-width: 640px) {
          .detail-hero-img { aspect-ratio: 4/3 !important; }
          .detail-section { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (max-width: 480px) {
          .detail-price { font-size: 28px !important; }
          .quick-info-wrap { gap: 10px !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="detail-breadcrumb" style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#888", marginBottom: 20, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/trips" style={{ color: "#888", textDecoration: "none" }}>Trips</Link>
          <span>›</span>
          <span style={{ color: "#333" }}>{trip.title}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="detail-section" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div className="detail-hero-img" style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "21/9", marginBottom: 30 }}>
          <img src={trip.image} alt={trip.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, margin: 0 }}>{trip.title}</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.85 }}>{trip.tagline}</p>
          </div>
        </div>
      </div>

      <div className="detail-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ===== LEFT COLUMN ===== */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Quick Info Bar */}
          <div className="quick-info-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 16, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e0db" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <span style={{ fontSize: 18 }}>📅</span> <strong>{trip.duration}</strong>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <span style={{ fontSize: 18 }}>📍</span> {trip.location}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <span style={{ fontSize: 18 }}>📞</span> {trip.contact}
            </div>
          </div>

          {/* Highlights */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 12px" }}>✨ Trip Highlights</h2>
            <div className="highlights-grid">
              {trip.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#555" }}>
                  <span style={{ color: "#33abcb", fontSize: 16 }}>✓</span> {h}
                </div>
              ))}
            </div>
          </div>

          {/* Full Itinerary */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 16px" }}>📋 Detailed Itinerary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {trip.itinerary.map((day, i) => (
                <div key={i} style={{ borderLeft: "3px solid #33abcb", paddingLeft: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#33abcb", margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ background: "#33abcb", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{i + 1}</span>
                    {day.day} – {day.title}
                  </h3>
                  <div className="itinerary-details" style={{ paddingLeft: 36 }}>
                    {day.details.map((line, j) => (
                      line === "" ? <br key={j} /> :
                      <p key={j} style={{ margin: "2px 0", fontSize: 13.5, color: line.startsWith("  •") || line.startsWith("  –") ? "#666" : "#444", whiteSpace: "pre-wrap", paddingLeft: line.startsWith("  ") ? 12 : 0 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="inc-exc-grid">
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#16a34a" }}>✅ Inclusions</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {trip.inclusions.map((item, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#555", display: "flex", gap: 8 }}><span style={{ color: "#16a34a", flexShrink: 0 }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#dc2626" }}>❌ Exclusions</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {trip.exclusions.map((item, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#555", display: "flex", gap: 8 }}><span style={{ color: "#dc2626", flexShrink: 0 }}>✕</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#e4a33c" }}>⚠️ Important Notes</h2>
            <ol style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {trip.notes.map((note, i) => (
                <li key={i} style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{note}</li>
              ))}
            </ol>
          </div>

          {/* Cancellation Policy */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#dc2626" }}>📋 Cancellation Policy</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {trip.cancelPolicy.map((policy, i) => (
                <li key={i} style={{ fontSize: 13.5, color: "#555", display: "flex", gap: 8 }}><span style={{ color: "#dc2626" }}>•</span> {policy}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* ===== RIGHT COLUMN — Booking Widget ===== */}
        <div>
          <div style={{ position: "sticky", top: 92, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Price Card */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e0db", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span className="detail-price" style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a" }}>₹{trip.price.toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span style={{ fontSize: 16, color: "#bbb", textDecoration: "line-through" }}>₹{trip.origPrice.toLocaleString("en-IN")}</span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>per person</p>

              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <span style={{ fontSize: 16 }}>📅</span> <strong>{trip.duration}</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <span style={{ fontSize: 16 }}>📍</span> {trip.location}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <span style={{ fontSize: 16 }}>📞</span> {trip.contact}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <span style={{ fontSize: 16 }}>👥</span> Group Departure
                </div>
              </div>

              <Link href={`/booking/gokarna`} style={{ display: "block", marginTop: 24 }}>
                <Button className="w-full" size="lg" style={{ width: "100%", background: "#e4a33c", color: "#000", border: "none", padding: "14px 24px", fontSize: 16, fontWeight: 700, borderRadius: 12, cursor: "pointer" }}>
                  🚀 Book Now – ₹{trip.price.toLocaleString("en-IN")}
                </Button>
              </Link>
              <p style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 10 }}>Secure your spot with 25% advance</p>
            </div>

            {/* Organized by */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e0db", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Organized by</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#33abcb", margin: "4px 0" }}>Bharath Travel Club</p>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>📞 {trip.contact}</p>
            </div>

            {/* Share */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e0db", display: "flex", justifyContent: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#888" }}>Share:</span>
              {["📱", "💬", "📧", "🔗"].map((s, i) => (
                <span key={i} style={{ cursor: "pointer", fontSize: 18 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
