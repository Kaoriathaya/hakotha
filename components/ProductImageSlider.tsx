'use client';

import { useState } from 'react';

interface ProductImageSliderProps {
  images: string[] | string | undefined;
  alt: string;
  fallbackSrc?: string;
}

function normalizeImages(images: string[] | string | undefined, fallbackSrc?: string) {
  const fallback = fallbackSrc ?? '';

  if (!images) {
    return fallback ? [fallback] : [];
  }

  if (Array.isArray(images)) {
    const filtered = images.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    return filtered.length > 0 ? filtered : (fallback ? [fallback] : []);
  }

  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
        return filtered.length > 0 ? filtered : (fallback ? [fallback] : [images]);
      }
    } catch {
      // fallback to raw string if not valid JSON
    }

    return [images];
  }

  return fallback ? [fallback] : [];
}

export default function ProductImageSlider({ images, alt, fallbackSrc }: ProductImageSliderProps) {
  const normalizedImages = normalizeImages(images, fallbackSrc);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const imageCount = normalizedImages.length;

  const handlePrev = () => setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
  const handleNext = () => setActiveIndex((current) => (current + 1) % imageCount);
  const activeSrc = normalizedImages[activeIndex];

  return (
    <div className="rounded-3xl bg-onyx-600">
      {isZoomOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-h-full w-full max-w-5xl overflow-hidden rounded-3xl border border-onyx-500 bg-onyx-900">
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 px-3 py-2 text-2xl text-white transition hover:bg-black/70"
              aria-label="Tutup gambar"
            >
              ×
            </button>
            <img
              src={activeSrc}
              alt={`${alt} ${activeIndex + 1}`}
              className="h-[80vh] w-full object-contain bg-black"
            />
          </div>
        </div>
      ) : null}
      <div className="relative overflow-hidden rounded-t-3xl h-[260px] sm:h-[320px] md:h-[420px]">
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute inset-0 z-10"
          aria-label="Perbesar gambar"
        />
        <img
          src={activeSrc}
          alt={`${alt} ${activeIndex + 1}`}
          loading="lazy"
          onError={(event) => {
            if (fallbackSrc && event.currentTarget.src !== fallbackSrc) {
              event.currentTarget.src = fallbackSrc;
            }
          }}
          className="h-full w-full object-cover transition duration-300"
        />

        {imageCount > 1 ? (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Gambar sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Gambar berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {imageCount > 1 ? (
        <div className="mt-3 flex flex-wrap justify-center gap-2 px-3 pb-3">
          {normalizedImages.map((image, index) => (
            <button
              key={`${alt}-thumb-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-2xl border transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                index === activeIndex ? 'border-cyan-500' : 'border-onyx-500'
              }`}
            >
              <span className="sr-only">Pilih gambar {index + 1}</span>
              <img
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {index === activeIndex ? (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-cyan-500" />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
