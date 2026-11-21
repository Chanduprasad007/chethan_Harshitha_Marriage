import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxSlide {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
}

interface GalleryLightboxProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function GalleryLightbox({
  slides,
  activeIndex,
  onClose,
  onSelectIndex,
}: GalleryLightboxProps) {
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, slides.length, onClose, onSelectIndex]);

  if (activeIndex === null || !slides[activeIndex]) {
    return null;
  }

  const current = slides[activeIndex];
  const hasFailed = failedSrcs[current.src];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || slides.length <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (Math.abs(delta) > 45) {
      if (delta < 0) {
        onSelectIndex((activeIndex + 1) % slides.length);
      } else {
        onSelectIndex((activeIndex - 1 + slides.length) % slides.length);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#14100E]/95 text-[#FAF7F2] p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="text-xs tracking-[0.16em] uppercase text-[#CBBBA8] tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
          <h3 className="font-editorial text-xl sm:text-2xl font-medium truncate">
            {current.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-white/20 text-[#FAF7F2] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7F2] transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="relative flex-1 flex items-center justify-center my-3 sm:my-4 min-h-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex - 1 + slides.length) % slides.length)}
            aria-label="Previous image"
            className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-white/20 bg-black/40 text-[#FAF7F2] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7F2] transition-colors mr-4 shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative max-h-full max-w-4xl flex items-center justify-center">
          {hasFailed ? (
            <div className="w-80 h-96 rounded-lg border border-white/15 bg-[#231D1A] flex flex-col items-center justify-center p-6 text-center">
              <p className="font-editorial text-xl text-[#FAF7F2]">{current.title}</p>
              {current.subtitle && (
                <p className="mt-2 text-xs text-[#CBBBA8]">{current.subtitle}</p>
              )}
            </div>
          ) : (
            <img
              src={current.src}
              alt={current.title}
              referrerPolicy="no-referrer"
              onError={() => setFailedSrcs((prev) => ({ ...prev, [current.src]: true }))}
              className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
          )}
        </div>

        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex + 1) % slides.length)}
            aria-label="Next image"
            className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-white/20 bg-black/40 text-[#FAF7F2] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7F2] transition-colors ml-4 shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div
        className="max-w-3xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs sm:text-sm text-[#DDD3C7]">{current.subtitle || ''}</p>
        {slides.length > 1 && (
          <div className="flex sm:hidden w-full items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onSelectIndex((activeIndex - 1 + slides.length) % slides.length)}
              aria-label="Previous image"
              className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-lg border border-white/20 bg-white/5 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectIndex((activeIndex + 1) % slides.length)}
              aria-label="Next image"
              className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-lg border border-white/20 bg-white/5 text-sm font-medium"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
