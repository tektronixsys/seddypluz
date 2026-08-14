import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { getStoredBoutiqueProducts } from "./data";
import type { Product } from "./types";
import { ProductCard } from "./ProductCard";
import { ProductQuickViewModal } from "./ProductQuickViewModal";
import {
  Sparkles,
  Copy,
  CheckCheck,
  ShieldCheck,
  Truck,
  Crown,
  Scissors,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface BoutiqueSectionProps {
  isFullShopPage?: boolean;
  limit?: number;
}

export function BoutiqueSection({ isFullShopPage = false, limit = 3 }: BoutiqueSectionProps) {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>(() => getStoredBoutiqueProducts());
  const [activeCategory, setActiveCategory] = useState<"all" | "wigs" | "cosmetics" | "bestseller">(
    "all",
  );
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(getStoredBoutiqueProducts());
    };
    window.addEventListener("seddypluz_inventory_updated", handleUpdate);
    return () => window.removeEventListener("seddypluz_inventory_updated", handleUpdate);
  }, []);

  // Per-product selected variant state
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
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
  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "wigs") return p.category === "wigs";
    if (activeCategory === "cosmetics") return p.category === "cosmetics";
    if (activeCategory === "bestseller") return !!p.isBestseller;
    return true;
  });

  // If on homepage and not full page mode, display the top limited items
  const displayedProducts = isFullShopPage ? filteredProducts : filteredProducts.slice(0, limit);

  const categories = [
    { id: "all", label: "All Featured", count: products.length },
    {
      id: "wigs",
      label: "Luxury Wigs & Extensions",
      count: products.filter((p) => p.category === "wigs").length,
    },
    {
      id: "cosmetics",
      label: "Signature Cosmetics",
      count: products.filter((p) => p.category === "cosmetics").length,
    },
    {
      id: "bestseller",
      label: "Studio Bestsellers",
      count: products.filter((p) => p.isBestseller).length,
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
                Wigs &amp; Hair Products
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.08] text-plum sm:text-5xl md:text-6xl">
              Signature{" "}
              <em className="text-lavender-deep font-normal italic">hair &amp; beauty pieces.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-xl">
            <p className="text-sm md:text-base leading-relaxed text-plum/70 lg:text-right">
              Crafted from 100% cuticle-aligned raw virgin hair and camera-calibrated bridal
              formulas, available for direct order &amp; nationwide delivery.
            </p>

            {/* Boutique Social channels + Direct Shop Link */}
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-plum px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF9F5] shadow-sm transition-all hover:bg-lavender-deep"
              >
                <span>View Full Shop</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

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
                  <span>
                    Copy Code: <strong>SEDDY20</strong>
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-plum/10 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-semibold text-plum/50">
              Showing {displayedProducts.length} featured items
            </span>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider font-bold text-lavender-deep hover:text-plum transition-colors flex items-center gap-1"
            >
              <span>See All ({boutiqueProducts.length})</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* Product Cards Grid (Curated on Homepage) */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((p) => {
            const isWishlisted = wishlistedIds.has(p.id);
            const currentVariant = selectedVariants[p.id] || p.dots[0]?.name || "Standard";
            const isAdded = !!addedIds[p.id];

            return (
              <ProductCard
                key={p.id}
                product={p}
                selectedVariant={currentVariant}
                isWishlisted={isWishlisted}
                isAdded={isAdded}
                onSelectVariant={(v) => handleSelectVariant(p.id, v)}
                onToggleWishlist={() => handleToggleWishlist(p.id)}
                onQuickView={() => setSelectedQuickViewProduct(p)}
                onAddToCart={() => handleAddToCart(p)}
              />
            );
          })}
        </div>

        {/* View All Products Gateway Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-plum/5 via-lavender-deep/10 to-mauve/10 border border-plum/15 p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-plum mb-2">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Full Atelier Catalog
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-plum">
              Looking for more wigs, lengths &amp; bridal essentials?
            </h3>
            <p className="mt-1 text-xs md:text-sm text-plum/70 max-w-xl">
              Explore our complete collection of Bone Straight, Water Wave, Pixie, Bob Units,
              Signature Lip Elixirs, Highlighters, and Brush Suites in the dedicated shop.
            </p>
          </div>

          <Link
            to="/shop"
            className="shrink-0 inline-flex items-center gap-3 rounded-full bg-plum px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FAF9F5] shadow-lg shadow-plum/20 transition-all hover:bg-lavender-deep hover:shadow-xl active:scale-[0.98]"
          >
            <span>Explore Full Shop ({boutiqueProducts.length} Items)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Atelier Guarantees & Trust Bar */}
        <div className="mt-14 rounded-3xl bg-white border border-plum/10 p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum">
                <Crown className="h-5 w-5 text-lavender-deep" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-plum">100% Raw Virgin Hair</h4>
                <p className="mt-1 text-xs text-plum/65 leading-relaxed">
                  Single-donor, cuticle-aligned strands that can be bleached to 613 with zero
                  shedding.
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
                <h4 className="font-sans text-sm font-bold text-plum">
                  Studio Concierge &amp; Fitting
                </h4>
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
              Our master stylists construct custom cap sizes, custom highlighted tones, and bridal
              units.
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
        isWishlisted={
          selectedQuickViewProduct ? wishlistedIds.has(selectedQuickViewProduct.id) : false
        }
      />
    </section>
  );
}
