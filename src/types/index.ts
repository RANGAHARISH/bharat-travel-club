// ===== Profile =====
export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  created_at: string;
}

// ===== Category =====
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

// ===== Trip =====
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TripBatch {
  id: string;
  trip_id: string;
  departure_date: string;
  return_date: string;
  total_seats: number;
  seats_booked: number;
  status: "active" | "cancelled" | "completed";
}

export interface Trip {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  category?: Category;
  description: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  price: number;
  discounted_price: number | null;
  duration_days: number;
  duration_nights: number;
  departure_city: string;
  location: string;
  cover_image_url: string | null;
  gallery_images: string[];
  is_featured: boolean;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  batches?: TripBatch[];
}

// ===== Booking =====
export interface TravelerDetail {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
}

export interface Booking {
  id: string;
  user_id: string;
  trip_id: string;
  batch_id: string;
  num_travelers: number;
  traveler_details: TravelerDetail[];
  total_amount: number;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  booking_status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_id: string | null;
  created_at: string;
  trip?: Trip;
  batch?: TripBatch;
}

// ===== Review =====
export interface Review {
  id: string;
  user_id: string;
  trip_id: string;
  booking_id: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  created_at: string;
  is_approved: boolean;
  profile?: Pick<Profile, "full_name" | "avatar_url">;
}

// ===== Blog =====
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  excerpt: string | null;
  body_markdown: string;
  author_id: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  author?: Pick<Profile, "full_name" | "avatar_url">;
}

// ===== Wishlist =====
export interface Wishlist {
  id: string;
  user_id: string;
  trip_id: string;
  trip?: Trip;
}

// ===== Trip Filters =====
export interface TripFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  departureCity?: string;
  search?: string;
  sort?: "price_asc" | "price_desc" | "soonest" | "popular";
  page?: number;
  limit?: number;
}
