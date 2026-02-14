import "@fontsource/playfair-display/700.css";
import "@fontsource/cormorant-garamond/700.css";

export function LuxuryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-4xl md:text-6xl font-bold tracking-widest text-center mb-8"
      style={{
        fontFamily: "Playfair Display, Cormorant Garamond, serif",
        letterSpacing: "0.15em",
        color: "#bfa14a", // gold
        textShadow: "0 1px 8px rgba(191,161,74,0.12)",
      }}
    >
      {children}
    </h1>
  );
}
