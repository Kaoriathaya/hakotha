import Link from 'next/link';
import Logo from '@/components/Logo';
import TechnologySection from '@/components/TechnologySection';
import OrderStatusChecker from '@/components/OrderStatusChecker';

const panels = [
  {
    title: 'Products',
    href: '/products',
    bg: 'bg-onyx-600',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="4" y="4" width="26" height="26" rx="4" stroke="#00F0FF" strokeWidth="2" />
        <path d="M11 22c0-6 0-10 6-11" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Process',
    bg: 'bg-onyx-700',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <polygon points="15,4 26,15 15,26 4,15" stroke="#FF4B00" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Technology',
    bg: 'bg-onyx-600',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect x="5" y="5" width="20" height="20" rx="4" stroke="#00F0FF" strokeWidth="2" />
        <path d="M10 10l10 10" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 10l-10 10" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Gallery',
    bg: 'bg-onyx-700',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="11" stroke="#00F0FF" strokeWidth="2" />
        <circle cx="15" cy="15" r="4" fill="#00F0FF" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="grid md:grid-cols-2">
        <div className="flex min-h-[280px] items-center justify-center bg-onyx-600 p-10">
          <Logo size={160} />
        </div>

        <div className="flex flex-col justify-center p-10 md:p-16 bg-onyx-700">
          <span className="mb-2 text-xs font-bold tracking-[0.2em] text-cyan-500">
            3D PRINTING STUDIO
          </span>
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Hakotha
          </h1>
          <p className="mb-8 max-w-md text-[15px] leading-relaxed text-onyx-500">
            Kami mengubah ide dan desain digital jadi objek nyata, lapis demi
            lapis. Dari prototipe cepat sampai produk custom, presisi dan
            kualitas jadi prioritas utama.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-md bg-cyan-500 px-5 py-2.5 text-sm font-bold text-onyx-700 transition hover:opacity-90"
            >
              Lihat katalog
            </Link>
            <a
              href="https://wa.me/6282327561340"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-onyx-500 px-5 py-2.5 text-sm font-bold text-white transition hover:border-cyan-500"
            >
              Hubungi kami
            </a>
          </div>
        </div>
      </section>

      
      <section className="grid border-t border-onyx-500/20 md:grid-cols-4">
        {panels.map((panel) => (
          <Link
            key={panel.title}
            href={panel.href ?? `#${panel.title.toLowerCase()}`}
            className={`${panel.bg} flex items-center justify-between p-8 transition hover:brightness-125`}
          >
            <span className="font-display text-xl font-bold tracking-wide text-white">
              {panel.title.toUpperCase()}
            </span>
            {panel.icon}
          </Link>
        ))}
      </section>
      <section id="process" className="bg-onyx-700 p-10 md:p-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">
          Process
        </h2>
        <OrderStatusChecker />
      </section>

      <TechnologySection />

      <section id="gallery" className="bg-onyx-600 p-10 md:p-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">
          Gallery
        </h2>
      </section>
    </main>
  )
}
