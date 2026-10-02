"use client";

import React, { useState, useRef } from "react";

export default function Home() {
  const [activePlayCategory, setActivePlayCategory] = useState<"original" | "classics">("original");
  const [reservedEvents, setReservedEvents] = useState<{ [key: string]: boolean }>({});
  const [modalEvent, setModalEvent] = useState<string | null>(null);
  const [showAllYoga, setShowAllYoga] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentProduction, setCurrentProduction] = useState(0);

  const lastScrollTime = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const handleReserve = (eventTitle: string) => {
    setModalEvent(eventTitle);
    setReservedEvents((prev) => ({ ...prev, [eventTitle]: true }));
  };

  const productionCards = [
    {
      id: 1,
      title: "Echoes of the Velvet Curtain",
      genre: "Original Drama",
      emoji: "🎭",
      description: "A gripping original drama exploring secrets, ambition, and redemption on our intimate stage. Directed by our resident ensemble with live chamber score and 120-seat acoustic perfection. This production pushes the boundaries of modern theatrical storytelling.",
      imgSrc: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Shadows of Tomorrow",
      genre: "Psychological Thriller",
      emoji: "🌑",
      description: "A mind-bending psychological thriller that blurs the line between reality and illusion. Two strangers meet in a waiting room and discover their pasts are more entangled than they ever imagined. Expect unexpected twists and intense performances.",
      imgSrc: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Crimson Sonata",
      genre: "Romantic Tragedy",
      emoji: "🌹",
      description: "A sweeping romantic tragedy set against the backdrop of a crumbling music conservatory. Two virtuoso musicians find love while their world falls apart. Featuring live piano accompaniment and breathtaking stagecraft.",
      imgSrc: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "A Midsummer Dream",
      genre: "Shakespeare Adaptation",
      emoji: "✨",
      description: "Our bold reimagining of Shakespeare's beloved comedy, set in a contemporary botanical garden. Magic, mischief, and love intertwine in this visually stunning production with original music and choreography.",
      imgSrc: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "The Last Curtain Call",
      genre: "Historical Drama",
      emoji: "📜",
      description: "A moving historical drama that chronicles the final season of a legendary theater company in 1920s London. Based on true events, this production explores legacy, sacrifice, and the undying spirit of live performance.",
      imgSrc: "https://images.unsplash.com/photo-1570882197471-d5d51f1f02a6?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Whispers in the Wings",
      genre: "Contemporary Play",
      emoji: "🕯️",
      description: "A haunting contemporary play about three generations of women confronting family secrets within the walls of an old theater. Minimalist staging amplifies the raw emotional power of each monologue.",
      imgSrc: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const handleProductionNav = (direction: "up" | "down") => {
    setCurrentProduction((prev) => {
      if (direction === "up") return prev === 0 ? productionCards.length - 1 : prev - 1;
      return prev === productionCards.length - 1 ? 0 : prev + 1;
    });
  };

  const handleCarouselWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 450) return;
    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0) {
        handleProductionNav("down");
      } else {
        handleProductionNav("up");
      }
      lastScrollTime.current = now;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 35) {
      if (deltaY > 0) {
        handleProductionNav("down");
      } else {
        handleProductionNav("up");
      }
    }
    touchStartY.current = null;
  };

  const events = [
    {
      id: "01",
      title: "Echoes of the Velvet Curtain",
      line1: "Echoes of the",
      line2: "Velvet Curtain",
      date: "Oct 24 – Nov 12, 2025",
      location: "(Thespian Hall, Main Stage)",
    },
    {
      id: "02",
      title: "Shadows of Tomorrow",
      line1: "Shadows of",
      line2: "Tomorrow",
      date: "Nov 21 – Dec 07, 2025",
      location: "(Thespian Hall, Main Stage)",
    },
    {
      id: "03",
      title: "The Crimson Sonata",
      line1: "The Crimson",
      line2: "Sonata",
      date: "Dec 19 – Jan 04, 2026",
      location: "(Thespian Hall, Studio Theater)",
    },
    {
      id: "04",
      title: "A Midsummer Dream",
      line1: "A Midsummer",
      line2: "Dream",
      date: "Jan 16 – Feb 01, 2026",
      location: "(Thespian Hall, Main Stage)",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0a0e16] text-[#dfe2ee] antialiased overflow-x-hidden">

      {/* =========================================================
          SECTION 1 & 2: HEADER, HERO & THESPIAN THEATER
          Background: bg-section-hero (--bg-hero: #0f131c)
         ========================================================= */}
      <section className="w-full bg-section-hero relative transition-colors overflow-hidden">
        {/* Ambient Theatrical Spotlight Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-amber-500/15 via-yellow-600/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute top-[700px] left-[-200px] w-[600px] h-[600px] bg-gradient-to-r from-red-900/15 via-amber-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-12 relative z-10">

          {/* Header */}
          <header className="relative z-30 flex items-center justify-between pb-8">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-2.5 text-2xl font-black text-white tracking-tight group focus:outline-none">
              <span className="inline-flex items-center justify-center p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                <svg className="w-6 h-6 fill-amber-400 group-hover:rotate-6 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 8c.83 0 1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5S8.17 10 9 10zm6 0c.83 0 1.5.67 1.5 1.5S15.83 13 15 13s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3 8.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-xl sm:text-2xl text-white leading-tight">
                  Thespian <span className="text-amber-400">Theater</span>
                </span>
                <span className="text-[9px] text-amber-400/80 uppercase tracking-[0.25em] font-semibold">Live Drama Troupe</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.18em] text-slate-300/80 uppercase">
              <a href="#how-it-works" className="hover:text-amber-400 transition-colors">WHY OUR THEATER</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">ABOUT ENSEMBLE</a>
              <a href="#start" className="hover:text-amber-400 transition-colors">PRODUCTIONS</a>
              <a href="#team" className="hover:text-amber-400 transition-colors">OUR TEAM</a>
              <a href="#events" className="hover:text-amber-400 transition-colors">SHOWTIMES</a>
            </nav>

            {/* Book Tickets CTA Button */}
            <div className="flex items-center gap-3">
              <a
                href="#events"
                className="px-5 py-2.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-xs font-bold tracking-wider text-amber-300 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber-400/10"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 10V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v5c1.1 0 2 .9 2 2s-.9 2-2 2v5c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-5c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-4.5V8c-1.66 0-3 1.34-3 3s1.34 3 3 3v2.5H6V14c1.66 0 3-1.34 3-3s-1.34-3-3-3V5.5h12z" />
                </svg>
                BOOK TICKETS
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-200 hover:bg-white/10"
                aria-label="Toggle Navigation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </header>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mb-6 p-4 rounded-2xl glass-card flex flex-col gap-3 text-xs font-bold tracking-widest text-slate-200 uppercase border border-slate-700">
              <a onClick={() => setMobileMenuOpen(false)} href="#how-it-works" className="py-1 hover:text-amber-400">WHY OUR THEATER</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#about" className="py-1 hover:text-amber-400">ABOUT ENSEMBLE</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#start" className="py-1 hover:text-amber-400">PRODUCTIONS</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#team" className="py-1 hover:text-amber-400">OUR TEAM</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#events" className="py-1 hover:text-amber-400">SHOWTIMES</a>
            </div>
          )}

          {/* Hero Banner Content */}
          <div className="relative z-10 pt-4 pb-14">

            {/* Top Decorative Theatrical Star Motif */}
            <div className="absolute top-0 left-[42%] w-14 h-14 opacity-75 pointer-events-none hidden sm:block">
              <svg className="w-full h-full text-amber-400/70 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="2.5">
                  <line x1="50" x2="50" y1="5" y2="24" />
                  <line x1="50" x2="50" y1="76" y2="95" />
                  <line x1="5" x2="24" y1="50" y2="50" />
                  <line x1="76" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="31" y1="18" y2="31" />
                  <line x1="69" x2="82" y1="69" y2="82" />
                  <line x1="18" x2="31" y1="82" y2="69" />
                  <line x1="69" x2="82" y1="31" y2="18" />
                  <line x1="33" x2="38" y1="10" y2="24" />
                  <line x1="62" x2="67" y1="76" y2="90" />
                  <line x1="67" x2="62" y1="10" y2="24" />
                  <line x1="38" x2="33" y1="76" y2="90" />
                  <line x1="10" x2="24" y1="33" y2="38" />
                  <line x1="76" x2="90" y1="62" y2="67" />
                  <line x1="10" x2="24" y1="67" y2="62" />
                  <line x1="76" x2="90" y1="38" y2="33" />
                </g>
                <circle cx="50" cy="50" fill="none" r="8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Left Decorative Stage Accent Motif */}
            <div className="absolute -bottom-4 left-[-10px] w-20 h-20 opacity-40 pointer-events-none hidden sm:block">
              <svg className="w-full h-full text-amber-500/40" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                  <line x1="50" x2="50" y1="10" y2="30" />
                  <line x1="50" x2="50" y1="70" y2="90" />
                  <line x1="10" x2="30" y1="50" y2="50" />
                  <line x1="70" x2="90" y1="50" y2="50" />
                  <line x1="22" x2="36" y1="22" y2="36" />
                  <line x1="64" x2="78" y1="64" y2="78" />
                  <line x1="22" x2="36" y1="78" y2="64" />
                  <line x1="64" x2="78" y1="36" y2="22" />
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

              {/* Hero Left Column */}
              <div className="lg:col-span-6 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Intimate Stage &bull; Live Drama Troupe
                </div>

                <h1 className="text-5xl sm:text-6xl xl:text-[68px] leading-[1.08] font-extrabold text-white tracking-tight mb-5">
                  Intimate<br />
                  Stage Stories<br />
                  With <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.45)] ">Thespians</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-md font-medium leading-relaxed mb-8">
                  Experience raw emotion, gripping dialogue, and spellbinding live acting. A dedicated drama ensemble performing heartfelt classics and boundary-pushing original plays in our 120-seat theater.
                </p>

                {/* Actions & Socials */}
                <div className="flex flex-wrap items-center gap-6 mb-16">
                  <a
                    href="#events"
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs tracking-wider shadow-lg shadow-amber-400/20 hover:brightness-110 transition uppercase duration-200 cursor-pointer active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>RESERVE SEATS</span>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>

                  <div className="flex items-center gap-3 text-slate-300">
                    <span className="text-xs font-semibold text-slate-400">Join Our Audience</span>
                    <div className="flex items-center gap-2">
                      <a href="#" className="w-7 h-7 rounded-full bg-slate-850 border border-slate-700/80 text-slate-200 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-950 transition hover:scale-110" aria-label="Instagram">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="#" className="w-7 h-7 rounded-full bg-slate-850 border border-slate-700/80 text-slate-200 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-950 transition hover:scale-110" aria-label="YouTube">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                      <a href="#" className="w-7 h-7 rounded-full bg-slate-850 border border-slate-700/80 text-slate-200 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-950 transition hover:scale-110" aria-label="Facebook">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Theatrical Counters */}
                <div className="flex items-start gap-10 sm:gap-12 pt-3 border-t border-slate-800">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">42+</div>
                    <p className="text-xs text-slate-400 font-medium max-w-[140px] mt-1 leading-snug">Original plays &amp; classic adaptations staged</p>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">120</div>
                    <p className="text-xs text-slate-400 font-medium max-w-[140px] mt-1 leading-snug">Seat intimate theater with perfect sightlines</p>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">98%</div>
                    <p className="text-xs text-slate-400 font-medium max-w-[130px] mt-1 leading-snug">Standing ovation &amp; sellout attendance</p>
                  </div>
                </div>
              </div>

              {/* Hero Right Column (Stage Model & Floating Glass Cards) */}
              <div className="lg:col-span-6 relative flex justify-center items-center">
                {/* Main Hero Stage Drama Card */}
                <div className="relative w-full max-w-[440px] h-[540px] rounded-[55px] overflow-hidden glass-card p-2 shadow-2xl border border-white/20 shadow-amber-950/30">
                  <img
                    src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=900&auto=format&fit=crop"
                    alt="Intense stage actor under warm theater spotlight in dramatic performance"
                    className="w-full h-full object-cover rounded-[48px] brightness-95 contrast-110"
                  />

                  {/* Stage Lighting Overlay Gradients */}
                  <div className="absolute inset-0 rounded-[48px] bg-gradient-to-t from-black/80 via-transparent to-amber-500/10 pointer-events-none" />

                  {/* Dramatic stage spotlight tracker ring */}
                  <div className="absolute bottom-[28%] right-[28%] flex items-center pointer-events-none">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-amber-400 shadow-sm"></span>
                    </span>
                    <div className="w-16 h-[1.5px] bg-amber-300/80 ml-1"></div>
                  </div>
                  <div className="absolute top-[35%] left-[28%] flex items-center pointer-events-none">
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-amber-400 shadow-sm"></span>
                  </div>

                  {/* Stage Live Tag */}
                  <div className="absolute bottom-6 left-8 bg-slate-950/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-wider text-slate-200 uppercase">Season 2026 • On Stage</span>
                  </div>
                </div>

                {/* Glassmorphism Floating Badge 1: Performance Schedule & Occupancy */}
                <div className="absolute -top-4 right-4 sm:right-6 glass-card-sm p-4 rounded-3xl shadow-2xl border border-white/20 w-48 z-20 hover:scale-105 transition-transform backdrop-blur-xl bg-slate-900/60">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">Curtain Calls</div>
                    <span className="text-[8px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded-full border border-red-500/30">HOT</span>
                  </div>
                  <div className="text-[9px] text-slate-400 mb-2">Weekly Seat Occupancy</div>
                  <div className="flex items-end justify-between h-11 gap-1.5 px-1 pb-1">
                    <div className="w-2.5 bg-slate-800 rounded-full h-[35%]"></div>
                    <div className="w-2.5 bg-slate-800 rounded-full h-[50%]"></div>
                    <div className="w-2.5 bg-slate-800 rounded-full h-[65%]"></div>
                    <div className="w-2.5 bg-slate-700 rounded-full h-[80%]"></div>
                    <div className="w-2.5 bg-amber-400 rounded-full h-[100%] shadow-[0_0_10px_rgba(250,204,21,0.7)]"></div>
                    <div className="w-2.5 bg-amber-400 rounded-full h-[98%] shadow-[0_0_10px_rgba(250,204,21,0.7)]"></div>
                    <div className="w-2.5 bg-amber-500 rounded-full h-[92%]"></div>
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-500 font-bold px-0.5 mt-1 uppercase">
                    <span>m</span><span>t</span><span>w</span><span>t</span><span className="text-amber-400 font-black">f</span><span className="text-amber-400 font-black">s</span><span className="text-amber-400 font-black">s</span>
                  </div>
                  <p className="text-[9px] font-bold text-white mt-2 text-center leading-tight">
                    Sold Out Weekend<br /><span className="text-amber-400/90 font-normal">Next: Friday 8:00 PM</span>
                  </p>
                </div>

                {/* Glassmorphism Floating Badge 2: Theater Patrons & Ovations */}
                <div className="absolute bottom-8 -left-4 sm:left-4 glass-card-sm py-2 px-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 z-20 hover:scale-105 transition-transform backdrop-blur-xl bg-slate-900/60">
                  <div>
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Theater Patrons</div>
                    <div className="flex items-center -space-x-2 mt-1">
                      <img alt="Patron 1" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover shadow-xs" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" />
                      <img alt="Patron 2" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover shadow-xs" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" />
                      <img alt="Patron 3" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover shadow-xs" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" />
                      <img alt="Patron 4" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover shadow-xs" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/70 border border-amber-700/60 px-2.5 py-1 rounded-full shadow-xs">★ 4.9 (1.2k+)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Featured Upcoming Event Card */}
          <div id="how-it-works" className="pt-4 pb-8 relative" style={{ zIndex: 5 }}>
            <div
              className="glass-card rounded-[42px] p-8 lg:p-12 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_25px_rgba(255,255,255,0.04)] relative overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(18, 24, 38, 0.30) 45%, rgba(10, 15, 26, 0.45) 100%)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)"
              }}
            >
              {/* Glass Ambient Glow Effects */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                {/* Event Image with Glowing Motion Trails & Badge */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-full max-w-[340px] h-[340px] rounded-3xl overflow-hidden bg-white/[0.04] backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] shadow-2xl group">
                    <img
                      src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=900&auto=format&fit=crop"
                      alt="Upcoming Stage Drama Production: Echoes of the Velvet Curtain"
                      className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Yellow Upcoming Badge on Image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-lg shadow-amber-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                        UPCOMING
                      </span>
                    </div>

                    {/* Stage Lighting Vector Beam Overlay */}
                    {/* <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 300 300">
                      <circle cx="150" cy="90" fill="#facc15" r="4" />
                      <circle cx="100" cy="220" fill="#facc15" r="3" />
                      <circle cx="200" cy="220" fill="#facc15" r="3" />
                      <path d="M 150 90 L 100 220 M 150 90 L 200 220" fill="none" stroke="#facc15" strokeDasharray="3,3" strokeWidth="1.5" />
                    </svg> */}

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-slate-200">
                      {/* <span className="font-bold text-amber-300 bg-black/60 px-3 py-1 rounded-full border border-amber-400/30 backdrop-blur-xs uppercase tracking-wider">
                        Season Premiere
                      </span>
                      <span className="bg-black/60 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-xs font-semibold text-slate-300">
                        Live 2 Acts
                      </span> */}
                    </div>
                  </div>
                </div>

                {/* Event Name & 3 Detail Cards (Venue, Time, Date/Recommended) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* <div className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase shadow-md shadow-yellow-400/20">
                      UPCOMING
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full backdrop-blur-xs">
                      NEW FEATURE PRODUCTION
                    </span> */}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    Echoes of the <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">Velvet Curtain</span>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed mb-8 max-w-lg drop-shadow-sm">
                    A gripping original drama exploring secrets, ambition, and redemption on our intimate stage. Directed by our resident ensemble with live chamber score and 120-seat acoustic perfection.
                  </p>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
                    {/* Card 1: Event Venue */}
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center aspect-square shadow-lg border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.10] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group">
                      <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">EVENT VENUE</span>
                      <span className="text-[11px] font-bold text-white leading-tight mt-0.5">Thespian Hall</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">Main Stage (120 Seats)</span>
                    </div>

                    {/* Card 2: Time / Showtimes */}
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center aspect-square shadow-lg border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.10] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group">
                      <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        </svg>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">SHOW TIME</span>
                      <span className="text-[11px] font-bold text-white leading-tight mt-0.5">7:30 PM & 9:15 PM</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">Doors open 7:00 PM</span>
                    </div>

                    {/* Card 3: Date & Recommended Badge */}
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center aspect-square shadow-lg border border-white/15 relative group cursor-pointer hover:border-amber-400/60 hover:bg-white/[0.10] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">DATES</span>
                      <span className="text-[11px] font-bold text-white leading-tight mt-0.5">Oct 24 - Nov 12</span>
                      {/* <div className="absolute -bottom-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md shadow-yellow-400/30 group-hover:scale-105 transition-transform">
                        <span>★ Recommended</span>
                      </div> */}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 3: ABOUT OUR ENSEMBLE & THEATER
          Background: bg-section-meals (--bg-meals: #181f2e)
         ========================================================= */}
      <section id="about" className="w-full bg-section-meals py-20 relative z-10 border-y border-slate-800/80 transition-colors" style={{ paddingTop: '300px', marginTop: '-300px', zIndex: 1 }}>
        {/* Decorative subtle radial glow */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Crafting stories that<br />
                  move the <span className="text-yellow-400 font-semibold italic drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">soul</span>
                </h2>
                <div className="w-12 h-12 flex-shrink-0 text-amber-500/40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <g stroke="currentColor" strokeLinecap="round" strokeWidth="2.5">
                      <line x1="50" x2="50" y1="5" y2="25" />
                      <line x1="50" x2="50" y1="75" y2="95" />
                      <line x1="5" x2="25" y1="50" y2="50" />
                      <line x1="75" x2="95" y1="50" y2="50" />
                      <line x1="18" x2="32" y1="18" y2="32" />
                      <line x1="68" x2="82" y1="68" y2="82" />
                      <line x1="18" x2="32" y1="82" y2="68" />
                      <line x1="68" x2="82" y1="32" y2="18" />
                    </g>
                    <circle cx="50" cy="50" fill="none" r="12" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-8 max-w-md">
                Thespian Theater is a passionate, close-knit drama ensemble dedicated to bringing raw, authentic stories to life. Founded in our intimate 120-seat heritage hall, we produce original plays and classic adaptations that challenge, inspire, and move our audiences. Every performance is a journey — come experience theatre the way it was meant to be felt.
              </p>

              {/* Founded Date & Explore Buttons */}
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="rounded-2xl p-4 w-44 shadow-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-slate-950 shadow-yellow-500/25"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">🎭</span>
                    <span className="text-xs font-black">Founded</span>
                  </div>
                  <div className="text-2xl font-black leading-none">2009</div>
                  <div className="text-[9px] font-semibold mt-1 opacity-75">Est. in Colombo, Sri Lanka</div>
                </div>

                <a
                  href="#start"
                  className="rounded-2xl p-4 w-44 cursor-pointer transition-all duration-300 flex flex-col justify-center h-[100px] glass-card text-slate-200 border border-amber-400/40 hover:border-amber-400 hover:bg-slate-800/80 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">📜</span>
                    <span className="text-xs font-bold">Our Productions</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all w-fit"
                  >
                    Explore →
                  </div>
                </a>
              </div>

              {/* Artistic Director Signature */}
              <div className="pt-2">
                <div className="font-signature text-3xl text-amber-300 leading-none tracking-wide">Mr. Maduranga Weerasingha</div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight mt-1">Artistic Director &amp; Founder, Thespian Theater</div>
              </div>
            </div>

            {/* Right Theater Image with Floating Members Card */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=900&auto=format&fit=crop"
                  alt="Thespian Theater stage with warm theatrical lighting and velvet curtains"
                  className="w-full h-full object-cover rounded-[40px] shadow-2xl border border-slate-700/60 brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 right-0 sm:right-4 glass-card-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/20 w-58 z-10 hover:scale-105 transition-transform backdrop-blur-xl bg-slate-900/70">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">Ensemble Members</span>
                    <span className="text-[11px] font-semibold text-slate-300">
                      <strong className="text-yellow-400">24</strong> Active
                    </span>
                  </div>
                  <div className="flex items-center -space-x-2 mt-2 mb-2">
                    <img alt="Member 1" className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" />
                    <img alt="Member 2" className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" />
                    <img alt="Member 3" className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" />
                    <img alt="Member 4" className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" />
                    <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-amber-400 flex items-center justify-center text-[8px] font-black text-slate-950">+20</div>
                  </div>
                  <p className="text-[9px] text-slate-300 font-medium">Actors, directors &amp; stagecraft artists</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: OUR PRODUCTIONS — Vertical 3D Depth Carousel
          Background: bg-section-yoga (--bg-yoga: #0f131c)
         ========================================================= */}

         {/* Top Ticker / Marquee Banner */}
        <div className="py-6 border-b border-slate-800/80 overflow-hidden bg-slate-950/30">
          <div className="flex items-center justify-around whitespace-nowrap text-3xl sm:text-4xl font-extrabold text-white tracking-tight select-none">
            <span className="opacity-40">SHOWTIMES</span>

            <div className="w-8 h-8 opacity-60">
              <svg className="w-full h-full text-amber-400 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
                  <line x1="50" x2="50" y1="5" y2="25" /><line x1="50" x2="50" y1="75" y2="95" />
                  <line x1="5" x2="25" y1="50" y2="50" /><line x1="75" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="32" y1="18" y2="32" /><line x1="68" x2="82" y1="68" y2="82" />
                  <line x1="18" x2="32" y1="82" y2="68" /><line x1="68" x2="82" y1="32" y2="18" />
                </g>
              </svg>
            </div>

            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">2026</span>

            <div className="w-8 h-8 opacity-60">
              <svg className="w-full h-full text-amber-400 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
                  <line x1="50" x2="50" y1="5" y2="25" /><line x1="50" x2="50" y1="75" y2="95" />
                  <line x1="5" x2="25" y1="50" y2="50" /><line x1="75" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="32" y1="18" y2="32" /><line x1="68" x2="82" y1="68" y2="82" />
                  <line x1="18" x2="32" y1="82" y2="68" /><line x1="68" x2="82" y1="32" y2="18" />
                </g>
              </svg>
            </div>

            <span className="opacity-40">THESPIANS</span>
          </div>
        </div>
      <section id="start" className="w-full bg-section-yoga py-8 relative z-10 transition-colors overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] bg-gradient-to-r from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

          {/* Two-column layout: Carousel Left + Details Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative" style={{ minHeight: 640 }}>

            {/* ── Left Column: Vertical Angled Card Stack ── */}
            <div
              className="lg:col-span-5 relative flex justify-center items-center select-none"
              style={{ height: 660, perspective: '1200px' }}
              onWheel={handleCarouselWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Top gradient fade overlay */}
              <div
                className="absolute top-0 left-0 right-0 h-36 z-30 pointer-events-none"
              // style={{ background: 'linear-gradient(to bottom, #0f131c 0%, rgba(15, 19, 28, 0.85) 0%, transparent 100%)' }}
              />
              {/* Bottom gradient fade overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-36 z-30 pointer-events-none"
              // style={{ background: 'linear-gradient(to top, #0f131c 0%, rgba(15, 19, 28, 0.85) 0%, transparent 100%)' }}
              />

              {/* Card Stack Container */}
              <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {productionCards.map((card, idx) => {
                  const total = productionCards.length;
                  const prevIdx = (currentProduction - 1 + total) % total;
                  const nextIdx = (currentProduction + 1) % total;
                  const isCenter = idx === currentProduction;
                  const isTop = idx === prevIdx;
                  const isBottom = idx === nextIdx;
                  const isVisible = isCenter || isTop || isBottom;

                  let offset = idx - currentProduction;
                  if (offset > total / 2) offset -= total;
                  if (offset < -total / 2) offset += total;

                  let cardTransform = 'translateY(420px) rotate(35deg) scale(0.55)';
                  let cardOpacity = 0;
                  let cardFilter = 'blur(12px)';
                  let cardZ = 1;

                  if (isCenter) {
                    cardTransform = 'translateY(0px) rotate(0deg) scale(1)';
                    cardOpacity = 1;
                    cardFilter = 'blur(0px)';
                    cardZ = 20;
                  } else if (isTop) {
                    cardTransform = 'translateY(-245px) rotate(-22deg) scale(0.78)';
                    cardOpacity = 0.45;
                    cardFilter = 'blur(5px)';
                    cardZ = 10;
                  } else if (isBottom) {
                    cardTransform = 'translateY(245px) rotate(22deg) scale(0.78)';
                    cardOpacity = 0.45;
                    cardFilter = 'blur(5px)';
                    cardZ = 10;
                  } else if (offset < 0) {
                    cardTransform = 'translateY(-420px) rotate(-35deg) scale(0.55)';
                    cardOpacity = 0;
                    cardFilter = 'blur(12px)';
                    cardZ = 1;
                  } else {
                    cardTransform = 'translateY(420px) rotate(35deg) scale(0.55)';
                    cardOpacity = 0;
                    cardFilter = 'blur(12px)';
                    cardZ = 1;
                  }

                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        if (isTop) handleProductionNav("up");
                        else if (isBottom) handleProductionNav("down");
                      }}
                      className={`absolute left-1/2 ${isTop || isBottom ? 'cursor-pointer hover:opacity-75' : ''}`}
                      style={{
                        width: 380,
                        // height: '500px',
                        marginLeft: -190,
                        transform: cardTransform,
                        opacity: cardOpacity,
                        filter: cardFilter,
                        zIndex: cardZ,
                        transformOrigin: 'center center',
                        transition: 'all 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      {/* Card Body */}
                      <div
                        className="rounded-[36px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-white/15 p-4 group"
                        style={{
                          background: 'rgba(18, 24, 38, 0.85)',
                          backdropFilter: 'blur(20px)',
                          width: '360px'
                        }}
                      >
                        {/* Card Image */}
                        <div className="rounded-[24px] overflow-hidden w-full shadow-md relative bg-slate-950" style={{ height: '385px' }}>
                          <img
                            src={card.imgSrc}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {/* Card Pill Label */}
                        {/* <div className="pt-4 pb-1 flex justify-center">
                          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/95 text-slate-950 shadow-md text-xs font-bold tracking-tight hover:scale-105 transition-transform">
                            <span className="truncate max-w-[220px]">{card.title}</span>
                            <span className="text-amber-500 font-extrabold text-sm">&rarr;</span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right Column: Production Details + Nav Buttons ── */}
            <div className="lg:col-span-7 flex flex-col justify-center relative pl-0 lg:pl-12">

              {/* Up/Down Nav Buttons — positioned at the right edge */}
              <div className="absolute right-0 top-0 bottom-0 flex-col justify-between items-end py-4 hidden lg:flex" style={{ zIndex: 30 }}>
                <button
                  onClick={() => handleProductionNav("up")}
                  className="w-16 h-11 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all duration-200 cursor-pointer active:scale-95 shadow-lg backdrop-blur-sm"
                  aria-label="Previous Production"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleProductionNav("down")}
                  className="w-16 h-11 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all duration-200 cursor-pointer active:scale-95 shadow-lg backdrop-blur-sm"
                  aria-label="Next Production"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Nav Buttons */}
              <div className="flex lg:hidden gap-3 mb-6 justify-end">
                <button
                  onClick={() => handleProductionNav("up")}
                  className="w-12 h-10 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer active:scale-95"
                  aria-label="Previous Production"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleProductionNav("down")}
                  className="w-12 h-10 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer active:scale-95"
                  aria-label="Next Production"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Production Text Content (synced with carousel) */}
              <div className="max-w-lg">
                {/* Genre Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-5">
                  <span>{productionCards[currentProduction].emoji}</span>
                  {productionCards[currentProduction].genre}
                </div>

                {/* Title */}
                <h3
                  className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.12] mb-6"
                  style={{ transition: 'opacity 0.4s ease' }}
                >
                  {productionCards[currentProduction].title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm sm:text-[15px] text-slate-300 font-medium leading-relaxed mb-8"
                  style={{ transition: 'opacity 0.4s ease' }}
                >
                  {productionCards[currentProduction].description}
                </p>

                {/* VIEW DETAILS Button */}
                <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs tracking-widest uppercase shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2">
                  VIEW DETAILS
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: OUR TEAM / ENSEMBLE
          Background: bg-section-yoga (--bg-yoga: #0f131c)
         ========================================================= */}
      <section id="team" className="w-full bg-section-yoga py-20 relative z-10 transition-colors overflow-hidden border-t border-slate-800/80">
        {/* Ambient glow */}
        <div className="absolute top-0 right-[-100px] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-red-900/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                The People Behind the Curtain
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Meet the<br />
                <span className="text-yellow-400 font-semibold drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">Ensemble</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-sm leading-relaxed">
              A dedicated group of actors, directors, and stagecraft artists united by a love of authentic storytelling and live performance.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card: Artistic Director */}
            <div className="glass-card rounded-3xl overflow-hidden group hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 cursor-pointer relative">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                  alt="Mr. Maduranga Weerasingha — Artistic Director"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black tracking-wider uppercase shadow-lg">
                    ⭐ Director
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="font-signature text-xl text-amber-300 leading-tight mb-0.5">Mr. Maduranga Weerasingha</div>
                <div className="text-[10px] text-amber-400/80 font-bold tracking-wider uppercase mb-3">Artistic Director & Founder</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">Visionary director with 15+ years shaping raw drama into spellbinding stage experiences.</p>
              </div>
            </div>

            {/* Card: Lead Actress */}
            <div className="glass-card rounded-3xl overflow-hidden group hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 cursor-pointer relative">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                  alt="Amara Perera — Lead Actress"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm text-[9px] font-bold tracking-wider uppercase">
                    🎭 Actress
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-base font-extrabold text-white leading-tight mb-0.5">Amara Perera</div>
                <div className="text-[10px] text-amber-400/80 font-bold tracking-wider uppercase mb-3">Lead Actress</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">Award-winning performer known for powerful emotional range in tragic and classical roles.</p>
              </div>
            </div>

            {/* Card: Lead Actor */}
            <div className="glass-card rounded-3xl overflow-hidden group hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 cursor-pointer relative">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
                  alt="Kasun Silva — Lead Actor"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm text-[9px] font-bold tracking-wider uppercase">
                    🎭 Actor
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-base font-extrabold text-white leading-tight mb-0.5">Kasun Silva</div>
                <div className="text-[10px] text-amber-400/80 font-bold tracking-wider uppercase mb-3">Lead Actor</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">Versatile performer with a commanding stage presence across drama, thriller, and comedy.</p>
              </div>
            </div>

            {/* Card: Stage Manager */}
            <div className="glass-card rounded-3xl overflow-hidden group hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 cursor-pointer relative">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"
                  alt="Nimesha Fernando — Stage Manager"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm text-[9px] font-bold tracking-wider uppercase">
                    🎬 Stage
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-base font-extrabold text-white leading-tight mb-0.5">Nimesha Fernando</div>
                <div className="text-[10px] text-amber-400/80 font-bold tracking-wider uppercase mb-3">Stage Manager</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">The backbone of every production — coordinating lighting, props, and live cues flawlessly.</p>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-12">
            <a
              href="#events"
              className="px-8 py-3 rounded-full border border-amber-400/40 bg-amber-400/10 text-xs font-bold tracking-wider text-amber-300 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-amber-400/10"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20 10V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v5c1.1 0 2 .9 2 2s-.9 2-2 2v5c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-5c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-4.5V8c-1.66 0-3 1.34-3 3s1.34 3 3 3v2.5H6V14c1.66 0 3-1.34 3-3s-1.34-3-3-3V5.5h12z" />
              </svg>
              VIEW UPCOMING SHOWS
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 6: SHOWTIMES TICKER & EVENTS
          Background: bg-section-events (--bg-events: #181f2e)
         ========================================================= */}
      <section id="events" className="w-full bg-section-events relative z-10 border-t border-slate-800/80 transition-colors">

        {/* Top Ticker / Marquee Banner */}
        <div className="py-6 border-b border-slate-800/80 overflow-hidden bg-slate-950/30">
          <div className="flex items-center justify-around whitespace-nowrap text-3xl sm:text-4xl font-extrabold text-white tracking-tight select-none">
            <span className="opacity-40">SHOWTIMES</span>

            <div className="w-8 h-8 opacity-60">
              <svg className="w-full h-full text-amber-400 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
                  <line x1="50" x2="50" y1="5" y2="25" /><line x1="50" x2="50" y1="75" y2="95" />
                  <line x1="5" x2="25" y1="50" y2="50" /><line x1="75" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="32" y1="18" y2="32" /><line x1="68" x2="82" y1="68" y2="82" />
                  <line x1="18" x2="32" y1="82" y2="68" /><line x1="68" x2="82" y1="32" y2="18" />
                </g>
              </svg>
            </div>

            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">2026</span>

            <div className="w-8 h-8 opacity-60">
              <svg className="w-full h-full text-amber-400 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
                  <line x1="50" x2="50" y1="5" y2="25" /><line x1="50" x2="50" y1="75" y2="95" />
                  <line x1="5" x2="25" y1="50" y2="50" /><line x1="75" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="32" y1="18" y2="32" /><line x1="68" x2="82" y1="68" y2="82" />
                  <line x1="18" x2="32" y1="82" y2="68" /><line x1="68" x2="82" y1="32" y2="18" />
                </g>
              </svg>
            </div>

            <span className="opacity-40">THESPIANS</span>
          </div>
        </div>

        {/* Event Schedule Rows */}
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 py-12 divide-y divide-slate-800">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-900/40 px-4 sm:px-6 rounded-2xl transition duration-200"
            >
              <div className="flex items-baseline gap-8">
                <span className="text-xs font-bold text-slate-500">{evt.id}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {evt.line1}<br />{evt.line2}
                </h3>
              </div>

              <div className="text-xs font-medium text-slate-400 md:text-center">
                {evt.date}<br />
                <span className="text-slate-500 font-medium">{evt.location}</span>
              </div>

              <div>
                <button
                  onClick={() => handleReserve(evt.title)}
                  className={`px-6 py-2.5 rounded-full border text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 shadow-xs ${reservedEvents[evt.title]
                    ? "bg-yellow-400 text-slate-950 border-yellow-400"
                    : "border-slate-700 bg-slate-900/60 text-slate-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-slate-800"
                    }`}
                >
                  {reservedEvents[evt.title] ? "Spot Reserved ✓" : "Reserve Your Spot"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================
          SECTION 6: FOOTER
          Background: bg-section-footer (--bg-footer: #0f131c)
         ========================================================= */}
      <footer id="contact" className="w-full bg-section-footer relative z-10 overflow-hidden border-t border-slate-800/80 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">

          {/* Top Copyright */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-500 tracking-tight">
              <a href="#how-it-works" className="hover:text-amber-400 transition-colors">About</a>
              <a href="#start" className="hover:text-amber-400 transition-colors">Productions</a>
              <a href="#events" className="hover:text-amber-400 transition-colors">Showtimes</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 tracking-tight">
              © 2025 Thespian Theater. All rights reserved.
            </p>
          </div>

          {/* Large Stylized Brand Logo Display */}
          <div className="relative flex items-center justify-between select-none">

            {/* Left Stylized Sunburst Motif */}
            <div className="absolute -bottom-10 -left-12 w-48 h-48 opacity-20 pointer-events-none">
              <svg className="w-full h-full text-amber-400" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeWidth="4">
                  <line x1="50" x2="10" y1="50" y2="10" />
                  <line x1="50" x2="5" y1="50" y2="30" />
                  <line x1="50" x2="30" y1="50" y2="5" />
                  <line x1="50" x2="50" y1="50" y2="2" />
                  <line x1="50" x2="70" y1="50" y2="5" />
                  <line x1="50" x2="90" y1="50" y2="15" />
                </g>
              </svg>
            </div>

            {/* Gigantic Brand Headline */}
            <div className="flex items-center tracking-tighter w-full justify-between overflow-hidden">
              <span className="text-[60px] sm:text-[100px] lg:text-[140px] font-black leading-none text-white tracking-tight inline-flex items-baseline drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <span className="inline-block text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.4)]">Thespian</span>&nbsp;Theater
              </span>

              {/* Right Sunburst Motif in Footer */}
              <div className="hidden sm:block w-36 h-36 opacity-25 pointer-events-none">
                <svg className="w-full h-full text-slate-500" viewBox="0 0 100 100">
                  <g stroke="currentColor" strokeWidth="3">
                    <line x1="50" x2="90" y1="50" y2="10" />
                    <line x1="50" x2="95" y1="50" y2="30" />
                    <line x1="50" x2="70" y1="50" y2="5" />
                    <line x1="50" x2="50" y1="50" y2="2" />
                    <line x1="50" x2="30" y1="50" y2="5" />
                    <line x1="50" x2="10" y1="50" y2="15" />
                    <line x1="50" x2="100" y1="50" y2="50" />
                    <line x1="50" x2="95" y1="50" y2="70" />
                    <line x1="50" x2="85" y1="50" y2="90" />
                  </g>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Reservation Confirmation Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="glass-card bg-slate-900/95 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-slate-700">
            <div className="w-12 h-12 rounded-full bg-yellow-400 text-slate-950 font-black flex items-center justify-center mx-auto mb-4 text-xl shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              ✓
            </div>
            <h3 className="text-xl font-black text-white mb-2">Spot Reserved!</h3>
            <p className="text-xs text-slate-300 mb-6">
              You have successfully reserved your spot for <span className="font-bold text-yellow-400">{modalEvent}</span>. We will send full access passes to your registered email.
            </p>
            <button
              onClick={() => setModalEvent(null)}
              className="w-full py-3 rounded-full bg-yellow-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-yellow-400/20"
            >
              Great, thank you!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
