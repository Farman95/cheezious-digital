import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastHost } from "@/components/ToastHost";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cheezious - Pure Cheez, Pure Obsession",
  description:
    "Order irresistible cheesy pizzas, burgers, and platters from Cheezious. Pure cheez, pure obsession.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cheez-bg text-cheez-ink`}
      >
        <CartProvider>
          {children}
          <ToastHost />
        </CartProvider>
      </body>
    </html>
  );
}
