"use client";

import { useState } from "react";
import Link from "next/link";

// ===== BRAND COLORS =====
// Primary: #25accd (teal from logo)
// Gold accent: #e4a33c (from logo)
// Dark: #000000
// Section bg: #f8f5f2

// ===== DESTINATION IMAGES (from Unsplash) =====
const imageUrls: Record<string, string> = {
  "🌊": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
  "🏔️": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
  "🌄": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  "🌲": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  "🏛️": "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop",
  "🌴": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop",
  "🌿": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
  "☕": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  "⛺": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
  "🏜️": "https://images.unsplash.com/photo-1473589043899-8b9c7c3c1b9a?w=400&h=300&fit=crop",
  "🌙": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
  "🏕️": "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=400&h=300&fit=crop",
};

// ===== EXACT PRODUCT DATA (matches weekendyaari.in) =====
const products = {
  hydWeekend: [
    { img: "🌊", label: "3 days", title: "Gokarna Weekend Group Tour", loc: "Gokarna, Karnataka", dur: "3 Days / 2 Nights", price: "₹4,999", orig: "₹6,500" },
    { img: "🏔️", label: "3 days", title: "Coorg Weekend Group Tour from Hyderabad", loc: "Coorg, Karnataka", dur: "3 Days / 2 Nights", price: "₹5,499", orig: "₹7,500" },
    { img: "🌄", label: "3 days", title: "Ooty Weekend Group Tour Package", loc: "Ooty, Tamil Nadu", dur: "3 Days / 2 Nights", price: "₹5,999", orig: "₹8,000" },
    { img: "🌲", label: "3 days", title: "Dandeli Weekend Group Tour", loc: "Dandeli, Karnataka", dur: "3 Days / 2 Nights", price: "₹4,499", orig: "₹6,000" },
  ],
  longTrips: [
    { img: "🏛️", label: "4 days", title: "Golden Triangle Tour Package – Agra, Jaipur & Delhi", loc: "Agra, Jaipur & Delhi", dur: "4 Days / 3 Nights", price: "₹9,999", orig: "₹12,999", badge: "Bestseller" },
    { img: "🌴", label: "6 days", title: "Kerala Tour Package – 6 Days / 5 Nights at ₹13,999", loc: "Kerala, India", dur: "6 Days / 5 Nights", price: "₹13,999", orig: "₹16,000" },
    { img: "🏔️", label: "5 days", title: "Kashmir 4N/5D Tour Package", loc: "Srinagar", dur: "5 Days / 4 Nights", price: "₹14,999", orig: "₹22,000" },
    { img: "🌿", label: "4 days", title: "Kerala 3N/4D Tour Package from Hyderabad", loc: "Kerala", dur: "4 Days / 3 Nights", price: "₹12,999", orig: "₹16,999" },
  ],
  blrTrips: [
    { img: "☕", label: "3 days", title: "Coorg & Chikmagalur Group Tour Package From Bangalore", loc: "Bengaluru, Karnataka", dur: "3 Days / 2 Nights", price: "₹6,999", orig: "₹7,999", badge: "Featured" },
    { img: "🌄", label: "3 days", title: "Coorg (3D/2N) Tour Package from Mysore @ ₹6,499/-", loc: "Madikeri, Karnataka", dur: "3 Days / 2 Nights", price: "₹6,499", orig: "₹9,500" },
    { img: "🏔️", label: "3 days", title: "Coorg-Chikmagalur 2N/3D Group Trip from Bangalore", loc: "Bengaluru, Karnataka", dur: "3 Days / 2 Nights", price: "₹6,999", orig: "₹9,999", badge: "Featured" },
    { img: "🌲", label: "3 days", title: "Dandeli and Gokarna Tour Package from Bangalore", loc: "Bangalore", dur: "3 Days / 2 Nights", price: "₹5,999", orig: "₹7,500", badge: "Featured" },
  ],
  coupleTrips: [
    { img: "🌄", label: "3 days", title: "Ooty & Coonoor 2N/3D Couple Package", loc: "Ooty, Tamil Nadu", dur: "3 Days / 2 Nights", price: "₹37,000", orig: "₹40,000" },
    { img: "🌊", label: "3 days", title: "Gokarna Dandeli 2N/3D Couple Package", loc: "Gokarna, Karnataka", dur: "3 Days / 2 Nights", price: "₹37,000", orig: "₹40,000" },
    { img: "🏔️", label: "4 days", title: "Kullu Manali Kasol Tour Package (3N/4D) – Just ₹12,000", loc: "Manali, Himachal", dur: "4 Days / 3 Nights", price: "₹12,000", orig: "₹15,000" },
    { img: "🏕️", label: "4 days", title: "3 Nights 4 Days Manali Tour Package", loc: "Manali, HP", dur: "4 Days / 3 Nights", price: "₹11,000", orig: "₹14,000" },
  ],
  campingTrips: [
    { img: "⛺", label: "1N/2D", title: "Ananthagiri Hills Camping Vikarabad 1N/2D", loc: "Vikarabad, Hyderabad", dur: "1 Night / 2 Days", price: "₹1,999", orig: "₹3,000", badge: "Popular" },
    { img: "🏕️", label: "Special", title: "New Year SPECIAL Lake Side Camping", loc: "Near Hyderabad", dur: "2 Nights / 3 Days", price: "₹2,499", orig: "₹4,000", badge: "New" },
    { img: "🏜️", label: "1N/2D", title: "Gandikota Camping & Trekking Package from Hyderabad", loc: "Gandikota, AP", dur: "2 Days / 1 Night", price: "₹3,499", orig: "₹5,000" },
    { img: "🌙", label: "1N/2D", title: "New Year Night Camping at Ananthagiri Hills", loc: "Ananthagiri Hills", dur: "1 Night / 2 Days", price: "₹2,299", orig: "₹3,500", badge: "🔥 Hot" },
  ],
  reviews: [
    { name: "Annaparaju B", trip: "Coorg Weekend", text: "Amazing experience! The Coorg trip was perfectly planned. Everything from transport to food was top notch. Met some amazing people!", stars: 5 },
    { name: "Phalguna Kancherla", trip: "Golden Triangle", text: "Best budget travel agency in Hyderabad! The Golden Triangle tour was incredible value for money. Our guide was knowledgeable and friendly.", stars: 5 },
    { name: "Sasidhar", trip: "Camping Trek", text: "The Ananthagiri camping was magical! Bonfire, stargazing, trekking — everything was well organized. Will definitely book again!", stars: 5 },
  ],
  blogPosts: [
    { img: "🏔️", title: "Top 10 Monsoon Treks Near Hyderabad", date: "Jul 15, 2026", desc: "Discover the best monsoon trekking destinations within driving distance from Hyderabad..." },
    { img: "🌴", title: "Budget Travel Guide: Kerala on ₹15,000", date: "Jun 28, 2026", desc: "A complete itinerary for exploring God's Own Country without breaking the bank..." },
    { img: "⛺", title: "Ultimate Camping Checklist: What to Pack", date: "Jun 10, 2026", desc: "Everything you need for a perfect weekend camping trip — beginner's guide included..." },
  ],
};

function ProductCard({ p }: { p: typeof products.hydWeekend[0] }) {
  const imgUrl = imageUrls[p.img] || imageUrls["🏔️"];
  return (
    <div className="product-card" style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <Link href={`/trips/${p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`} style={{ textDecoration: "none" }}>
        <div style={{ position: "relative", aspectRatio: "4/3", background: "#e8f4f8", overflow: "hidden" }}>
          <img src={imgUrl} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          {(p as any).badge && (
            <span style={{ position: "absolute", top: 10, left: 10, background: "#e4a33c", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
              {(p as any).badge}
            </span>
          )}
          <span style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.65)", color: "#e4a33c", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, backdropFilter: "blur(4px)" }}>
            {p.label}
          </span>
        </div>
      </Link>
      <div style={{ padding: "14px 16px" }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
          <Link href={`/trips/${p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`} style={{ textDecoration: "none", color: "#1a1a1a" }}>
            {p.title}
          </Link>
        </h3>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#888" }}>📍 {p.loc}</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#aaa" }}>{p.dur}</p>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{p.price}</span>
          <span style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>{p.orig}</span>
        </div>
        <Link href={`/trips/${p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`} style={{ display: "inline-block", marginTop: 8, fontSize: 13, fontWeight: 600, color: "#25accd", textDecoration: "none" }}>
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#F3EEE3", color: "#1a1a1a", lineHeight: 1.6, overflowX: "hidden" }}>
      {/* ======== INLINE STYLES ======== */}
      <style>{`
        /* Mobile/small-tablet specific overrides for inline components */
        @media (max-width: 640px) {
          .hero-section { min-height: 90dvh !important; }
          .section-pad { padding: 40px 0 !important; }
          .hero-headline br { display: none; }
          .quick-info-wrap { flex-direction: column !important; gap: 8px !important; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-section { min-height: 80vh !important; }
        }
        @media (max-width: 480px) {
          .hero-headline { font-size: 1.65rem !important; }
          .hero-subtitle { font-size: 0.85rem !important; }
        }
      `}</style>

      {/* ======== HERO ======== */}
      <section className="hero-section" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background image with overlay */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=900&fit=crop"
            alt="Travel landscape"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(15,42,51,0.65) 50%, rgba(26,74,90,0.5) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "40px 20px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
          {/* Badge */}
          <span style={{ display: "inline-block", background: "rgba(228,163,60,0.2)", border: "1px solid rgba(228,163,60,0.4)", color: "#e4a33c", fontSize: 12, fontWeight: 600, padding: "6px 18px", borderRadius: 50, letterSpacing: 1, marginBottom: 20, backdropFilter: "blur(4px)" }}>
            🇮🇳 INDIA'S TRUSTED TRAVEL CLUB
          </span>

          {/* Main headline */}
          <h1 className="hero-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 auto", maxWidth: 750 }}>
            Explore India's <span style={{ color: "#e4a33c" }}>Hidden Gems</span><br />
            With Fellow Travellers
          </h1>
          <p className="hero-subtitle" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "rgba(255,255,255,0.75)", maxWidth: 600, margin: "16px auto 0", lineHeight: 1.6 }}>
            Weekend trips, treks, camping & couple packages from Hyderabad & Bangalore. Budget-friendly, community-driven, departures every week.
          </p>

          {/* Search/filter bar */}
          <div className="hero-search-bar" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 32, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "16px 20px", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            <select style={{ flex: 1, minWidth: 140, padding: "12px 16px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, color: "#333", outline: "none" }}>
              <option>📍 Destination</option>
              <option>Gokarna</option>
              <option>Coorg</option>
              <option>Ooty</option>
              <option>Kerala</option>
              <option>Kashmir</option>
              <option>Manali</option>
              <option>Goa</option>
            </select>
            <select style={{ flex: 1, minWidth: 120, padding: "12px 16px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, color: "#333", outline: "none" }}>
              <option>📅 Duration</option>
              <option>Weekend (2-3 days)</option>
              <option>Extended (4-5 days)</option>
              <option>Long Trip (6+ days)</option>
            </select>
            <Link href="/trips" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#e4a33c", color: "#000", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
              Search →
            </Link>
          </div>

          {/* Quick destination chips */}
          <div className="dest-chips" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 24 }}>
            {[
              { name: "Goa", emoji: "🏖️" },
              { name: "Gokarna", emoji: "🌊" },
              { name: "Coorg", emoji: "🏔️" },
              { name: "Kerala", emoji: "🌴" },
              { name: "Manali", emoji: "❄️" },
              { name: "Kashmir", emoji: "🏞️" },
              { name: "Spiti", emoji: "⛰️" },
              { name: "Meghalaya", emoji: "🌧️" },
            ].map((d) => (
              <Link
                key={d.name}
                href={`/trips`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.2s", backdropFilter: "blur(4px)" }}
              >
                <span>{d.emoji}</span> {d.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 2N/3D | EX:HYD ======== */}
      <section className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>2N/3D | EX:HYD</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600, marginTop: 8, marginBottom: 8 }}>
            2N/3D Weekend Group Trips From Hyderabad – Weekly Friday Departures
          </h2>
          <p style={{ fontSize: 14, color: "#666", maxWidth: 800, marginBottom: 30 }}>
            Plan the perfect weekend escape with our 2 Nights / 3 Days group tour packages from Hyderabad. Discover top-rated destinations like Gokarna, Coorg, Ooty, Dandeli, Murudeshwar, and more. Our budget-friendly weekend trips are ideal for solo travelers, friends, and groups — every Friday departure guaranteed!
          </p>
          <div className="product-grid">
            {products.hydWeekend.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== LONG TRIPS ======== */}
      <section className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>LONG TRIPS</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600, marginTop: 8, marginBottom: 8 }}>Backpacking Trips</h2>
          <p style={{ fontSize: 14, color: "#666", maxWidth: 800, marginBottom: 30 }}>
            Join budget-friendly backpacking trips from Hyderabad to Kerala, Manali, Kashmir, Meghalaya & more. Perfect for solo travelers and adventure seekers — explore offbeat places, connect with new people, and travel light. Weekly group departures!
          </p>
          <div className="product-grid">
            {products.longTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== 2N/3D | EX: BLR ======== */}
      <section className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>2N/3D | EX: BLR</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600, marginTop: 8, marginBottom: 8 }}>
            2N/3D Weekend Group Trips From Bangalore – Friday Departures
          </h2>
          <p style={{ fontSize: 14, color: "#666", maxWidth: 800, marginBottom: 30 }}>
            Discover exciting weekend getaways from Bangalore with our 2 Nights / 3 Days group travel packages. Visit scenic destinations like Coorg, Chikmagalur, Gokarna, Dandeli, Ooty, and more.
          </p>
          <div className="product-grid">
            {products.blrTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== MONSOON + COUPLE SPLIT ======== */}
      <section className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div className="dual-grid">
            <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #e5e0db" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Monsoon SPL</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600, marginTop: 8 }}>🌧️ Monsoon Treks</h3>
              <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>Escape into the Sahyadris this rainy season with our handpicked treks featuring misty forests, hidden waterfalls, ancient forts, and magical trails perfect for monsoon explorers.</p>
              <Link href="/category/trek" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "#25accd", color: "#fff", borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View Treks →</Link>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #e5e0db" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Couple SPL</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600, marginTop: 8 }}>💕 Couple Tour Packages</h3>
              <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>Perfect 2N/3D escapes for couples — cozy stays, beautiful destinations, and private experiences.</p>
              <Link href="/category/couple" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "#25accd", color: "#fff", borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View Packages →</Link>
            </div>
          </div>

          {/* Couple packages */}
          <div className="product-grid" style={{ marginTop: 40 }}>
            {products.coupleTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== CAMPING ======== */}
      <section className="section-pad" style={{ padding: "60px 0", background: "linear-gradient(135deg, #000000 0%, #1a1515 50%, #1d3d45 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#e4a33c", letterSpacing: 1 }}>Camping Special</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600, marginTop: 8, marginBottom: 8, color: "#fff" }}>Weekend Camping</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 800, marginBottom: 30 }}>Camp under the stars with our handpicked camping experiences near Hyderabad & Bangalore.</p>
          <div className="product-grid">
            {products.campingTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== FEATURES BAR ======== */}
      <section style={{ padding: "40px 0", borderTop: "1px solid #e5e0db", borderBottom: "1px solid #e5e0db" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div className="features-grid">
            {[
              { icon: "🗺️", title: "25+ Destinations", desc: "Explore handpicked getaways" },
              { icon: "🎫", title: "No Fake Tickets", desc: "100% confirmed departures" },
              { icon: "💬", title: "Top Notch Support", desc: "24/7 travel assistance" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: "1.8rem" }}>{f.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{f.title}</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: "#888" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== REVIEWS ======== */}
      <section className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Client Reviews</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600, marginTop: 8, marginBottom: 30 }}>What Our Travellers Say</h2>
          <div className="three-col-grid">
            {products.reviews.map((r, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
                <div style={{ color: "#e4a33c", fontSize: 16, letterSpacing: 2 }}>{"★".repeat(r.stars)}</div>
                <p style={{ fontSize: 14, color: "#555", marginTop: 10, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#25accd", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600 }}>
                    {r.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{r.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#999" }}>{r.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== BLOG ======== */}
      <section className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Our Blog</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600, marginTop: 8, marginBottom: 30 }}>Travel Stories & Guides</h2>
          <div className="three-col-grid">
            {products.blogPosts.map((b, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e0db" }}>
                <div style={{ height: 200, background: "#e8f4f8", overflow: "hidden" }}>
                  <img src={imageUrls[b.img] || imageUrls["🏔️"]} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 12, color: "#999" }}>📅 {b.date}</p>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>{b.desc}</p>
                  <Link href="/blog" style={{ display: "inline-block", marginTop: 10, fontSize: 13, fontWeight: 600, color: "#25accd", textDecoration: "none" }}>Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== HONEYMOON CTA ======== */}
      <section className="section-pad" style={{ padding: "60px 0", background: "linear-gradient(135deg, #25accd 0%, #187a90 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#e4a33c", letterSpacing: 1 }}>Honeymoon Special</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 600, marginTop: 10, color: "#fff" }}>💍 Honeymoon Tour Packages</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "10px auto 24px" }}>Start your new journey together with our exclusive honeymoon packages. Romantic getaways in Kashmir, Kerala, Manali & more.</p>
          <Link href="/category/couple" style={{ display: "inline-block", padding: "12px 32px", background: "#e4a33c", color: "#000", borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Explore Honeymoon →</Link>
        </div>
      </section>

    </div>
  );
}
