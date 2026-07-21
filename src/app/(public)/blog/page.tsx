import Link from "next/link";
import type { Metadata } from "next";
import { createServer } from "@/lib/supabase/server";
import { BlogCard } from "@/components/features/blog-card";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Travel Blog",
  description: "Travel stories, guides, tips, and inspiration from Bharat Travel Club.",
};

async function getPosts() {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data } = await supabase
      .from("blog_posts")
      .select("*, author:profiles(full_name, avatar_url)")
      .eq("published", true)
      .order("published_at", { ascending: false });
    return (data || []) as BlogPost[];
  } catch { return []; }
}

export default async function BlogPage() {
  const typedPosts = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink">Travel Blog</h1>
        <p className="text-brand-ink/60 mt-2">Stories, guides, and tips from the road.</p>
      </div>

      {typedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4"></div>
          <h2 className="font-serif text-2xl font-bold text-brand-ink mb-2">No posts yet</h2>
          <p className="text-brand-ink/60">We&apos;re working on some exciting travel content. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
