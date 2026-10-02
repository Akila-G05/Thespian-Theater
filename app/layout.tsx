import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thespian Theater — Intimate Stage Plays & Live Drama",
  description: "Experience captivating storytelling, intimate stage performances, and original drama productions by Thespian Theater company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0e16] text-[#dfe2ee] font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
