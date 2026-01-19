import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HeroImage {
  src: string;
  position: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  onSlideChange?: (index: number) => void;
  onReady?: () => void;
}

export const HeroCarousel = ({ images, onSlideChange, onReady }: HeroCarouselProps) => {
  // Defer carousel initialization significantly to avoid blocking TTI
  const [isReady, setIsReady] = useState(false);
  const initRef = useRef(false);

  // A11y: respect prefers-reduced-motion (autoplay OFF) - check only once
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  // Defer initialization using idle callback for better TTI
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Use requestIdleCallback if available, fallback to setTimeout
    const scheduleInit = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 100));
    const cancelInit = window.cancelIdleCallback || clearTimeout;

    const id = scheduleInit(() => {
      setIsReady(true);
    });

    return () => cancelInit(id);
  }, []);

  // Let parent know when carousel is ready to be shown (prevents background flash)
  useEffect(() => {
    if (!isReady) return;
    requestAnimationFrame(() => {
      onReady?.();
    });
  }, [isReady, onReady]);

  // stopOnInteraction TRUE (better UX, doesn't "fight" the user)
  const plugins = useMemo(() => {
    if (reduceMotion || !isReady) return [];
    return [Autoplay({ delay: 7000, stopOnInteraction: true })];
  }, [reduceMotion, isReady]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, watchDrag: isReady, active: isReady },
    plugins
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    onSlideChange?.(emblaApi.selectedScrollSnap());
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full touch-pan-y" style={{ willChange: isReady ? 'auto' : 'transform' }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] min-w-0 h-full relative"
            role="img"
            aria-label={image.alt}
          >
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: "cover",
                backgroundPosition: image.position,
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
