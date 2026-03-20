"use client";

import { useCart } from "@/context/CartContext";
import { menuItems } from "@/data/menu-items";

export function MenuSection() {
  const { addItem, openSidebar } = useCart();

  const handleAdd = (item: (typeof menuItems)[number]) => {
    addItem(item);
    openSidebar();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-cheez-ink md:text-2xl">
            Our Menu
          </h2>
          <p className="mt-1 text-sm text-cheez-ink/70 md:text-base">
            Hand-picked cheez hits. Add to cart and we&apos;ll get it to you hot.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-3">
        {menuItems.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col rounded-3xl border border-white/60 bg-gradient-to-br from-cheez-card to-cheez-bg/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-transform hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
          >
            <div className="flex flex-1 flex-col gap-2">
              <span className="inline-flex w-fit rounded-full bg-cheez-red/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cheez-red">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-cheez-ink">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-sm text-cheez-ink/70 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-base font-bold text-cheez-ink md:text-lg">
                {item.priceDisplay}
              </span>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                className="rounded-full bg-cheez-red px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cheez-white shadow-md transition-colors hover:bg-[#d52f3b]"
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
