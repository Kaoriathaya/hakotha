'use client';

import { useState } from 'react';

const statusSteps = [
  { key: 'pending', label: 'Terkonfirmasi' },
  { key: 'printing', label: 'Proses Cetak' },
  { key: 'printed', label: 'Selesai Cetak' },
  { key: 'shipped', label: 'Dikirim' },
  { key: 'completed', label: 'Selesai' },
];

const statusLabelMap: Record<string, string> = {
  pending: 'Terkonfirmasi',
  confirmed: 'Terkonfirmasi',
  printing: 'Proses Cetak',
  printed: 'Selesai Cetak',
  shipped: 'Dikirim',
  completed: 'Selesai',
};

function normalizeStatus(value: string | null | undefined) {
  return value?.toString().trim().toLowerCase() ?? '';
}

export default function OrderStatusChecker() {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setError('');
    setMessage('');
    setStatus(null);

    const trimmedCode = code.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedCode || !trimmedPhone) {
      setError('Isi kode pesanan dan nomor telepon terlebih dahulu.');
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({ code: trimmedCode, phone: trimmedPhone });
      const response = await fetch(`/api/orders?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? 'Pesanan tidak ditemukan.');
        return;
      }

      const statusValue = normalizeStatus(result.status);
      setStatus(statusValue);
      setMessage(`Status pesanan: ${statusLabelMap[statusValue] ?? result.status}`);
    } catch (err) {
      setError('Gagal memeriksa status pesanan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const activeStep = statusSteps.findIndex((step) => step.key === status);

  return (
    <div className="space-y-3 rounded-3xl border border-onyx-500 bg-onyx-700 p-5">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-500">Lacak Pesanan</p>
        <p className="text-base text-onyx-200">
          Masukkan kode pesanan dan nomor telepon yang terdaftar agar status pesanan dapat dicocokkan dengan database.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-1 min-w-0">
          <label className="block text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Kode Pesanan</label>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Contoh: ABC123"
            className="w-full rounded-2xl border border-onyx-500 bg-onyx-600 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>
        <div className="space-y-2 min-w-0 max-w-[200px]">
          <label className="block text-sm font-bold uppercase tracking-[0.2em] text-onyx-200">Nomor Telepon</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="08xxxxxxxxxx"
            className="w-full rounded-2xl border border-onyx-500 bg-onyx-600 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCheck}
        disabled={loading}
        className="w-full rounded-2xl bg-cyan-500 px-5 py-4 text-sm font-bold text-onyx-700 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Memeriksa...' : 'Cek Status Pesanan'}
      </button>

      {error ? (
        <div className="rounded-3xl border border-red-500 bg-red-600/20 p-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-3xl border border-cyan-500 bg-onyx-600 p-4 text-sm text-cyan-100">
          {message}
        </div>
      ) : null}

      {status ? (
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-2 sm:grid-cols-5 sm:grid-flow-row">
          {statusSteps.map((step, index) => {
            const completed = index <= activeStep;
            return (
              <div key={step.key} className="text-center min-w-[90px]">
                <div
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    completed ? 'border-cyan-500 bg-cyan-500 text-onyx-900' : 'border-onyx-500 bg-onyx-600 text-onyx-500'
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-onyx-300">
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
