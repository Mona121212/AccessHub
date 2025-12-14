"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    try {
      //the path has to as same as nest.js
      await apiPost("/users", { email, password });
      setMsg("✅ Registered successfully. You can log in now.");
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
        <h1 className="text-xl font-semibold">Register</h1>

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

        <button className="w-full border rounded px-3 py-2">
          Create account
        </button>

        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </main>
  );
}
