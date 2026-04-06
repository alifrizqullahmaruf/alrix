"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Username atau password salah.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full bg-neutral-black flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-bold font-poppins">A</span>
          </div>
          <h1 className="text-neutral-black font-poppins font-bold text-xl">Admin Panel</h1>
          <p className="text-neutral-medium font-poppins text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div>
            <label className="text-neutral-dark text-xs font-poppins font-medium block mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-light bg-bg-light text-neutral-black font-poppins text-sm outline-none focus:border-neutral-dark transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="text-neutral-dark text-xs font-poppins font-medium block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-light bg-bg-light text-neutral-black font-poppins text-sm outline-none focus:border-neutral-dark transition-colors"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-poppins text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-neutral-black text-white font-poppins font-semibold text-sm mt-1 hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
