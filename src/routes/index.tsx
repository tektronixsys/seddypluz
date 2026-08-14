import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Ruler,
  Gem,
  Scale,
  Scissors,
  Layers,
  ShoppingBag,
  Check,
  Menu,
  X,
  MessageCircle,
  Star,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkle,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { TransformationSlider } from "@/components/showcase/TransformationSlider";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { FaqSection } from "@/components/faq/FaqSection";
import { BookingSection } from "@/components/booking/BookingSection";
import { BoutiqueSection } from "@/components/boutique/BoutiqueSection";
import { HeroAccordionCarousel } from "@/components/hero/HeroAccordionCarousel";
import heroBride from "@/assets/hero-bride.jpg";
import artist from "@/assets/artist.jpg";
import glam1 from "@/assets/glam-1.jpg";
import gele1 from "@/assets/gele-1.jpg";
import bridalAfter from "@/assets/bridal_after.png";
import hairStraightImg from "@/assets/hair_straight.png";
import hairWaveImg from "@/assets/hair_wave.png";
import hairCurlImg from "@/assets/hair_curl.png";
import hairBobImg from "@/assets/hair_bob.png";
import lipstickImg from "@/assets/lipstick.png";
import highlighterImg from "@/assets/highlighter.png";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  {
    n: "01",
    name: "Bridal Makeup",
    desc: "Bespoke bridal artistry crafted for your once-in-a-lifetime moment.",
  },
  {
    n: "02",
    name: "Gele Styling",
    desc: "Sculptural headwrap artistry celebrating heritage with couture precision.",
  },
  {
    n: "03",
    name: "Professional Makeup",
    desc: "Signature glam for the woman who commands every room she enters.",
  },
  {
    n: "04",
    name: "Beauty Transformation",
    desc: "A studio experience that reveals the face you already carry within.",
  },
  {
    n: "05",
    name: "Beauty Training",
    desc: "Intimate masterclasses for artists shaping the next chapter of beauty.",
  },
  {
    n: "06",
    name: "Home Service Makeup",
    desc: "The studio, arrived — private, unhurried, entirely yours.",
  },
  {
    n: "07",
    name: "Photoshoot Makeup",
    desc: "Camera-luminous finishes tuned for editorial and campaign light.",
  },
  {
    n: "08",
    name: "Event Glam",
    desc: "Statement looks for galas, soirées, and every night worth remembering.",
  },
];

function Home() {
  const { totalCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Transformations", href: "#transformations" },
    { name: "Wigs & Shop", href: "/shop" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-xs"
            : "bg-transparent"
        }`}
      >
        {/* Announcements Widget */}
        {showPromo && (
          <div className="bg-plum text-[#FAF9F5] border-b border-plum/10 relative overflow-hidden flex items-center justify-between px-6 py-2.5 md:px-12 z-50">
            {/* Ambient sliding shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />

            <div className="flex-1 flex items-center justify-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold z-10 text-center">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span>
                Enjoy <strong className="text-amber-300 font-bold font-sans">20% OFF</strong> your
                first wig order + ALL beauty services
              </span>
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            </div>

            <button
              onClick={() => setShowPromo(false)}
              className="text-[#FAF9F5]/50 hover:text-[#FAF9F5]/90 transition-colors p-1 z-10 cursor-pointer"
              title="Close announcement"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4.5 md:px-12">
          <a
            href="#top"
            className="font-outfit text-[24px] leading-[32px] font-semibold not-italic tracking-tight text-plum transition-opacity hover:opacity-90 flex items-center gap-2"
          >
            <span>Seddypluz Beauty Studio</span>
          </a>

          {/* Streamlined Desktop Navigation Links */}
          <div className="hidden items-center gap-8 lg:gap-10 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs uppercase tracking-[0.28em] font-semibold text-plum/75 transition-colors hover:text-lavender-deep"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Button Group */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Bag Icon Button */}
            <button
              onClick={openCart}
              aria-label={`Open boutique bag, ${totalCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/70 text-plum backdrop-blur-md transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-plum shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Book CTA Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full border border-plum/30 bg-plum px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#FAF9F5] shadow-xs transition-all hover:bg-lavender-deep hover:border-lavender-deep"
            >
              Book Session
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/70 text-plum backdrop-blur-md transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer md:hidden shadow-xs"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-plum/10 bg-[#FAF9F5]/98 backdrop-blur-2xl px-6 py-6 shadow-2xl transition-all md:hidden animate-in slide-in-from-top-3 duration-300">
            <div className="flex flex-col space-y-3.5">
              {[
                { name: "Services Atelier", href: "#services" },
                { name: "Bridal Portfolio", href: "#portfolio" },
                { name: "Before & After Transformations", href: "#transformations" },
                { name: "The Studio Story", href: "#studio" },
                { name: "Cherished Bride Reviews", href: "#reviews" },
                { name: "Shop Wigs & Hair Products", href: "/shop" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-plum/8 pb-2.5 text-xs uppercase tracking-wider font-bold text-plum/85 hover:text-lavender-deep transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-plum/40">→</span>
                </a>
              ))}

              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-plum py-3.5 text-xs uppercase tracking-[0.24em] font-bold text-[#FAF9F5] shadow-md shadow-plum/20"
                >
                  <span>Book Consultation</span>
                </a>
                <a
                  href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-xs uppercase tracking-wider font-bold text-white shadow-md shadow-[#25D366]/20"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        {/* Dynamic ambient background blobs */}
        <div className="absolute inset-0 bg-[#FAF9F5]" />
        <div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-mauve/20 blur-3xl opacity-75 animate-pulse pointer-events-none"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-lavender/25 blur-3xl opacity-75 animate-pulse pointer-events-none"
          style={{ animationDuration: "12s" }}
        />

        {/* Fine-line grid pattern for luxury feel */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, var(--plum) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 pt-28 pb-10 md:grid-cols-12 md:gap-8 md:px-12 md:pt-36 md:pb-14 z-10 items-center">
          {/* Left Column: Headline, Trust & Conversion */}
          <div className="md:col-span-6 md:pt-4">
            {/* Live Availability & Studio Status Pill */}
            <div
              className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-plum/15 bg-white/80 backdrop-blur-md px-4 py-1.5 shadow-xs animate-float-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-plum">
                2026/2027 Bridal Calendar Open
              </span>
              <span className="hidden sm:inline text-plum/30">·</span>
              <span className="hidden sm:inline text-[11px] font-medium tracking-wide text-lavender-deep">
                Luxury Beauty Atelier
              </span>
            </div>

            {/* Editorial Title */}
            <h1
              className="mt-4 animate-float-up font-display text-[3.25rem] leading-[0.94] tracking-tight text-plum sm:text-[4.5rem] md:text-[5.25rem] lg:text-[5.75rem]"
              style={{ animationDelay: "0.2s" }}
            >
              Where the
              <br />
              <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-lavender-deep via-plum to-[#D4AF37] drop-shadow-xs">
                quiet art
              </span>
              <br />
              of beauty
              <br />
              becomes ritual.
            </h1>

            {/* Subtitle */}
            <p
              className="mt-5 max-w-xl animate-float-up text-base md:text-lg leading-relaxed text-plum/75"
              style={{ animationDelay: "0.35s" }}
            >
              Seddypluz Beauty Studio composes bespoke bridal artistry, sculptural gele mastery, and
              camera-calibrated glam for the woman who moves through the world with unforgettable
              presence.
            </p>

            {/* Micro Social Proof / Trust Strip */}
            <div
              className="mt-6 flex flex-wrap items-center gap-4 border-y border-plum/10 py-3.5 animate-float-up"
              style={{ animationDelay: "0.45s" }}
            >
              {/* Stacked Bride Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src={glam1}
                  alt="Seddypluz Bride"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src={bridalAfter}
                  alt="Seddypluz Bride"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src={gele1}
                  alt="Seddypluz Bride"
                />
              </div>

              {/* Star Rating & Text */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-plum">
                  5.0 Rated{" "}
                  <span className="font-normal text-plum/60">
                    (500+ Brides Styled Across Nigeria &amp; Diaspora)
                  </span>
                </span>
              </div>
            </div>

            {/* Action CTA Group */}
            <div
              className="mt-6 flex animate-float-up flex-wrap items-center gap-4 sm:gap-5"
              style={{ animationDelay: "0.55s" }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-plum bg-plum px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#FAF9F5] shadow-lg shadow-plum/20 transition-all duration-300 hover:bg-lavender-deep hover:border-lavender-deep hover:shadow-xl hover:shadow-lavender-deep/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Reserve a session</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-plum/20 bg-white/70 backdrop-blur-sm px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-plum shadow-xs transition-all duration-300 hover:bg-plum hover:text-[#FAF9F5] hover:border-plum active:scale-[0.98] cursor-pointer"
              >
                <span>View Portfolio</span>
                <span className="text-sm font-light">→</span>
              </a>

              <a
                href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20a%20bridal%20session."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Consultation"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition-colors p-2 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 fill-current text-[#25D366]" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            {/* Key Atelier Metrics Bar */}
            <div
              className="mt-8 grid grid-cols-3 gap-3 border-t border-plum/10 pt-5 animate-float-up max-w-lg"
              style={{ animationDelay: "0.65s" }}
            >
              <div>
                <span className="font-display text-2xl md:text-3xl font-bold text-plum">500+</span>
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5">
                  Brides Styled
                </p>
              </div>
              <div className="border-l border-plum/10 pl-3">
                <span className="font-display text-2xl md:text-3xl font-bold text-plum">10+</span>
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5">
                  Years Mastery
                </p>
              </div>
              <div className="border-l border-plum/10 pl-3">
                <span className="font-display text-2xl md:text-3xl font-bold text-plum">18H</span>
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5">
                  HD Base Wear
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Expanding & Contracting Editorial Lookbook Carousel */}
          <div className="relative md:col-span-6 flex items-center justify-center pt-4 lg:pt-0">
            <HeroAccordionCarousel />
          </div>
        </div>

        {/* Endless scrolling marquee for Featured In */}
        <div className="relative border-t border-plum/10 bg-white/50 backdrop-blur-md py-5 overflow-hidden z-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 flex items-center gap-8">
            <span className="eyebrow text-plum/50 shrink-0 select-none mr-4">Featured In</span>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
              <div className="flex gap-16 w-[200%] animate-marquee shrink-0">
                {/* Loop 1 */}
                <div className="flex justify-around shrink-0 gap-16">
                  {[
                    "Vogue Nigeria",
                    "Bella Naija Weddings",
                    "ThisDay Style",
                    "Genevieve",
                    "Bridal Ovation",
                    "Elite Dossier",
                    "Avenue Luxe",
                  ].map((n, idx) => (
                    <span
                      key={`f1-${idx}`}
                      className="font-display text-lg italic text-plum/60 whitespace-nowrap"
                    >
                      {n}
                    </span>
                  ))}
                </div>
                {/* Loop 2 (Identical for seamless loops) */}
                <div className="flex justify-around shrink-0 gap-16">
                  {[
                    "Vogue Nigeria",
                    "Bella Naija Weddings",
                    "ThisDay Style",
                    "Genevieve",
                    "Bridal Ovation",
                    "Elite Dossier",
                    "Avenue Luxe",
                  ].map((n, idx) => (
                    <span
                      key={`f2-${idx}`}
                      className="font-display text-lg italic text-plum/60 whitespace-nowrap"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-14 md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-lavender-deep">The Atelier</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-plum md:text-6xl">
                Services,
                <br />
                <em className="text-lavender-deep">rendered</em>
                <br /> with reverence.
              </h2>
              <p className="mt-5 max-w-sm text-plum/70 text-sm md:text-base">
                Eight signature offerings — each one a slow, considered practice. Booked by
                consultation only.
              </p>
            </div>

            <div className="md:col-span-8">
              <ul className="divide-y divide-plum/15 border-y border-plum/15">
                {services.map((s) => (
                  <li
                    key={s.n}
                    className="group grid grid-cols-12 items-baseline gap-4 py-5 md:py-6 transition-colors hover:bg-blush-soft/60"
                  >
                    <span className="col-span-2 font-display text-2xl italic text-lavender-deep/80 md:col-span-1">
                      {s.n}
                    </span>
                    <h3 className="col-span-10 font-display text-3xl text-plum md:col-span-4 md:text-4xl">
                      {s.name}
                    </h3>
                    <p className="col-span-12 text-sm leading-relaxed text-plum/65 md:col-span-6">
                      {s.desc}
                    </p>
                    <span className="col-span-12 flex justify-end text-plum/40 transition-all group-hover:translate-x-1 group-hover:text-lavender-deep md:col-span-1">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GALLERY */}
      <PortfolioGallery />

      {/* BEFORE & AFTER TRANSFORMATIONS */}
      <TransformationSlider />

      {/* STUDIO / ABOUT */}
      <section id="studio" className="relative py-14 md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-6">
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{ boxShadow: "var(--shadow-bloom)" }}
              >
                <img
                  src={artist}
                  alt="Seddypluz at work"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-6 md:pl-8">
              <p className="eyebrow text-lavender-deep">The Studio</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-plum md:text-5xl">
                <em>Seddypluz</em> — a hand
                <br />
                that reads the face
                <br />
                like a letter.
              </h2>
              <div className="mt-6 space-y-4 text-plum/75">
                <p className="text-base leading-relaxed">
                  Founded on the belief that beauty is a slow conversation between skin, light, and
                  story — Seddypluz Beauty Studio has painted hundreds of brides and campaigns
                  across Lagos, Abuja, and beyond.
                </p>
                <p className="text-base leading-relaxed">
                  Every session begins with silence, coffee, and a mirror. What follows is not a
                  look, but a portrait.
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-3 border-t border-plum/15">
                {[
                  { k: "10+", v: "Years" },
                  { k: "500+", v: "Brides" },
                  { k: "40+", v: "Editorial" },
                ].map((s) => (
                  <div key={s.v} className="border-r border-plum/15 py-4 last:border-r-0">
                    <dt className="font-display text-4xl italic text-lavender-deep md:text-5xl">
                      {s.k}
                    </dt>
                    <dd className="eyebrow mt-2 text-plum/60">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel />

      {/* BOUTIQUE / PRODUCTS */}
      <BoutiqueSection limit={3} />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* BOOKING / CONTACT */}
      <BookingSection />

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-plum/10 bg-gradient-to-b from-[#FAF9F5] to-blush-soft/30">
        <div className="mx-auto max-w-[1600px] px-6 pt-12 pb-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <p className="font-outfit text-[28px] leading-[36px] font-semibold text-plum">
                Seddypluz Beauty Studio
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-plum/60">
                Where artistry meets elegance — crafting bespoke beauty experiences for brides,
                campaigns, and editorial moments that live forever.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 md:col-start-7">
              <p className="eyebrow mb-5 text-lavender-deep">Navigation</p>
              <ul className="space-y-3">
                <li>
                  <a href="#top" className="text-sm text-plum/60 transition-colors hover:text-plum">
                    Studio Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-sm text-plum/60 transition-colors hover:text-plum"
                  >
                    Services Atelier
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    className="text-sm text-plum/60 transition-colors hover:text-plum"
                  >
                    Bridal Portfolio
                  </a>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="text-sm font-bold text-plum transition-colors hover:text-lavender-deep"
                  >
                    Shop Wigs &amp; Hair Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm text-plum/60 transition-colors hover:text-plum"
                  >
                    Book a Consultation
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="md:col-span-3">
              <p className="eyebrow mb-5 text-lavender-deep">Concierge</p>
              <ul className="space-y-3 text-sm text-plum/60">
                <li>Lagos &amp; Abuja Studio Sessions</li>
                <li>Worldwide DHL Express Shipping</li>
                <li>
                  <a
                    href="https://instagram.com/seddypluz_wigs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lavender-deep transition-colors"
                  >
                    @seddypluz_wigs
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/2348162292997"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
                  >
                    +234 816 229 2997
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-plum/10 pt-6 text-xs text-plum/50 md:flex-row">
            <p>© {new Date().getFullYear()} Seddypluz Beauty Studio. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Crafted with</span>
              <Sparkle className="h-3 w-3 text-lavender-deep" />
              <span>for the modern bride</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20a%20session."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:w-48 hover:bg-[#20ba5a] hover:shadow-xl md:bottom-8 md:right-8"
        style={{ boxShadow: "0 8px 30px rgba(37, 211, 102, 0.3)" }}
      >
        <div className="flex items-center justify-center gap-2 px-4">
          <svg
            className="h-6 w-6 shrink-0 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wider transition-all duration-300 group-hover:max-w-xs">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </div>
  );
}
