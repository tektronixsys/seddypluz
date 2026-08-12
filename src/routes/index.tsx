import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Ruler,
  Gem,
  Scale,
  Scissors,
  Layers,
  Heart,
  ShoppingBag,
  Check,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { TransformationSlider } from "@/components/showcase/TransformationSlider";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { FaqSection } from "@/components/faq/FaqSection";
import { BookingSection } from "@/components/booking/BookingSection";
import heroBride from "@/assets/hero-bride.jpg";
import artist from "@/assets/artist.jpg";
import hairStraightImg from "@/assets/hair_straight.png";
import hairWaveImg from "@/assets/hair_wave.png";
import hairCurlImg from "@/assets/hair_curl.png";
import hairBobImg from "@/assets/hair_bob.png";
import lipstickImg from "@/assets/lipstick.png";
import highlighterImg from "@/assets/highlighter.png";

export const Route = createFileRoute("/")({
  component: Home,
});

interface ProductDot {
  color: string;
  name: string;
}

interface ProductSpec {
  icon: LucideIcon;
  label: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  img: string;
  price: string;
  bgClass: string;
  dots: ProductDot[];
  specs: ProductSpec[];
}

const shopProducts: Product[] = [
  {
    id: "hair_straight",
    name: "Bone Straight Weave",
    category: "Luxury Extensions",
    desc: "Premium double-drawn bone straight hair extensions with a mirror-like gloss finish and complete cuticle alignment.",
    img: hairStraightImg,
    price: "₦280,000",
    bgClass: "bg-[#F7EBE8]",
    dots: [
      { color: "#121212", name: "22 Inch" },
      { color: "#1C1C1C", name: "24 Inch" },
      { color: "#2B2B2B", name: "26 Inch" },
    ],
    specs: [
      { icon: Sparkles, label: "Double Drawn" },
      { icon: Ruler, label: '22-26"' },
      { icon: Gem, label: "Virgin Remy" },
      { icon: Scale, label: "300g Full" },
    ],
  },
  {
    id: "hair_wave",
    name: "Water Wave Curls",
    category: "Luxury Extensions",
    desc: "Deeply defined water wave curls that hold their shape effortlessly, offering a lush, natural-volume wet look.",
    img: hairWaveImg,
    price: "₦310,000",
    bgClass: "bg-[#EAE4F8]",
    dots: [
      { color: "#121212", name: "20 Inch" },
      { color: "#1C1C1C", name: "22 Inch" },
      { color: "#2B2B2B", name: "24 Inch" },
    ],
    specs: [
      { icon: Layers, label: "Defined Waves" },
      { icon: Ruler, label: '20-24"' },
      { icon: Gem, label: "12A Grade" },
      { icon: Scale, label: "300g Full" },
    ],
  },
  {
    id: "hair_curl",
    name: "Pixie Bouncy Curl",
    category: "Luxury Extensions",
    desc: "A bouncy, high-definition pixie curl wig style featuring short, tight ringlets that are full of life and texture.",
    img: hairCurlImg,
    price: "₦195,000",
    bgClass: "bg-[#FAF7F2]",
    dots: [
      { color: "#121212", name: "12 Inch" },
      { color: "#1C1C1C", name: "14 Inch" },
      { color: "#2B2B2B", name: "16 Inch" },
    ],
    specs: [
      { icon: Sparkles, label: "HD Curls" },
      { icon: Ruler, label: '12-16"' },
      { icon: Gem, label: "HD Lace" },
      { icon: Scale, label: "250g Dense" },
    ],
  },
  {
    id: "hair_bob",
    name: "Blonde Bob Cut",
    category: "Luxury Extensions",
    desc: "A chic, precisely cut blonde bob wig offering a natural hairline, premium thickness, and a sophisticated silhouette.",
    img: hairBobImg,
    price: "₦210,000",
    bgClass: "bg-[#FAF7F2]",
    dots: [
      { color: "#EED7A1", name: "Blonde" },
      { color: "#1C1C1C", name: "Black" },
      { color: "#5C4033", name: "Brunette" },
    ],
    specs: [
      { icon: Scissors, label: "Bob Cut" },
      { icon: Ruler, label: '12-14"' },
      { icon: Gem, label: "Swiss Lace" },
      { icon: Scale, label: "200g Dense" },
    ],
  },
  {
    id: "atelier_lip_elixir",
    name: "Atelier Velvet Lip Elixir",
    category: "Signature Cosmetics",
    desc: "Weightless 16-hour matte liquid velvet lip pigments formulated for high-definition bridal longevity and non-drying hydration.",
    img: lipstickImg,
    price: "₦38,000",
    bgClass: "bg-[#FBECEB]",
    dots: [
      { color: "#800020", name: "Royal Plum" },
      { color: "#C04000", name: "Spiced Terracotta" },
      { color: "#C27B7F", name: "Bridal Rose" },
    ],
    specs: [
      { icon: Sparkles, label: "16h Longwear" },
      { icon: Heart, label: "Hydrating" },
      { icon: Gem, label: "Smudge Proof" },
      { icon: Layers, label: "Matte Velvet" },
    ],
  },
  {
    id: "diamond_glow_highlighter",
    name: "Diamond Glow Illuminator",
    category: "Signature Cosmetics",
    desc: "Ultra-fine baked mineral highlighter infused with pearl micro-pigments for an ethereal, sunlit bridal radiance that glows in any lighting.",
    img: highlighterImg,
    price: "₦55,000",
    bgClass: "bg-[#FFF8E7]",
    dots: [
      { color: "#EED7A1", name: "Champagne" },
      { color: "#D4AF37", name: "Royal Bronze" },
      { color: "#E8C39E", name: "Rose Gold" },
    ],
    specs: [
      { icon: Sparkles, label: "Micro-Pearls" },
      { icon: Gem, label: "Baked Mineral" },
      { icon: Layers, label: "Silky Velvet" },
      { icon: Scale, label: "All Skin Tones" },
    ],
  },
];

function ProductCard({ p }: { p: Product }) {
  const [selectedColor, setSelectedColor] = useState(p.dots[0].name);
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const numericPrice = parseInt(p.price.replace(/[^\d]/g, ""), 10) || 0;
    addItem({
      productId: p.id,
      name: p.name,
      category: p.category,
      variant: selectedColor,
      priceNum: numericPrice,
      priceFormatted: p.price,
      img: p.img,
    });
    setAdded(true);
    toast.success(`${p.name} (${selectedColor}) added to bag!`, {
      description: `${p.price} · Ready for inquiry & WhatsApp checkout`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (nextState) {
      toast.success(`Saved to wishlist: ${p.name}`);
    } else {
      toast.info(`Removed from wishlist: ${p.name}`);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-[2.5rem] bg-white p-5 border border-plum/5 shadow-[0_16px_36px_-12px_rgba(82,58,77,0.08)] transition-all duration-300 hover:shadow-[0_24px_48px_-12px_rgba(82,58,77,0.14)] hover:-translate-y-1">
      <div>
        {/* Top Image area */}
        <div
          className={`relative w-full h-[320px] ${p.bgClass} rounded-3xl rounded-bl-[5rem] overflow-hidden transition-colors duration-500`}
        >
          {/* Category Tag pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center rounded-full bg-white/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-plum backdrop-blur-md border border-white/50 shadow-xs">
              {p.category}
            </span>
          </div>

          {/* White Cutout Cart Button */}
          <div className="absolute top-0 right-0 h-16 w-16 bg-white rounded-bl-3xl flex items-center justify-center z-10">
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${p.name} to cart`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF9F5] text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {/* Active Dot Badge */}
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>
          </div>

          {/* Product Image */}
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Color / Length selectors */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-10 px-4">
            <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-3 py-1.5 border border-white/60 shadow-xs">
              {p.dots.map((dot) => (
                <button
                  key={dot.name}
                  onClick={() => setSelectedColor(dot.name)}
                  aria-label={`Select ${dot.name}`}
                  className="flex items-center gap-1.5 group/dot cursor-pointer transition-transform"
                >
                  <span
                    className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === dot.name
                        ? "border-plum scale-110 ring-2 ring-plum/20"
                        : "border-white/80 scale-90 opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: dot.color }}
                  />
                  {selectedColor === dot.name && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-plum">
                      {dot.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="px-2 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-sans font-bold text-2xl tracking-tight text-plum">{p.name}</h3>
              <p className="text-xs uppercase tracking-wider text-lavender-deep font-semibold mt-1">
                Selected: <span className="text-plum font-bold">{selectedColor}</span>
              </p>
            </div>
            {/* Heart / Wishlist Button */}
            <button
              onClick={handleToggleFavorite}
              aria-label={
                isFavorite ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`
              }
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90 cursor-pointer ${
                isFavorite
                  ? "bg-rose-500 text-white shadow-[0_4px_14px_rgba(244,63,94,0.35)] scale-105"
                  : "bg-amber-400 text-white shadow-[0_4px_12px_rgba(251,191,36,0.3)] hover:scale-110"
              }`}
            >
              <Heart
                className={`h-5 w-5 transition-transform ${isFavorite ? "fill-current scale-110" : ""}`}
              />
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-plum/65">{p.desc}</p>

          {/* Specs badges with Lucide vector SVGs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {p.specs.map((spec, i) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-xl bg-plum/[0.04] border border-plum/10 px-3 py-1.5 text-xs text-plum/85 font-medium transition-colors hover:bg-plum/[0.08]"
                >
                  <IconComp className="h-3.5 w-3.5 text-lavender-deep shrink-0" />
                  <span>{spec.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price & CTA bar */}
      <div className="mt-8 px-2 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-plum/50">
            Price
          </span>
          <span className="text-2xl font-bold text-plum font-sans">{p.price}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-2 rounded-tl-2xl rounded-br-2xl px-6 py-3.5 text-xs uppercase tracking-widest font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-amber-400 text-plum hover:bg-plum hover:text-[#FAF9F5]"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

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
    { name: "Boutique", href: "#boutique" },
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
                Get <strong className="text-amber-300 font-bold font-sans">50% off</strong> (up to
                ₦200,000) your first Luxury wig order and{" "}
                <strong className="text-amber-300 font-bold font-sans">20% off</strong> installation
                & services.
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
                { name: "Boutique Wigs & Catalog", href: "#boutique" },
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
      <section id="top" className="relative min-h-screen overflow-hidden">
        {/* Dynamic ambient background blobs */}
        <div className="absolute inset-0 bg-[#FAF9F5]" />
        <div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-mauve/20 blur-3xl opacity-75 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-lavender/25 blur-3xl opacity-75 animate-pulse"
          style={{ animationDuration: "12s" }}
        />

        {/* Fine-line grid pattern for luxury feel */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, var(--plum) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 pt-32 pb-16 md:grid-cols-12 md:gap-8 md:px-12 md:pt-40 md:pb-24 z-10">
          <div className="md:col-span-6 md:pt-16">
            <div
              className="inline-flex items-center gap-2 animate-float-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <p className="eyebrow text-lavender-deep">— Est. Luxury Beauty Atelier</p>
            </div>
            <h1
              className="mt-8 animate-float-up font-display text-[3.5rem] leading-[0.95] tracking-tight text-plum md:text-[6.5rem]"
              style={{ animationDelay: "0.25s" }}
            >
              Where the
              <br />
              <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-lavender-deep via-plum to-[#D4AF37] drop-shadow-sm">
                quiet art
              </span>
              <br />
              of beauty
              <br />
              becomes ritual.
            </h1>
            <p
              className="mt-10 max-w-md animate-float-up text-base leading-relaxed text-plum/70"
              style={{ animationDelay: "0.4s" }}
            >
              Seddypluz Beauty Studio composes bespoke bridal, editorial, and transformative
              artistry for the woman who moves through the world with intention.
            </p>
            <div
              className="mt-10 flex animate-float-up flex-wrap items-center gap-8"
              style={{ animationDelay: "0.55s" }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-plum bg-plum px-8 py-4 text-xs uppercase tracking-[0.32em] text-ivory transition-all hover:bg-transparent hover:text-plum hover:shadow-[0_10px_30px_rgba(82,58,77,0.1)] active:scale-[0.98] duration-300"
              >
                Reserve a session
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#portfolio"
                className="group text-xs uppercase tracking-[0.32em] text-plum/70 flex flex-col items-start gap-1 transition-colors hover:text-plum"
              >
                View the portfolio
                <span className="h-[1px] w-8 bg-plum/40 transition-all duration-300 group-hover:w-full group-hover:bg-plum" />
              </a>
            </div>
          </div>

          <div className="relative md:col-span-6 flex items-center justify-center">
            {/* Glassmorphic border container */}
            <div className="relative aspect-[4/5] w-full max-w-[500px] animate-veil-in overflow-hidden rounded-[2.5rem] p-3 bg-white/30 backdrop-blur-md border border-plum/15 shadow-[0_30px_100px_rgba(82,58,77,0.12)]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                <img
                  src={heroBride}
                  alt="Seddypluz Beauty Studio bridal editorial"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover transition-transform duration-[4000ms] hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory">
                  <div>
                    <p className="eyebrow opacity-80">Featured · Vol. IV</p>
                    <p className="mt-2 font-display text-2xl italic">Her Royal Moment</p>
                  </div>
                  <span className="font-display text-4xl italic">01</span>
                </div>
              </div>
            </div>

            {/* Vol IV circular badge overlay */}
            <div className="absolute -left-6 -top-6 hidden md:block z-10">
              <div className="animate-shimmer flex h-24 w-24 flex-col items-center justify-center rounded-full border border-lavender-deep/30 bg-white/80 backdrop-blur-md text-plum shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-lavender-deep">
                  Vol
                </span>
                <span className="font-display text-xl italic font-semibold mt-0.5">IV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Endless scrolling marquee for Featured In */}
        <div className="relative border-t border-plum/10 bg-white/40 backdrop-blur-sm py-6 overflow-hidden z-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 flex items-center gap-8">
            <span className="eyebrow text-plum/50 shrink-0 select-none mr-4">Featured In</span>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
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
      <section id="services" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-lavender-deep">The Atelier</p>
              <h2 className="mt-6 font-display text-5xl leading-[1] text-plum md:text-7xl">
                Services,
                <br />
                <em className="text-lavender-deep">rendered</em>
                <br /> with reverence.
              </h2>
              <p className="mt-8 max-w-sm text-plum/70">
                Eight signature offerings — each one a slow, considered practice. Booked by
                consultation only.
              </p>
            </div>

            <div className="md:col-span-8">
              <ul className="divide-y divide-plum/15 border-y border-plum/15">
                {services.map((s) => (
                  <li
                    key={s.n}
                    className="group grid grid-cols-12 items-baseline gap-4 py-8 transition-colors hover:bg-blush-soft/60"
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
      <section id="studio" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
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

            <div className="md:col-span-6 md:pl-12">
              <p className="eyebrow text-lavender-deep">The Studio</p>
              <h2 className="mt-6 font-display text-5xl leading-[1] text-plum md:text-6xl">
                <em>Seddypluz</em> — a hand
                <br />
                that reads the face
                <br />
                like a letter.
              </h2>
              <div className="mt-10 space-y-6 text-plum/75">
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

              <dl className="mt-12 grid grid-cols-3 border-t border-plum/15">
                {[
                  { k: "10+", v: "Years" },
                  { k: "500+", v: "Brides" },
                  { k: "40+", v: "Editorial" },
                ].map((s) => (
                  <div key={s.v} className="border-r border-plum/15 py-6 last:border-r-0">
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
      <section id="boutique" className="py-28 md:py-40 bg-[#FAF9F5]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-lavender-deep">Boutique</p>
              <h2 className="mt-6 font-display text-5xl leading-[1.1] text-plum md:text-6xl">
                Signature <em className="text-lavender-deep">atelier products.</em>
              </h2>
            </div>
            <div className="flex flex-col gap-4 max-w-xl">
              <p className="text-sm md:text-base leading-relaxed text-plum/70 lg:text-right">
                Curated cosmetic formulas and tools, designed to preserve the luxury skin finish of
                the studio.
              </p>
              {/* Boutique Social channels */}
              <div className="flex flex-wrap items-center gap-3 lg:justify-end mt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-plum/50">
                  Explore custom wigs &amp; drops:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com/seddypluz_wigs"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Shop wigs on Instagram @seddypluz_wigs"
                    className="group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm"
                  >
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="text-[11px] font-bold tracking-wide">@seddypluz_wigs</span>
                  </a>
                  <a
                    href="https://tiktok.com/@seddypluz_wigs"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Shop wigs on TikTok @seddypluz_wigs"
                    className="group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm"
                  >
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.3 8.3 0 004.76 1.49V7.09a4.84 4.84 0 01-1-.4z" />
                    </svg>
                    <span className="text-[11px] font-bold tracking-wide">@seddypluz_wigs</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {shopProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* BOOKING / CONTACT */}
      <BookingSection />

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-plum/10 bg-gradient-to-b from-background to-blush-soft/30">
        {/* Decorative top gradient line */}
        <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-lavender-deep/40 to-transparent" />

        <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-8 md:px-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <p className="font-outfit text-[28px] leading-[36px] font-semibold text-plum">
                Seddypluz Beauty Studio
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-plum/60">
                Where artistry meets elegance — crafting bespoke beauty experiences for brides,
                campaigns, and editorial moments that live forever.
              </p>

              {/* Social Media */}
              <div className="mt-8 flex items-center gap-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com/seddypluz_wigs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram @seddypluz_wigs"
                  className="group flex items-center gap-2.5 rounded-full border border-plum/10 bg-white/60 px-4 py-2.5 text-plum/70 transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-md"
                >
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="text-xs font-medium tracking-wide">@seddypluz_wigs</span>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@seddypluz_wigs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok @seddypluz_wigs"
                  className="group flex items-center gap-2.5 rounded-full border border-plum/10 bg-white/60 px-4 py-2.5 text-plum/70 transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-md"
                >
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.3 8.3 0 004.76 1.49V7.09a4.84 4.84 0 01-1-.4z" />
                  </svg>
                  <span className="text-xs font-medium tracking-wide">@seddypluz_wigs</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 md:col-start-7">
              <p className="eyebrow mb-5 text-lavender-deep">Quick Links</p>
              <ul className="space-y-3">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Portfolio", href: "#portfolio" },
                  { label: "Transformations", href: "#transformations" },
                  { label: "Boutique", href: "#boutique" },
                  { label: "Book a Session", href: "#booking" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-plum/60 transition-colors duration-200 hover:text-plum"
                    >
                      <span className="inline-block h-px w-3 bg-plum/20 transition-all duration-300 group-hover:w-5 group-hover:bg-lavender-deep" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <p className="eyebrow mb-5 text-lavender-deep">Get in Touch</p>
              <div className="space-y-3 text-sm text-plum/60">
                <a
                  href="https://wa.me/2348162292997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-plum"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp Us
                </a>
                <p className="flex items-center gap-2">
                  <Heart className="h-4 w-4 shrink-0" />
                  Kaduna, Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14">
            <div className="h-px bg-gradient-to-r from-transparent via-plum/10 to-transparent" />
            <div className="flex flex-col items-center justify-between gap-3 pt-6 md:flex-row">
              <p className="text-xs tracking-wider text-plum/40">
                © {new Date().getFullYear()} Seddypluz Beauty Studio · All artistry reserved
              </p>
              <p className="text-xs text-plum/30">
                Crafted with <span className="text-lavender-deep/60">♥</span> for beauty
              </p>
            </div>
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
