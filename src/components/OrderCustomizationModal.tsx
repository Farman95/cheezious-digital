"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuItemData } from "@/lib/cart-types";

interface OrderCustomizationModalProps {
  item: MenuItemData;
  onClose: () => void;
  onConfirm: (quantity: number, size: "small" | "regular" | "large", instructions: string) => void;
}

export function OrderCustomizationModal({
  item,
  onClose,
  onConfirm,
}: OrderCustomizationModalProps) {
  const [size, setSize] = useState<"small" | "regular" | "large">("regular");
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  const getSizeMultiplier = (selectedSize: "small" | "regular" | "large") => {
    if (selectedSize === "small") return 0.85;
    if (selectedSize === "large") return 1.2;
    return 1;
  };

  const adjustedPrice = item.priceNumber * getSizeMultiplier(size);
  const adjustedPriceDisplay = `Rs. ${adjustedPrice.toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  const handleConfirm = () => {
    onConfirm(quantity, size, instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-white/50 bg-white shadow-2xl flex flex-col max-h-[90vh] md:max-h-[95vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          ✕
        </button>

        {/* Item Image */}
        <div className="relative h-48 w-full rounded-t-3xl overflow-hidden flex-shrink-0">
          <Image
            src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-0">
          {/* Item Details */}
          <h2 className="text-2xl font-black text-[#1A1A1A]">{item.name}</h2>
          {item.description && (
            <p className="mt-1 text-sm text-[#1A1A1A]/70">{item.description}</p>
          )}

          {/* Size Selector */}
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#1A1A1A]/70">
              Size
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["small", "regular", "large"] as const).map((s) => {
                const multiplier = getSizeMultiplier(s);
                const sizePrice = item.priceNumber * multiplier;
                const label = s.charAt(0).toUpperCase() + s.slice(1);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`rounded-lg border-2 px-3 py-2 text-xs font-semibold uppercase transition-colors ${
                      size === s
                        ? "border-[#E8420A] bg-[#E8420A]/10 text-[#E8420A]"
                        : "border-gray-300 bg-white text-[#1A1A1A] hover:border-[#E8420A]"
                    }`}
                  >
                    <div>{label}</div>
                    <div className="mt-1 text-[10px] font-bold">
                      {s === "small" && "−15%"} {s === "large" && "+20%"}
                      {s === "regular" && "Base"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#1A1A1A]/70">
              Special Instructions
            </p>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Any special requests? e.g. extra cheese, less spicy"
              className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm placeholder:text-[#1A1A1A]/40 focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
              rows={3}
            />
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-100 p-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-bold text-[#E8420A] hover:bg-gray-200"
            >
              −
            </button>
            <span className="text-lg font-black text-[#1A1A1A]">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-bold text-[#E8420A] hover:bg-gray-200"
            >
              +
            </button>
            <div className="text-right">
              <p className="text-xs text-[#1A1A1A]/60">Unit Price</p>
              <p className="text-lg font-black text-[#E8420A]">{adjustedPriceDisplay}</p>
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-4 rounded-xl bg-[#F5C500]/20 p-3">
            <p className="text-xs text-[#1A1A1A]/70">Total</p>
            <p className="mt-1 text-2xl font-black text-[#1A1A1A]">
              Rs. {(adjustedPrice * quantity).toLocaleString("en-PK", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>

        {/* Sticky Footer with Add to Cart Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 pt-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-full bg-[#E8420A] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-[#C73A08]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
