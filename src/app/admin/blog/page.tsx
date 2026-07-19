import Link from "next/link";
import { Plus } from "lucide-react";
import { createServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

async function getPosts() {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-brand-ink">Blog Posts</h1>
        <Link href="/admin/blog/new"><Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Post</Button></Link>
      </div>
      <div className="rounded-xl border border-brand-teal/10 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-brand-ink/60 text-xs uppercase tracking-wider">
              <tr><th className="text-left px-4 py-3 font-medium">Title</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Date</th></tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/5">
              {posts.length > 0 ? posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-brand-cream/50">
                  <td className="px-4 py-3 font-medium text-brand-ink">{post.title}</td>
                  <td className="px-4 py-3"><Badge variant={post.published ? "accent" : "default"}>{post.published ? "Published" : "Draft"}</Badge></td>
                  <td className="px-4 py-3 text-brand-ink/60 text-xs">{formatDate(post.created_at)}</td>
                </tr>
              )) : <tr><td colSpan={3} className="px-4 py-8 text-center text-brand-ink/40">No posts yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
