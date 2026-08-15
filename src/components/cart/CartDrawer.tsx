import React, { useState } from "react";
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
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { openFlutterwaveCheckout, generateTxRef } from "@/integrations/flutterwave/checkout";
import { getFlutterwavePublicKey, verifyFlutterwavePayment } from "@/lib/payment.functions";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
    totalPriceFormatted,
  } = useCart();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleFlutterwaveCheckout = async () => {
    if (items.length === 0 || isProcessingPayment) return;

    setIsProcessingPayment(true);

    try {
      // Fetch the public key from the server (never hardcoded in client code)
      const keyResult = await getFlutterwavePublicKey();

      if (!keyResult.ok || !keyResult.publicKey) {
        toast.error("Payment gateway unavailable", {
          description: keyResult.error || "Please try again or contact studio support.",
        });
        setIsProcessingPayment(false);
        return;
      }

      const txRef = generateTxRef();

      // Build the order description from cart items
      const orderDescription = items
        .map((item) => `${item.quantity}x ${item.name} (${item.variant})`)
        .join(", ");

      await openFlutterwaveCheckout({
        public_key: keyResult.publicKey,
        tx_ref: txRef,
        amount: totalPrice,
        currency: "NGN",
        payment_options: "card,banktransfer,ussd,mobilemoney",
        customer: {
          email: "customer@seddypluz.com", // Will be collected from the modal
          name: "Seddypluz Customer",
        },
        customizations: {
          title: "Seddypluz Beauty Studio",
          description: orderDescription.substring(0, 150),
          logo: "https://seddypluz.com/favicon.ico",
        },
        callback: async (response) => {
          // Payment flow completed — verify on the server
          try {
            const verification = await verifyFlutterwavePayment({
              data: {
                transactionId: response.transaction_id,
                txRef: txRef,
                expectedAmount: totalPrice,
                expectedCurrency: "NGN",
              },
            });

            if (verification.ok) {
              toast.success("Payment Confirmed! 🎉", {
                description: `Your order (${txRef}) has been received and verified. We'll prepare your items for doorstep delivery or studio pickup.`,
                duration: 8000,
              });

              clearCart();
              setIsCartOpen(false);
            } else {
              toast.error("Payment Verification Issue", {
                description:
                  verification.error ||
                  "Please save your transaction reference and contact studio support.",
                duration: 10000,
              });
            }
          } catch {
            toast.error("Verification Error", {
              description:
                "We couldn't verify your payment automatically. Please save your order reference: " +
                txRef,
              duration: 12000,
            });
          } finally {
            setIsProcessingPayment(false);
          }
        },
        onclose: () => {
          setIsProcessingPayment(false);
        },
      });
    } catch (err) {
      console.error("[Flutterwave] Checkout error:", err);
      toast.error("Payment Error", {
        description: "Could not open the payment gateway. Please try again.",
      });
      setIsProcessingPayment(false);
    }
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
                          className="flex h-7 w-7 items-center justify-center rounded text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-plum font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
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
          <div className="p-5 sm:p-6 border-t border-plum/10 bg-[#FAF9F5] space-y-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-plum/70 font-medium">Estimated Subtotal</span>
              <span className="text-2xl font-bold text-plum font-sans">{totalPriceFormatted}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-plum/5 p-3 text-[11px] text-plum/75 leading-tight">
              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
              <span>
                Express studio pickup · Tracked DHL insured doorstep delivery nationwide &amp;
                worldwide.
              </span>
            </div>

            <div className="space-y-3">
              {/* Flutterwave Pay Now Button */}
              <button
                onClick={handleFlutterwaveCheckout}
                disabled={isProcessingPayment}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-plum hover:bg-lavender-deep disabled:opacity-60 disabled:cursor-not-allowed text-[#FAF9F5] py-4 px-6 text-xs uppercase tracking-widest font-bold shadow-lg shadow-plum/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4.5 w-4.5" />
                    <span>Checkout ({totalPriceFormatted})</span>
                  </>
                )}
              </button>

              {/* Secure payment badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-plum/45 font-medium">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Secured by Flutterwave · Cards · Bank Transfer · USSD</span>
              </div>

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
