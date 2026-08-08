import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';

export const metadata = {
  title: 'Products | Hakotha',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-onyx-600 px-4 py-10 text-white sm:px-8 lg:px-16">
      <header className="mb-10 max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-500">Hakotha Shop</p>
        <h1 className="text-4xl font-bold">Katalog Produk</h1>
        <p className="mt-3 max-w-2xl text-onyx-300">
          Pilih produk 3D printed dengan opsi color dan size. Klik kartu untuk melihat detail lengkap.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm font-bold text-onyx-300">
            Produk lainnya juga tersedia di Shopee. Cek koleksi lengkap toko kami untuk varian dan promo terbaru.
          </p>
          <a
            href="https://id.shp.ee/tEaCJt39"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-onyx-900 transition hover:bg-orange-400"
          >
            Kunjungi Shopee
          </a>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <div className="mt-12 flex items-center justify-between border-t border-onyx-500 pt-6">
        <Link
          href="/"
          className="rounded-2xl border border-onyx-500 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-500"
        >
          Kembali ke homepage
        </Link>
        <Link
          href="/cart"
          className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-bold text-onyx-700 transition hover:bg-cyan-400"
        >
          Lihat Keranjang
        </Link>
      </div>
    </main>
  );
}
