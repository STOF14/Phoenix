// Utility for interacting with the 'checkins' table in Supabase
import { supabase } from "@/utils/supabaseClient";

export async function getTodayCheckin(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function markTodayCheckin(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("checkins")
    .upsert({ user_id: userId, date: today, completed: true }, { onConflict: ["user_id", "date"] })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getCheckinStats(userId: string) {
  const { data, error } = await supabase
    .from("checkins")
    .select("date, completed")
    .eq("user_id", userId)
    .order("date", { ascending: true });
  if (error) throw error;
  return data || [];
}
