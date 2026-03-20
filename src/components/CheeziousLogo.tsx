import React from "react";

export function CheeziousLogo({
  className,
  textClassName,
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${className ?? ""}`}
      aria-label="Cheezious logo"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        {/* Yellow rounded square background */}
        <rect x="0" y="0" width="40" height="40" rx="10" fill="#F5C500" />
        
        {/* Pizza slice - triangle with curved crust and toppings */}
        <g transform="translate(8, 12)">
          <path
            d="M5 20 Q5 15, 10 12 L15 10 Q18 9, 20 12 L20 20 Q20 22, 18 23 L10 23 Q7 23, 5 20"
            fill="none"
            stroke="#2C1810"
            strokeWidth="1.5"
          />
          {/* Pizza toppings */}
          <circle cx="12" cy="16" r="1.2" fill="#2C1810" />
          <circle cx="16" cy="18" r="1" fill="#2C1810" />
        </g>
        
        {/* Burger - simple stacked shape */}
        <g transform="translate(22, 14)">
          {/* Top bun */}
          <ellipse cx="6" cy="3" rx="5" ry="2.5" fill="none" stroke="#2C1810" strokeWidth="1.5" />
          {/* Patty */}
          <rect x="1" y="5" width="10" height="2" rx="1" fill="none" stroke="#2C1810" strokeWidth="1.5" />
          {/* Bottom bun */}
          <ellipse cx="6" cy="9" rx="5" ry="2" fill="none" stroke="#2C1810" strokeWidth="1.5" />
        </g>
      </svg>

      <div className="leading-tight">
        <div
          className={`text-[22px] font-black tracking-[0.02em] ${
            textClassName ?? "text-[#1A1A1A]"
          }`}
        >
          CHEEZIOUS
        </div>
        <div className="text-[12px] text-[#666666] font-medium">
          Pure Cheez, Pure Obsession
        </div>
      </div>
    </div>
  );
}

