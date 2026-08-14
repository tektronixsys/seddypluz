import React, { useState, useEffect } from "react";
import type { Product } from "./types";
import { useCart } from "@/context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  MessageCircle,
  Star,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Layers,
  Sparkle,
  Info,
} from "lucide-react";
import { toast } from "sonner";

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onWishlistToggle,
  isWishlisted = false,
}: ProductQuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync selected variant when product changes
  useEffect(() => {
    if (product && product.dots.length > 0) {
      setSelectedVariant(product.dots[0].name);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const currentDot = product.dots.find((d) => d.name === selectedVariant) || product.dots[0];
  const activePriceFormatted = currentDot?.priceFormatted || product.price;
  const activeNumericPrice = currentDot?.numericPrice || product.numericPrice;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        category: product.categoryLabel,
        variant: selectedVariant,
        priceNum: activeNumericPrice,
        priceFormatted: activePriceFormatted,
        img: product.img,
      });
    }
    setAdded(true);
    toast.success(`${quantity}x ${product.name} (${selectedVariant}) added to your bag!`, {
      description: `${activePriceFormatted} each · Tap bag icon anytime to checkout on WhatsApp.`,
    });
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppDirectInquiry = () => {
    const msg = `Hello Seddypluz Studio! ✨\n\nI am inquiring about the *${product.name}* (${selectedVariant}) listed at ${activePriceFormatted}.\n\nCould you please provide more details on availability, custom lace sizing, or booking an installation? Thank you!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/2348162292997?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[94vw] md:w-full bg-[#FAF9F5] border border-plum/15 p-0 overflow-y-auto md:overflow-hidden rounded-[2rem] shadow-2xl z-[150] max-h-[92vh] flex flex-col md:flex-row">
        {/* Left: Product Image Showcase */}
        <div
          className={`relative w-full md:w-1/2 ${product.bgClass} flex flex-col items-center justify-center p-4 xs:p-6 md:p-8 min-h-[220px] xs:min-h-[260px] md:min-h-[460px] overflow-hidden`}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-plum/15 via-transparent to-white/40 pointer-events-none" />

          {/* Badges Top-Left */}
          <div className="absolute top-3 left-3 xs:top-4 xs:left-4 z-10 flex flex-col gap-1.5">
            {product.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-plum px-2.5 xs:px-3 py-0.5 xs:py-1 text-[9px] xs:text-[10px] font-bold uppercase tracking-wider text-[#FAF9F5] shadow-xs">
                <Sparkles className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-amber-300" />
                {product.badge}
              </span>
            )}
            {product.discountBadge && (
              <span className="inline-flex items-center rounded-full bg-rose-600 px-2 py-0.5 text-[8.5px] xs:text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
                {product.discountBadge}
              </span>
            )}
          </div>

          {/* Wishlist Button Top-Right */}
          <button
            onClick={() => onWishlistToggle && onWishlistToggle(product.id)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-3 right-3 xs:top-4 xs:right-4 z-10 flex h-9 w-9 xs:h-10 xs:w-10 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
              isWishlisted
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                : "bg-white/80 text-plum/70 hover:bg-white hover:text-plum shadow-xs"
            }`}
          >
            <Heart className={`h-4 w-4 xs:h-4.5 xs:w-4.5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Product Image with smooth hover scale */}
          <div className="relative z-0 max-h-[220px] xs:max-h-[260px] md:max-h-[340px] flex items-center justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-[200px] xs:max-h-[240px] md:max-h-[320px] w-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Bottom Category Label */}
          <div className="absolute bottom-3 left-3 right-3 xs:bottom-4 xs:left-4 xs:right-4 text-center z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-[9.5px] xs:text-[10px] font-bold uppercase tracking-wider text-plum border border-white/60">
              <Sparkle className="h-3 w-3 text-lavender-deep" />
              {product.categoryLabel}
            </span>
          </div>
        </div>

        {/* Right: Details, Variant Selector, Quantity, Actions */}
        <div className="w-full md:w-1/2 p-5 xs:p-6 md:p-8 flex flex-col justify-between overflow-y-visible md:overflow-y-auto max-h-none md:max-h-[560px]">
          <div>
            {/* Header with Title & Rating */}
            <DialogHeader className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-plum/70">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              <DialogTitle className="font-display text-2xl md:text-3xl text-plum leading-tight">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-plum/65 mt-1 leading-relaxed">
                {product.fullDesc}
              </DialogDescription>
            </DialogHeader>

            {/* Price Tag with Promo Highlight */}
            <div className="mt-4 flex items-baseline gap-3 border-b border-plum/10 pb-4">
              <span className="font-display text-3xl font-bold text-plum font-sans">
                {activePriceFormatted}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-plum/40 font-sans">
                  {product.originalPrice}
                </span>
              )}
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 tracking-wide">
                Special 20% First-Order Promo
              </span>
            </div>

            {/* Variant / Length Selector */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-plum">
                  Select Option / Length:
                </span>
                <span className="text-xs font-semibold text-lavender-deep">{selectedVariant}</span>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.dots.map((dot) => {
                  const isSelected = selectedVariant === dot.name;
                  return (
                    <button
                      key={dot.name}
                      onClick={() => setSelectedVariant(dot.name)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "border-plum bg-plum text-[#FAF9F5] shadow-xs scale-102"
                          : "border-plum/15 bg-white text-plum/80 hover:border-plum/40 hover:bg-plum/5"
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded-full border border-white/60 shrink-0 ${
                          isSelected ? "ring-2 ring-amber-400" : ""
                        }`}
                        style={{ backgroundColor: dot.color }}
                      />
                      <span>{dot.name}</span>
                      {dot.priceFormatted && dot.priceFormatted !== product.price && (
                        <span
                          className={`text-[10px] ${isSelected ? "text-amber-300" : "text-plum/50"}`}
                        >
                          ({dot.priceFormatted})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Atelier Technical Specs Box */}
            <div className="mt-5 rounded-2xl bg-white/70 border border-plum/10 p-3.5 space-y-2 text-[11px] text-plum/80">
              <div className="flex items-start gap-2">
                <Layers className="h-3.5 w-3.5 text-lavender-deep mt-0.5 shrink-0" />
                <div>
                  <strong className="font-semibold text-plum">Specification: </strong>
                  {product.details.densityOrSize}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-lavender-deep mt-0.5 shrink-0" />
                <div>
                  <strong className="font-semibold text-plum">Finish &amp; Lace: </strong>
                  {product.details.laceOrFinish}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-3.5 w-3.5 text-lavender-deep mt-0.5 shrink-0" />
                <div>
                  <strong className="font-semibold text-plum">Care Ritual: </strong>
                  {product.details.careTips}
                </div>
              </div>
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="mt-6 pt-4 border-t border-plum/10 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center rounded-xl border border-plum/20 bg-white p-1 shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-plum font-sans">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-plum text-[#FAF9F5] hover:bg-lavender-deep shadow-plum/20"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add {quantity > 1 ? `(${quantity})` : ""} to Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <button
              onClick={handleWhatsAppDirectInquiry}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] fill-current" />
              <span>Inquire &amp; Order on WhatsApp</span>
            </button>

            {/* Micro Delivery Notice */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-plum/60 font-medium">
              <Truck className="h-3 w-3 text-lavender-deep" />
              <span>Doorstep Delivery Across Nigeria · DHL Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
