import React from "react";
import type { Product } from "./types";
import { Sparkles, ShoppingBag, Heart, Star, Check, Eye, Sparkle } from "lucide-react";

interface ProductCardProps {
  product: Product;
  selectedVariant: string;
  isWishlisted: boolean;
  isAdded: boolean;
  onSelectVariant: (variantName: string) => void;
  onToggleWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
}

export function ProductCard({
  product: p,
  selectedVariant,
  isWishlisted,
  isAdded,
  onSelectVariant,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const currentDot = p.dots.find((d) => d.name === selectedVariant) || p.dots[0];
  const activePriceFormatted = currentDot?.priceFormatted || p.price;

  return (
    <div className="group relative flex flex-col justify-between rounded-[2.2rem] bg-white p-5 border border-plum/10 shadow-[0_16px_36px_-12px_rgba(82,58,77,0.06)] transition-all duration-400 hover:shadow-[0_24px_50px_rgba(82,58,77,0.12)] hover:-translate-y-1.5">
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
            onClick={onToggleWishlist}
            aria-label={
              isWishlisted ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`
            }
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
              onClick={onQuickView}
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
                  onClick={() => onSelectVariant(dot.name)}
                  aria-label={`Select ${dot.name}`}
                  className="flex items-center gap-1.5 group/dot cursor-pointer transition-transform"
                >
                  <span
                    className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                      selectedVariant === dot.name
                        ? "border-plum scale-115 ring-2 ring-plum/20"
                        : "border-white/80 scale-90 opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: dot.color }}
                  />
                  {selectedVariant === dot.name && (
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

          <h3 className="font-sans font-bold text-xl tracking-tight text-plum mt-2">{p.name}</h3>
          <p className="text-[11px] uppercase tracking-wider text-lavender-deep font-semibold mt-0.5">
            Selected: <span className="text-plum font-bold">{selectedVariant}</span>
          </p>

          <p className="mt-3 text-xs leading-relaxed text-plum/65 line-clamp-2">{p.desc}</p>

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
            <span className="text-xl font-bold text-plum font-sans">{activePriceFormatted}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick View Icon button */}
          <button
            onClick={onQuickView}
            title="Quick View specs & care tips"
            aria-label={`Quick view ${p.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-plum/20 bg-white text-plum/80 hover:bg-plum/5 hover:text-plum transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Add to Bag CTA */}
          <button
            onClick={onAddToCart}
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
}
