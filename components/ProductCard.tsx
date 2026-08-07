import Link from 'next/link';
import { Product } from '@/lib/products';

function getProductMainImage(product: Product) {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }

  if (typeof product.image === 'string') {
    try {
      const parsed = JSON.parse(product.image);
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
        return parsed[0];
      }
    } catch {
      // not JSON, use raw string
    }
  }

  return product.image;
}

export default function ProductCard({ product }: { product: Product }) {
  const mainImage = getProductMainImage(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-onyx-500 bg-onyx-700 transition hover:-translate-y-1 hover:border-cyan-500"
    >
      <div className="relative h-64 overflow-hidden bg-onyx-600">
        <img
          src={mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-500">Product</p>
          <h3 className="mt-2 text-xl font-bold text-white">{product.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-onyx-500">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            Rp{(product.price ?? 0).toLocaleString('id-ID')}
          </span>
          <span className="rounded-full border border-onyx-500 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">Detail</span>
        </div>
      </div>
    </Link>
  );
}
