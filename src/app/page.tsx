"use client";
import { LuxuryHeading } from "./components/LuxuryHeading";
import { Auth } from "./components/Auth";
import { UserMenu } from "./components/UserMenu";
import { DailyChecklist } from "./components/DailyChecklist";
import { TodaysPlan } from "./components/TodaysPlan";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    import("@/utils/supabaseClient").then(({ supabase }) => {
      supabase.auth.getUser().then(({ data }) => setUser(data.user));
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => {
        listener.subscription.unsubscribe();
      };
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <LuxuryHeading>Phoenix Luxury Goal Tracker</LuxuryHeading>
      <div className="max-w-xl text-center mt-4">
        <p className="text-lg text-neutral-700 mb-6" style={{fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.08em'}}>
          Welcome to your 280 Days journey. Track your daily goals, progress, and transformation in style. Log in to begin.
        </p>
        <div className="mt-8">
          {user ? (
            <>
              <UserMenu />
              {/* Set your plan start date below */}
              <TodaysPlan planStartDate={new Date('2024-06-01')} />
              <DailyChecklist />
            </>
          ) : <Auth />}
        </div>
      </div>
    </main>
  );
}
