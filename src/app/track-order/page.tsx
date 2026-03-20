"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const STEPS = [
  { label: "Order Placed" },
  { label: "Being Prepared" },
  { label: "Out for Delivery" },
  { label: "Delivered" },
] as const;

function formatMMSS(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";

  const [currentStep, setCurrentStep] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(20 * 60);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setCountdownSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    // Fake progression for UI realism.
    const start = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextStep = Math.min(3, Math.floor(elapsed / 6000));
      setCurrentStep(nextStep);
      if (nextStep === 3) window.clearInterval(interval);
    }, 500);
    return () => window.clearInterval(interval);
  }, []);

  const progressPercent = useMemo(() => {
    return (currentStep / 3) * 100;
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-cheez-bg text-cheez-ink">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-cheez-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-wide text-cheez-red hover:underline"
          >
            ← Back
          </Link>
          <span className="text-sm font-semibold text-cheez-ink">
            Track Order
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-black tracking-tight text-cheez-ink">
          Live Order Tracking
        </h1>
        <p className="mt-1 text-sm text-cheez-ink/70">
          Real-time feel (demo). Your cheez is moving.
        </p>

        {/* Progress Bar */}
        <div className="mt-6 rounded-3xl border border-white/60 bg-white/40 p-5 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cheez-ink/60">
                Estimated time
              </p>
              <p className="mt-1 text-3xl font-black tracking-tight text-cheez-red">
                {formatMMSS(countdownSeconds)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cheez-ink/60">
                Order ID
              </p>
              <p className="mt-1 font-mono text-sm font-bold text-cheez-ink">
                {orderId || "—"}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full rounded-full bg-cheez-ink/10">
              <div
                className="h-2 rounded-full bg-cheez-red transition-[width] duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <ol className="mt-6 grid grid-cols-4 gap-2">
              {STEPS.map((step, idx) => {
                const done = idx < currentStep;
                const active = idx === currentStep;
                return (
                  <li key={step.label} className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                        done
                          ? "border-cheez-red bg-cheez-red text-cheez-white"
                          : active
                          ? "border-cheez-yellow bg-cheez-yellow text-cheez-ink"
                          : "border-white/60 bg-white/30 text-cheez-ink/50"
                      }`}
                    >
                      {active ? (
                        <span className="cheez-pulse-dot block h-3 w-3 rounded-full bg-cheez-red" />
                      ) : (
                        <span
                          className={`block h-3 w-3 rounded-full ${
                            done ? "bg-cheez-white" : "bg-cheez-ink/30"
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`mt-2 text-[11px] font-semibold text-center ${
                        done || active ? "text-cheez-ink" : "text-cheez-ink/50"
                      }`}
                    >
                      {step.label}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-6 rounded-2xl border border-white/50 bg-cheez-card/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cheez-ink/60">
              Status
            </p>
            <p className="mt-2 text-base font-black text-cheez-ink">
              {STEPS[currentStep]?.label}
            </p>
            <p className="mt-1 text-sm text-cheez-ink/70">
              {currentStep === 0 && "Kitchen has received your order."}
              {currentStep === 1 && "Preparing fresh cheez & toppings."}
              {currentStep === 2 && "Rider is on the way—stay ready."}
              {currentStep === 3 && "Delivered. Enjoy your cheezious moment."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex-1 rounded-full bg-cheez-red py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cheez-white shadow-md transition-colors hover:bg-[#d52f3b]"
          >
            Reorder
          </Link>
          <Link
            href="/checkout"
            className="flex-1 rounded-full border border-cheez-red/30 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cheez-red transition-colors hover:border-cheez-red hover:bg-cheez-red/5"
          >
            New Order
          </Link>
        </div>
      </main>
    </div>
  );
}

