import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import gsap from "gsap";

const carouselVariants = cva("relative w-full overflow-hidden rounded-lg", {
  variants: {
    variant: {
      light: "bg-white text-gray-800 border border-gray-200 shadow-sm",
      dark: "bg-slate-900 text-white border border-slate-700 shadow-md",
      primary: "bg-indigo-600 text-white border border-indigo-500 shadow-md",
    },
    size: {
      sm: "max-w-sm",
      md: "max-w-xl",
      lg: "max-w-3xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "md",
  },
});

export interface CarouselItem {
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  content?: React.ReactNode;
}

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  items: CarouselItem[];
  autoplay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  animation?: keyof typeof entranceAnimations;
  slideAnimation?: "fade" | "slide";
  onSlideChange?: (index: number) => void;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      className,
      variant = "light",
      size = "md",
      autoplay = false,
      interval = 3000,
      showArrows = true,
      showDots = true,
      loop = true,
      animation = "fadeIn",
      slideAnimation = "slide",
      onSlideChange,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    const totalSlides = items.length;

    const goToSlide = useCallback(
      (index: number) => {
        if (totalSlides === 0) return;

        let nextIndex = index;
        if (loop) {
          nextIndex =
            ((index % totalSlides) + totalSlides) % totalSlides;
        } else {
          nextIndex = Math.max(0, Math.min(index, totalSlides - 1));
        }

        if (slideAnimation === "slide" && trackRef.current && viewportRef.current) {
          const slideWidth = viewportRef.current.offsetWidth;
          gsap.to(trackRef.current, {
            x: -nextIndex * slideWidth,
            duration: 0.5,
            ease: "power2.inOut",
          });
        } else {
          slideRefs.current.forEach((slide, i) => {
            if (!slide) return;
            gsap.to(slide, {
              opacity: i === nextIndex ? 1 : 0,
              duration: 0.45,
              ease: "power2.inOut",
            });
          });
        }

        setCurrentIndex(nextIndex);
        onSlideChange?.(nextIndex);
      },
      [loop, onSlideChange, slideAnimation, totalSlides]
    );

    const goNext = useCallback(() => {
      if (!loop && currentIndex >= totalSlides - 1) return;
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide, loop, totalSlides]);

    const goPrev = useCallback(() => {
      if (!loop && currentIndex <= 0) return;
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide, loop]);

    useEffect(() => {
      const el = carouselRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    useEffect(() => {
      if (slideAnimation !== "slide" || !trackRef.current || !viewportRef.current)
        return;

      const syncSlidePosition = () => {
        if (!trackRef.current || !viewportRef.current) return;
        gsap.set(trackRef.current, {
          x: -currentIndex * viewportRef.current.offsetWidth,
        });
      };

      syncSlidePosition();
      window.addEventListener("resize", syncSlidePosition);
      return () => window.removeEventListener("resize", syncSlidePosition);
    }, [currentIndex, slideAnimation, items.length]);

    useEffect(() => {
      if (!autoplay || totalSlides <= 1) return;

      const timer = setInterval(goNext, interval);
      return () => clearInterval(timer);
    }, [autoplay, goNext, interval, totalSlides]);

    if (totalSlides === 0) return null;

    const arrowClass =
      variant === "light"
        ? "bg-white/90 text-gray-800 hover:bg-white shadow"
        : "bg-black/30 text-white hover:bg-black/50";

    const dotActiveClass =
      variant === "light" ? "bg-indigo-600" : "bg-white";

    const dotInactiveClass =
      variant === "light" ? "bg-gray-300" : "bg-white/40";

    const descriptionClass =
      variant === "light" ? "text-gray-600" : "text-white/80";

    return (
      <div
        ref={(node) => {
          carouselRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(carouselVariants({ variant, size }), className)}
        {...props}
      >
        <div
          ref={viewportRef}
          className={cn(
            "relative overflow-hidden",
            slideAnimation === "fade" && "aspect-video"
          )}
        >
          {slideAnimation === "slide" ? (
            <div ref={trackRef} className="flex">
              {items.map((item, index) => (
                <div key={item.id ?? index} className="min-w-full shrink-0">
                  {item.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title || `Slide ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {(item.title || item.description || item.content) && (
                    <div className="p-5 space-y-2">
                      {item.title && (
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className={cn("text-sm", descriptionClass)}>
                          {item.description}
                        </p>
                      )}
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative min-h-[220px] h-full">
              {items.map((item, index) => (
                <div
                  key={item.id ?? index}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className="absolute inset-0 w-full"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    zIndex: index === currentIndex ? 2 : 1,
                    pointerEvents: index === currentIndex ? "auto" : "none",
                  }}
                >
                  {item.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title || `Slide ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {(item.title || item.description || item.content) && (
                    <div className="p-5 space-y-2">
                      {item.title && (
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className={cn("text-sm", descriptionClass)}>
                          {item.description}
                        </p>
                      )}
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {showArrows && totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={!loop && currentIndex === 0}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                arrowClass
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!loop && currentIndex === totalSlides - 1}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                arrowClass
              )}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {showDots && totalSlides > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((item, index) => (
              <button
                key={item.id ?? index}
                type="button"
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? cn("w-5", dotActiveClass)
                    : cn("w-2", dotInactiveClass)
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export { Carousel, carouselVariants };
