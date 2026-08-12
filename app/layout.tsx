import type { Metadata } from "next";
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Geist, Geist_Mono } from "next/font/google";
import CartIcon from '@/components/CartIcon';
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
  title: "Hakotha3d",
  description: "Hakotha3d storefront and product experience",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-onyx-600 text-white">
        <div className="sticky top-0 z-50 bg-onyx-700/95 backdrop-blur-xl shadow-xl">
          <div className="max-w-7xl mx-auto w-full px-4 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo size={36} />
              <span className="text-sm font-semibold text-white">Hakotha</span>
            </Link>
            <CartIcon />
          </div>
        </div>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
