"use client";

import { useCart } from "@/context/CartContext";

function formatPrice(n: number) {
  return "Rs. " + n.toLocaleString("en-PK");
}

export function FloatingCartButton() {
  const { itemCount, totalPrice, toggleSidebar } = useCart();
  const hasItems = itemCount > 0;

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label={
        hasItems
          ? `Open cart (${itemCount} items, total ${formatPrice(totalPrice)})`
          : "Open cart (empty)"
      }
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-full bg-[#E8420A] px-4 py-3 text-white shadow-lg shadow-[#E8420A]/40 transition-transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#E8420A] focus:ring-offset-2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 ${
        hasItems ? "" : "opacity-80"
      }`}
      disabled={!hasItems}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5C500] text-[#1A1A1A]">
          🛒
        </span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">
            {hasItems ? "Checkout" : "Cart"}
          </span>
          <span className="text-sm font-bold">
            {hasItems ? formatPrice(totalPrice) : "No items yet"}
          </span>
        </div>
      </div>
      {hasItems && (
        <span className="ml-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
          {itemCount} item{itemCount > 1 ? "s" : ""}
        </span>
      )}
    </button>
  );
}
