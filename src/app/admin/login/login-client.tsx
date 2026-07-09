"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/admin/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/admin";
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#062B1F] via-[#0B3D2E] to-[#0D4A35] p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img src="/logo.png" alt="Logo" className="w-24 h-24 rounded-2xl shadow-2xl mx-auto ring-2 ring-[#EAB308]/40 object-contain" />
            <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#EAB308] rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-4 h-4 text-[#0B3D2E]" />
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">Amhara Sint Woreda Administration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-xl bg-[#0B3D2E] flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-[#EAB308]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0B3D2E]">Sign In</h2>
              <p className="text-xs text-gray-400">Enter your admin credentials</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="username" type="text" placeholder="Enter admin username"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  className="h-11 pl-9 border-gray-200 focus:border-[#0B3D2E]"
                  autoComplete="username" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter admin password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pl-9 pr-10 border-gray-200 focus:border-[#0B3D2E]"
                  autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold shrink-0">!</span>
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading || !username || !password}
              className="w-full h-11 bg-[#0B3D2E] hover:bg-[#145A44] text-white font-semibold rounded-xl transition-all shadow-md mt-2">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></div>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Session expires after <strong className="text-gray-600">10 minutes</strong> of inactivity</span>
            </div>
            <p className="text-xs text-gray-400 text-center">Protected admin area. Unauthorized access is prohibited.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
