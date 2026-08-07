export default function TechnologySection() {
  return (
    <section id="technology" className="bg-onyx-600 p-10 md:p-16">
      <h2 className="mb-6 font-display text-2xl font-bold text-white">
        Technology
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible">
        <div className="min-w-[240px] flex-1 rounded-xl border border-onyx-500/30 bg-onyx-700 p-6 md:min-w-0">
          <div className="mb-4 overflow-hidden rounded-3xl bg-onyx-600">
            <img
              src="https://th.bing.com/th/id/OIP.zX1lDwucN6mlUY0g6PgF_wHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Bambu Lab A1 Mini"
              className="h-40 w-full object-cover"
            />
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-white">
            Bambu Lab A1 Mini
          </h3>
          <p className="text-sm leading-relaxed text-onyx-500">
            Mesin pencetak 3D compact dengan presisi tinggi untuk prototipe dan produk custom.
          </p>
        </div>
        <div className="min-w-[240px] flex-1 rounded-xl border border-onyx-500/30 bg-onyx-700 p-6 md:min-w-0">
          <div className="mb-4 overflow-hidden rounded-3xl bg-onyx-600">
            <img
              src="https://store.bblcdn.com/s7/default/502359426c1c4e9687a7f921f741b623/Matte-Ash-Grey.png"
              alt="PLA"
              className="h-40 w-full object-cover"
            />
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-white">
            PLA
          </h3>
          <p className="text-sm leading-relaxed text-onyx-500">
            Material ramah pengguna, cocok untuk detail halus, visual rapi, dan kebutuhan cepat.
          </p>
        </div>
        <div className="min-w-[240px] flex-1 rounded-xl border border-onyx-500/30 bg-onyx-700 p-6 md:min-w-0">
          <div className="mb-4 overflow-hidden rounded-3xl bg-onyx-600">
            <img
              src="https://voxelfuse3d.com/wp-content/uploads/2025/12/bambu-lab-petg-hf-gray-1kg-filament-box-label.jpg"
              alt="PETG"
              className="h-40 w-full object-cover"
            />
          </div>
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
