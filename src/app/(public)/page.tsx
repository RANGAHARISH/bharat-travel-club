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
    { img: "🌊", label: "3 days", title: "Gokarna Weekend Group Tour", loc: "Gokarna, Karnataka", dur: "3 Days / 2 Nights", price: "₹4,999", orig: "₹6,500", coverImg: "/gokarna1.jpg", hoverImages: ["/gokarna1.jpg", "/gokarna2.avif", "/gokarna3.jpg", "/gokarna4.jpg"] },
    { img: "🏔️", label: "3 days", title: "Coorg Weekend Group Tour from Hyderabad", loc: "Coorg, Karnataka", dur: "3 Days / 2 Nights", price: "₹5,499", orig: "₹7,500", coverImg: "/coorg1.jpg", hoverImages: ["/coorg1.jpg", "/coorg2.jpg", "/coorg3.jpg", "/coorg4.jpg"] },
    { img: "🌄", label: "3 days", title: "Ooty Weekend Group Tour Package", loc: "Ooty, Tamil Nadu", dur: "3 Days / 2 Nights", price: "₹7,999", orig: "₹7,999", coverImg: "/ooty1.avif", hoverImages: ["/ooty1.avif", "/ooty2.avif", "/ooty3.avif", "/ooty4.avif"] },
    { img: "🌲", label: "3 days", title: "Dandeli Weekend Group Tour", loc: "Dandeli, Karnataka", dur: "3 Days / 2 Nights", price: "₹4,499", orig: "₹6,000", coverImg: "/dandeli1.jpg", hoverImages: ["/dandeli1.jpg", "/dandeli2.jpg", "/dandeli3.jpg", "/dandeli4.jpg"] },
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
    { img: "🌙", label: "1N/2D", title: "New Year Night Camping at Ananthagiri Hills", loc: "Ananthagiri Hills", dur: "1 Night / 2 Days", price: "₹2,299", orig: "₹3,500", badge: "Hot" },
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

const allTrips = [
  ...products.hydWeekend,
  ...products.longTrips,
  ...products.blrTrips,
  ...products.coupleTrips,
  ...products.campingTrips
];

function ProductCard({ p }: { p: any }) {
  const imgUrl = p.coverImg || imageUrls[p.img] || imageUrls["🏔️"];
  const hoverImages = p.hoverImages;
  
  return (
    <div className="product-card group-hover-animate" style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <Link href={`/trips/${p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`} style={{ textDecoration: "none" }}>
        <div style={{ position: "relative", aspectRatio: "4/3", background: "#e8f4f8", overflow: "hidden" }}>
          
          {hoverImages ? (
            <div className="hover-slider-inner" style={{ display: "flex", width: `${hoverImages.length * 100}%`, height: "100%", willChange: "transform" }}>
              {hoverImages.map((src: string, idx: number) => (
                <img key={idx} src={src} alt={`${p.title} ${idx + 1}`} style={{ width: `${100 / hoverImages.length}%`, height: "100%", objectFit: "cover" }} loading="lazy" />
              ))}
            </div>
          ) : (
            <img src={imgUrl} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          )}

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
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#888" }}>{p.loc}</p>
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
  const [searchDest, setSearchDest] = useState("Destination");
  const [searchDur, setSearchDur] = useState("Duration");
  const [activeSearch, setActiveSearch] = useState<{dest: string, dur: string} | null>(null);

  const handleSearch = (dest?: string, dur?: string) => {
    setActiveSearch({ 
      dest: dest && typeof dest === 'string' ? dest : searchDest, 
      dur: dur && typeof dur === 'string' ? dur : searchDur 
    });
    setTimeout(() => {
      document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#fff", color: "#1a1a1a", lineHeight: 1.6, overflowX: "hidden" }}>
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
        
        @keyframes slideShowHover {
          0%, 15% { transform: translateX(0); }
          25%, 40% { transform: translateX(-25%); }
          50%, 65% { transform: translateX(-50%); }
          75%, 90% { transform: translateX(-75%); }
          100% { transform: translateX(0); }
        }
        .group-hover-animate:hover .hover-slider-inner {
          animation: slideShowHover 8s infinite ease-in-out;
        }
        .hover-slider-inner {
          transition: transform 0.5s ease;
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
            INDIA'S TRUSTED TRAVEL CLUB
          </span>

          {/* Main headline */}
          <h1 className="hero-headline" style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 auto", maxWidth: 1000 }}>
            <span style={{ whiteSpace: "nowrap" }}>Explore India's <span style={{ color: "#e4a33c" }}>Hidden Gems</span></span><br />
            With Fellow Travellers
          </h1>
          <div style={{ margin: "14px auto 0", maxWidth: 600, textAlign: "left", display: "inline-block" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "clamp(0.9rem, 1.4vw, 1rem)", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#e4a33c", fontSize: 10 }}>✦</span> Weekend trips, treks, camping & couple packages</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#e4a33c", fontSize: 10 }}>✦</span> From Hyderabad & Bangalore</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#e4a33c", fontSize: 10 }}>✦</span> Budget-friendly, community-driven, departures every week</div>
            </div>
          </div>

          {/* Search/filter bar */}
          <div className="hero-search-bar" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 20, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "16px 20px", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            <select value={searchDest} onChange={(e) => setSearchDest(e.target.value)} style={{ flex: 1, minWidth: 140, padding: "12px 16px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, color: "#333", outline: "none" }}>
              <option>Destination</option>
              <option>Gokarna</option>
              <option>Coorg</option>
              <option>Ooty</option>
              <option>Kerala</option>
              <option>Kashmir</option>
              <option>Manali</option>
              <option>Goa</option>
            </select>
            <select value={searchDur} onChange={(e) => setSearchDur(e.target.value)} style={{ flex: 1, minWidth: 120, padding: "12px 16px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, color: "#333", outline: "none" }}>
              <option>Duration</option>
              <option>Weekend (2-3 days)</option>
              <option>Extended (4-5 days)</option>
              <option>Long Trip (6+ days)</option>
            </select>
            <button onClick={() => handleSearch()} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#e4a33c", color: "#000", borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
              Search →
            </button>
          </div>

          {/* Quick destination chips */}
          <div className="dest-chips" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 16 }}>
            {[
              { name: "Goa", icon: "beach" },
              { name: "Gokarna", icon: "waves" },
              { name: "Coorg", icon: "mountain" },
              { name: "Kerala", icon: "palm" },
              { name: "Manali", icon: "snow" },
              { name: "Kashmir", icon: "landscape" },
              { name: "Spiti", icon: "peak" },
              { name: "Meghalaya", icon: "rain" },
            ].map((d) => (
              <button
                key={d.name}
                onClick={() => {
                  setSearchDest(d.name);
                  handleSearch(d.name, "Duration");
                }}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.2s", backdropFilter: "blur(4px)", cursor: "pointer" }}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SEARCH RESULTS ======== */}
      {activeSearch && (
        <section id="search-results" className="section-pad" style={{ padding: "60px 0", background: "#f8f5f2" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, margin: 0 }}>
                Search Results {activeSearch.dest !== "Destination" ? `for ${activeSearch.dest}` : ""}
              </h2>
              <button onClick={() => setActiveSearch(null)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", textDecoration: "underline", fontSize: 14 }}>
                Clear Search
              </button>
            </div>
            
            {(() => {
              const results = allTrips.filter(t => {
                let match = true;
                if (activeSearch.dest !== "Destination") {
                  match = match && (t.title.toLowerCase().includes(activeSearch.dest.toLowerCase()) || t.loc.toLowerCase().includes(activeSearch.dest.toLowerCase()));
                }
                if (activeSearch.dur !== "Duration") {
                  const daysMatch = t.dur.match(/(\d+)\s+Days/i);
                  const days = daysMatch ? parseInt(daysMatch[1]) : 0;
                  if (activeSearch.dur.includes("2-3")) {
                    if (days > 3) match = false;
                  } else if (activeSearch.dur.includes("4-5")) {
                    if (days < 4 || days > 5) match = false;
                  } else if (activeSearch.dur.includes("6+")) {
                    if (days < 6) match = false;
                  }
                }
                return match;
              });

              if (results.length === 0) return <p style={{ color: "#666", fontSize: 15 }}>No trips found matching your criteria. Try adjusting your search.</p>;
              return (
                <div className="product-grid">
                  {results.map((p, i) => <ProductCard key={i} p={p} />)}
                </div>
              )
            })()}
          </div>
        </section>
      )}

      {/* ======== 2N/3D | EX:HYD ======== */}
      <section id="weekend-trips" className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>2N/3D | EX:HYD</span>
          <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, marginTop: 8, marginBottom: 30 }}>
            2N/3D Weekend Group Trips From Hyderabad – Weekly Friday Departures
          </h2>
          <div className="product-grid">
            {products.hydWeekend.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== LONG TRIPS ======== */}
      <section id="long-trips" className="section-pad" style={{ padding: "60px 0", background: "#f8f5f2" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>LONG TRIPS</span>
          <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, marginTop: 8, marginBottom: 30 }}>Backpacking Trips</h2>
          <div className="product-grid">
            {products.longTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== 2N/3D | EX: BLR ======== */}
      <section id="blr-trips" className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>2N/3D | EX: BLR</span>
          <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, marginTop: 8, marginBottom: 30 }}>
            2N/3D Weekend Group Trips From Bangalore – Friday Departures
          </h2>
          <div className="product-grid">
            {products.blrTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>

      {/* ======== MONSOON + COUPLE SPLIT ======== */}
      <section className="section-pad" style={{ padding: "60px 0", background: "#f8f5f2" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div className="dual-grid">
            <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #e5e0db" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Monsoon SPL</span>
              <h3 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, marginTop: 8, marginBottom: 16 }}>Monsoon Treks</h3>
              <Link href="/category/trek" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "#25accd", color: "#fff", borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View Treks →</Link>
            </div>
            <div id="couple-trips" style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #e5e0db" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Couple SPL</span>
              <h3 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, marginTop: 8, marginBottom: 16 }}>Couple Tour Packages</h3>
              <Link href="/category/couple" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "#25accd", color: "#fff", borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View Packages →</Link>
            </div>
          </div>

          {/* Couple packages */}
          <div className="product-grid" style={{ marginTop: 40 }}>
            {products.coupleTrips.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
      </section>



      {/* ======== FEATURES BAR ======== */}
      <section style={{ padding: "40px 0", borderTop: "1px solid #e5e0db", borderBottom: "1px solid #e5e0db" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div className="features-grid">
            {[
              { icon: "compass", title: "25+ Destinations", desc: "Explore handpicked getaways" },
              { icon: "ticket", title: "No Fake Tickets", desc: "100% confirmed departures" },
              { icon: "chat", title: "Top Notch Support", desc: "24/7 travel assistance" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {f.icon === "compass" ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                ) : f.icon === "ticket" ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25accd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )}
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
      <section id="reviews" className="section-pad" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Client Reviews</span>
          <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, marginTop: 8, marginBottom: 30 }}>What Our Travellers Say</h2>
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
      <section className="section-pad" style={{ padding: "60px 0", background: "#f8f5f2" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#25accd", letterSpacing: 1 }}>Our Blog</span>
          <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, marginTop: 8, marginBottom: 30 }}>Travel Stories & Guides</h2>
          <div className="three-col-grid">
            {products.blogPosts.map((b, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e0db" }}>
                <div style={{ height: 200, background: "#e8f4f8", overflow: "hidden" }}>
                  <img src={imageUrls[b.img] || imageUrls["🏔️"]} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 12, color: "#999" }}>{b.date}</p>
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
          <h2 style={{ fontFamily: "'HK Grotesk', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, marginTop: 10, marginBottom: 24, color: "#fff" }}>Honeymoon Tour Packages</h2>
          <Link href="/category/couple" style={{ display: "inline-block", padding: "12px 32px", background: "#e4a33c", color: "#000", borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Explore Honeymoon →</Link>
        </div>
      </section>

    </div>
  );
}
