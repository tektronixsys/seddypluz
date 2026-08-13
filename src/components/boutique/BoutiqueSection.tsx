import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { boutiqueProducts } from "./data";
import type { Product } from "./types";
import { ProductQuickViewModal } from "./ProductQuickViewModal";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  Check,
  Eye,
  Copy,
  CheckCheck,
  ShieldCheck,
  Truck,
  Sparkle,
  Crown,
  Scissors,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

export function BoutiqueSection() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | "wigs" | "cosmetics" | "bestseller">("all");
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Per-product selected variant state
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    boutiqueProducts.forEach((p) => {
      if (p.dots.length > 0) {
        initial[p.id] = p.dots[0].name;
      }
    });
    return initial;
  });

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText("SEDDY20");
    setCopiedCode(true);
    toast.success("Promo code SEDDY20 copied!", {
      description: "Enjoy 20% OFF your first wig order + all studio beauty services.",
    });
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      const product = boutiqueProducts.find((p) => p.id === productId);
      if (next.has(productId)) {
        next.delete(productId);
        toast.info(`Removed ${product?.name || "item"} from wishlist`);
      } else {
        next.add(productId);
        toast.success(`Saved to wishlist: ${product?.name || "item"}`);
      }
      return next;
    });
  };

  const handleSelectVariant = (productId: string, variantName: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantName,
    }));
  };

  const handleAddToCart = (product: Product) => {
    const currentVariantName = selectedVariants[product.id] || product.dots[0]?.name || "Standard";
    const currentDot = product.dots.find((d) => d.name === currentVariantName) || product.dots[0];
    const priceNum = currentDot?.numericPrice || product.numericPrice;
    const priceFormatted = currentDot?.priceFormatted || product.price;

    addItem({
      productId: product.id,
      name: product.name,
      category: product.categoryLabel,
      variant: currentVariantName,
      priceNum,
      priceFormatted,
      img: product.img,
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    toast.success(`${product.name} (${currentVariantName}) added to bag!`, {
      description: `${priceFormatted} · WhatsApp checkout ready anytime`,
    });

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  // Filter products
  const filteredProducts = boutiqueProducts.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "wigs") return p.category === "wigs";
    if (activeCategory === "cosmetics") return p.category === "cosmetics";
    if (activeCategory === "bestseller") return !!p.isBestseller;
    return true;
  });

  const categories = [
    { id: "all", label: "All Atelier", count: boutiqueProducts.length },
    {
      id: "wigs",
      label: "Luxury Wigs & Extensions",
      count: boutiqueProducts.filter((p) => p.category === "wigs").length,
    },
    {
      id: "cosmetics",
      label: "Signature Cosmetics & Tools",
      count: boutiqueProducts.filter((p) => p.category === "cosmetics").length,
    },
    {
      id: "bestseller",
      label: "Studio Bestsellers",
      count: boutiqueProducts.filter((p) => p.isBestseller).length,
    },
  ] as const;

  return (
    <section id="boutique" className="relative py-16 md:py-24 bg-[#FAF9F5] overflow-hidden">
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-1/4 -right-40 h-96 w-96 rounded-full bg-mauve/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 h-96 w-96 rounded-full bg-lavender/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/80 backdrop-blur-md px-3.5 py-1 mb-3">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span className="eyebrow text-plum font-semibold tracking-widest text-[10px]">
                Atelier Boutique &amp; Wigs
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.08] text-plum sm:text-5xl md:text-6xl">
              Signature <em className="text-lavender-deep font-normal italic">atelier pieces.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-xl">
            <p className="text-sm md:text-base leading-relaxed text-plum/70 lg:text-right">
              Crafted from 100% cuticle-aligned raw virgin hair and dermatologist-calibrated bridal
              formulas, designed to preserve the luminous finish of the studio.
            </p>

            {/* Boutique Social channels */}
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-plum/50">
                Explore custom drops:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/seddypluz_wigs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shop wigs on Instagram @seddypluz_wigs"
                  className="group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3.5 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm"
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
                  className="group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3.5 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm"
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

        {/* 20% OFF Voucher Banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-plum via-[#684a62] to-plum text-[#FAF9F5] p-4 md:p-5 shadow-lg shadow-plum/15 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />

          <div className="flex items-center gap-3.5 z-10 text-center sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-amber-300">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-300 border border-amber-300/30">
                  Exclusive Promo
                </span>
                <span className="text-xs font-semibold text-[#FAF9F5]/80">Limited-Time Offer</span>
              </div>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#FAF9F5]">
                Enjoy <strong className="text-amber-300 font-bold font-sans">20% OFF</strong> your
                first wig order + ALL beauty &amp; bridal installation services!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 z-10 shrink-0">
            <button
              onClick={handleCopyVoucher}
              className="flex items-center gap-2 rounded-xl bg-white text-plum px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-amber-300 hover:text-plum active:scale-95 cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <CheckCheck className="h-4 w-4 text-emerald-600" />
                  <span>Copied (SEDDY20)</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-lavender-deep" />
                  <span>Copy Code: <strong>SEDDY20</strong></span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-plum/10 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 scale-102"
                      : "bg-white/70 text-plum/70 hover:bg-white hover:text-plum border border-plum/10"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      isActive ? "bg-amber-400 text-plum" : "bg-plum/10 text-plum/70"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline-block text-xs font-semibold text-plum/50">
            Showing {filteredProducts.length} of {boutiqueProducts.length} items
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => {
            const isWishlisted = wishlistedIds.has(p.id);
            const currentVariant = selectedVariants[p.id] || p.dots[0]?.name || "Standard";
            const currentDot = p.dots.find((d) => d.name === currentVariant) || p.dots[0];
            const activePriceFormatted = currentDot?.priceFormatted || p.price;
            const isAdded = !!addedIds[p.id];

            return (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between rounded-[2.2rem] bg-white p-5 border border-plum/10 shadow-[0_16px_36px_-12px_rgba(82,58,77,0.06)] transition-all duration-400 hover:shadow-[0_24px_50px_rgba(82,58,77,0.12)] hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Image Box */}
                  <div
                    className={`relative w-full h-[320px] ${p.bgClass} rounded-3xl overflow-hidden transition-colors duration-500 flex items-center justify-center`}
                  >
                    {/* Ambient Lighting Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/15 via-transparent to-white/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-plum border border-white/60 shadow-xs">
                        <Sparkle className="h-3 w-3 text-lavender-deep" />
                        {p.category === "wigs" ? "Luxury Wig" : "Cosmetics"}
                      </span>
                      {p.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-plum/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#FAF9F5] shadow-xs">
                          <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                          {p.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => handleToggleWishlist(p.id)}
                      aria-label={isWishlisted ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                      className={`absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 active:scale-90 cursor-pointer ${
                        isWishlisted
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/35 scale-105"
                          : "bg-white/80 text-plum/70 hover:bg-white hover:text-plum shadow-xs"
                      }`}
                    >
                      <Heart className={`h-4.5 w-4.5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>

                    {/* Product Image */}
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    />

                    {/* Quick View Hover Pill (Desktop + Mobile) */}
                    <div className="absolute inset-x-0 bottom-14 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        onClick={() => setSelectedQuickViewProduct(p)}
                        className="inline-flex items-center gap-2 rounded-full bg-plum/90 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF9F5] shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 text-amber-300" />
                        <span>Quick View Details</span>
                      </button>
                    </div>

                    {/* Color / Length Dots Selector */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-10 px-4">
                      <div className="flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-3 py-1.5 border border-white/60 shadow-xs">
                        {p.dots.map((dot) => (
                          <button
                            key={dot.name}
                            onClick={() => handleSelectVariant(p.id, dot.name)}
                            aria-label={`Select ${dot.name}`}
                            className="flex items-center gap-1.5 group/dot cursor-pointer transition-transform"
                          >
                            <span
                              className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                                currentVariant === dot.name
                                  ? "border-plum scale-115 ring-2 ring-plum/20"
                                  : "border-white/80 scale-90 opacity-70 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: dot.color }}
                            />
                            {currentVariant === dot.name && (
                              <span className="text-[10px] uppercase tracking-wider font-bold text-plum">
                                {dot.name}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-2 pt-5">
                    <div className="flex items-center justify-between gap-2">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-plum/60">
                          {p.rating.toFixed(1)} ({p.reviewCount})
                        </span>
                      </div>

                      {/* 20% First Order Badge */}
                      <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-800">
                        20% OFF Ready
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-xl tracking-tight text-plum mt-2">
                      {p.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-lavender-deep font-semibold mt-0.5">
                      Selected: <span className="text-plum font-bold">{currentVariant}</span>
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-plum/65 line-clamp-2">
                      {p.desc}
                    </p>

                    {/* Specs Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.specs.map((spec, i) => {
                        const IconComp = spec.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 rounded-lg bg-plum/[0.04] border border-plum/10 px-2.5 py-1 text-[11px] text-plum/80 font-medium"
                          >
                            <IconComp className="h-3 w-3 text-lavender-deep shrink-0" />
                            <span>{spec.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="mt-6 px-2 pt-4 border-t border-plum/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-semibold text-plum/50">
                      Studio Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-plum font-sans">
                        {activePriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick View Icon button */}
                    <button
                      onClick={() => setSelectedQuickViewProduct(p)}
                      title="Quick View specs & care tips"
                      aria-label={`Quick view ${p.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-plum/20 bg-white text-plum/80 hover:bg-plum/5 hover:text-plum transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Add to Bag CTA */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all active:scale-95 cursor-pointer shadow-md ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-plum text-[#FAF9F5] hover:bg-lavender-deep shadow-plum/20"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atelier Guarantees & Trust Bar */}
        <div className="mt-16 rounded-3xl bg-white border border-plum/10 p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum">
                <Crown className="h-5 w-5 text-lavender-deep" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-plum">100% Raw Virgin Hair</h4>
                <p className="mt-1 text-xs text-plum/65 leading-relaxed">
                  Single-donor, cuticle-aligned strands that can be bleached to 613 with zero shedding.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum">
                <Scissors className="h-5 w-5 text-lavender-deep" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-plum">Pre-Plucked HD Lace</h4>
                <p className="mt-1 text-xs text-plum/65 leading-relaxed">
                  Micro-bleached knots with melted natural hairline ready for glueless or glue wear.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum">
                <Truck className="h-5 w-5 text-lavender-deep" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-plum">Insured DHL Express</h4>
                <p className="mt-1 text-xs text-plum/65 leading-relaxed">
                  Doorstep delivery across Nigeria and tracked priority DHL shipping worldwide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum">
                <ShieldCheck className="h-5 w-5 text-lavender-deep" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-plum">Studio Concierge &amp; Fitting</h4>
                <p className="mt-1 text-xs text-plum/65 leading-relaxed">
                  Bundle your wig order with professional studio lace customization and bridal glam.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Customization & WhatsApp Callout Banner */}
        <div className="mt-8 rounded-2xl border border-plum/10 bg-plum/[0.03] p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h4 className="font-display text-xl md:text-2xl text-plum">
              Need a custom wig unit or bespoke color formulation?
            </h4>
            <p className="mt-1 text-xs text-plum/65">
              Our master stylists construct custom cap sizes, custom highlighted tones, and bridal units.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 shrink-0">
            <a
              href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Studio!%20I%20would%20like%20to%20inquire%20about%20a%20custom%20wig%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 text-xs uppercase tracking-wider font-bold shadow-md shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedQuickViewProduct}
        isOpen={!!selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        onWishlistToggle={handleToggleWishlist}
        isWishlisted={selectedQuickViewProduct ? wishlistedIds.has(selectedQuickViewProduct.id) : false}
      />
    </section>
  );
}
