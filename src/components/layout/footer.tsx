import Link from "next/link";

const footerLinks = {
  explore: [
    { href: "/trips", label: "All Trips" },
    { href: "/category/beach", label: "Beach Getaways" },
    { href: "/category/trek", label: "Trekking" },
    { href: "/category/camp", label: "Camping" },
    { href: "/category/couple", label: "Couple Packages" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
  support: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="stamp-ring-solid flex items-center justify-center w-10 h-10 bg-brand-teal text-white text-sm font-bold">
                BT
              </div>
              <div className="leading-tight">
                <span className="font-serif text-lg font-bold text-white">Bharat Travel</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-saffron font-semibold">Beach · Trek · Camp</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Curated group travel experiences across India. Weekend trips, treks, and camping — departures every week from Hyderabad and Bangalore.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-brand-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-brand-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-brand-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-sm text-white/60">📞 +91 98765 43210</p>
              <p className="text-sm text-white/60">✉️ hello@bharattravel.club</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Bharat Travel Club. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors text-sm">Instagram</span>
            <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors text-sm">YouTube</span>
            <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors text-sm">WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
