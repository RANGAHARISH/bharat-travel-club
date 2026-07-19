import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mb-6">Privacy Policy</h1>
      <div className="prose prose-brand max-w-none space-y-4 text-brand-ink/80 leading-relaxed whitespace-pre-line">
{`Last updated: January 2026

Bharat Travel Club respects your privacy. This policy explains how we collect, use, and protect your personal information.

Information We Collect
- Name, email address, phone number when you sign up
- Payment information (processed securely via our payment partners)
- Trip preferences and booking history
- Communications with our team

How We Use Your Data
- To process and confirm your bookings
- To send you trip updates and confirmations
- To improve our services and trip recommendations
- To send occasional promotional emails (you can opt out anytime)

Data Protection
We implement industry-standard security measures. Your payment data is never stored on our servers — it's processed directly by our payment partners (Razorpay/Stripe).

Contact
Email: hello@bharattravel.club`}
      </div>
    </div>
  );
}
