"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export function UserMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#bfa14a' }}>
        Welcome, {user.email}
      </div>
      <button
        onClick={async () => { await supabase.auth.signOut(); }}
        className="px-6 py-2 rounded-full bg-neutral-900 text-white font-bold tracking-widest shadow hover:bg-neutral-700 transition-all"
        style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.12em' }}
      >
        Sign Out
      </button>
    </div>
  );
}
