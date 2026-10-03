"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* ───────────── Framer Motion Variant Definitions ───────────── */
const theatricalEase = [0.22, 1, 0.36, 1] as const;

// Generic fade-up for sections
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: theatricalEase } },
};

// Stagger container
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Stagger item
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: theatricalEase } },
};

// Slide from left
const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: theatricalEase } },
};

// Slide from right
const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: theatricalEase } },
};

// Pop-in spring for floating badges
const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

// Scale fade for images
const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: theatricalEase } },
};

// Header slide down
const headerSlideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};

// Footer grand reveal
const footerBrandReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: theatricalEase } },
};

// Reusable viewport settings — re-triggers on scroll back
const replayViewport = { once: false, amount: 0.2 as const };
const replayViewportSmall = { once: false, amount: 0.1 as const };

export default function Home() {
  const [activePlayCategory, setActivePlayCategory] = useState<"original" | "classics">("original");
  const [reservedEvents, setReservedEvents] = useState<{ [key: string]: boolean }>({});
  const [modalEvent, setModalEvent] = useState<string | null>(null);
  const [showAllYoga, setShowAllYoga] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentProduction, setCurrentProduction] = useState(0);

  const [teamCategory, setTeamCategory] = useState<"all" | "directors" | "actors" | "production">("all");
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Motion & Animation States
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });
  const [tiltAngles, setTiltAngles] = useState<{ [key: string]: { rotateX: number; rotateY: number } }>({});
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMousePos({ x, y });
  };

  const handleEnsembleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = Number((((y - centerY) / centerY) * -14).toFixed(2));
    const rotateY = Number((((x - centerX) / centerX) * 14).toFixed(2));
    setTiltAngles((prev) => ({ ...prev, [id]: { rotateX, rotateY } }));
    setHoveredMemberId(id);
  };

  const handleEnsembleMouseLeave = (id: string) => {
    setTiltAngles((prev) => ({ ...prev, [id]: { rotateX: 0, rotateY: 0 } }));
    setHoveredMemberId(null);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setFormSubmitted(false);
      }, 4000);
    }
  };

  const lastScrollTime = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const handleReserve = (eventTitle: string) => {
    setModalEvent(eventTitle);
    setReservedEvents((prev) => ({ ...prev, [eventTitle]: true }));
  };

  const FlowingWaveDivider = ({ flip = false }: { flip?: boolean }) => (
    <div className={`w-full overflow-hidden leading-none relative z-20 pointer-events-none select-none py-1 ${flip ? "rotate-180" : ""}`}>
      <div className="flex w-[200%] animate-wave-flow-slow opacity-75">
        <svg className="w-1/2 h-14 text-amber-400/50 shrink-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,20 C180,90 380,-30 540,55 C700,135 920,10 1200,60 L1200,120 L0,120 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="10 6"
          />
          <path
            d="M0,50 C220,110 420,-10 620,70 C820,140 1020,30 1200,80"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.8"
          />
        </svg>
        <svg className="w-1/2 h-14 text-amber-400/50 shrink-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,20 C180,90 380,-30 540,55 C700,135 920,10 1200,60 L1200,120 L0,120 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="10 6"
          />
          <path
            d="M0,50 C220,110 420,-10 620,70 C820,140 1020,30 1200,80"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.8"
          />
        </svg>
      </div>
    </div>
  );

  const ensembleMembers = [
    {
      id: "maduranga",
      name: "Mr. Maduranga Weerasingha",
      role: "Artistic Director",
      displayRole: "Artistic Director & Founder",
      category: "directors",
      imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      bio: "Visionary director with 15+ years shaping raw drama into spellbinding stage experiences. Founder of Thespian Theater and champion of independent arts.",
      facebook: "facebook.com/maduranga.weerasingha",
      experience: "15+ Years",
      plays: ["Echoes of the Velvet Curtain", "The Crimson Sonata"],
      quote: "Theater isn't just performance; it is the living mirror of our shared humanity."
    },
    {
      id: "amara",
      name: "Amara Perera",
      role: "Lead Actress",
      displayRole: "Lead Dramatic Actress",
      category: "actors",
      imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      bio: "Award-winning performer known for immense emotional depth and captivating lead presence in classical tragedies and modern Sri Lankan drama.",
      facebook: "facebook.com/amara.perera",
      experience: "10 Years",
      plays: ["Echoes of the Velvet Curtain", "A Midsummer Dream"],
      quote: "Every character has a secret heartbeat — my job is to make the audience hear it."
    },
    {
      id: "enrique",
      name: "Enrique Abascal",
      role: "Associate",
      displayRole: "Associate Director",
      category: "directors",
      imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      bio: "Renowned scenographer and associate director specializing in architectural stage lighting, dynamic pacing, and immersive staging.",
      facebook: "facebook.com/enriqueabascal",
      experience: "12 Years",
      plays: ["Shadows of Tomorrow", "The Last Curtain Call"],
      quote: "Space and shadow speak just as loudly as spoken script."
    },
    {
      id: "kasun",
      name: "Kasun Silva",
      role: "Lead Actor",
      displayRole: "Lead Ensemble Actor",
      category: "actors",
      imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      bio: "Versatile stage performer with a commanding voice and intense physicality across thrillers, period drama, and experimental works.",
      facebook: "facebook.com/kasun.silva",
      experience: "8 Years",
      plays: ["Shadows of Tomorrow", "The Crimson Sonata"],
      quote: "When the lights hit the stage, all pretense fades into truth."
    },
    {
      id: "nimesha",
      name: "Nimesha Fernando",
      role: "Stage Manager",
      displayRole: "Head Stage Manager",
      category: "production",
      imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      bio: "The master coordinator behind every live show — executing light cues, set shifts, sound synchronization, and stage safety without a hitch.",
      facebook: "facebook.com/nimesha-fernando",
      experience: "9 Years",
      plays: ["All Ensemble Productions"],
      quote: "Perfection happens in the dark before the curtain rises."
    },
    {
      id: "roshan",
      name: "Roshan Jayasekara",
      role: "Playwright",
      displayRole: "Resident Playwright & Scenographer",
      category: "directors",
      imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      bio: "Acclaimed writer crafting original scripts that explore myth, memory, and modern morality. Recipient of national literary honors.",
      facebook: "facebook.com/roshan-jayasekara",
      experience: "14 Years",
      plays: ["Echoes of the Velvet Curtain", "The Last Curtain Call"],
      quote: "Words are the invisible architecture of live theater."
    }
  ];

  const filteredEnsemble = ensembleMembers.filter((m) => {
    if (teamCategory === "all") return true;
    return m.category === teamCategory;
  });

  const scrollTeam = (direction: "left" | "right") => {
    if (teamScrollRef.current) {
      const scrollAmount = direction === "left" ? -330 : 330;
      teamScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const productionCards = [
    {
      id: 1,
      title: "Echoes of the Velvet Curtain",
      genre: "Original Drama",
      emoji: "🎭",
      description: "A gripping original drama exploring secrets, ambition, and redemption on our intimate stage. Directed by our resident ensemble with live chamber score and 120-seat acoustic perfection. This production pushes the boundaries of modern theatrical storytelling.",
      imgSrc: "https://i.pinimg.com/1200x/32/d2/33/32d23396e60a94b78db9fb03182cc2f0.jpg",
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
      imgSrc: "https://i.pinimg.com/1200x/7c/ea/4b/7cea4b14f672b93ed2f86e206957e031.jpg",
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
      const total = productionCards.length;
      if (direction === "up") return (prev - 1 + total) % total;
      return (prev + 1) % total;
    });
  };

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // Intercept wheel scroll: prevent window/page scrolling while over carousel
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastScrollTime.current < 350) return;

      if (Math.abs(e.deltaY) > 8) {
        if (e.deltaY > 0) {
          handleProductionNav("down");
        } else {
          handleProductionNav("up");
        }
        lastScrollTime.current = now;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        // Prevent default page scroll during carousel touch drag
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [productionCards.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 30) {
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
      type: "Original Drama",
      date: "Oct 24 – Nov 12, 2025",
      location: "(Thespian Hall, Main Stage)",
    },
    {
      id: "02",
      title: "Shadows of Tomorrow",
      line1: "Shadows of",
      line2: "Tomorrow",
      type: "Psychological Thriller",
      date: "Nov 21 – Dec 07, 2025",
      location: "(Thespian Hall, Main Stage)",
    },
    {
      id: "03",
      title: "The Crimson Sonata",
      line1: "The Crimson",
      line2: "Sonata",
      type: "Romantic Tragedy",
      date: "Dec 19 – Jan 04, 2026",
      location: "(Thespian Hall, Studio Theater)",
    },
    {
      id: "04",
      title: "A Midsummer Dream",
      line1: "A Midsummer",
      line2: "Dream",
      type: "Shakespeare Adaptation",
      date: "Jan 16 – Feb 01, 2026",
      location: "(Thespian Hall, Main Stage)",
    },
    {
      id: "05",
      title: "Acting & Stagecraft Workshop",
      line1: "Acting & Stagecraft",
      line2: "Intensive",
      type: "Theatrical Workshop",
      date: "Feb 15 – Feb 18, 2026",
      location: "(Repertory Rehearsal Studio)",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0a0e16] text-[#dfe2ee] antialiased overflow-x-hidden">

      {/* =========================================================
          SECTION 1 & 2: HEADER, HERO & THESPIAN THEATER
          Background: bg-section-hero (--bg-hero: #0f131c)
         ========================================================= */}
      <section onMouseMove={handleHeroMouseMove} className="w-full bg-section-hero relative transition-colors overflow-hidden pt-3">
        {/* Ambient Theatrical Spotlight Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-amber-500/15 via-yellow-600/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute top-[700px] left-[-200px] w-[600px] h-[600px] bg-gradient-to-r from-red-900/15 via-amber-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-12 relative z-10">

          {/* Header */}
          <motion.header
            variants={headerSlideDown}
            initial="hidden"
            animate="visible"
            className="relative z-30 flex items-center justify-between pb-8"
          >
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
          </motion.header>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mb-6 p-6 rounded-2xl glass-card flex flex-col items-center text-center gap-4 text-xs font-bold tracking-widest text-slate-200 uppercase border border-slate-700 backdrop-blur-2xl bg-slate-900/95 shadow-2xl">
              <a onClick={() => setMobileMenuOpen(false)} href="#how-it-works" className="py-1.5 hover:text-amber-400 transition-colors">WHY OUR THEATER</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#about" className="py-1.5 hover:text-amber-400 transition-colors">ABOUT ENSEMBLE</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#start" className="py-1.5 hover:text-amber-400 transition-colors">PRODUCTIONS</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#team" className="py-1.5 hover:text-amber-400 transition-colors">OUR TEAM</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#events" className="py-1.5 hover:text-amber-400 transition-colors">SHOWTIMES</a>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-6 sm:py-10">

              {/* Hero Left Column */}
              <motion.div
                className="lg:col-span-6 z-10 text-center lg:text-left flex flex-col items-center lg:items-start"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Intimate Stage &bull; Live Drama Troupe
                </motion.div>

                <motion.h1 variants={staggerItem} className="text-4xl sm:text-6xl xl:text-[68px] leading-[1.08] font-extrabold text-white tracking-tight mb-5">
                  Intimate<br />
                  Stage Stories<br />
                  With <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.45)] ">Thespians</span>
                </motion.h1>

                <motion.p variants={staggerItem} className="text-sm sm:text-base text-slate-300 max-w-md font-medium leading-relaxed mb-8 mx-auto lg:mx-0">
                  Experience raw emotion, gripping dialogue, and spellbinding live acting. A dedicated drama ensemble performing heartfelt classics and boundary-pushing original plays in our 120-seat theater.
                </motion.p>

                {/* Actions & Socials */}
                <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-12 sm:mb-16 w-full">
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
                </motion.div>

                {/* Theatrical Counters */}
                <motion.div variants={staggerItem} className="flex flex-wrap sm:flex-nowrap justify-center lg:justify-start items-center sm:items-start gap-6 sm:gap-12 pt-4 border-t border-slate-800/80 text-center sm:text-left w-full">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">42+</div>
                    <p className="text-xs text-slate-400 font-medium max-w-[140px] mt-1 leading-snug mx-auto sm:mx-0">Original plays &amp; classic adaptations staged</p>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">120</div>
                    <p className="text-xs text-slate-400 font-medium max-w-[140px] mt-1 leading-snug mx-auto sm:mx-0">Seat intimate theater with perfect sightlines</p>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">98%</div>
                    <p className="text-xs text-slate-400 font-medium max-w-[130px] mt-1 leading-snug mx-auto sm:mx-0">Standing ovation &amp; sellout attendance</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero Right Column (Stage Model & Floating Glass Cards) */}
              <motion.div
                className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Main Hero Stage Drama Card */}
                <motion.div variants={scaleFade} className="relative w-full max-w-[340px] sm:max-w-[440px] h-[440px] sm:h-[540px] rounded-[40px] sm:rounded-[55px] overflow-hidden glass-card p-2 shadow-2xl border border-white/20 shadow-amber-950/30">
                  <img
                    src="https://i.pinimg.com/736x/aa/71/26/aa712695fbd969e1b23f31e16dd1645d.jpg"
                    alt="Intense stage actor under warm theater spotlight in dramatic performance"
                    className="w-full h-full object-cover rounded-[34px] sm:rounded-[48px] brightness-95 contrast-110"
                  />

                  {/* Stage Lighting Overlay Gradients */}
                  <div className="absolute inset-0 rounded-[34px] sm:rounded-[48px] bg-gradient-to-t from-black/80 via-transparent to-amber-500/10 pointer-events-none" />

                </motion.div>

                {/* Glassmorphism Floating Badge 1: Performance Schedule & Occupancy */}
                <motion.div variants={popIn} className="absolute -top-3 sm:-top-4 right-1 sm:right-6 glass-card-sm p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 w-42 sm:w-48 z-20 hover:scale-105 transition-transform backdrop-blur-xl bg-slate-900/80">
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
                </motion.div>

                {/* Glassmorphism Floating Badge 2: Theater Patrons & Ovations */}
                <motion.div variants={popIn} className="absolute bottom-4 sm:bottom-8 left-1 sm:left-4 glass-card-sm py-2 px-3 sm:px-4 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 sm:gap-3 z-20 hover:scale-105 transition-transform backdrop-blur-xl bg-slate-900/80">
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
                </motion.div>
              </motion.div>

            </div>
          </div>

          {/* Featured Upcoming Event Card */}
          <motion.div
            id="how-it-works"
            className="pt-4 pb-8 relative"
            style={{ zIndex: 5 }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
          >
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
                      src="https://i.pinimg.com/1200x/28/f7/2c/28f72c6f10048035e0c9133d6126969d.jpg"
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
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    Echoes of the <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">Velvet Curtain</span>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed mb-8 max-w-lg drop-shadow-sm mx-auto lg:mx-0">
                    A gripping original drama exploring secrets, ambition, and redemption on our intimate stage. Directed by our resident ensemble with live chamber score and 120-seat acoustic perfection.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-md mx-auto lg:mx-0">
                    {/* Card 1: Event Venue */}
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center sm:aspect-square shadow-lg border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.10] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group">
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
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center sm:aspect-square shadow-lg border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.10] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group">
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
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center sm:aspect-square shadow-lg border border-white/15 relative group cursor-pointer hover:border-amber-400/60 hover:bg-white/[0.10] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
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
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

      </section>

      {/* =========================================================
          SECTION 3: ABOUT OUR ENSEMBLE & THEATER
          Background: bg-section-meals (--bg-meals: #181f2e)
         ========================================================= */}
      <section id="about" className="w-full bg-section-meals py-16 sm:py-24 relative z-10 border-y border-slate-800/80 transition-colors" style={{ paddingTop: '300px', marginTop: '-300px', zIndex: 1 }}>
        {/* Decorative subtle radial glow */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left"
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={replayViewport}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Crafting stories that<br />
                  move the <span className="text-yellow-400 font-semibold italic drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">soul</span>
                </h2>
                <div className="w-12 h-12 flex-shrink-0 text-amber-500/40 hidden sm:block">
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

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Thespian Theater is a passionate, close-knit drama ensemble dedicated to bringing raw, authentic stories to life. Founded in our intimate 120-seat heritage hall, we produce original plays and classic adaptations that challenge, inspire, and move our audiences. Every performance is a journey — come experience theatre the way it was meant to be felt.
              </p>

              {/* Founded Date & Explore Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-8 sm:mb-10 w-full">
                <div
                  className="rounded-2xl p-4 w-44 shadow-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-slate-950 shadow-yellow-500/25 text-left"
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
                  className="rounded-2xl p-4 w-44 cursor-pointer transition-all duration-300 flex flex-col justify-center h-[100px] glass-card text-slate-200 border border-amber-400/40 hover:border-amber-400 hover:bg-slate-800/80 group text-left"
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
              <div className="pt-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="font-signature text-3xl text-amber-300 leading-none tracking-wide">Mr. Maduranga Weerasingha</div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight mt-1">Artistic Director &amp; Founder, Thespian Theater</div>
              </div>
            </motion.div>

            {/* Right Theater Image with Floating Members Card */}
            <motion.div
              className="lg:col-span-6 relative flex justify-center"
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={replayViewport}
            >
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=900&auto=format&fit=crop"
                  alt="Thespian Theater stage with warm theatrical lighting and velvet curtains"
                  className="w-full h-full object-cover rounded-[40px] shadow-2xl border border-slate-700/60 brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <motion.div
                  variants={popIn}
                  className="absolute top-4 right-0 sm:right-4 glass-card-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/20 w-58 z-10 hover:scale-105 transition-transform backdrop-blur-xl bg-slate-900/70"
                >
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
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: OUR PRODUCTIONS — Vertical 3D Depth Carousel
          Background: bg-section-yoga (--bg-yoga: #0f131c)
         ========================================================= */}

      {/* Top Ticker / Marquee Banner */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={replayViewport}
        className="py-6 border-b border-slate-800/80 overflow-hidden bg-slate-950/30"
      >
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

          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">Of</span>

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
      </motion.div>
      <section id="start" className="w-full bg-section-yoga py-8 sm:py-16 relative z-10 transition-colors overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] bg-gradient-to-r from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

          {/* Two-column layout: Carousel Left + Details Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative min-h-[580px] lg:min-h-[640px]">

            {/* ── Left Column: Vertical Angled Card Stack ── */}
            <motion.div
              ref={carouselContainerRef}
              variants={scaleFade}
              initial="hidden"
              whileInView="visible"
              viewport={replayViewportSmall}
              className="lg:col-span-5 relative flex justify-center items-center select-none cursor-ns-resize h-[540px] sm:h-[660px]"
              style={{ perspective: '1200px', touchAction: 'none' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Top gradient fade overlay */}
              <div
                className="absolute top-0 left-0 right-0 h-36 z-30 pointer-events-none"
              />
              {/* Bottom gradient fade overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-36 z-30 pointer-events-none"
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
                    cardFilter = 'blur(3px)';
                    cardZ = 10;
                  } else if (isBottom) {
                    cardTransform = 'translateY(245px) rotate(22deg) scale(0.78)';
                    cardOpacity = 0.45;
                    cardFilter = 'blur(3px)';
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
                        width: 'min(360px, calc(100vw - 48px))',
                        marginLeft: 'calc(-1 * min(180px, calc((100vw - 48px) / 2)))',
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
                        className="rounded-[36px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-white/15 p-4 group w-full"
                        style={{
                          background: 'rgba(18, 24, 38, 0.85)',
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        {/* Card Image */}
                        <div className="rounded-[24px] overflow-hidden w-full shadow-md relative bg-slate-950 h-[300px] sm:h-[385px]">
                          <img
                            src={card.imgSrc}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Right Column: Production Details + Nav Buttons ── */}
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={replayViewport}
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative pl-0 lg:pl-12"
            >

              {/* Up/Down Nav Buttons — positioned at the right edge (desktop) */}
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
              <div className="flex lg:hidden gap-3 mb-6 justify-center">
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
              <div className="max-w-lg mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduction}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: theatricalEase }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left"
                  >
                    {/* Genre Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4 sm:mb-5">
                      <span>{productionCards[currentProduction].emoji}</span>
                      {productionCards[currentProduction].genre}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.12] mb-4 sm:mb-6">
                      {productionCards[currentProduction].title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm lg:text-[15px] text-slate-300 font-medium leading-relaxed mb-6 sm:mb-8">
                      {productionCards[currentProduction].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* VIEW DETAILS Button */}
                <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs tracking-widest uppercase shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2 mx-auto lg:mx-0">
                  VIEW DETAILS
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

            </motion.div>

          </div>
        </div>

        <FlowingWaveDivider flip />
      </section>

      {/* =========================================================
          SECTION 5: OUR TEAM / ENSEMBLE
          Background: bg-section-yoga (--bg-yoga: #0f131c)
         ========================================================= */}
      <section id="team" className="w-full bg-section-meals py-16 sm:py-24 relative z-10 transition-colors overflow-hidden border-t border-b border-slate-800/80">
        {/* Ambient glow */}
        <div className="absolute top-0 right-[-100px] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-red-900/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

          {/* Section Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 text-center md:text-left"
          >
            <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                The People Behind the Curtain
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Meet the<br />
                <span className="text-yellow-400 font-semibold drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">Ensemble</span>
              </h2>
            </motion.div>

            <motion.div variants={staggerItem} className="max-w-lg mx-auto md:mx-0 text-center md:text-left">
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-4">
                Meet the vibrant core of Thespian Theater — a collective of actors, directors, and storytellers bound by a shared passion for the stage. Each member brings unique energy, depth, and artistic vision, making our ensemble a dynamic force in the local theatre scene. Together, we create magic that resonates long after the curtain falls.
              </p>
            </motion.div>
          </motion.div>

          {/* Carousel Wrapper with Side Floating Navigation Arrows */}
          <div className="relative group/carousel my-4">
            
            {/* Left Floating Side Arrow Button */}
            <button
              onClick={() => scrollTeam("left")}
              aria-label="Previous Ensemble Members"
              className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/95 border border-slate-700/90 text-white hover:text-yellow-400 hover:bg-slate-800 hover:border-amber-400/60 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl backdrop-blur-md cursor-pointer active:scale-95"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Floating Side Arrow Button */}
            <button
              onClick={() => scrollTeam("right")}
              aria-label="Next Ensemble Members"
              className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/95 border border-slate-700/90 text-white hover:text-yellow-400 hover:bg-slate-800 hover:border-amber-400/60 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl backdrop-blur-md cursor-pointer active:scale-95"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Horizontal Column Carousel Row */}
            <motion.div
              ref={teamScrollRef}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={replayViewportSmall}
              className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1 -mx-1 relative z-10"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredEnsemble.map((member) => {
                const tilt = tiltAngles[member.id] || { rotateX: 0, rotateY: 0 };
                const isHovered = hoveredMemberId === member.id;

                return (
                  <motion.div
                    key={member.id}
                    variants={staggerItem}
                    className="flex-none snap-start"
                  >
                    <div
                      onMouseMove={(e) => handleEnsembleMouseMove(e, member.id)}
                      onMouseLeave={() => handleEnsembleMouseLeave(member.id)}
                      onClick={() => setSelectedMember(member)}
                      style={{
                        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`,
                        transformStyle: 'preserve-3d',
                        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out'
                      }}
                      className="group w-[250px] sm:w-[280px] md:w-[300px] h-[450px] sm:h-[480px] bg-[#131927]/90 rounded-2xl overflow-hidden relative border border-slate-800/90 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 hover:bg-[#1a2336] hover:border-amber-400/40 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                    >
                      {/* Top Text Info: Role & Name */}
                      <div className="p-5 sm:p-6 pt-6 sm:pt-7 z-10 text-left">
                        <span className="block text-[11px] font-bold text-amber-400/90 tracking-wider uppercase mb-1">
                          {member.role}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight group-hover:text-yellow-300 transition-colors">
                          {member.name}
                        </h3>
                      </div>

                      {/* Cutout Portrait Image */}
                      <div className="relative w-full h-[310px] sm:h-[340px] mt-auto overflow-hidden flex items-end justify-center">
                        <img
                          src={member.imgSrc}
                          alt={member.name}
                          className={`w-full h-full object-cover object-top filter transition-all duration-700 ease-out ${
                            isHovered ? 'grayscale-0 contrast-105 brightness-105 scale-105' : 'grayscale contrast-125 brightness-90'
                          }`}
                        />

                        {/* Static Ensemble Pill Badge (Top Left of Card Image) */}
                        <div className="absolute top-3 left-3 z-20">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400/90 border border-slate-800 text-[9px] font-black tracking-wider uppercase backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            ENSEMBLE
                          </span>
                        </div>

                        {/* Gradient Overlay at bottom for dark dramatic depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                        {/* Facebook Profile Pill Badge (Bottom Left with Facebook Icon) */}
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/90 border border-slate-800 text-slate-300 text-[10px] font-medium backdrop-blur-md shadow-lg group-hover:border-amber-400/50 group-hover:text-amber-300 group-hover:scale-105 transition-all">
                            <svg className="w-3.5 h-3.5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            {member.facebook}
                          </span>
                        </div>

                        {/* View Details Hover Tag */}
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md shadow-yellow-400/20">
                            VIEW BIO
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom CTA Button */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
            className="flex justify-center mt-12"
          >
            <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs tracking-widest uppercase shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2">
              Explore More
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>

        </div>
      </section>

      {/* =========================================================
          SECTION 6: SHOWTIMES TICKER & EVENTS
          Background: bg-section-events (--bg-events: #181f2e)
         ========================================================= */}
      <section id="events" className="w-full bg-section-yoga py-16 sm:py-20 relative z-10 border-t border-slate-800/80 transition-colors">

        {/* Centered Yellow Badge & Centered Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={replayViewport}
          className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 text-center mb-10 relative z-10"
        >
          <motion.div variants={staggerItem}>
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              ★ UPCOMING SCHEDULE & EVENTS
            </div>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Upcoming <span className="text-yellow-400 font-semibold drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">Showtimes & Events</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
            Explore our upcoming repertory plays, psychological thrillers, classical adaptations, and hands-on stagecraft workshops.
          </motion.p>
        </motion.div>

        {/* Top Ticker / Marquee Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={replayViewport}
          className="py-5 border-y border-slate-800/80 overflow-hidden bg-slate-950/30 mb-8"
        >
          <div className="flex items-center justify-around whitespace-nowrap text-2xl sm:text-3xl font-extrabold text-white tracking-tight select-none opacity-80">
            <span className="opacity-40">SHOWTIMES</span>

            <div className="w-6 h-6 opacity-60">
              <svg className="w-full h-full text-amber-400 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
                  <line x1="50" x2="50" y1="5" y2="25" /><line x1="50" x2="50" y1="75" y2="95" />
                  <line x1="5" x2="25" y1="50" y2="50" /><line x1="75" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="32" y1="18" y2="32" /><line x1="68" x2="82" y1="68" y2="82" />
                  <line x1="18" x2="32" y1="82" y2="68" /><line x1="68" x2="82" y1="32" y2="18" />
                </g>
              </svg>
            </div>

            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">THESPIAN REPERTORY</span>

            <div className="w-6 h-6 opacity-60">
              <svg className="w-full h-full text-amber-400 animate-slow-spin" viewBox="0 0 100 100">
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
                  <line x1="50" x2="50" y1="5" y2="25" /><line x1="50" x2="50" y1="75" y2="95" />
                  <line x1="5" x2="25" y1="50" y2="50" /><line x1="75" x2="95" y1="50" y2="50" />
                  <line x1="18" x2="32" y1="18" y2="32" /><line x1="68" x2="82" y1="68" y2="82" />
                  <line x1="18" x2="32" y1="82" y2="68" /><line x1="68" x2="82" y1="32" y2="18" />
                </g>
              </svg>
            </div>

            <span className="opacity-40">SEASON 2026</span>
          </div>
        </motion.div>

        {/* Event Schedule Rows with Motion Trail & Staggered Reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={replayViewport}
          className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 divide-y divide-slate-800/80"
        >
          {events.map((evt) => (
            <motion.div
              key={evt.id}
              variants={staggerItem}
              className="py-6 sm:py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 hover:bg-slate-900/50 px-4 sm:px-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/5 group text-center lg:text-left"
            >
              {/* Event ID & Title */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-6 lg:w-5/12 text-center sm:text-left">
                <span className="text-sm font-bold text-amber-400/80 group-hover:text-amber-300 transition-colors shrink-0">{evt.id}</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight group-hover:text-yellow-300 transition-colors">
                  {evt.line1} {evt.line2}
                </h3>
              </div>

              {/* NEW COLUMN: Event Type (Drama, Workshop, Thriller, etc.) */}
              <div className="flex justify-center lg:justify-start lg:w-3/12">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide group-hover:border-amber-400/60 transition-colors">
                  🎭 {evt.type}
                </span>
              </div>

              {/* Date & Location */}
              <div className="text-xs font-medium text-slate-300 lg:w-3/12 text-center lg:text-left">
                <span className="text-white font-bold block mb-0.5">{evt.date}</span>
                <span className="text-slate-400">{evt.location}</span>
              </div>

              {/* More Details Button */}
              <div className="lg:w-2/12 flex justify-center lg:justify-end">
                <button
                  onClick={() => handleReserve(evt.title)}
                  className={`px-6 py-2.5 rounded-full border text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 shadow-md flex items-center gap-1.5 ${
                    reservedEvents[evt.title]
                      ? "bg-amber-400 text-slate-950 border-amber-400 font-extrabold shadow-amber-400/20"
                      : "border-slate-700 bg-slate-900/80 text-slate-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-slate-800"
                  }`}
                >
                  {reservedEvents[evt.title] ? "Spot Reserved ✓" : "More Details"}
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* =========================================================
          SECTION 7: CONTACT US FORM
          Background: bg-section-meals (--bg-meals: #181f2e)
         ========================================================= */}
      <section id="contact" className="w-full bg-section-meals py-16 sm:py-24 relative z-10 overflow-hidden border-t border-slate-800/80 transition-colors">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Main Card Canvas Frame */}
          <motion.div
            variants={scaleFade}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
            className="w-full bg-slate-900/60 backdrop-blur-xl rounded-[32px] sm:rounded-[48px] border border-slate-800/80 shadow-2xl p-6 sm:p-10 lg:p-16 relative overflow-hidden"
          >
            
            {/* Top Left Symbol (Matching reference picture icon mark) */}
            <div className="absolute top-8 left-8 hidden sm:block">
              <span className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin inline-block" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Column: Contact Form */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={replayViewport}
                className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <motion.div variants={staggerItem}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Reach Out To The Box Office
                  </div>
                </motion.div>

                <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Contact <span className="text-yellow-400 font-semibold drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">us</span>
                </motion.h2>

                <motion.p variants={staggerItem} className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  Please don&apos;t hesitate to reach out to us whenever you need assistance with ticket reservations, private theater bookings, auditions, or press inquiries. We&apos;ll make sure to respond to you promptly.
                </motion.p>

                {formSubmitted ? (
                  <motion.div variants={staggerItem} className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-bold flex items-center gap-3 animate-fadeIn w-full">
                    <span className="w-8 h-8 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center font-black shrink-0">✓</span>
                    Thank you! Your message has been sent to our Box Office. We will get back to you promptly.
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6 w-full text-left">
                    <motion.div variants={staggerItem}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full bg-slate-950/60 border-b-2 border-slate-700 focus:border-yellow-400 text-white px-4 py-3.5 text-sm focus:outline-none transition-colors rounded-t-lg font-medium"
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full bg-slate-950/60 border-b-2 border-slate-700 focus:border-yellow-400 text-white px-4 py-3.5 text-sm focus:outline-none transition-colors rounded-t-lg font-medium"
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we assist you with tickets or productions?"
                        className="w-full bg-slate-950/60 border-b-2 border-slate-700 focus:border-yellow-400 text-white px-4 py-3.5 text-sm focus:outline-none transition-colors rounded-t-lg resize-none font-medium"
                      />
                    </motion.div>

                    <motion.button
                      variants={staggerItem}
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white font-extrabold text-xs tracking-widest uppercase hover:bg-yellow-400 hover:text-slate-950 hover:border-yellow-400 transition-all duration-300 cursor-pointer shadow-lg active:scale-98"
                    >
                      Message
                    </motion.button>
                  </form>
                )}
              </motion.div>

              {/* Right Column: Info Card with Gold Backdrop Block (Matching reference picture design) */}
              <motion.div
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={replayViewport}
                className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none"
              >
                {/* Yellow/Amber Decorative Top-Right Corner Block & Bottom Dot */}
                <div className="absolute -top-6 -right-6 w-3/4 h-full bg-yellow-400 rounded-3xl -z-10 transform translate-x-3 translate-y-3 hidden sm:block shadow-lg" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full -z-10 hidden sm:block shadow-md" />

                {/* Dark Info Box */}
                <div className="bg-[#0f1420] border border-slate-800/90 p-6 sm:p-8 lg:p-10 rounded-[32px] shadow-2xl text-white relative">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 sm:mb-8 tracking-tight text-center sm:text-left">
                    Info
                  </h3>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={replayViewport}
                    className="space-y-6"
                  >
                    {/* Email */}
                    <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">BOX OFFICE EMAIL</span>
                        <a href="mailto:info@thespiantheater.com" className="text-sm font-semibold text-slate-200 hover:text-yellow-400 transition-colors">
                          info@thespiantheater.com
                        </a>
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">TICKET HOTLINE</span>
                        <a href="tel:+94112345678" className="text-sm font-semibold text-slate-200 hover:text-yellow-400 transition-colors">
                          +94 11 234 5678 / +94 77 123 4567
                        </a>
                      </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">THEATER ADDRESS</span>
                        <span className="text-sm font-semibold text-slate-200">
                          27 Velvet Stage Street, Colombo 07
                        </span>
                      </div>
                    </motion.div>

                    {/* Hours */}
                    <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" />
                          <path strokeLinecap="round" fill="none" d="M12 7v5l3 3" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">BOX OFFICE HOURS</span>
                        <span className="text-sm font-semibold text-slate-200">
                          09:00 - 20:00 (Mon - Sun)
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================
          SECTION 8: FOOTER
          Background: bg-section-footer (--bg-footer: #0f131c)
         ========================================================= */}
      <footer className="w-full bg-section-footer relative z-10 overflow-hidden border-t border-slate-800/80 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">

          {/* Top Copyright */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sm:mb-12 text-center sm:text-left"
          >
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 text-[11px] font-semibold text-slate-400 tracking-tight">
              <a href="#how-it-works" className="hover:text-amber-400 transition-colors">About</a>
              <a href="#start" className="hover:text-amber-400 transition-colors">Productions</a>
              <a href="#team" className="hover:text-amber-400 transition-colors">Ensemble</a>
              <a href="#events" className="hover:text-amber-400 transition-colors">Showtimes</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 tracking-tight text-center sm:text-right">
              © 2025 Thespian Theater. All rights reserved.
            </p>
          </motion.div>

          {/* Large Stylized Brand Logo Display */}
          <div className="relative flex items-center justify-between select-none">

            {/* Left Stylized Sunburst Motif */}
            <div className="absolute -bottom-10 -left-12 w-48 h-48 opacity-20 pointer-events-none hidden sm:block">
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
            <motion.div
              variants={footerBrandReveal}
              initial="hidden"
              whileInView="visible"
              viewport={replayViewport}
              className="flex items-center tracking-tighter w-full justify-center lg:justify-between overflow-hidden text-center lg:text-left"
            >
              <span className="text-[32px] min-[380px]:text-[40px] sm:text-[76px] md:text-[100px] lg:text-[136px] font-black leading-none text-white tracking-tight inline-flex flex-wrap sm:flex-nowrap items-baseline justify-center lg:justify-start drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <span className="inline-block text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.4)]">Thespian</span>&nbsp;Theater
              </span>

              {/* Right Sunburst Motif in Footer */}
              <div className="hidden lg:block w-36 h-36 opacity-25 pointer-events-none shrink-0">
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
            </motion.div>

          </div>
        </div>
      </footer>

      {/* Reservation Confirmation Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="glass-card bg-slate-900/95 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center border border-slate-700">
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

      {/* Team Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
          <div className="glass-card bg-slate-900/98 rounded-t-3xl sm:rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-700/80 flex flex-col md:flex-row relative max-h-[92vh] sm:max-h-[88vh]">

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              aria-label="Close modal"
              className="absolute top-3 right-4 z-30 w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold shadow-md"
            >
              ✕
            </button>

            {/* ── Mobile Layout (< md) ─────────────────── */}
            <div className="flex flex-col md:hidden overflow-hidden">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-0">
                <div className="w-10 h-1 rounded-full bg-slate-600" />
              </div>

              {/* Compact header: small avatar + name */}
              <div className="flex items-center gap-3 px-5 pt-3 pb-3 border-b border-slate-800/80">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/80">
                  <img
                    src={selectedMember.imgSrc}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0 pr-8">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-wider mb-1">
                    {selectedMember.displayRole}
                  </span>
                  <h3 className="text-base font-extrabold text-white leading-tight">
                    {selectedMember.name}
                  </h3>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedMember.bio}
                </p>

                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-amber-400 mb-2">
                    Featured Productions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.plays.map((play: string, i: number) => (
                      <span key={i} className="text-xs bg-slate-900 px-2.5 py-1 rounded-lg text-slate-200 font-medium">
                        🎭 {play}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMember.quote && (
                  <blockquote className="text-xs italic text-slate-400 border-l-2 border-amber-400 pl-3 py-1">
                    &ldquo;{selectedMember.quote}&rdquo;
                  </blockquote>
                )}

                <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-800 pb-1">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Experience: <strong className="text-white">{selectedMember.experience}</strong>
                  </span>
                  <a
                    href={`https://${selectedMember.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center px-4 py-3 rounded-2xl bg-amber-400 text-slate-950 text-xs font-extrabold hover:bg-yellow-300 transition-colors inline-flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook Profile
                  </a>
                </div>
              </div>
            </div>

            {/* ── Desktop Layout (>= md) ─────────────── */}
            {/* Left Portrait */}
            <div className="hidden md:block md:w-2/5 relative overflow-hidden bg-slate-950 shrink-0">
              <img
                src={selectedMember.imgSrc}
                alt={selectedMember.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/80" />
            </div>

            {/* Right Details */}
            <div className="hidden md:flex md:w-3/5 p-8 flex-col justify-between text-left overflow-y-auto">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                  {selectedMember.displayRole}
                </span>
                <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight">
                  {selectedMember.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedMember.bio}
                </p>

                <div className="bg-slate-800/50 rounded-2xl p-4 mb-4 border border-slate-700/50">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-amber-400 mb-1">
                    Featured Productions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.plays.map((play: string, i: number) => (
                      <span key={i} className="text-xs bg-slate-900 px-2.5 py-1 rounded-lg text-slate-200 font-medium">
                        🎭 {play}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMember.quote && (
                  <blockquote className="text-xs italic text-slate-400 border-l-2 border-amber-400 pl-3 py-1 mb-4">
                    &ldquo;{selectedMember.quote}&rdquo;
                  </blockquote>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold">
                  Experience: <strong className="text-white">{selectedMember.experience}</strong>
                </span>
                <a
                  href={`https://${selectedMember.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 text-xs font-bold hover:bg-yellow-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook Profile
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
