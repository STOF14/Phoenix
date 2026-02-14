"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 mt-6">
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="px-4 py-2 rounded border border-neutral-300 focus:outline-gold text-lg w-64"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3 rounded-full bg-gold text-white font-bold tracking-widest shadow-lg hover:bg-[#a88c3a] transition-all disabled:opacity-60"
        style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.15em' }}
      >
        {loading ? "Sending..." : "Sign In / Register"}
      </button>
      {message && <div className="text-gold luxury-gold mt-2 text-center">{message}</div>}
    </form>
  );
}
