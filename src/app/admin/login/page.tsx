"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const DEMO_EMAIL = "admin@elegancybyabby.com";
const DEMO_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo mode — works without Supabase
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("elegancy-admin-demo", "true");
      router.push("/admin");
      return;
    }

    // Real Supabase auth
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      // Supabase not configured — only demo login works
      setError("Invalid credentials. Use demo: admin@elegancybyabby.com / admin123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 mesh-bg">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-text-primary mb-2">Admin Login</h1>
          <p className="text-text-muted text-sm">Elegancybyabby Dashboard</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 card-shadow">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@elegancybyabby.com" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 pt-4 border-t border-[#e5e5e5]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">Demo Credentials</p>
            <p className="text-xs text-text-muted">Email: admin@elegancybyabby.com</p>
            <p className="text-xs text-text-muted">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
