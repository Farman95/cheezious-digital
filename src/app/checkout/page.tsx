"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { branches } from "@/data/branches";
import { useCallback, useMemo, useState } from "react";

function formatPrice(n: number) {
  return "Rs. " + n.toLocaleString("en-PK");
}

function generateOrderId() {
  const prefix = "CHZ";
  const segment = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${segment()}-${segment()}`;
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, totalPrice, clearCart } = useCart();
  const [branchQuery, setBranchQuery] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "jazzcash" | "easypaisa"
  >("cod");
  const [walletNumber, setWalletNumber] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"now" | "later">("now");
  const [deliveryDate, setDeliveryDate] = useState<"today" | "tomorrow">("today");
  const [deliveryTime, setDeliveryTime] = useState("12:00");

  const selectedBranch = useMemo(
    () => branches.find((b) => b.id === selectedBranchId) ?? null,
    [selectedBranchId]
  );

  const filteredBranches = useMemo(() => {
    const q = branchQuery.trim().toLowerCase();
    if (!q) return branches;
    return branches.filter((b) => {
      const hay = `${b.city} ${b.name}`.toLowerCase();
      return hay.includes(q);
    });
  }, [branchQuery]);

  const groupedByCity = useMemo(() => {
    const map = new Map<string, typeof branches>();
    for (const b of filteredBranches) {
      const arr = map.get(b.city) ?? [];
      arr.push(b);
      map.set(b.city, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredBranches]);

  // Haversine formula to calculate distance between two coordinates
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * 
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const detectNearestBranch = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Location not supported on this browser. Please select manually.");
      return;
    }

    setIsDetectingLocation(true);
    setLocationMessage("📍 Finding your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        let nearestBranch = branches[0];
        let minDistance = Infinity;
        
        // Find the nearest branch using Haversine formula
        for (const branch of branches) {
          const distance = getDistance(userLat, userLng, branch.lat, branch.lng);
          
          if (distance < minDistance) {
            minDistance = distance;
            nearestBranch = branch;
          }
        }
        
        setSelectedBranchId(nearestBranch.id);
        setLocationMessage(`✓ Nearest branch selected: ${nearestBranch.name}`);
        setIsDetectingLocation(false);
      },
      (error) => {
        setIsDetectingLocation(false);
        if (error.code === 1) {
          setLocationMessage("Location access denied. Please select branch manually.");
        } else if (error.code === 2) {
          setLocationMessage("Unable to detect location. Please select branch manually.");
        } else {
          setLocationMessage("Try again or select branch manually.");
        }
      }
    );
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(03[0-9]-?[0-9]{7}|03[0-9]{9})$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value.trim()) {
      setPhoneValid(validatePhone(value));
    } else {
      setPhoneValid(null);
    }
  };

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    if (!selectedBranchId) next.branch = "Please select a branch";
    if (!fullName.trim()) next.fullName = "Full name is required";
    if (!phone.trim()) {
      next.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      next.phone = "Please enter a valid Pakistani number e.g. 0300-1234567";
    }
    if (!address.trim()) next.address = "Delivery address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [selectedBranchId, fullName, phone, address]);

  const handlePlaceOrder = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      if (!selectedBranch) return;
      setIsSubmitting(true);

      const id = generateOrderId();

      setOrderId(id);
      clearCart();
      setShowSuccess(true);
      setIsSubmitting(false);
    },
    [validate, clearCart, selectedBranch]
  );

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-[#FFFBE0] px-4 pt-24 pb-12">
        <div className="mx-auto max-w-lg rounded-3xl border border-white/50 bg-white p-8 text-center shadow-xl">
          <h1 className="text-xl font-bold text-[#1A1A1A]">Your cart is empty</h1>
          <p className="mt-2 text-sm text-[#1A1A1A]/70">
            Add some cheezy items before checking out.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#E8420A] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#C73A08]"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  if (showSuccess && orderId) {
    const paymentLabel =
      paymentMethod === "cod"
        ? "Cash on Delivery"
        : paymentMethod === "jazzcash"
        ? "JazzCash"
        : "Easypaisa";

    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFBE0] px-4">
        <div className="success-panel flex max-w-md flex-col items-center text-center">
          <div className="success-checkmark mb-6">
            <svg
              className="h-24 w-24 text-[#E8420A]"
              viewBox="0 0 52 52"
              aria-hidden
            >
              <circle
                className="success-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="success-check"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#1A1A1A] sm:text-3xl">
            Order placed!
          </h1>
          <p className="mt-2 text-[#1A1A1A]/70">
            Thank you for ordering. We&apos;re getting your cheezy goodness ready.
          </p>
          <div className="mt-6 rounded-2xl border-2 border-dashed border-[#E8420A]/40 bg-[#E8420A]/5 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8420A]">
              Order ID
            </p>
            <p className="mt-1 font-mono text-xl font-bold tracking-wide text-[#1A1A1A]">
              {orderId}
            </p>
            <p className="mt-1 text-xs text-[#1A1A1A]/60">
              Save this ID to track your order.
            </p>
          </div>
          <div className="mt-3 rounded-2xl border border-white/50 bg-white/70 px-6 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/60">
              Payment
            </p>
            <p className="mt-1 text-sm font-black text-[#1A1A1A]">{paymentLabel}</p>
          </div>
          <Link
            href={`/track-order?orderId=${encodeURIComponent(orderId)}`}
            className="mt-4 rounded-full bg-[#E8420A] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-colors hover:bg-[#C73A08]"
          >
            Track Order
          </Link>
          <Link
            href="/"
            className="mt-8 rounded-full bg-[#E8420A] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-colors hover:bg-[#C73A08]"
          >
            Back to Home
          </Link>

          <div className="mt-6 text-center">
            <a
              href={`https://wa.me/923001000001?text=${encodeURIComponent(`Hi Cheezious! I just placed Order #${orderId}. Please confirm my order. Thank you!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Confirm on WhatsApp →
            </a>
            <p className="mt-2 text-xs text-[#1A1A1A]/50">
              Optional — for faster confirmation
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBE0] flex">
      {/* Main Content */}
      <div className="flex-1">
        <header className="sticky top-0 z-30 border-b border-white/40 bg-[#FFFBE0]/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-wide text-[#E8420A] hover:underline"
            >
              ← Back
            </Link>
            <span className="text-sm font-semibold text-[#1A1A1A]">Checkout</span>
            <button
              type="button"
              onClick={() => setShowOrderSummary(!showOrderSummary)}
              className="md:hidden rounded-full border border-[#E8420A]/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#E8420A]"
            >
              {showOrderSummary ? 'Hide' : 'Show'} Summary
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-8">
          {/* Login Requirement */}
          {status === "loading" ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          ) : !session ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#E8420A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#E8420A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">Login Required</h2>
                <p className="text-sm text-[#1A1A1A]/70 mb-6">
                  Please login to place your order. It only takes a moment!
                </p>
              </div>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="inline-flex items-center gap-3 rounded-full bg-[#E8420A] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md hover:bg-[#C73A08] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Login with Google
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
                Delivery details
              </h1>
              <p className="mt-1 text-sm text-[#1A1A1A]/70">
                We&apos;ll use this to deliver your order.
              </p>

              <form onSubmit={handlePlaceOrder} className="mt-8 space-y-6">
          <div className="rounded-2xl border border-white/50 bg-white/80 p-4">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8420A]">
                  Select Your Nearest Branch
                </p>
                <p className="mt-1 text-sm text-[#1A1A1A]/70">
                  Search by city or branch name to route your order to the right
                  kitchen.
                </p>
              </div>
              {selectedBranch && (
                <span className="inline-flex rounded-full bg-[#E8420A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8420A]">
                  {selectedBranch.city}
                </span>
              )}
            </div>

            {/* Detect Nearest Branch Button */}
            <button
              type="button"
              onClick={detectNearestBranch}
              disabled={isDetectingLocation}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#E8420A] bg-transparent px-4 py-3 text-sm font-semibold text-[#E8420A] transition-colors hover:bg-[#E8420A] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDetectingLocation ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E8420A] border-t-transparent"></div>
                  📍 Finding your location...
                </>
              ) : (
                <>
                  📍 Detect Nearest Branch
                </>
              )}
            </button>

            {locationMessage && (
              <div className={`mt-2 rounded-lg px-3 py-2 text-xs font-medium ${
                locationMessage.startsWith("✓") 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {locationMessage}
              </div>
            )}

            {/* Divider */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-xs font-medium text-[#1A1A1A]/60">or select manually</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="branchSearch"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]/70"
                >
                  Search
                </label>
                <input
                  id="branchSearch"
                  type="text"
                  value={branchQuery}
                  onChange={(e) => setBranchQuery(e.target.value)}
                  placeholder="e.g. Lahore, F-11, Johar Town…"
                  className="mt-1.5 w-full rounded-xl border border-white/60 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]/70"
                >
                  Branch
                </label>
                <select
                  id="branch"
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/60 bg-white px-4 py-3 text-[#1A1A1A] focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
                >
                  <option value="">Select a branch…</option>
                  {groupedByCity.map(([city, list]) => (
                    <optgroup key={city} label={city}>
                      {list.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {errors.branch && (
              <p className="mt-2 text-xs text-[#E8420A]">{errors.branch}</p>
            )}
          </div>

          {/* Delivery Time Section */}
          <div className="rounded-2xl border border-white/50 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/70">
              Delivery Time
            </p>
            <div className="mt-3 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={deliveryMode === "now"}
                  onChange={() => setDeliveryMode("now")}
                  className="w-4 h-4 text-[#E8420A]"
                />
                <span className="text-sm font-medium text-[#1A1A1A]">Deliver Now (ASAP)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={deliveryMode === "later"}
                  onChange={() => setDeliveryMode("later")}
                  className="w-4 h-4 text-[#E8420A]"
                />
                <span className="text-sm font-medium text-[#1A1A1A]">Schedule for Later</span>
              </label>
            </div>

            {deliveryMode === "later" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1A1A1A]/70">
                    Date
                  </label>
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value as "today" | "tomorrow")}
                    className="mt-1.5 w-full rounded-xl border border-white/60 bg-white px-4 py-2 text-sm text-[#1A1A1A] focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
                  >
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1A1A1A]/70">
                    Time
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/60 bg-white px-4 py-2 text-sm text-[#1A1A1A] focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = 12 + i;
                      const ampm = hour >= 12 ? "PM" : "AM";
                      const displayHour = hour > 12 ? hour - 12 : hour;
                      const timeStr = `${displayHour.toString().padStart(2, "0")}:00 ${ampm}`;
                      return (
                        <option key={i} value={timeStr}>
                          {timeStr}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#1A1A1A]"
            >
              Your Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Imran Ijaz"
              className="mt-1.5 w-full rounded-xl border border-white/60 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-[#E8420A]">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#1A1A1A]"
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="e.g. 0300-1234567"
                className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:ring-2 transition-colors ${
                  phoneValid === true
                    ? "border-green-500 bg-green-50 focus:border-green-600 focus:ring-green-500/20"
                    : phoneValid === false
                    ? "border-red-500 bg-red-50 focus:border-red-600 focus:ring-red-500/20"
                    : "border-white/60 bg-white focus:border-[#E8420A] focus:ring-[#E8420A]/20"
                }`}
                autoComplete="tel"
              />
              {phoneValid === true && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-[#E8420A]">{errors.phone}</p>
            )}
            {phoneValid === false && !errors.phone && (
              <p className="mt-1 text-xs text-[#E8420A]">
                Please enter a valid Pakistani number e.g. 0300-1234567
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-[#1A1A1A]"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, area, city, and landmark"
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/60 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
              autoComplete="street-address"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-[#E8420A]">{errors.address}</p>
            )}
          </div>

          {/* PAYMENT OPTIONS */}
          <div className="rounded-2xl border border-white/50 bg-white/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/70">
                Payment Method
              </p>
              <span className="rounded-full bg-[#E8420A]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#E8420A]">
                (Demo)
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  paymentMethod === "cod"
                    ? "border-[#F5C500] bg-white/10"
                    : "border-white/60 bg-white/30 hover:bg-white/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F5C500]/5">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#1A1A1A]/70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7h18v12H3z" />
                      <path d="M16 10h5v6h-5z" />
                      <circle cx="18" cy="13" r="1" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">COD</p>
                    <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/60">
                      Cash on Delivery
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("jazzcash")}
                className={`flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  paymentMethod === "jazzcash"
                    ? "border-[#8B1FBE] bg-white/10"
                    : "border-white/60 bg-white/30 hover:bg-white/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#8B1FBE]">
                    <span className="text-sm font-black text-white">JC</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">JazzCash</p>
                    <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/60">
                      Pay with wallet
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("easypaisa")}
                className={`flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  paymentMethod === "easypaisa"
                    ? "border-[#009B3A] bg-white/10"
                    : "border-white/60 bg-white/30 hover:bg-white/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#009B3A]">
                    <span className="text-sm font-black text-white">EP</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">Easypaisa</p>
                    <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/60">
                      Pay with wallet
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {(paymentMethod === "jazzcash" ||
              paymentMethod === "easypaisa") && (
              <div className="mt-4">
                <label
                  htmlFor="walletNumber"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]/60"
                >
                  Wallet Number (Demo)
                </label>
                <input
                  id="walletNumber"
                  type="tel"
                  value={walletNumber}
                  onChange={(e) => setWalletNumber(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="mt-1.5 w-full rounded-xl border border-white/60 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8420A] focus:outline-none focus:ring-2 focus:ring-[#E8420A]/20"
                  autoComplete="tel"
                />
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% Secure Checkout — SSL Encrypted</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/70">
              Order summary
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[#1A1A1A]">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.priceNumber * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-white/40 pt-3 text-lg font-bold text-[#1A1A1A]">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#E8420A] py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-colors hover:bg-[#C73A08] disabled:opacity-70"
          >
            {isSubmitting ? "Placing order…" : "Place Order"}
          </button>
        </form>
            </>
          )}
        </main>
      </div>

      {/* Order Summary Sidebar - Desktop Sticky */}
      <aside className="hidden md:block w-80 border-l border-white/40 bg-[#FFFBE0]/95 backdrop-blur-xl">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Order Summary</h2>
            
            <div className="mt-6 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A1A1A]">{item.name}</p>
                    <p className="text-xs text-[#1A1A1A]/60">× {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">
                    {formatPrice(item.priceNumber * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-white/40 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#1A1A1A]/70">Subtotal</span>
                <span className="font-medium text-[#1A1A1A]">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#1A1A1A]/70">Delivery Fee</span>
                <span className="font-medium text-[#1A1A1A]">Rs. 99</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#1A1A1A] border-t border-white/40 pt-2">
                <span>Total</span>
                <span>{formatPrice(totalPrice + 99)}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-[#1A1A1A]/50">Estimated delivery: 30-40 mins</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Order Summary - Collapsible */}
      {showOrderSummary && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#FFFBE0]/95 backdrop-blur-xl">
          <div className="flex h-full">
            <div className="flex-1" onClick={() => setShowOrderSummary(false)}></div>
            <div className="w-80 bg-white border-l border-white/40">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#1A1A1A]">Order Summary</h2>
                  <button
                    type="button"
                    onClick={() => setShowOrderSummary(false)}
                    className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1A1A1A]">{item.name}</p>
                        <p className="text-xs text-[#1A1A1A]/60">× {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-[#1A1A1A]">
                        {formatPrice(item.priceNumber * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-white/40 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1A1A1A]/70">Subtotal</span>
                    <span className="font-medium text-[#1A1A1A]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1A1A1A]/70">Delivery Fee</span>
                    <span className="font-medium text-[#1A1A1A]">Rs. 99</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#1A1A1A] border-t border-white/40 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice + 99)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
