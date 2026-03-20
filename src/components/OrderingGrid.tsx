"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/data/menu-items";
import { OrderCustomizationModal } from "./OrderCustomizationModal";


export function OrderingGrid() {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Group items by category in order
  const categoriesInOrder = Array.from(new Set(menuItems.map(item => item.category)));
  
  const itemsByCategory = categoriesInOrder.reduce((acc, category) => {
    acc[category] = menuItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const getCategoryFallbackImage = (category: string) => {
    const fallbackImages: Record<string, string> = {
      "Special Pizza": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      "Somewhat Local": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
      "Somewhat Sooper": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
      "Cheezy Treats": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
      "Pizza Deals": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "Sandwiches & Platters": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400",
      "Pastas": "https://images.unsplash.com/photo-1563243577-4e0556c4ca73?w=400",
      "Burgerz": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      "Side Orders": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
      "Addons": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
      "Soft Drinks": "https://images.unsplash.com/photo-1554866585-acbb2d39a6c2?w=400",
      "Starters": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
    };
    return fallbackImages[category] || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400";
  };

const getOriginalPriceDisplay = (priceNumber: number, itemId: string) => {
    const wasPrices: Record<string, string> = {
      "cheezy-sticks": "Rs. 699",
      "oven-baked-wings": "Rs. 680",
      "flaming-wings": "Rs. 750",
      "calzone-chunks": "Rs. 1199",
      "arabic-rolls": "Rs. 750",
      "behari-rolls": "Rs. 750",
      "crown-crust": "Rs. 1599",
      "stuff-crust-pizza": "Rs. 1649",
      "beef-pepperoni-thin-crust": "Rs. 1599",
      "malai-tikka": "Rs. 1649",
      "chicken-tikka": "Rs. 750",
      "chicken-fajita": "Rs. 750",
      "chicken-lover": "Rs. 750",
      "chicken-tandoori": "Rs. 750",
      "hot-n-spicy": "Rs. 750",
      "vegetable-pizza": "Rs. 750",
      "euro": "Rs. 750",
      "chicken-supreme": "Rs. 750",
      "black-pepper-tikka": "Rs. 750",
      "sausage-pizza": "Rs. 750",
      "cheese-lover-pizza": "Rs. 750",
      "chicken-pepperoni": "Rs. 750",
      "chicken-mushroom": "Rs. 750",
      "cheezious-special": "Rs. 1599",
      "behari-kabab": "Rs. 1599",
      "chicken-extreme": "Rs. 1599",
      "small-pizza-deal": "Rs. 899",
      "regular-pizza-deal": "Rs. 1599",
      "large-pizza-deal": "Rs. 2099",
      "special-roasted-platter": "Rs. 1299",
      "mexican-sandwich": "Rs. 999",
      "pizza-stacker": "Rs. 999",
      "euro-sandwich": "Rs. 999",
      "classic-roll-platter": "Rs. 1299",
      "fettuccine-alfredo": "Rs. 1099",
      "crunchy-chicken-pasta": "Rs. 1099",
      "reggy-burger": "Rs. 499",
      "bazinga-burger": "Rs. 650",
      "fries": "Rs. 299",
      "nuggets": "Rs. 499",
      "chicken-piece": "Rs. 399",
      "juice": "Rs. 99",
      "mayo-dip": "Rs. 120",
      "water-small": "Rs. 99",
      "soft-drink": "Rs. 130"
    };
    return wasPrices[itemId] || `Rs. ${Math.round(priceNumber * 1.25 / 10) * 10}`;
  };

  const handleAddClick = (item: typeof menuItems[0]) => {
    setSelectedItem(item);
  };

  const handleConfirm = (quantity: number, size: "small" | "regular" | "large", instructions: string) => {
    if (selectedItem) {
      addItem(selectedItem, quantity, size, instructions);
      setSelectedItem(null);
    }
  };

  return (
    <section className="w-full pb-16 pt-6 md:pt-8">
      {isLoading ? (
        // Loading skeleton
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={`skeleton-category-${idx}`} className="mb-12">
              <div className="mb-4 h-6 w-32 animate-pulse rounded-lg bg-gray-200"></div>
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 4 }).map((_, cardIdx) => (
                  <div key={`skeleton-card-${cardIdx}`} className="flex-shrink-0 w-[200px] animate-pulse">
                    <div className="rounded-[12px] bg-gray-200 h-[140px] mb-3"></div>
                    <div className="h-4 w-20 rounded bg-gray-200 mb-2"></div>
                    <div className="h-3 w-full rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {categoriesInOrder.map((category) => (
            <div key={category} className="mb-10">
              {/* Category Title */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
                  {category}
                </h2>
              </div>

              {/* Horizontal Scrollable Items */}
              <div 
                className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
                style={{ 
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#E8420A #F5F5F5'
                }}
              >
                {itemsByCategory[category].map((item) => (
                  <article
                    key={item.id}
                    className="group relative flex flex-shrink-0 w-[200px] flex-col rounded-[12px] border border-[#F0E68C] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(232,66,10,0.15)] snap-start"
                  >
                    {item.mostLoved && (
                      <div className="absolute right-2 top-2 z-10 rounded-full bg-[#F5C500] px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-[#1A1A1A] shadow-sm">
                        Most Loved
                      </div>
                    )}

                    {/* Food Image */}
                    <div className="relative h-[120px] overflow-hidden rounded-t-[12px]">
                      <Image
                        src={item.image || getCategoryFallbackImage(item.category)}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAICAgIChQDDwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoGSj/2wBDAQcHBwoIChMICChMGhYaGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCgoGCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1 p-3">
                      <h3 className="text-xs font-black text-[#1A1A1A] line-clamp-2 leading-tight">{item.name}</h3>
                      {item.description && (
                        <p className="text-xs text-[#1A1A1A]/60 line-clamp-1">{item.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between gap-2 p-3 pt-0">
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] font-semibold text-[#1A1A1A]/45 line-through">
                          {getOriginalPriceDisplay(item.priceNumber, item.id)}
                        </span>
                        <span className="text-sm font-black text-[#E8420A]">
                          {item.priceDisplay}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddClick(item)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E8420A] text-white shadow-md transition-transform hover:scale-[1.05] hover:bg-[#C73A08] focus:outline-none focus:ring-2 focus:ring-[#E8420A] focus:ring-offset-2"
                        aria-label={`Customize and add ${item.name} to cart`}
                      >
                        <span className="text-sm font-black">+</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Customization Modal */}
      {selectedItem && (
        <OrderCustomizationModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
}
