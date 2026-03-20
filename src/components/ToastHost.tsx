"use client";

import { useEffect, useState } from "react";

type Toast = { id: string; message: string };

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ message?: string }>;
      const message = ce.detail?.message ?? "";
      if (!message) return;

      const id = makeId();
      setToasts((prev) => [...prev, { id, message }]);

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2200);
    };

    window.addEventListener("cheezious:toast", handler as EventListener);
    return () => {
      window.removeEventListener("cheezious:toast", handler as EventListener);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-20 left-0 right-0 z-[60] flex justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="cheez-toast animate-[cheez-toast-pop_260ms_ease-out] rounded-2xl border border-white/60 bg-[#E53935] px-4 py-3 text-sm font-black text-white shadow-[0_18px_60px_rgba(229,57,53,0.35)]"
            role="status"
            aria-live="polite"
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

