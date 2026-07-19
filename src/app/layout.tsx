import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bharat Travel Club — Beach · Trek · Camp",
    template: "%s | Bharat Travel Club",
  },
  description: "Curated group travel experiences across India. Weekend trips, treks, and camping adventures from Hyderabad and Bangalore.",
  openGraph: {
    title: "Bharat Travel Club",
    description: "Beach · Trek · Camp — Curated group travel across India",
    siteName: "Bharat Travel Club",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  );
}
