"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const STEPS = [
  { label: "Order Received" },
  { label: "Confirmed" },
  { label: "Being Prepared" },
  { label: "Quality Check" },
  { label: "Out for Delivery" },
  { label: "Delivered" },
] as const;

function formatMMSS(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";

  const [currentStep, setCurrentStep] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(30 * 60); // 30 minutes

  useEffect(() => {
    const tick = window.setInterval(() => {
      setCountdownSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(5, prev + 1));
  };

  const progressPercent = useMemo(() => {
    return (currentStep / 5) * 100;
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
                Estimated delivery
              </p>
              <p className="mt-1 text-3xl font-black tracking-tight text-cheez-red">
                25-35 min
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

            <ol className="mt-6 grid grid-cols-6 gap-1 md:gap-2">
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
                        <span className="animate-pulse block h-3 w-3 rounded-full bg-cheez-red" />
                      ) : (
                        <span
                          className={`block h-3 w-3 rounded-full ${
                            done ? "bg-cheez-white" : "bg-cheez-ink/30"
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`mt-2 text-[10px] font-semibold text-center leading-tight ${
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
              {currentStep === 1 && "Order confirmed. Preparing your order."}
              {currentStep === 2 && "Preparing fresh cheez & toppings."}
              {currentStep === 3 && "Quality check in progress."}
              {currentStep === 4 && "Rider is on the way—stay ready."}
              {currentStep === 5 && "Delivered. Enjoy your cheezious moment."}
            </p>
          </div>
        </div>

        {/* Live Map Placeholder */}
        {currentStep >= 4 && (
          <div className="mt-6 rounded-2xl border border-white/50 bg-yellow-50/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cheez-ink/60 mb-3">
              Live Location
            </p>
            <div className="relative h-48 w-full rounded-lg bg-yellow-100 border border-yellow-300 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="animate-pulse absolute w-8 h-8 bg-cheez-red rounded-full opacity-75"></div>
                  <div className="w-8 h-8 bg-cheez-red rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="absolute bottom-3 text-xs font-semibold text-yellow-700">Rider on the way</p>
            </div>
          </div>
        )}

        {/* Rider Details */}
        {currentStep >= 4 && (
          <div className="mt-6 rounded-2xl border border-white/50 bg-cheez-card/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cheez-ink/60">
              Your Rider
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black text-cheez-ink">Muhammad Ali</p>
                  <p className="text-xs font-semibold text-cheez-ink/70">⭐ 4.8 rating</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-cheez-ink/70">Status</p>
                <p className="text-sm font-bold text-cheez-red">On the way</p>
              </div>
            </div>
          </div>
        )}

        {/* Demo Button */}
        <div className="mt-6">
          <button
            onClick={handleNextStep}
            disabled={currentStep === 5}
            className="w-full rounded-full bg-cheez-ink/10 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-cheez-ink transition-colors hover:bg-cheez-ink/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Simulate Next Step →
          </button>
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

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}

