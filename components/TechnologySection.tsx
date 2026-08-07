export default function TechnologySection() {
  return (
    <section id="technology" className="bg-onyx-600 p-10 md:p-16">
      <h2 className="mb-6 font-display text-2xl font-bold text-white">
        Technology
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible">
        <div className="min-w-[240px] flex-1 rounded-xl border border-onyx-500/30 bg-onyx-700 p-6 md:min-w-0">
          <h3 className="mb-2 font-display text-xl font-bold text-white">
            Bambu Lab A1 Mini
          </h3>
          <p className="text-sm leading-relaxed text-onyx-500">
            Mesin pencetak 3D compact dengan presisi tinggi untuk prototipe dan produk custom.
          </p>
        </div>
        <div className="min-w-[240px] flex-1 rounded-xl border border-onyx-500/30 bg-onyx-700 p-6 md:min-w-0">
          <h3 className="mb-2 font-display text-xl font-bold text-white">
            PLA
          </h3>
          <p className="text-sm leading-relaxed text-onyx-500">
            Material ramah pengguna, cocok untuk detail halus, visual rapi, dan kebutuhan cepat.
          </p>
        </div>
        <div className="min-w-[240px] flex-1 rounded-xl border border-onyx-500/30 bg-onyx-700 p-6 md:min-w-0">
          <h3 className="mb-2 font-display text-xl font-bold text-white">
            PETG
          </h3>
          <p className="text-sm leading-relaxed text-onyx-500">
            Material lebih kuat dan tahan panas, ideal untuk fungsi, uji coba, dan penggunaan sehari-hari.
          </p>
        </div>
      </div>
    </section>
  )
}
