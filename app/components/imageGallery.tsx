"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
  featured?: boolean;
}

export default function ImageGallery({
  images,
  title,
  featured = true,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 bg-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-slate-500">No images available</p>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div
        className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 "
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          1 image
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 group cursor-pointer mb-4"
        onClick={() => setShowModal(true)}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 "
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(
                  (prev) => (prev - 1 + images.length) % images.length,
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full transition-all z-10 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full transition-all z-10 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
              selectedIndex === index
                ? "ring-2 ring-purple-600 "
                : "ring-1 ring-slate-200 hover:ring-purple-400"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all backdrop-blur-sm z-50"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <button
              onClick={() =>
                setSelectedIndex(
                  (prev) => (prev - 1 + images.length) % images.length,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm z-40"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev + 1) % images.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm z-40"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={images[selectedIndex]}
              alt={`${title} - Fullscreen`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>

          <div className="absolute bottom-20 left-0 right-0 px-4 flex gap-2 justify-center overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  selectedIndex === index
                    ? "ring-2 ring-purple-400 "
                    : "ring-1 ring-white/30 hover:ring-white/50"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
