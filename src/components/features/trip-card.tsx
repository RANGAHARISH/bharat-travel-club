import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Trip } from "@/types";

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const hasDiscount = trip.discounted_price && trip.discounted_price > trip.price;
  const emojis = [];
  const emoji = "";

  return (
    <Link href={`/trips/${trip.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group-hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-red/10 to-blue-100">
          {trip.cover_image_url ? (
            <img src={trip.cover_image_url} alt={trip.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-5xl opacity-60">{emoji}</div>
          )}
          {trip.is_featured && (
            <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            {trip.duration_days}D/{trip.duration_nights}N
          </span>
        </div>
        {/* Body */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-brand-red transition-colors line-clamp-2 text-sm">
            {trip.title}
          </h3>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" /> {trip.location}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(hasDiscount ? trip.discounted_price! : trip.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(trip.price)}</span>
            )}
          </div>
          <span className="inline-block text-sm font-medium text-brand-red group-hover:underline">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-5 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}
