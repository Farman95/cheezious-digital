import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastHost } from "@/components/ToastHost";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Cheezious — Pakistan Ka Favorite Cheez",
  description: "Order irresistible cheesy pizzas, burgers, and platters from Cheezious. Pure cheez, pure obsession. 37+ branches across Pakistan.",
  keywords: ["Cheezious", "pizza", "burgers", "Pakistan", "fast food", "Rawalpindi", "Islamabad", "Lahore"],
  openGraph: {
    title: "Cheezious — Pakistan Ka Favorite Cheez",
    description: "Order hot, cheesy food delivered to your door. 37+ branches across Pakistan.",
    type: "website",
    locale: "en_PK",
    siteName: "Cheezious",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheezious — Pakistan Ka Favorite Cheez",
    description: "Order hot, cheesy food delivered to your door.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <Providers>
            {children}
            <ToastHost />
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
