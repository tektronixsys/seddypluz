import React from "react";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    totalPriceFormatted,
  } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const itemsSummary = items
      .map((item) => `• ${item.quantity}x ${item.name} (${item.variant}) — ${item.priceFormatted}`)
      .join("\n");

    const message = `Hello Seddypluz Beauty Studio! ✨\n\nI would like to place an order for the following boutique item(s):\n\n${itemsSummary}\n\n🛍️ *Total Amount:* ${totalPriceFormatted}\n\nPlease confirm availability and provide payment / delivery details. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348162292997?text=${encoded}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-white p-0 flex flex-col justify-between border-l border-plum/15 shadow-2xl z-[100]"
      >
        {/* Header */}
        <div className="p-6 border-b border-plum/10 bg-[#FAF9F5]">
          <SheetHeader className="text-left space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-plum/5 text-plum">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </div>
                <SheetTitle className="font-display text-2xl italic tracking-tight text-plum">
                  Your Boutique Bag
                </SheetTitle>
              </div>
              <span className="inline-flex items-center rounded-full bg-plum/10 px-2.5 py-0.5 text-xs font-semibold text-plum">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            </div>
            <SheetDescription className="text-xs text-plum/60">
              Luxury virgin hair extensions & bespoke wig styles
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-plum/10">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-plum/5 text-plum/40 mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h4 className="font-display text-xl text-plum">Your bag is empty</h4>
              <p className="mt-1 text-xs text-plum/60 max-w-xs">
                Explore our signature double-drawn bone straight & deep wave wig collection.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById("boutique");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-plum/20 bg-plum/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] cursor-pointer"
              >
                <span>Explore Boutique</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.cartId} className="pt-4 first:pt-0 flex items-start gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-20 w-20 rounded-2xl object-cover bg-[#F7EBE8] shrink-0 border border-plum/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans font-bold text-sm text-plum truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        aria-label={`Remove ${item.name}`}
                        className="text-plum/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="inline-block mt-0.5 rounded-md bg-plum/5 px-2 py-0.5 text-[10px] font-semibold text-lavender-deep uppercase tracking-wider">
                      {item.variant}
                    </span>
                    <p className="mt-1 text-sm font-bold text-plum font-sans">
                      {item.priceFormatted}
                    </p>

                    {/* Quantity Stepper */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-plum/15 bg-[#FAF9F5] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center rounded text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-plum font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center rounded text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-plum/10 bg-[#FAF9F5] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-plum/70 font-medium">Estimated Subtotal</span>
              <span className="text-2xl font-bold text-plum font-sans">{totalPriceFormatted}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-plum/5 p-3 text-[11px] text-plum/75 leading-tight">
              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
              <span>
                Free express studio pickup in Lagos · Insured doorstep delivery nationwide.
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#25D366]/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="h-4.5 w-4.5 fill-current" />
                <span>Order via WhatsApp ({totalPriceFormatted})</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] uppercase tracking-wider text-plum/50 hover:text-plum/80 transition-colors py-1 cursor-pointer"
              >
                Clear boutique bag
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
