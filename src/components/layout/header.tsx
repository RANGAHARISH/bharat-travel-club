"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/trips", label: "Trips" },
  { href: "/category/beach", label: "Beach" },
  { href: "/category/trek", label: "Trek" },
  { href: "/category/camp", label: "Camp" },
  { href: "/category/couple", label: "Couple" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-teal/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="stamp-ring-solid flex items-center justify-center w-10 h-10 bg-brand-teal text-white text-sm font-bold">
            BT
          </div>
          <div className="leading-tight">
            <span className="font-serif text-lg font-bold text-brand-ink">Bharat Travel</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-saffron font-semibold">Beach · Trek · Camp</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-brand-ink/70 hover:text-brand-teal rounded-lg hover:bg-brand-teal/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/account/wishlist" className="hidden sm:flex p-2 text-brand-ink/60 hover:text-brand-teal transition-colors" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/account">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-brand-ink"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-80 border-t border-brand-teal/10" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 space-y-1 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-brand-ink/70 hover:text-brand-teal rounded-lg hover:bg-brand-teal/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2 border-brand-teal/10" />
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-sm font-medium text-brand-ink/70 hover:text-brand-teal rounded-lg hover:bg-brand-teal/5"
          >
            My Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
