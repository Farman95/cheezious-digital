"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

function formatPrice(n: number) {
  return "Rs. " + n.toLocaleString("en-PK");
}

export function CartSidebar() {
  const {
    cart,
    totalPrice,
    isSidebarOpen,
    closeSidebar,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden
        className={`fixed inset-0 z-40 bg-[#1A1A1A]/40 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
      />

      {/* Slide-over panel */}
      <aside
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/40 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0 scale-100" : "translate-x-full scale-[0.985]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/40 px-4 py-4">
          <h2 className="text-lg font-bold tracking-tight text-[#1A1A1A]">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close cart"
            className="rounded-full p-2 text-[#1A1A1A]/70 transition-colors hover:bg-[#FFFBE0] hover:text-[#1A1A1A]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cart.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#1A1A1A]/60">
              Your cart is empty. Add something cheezy!
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 rounded-2xl border border-white/50 bg-[#FFFBE0]/80 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#1A1A1A]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#1A1A1A]/70">
                        {item.priceDisplay} each
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="rounded-full p-1.5 text-[#1A1A1A]/50 transition-colors hover:bg-[#E8420A]/10 hover:text-[#E8420A]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a51.522 51.522 0 0 1-3.558 0c-.536 0-1.045.053-1.559.122-.5.067-.994.156-1.46.257-.465.1-.92.213-1.366.33v.027a48.573 48.573 0 0 0-2.722.25.75.75 0 0 1-.256-1.478 50.016 50.016 0 0 1 2.978-.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#1A1A1A]/80 transition-colors hover:bg-[#E8420A]/10 hover:text-[#E8420A]"
                      >
                        −
                      </button>
                      <span className="min-w-[1.25rem] text-center text-sm font-medium text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#1A1A1A]/80 transition-colors hover:bg-[#E8420A]/10 hover:text-[#E8420A]"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A1A]">
                      {formatPrice(item.priceNumber * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/40 px-4 py-4">
            <div className="flex items-center justify-between text-lg font-bold text-[#1A1A1A]">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeSidebar}
              className="mt-3 flex w-full items-center justify-center rounded-full bg-[#E8420A] py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-[#C73A08]"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
