"use client";

import { useState } from "react";

const base = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // LoginDto expects this
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Login failed (${res.status})`);
      }

      const data = await res.json();

      // comment method, use token stored localStorage, simple
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      setMsg("✅ Login success");
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border rounded-lg p-6"
      >
        <h1 className="text-xl font-semibold">Login</h1>

        <label className="block space-y-1">
          <span className="text-sm">Email</span>
          <input
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm">Password</span>
          <input
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>

        <button className="w-full border rounded px-3 py-2">Sign in</button>

        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </main>
  );
}
