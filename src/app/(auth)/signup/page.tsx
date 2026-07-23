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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (supabaseUrl.includes("your-project-id") || !supabaseUrl) {
      setError("Please configure your actual Supabase URL and Key in .env.local. The current keys are placeholders.");
      setLoading(false);
      return;
    }

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

  async function handleGoogleSignIn() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (supabaseUrl.includes("your-project-id") || !supabaseUrl) {
      setError("Please configure your actual Supabase URL and Key in .env.local. The current keys are placeholders.");
      return;
    }
    
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`,
        },
      });
    } catch (error: any) {
      setError("Failed to initialize Google Sign In");
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
        <Button type="submit" loading={loading} className="w-full bg-[#25accd] hover:bg-[#1d8ca8] text-white font-bold text-lg h-12 shadow-lg shadow-[#25accd]/30" size="lg">Create Account</Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-brand-teal/10" /></div>
        <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-brand-ink/40">or</span></div>
      </div>

      <Button type="button" variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn}>
        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Sign up with Google
      </Button>

      <p className="text-center text-sm text-brand-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-teal hover:underline font-medium">Sign in</Link>
      </p>
    </div>
  );
}
