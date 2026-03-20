"use client";

import { useState, useEffect } from "react";

export function LoyaltyRewardsBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed this session
    const isDismissed = sessionStorage.getItem("cheezious-rewards-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("cheezious-rewards-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-40 bg-[#F5C500] shadow-md">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 md:px-6">
        <div>
          <p className="text-sm font-bold text-[#1A1A1A]">
            🏆 Cheezious Rewards — Earn 1 point per Rs. 1 spent. 500 points = Free Garlic Bread!
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#E8420A]/20 text-[#1A1A1A]"
          aria-label="Dismiss rewards banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
