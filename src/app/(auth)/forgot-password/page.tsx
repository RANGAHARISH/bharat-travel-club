"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/account` });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <div className="text-4xl"></div>
        <h1 className="font-serif text-2xl font-bold text-brand-ink">Check Your Email</h1>
        <p className="text-sm text-brand-ink/60">We&apos;ve sent a password reset link to {email}</p>
        <Link href="/login" className="text-brand-teal hover:underline text-sm font-medium">Back to sign in</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-serif text-2xl font-bold text-brand-ink">Reset Password</h1>
        <p className="text-sm text-brand-ink/60 mt-1">Enter your email and we&apos;ll send you a reset link</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" loading={loading} className="w-full" size="lg">Send Reset Link</Button>
      </form>
      <p className="text-center text-sm"><Link href="/login" className="text-brand-teal hover:underline">Back to sign in</Link></p>
    </div>
  );
}
