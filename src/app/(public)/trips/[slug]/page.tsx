import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Clock, MapPin, Phone, Users } from "lucide-react";
import { ImageSlider } from "@/components/ui/image-slider";
import { createServer } from "@/lib/supabase/server";

// ===== TRIP DETAILS DATABASE (fallback when Supabase not connected) =====
export const tripDetails: Record<string, {
  title: string;
  tagline: string;
  price: number;
  origPrice: number;
  duration: string;
  location: string;
  contact: string;
  image: string;
  images: string[];
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
    tagline: "GOKARNA • MURUDESHWAR • DANDELI TRIP",
    price: 4999,
    origPrice: 6500,
    duration: "2 Nights | 3 Days",
    location: "Gokarna, Karnataka",
    contact: "7396952195",
    image: "/gokarna1.jpg",
    images: [
      "/gokarna1.jpg",
      "/gokarna2.avif",
      "/gokarna3.jpg",
      "/gokarna4.jpg"
    ],
    description: "Join us for an unforgettable weekend exploring the coastal gems of Karnataka — Gokarna, Murudeshwar, and Dandeli. This budget-friendly group trip includes train tickets, water activities, and memories that last a lifetime.",
    highlights: ["Gokarna • Murudeshwar • Dandeli", "Train Tickets Included", "Kayaking, Coracle & Zipline", "Om Beach & 4 Beaches Trek"],
    itinerary: [
      {
        day: "Day 0",
        title: "Departure",
        details: [
          "Start your journey from your city to Hubli",
          "Train tickets provided"
        ]
      },
      {
        day: "Day 1",
        title: "Dandeli Adventure",
        details: [
          "Morning:",
          "  • Reach Hubli Railway Station",
          "  • Pickup and transfer to Dandeli Resort",
          "  • Check-in & freshen up",
          "  • Finish breakfast",
          "",
          "Water Activities:",
          "  • Kayaking",
          "  • Coracle Ride",
          "  • Zipline",
          "",
          "If time permits:",
          "  • Crocodile Park",
          "  • Elephant Camp",
          "  • Eco Park",
          "",
          "Evening at Dandeli Resort:",
          "  • Music & Campfire",
          "  • Rain Dance",
          "  • Swimming Pool",
          "  • Indoor Games",
          "",
          "Dinner & overnight stay"
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
          "Check-in to stay & overnight rest"
        ]
      },
      {
        day: "Day 3",
        title: "Gokarna Exploration",
        details: [
          "Morning Visit:",
          "  • Mahabaleshwar Temple",
          "  • Gokarna Main Beach",
          "  • Om Beach",
          "",
          "OR",
          "",
          "4 Beaches Trek:",
          "  • Belekan Beach",
          "  • Paradise Beach",
          "  • Half Moon Beach",
          "  • Om Beach",
          "",
          "Finish lunch and proceed to Hubli Railway Station"
        ]
      }
    ],
    inclusions: [
      "Train Tickets (Both Sides)",
      "3 Days Local Transport",
      "2 Nights Accommodation",
      "1 Day Food (Dandeli Resort)",
      "3 Water Activities (Kayaking, Coracle Ride & Zipline)",
      "Trip Organizer",
      "Toll & Driver Allowance"
    ],
    exclusions: [
      "Food for 2 Days",
      "Anything not mentioned in inclusions",
      "Extra charges for AC Train Tickets",
      "Couple Room Charges"
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
  "ooty-weekend-group-tour-package": {
    title: "Ooty Coonoor + Isha (3D/2N)",
    tagline: "ISHA, COONOOR & OOTY",
    price: 7999,
    origPrice: 7999,
    duration: "2 Nights | 3 Days",
    location: "Ooty, Tamil Nadu",
    contact: "6302225932",
    image: "/ooty1.avif",
    images: [
      "/ooty1.avif",
      "/ooty2.avif",
      "/ooty3.avif",
      "/ooty4.avif"
    ],
    description: "Experience the magic of the Nilgiris with our budget-friendly 3D/2N trip covering Ooty, Coonoor, and the famous Isha Foundation.",
    highlights: ["Ooty & Coonoor", "Isha Foundation", "Bandipur Forest Drive", "Toy Train Experience"],
    itinerary: [
      {
        day: "Day 1",
        title: "Ooty Odyssey",
        details: [
          "  • Reach Bangalore & Start",
          "  • Basic Freshenup on the way (No Shower)",
          "  • Bandipur Forest Drive",
          "  • Eucalyptus point",
          "  • Marvel at Pykara Waterfalls",
          "  • Shooting Point",
          "  • Stay in Ooty"
        ]
      },
      {
        day: "Day 2",
        title: "Coonoor Charms & Isha",
        details: [
          "  • Doddabetta Peak",
          "  • Stroll through Tea Gardens",
          "  • Tea Factory",
          "  • Head to Isha Foundation",
          "  • Witness Adiyogi Laser Light Show",
          "  • Reach back to stay & Rest"
        ]
      },
      {
        day: "Day 3",
        title: "Return Journey",
        details: [
          "  • Start at 4AM from the stay",
          "  • Toy Train From Coonoor to Ooty (Offline Tickets)",
          "  • Mysuru palace (Time permits)",
          "  • Return back to railway station"
        ]
      }
    ],
    inclusions: [
      "Train Tickets (Non AC Sleeper)",
      "Accommodation (non ac) (3/4 sharing rooms)",
      "Local transportation for 3 days(non Ac)",
      "Trip guide charges",
      "Toy Train (Tickets Subject to Availability)",
      "Permits, Taxes, Tolls, Parking, Driver Allowances",
      "Basic First Aid"
    ],
    exclusions: [
      "Food",
      "All Entry tickets & Activities",
      "Personal expenses",
      "Anything which is not mentioned in Inclusions."
    ],
    notes: [
      "If you want Sleeper Bus AC or Non AC - Cost will be Extra",
      "For Double Sharing Room - Cost will be Extra",
      "Extra Cost For Tatkal & Premium Tatkal (train)",
      "LET US KNOW IF YOU WANT AC TRAIN TICKETS (or) COUPLE",
      "This is a budget-friendly trip and not a luxury one. We request your cooperation in case of any sudden adversities.",
      "The Trip Organising Management reserves the right to add/remove any member, change the route, activity, timings, or duration depending on the situation and climatic conditions.",
      "In case of unexpected vehicle breakdown, traffic issues, or climatic conditions, some places may be missed. If due to these reasons a train/bus is missed at the last minute, the company will not be held responsible.",
      "We charge for the services we provide (travel, stay, arrangements, coordination, etc.) and not for specific places. In case certain spots cannot be covered due to unforeseen reasons, it does not affect the service charges."
    ],
    cancelPolicy: [
      "Cancellation within 2 days prior to trip start → Full amount payable.",
      "Cancellation within 1 week prior → 50% of the trip cost payable."
    ]
  },
  "coorg-weekend-group-tour-from-hyderabad": {
    title: "Coorg – Chikmagalur Backpacking Trip (3D/2N)",
    tagline: "COORG • CHIKMAGALUR BACKPACKING",
    price: 6500,
    origPrice: 7500,
    duration: "2 Nights | 3 Days",
    location: "Coorg, Karnataka",
    contact: "6302225932",
    image: "/coorg1.jpg",
    images: [
      "/coorg1.jpg",
      "/coorg2.jpg",
      "/coorg3.jpg",
      "/coorg4.jpg"
    ],
    description: "Explore the misty hills of Coorg and Chikmagalur with our budget-friendly 3D/2N backpacking trip.",
    highlights: ["Coorg", "Chikmagalur", "Mandalpatti Peak", "Mullayanagiri Peak"],
    itinerary: [
      {
        day: "Day 0",
        title: "Night Departure",
        details: [
          "  • Begin your journey from your city to Bangalore",
          "  • Overnight travel via Sleeper Class Train (Tickets arranged)"
        ]
      },
      {
        day: "Day 1",
        title: "Into the Heart of Coorg",
        details: [
          "  • Arrive at KSR Bangalore Railway Station by 6:00 AM",
          "  • Head to a nearby restaurant for basic fresh-up and breakfast (No shower)",
          "  • Namdroling Monastery (Golden Temple)",
          "  • Chiklihole reserviour",
          "  • Raja’s Seat – Sunset views & garden",
          "  • Overnight stay at Coorg"
        ]
      },
      {
        day: "Day 2",
        title: "Coorg to Chikmagalur",
        details: [
          "  • Jeep ride to Mandalpatti Peak (jeep cost excluded)",
          "  • Walk through the woods to Abbey Falls",
          "  • Explore the majestic Belur Temple",
          "  • Enjoy lakeside views at Yagachi Reservoir",
          "  • Stay overnight at Chikmagalur"
        ]
      },
      {
        day: "Day 3",
        title: "Chikmagalur Adventures",
        details: [
          "  • Sunrise at Mullayanagiri Peak (off-road ride extra)",
          "  • Dip into the beauty of Jhari Falls (jeep ride extra)",
          "  • Return trip to Bangalore to board your train back"
        ]
      }
    ],
    inclusions: [
      "Round-trip Sleeper Class Train Tickets",
      "3 Days Travel in Private Vehicle",
      "Accommodation for 2 Nights (Shared Rooms)",
      "Entry Passes",
      "Trip Leader / Guide",
      "Tolls, Parking & Other Charges"
    ],
    exclusions: [
      "Meals (All Days)",
      "Off-road Jeep Costs (Mandalpatti, Mullayanagiri, Jhari Falls)",
      "Private Couple Rooms – Add-on Charges",
      "AC Train Upgrades – Additional Charges",
      "Extra Cost For Tatkal & Premium Tatkal (train)"
    ],
    notes: [
      "Advance Payment is Non-Refundable",
      "This is a Backpacking-Style Budget Trip – not a luxury tour",
      "Weather conditions may alter the itinerary. Desi Travellers is not liable for such changes",
      "We assure safe travel and memorable experiences",
      "The Trip Organising Management reserves the right to add/remove any member, change the route, activity, timings, or duration depending on the situation and climatic conditions.",
      "In case of unexpected vehicle breakdown, traffic issues, or climatic conditions, some places may be missed. If due to these reasons a train/bus is missed at the last minute, the company will not be held responsible.",
      "We charge for the services we provide (travel, stay, arrangements, coordination, etc.) and not for specific places. In case certain spots cannot be covered due to unforeseen reasons, it does not affect the service charges."
    ],
    cancelPolicy: [
      "Cancellation within 2 days prior to trip start → Full amount payable.",
      "Cancellation within 1 week prior → 50% of the trip cost payable."
    ]
  },
  "dandeli-weekend-group-tour": {
    title: "Dandeli Weekend Group Tour",
    tagline: "DANDELI ADVENTURE & CAMPING",
    price: 4999,
    origPrice: 6000,
    duration: "2 Nights | 3 Days",
    location: "Dandeli, Karnataka",
    contact: "6302225932",
    image: "/dandeli1.jpg",
    images: [
      "/dandeli1.jpg",
      "/dandeli2.jpg",
      "/dandeli3.jpg",
      "/dandeli4.jpg"
    ],
    description: "Experience the thrill of Dandeli with water activities, jungle safari, and relaxing camping.",
    highlights: ["Water Activities", "Jungle Safari", "Eco Park", "Camp Fire & Music"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Water Activities",
        details: [
          "  • Check into the resort",
          "  • Completely the Water activities",
          "  • Evening activities like( Rain dance, Swimming pool, Camp fire, Music & Indore activities)"
        ]
      },
      {
        day: "Day 2",
        title: "Safari & Return",
        details: [
          "  • Jungle safari",
          "  • Maulangi Eco park",
          "  • Crocodile park",
          "  • Return back to station"
        ]
      }
    ],
    inclusions: [
      "Up and down train tickets",
      "1 breakfast, 2 lunch, 1 dinner",
      "3 water activities",
      "2 days Transportation"
    ],
    exclusions: [
      "Jeep ride",
      "River rafting, zipline",
      "Remaining food",
      "Entry tickets"
    ],
    notes: [
      "This is a budget-friendly trip and not a luxury one. We have taken utmost care to make your journey comfortable and memorable within a low budget. We request your cooperation in case of any sudden adversities.",
      "The Trip Organising Management reserves the right to add/remove any member, change the route, activity, timings, or duration depending on the situation and climatic conditions. All such decisions are taken keeping your safety first.",
      "In case of unexpected vehicle breakdown, traffic issues, or climatic conditions, some places may be missed. If due to these reasons a train/bus is missed at the last minute, the company will not be held responsible. We request your understanding in such rare situations.",
      "We charge for the services we provide (travel, stay, arrangements, coordination, etc.) and not for specific places. In case certain spots cannot be covered due to unforeseen reasons, it does not affect the service charges."
    ],
    cancelPolicy: [
      "Cancellation within 2 days prior to trip start → Full amount payable.",
      "Cancellation within 1 week prior → 50% of the trip cost payable."
    ]
  },
  "gokarna-dandeli-2n-3d-couple-package": {
    title: "Gokarna Dandeli 2N/3D Couple Package",
    tagline: "GOKARNA • DANDELI COUPLE GETAWAY",
    price: 37000,
    origPrice: 40000,
    duration: "2 Nights | 3 Days",
    location: "Gokarna & Dandeli, Karnataka",
    contact: "7396952195",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
    ],
    description: "A romantic getaway for couples exploring the best of Karnataka's coast and forests.",
    highlights: ["Couple Friendly", "Gokarna Beaches", "Dandeli Resort", "Water Activities"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Dandeli", details: ["Check-in at Dandeli Resort", "Evening campfire & dinner"] },
      { day: "Day 2", title: "Coastal Tour", details: ["Visit Murudeshwar Temple", "Gokarna Beach walk", "Overnight stay"] },
      { day: "Day 3", title: "Departure", details: ["Morning beach trek", "Check-out & return"] }
    ],
    inclusions: ["2 Nights Accommodation", "Local Transport", "Breakfast", "Trip Organizer"],
    exclusions: ["Lunch & Dinner", "Extra charges"],
    notes: ["Advance payment is non-refundable.", "Carry valid ID proof."],
    cancelPolicy: ["Cancellation within 2 days → Full amount", "Cancellation within 1 week → 50%"]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServer();
  let title = "Trip Not Found";
  let description = "";

  if (supabase) {
    const { data } = await supabase.from("trips").select("title, description").eq("slug", slug).single();
    if (data) {
      title = data.title;
      description = data.description;
    }
  }

  if (title === "Trip Not Found" && tripDetails[slug]) {
    title = tripDetails[slug].title;
    description = tripDetails[slug].description;
  }
  return { title, description };
}

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServer();
  
  let tripData = null;
  if (supabase) {
    const { data } = await supabase.from("trips").select("*, category:categories(*)").eq("slug", slug).single();
    tripData = data;
  }

  let trip = null;
  if (tripData) {
    trip = {
      title: tripData.title,
      tagline: tripData.category?.name ? `${tripData.category.name.toUpperCase()} TRIP` : "AMAZING GETAWAY",
      price: tripData.discounted_price || tripData.price,
      origPrice: tripData.price,
      duration: `${tripData.duration_nights} Nights | ${tripData.duration_days} Days`,
      location: tripData.location,
      contact: "7396952195", // Hardcoded for now
      image: tripData.cover_image_url || "",
      images: tripData.gallery_images?.length ? tripData.gallery_images : (
        slug === "gokarna-weekend-group-tour" ? [
          "/gokarna1.jpg",
          "/gokarna2.avif",
          "/gokarna3.jpg",
          "/gokarna4.jpg"
        ] : slug === "ooty-weekend-group-tour-package" ? [
          "/ooty1.avif",
          "/ooty2.avif",
          "/ooty3.avif",
          "/ooty4.avif"
        ] : slug === "coorg-weekend-group-tour-from-hyderabad" ? [
          "/coorg1.jpg",
          "/coorg2.jpg",
          "/coorg3.jpg",
          "/coorg4.jpg"
        ] : slug === "dandeli-weekend-group-tour" ? [
          "/dandeli1.jpg",
          "/dandeli2.jpg",
          "/dandeli3.jpg",
          "/dandeli4.jpg"
        ] : (tripData.cover_image_url ? [tripData.cover_image_url] : [])
      ),
      description: tripData.description,
      highlights: [], // Fallback
      itinerary: tripData.itinerary || [],
      inclusions: tripData.inclusions || [],
      exclusions: tripData.exclusions || [],
      notes: ["Water activities are managed by authorities and subject to weather.", "Advance payment is non-refundable.", "Carry valid ID proof."], // Fallback generic notes
      cancelPolicy: ["Cancellation within 2 days prior to trip → Full amount payable", "Cancellation within 1 week prior → 50% of trip cost payable"] // Fallback generic policy
    };
  } else {
    trip = tripDetails[slug];
  }

  if (!trip) notFound();

  const hasDiscount = trip.origPrice > trip.price;

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#f8f5f2", color: "#1a1a1a", lineHeight: 1.6 }}>
      <style>{`
        @media (max-width: 640px) {
          .detail-hero-img { aspect-ratio: 16/9 !important; }
          .detail-breadcrumb { padding-top: 24px !important; padding-left: 16px !important; padding-right: 16px !important; }
          .detail-section { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (max-width: 480px) {
          .detail-price { font-size: 28px !important; }
          .quick-info-wrap { gap: 10px !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="detail-breadcrumb" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#888", marginBottom: 20, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/trips" style={{ color: "#888", textDecoration: "none" }}>Trips</Link>
          <span>›</span>
          <span style={{ color: "#333" }}>{trip.title}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="detail-section" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        <div className="detail-hero-img" style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", marginBottom: 30, background: "#f0f0f0" }}>
          <ImageSlider images={trip.images || [trip.image]} />
          <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{trip.title}</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.9, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{trip.tagline}</p>
          </div>
        </div>
      </div>

      <div className="detail-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ===== LEFT COLUMN ===== */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Quick Info Bar */}
          <div className="quick-info-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 16, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e0db" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <Clock size={16} color="#e4a33c" />
              <span><strong>{trip.duration}</strong></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <MapPin size={16} color="#e4a33c" />
              <span>{trip.location}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <Phone size={16} color="#e4a33c" />
              <span>{trip.contact}</span>
            </div>
          </div>

          {/* Highlights */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 12px" }}>Trip Highlights</h2>
            <div className="highlights-grid">
              {trip.highlights.map((h: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#555" }}>
                  <span style={{ color: "#33abcb", fontSize: 16 }}>✓</span> {h}
                </div>
              ))}
            </div>
          </div>

          {/* Full Itinerary */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 16px" }}>Detailed Itinerary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {trip.itinerary.map((day: any, i: number) => (
                <div key={i} style={{ borderLeft: "3px solid #33abcb", paddingLeft: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#33abcb", margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ background: "#33abcb", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{i + 1}</span>
                    {day.day} – {day.title}
                  </h3>
                  <div className="itinerary-details" style={{ paddingLeft: 36 }}>
                    {(() => {
                      const groups: { type: "bullet" | "text"; items: string[] }[] = [];
                      let current: { type: "bullet" | "text"; items: string[] } | null = null;
                      day.details.forEach((line: string) => {
                        if (line === "") {
                          if (current) { groups.push(current); current = null; }
                        } else if (line.startsWith("  •") || line.startsWith("  –")) {
                          const text = line.replace(/^\s*[•–]\s*/, "");
                          if (current?.type !== "bullet") {
                            if (current) groups.push(current);
                            current = { type: "bullet", items: [text] };
                          } else {
                            current.items.push(text);
                          }
                        } else {
                          if (current) { groups.push(current); current = null; }
                          groups.push({ type: "text", items: [line] });
                        }
                      });
                      if (current) groups.push(current);
                      return groups.map((g: any, gi: number) => {
                        if (g.type === "text") return <p key={gi} style={{ margin: "0 0 2px 0", fontSize: 13.5, color: "#444" }}>{g.items[0]}</p>;
                        return (
                          <ul key={gi} style={{ margin: "4px 0", padding: 0, listStyle: "none" }}>
                            {g.items.map((item: string, li: number) => (
                              <li key={li} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 13.5, color: "#555", padding: "1px 0", lineHeight: 1.5 }}>
                                <span style={{ color: "#33abcb", flexShrink: 0 }}>•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      });
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="inc-exc-grid">
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#16a34a" }}>Inclusions</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {trip.inclusions.map((item: string, i: number) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#555", display: "flex", gap: 8 }}><span style={{ color: "#16a34a", flexShrink: 0 }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#dc2626" }}>Exclusions</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {trip.exclusions.map((item: string, i: number) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#555", display: "flex", gap: 8 }}><span style={{ color: "#dc2626", flexShrink: 0 }}>✕</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#e4a33c" }}>Important Notes</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {trip.notes.map((note: string, i: number) => (
                <li key={i} style={{ fontSize: 13, color: "#555", lineHeight: 1.5, display: "flex", gap: 8 }}><span style={{ color: "#e4a33c", flexShrink: 0 }}>•</span> {note}</li>
              ))}
            </ul>
          </div>

          {/* Cancellation Policy */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e0db" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 12px", color: "#dc2626" }}>Cancellation Policy</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {trip.cancelPolicy.map((policy: string, i: number) => (
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
                  <Clock size={16} color="#e4a33c" />
                  <span>{trip.duration}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <MapPin size={16} color="#e4a33c" />
                  <span>{trip.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <Phone size={16} color="#e4a33c" />
                  <span>{trip.contact}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                  <Users size={16} color="#e4a33c" />
                  <span>Group Departure</span>
                </div>
              </div>

              <Link href={`/booking/${slug}`} style={{ display: "block", marginTop: 24 }}>
                <Button className="w-full" size="lg" style={{ width: "100%", background: "#e4a33c", color: "#000", border: "none", padding: "14px 24px", fontSize: 16, fontWeight: 700, borderRadius: 12, cursor: "pointer" }}>
                  Book Now – ₹{trip.price.toLocaleString("en-IN")}
                </Button>
              </Link>
              <p style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 10 }}>Secure your spot with 25% advance</p>
            </div>

            {/* Organized by */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e0db", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Organized by</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#33abcb", margin: "4px 0" }}>Bharath Travel Club</p>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>{trip.contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
