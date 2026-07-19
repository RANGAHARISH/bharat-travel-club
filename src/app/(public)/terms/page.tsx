import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mb-6">Terms & Conditions</h1>
      <div className="prose prose-brand max-w-none space-y-4 text-brand-ink/80 leading-relaxed whitespace-pre-line">
{`Last updated: January 2026

Booking & Payment
- A 25% advance is required to confirm your booking
- Full payment must be made 7 days before departure
- Prices are per person unless stated otherwise

Cancellation Policy
- 15+ days before departure: 90% refund
- 7-14 days before departure: 50% refund
- Less than 7 days: No refund

Travel Responsibilities
- Carry a valid government ID
- Follow the trip leader's instructions
- Bharat Travel Club is not liable for loss of personal belongings

Code of Conduct
- Respect fellow travellers and local communities
- No littering — leave destinations cleaner than you found them
- Alcohol and drugs are prohibited during trips`}
      </div>
    </div>
  );
}
