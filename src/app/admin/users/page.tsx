import { createServer } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

async function getUsers() {
  try {
    const supabase = await createServer();
    if (!supabase) return [];
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function AdminUsersPage() {
  const profiles = await getUsers();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-brand-ink mb-6">Users</h1>
      <div className="rounded-xl border border-brand-teal/10 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-brand-ink/60 text-xs uppercase tracking-wider">
              <tr><th className="text-left px-4 py-3 font-medium">Name</th><th className="text-left px-4 py-3 font-medium">Role</th><th className="text-left px-4 py-3 font-medium">Joined</th></tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/5">
              {profiles.length > 0 ? profiles.map((p: any) => (
                <tr key={p.id} className="hover:bg-brand-cream/50">
                  <td className="px-4 py-3 font-medium text-brand-ink">{p.full_name || "—"}</td>
                  <td className="px-4 py-3"><Badge variant={p.role === "admin" ? "accent" : "default"}>{p.role}</Badge></td>
                  <td className="px-4 py-3 text-brand-ink/60 text-xs">{formatDate(p.created_at)}</td>
                </tr>
              )) : <tr><td colSpan={3} className="px-4 py-8 text-center text-brand-ink/40">No users yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
