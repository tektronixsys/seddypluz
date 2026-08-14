import React, { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { boutiqueProducts } from "@/components/boutique/data";
import type { Product } from "@/components/boutique/types";
import { ProductCard } from "@/components/boutique/ProductCard";
import { ProductQuickViewModal } from "@/components/boutique/ProductQuickViewModal";
import {
  Sparkles,
  ShoppingBag,
  Search,
  SlidersHorizontal,
  Copy,
  CheckCheck,
  ShieldCheck,
  Truck,
  Crown,
  Scissors,
  ArrowLeft,
  MessageCircle,
  Sparkle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const { totalCount, openCart, addItem } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "wigs" | "cosmetics" | "bestseller">(
    "all",
  );
  const [sortBy, setSortBy] = useState<SortOption>("featured");
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

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = boutiqueProducts.filter((p) => {
      // Category filter
      if (activeCategory === "wigs" && p.category !== "wigs") return false;
      if (activeCategory === "cosmetics" && p.category !== "cosmetics") return false;
      if (activeCategory === "bestseller" && !p.isBestseller) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.desc.toLowerCase().includes(query);
        const matchesCategory = p.categoryLabel.toLowerCase().includes(query);
        const matchesSpecs = p.specs.some((s) => s.label.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCategory || matchesSpecs;
      }
      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.numericPrice - b.numericPrice;
      if (sortBy === "price-desc") return b.numericPrice - a.numericPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default order
    });

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const categories = [
    { id: "all", label: "All Items", count: boutiqueProducts.length },
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
    <div className="min-h-screen bg-[#FAF9F5] text-foreground">
      {/* Streamlined Luxury Shop Header Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF9F5]/95 backdrop-blur-xl border-b border-border/60 shadow-xs"
            : "bg-[#FAF9F5]/85 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
          {/* Brand Logo + Return Home Pill */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="font-outfit text-[22px] md:text-[24px] leading-tight font-semibold tracking-tight text-plum transition-opacity hover:opacity-90 flex items-center gap-2"
            >
              <span>Seddypluz Beauty Studio</span>
            </Link>

            <span className="hidden sm:inline-block h-4 w-px bg-plum/20" />

            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-plum/70 transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Studio Home</span>
            </Link>
          </div>

          {/* Minimalist Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* WhatsApp Concierge Inquiries */}
            <a
              href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Studio,%20I'm%20shopping%20on%20your%20website%20and%20would%20like%20to%20inquire%20about%20wigs%20and%20products."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Consultation"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-xs transition-all hover:bg-emerald-100"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current text-[#25D366]" />
              <span>WhatsApp Inquiries</span>
            </a>

            {/* Bag Icon Button */}
            <button
              onClick={openCart}
              aria-label={`Open boutique bag, ${totalCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/80 text-plum backdrop-blur-md transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-plum shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Book Session CTA */}
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center rounded-full border border-plum/30 bg-plum px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#FAF9F5] shadow-xs transition-all hover:bg-lavender-deep hover:border-lavender-deep"
            >
              Book Session
            </a>

            {/* Mobile Home & Action Button */}
            <Link
              to="/"
              className="sm:hidden flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/70 text-plum backdrop-blur-md transition-all active:scale-95 shadow-xs"
              aria-label="Return to Studio Home"
              title="Return to Studio Home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Shop Container */}
      <main className="pt-28 md:pt-36 pb-20">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-plum/60 mb-6">
            <Link to="/" className="hover:text-plum transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Studio Home</span>
            </Link>
            <span>/</span>
            <span className="text-plum font-bold">Shop Collection</span>
          </div>

          {/* Shop Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-plum via-[#5a3a52] to-plum text-[#FAF9F5] p-8 md:p-14 shadow-2xl border border-white/10">
            {/* Ambient Background Shimmer */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-lavender-deep/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#FAF9F5]">
                  Seddypluz Atelier Boutique
                </span>
                <span className="text-white/40">·</span>
                <span className="text-[11px] text-amber-200">100% Virgin Hair &amp; Cosmetics</span>
              </div>

              <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl text-white">
                Luxury Wigs, Extensions &amp;{" "}
                <span className="italic font-normal text-amber-200">Signature Formulas.</span>
              </h1>

              <p className="mt-4 text-sm md:text-base leading-relaxed text-[#FAF9F5]/80 max-w-2xl">
                Explore our full atelier catalog: handcrafted single-donor raw virgin weaves, melted
                Swiss HD lace units, weightless velvet lip elixirs, and radiant baked mineral
                illuminators.
              </p>

              {/* 20% OFF Promo Code Pill */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/15 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-plum font-bold">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                      First Order Discount
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Get 20% OFF with voucher code
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyVoucher}
                  className="flex items-center gap-2 rounded-xl bg-white text-plum px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-amber-300 active:scale-95 cursor-pointer shadow-md"
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
          </div>

          {/* Search, Filter & Sort Controls Bar */}
          <div className="mt-10 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-plum/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search straight, wave, curl, bob, lipstick..."
                  className="w-full rounded-full border border-plum/15 bg-white py-3 pl-11 pr-4 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/10 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-plum/40 hover:text-plum cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Selector Dropdown */}
              <div className="flex items-center gap-2.5 self-end lg:self-auto">
                <SlidersHorizontal className="h-4 w-4 text-plum/50" />
                <span className="text-xs font-bold uppercase tracking-wider text-plum/60">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs font-semibold text-plum focus:border-plum focus:outline-none cursor-pointer shadow-xs"
                >
                  <option value="featured">Featured / Best Selling</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-plum/10 pb-4">
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
                          : "bg-white/80 text-plum/70 hover:bg-white hover:text-plum border border-plum/10"
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

              <span className="text-xs font-semibold text-plum/60">
                Showing {filteredProducts.length} of {boutiqueProducts.length} items
              </span>
            </div>
          </div>

          {/* Full Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="my-16 flex flex-col items-center justify-center rounded-3xl bg-white border border-plum/10 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-plum/5 text-plum/40 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl text-plum">No products matched your search</h3>
              <p className="mt-1 text-xs text-plum/60 max-w-sm">
                Try searching for another keyword like "straight", "wave", or switch categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-lavender-deep cursor-pointer"
              >
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => {
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
          )}

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
                    Micro-bleached knots with melted natural hairline ready for glueless or glue
                    wear.
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
                    Bundle your wig order with professional studio lace customization and bridal
                    glam.
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
      </main>

      {/* Footer */}
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
                  <Link to="/" className="text-sm text-plum/60 transition-colors hover:text-plum">
                    Studio Home
                  </Link>
                </li>
                <li>
                  <a
                    href="/#services"
                    className="text-sm text-plum/60 transition-colors hover:text-plum"
                  >
                    Services Atelier
                  </a>
                </li>
                <li>
                  <a
                    href="/#portfolio"
                    className="text-sm text-plum/60 transition-colors hover:text-plum"
                  >
                    Bridal Portfolio
                  </a>
                </li>
                <li>
                  <Link to="/shop" className="text-sm font-bold text-plum transition-colors">
                    Shop Wigs &amp; Hair Products
                  </Link>
                </li>
                <li>
                  <a
                    href="/#contact"
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
                <li>Kaduna Studio Sessions</li>
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
                    className="text-emerald-700 font-semibold hover:text-emerald-800"
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
    </div>
  );
}
