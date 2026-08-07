import ProductDetailForm from '@/components/ProductDetailForm';
import ProductImageSlider from '@/components/ProductImageSlider';
import { getProductBySlug } from '@/lib/products';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-onyx-600 px-4 py-10 text-white sm:px-8 lg:px-16">
        <div className="rounded-3xl border border-onyx-500 bg-onyx-700 p-10 text-center">
          <p className="text-lg font-bold">Produk tidak ditemukan</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-onyx-600 px-4 py-10 text-white sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_0.95fr] lg:items-start">
        <div className="rounded-[2.5rem] border border-onyx-500 bg-onyx-700 overflow-hidden shadow-xl">
          <div className="w-full overflow-hidden">
            <ProductImageSlider
              images={product.images && product.images.length > 0 ? product.images : [product.image]}
              alt={product.name}
              fallbackSrc={product.image}
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="mb-4 text-cyan-500 uppercase tracking-[0.2em]">Product</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{product.name}</h1>
            <p className="mt-5 text-onyx-300 leading-relaxed sm:text-base text-sm">{product.description}</p>
            <p className="mt-8 text-lg font-semibold text-white">
              Rp{(product.price ?? 0).toLocaleString('id-ID')}
            </p>
          </div>
        </div>


        <div className="space-y-6">
          <div className="rounded-[2.5rem] border border-onyx-500 bg-onyx-700 p-6 sm:p-10">
            <h2 className="mb-4 text-2xl font-bold text-white">Pilihan produk</h2>
            <ProductDetailForm product={product} />
          </div>
          <div className="rounded-[2.5rem] border border-onyx-500 bg-onyx-700 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Info tambahan</h2>
            <div className="space-y-4 text-onyx-300">
              <div>
                <p className="mb-2 font-semibold text-white">Pilihan warna</p>
                <ul className="list-disc space-y-2 pl-5">
                  {product.colors.map((color) => (
                    <li key={color}>{color}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-semibold text-white">Pilihan ukuran</p>
                <ul className="list-disc space-y-2 pl-5">
                  {product.sizes.map((size) => {
                    const label = typeof size === 'string' ? size : size.label;
                    return <li key={label}>{label}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
