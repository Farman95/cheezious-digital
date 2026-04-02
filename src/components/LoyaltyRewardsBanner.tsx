"use client";

import { useState, useEffect } from "react";

interface LoyaltyRewardsBannerProps {
  topOffset?: string;
}

const BANNER_HEIGHT = "52px"; // py-3 + text-sm

export function LoyaltyRewardsBanner({ topOffset = "0px" }: LoyaltyRewardsBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if banner was dismissed this session
    if (typeof window !== 'undefined') {
      const isDismissed = sessionStorage.getItem("cheezious-rewards-dismissed");
      if (!isDismissed) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("cheezious-rewards-dismissed", "true");
    }
  };

  // Reserve layout space to prevent CLS, even before mounting completes
  if (!isMounted) {
    return (
      <div
        className="sticky z-30 bg-[#F5C500] shadow-md will-change-transform"
        style={{
          top: topOffset,
          height: BANNER_HEIGHT,
          visibility: "hidden",
        }}
        role="status"
        aria-label="Loading loyalty rewards banner"
      />
    );
  }

  if (!isVisible) return null;

  return (
    <div
      className="sticky z-30 bg-[#F5C500] shadow-md animate-slideDown will-change-transform"
      style={{ top: topOffset }}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 md:px-6">
        <div className="flex-1">
          <p className="text-sm font-bold text-[#1A1A1A]">
            🏆 Cheezious Rewards — Earn 1 point per Rs. 1 spent. 500 points = Free Garlic Bread!
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss loyalty rewards banner"
          className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#E8420A]/20 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/40 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
