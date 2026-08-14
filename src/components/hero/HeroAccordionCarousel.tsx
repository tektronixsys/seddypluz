import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import heroBride from "@/assets/hero-bride.jpg";
import gele1 from "@/assets/gele-1.jpg";
import bridalAfter from "@/assets/bridal_after.png";
import glam1 from "@/assets/glam-1.jpg";

interface HeroSlide {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  technique: string;
  img: string;
  accentColor: string;
  vol: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "royal-bridal",
    num: "01",
    tag: "Haute Bridal Masterpiece",
    title: "Her Royal Moment",
    subtitle: "2026/2027 Bridal Collection",
    technique: "18H HD Base · Dewy Glass Skin",
    img: heroBride,
    accentColor: "from-lavender-deep/20 via-amber-200/15 to-mauve/20",
    vol: "Vol. IV",
  },
  {
    id: "heritage-gele",
    num: "02",
    tag: "Sculptural Headwrap Artistry",
    title: "Heritage Gele Crown",
    subtitle: "Couture Traditional Majesty",
    technique: "Precision Pleating · Royal Silhouette",
    img: gele1,
    accentColor: "from-mauve/25 via-plum/15 to-amber-200/15",
    vol: "Vol. III",
  },
  {
    id: "velvet-monarch",
    num: "03",
    tag: "Studio Signature Glam",
    title: "The Velvet Monarch",
    subtitle: "Camera-Calibrated Portraiture",
    technique: "Airbrushed Base · Satin Plum Lip",
    img: bridalAfter,
    accentColor: "from-amber-200/20 via-lavender-deep/20 to-plum/15",
    vol: "Vol. II",
  },
  {
    id: "sunset-radiance",
    num: "04",
    tag: "Editorial Campaign Finish",
    title: "Sunset Radiance",
    subtitle: "4K Luminous Gold Glow",
    technique: "Baked Micro-Pearls · Soft Focus",
    img: glam1,
    accentColor: "from-rose-200/20 via-mauve/20 to-amber-100/20",
    vol: "Vol. I",
  },
];

export function HeroAccordionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-advance every 5 seconds unless hovered or interacted with
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // 40px swipe threshold
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
    setTimeout(() => setIsPaused(false), 3000);
  };

  const activeSlide = heroSlides[activeIndex];

  return (
    <div
      className="relative w-full max-w-[620px] mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient glowing backdrop matched to active look */}
      <div
        className={`absolute -inset-4 rounded-[3rem] bg-gradient-to-tr ${activeSlide.accentColor} blur-2xl -z-10 transition-all duration-1000`}
      />

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-plum/15 p-2 sm:p-3.5 shadow-[0_30px_100px_rgba(82,58,77,0.16)]">
        {/* Horizontal Expanding / Contracting Flex Stack */}
        <div className="flex h-[380px] xs:h-[430px] sm:h-[480px] md:h-[520px] gap-1.5 sm:gap-2.5 w-full items-stretch">
          {heroSlides.map((slide, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) cursor-pointer group ${
                  isActive
                    ? "flex-[3.5] sm:flex-[3.8] md:flex-[4] shadow-xl"
                    : "flex-[0.8] sm:flex-[0.8] hover:flex-[1] opacity-75 hover:opacity-100"
                }`}
                role="button"
                tabIndex={0}
                aria-label={`View look ${slide.num}: ${slide.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveIndex(idx);
                  }
                }}
              >
                {/* Background Image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ${
                    isActive ? "scale-105" : "scale-115 grayscale-[15%] group-hover:scale-110"
                  }`}
                />

                {/* Overlays */}
                {isActive ? (
                  // Active Slide Rich Editorial Overlay
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent flex flex-col justify-between p-3.5 xs:p-4.5 sm:p-6 text-white animate-in fade-in duration-500">
                    {/* Top Bar: Vol Badge & Number */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#FAF9F5] border border-white/25">
                        <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-300" />
                        <span>{slide.vol}</span>
                      </span>

                      <span className="font-display text-xl sm:text-3xl italic text-amber-300/90 font-semibold drop-shadow-sm">
                        {slide.num}
                      </span>
                    </div>

                    {/* Bottom Content Info */}
                    <div className="space-y-1 sm:space-y-2">
                      <span className="inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm border border-amber-300/30">
                        {slide.tag}
                      </span>

                      <h3 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white leading-tight italic">
                        {slide.title}
                      </h3>

                      <div className="flex items-center justify-between pt-1 border-t border-white/20">
                        <p className="text-[10px] sm:text-xs text-white/80 font-medium tracking-wide truncate max-w-[220px] sm:max-w-none">
                          {slide.technique}
                        </p>
                        <a
                          href="#portfolio"
                          onClick={(e) => e.stopPropagation()}
                          className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 hover:text-white transition-colors"
                        >
                          <span>Lookbook</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Contracted Inactive Teaser Overlay
                  <div className="absolute inset-0 bg-plum/60 hover:bg-plum/45 backdrop-blur-[2px] transition-colors duration-300 flex flex-col justify-between items-center py-4 sm:py-5 px-0.5 sm:px-2 text-[#FAF9F5]">
                    {/* Top Index */}
                    <span className="font-display text-xs sm:text-base italic text-amber-300/80 font-semibold">
                      {slide.num}
                    </span>

                    {/* Vertical Verticalized Title */}
                    <div className="flex-1 flex items-center justify-center my-1 sm:my-2">
                      <span
                        className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#FAF9F5]/90 whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {slide.title}
                      </span>
                    </div>

                    {/* Bottom Dot */}
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-amber-300 transition-colors" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation & Progress Bar */}
        <div className="mt-2.5 sm:mt-3 px-1 sm:px-2 flex items-center justify-between gap-2 sm:gap-3 text-plum">
          {/* Segmented Progress Bars */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-1 max-w-[160px] sm:max-w-[200px]">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 flex-1 rounded-full overflow-hidden bg-plum/15 hover:bg-plum/30 transition-colors cursor-pointer py-1 -my-1"
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    activeIndex === i ? "bg-plum w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Indicator text */}
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-plum/60 truncate max-w-[120px] sm:max-w-none">
            {activeSlide.num} / 0{heroSlides.length} · {activeSlide.title}
          </span>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous bridal look"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-plum/15 bg-white/80 text-plum hover:bg-plum hover:text-[#FAF9F5] active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next bridal look"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-plum/15 bg-white/80 text-plum hover:bg-plum hover:text-[#FAF9F5] active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Vol IV Medallion Badge Top-Left */}
      <div
        className="absolute -left-3 sm:-left-6 -top-3 sm:-top-4 hidden sm:block z-20 animate-float-up pointer-events-none"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 flex-col items-center justify-center rounded-full border border-lavender-deep/30 bg-white/95 backdrop-blur-xl text-plum shadow-xl transition-transform duration-300">
          <span className="text-[9px] font-bold uppercase tracking-wider text-lavender-deep">
            Lookbook
          </span>
          <span className="font-display text-base sm:text-lg italic font-semibold text-plum">
            {activeSlide.vol}
          </span>
        </div>
      </div>

      {/* Floating Verified Luxury Badge Top-Right */}
      <div
        className="absolute -right-2 sm:-right-4 -top-3 hidden sm:flex items-center gap-2 rounded-2xl border border-plum/10 bg-white/95 backdrop-blur-xl px-3.5 py-2 shadow-xl animate-float-up z-20 pointer-events-none transition-transform duration-300"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/20 text-amber-600">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider font-bold text-plum/50">
            Editorial Grade
          </span>
          <span className="text-[11px] font-bold text-plum">100% Bridal Perfection</span>
        </div>
      </div>
    </div>
  );
}
