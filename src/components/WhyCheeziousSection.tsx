"use client";

const reasons = [
  {
    title: "Fresh Ingredients",
    subtitle: "Made daily, cooked hot",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 11c0-4 4-8 9-8s9 4 9 8-4 9-9 9-9-5-9-9Z" />
        <path d="M7 11h10" />
        <path d="M12 7v10" />
      </svg>
    ),
  },
  {
    title: "Fast Delivery",
    subtitle: "30–40 min feel-good ETA",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h13v10H3z" />
        <path d="M16 9h4l1 3v4h-5" />
        <path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M18 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    ),
  },
  {
    title: "Best Prices",
    subtitle: "Bonuses + value bundles",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6H9" />
        <path d="M13 12H4" />
        <path d="M17 18H6" />
        <path d="M20 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Halal Certified",
    subtitle: "Trusted, quality-first kitchens",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10Z" />
        <path d="M9 12l2 2 4-5" />
      </svg>
    ),
  },
] as const;

export function WhyCheeziousSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-black tracking-tight text-cheez-ink md:text-3xl">
            Why Cheezious?
          </h2>
          <p className="mt-1 text-sm font-semibold text-cheez-ink/70 md:text-base">
            Built for fast decisions, hot delivery, and total peace of mind.
          </p>
        </div>
        <div className="hidden rounded-full bg-cheez-red/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cheez-red md:block">
          Premium ordering experience
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="group rounded-3xl border border-white/60 bg-white/40 p-5 backdrop-blur-xl shadow-[0_18px_60px_rgba(229,57,53,0.10)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cheez-red/10 text-cheez-red ring-1 ring-cheez-red/20">
                {r.icon}
              </div>
              <h3 className="text-base font-black text-cheez-ink">{r.title}</h3>
            </div>
            <p className="mt-3 text-sm font-semibold text-cheez-ink/70">
              {r.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

