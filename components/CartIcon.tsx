'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CART_KEY = 'hakotha_cart';

export default function CartIcon() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      if (typeof window === 'undefined') return;
      const stored = window.localStorage.getItem(CART_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setCount(Array.isArray(parsed) ? parsed.reduce((sum: number, item: { quantity: number }) => sum + (item.quantity || 0), 0) : 0);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-3xl border border-onyx-500 bg-onyx-700 px-4 py-3 text-sm font-bold text-white transition hover:border-cyan-500 hover:bg-onyx-600 whitespace-nowrap"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-2 flex-shrink-0">
        <path
          d="M6 6h15l-1.5 9h-12L4 3H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="21" r="1" fill="currentColor" />
        <circle cx="19" cy="21" r="1" fill="currentColor" />
      </svg>
      Keranjang
      {count > 0 ? (
        <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-flame-500 px-1.5 text-[0.65rem] font-bold text-black">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
