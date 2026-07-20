"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, X, ChevronRight } from "lucide-react";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contact us"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 999,
          width: 56, height: 56, borderRadius: "50%",
          border: "none", cursor: "pointer",
          background: open ? "#dc2626" : "#25accd",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,172,205,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Contact Panel */}
      <div
        style={{
          position: "fixed", bottom: 92, right: 24, zIndex: 999,
          width: 300, maxWidth: "calc(100vw - 32px)",
          background: "#fff", borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
          transform: open ? "translateY(0)" : "translateY(20px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #25accd, #187a90)",
          padding: "20px 24px", color: "#fff",
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>💬 Need Help?</h3>
          <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.85 }}>
            We typically reply in a few minutes
          </p>
        </div>

        {/* Contact options */}
        <div style={{ padding: 12 }}>
          {[
            {
              icon: <MessageCircle size={20} />,
              label: "WhatsApp",
              sub: "Quick reply via chat",
              href: "https://wa.me/919876543210",
              color: "#25D366",
              bg: "#e8f5e9",
            },
            {
              icon: <Phone size={20} />,
              label: "Call Us",
              sub: "+91 98765 43210",
              href: "tel:+919876543210",
              color: "#25accd",
              bg: "#e8f4f8",
            },
            {
              icon: <Mail size={20} />,
              label: "Email",
              sub: "info@bharathtravels.in",
              href: "mailto:info@bharathtravels.in",
              color: "#e4a33c",
              bg: "#fef5e7",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 12,
                textDecoration: "none", color: "#333",
                background: "transparent",
                transition: "background 0.2s",
                marginBottom: 2,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8f5f2"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: item.bg, color: item.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{item.label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#888" }}>{item.sub}</p>
              </div>
              <ChevronRight size={16} color="#ccc" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 24px", borderTop: "1px solid #f0f0f0",
          textAlign: "center", fontSize: 11, color: "#bbb",
        }}>
          Typically replies within 5 mins ⚡
        </div>
      </div>
    </>
  );
}
