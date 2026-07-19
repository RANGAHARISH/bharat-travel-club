import { Star } from "lucide-react";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-brand-teal/10 bg-white p-6 space-y-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-brand-saffron text-brand-saffron" : "fill-brand-teal/10 text-brand-teal/10"}`}
          />
        ))}
      </div>
      <p className="text-sm text-brand-ink/80 leading-relaxed italic">
        &ldquo;{review.comment}&rdquo;
      </p>
      <p className="text-sm font-medium text-brand-teal">
        {review.profile?.full_name || "Anonymous"}
      </p>
    </div>
  );
}
