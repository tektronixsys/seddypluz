import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Trophy,
  Sparkles,
} from "lucide-react";
import heroBride from "@/assets/hero-bride.jpg";
import glam1 from "@/assets/glam-1.jpg";
import gele1 from "@/assets/gele-1.jpg";
import eventGlam from "@/assets/event-glam.jpg";
import photoshoot from "@/assets/photoshoot.jpg";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  event: string;
  location: string;
  date: string;
  rating: number;
  avatar: string;
  quote: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Adesewa Olayinka-Bello",
    role: "Bride",
    event: "Traditional & White Wedding",
    location: "Victoria Island, Lagos",
    date: "December 2025",
    rating: 5,
    avatar: heroBride,
    quote:
      "Seddypluz was the greatest decision of my wedding journey. From our initial 6 AM skin consultation to the final dance at 2 AM, my bridal glam remained 100% intact with zero creasing or oiliness under Lagos humidity. She gave me a look that made my husband tear up when I walked down the aisle.",
    highlight: "18-Hour Flawless Durability",
  },
  {
    id: "t2",
    name: "Chief (Mrs.) Folashade Adeleke",
    role: "Mother of the Bride & Matron",
    event: "Royal Traditional Engagement",
    location: "Abuja FCT",
    date: "January 2026",
    rating: 5,
    avatar: gele1,
    quote:
      "The infinity pleat gele artistry is world-class. Seddypluz structured my Aso-Oke crown so effortlessly that it stayed comfortable and regal throughout the 8-hour celebration. The respect, punctuality, and serenity she brings to a chaotic wedding morning is unmatched.",
    highlight: "Architectural Gele Precision",
  },
  {
    id: "t3",
    name: "Zainab Al-Hassan",
    role: "Editorial Fashion Director",
    event: "Mercedes-Benz Fashion Week & Gala",
    location: "Eko Atlantic, Lagos",
    date: "November 2025",
    rating: 5,
    avatar: glam1,
    quote:
      "Working with Seddypluz on high-definition editorial campaigns is pure poetry. Her grasp of lighting, skin undertones, and texture allows photographers to shoot straight out of camera without needing hours of retouching. A master of subtle luxury.",
    highlight: "High-Definition 4K Ready",
  },
  {
    id: "t4",
    name: "Chioma Ekwueme-Davies",
    role: "Destination Bride",
    event: "Destination Luxury Wedding",
    location: "Zanzibar & Port Harcourt",
    date: "February 2026",
    rating: 5,
    avatar: eventGlam,
    quote:
      "She travelled with us to Zanzibar and created three distinct looks for our welcome dinner, white beach ceremony, and traditional reception. Every single look was breathtaking and tailored to the coastal breeze. Truly five-star atelier service.",
    highlight: "Seamless Destination Artistry",
  },
  {
    id: "t5",
    name: "Temitope Balogun",
    role: "Boutique VIP Client",
    event: 'Custom 26" Bone Straight Wig & Installation',
    location: "Ikoyi, Lagos",
    date: "January 2026",
    rating: 5,
    avatar: photoshoot,
    quote:
      'I ordered the 26" Bone Straight luxury weave from the boutique and had it installed in the studio. The hair is silky, thick from root to tip with zero shedding after washing. The HD lace melting is completely undetectable even up close!',
    highlight: "Undetectable HD Lace Melting",
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="reviews" className="relative py-14 md:py-24 bg-white overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blush-soft/80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-mauve/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-plum/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lavender-deep mb-3 border border-plum/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Verified Bride &amp; Client Stories</span>
          </div>
          <h2 className="font-display text-5xl leading-[1.05] text-plum md:text-7xl">
            Words from our <br />
            <em className="text-lavender-deep">Cherished Brides.</em>
          </h2>
          <p className="mt-4 text-sm md:text-base text-plum/70">
            Discover why hundreds of discerning brides and editorial commissioners trust Seddypluz
            for their defining celebrations.
          </p>
        </div>

        {/* Testimonial Card Display */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto rounded-[3rem] bg-[#FAF9F5] p-8 sm:p-12 md:p-16 border border-plum/10 shadow-[0_20px_50px_-15px_rgba(82,58,77,0.08)] transition-all"
        >
          {/* Top Row: Quote mark & Rating */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-1.5 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-xs font-bold text-plum/70 uppercase tracking-widest">
                5.0 Verified Artistry
              </span>
            </div>
            <span className="rounded-full bg-plum/10 px-3.5 py-1 text-[11px] font-bold text-plum uppercase tracking-wider">
              {current.highlight}
            </span>
          </div>

          {/* Quote Body */}
          <blockquote className="relative">
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl leading-relaxed text-plum/90">
              "{current.quote}"
            </p>
          </blockquote>

          {/* Author & Event Info Row */}
          <div className="mt-10 pt-8 border-t border-plum/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
              </div>
              <div>
                <h4 className="font-sans font-bold text-lg text-plum flex items-center gap-2">
                  <span>{current.name}</span>
                </h4>
                <p className="text-xs text-lavender-deep font-semibold tracking-wider uppercase">
                  {current.role} · {current.event}
                </p>
                <p className="text-[11px] text-plum/50 mt-0.5">
                  {current.location} · {current.date}
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 bg-white text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 bg-white text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Pagination Dot Track */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-8 bg-plum" : "w-2 bg-plum/20 hover:bg-plum/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Studio Trust Metrics Badges */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[
            {
              icon: HeartHandshake,
              number: "500+",
              label: "Brides Celebrated",
              sub: "Lagos, Abuja & Abroad",
            },
            { icon: Trophy, number: "10+", label: "Years of Craft", sub: "Masterclass Certified" },
            {
              icon: ShieldCheck,
              number: "100%",
              label: "On-Time Arrival Record",
              sub: "Stress-Free Mornings",
            },
            {
              icon: Sparkles,
              number: "5.0 ★",
              label: "Client Satisfaction",
              sub: "Over 200+ Reviews",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#FAF9F5] border border-plum/5 shadow-xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-plum/5 text-plum mb-3">
                <stat.icon className="h-6 w-6 text-lavender-deep" />
              </div>
              <span className="font-display text-3xl font-bold text-plum">{stat.number}</span>
              <span className="text-xs uppercase tracking-wider font-bold text-plum/80 mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-plum/50 mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
