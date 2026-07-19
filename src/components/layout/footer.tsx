import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#000000] text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
              src="/logo.jpg"
              alt="Bharath Travel Club"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-bold text-lg text-white">
              Bharath Travel <span className="text-[#25accd]">Club</span>
            </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Your trusted partner for budget-friendly weekend getaways, camping trips, and group tours from Hyderabad and Bangalore.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/trips", label: "Weekend Trips" },
                { href: "/category/couple", label: "Couple Packages" },
                { href: "/category/camp", label: "Camping" },
                { href: "/category/trek", label: "Honeymoon" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/blog", label: "Blog" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms" },
                { href: "/refund-policy", label: "Refund Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@bharathtravels.in</p>
              <p>📍 Hyderabad, India</p>
            </div>
            <div className="flex gap-3 mt-4">
              <span className="text-white/40 hover:text-white cursor-pointer text-lg">📸</span>
              <span className="text-white/40 hover:text-white cursor-pointer text-lg">📘</span>
              <span className="text-white/40 hover:text-white cursor-pointer text-lg">🐦</span>
              <span className="text-white/40 hover:text-white cursor-pointer text-lg">▶️</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Bharath Travel Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
