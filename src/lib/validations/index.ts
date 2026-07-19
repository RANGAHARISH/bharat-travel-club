import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  avatar_url: z.string().optional(),
});

export const travelerDetailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be 120 or less"),
  gender: z.enum(["male", "female", "other"]),
});

export const bookingSchema = z.object({
  batch_id: z.string().uuid("Please select a travel date"),
  num_travelers: z.number().min(1).max(20),
  travelers: z.array(travelerDetailSchema).min(1),
});

export const tripSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  category_id: z.string().uuid("Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
    })
  ),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  price: z.number().positive("Price must be positive"),
  discounted_price: z.number().positive().optional().nullable(),
  duration_days: z.number().positive(),
  duration_nights: z.number().positive(),
  departure_city: z.string().min(1, "Departure city is required"),
  location: z.string().min(1, "Location is required"),
  is_featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().optional(),
  body_markdown: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().default(false),
  cover_image_url: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Review must be at least 5 characters"),
  trip_id: z.string().uuid(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type TripInput = z.infer<typeof tripSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
