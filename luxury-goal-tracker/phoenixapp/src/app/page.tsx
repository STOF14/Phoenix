import { LuxuryHeading } from "./components/LuxuryHeading";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <LuxuryHeading>Phoenix Luxury Goal Tracker</LuxuryHeading>
      <div className="max-w-xl text-center mt-4">
        <p className="text-lg text-neutral-700 mb-6" style={{fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.08em'}}>
          Welcome to your 280 Days journey. Track your daily goals, progress, and transformation in style. Log in to begin.
        </p>
        <div className="mt-8">
          {/* Auth and main actions will go here */}
          <button className="px-8 py-3 rounded-full bg-[#bfa14a] text-white font-bold tracking-widest shadow-lg hover:bg-[#a88c3a] transition-all" style={{fontFamily: 'Playfair Display, serif', letterSpacing: '0.15em'}}>Sign In</button>
        </div>
      </div>
    </main>
  );
}
