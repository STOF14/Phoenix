import { useEffect, useState } from "react";
import { getTodayCheckin, markTodayCheckin, getCheckinStats } from "@/utils/checkinApi";
import { supabase } from "@/utils/supabaseClient";

export function DailyChecklist() {
  const [user, setUser] = useState<any>(null);
  const [todayCheckin, setTodayCheckin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getTodayCheckin(user.id)
      .then(setTodayCheckin)
      .catch(() => setTodayCheckin(null))
      .finally(() => setLoading(false));
    getCheckinStats(user.id).then(setStats).catch(() => setStats([]));
  }, [user]);

  const handleCheckin = async () => {
    setLoading(true);
    setError(null);
    try {
      await markTodayCheckin(user.id);
      setTodayCheckin({ user_id: user.id, date: new Date().toISOString().slice(0, 10), completed: true });
      setStats(await getCheckinStats(user.id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const completedDays = stats.filter((s) => s.completed).length;
  const streak = stats.reduceRight((acc, s) => {
    if (!s.completed) return acc.streak ? acc : { streak: 0 };
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - acc.streak);
    if (s.date === yesterday.toISOString().slice(0, 10)) {
      return { streak: acc.streak + 1 };
    }
    return acc;
  }, { streak: 0 }).streak;

  return (
    <div className="bg-white/80 rounded-xl shadow-lg p-6 mt-8 border border-gold-200">
      <h2 className="text-2xl font-serif mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Today's Checklist</h2>
      {loading ? (
        <div>Loading...</div>
      ) : todayCheckin && todayCheckin.completed ? (
        <div className="text-green-700 font-semibold">✔️ Completed for today!</div>
      ) : (
        <button
          className="px-6 py-2 rounded bg-gold-500 text-white font-bold hover:bg-gold-600 transition"
          onClick={handleCheckin}
          disabled={loading}
        >
          Mark as Complete
        </button>
      )}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <div className="mt-4 text-lg">
        <span className="font-semibold">Days completed:</span> {completedDays} / 280
      </div>
      <div className="mt-1 text-lg">
        <span className="font-semibold">Current streak:</span> {streak} days
      </div>
    </div>
  );
}
