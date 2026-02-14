"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

function getDayNumber(startDate: Date) {
  const now = new Date();
  const diff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

export function TodaysPlan({ planStartDate }: { planStartDate: Date }) {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dayNumber = getDayNumber(planStartDate);
    setLoading(true);
    supabase
      .from("plan_days")
      .select("*")
      .eq("day_number", dayNumber)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message);
        setPlan(data);
        setLoading(false);
      });
  }, [planStartDate]);

  if (loading) return <div className="mt-8">Loading today’s plan…</div>;
  if (error) return <div className="text-red-600 mt-8">{error}</div>;
  if (!plan) return <div className="mt-8">No plan for today.</div>;

  return (
    <div className="bg-white/80 rounded-xl shadow-lg p-6 mt-8 border border-gold-200">
      <h2 className="text-2xl font-serif mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Day {plan.day_number}: {plan.title}</h2>
      <div className="text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{plan.description}</div>
      {plan.image_url && (
        <img src={plan.image_url} alt="Plan visual" className="mx-auto rounded-lg mt-4 max-h-64" />
      )}
    </div>
  );
}
