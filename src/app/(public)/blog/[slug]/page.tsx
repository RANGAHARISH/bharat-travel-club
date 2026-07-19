import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createServer } from "@/lib/supabase/server";
import { formatDate, getImageUrl } from "@/lib/utils";
import type { BlogPost } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const supabase = await createServer();
    if (!supabase) return { title: "Post" };
    const { data } = await supabase.from("blog_posts").select("title, excerpt").eq("slug", slug).single();
    if (!data) return { title: "Post Not Found" };
    return { title: data.title, description: data.excerpt || "" };
  } catch { return { title: "Post Not Found" }; }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const supabase = await createServer();
    if (!supabase) throw new Error("No Supabase");
    const { data: post } = await supabase
      .from("blog_posts")
      .select("*, author:profiles(full_name, avatar_url)")
      .eq("slug", slug)
      .single();
    if (!post) notFound();
    const typedPost = post as unknown as BlogPost;

    return (
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-brand-ink/50 mb-6">
          <Link href="/" className="hover:text-brand-teal">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-teal">Blog</Link>
          <span>/</span>
          <span className="text-brand-ink/80">{typedPost.title}</span>
        </nav>
        <header className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-ink leading-tight">{typedPost.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-brand-ink/50">
            <span>{typedPost.published_at ? formatDate(typedPost.published_at) : "Draft"}</span>
            {typedPost.author && <span>By {typedPost.author.full_name}</span>}
          </div>
        </header>
        {typedPost.cover_image_url && (
          <img src={getImageUrl(typedPost.cover_image_url)} alt={typedPost.title} className="w-full aspect-video object-cover rounded-xl mb-8" />
        )}
        <div className="prose prose-brand max-w-none text-brand-ink/80 leading-relaxed whitespace-pre-line">{typedPost.body_markdown}</div>
      </article>
    );
  } catch {
    notFound();
  }
}
