import React, { useState, useRef, useCallback, useEffect } from "react";
import bridalBefore from "@/assets/bridal_before.png";
import bridalAfter from "@/assets/bridal_after.png";
import { Sparkles, Wand2, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export function TransformationSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <section id="transformations" className="relative py-28 md:py-40 bg-[#FAF9F5] overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-mauve/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-lavender/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-8 rounded-full bg-lavender-deep" />
              <p className="eyebrow text-lavender-deep">The Artistry</p>
            </div>
            <h2 className="font-display text-5xl leading-[1.05] text-plum md:text-7xl">
              Before &amp; After
              <br />
              <em className="text-lavender-deep">Transformations.</em>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm md:text-base leading-relaxed text-plum/70">
              Drag the interactive slider below to reveal the seamless transition from natural skin
              to radiant, camera-ready bridal opulence.
            </p>
          </div>
        </div>

        {/* Main Grid: Slider + Storytelling Cards */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Interactive Image Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="group relative h-[460px] sm:h-[560px] w-full select-none overflow-hidden rounded-[2.5rem] bg-white border border-plum/10 shadow-[0_24px_50px_-12px_rgba(82,58,77,0.12)] cursor-ew-resize"
            >
              {/* After Image (Background full layer) */}
              <img
                src={bridalAfter}
                alt="Bridal Makeup Transformation - After"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              {/* Before Image (Foreground clipped layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={bridalBefore}
                  alt="Bridal Makeup Transformation - Before"
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Floating Label Badges */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-plum/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FAF9F5] shadow-md border border-white/20">
                  Natural Bare
                </span>
              </div>
              <div className="absolute top-6 right-6 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/90 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-plum shadow-md border border-white/40">
                  <Sparkles className="h-3 w-3" />
                  Bridal Glam
                </span>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Grip Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-plum shadow-[0_8px_24px_rgba(82,58,77,0.3)] ring-4 ring-amber-400 transition-transform group-hover:scale-110 active:scale-95">
                  <svg
                    className="h-5 w-5 text-plum"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l-4 3 4 3M16 9l4 3-4 3"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom Interactive Hint */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-plum/80 border border-white/50 shadow-sm">
                  <span>← Drag to Compare →</span>
                </span>
              </div>
            </div>

            {/* Position Preset Buttons */}
            <div className="mt-4 flex items-center justify-center gap-3">
              {[
                { label: "100% Before", pos: 100 },
                { label: "50% Split", pos: 50 },
                { label: "100% After Glam", pos: 0 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => setSliderPosition(btn.pos)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    sliderPosition === btn.pos
                      ? "bg-plum text-[#FAF9F5] shadow-xs"
                      : "bg-plum/5 text-plum/70 hover:bg-plum/10"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Artistry Process & Consultation Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="eyebrow text-lavender-deep">Signature Technique</p>
              <h3 className="mt-3 font-display text-3xl md:text-4xl text-plum leading-tight">
                Enhancing your essence, never masking your identity.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-plum/75">
                Every bridal glam at Seddypluz begins with deep skin prep and custom color theory,
                formulated to withstand tropical climate, tears of joy, and 16+ hours of wedding
                celebrations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Wand2,
                  title: "18-Hour Humidity-Proof Base",
                  desc: "HD silicone & water-resistant foundation formula that preserves skin texture in high-resolution 4K photography.",
                },
                {
                  icon: Sparkles,
                  title: "Precision Brow & Eye Architecture",
                  desc: "Feathered brow stroke mapping paired with custom multi-dimensional lash fans that complement your eye shape.",
                },
                {
                  icon: ShieldCheck,
                  title: "Regal Gele & Veil Crafting",
                  desc: "Structured pleating and bespoke crown placement for traditional engagement and white wedding royalty.",
                },
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl bg-white p-4.5 border border-plum/5 shadow-[0_4px_16px_rgba(82,58,77,0.03)] transition-all hover:border-plum/15 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-plum/5 text-plum">
                    <feat.icon className="h-5 w-5 text-lavender-deep" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum font-sans">{feat.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-plum/65">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-plum px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-[#FAF9F5] shadow-lg shadow-plum/20 transition-all hover:bg-lavender-deep hover:shadow-xl active:scale-[0.98]"
              >
                <span>Reserve Your Wedding Date</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
