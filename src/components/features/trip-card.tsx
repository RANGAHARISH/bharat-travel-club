import Link from "next/link";
import { MapPin, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, getImageUrl } from "@/lib/utils";
import type { Trip } from "@/types";

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const hasDiscount = trip.discounted_price && trip.discounted_price < trip.price;
  const categoryName = trip.category?.name || "";

  return (
    <Link href={`/trips/${trip.slug}`} className="group block">
      <Card className="h-full overflow-hidden group-hover:shadow-md transition-all duration-200 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
          {trip.cover_image_url ? (
            <img
              src={getImageUrl(trip.cover_image_url)}
              alt={trip.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">
              🏕️
            </div>
          )}
          {/* Category badge */}
          <Badge variant="accent" className="absolute left-3 top-3">
            {categoryName || trip.departure_city}
          </Badge>
          {/* Duration */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            {trip.duration_days}D/{trip.duration_nights}N
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-serif text-lg font-semibold leading-snug text-brand-ink group-hover:text-brand-teal transition-colors line-clamp-2">
            {trip.title}
          </h3>

          <div className="flex items-center gap-1 text-sm text-brand-ink/60">
            <MapPin className="h-3.5 w-3.5" />
            {trip.location}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <span className="text-xl font-bold text-brand-ink">
                {formatPrice(hasDiscount ? trip.discounted_price! : trip.price)}
              </span>
              {hasDiscount && (
                <span className="ml-2 text-sm text-brand-ink/40 line-through">
                  {formatPrice(trip.price)}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-brand-saffron group-hover:underline">
              Explore →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function TripCardSkeleton() {
  return (
    <div className="rounded-xl border border-brand-teal/10 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-brand-teal/5" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-brand-teal/10 rounded w-3/4" />
        <div className="h-4 bg-brand-teal/5 rounded w-1/2" />
        <div className="h-6 bg-brand-teal/10 rounded w-1/3" />
      </div>
    </div>
  );
}
