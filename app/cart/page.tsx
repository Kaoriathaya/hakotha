'use client';

import { useEffect, useMemo, useState } from 'react';

type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

const CART_KEY = 'hakotha_cart';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [message, setMessage] = useState('');

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  };

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(CART_KEY) : null;
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleQuantityChange = (item: CartItem, delta: number) => {
    const nextItems = cartItems
      .map((cartItem) => {
        if (cartItem.productId === item.productId && cartItem.color === item.color && cartItem.size === item.size) {
          return { ...cartItem, quantity: Math.max(cartItem.quantity + delta, 0) };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);

    saveCart(nextItems);
  };

  const handleRemoveItem = (item: CartItem) => {
    saveCart(
      cartItems.filter(
        (cartItem) => !(cartItem.productId === item.productId && cartItem.color === item.color && cartItem.size === item.size)
      )
    );
  };

  const handleCheckout = async () => {
    if (!name.trim() || !phone.trim()) {
      setMessage('Isi nama dan nomor telepon terlebih dahulu.');
      return;
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        items: cartItems,
        total,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.code) {
      setMessage(result.error ?? 'Terjadi kesalahan saat menyimpan pesanan. Coba lagi.');
      return;
    }

    setOrderCode(result.code);
    localStorage.removeItem(CART_KEY);
    setCartItems([]);

    const whatsappMessage = encodeURIComponent(
      `Pesanan baru: ${result.code}\nNama: ${name}\nHP: ${phone}\nTotal: Rp${total.toLocaleString('id-ID')}`
    );
    const whatsappNumber = '6282327561340';
    window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  };

  if (!cartItems.length) {
    return (
      <main className="min-h-screen bg-onyx-600 px-4 py-10 text-white sm:px-8 lg:px-16">
        <div className="rounded-3xl border border-onyx-500 bg-onyx-700 p-10 text-center">
          <p className="mb-4 text-2xl font-bold">Keranjang Anda kosong</p>
          <p className="mb-6 text-onyx-300">Tambahkan produk di halaman katalog lalu kembali ke sini.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-onyx-600 px-4 py-10 text-white sm:px-8 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.75fr]">
        <section className="space-y-6 rounded-[2.5rem] border border-onyx-500 bg-onyx-700 p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-500">Keranjang</p>
            <h1 className="mt-3 text-4xl font-bold">Review Pesanan</h1>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.slug}-${item.color}-${item.size}`} className="rounded-3xl border border-onyx-500 bg-onyx-600 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">{item.name}</p>
                    <p className="text-sm text-onyx-300">{item.color} • {item.size}</p>
                    <div className="mt-4 flex items-center gap-2 rounded-2xl bg-onyx-700 p-3">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item, -1)}
                        className="rounded-full border border-onyx-500 bg-onyx-600 px-3 py-1 text-sm font-bold text-white transition hover:bg-onyx-500"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-bold text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item, 1)}
                        className="rounded-full border border-onyx-500 bg-onyx-600 px-3 py-1 text-sm font-bold text-white transition hover:bg-onyx-500"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <p className="text-lg font-bold text-white">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      className="rounded-2xl border border-rose-500 px-4 py-2 text-sm font-bold text-rose-200 transition hover:bg-rose-500/10"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6 rounded-[2.5rem] border border-onyx-500 bg-onyx-700 p-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-500">Checkout</p>
            <div className="rounded-3xl bg-onyx-600 p-5">
              <p className="text-sm text-onyx-300">Total pembayaran</p>
              <p className="mt-3 text-3xl font-bold text-white">Rp{total.toLocaleString('id-ID')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Nama</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama lengkap"
              className="w-full rounded-2xl border border-onyx-500 bg-onyx-600 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">No Telepon</label>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-2xl border border-onyx-500 bg-onyx-600 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full rounded-2xl bg-cyan-500 px-5 py-4 text-sm font-bold text-onyx-700 transition hover:bg-cyan-400"
          >
            Complete Order
          </button>

          {message ? <p className="rounded-2xl bg-onyx-600 p-4 text-sm text-cyan-200">{message}</p> : null}
          {orderCode ? (
            <div className="rounded-3xl border border-cyan-500 bg-onyx-600 p-5 text-sm text-cyan-100">
              Kode pesanan: <span className="font-bold text-white">{orderCode}</span>
            </div>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
