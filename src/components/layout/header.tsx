"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/trips", label: "Weekend Group Trips" },
  { href: "/category/couple", label: "Couple Tour Packages" },
  { href: "/category/camp", label: "Camping" },
  { href: "/category/trek", label: "Honeymoon Tour Packages" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.jpg"
            alt="Bharath Travel Club"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
          />
          <span className="font-bold text-sm sm:text-base lg:text-lg text-[#1a1a1a] truncate max-w-[140px] sm:max-w-none">
            Bharath Travel <span className="text-[#25accd]">Club</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#25accd] rounded-lg hover:bg-[#e8f4f8] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth buttons + mobile hamburger */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop: shown on lg+, hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-[#25accd]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[#25accd] hover:bg-[#1d8ca8] text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Hamburger - always visible on mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown — includes nav links + auth */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[500px] border-t border-gray-100 shadow-lg" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 space-y-1 bg-white">
          {/* Auth links at top on mobile */}
          <div className="flex gap-2 pb-3 mb-2 border-b border-gray-100">
            <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-[#25accd] text-[#25accd] hover:bg-[#e8f4f8]">
                <LogIn className="h-4 w-4 mr-1.5" /> Login
              </Button>
            </Link>
            <Link href="/signup" className="flex-1" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full bg-[#25accd] hover:bg-[#1d8ca8] text-white">
                <UserPlus className="h-4 w-4 mr-1.5" /> Sign Up
              </Button>
            </Link>
          </div>

          {/* Nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#25accd] rounded-lg hover:bg-[#e8f4f8] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
