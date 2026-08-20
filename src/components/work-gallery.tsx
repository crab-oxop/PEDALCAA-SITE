"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

// Large, one-at-a-time showcase with a slow crossfade — reads more premium
// than a dense thumbnail grid. Auto-advances, pauses on hover/focus, and
// manual navigation resets the autoplay clock instead of fighting it.
export function WorkGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3200);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, images.length, resetSignal]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % images.length) + images.length) % images.length);
      setResetSignal((s) => s + 1);
    },
    [images.length]
  );

  // Click-to-navigate by half: left half = previous, right half = next.
  // The corner buttons stop propagation before this ever sees their click.
  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    goTo(isLeftHalf ? index - 1 : index + 1);
  }

  function handleImageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    setHoverSide(isLeftHalf ? "left" : "right");
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
      <div
        className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-gradient-to-br from-charcoal to-void sm:aspect-[16/9]"
        onClick={handleImageClick}
        onMouseMove={handleImageMouseMove}
        onMouseLeave={() => setHoverSide(null)}
      >
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            // object-contain, not cover — these photos are already
            // deliberately cropped; the container must never re-crop them.
            // Hover-zoom (group-hover:scale-105) only ever applies to the
            // currently-visible image, never the hidden ones stacked below it.
            className={`crossfade object-contain ${
              i === index ? "opacity-100 group-hover:scale-105" : "opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

        {/* Soft directional hint — purely decorative affordance for the
            whole-image click zones above; screen readers and keyboard users
            navigate via the real buttons below, unaffected by any of this. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 flex w-1/2 items-center justify-start pl-6 transition-opacity duration-300 ${
            hoverSide === "left" ? "opacity-100" : "opacity-0"
          }`}
        >
          <IconChevronLeft size={44} className="text-ink/30" />
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-end pr-6 transition-opacity duration-300 ${
            hoverSide === "right" ? "opacity-100" : "opacity-0"
          }`}
        >
          <IconChevronRight size={44} className="text-ink/30" />
        </div>

        <p className="pointer-events-none absolute bottom-6 left-6 text-sm text-ink sm:bottom-8 sm:left-8">
          {images[index].caption}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goTo(index - 1);
          }}
          aria-label="Previous image"
          className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-ink/45 transition-colors duration-300 hover:text-ink sm:left-5"
        >
          <IconChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goTo(index + 1);
          }}
          aria-label="Next image"
          className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-ink/45 transition-colors duration-300 hover:text-ink sm:right-5"
        >
          <IconChevronRight size={22} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2.5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${img.caption}`}
            aria-current={i === index}
            className="p-1.5"
          >
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                i === index ? "bg-accent-green" : "bg-white/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
