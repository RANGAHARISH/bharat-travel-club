import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink mb-6">Refund Policy</h1>
      <div className="prose prose-brand max-w-none space-y-4 text-brand-ink/80 leading-relaxed whitespace-pre-line">
{`Last updated: January 2026

Cancellation by You

Time Before Departure | Refund Amount
15+ days              | 90% of total amount
7-14 days             | 50% of total amount
Less than 7 days      | No refund

Cancellation by Us
If Bharat Travel Club cancels a trip due to unforeseen circumstances (weather, natural disasters, etc.), you'll receive a full refund or credit toward another trip.

Refund Processing
Refunds are processed within 5-7 business days to the original payment method.

Date Transfers
You can transfer your booking to a different date once, free of charge, provided you notify us at least 10 days before the original departure.

No-Show Policy
If you don't show up on the departure date without prior notice, no refund will be issued.

For any questions, contact us at hello@bharattravel.club`}
      </div>
    </div>
  );
}
