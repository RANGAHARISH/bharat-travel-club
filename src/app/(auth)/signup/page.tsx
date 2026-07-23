"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    try {
      const { error: err } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } },
      });

      if (err) {
        setError(err.message);
        setLoading(false);
      } else {
        router.push("/account?welcome=true");
        router.refresh();
      }
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        setError("Network error: Please make sure your Supabase URL and Key in .env.local are correct.");
      } else {
        setError("An unexpected error occurred.");
      }
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="stamp-ring-solid flex items-center justify-center w-14 h-14 bg-brand-teal text-white text-lg font-bold mx-auto mb-3">BT</div>
        <h1 className="font-serif text-2xl font-bold text-brand-ink">Join the Club</h1>
        <p className="text-sm text-brand-ink/60 mt-1">Create your account and start exploring</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="fullName" label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <Input id="email" label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input id="password" label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Min 8 characters" />
        {error && <p className="text-sm text-brand-coral">{error}</p>}
        <Button type="submit" loading={loading} className="w-full bg-[#25accd] hover:bg-[#1d8ca8] text-white" size="lg">Create Account</Button>
      </form>

      <p className="text-center text-sm text-brand-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-teal hover:underline font-medium">Sign in</Link>
      </p>
    </div>
  );
}
