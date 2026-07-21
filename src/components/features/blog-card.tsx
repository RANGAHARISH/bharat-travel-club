import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, getImageUrl } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full group-hover:shadow-md transition-all group-hover:-translate-y-1">
        <div className="aspect-[16/9] bg-brand-cream overflow-hidden">
          {post.cover_image_url ? (
            <img
              src={getImageUrl(post.cover_image_url)}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-3xl"></div>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-brand-ink/50">
            <Calendar className="h-3 w-3" />
            {post.published_at ? formatDate(post.published_at) : "Draft"}
          </div>
          <h3 className="font-serif font-semibold text-brand-ink group-hover:text-brand-teal transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-brand-ink/60 line-clamp-2">{post.excerpt}</p>
          )}
          <span className="inline-block text-sm font-medium text-brand-saffron group-hover:underline">
            Read More →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
