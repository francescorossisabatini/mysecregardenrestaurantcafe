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
}

export const HeroCarousel = ({ images, onSlideChange }: HeroCarouselProps) => {
  // Defer carousel initialization to avoid forced reflow during initial render
  const [isReady, setIsReady] = useState(false);
  const initRef = useRef(false);

  // A11y: respect prefers-reduced-motion (autoplay OFF)
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Defer initialization to next frame to avoid forced reflow
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    // Use requestAnimationFrame to batch layout reads after paint
    requestAnimationFrame(() => {
      setIsReady(true);
    });
  }, []);

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
