import type { Metadata } from "next";

import "./globals.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/cormorant-garamond/700.css";

  title: "Phoenix Luxury Goal Tracker",
  description: "A luxury, cross-device goal and activity tracker for your 280 Days journey.",
};

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-white text-neutral-900"
        style={{
          fontFamily: 'Playfair Display, Cormorant Garamond, serif',
          background: '#fff',
          color: '#171717',
        }}
      >
        {children}
      </body>
    </html>
  );
}
