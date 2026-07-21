import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingConfirmPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 space-y-4">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-green-800">Booking Confirmed!</h1>
        <p className="text-green-700">
          Your booking has been received. We&apos;ll send a confirmation email with all the details shortly.
        </p>
        <p className="text-sm text-green-600">
          A 25% advance payment is required to lock your spot. Our team will reach out within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/account"><Button variant="accent">View My Bookings</Button></Link>
          <Link href="/trips"><Button variant="outline">Browse More Trips</Button></Link>
        </div>
      </div>
    </div>
  );
}
