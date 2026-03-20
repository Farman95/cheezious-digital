"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, MenuItemData } from "@/lib/cart-types";

interface CartContextValue {
  cart: CartItem[];
  itemCount: number;
  totalPrice: number;
  isSidebarOpen: boolean;
  addItem: (item: MenuItemData, quantity?: number, size?: "small" | "regular" | "large", instructions?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addItem = useCallback((item: MenuItemData, quantity = 1, size?: "small" | "regular" | "large", instructions?: string) => {
    setCart((prev) => {
      // Create a unique key for this item with customization
      const customizationKey = `${item.id}-${size || "regular"}-${instructions || ""}`;
      
      // For items with customization, always add as new line item
      if (size || instructions) {
        const sizeMultiplier = size === "small" ? 0.85 : size === "large" ? 1.2 : 1;
        const adjustedPrice = item.priceNumber * sizeMultiplier;
        
        return [
          ...prev,
          {
            id: customizationKey,
            name: item.name,
            priceDisplay: `Rs. ${adjustedPrice.toLocaleString("en-PK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
            priceNumber: adjustedPrice,
            quantity,
            size: size || "regular",
            instructions,
          },
        ];
      }

      // Default behavior for items without customization (when called directly)
      const existing = prev.find((i) => i.id === item.id && !i.size && !i.instructions);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && !i.size && !i.instructions
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          priceDisplay: item.priceDisplay,
          priceNumber: item.priceNumber,
          quantity,
        },
      ];
    });

    // Global "added to cart" toast
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cheezious:toast", {
          detail: { message: `+${quantity} added!` },
        })
      );
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) => {
      const next = prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((o) => !o),
    []
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );
  const totalPrice = useMemo(
    () => cart.reduce((sum, i) => sum + i.priceNumber * i.quantity, 0),
    [cart]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount,
      totalPrice,
      isSidebarOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [
      cart,
      itemCount,
      totalPrice,
      isSidebarOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
