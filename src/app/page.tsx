"use client";

import { useEffect, useMemo, useState } from "react";
import { CartSidebar } from "@/components/CartSidebar";
import { FloatingCartButton } from "@/components/FloatingCartButton";
import { OrderingGrid } from "@/components/OrderingGrid";
import { WhyCheeziousSection } from "@/components/WhyCheeziousSection";
import { CheeziousLogo } from "@/components/CheeziousLogo";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      setShowScrollIndicator(window.scrollY < 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tickerMessages = useMemo(
    () =>
      [
        "🔥 Rawalpindi — Just ordered Crown Crust",
        "★ 4.8 Rating — Most loved pizza tonight",
        "🚚 Lahore — New delivery in 30–40 mins",
        "🧀 Islamabad — Fresh daily, straight from kitchen",
        "📍 Faisalabad — Popular pick: Beasty Burger",
        "💛 20+ locations — Order from nearest branch",
        "⚡ Hot & ready — Your cheez is on the way",
      ].map((text, idx) => ({ text, key: `t-${idx}` })),
    []
  );

  const scrollToOrdering = () => {
    const el = document.getElementById("order-section");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-cheez-ink mb-20 md:mb-0">
      {/* Sticky Navbar (becomes white on scroll) */}
      <header
        className={`sticky top-0 z-50 transition-colors ${
          isScrolled
            ? "bg-white shadow-sm"
            : "bg-white/10 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <CheeziousLogo />

          <div className="hidden items-center gap-6 text-sm font-medium text-[#1A1A1A]/80 md:flex">
            <button className="rounded-full border border-[#E8420A]/20 px-4 py-1.5 text-xs uppercase tracking-wide hover:border-[#E8420A] hover:text-[#E8420A] transition-colors">
              Menu
            </button>
            <button className="rounded-full border border-[#E8420A]/20 px-4 py-1.5 text-xs uppercase tracking-wide hover:border-[#E8420A] hover:text-[#E8420A] transition-colors">
              Locations
            </button>
            <button className="rounded-full border border-[#E8420A]/20 px-4 py-1.5 text-xs uppercase tracking-wide hover:border-[#E8420A] hover:text-[#E8420A] transition-colors">
              Franchise
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Feature coming soon")}
              className="rounded-full border border-[#E8420A]/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#E8420A] shadow-sm hover:border-[#E8420A] hover:bg-[#E8420A]/5 transition-colors"
            >
              Track Order
            </button>
            <button className="rounded-full bg-[#E8420A] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md hover:bg-[#C73A08] md:px-4 md:inline-flex">
              Login
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section 
        className="relative min-h-screen overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #FFF8C0 0%, #FFFBE8 50%, #FFF9E0 100%)'
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,183,3,0.20),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(229,57,53,0.14),transparent_45%)]" />

        <div className="relative mx-auto max-w-6xl px-4 pt-24 md:px-6 md:pt-28">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
            {/* LEFT */}
            <div className="w-full order-1 md:max-w-[46%] md:order-1">
              <h1 className="text-[28px] font-black leading-[0.95] tracking-tight text-black md:text-[40px] lg:text-[62px]">
                Pakistan Ka Favorite Cheez
              </h1>
              <p className="mt-4 text-base font-semibold text-[#1A1A1A]/60 sm:text-lg">
                Pure Cheez, Pure Obsession
              </p>

              <button
                type="button"
                onClick={scrollToOrdering}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-[#E8420A] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_45px_rgba(232,66,10,0.35)] transition-transform hover:scale-[1.02] hover:bg-[#C73A08]"
              >
                Order Now <span className="ml-2 text-lg">→</span>
              </button>

              <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-[12px] border border-[#F0E68C] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <p className="text-sm font-black text-black">30 Min Delivery</p>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/60">
                    Fast kitchen to door
                  </p>
                </div>
                <div className="rounded-[12px] border border-[#F0E68C] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <p className="text-sm font-black text-black">Fresh Daily</p>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/60">
                    Made today, served hot
                  </p>
                </div>
                <div className="rounded-[12px] border border-[#F0E68C] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <p className="text-sm font-black text-black">20+ Locations</p>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/60">
                    Nearest kitchen routing
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex w-full items-center justify-center md:max-w-[54%] order-2 md:order-2">
              <div className="relative">
                <div className="h-[280px] w-[280px] mx-auto md:h-[320px] md:w-[320px] rounded-full bg-white/20 backdrop-blur-xl border border-white/60 shadow-[0_0_0_10px_rgba(245,197,0,0.25),0_40px_120px_rgba(232,66,10,0.14),0_0_80px_rgba(245,197,0,0.25)] lg:h-[420px] lg:w-[420px]" />

                <div className="absolute inset-[18px] overflow-hidden rounded-full bg-white/10 border border-white/30">
                  {/* Inline SVG pizza (melted cheese, pepperoni, peppers, olives) */}
                  <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
                    <defs>
                      <radialGradient id="cheeseGrad" cx="50%" cy="35%" r="70%">
                        <stop offset="0%" stopColor="#FFD86A" />
                        <stop offset="45%" stopColor="#FFB703" />
                        <stop offset="100%" stopColor="#E58B00" />
                      </radialGradient>
                      <linearGradient id="sauceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E53935" />
                        <stop offset="100%" stopColor="#B91C1C" />
                      </linearGradient>
                      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#E63946" floodOpacity="0.18" />
                      </filter>
                    </defs>

                    {/* Crust */}
                    <circle cx="150" cy="150" r="128" fill="#F4C97B" filter="url(#softShadow)" />
                    <circle cx="150" cy="150" r="118" fill="#DDA85A" opacity="0.25" />

                    {/* Sauce base */}
                    <circle cx="150" cy="150" r="108" fill="url(#sauceGrad)" />

                    {/* Melted golden cheese */}
                    <path
                      d="M56,148
                      C56,104 96,70 150,70
                      C204,70 244,104 244,148
                      C244,195 206,224 150,224
                      C94,224 56,195 56,148Z"
                      fill="url(#cheeseGrad)"
                    />

                    {/* Drips / melt */}
                    <path
                      d="M82,196
                      C74,178 86,160 105,153
                      C95,168 98,181 110,190
                      C101,196 93,204 82,196Z"
                      fill="#FFB703"
                      opacity="0.95"
                    />
                    <path
                      d="M176,215
                      C168,199 178,184 198,178
                      C190,196 198,209 212,214
                      C202,219 188,223 176,215Z"
                      fill="#FFB703"
                      opacity="0.95"
                    />
                    <path
                      d="M124,214
                      C114,199 123,183 142,176
                      C135,195 143,206 156,212
                      C146,217 136,222 124,214Z"
                      fill="#FFB703"
                      opacity="0.95"
                    />
                    {/* Cheese highlight */}
                    <path
                      d="M75,150
                      C78,114 110,90 150,90
                      C190,90 222,114 225,150
                      C212,134 182,122 150,122
                      C118,122 88,134 75,150Z"
                      fill="#FFD86A"
                      opacity="0.35"
                    />

                    {/* Pepperoni slices */}
                    <g>
                      <circle cx="98" cy="132" r="14" fill="#9B1C1C" />
                      <circle cx="98" cy="132" r="8" fill="#7A1313" opacity="0.8" />
                      <circle cx="200" cy="112" r="14" fill="#9B1C1C" />
                      <circle cx="200" cy="112" r="8" fill="#7A1313" opacity="0.8" />
                      <circle cx="180" cy="180" r="14" fill="#9B1C1C" />
                      <circle cx="180" cy="180" r="8" fill="#7A1313" opacity="0.8" />
                      <circle cx="120" cy="195" r="14" fill="#9B1C1C" />
                      <circle cx="120" cy="195" r="8" fill="#7A1313" opacity="0.8" />
                      <circle cx="145" cy="132" r="12" fill="#9B1C1C" />
                      <circle cx="145" cy="132" r="7" fill="#7A1313" opacity="0.8" />
                    </g>

                    {/* Green pepper chunks */}
                    <g>
                      <rect x="130" y="85" width="16" height="10" rx="5" fill="#2F9E44" />
                      <rect x="170" y="95" width="15" height="10" rx="5" fill="#2F9E44" opacity="0.95" />
                      <rect x="205" y="160" width="16" height="10" rx="5" fill="#2F9E44" opacity="0.95" />
                      <rect x="105" y="165" width="16" height="10" rx="5" fill="#2F9E44" />
                      <rect x="148" y="200" width="18" height="11" rx="5" fill="#2F9E44" opacity="0.95" />
                    </g>

                    {/* Black olives */}
                    <g>
                      <circle cx="88" cy="170" r="7" fill="#111111" />
                      <circle cx="215" cy="145" r="7" fill="#111111" />
                      <circle cx="150" cy="165" r="7" fill="#111111" />
                      <circle cx="110" cy="115" r="6" fill="#111111" opacity="0.95" />
                      <circle cx="190" cy="215" r="6" fill="#111111" opacity="0.95" />
                    </g>
                  </svg>
                </div>

                {/* Floating badges */}
                <div className="cheez-floaty-1 absolute -left-4 top-14 rounded-2xl border border-white/60 bg-[#F5C500] px-4 py-3 shadow-[0_22px_60px_rgba(245,197,0,0.35)] backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1A1A1A]">
                    +2.3M Orders
                  </p>
                </div>
                <div className="cheez-floaty-2 absolute -right-3 top-44 rounded-2xl border border-white/60 bg-[#1A1A1A] px-4 py-3 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.10)]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white">
                    Hot & Ready
                  </p>
                </div>

                <div className="cheez-floaty-2 absolute -bottom-6 left-6 rounded-2xl border border-white/60 bg-white/60 px-4 py-3 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.10)]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1A1A1A]">
                    Fast Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </section>

      {/* SOCIAL PROOF TICKER */}
      <div className="bg-[#E8420A] text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
          <span className="whitespace-nowrap text-sm font-black tracking-wide">
            Trending Now
          </span>
          <div className="relative overflow-hidden flex-1">
            <div className="flex w-max gap-8 cheez-marquee">
              {(() => {
                const doubled = [...tickerMessages, ...tickerMessages];
                return doubled.map((msg, idx) => (
                <span
                  key={`${msg.key}-${idx >= tickerMessages.length ? "b" : "a"}`}
                  className="whitespace-nowrap text-sm font-semibold text-white/95"
                >
                  {msg.text}
                </span>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      <WhyCheeziousSection />

      {/* MENU / ORDERING */}
      <main id="order-section" className="bg-cheez-bg">
        <OrderingGrid />
      </main>

      <FloatingCartButton />
      <CartSidebar />

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {/* Left: Logo + Tagline */}
            <div className="lg:col-span-1">
              <CheeziousLogo textClassName="text-white" />

              <p className="mt-4 text-sm text-white/60">
                Order faster. Track live. Enjoy hot, cheez-loaded meals across Pakistan.
              </p>
            </div>

            {/* Center: Links */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70 mb-4">
                Quick Links
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#order-section" className="text-white/80 hover:text-white transition-colors">
                  Menu
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Locations
                </a>
                <a href="/track-order" className="text-white/80 hover:text-white transition-colors">
                  Track Order
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Franchise
                </a>
              </div>
            </div>

            {/* Right: App Downloads */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70 mb-4">
                Download Our App
              </p>
              <div className="space-y-3">
                <a
                  href="https://apps.apple.com/pk/app/cheezious/id1535315212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 w-full md:w-auto"
                >
                  <span className="text-lg">🍎</span>
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.blink.cheezious"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 w-full md:w-auto"
                >
                  <span className="text-lg">▶</span>
                  Play Store
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70 mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/cheeziouspakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/90 transition-colors hover:bg-white/10"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/Cheezious"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/90 transition-colors hover:bg-white/10"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@cheeziouspakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/90 transition-colors hover:bg-white/10"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.12 2.19-.74 2.77-1.73.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white/60">
              © 2026 Cheezious Pvt. Ltd. — All Rights Reserved | Rawalpindi, Pakistan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
