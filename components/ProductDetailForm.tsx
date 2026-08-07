
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/products';

const CART_KEY = 'hakotha_cart';

type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

export default function ProductDetailForm({ product }: { product: Product }) {
  const [styleOption, setStyleOption] = useState<string>(product.colors[0]);
  const singleColorOptions =
    product.singleColorOptions ??
    product.singlecoloroptions ??
    ['White', 'Yellow', 'Grey', 'Blue'];
  const [color, setColor] = useState<string>(singleColorOptions[0] ?? 'White');
  const [size, setSize] = useState<string>(product.sizes[0].label);
  const [quantity, setQuantity] = useState<string>('1');
  const [message, setMessage] = useState<string>('');

  const normalize = (v?: string) => (v ?? '').toString().trim().toLowerCase();

  useEffect(() => {
    if (normalize(styleOption) === 'single color') {
      const hasCurrent = singleColorOptions.some((opt) => normalize(opt) === normalize(color));
      if (!hasCurrent) {
        setColor(singleColorOptions[0] ?? 'White');
      }
    } else {
      setColor('Multicolor');
    }
  }, [styleOption, singleColorOptions, color]);

  const selectedSizeOption = product.sizes.find((option) => normalize(option.label) === normalize(size));
  const styleAdjustment = normalize(styleOption) === 'hand painted multicolor' ? 50000 : 0;
  const basePrice = selectedSizeOption?.price ?? product.price ?? 0;
  const currentPrice = basePrice + styleAdjustment;
  const quantityNumber = Number(quantity);

  const addToCart = () => {
    if (quantityNumber < 1 || Number.isNaN(quantityNumber)) {
      setMessage('Quantity minimal 1.');
      return;
    }

    try {
      const item: CartItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: currentPrice,
        color,
        size,
        quantity: quantityNumber,
      };

      const stored = typeof window !== 'undefined' ? localStorage.getItem(CART_KEY) : null;
      const parsed: CartItem[] = stored ? JSON.parse(stored) : [];
      const existingIndex = parsed.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingIndex !== -1) {
        parsed[existingIndex].quantity += item.quantity;
      } else {
        parsed.push(item);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(parsed));
      setMessage('Berhasil ditambahkan ke keranjang. Lihat keranjang untuk checkout.');
    } catch (error) {
      setMessage('Gagal menambahkan ke keranjang. Coba lagi.');
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-onyx-500 bg-onyx-700 p-6 sm:p-8">
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Pilihan style</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.colors.map((option) => {
              const selected = normalize(option) === normalize(styleOption);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStyleOption(option)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? 'border-cyan-500 bg-cyan-500 text-onyx-900'
                      : 'border-onyx-500 bg-onyx-600 text-white hover:border-cyan-500 hover:bg-onyx-500'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {styleOption === 'Single Color' ? (
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Pilih warna</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {singleColorOptions.map((option) => {
                const selected = normalize(option) === normalize(color);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setColor(option)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      selected
                        ? 'border-cyan-500 bg-cyan-500 text-onyx-900'
                        : 'border-onyx-500 bg-onyx-600 text-white hover:border-cyan-500 hover:bg-onyx-500'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Pilih color</p>
            <div className="rounded-2xl border border-onyx-500 bg-onyx-600 px-4 py-3 text-sm text-white">Multicolor</div>
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Pilih size</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.sizes.map((option) => {
              const label = option.label;
              const selected = normalize(label) === normalize(size);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSize(label)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? 'border-cyan-500 bg-cyan-500 text-onyx-900'
                      : 'border-onyx-500 bg-onyx-600 text-white hover:border-cyan-500 hover:bg-onyx-500'
                  }`}
                >
                  {label} (Rp{option.price.toLocaleString('id-ID')})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="w-full rounded-2xl border border-onyx-500 bg-onyx-600 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            type="button"
            onClick={addToCart}
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            className="w-full rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-onyx-700 transition hover:bg-cyan-400 sm:w-auto"
          >
            Tambah ke keranjang
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-onyx-500 bg-onyx-600 p-4 text-sm text-onyx-300">
        Harga per pcs: Rp{currentPrice.toLocaleString('id-ID')}
      </div>

      {message ? <p className="rounded-3xl border border-onyx-500 bg-onyx-600 p-4 text-sm text-cyan-200">{message}</p> : null}
    </div>
  );
}
