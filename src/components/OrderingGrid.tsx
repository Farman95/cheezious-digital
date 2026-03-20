"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/data/menu-items";

const CATEGORIES = ["All", "Pizza", "Burger", "Platter", "Roll", "Sides"] as const;

export function OrderingGrid() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const getOriginalPriceDisplay = (priceNumber: number, itemId: string) => {
    if (itemId === "crown-crust") return "Rs. 1,799";
    // Fake "was" price for a high-conversion deal feeling.
    const original = Math.round(priceNumber * 1.25 / 10) * 10;
    return `Rs. ${original.toLocaleString("en-PK")}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 md:pt-8">
      {/* Horizontal Category Bar */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 md:mb-6 scrollbar-hide whitespace-nowrap" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              disabled={isLoading}
              className={`whitespace-nowrap rounded-[99px] border-[1.5px] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] transition-colors ${
                isActive
                  ? "border-transparent bg-[#F5C500] text-[#1A1A1A]"
                  : "border-[#E0D080] bg-white text-[#1A1A1A]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Food Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="animate-pulse">
                <div className="rounded-[16px] border border-[#F0E68C] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="mb-3 h-[140px] md:h-[180px] rounded-[16px] bg-gray-200"></div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-4 w-16 rounded-2xl bg-gray-200"></div>
                    <div className="h-6 w-24 rounded-2xl bg-gray-200"></div>
                    <div className="h-4 w-full rounded-2xl bg-gray-200"></div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-6 w-16 rounded-2xl bg-gray-200"></div>
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))
          : filteredItems.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-[16px] border border-[#F0E68C] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(232,66,10,0.15)]"
              >
                {item.id === "crown-crust" && (
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-[#F5C500] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#1A1A1A] shadow-sm">
                    Most Loved
                  </div>
                )}

                {/* Food Image */}
                <div className="relative h-[140px] md:h-[180px] overflow-hidden rounded-t-[16px]">
                  <Image
                    src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="inline-flex w-fit rounded-full bg-[#E8420A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8420A]">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-[#1A1A1A]/70 line-clamp-2">{item.description}</p>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 p-4 pt-0">
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-xs font-semibold text-[#1A1A1A]/45 line-through">
                      {getOriginalPriceDisplay(item.priceNumber, item.id)}
                    </span>
                    <span className="text-xl font-black text-[#E8420A]">
                      {item.priceDisplay}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8420A] text-white shadow-md transition-transform hover:scale-[1.05] hover:bg-[#C73A08] focus:outline-none focus:ring-2 focus:ring-[#E8420A] focus:ring-offset-2"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <span className="text-lg font-black">+</span>
                  </button>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
