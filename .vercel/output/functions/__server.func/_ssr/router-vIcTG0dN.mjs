import { o as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CI6xlSqI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as stringType, i as objectType, r as numberType } from "../_libs/zod.mjs";
import { E as Plus, M as Minus, V as LoaderCircle, h as ShieldCheck, m as ShoppingBag, n as X, nt as CreditCard, s as Trash2, u as Sparkles, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, r as useCart, t as CartProvider } from "./utils-BVIgBnWH.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-vIcTG0dN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DP6vDjTu.css";
var logo_icon_default = "/assets/logo-icon-BGyuUlYd.png";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
/**
* Wait for the Flutterwave Inline v3 script (loaded statically in <head>)
* to initialise window.FlutterwaveCheckout. Polls with a short timeout to
* handle any async bootstrap delay without injecting a duplicate script tag.
*/
function waitForFlutterwaveReady(timeoutMs = 8e3) {
	return new Promise((resolve, reject) => {
		if (window.FlutterwaveCheckout) {
			resolve();
			return;
		}
		const start = Date.now();
		const interval = setInterval(() => {
			if (window.FlutterwaveCheckout) {
				clearInterval(interval);
				resolve();
				return;
			}
			if (Date.now() - start > timeoutMs) {
				clearInterval(interval);
				reject(/* @__PURE__ */ new Error("Flutterwave checkout did not initialise in time. Please check your internet connection and try again."));
			}
		}, 100);
	});
}
/**
* Generate a unique transaction reference for Flutterwave.
*/
function generateTxRef() {
	return `SEDDY-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}
/**
* Open the Flutterwave Inline payment modal.
*
* @param config - The Flutterwave checkout configuration (public_key injected at runtime)
* @throws If the script fails to load or FlutterwaveCheckout is not available
*/
async function openFlutterwaveCheckout(config) {
	await waitForFlutterwaveReady();
	if (!window.FlutterwaveCheckout) throw new Error("FlutterwaveCheckout is not available after script load. Please try again.");
	window.FlutterwaveCheckout(config);
}
/**
* Server function: Get the Flutterwave public key.
*
* The public key is stored in .env and returned to the client at runtime.
* This prevents it from being hardcoded in client-side JavaScript bundles.
*/
var getFlutterwavePublicKey = createServerFn({ method: "GET" }).handler(createSsrRpc("032e544c4c9f913b4b3eac810729ab5a0ce05755ad1899ca9a4e9e559a5ad275"));
var verifyPaymentSchema = objectType({
	transactionId: numberType().positive("Invalid transaction ID"),
	txRef: stringType().min(1, "Transaction reference is required"),
	expectedAmount: numberType().positive("Amount must be positive"),
	expectedCurrency: stringType().default("NGN")
});
/**
* Server function: Verify a Flutterwave payment transaction.
*
* Uses the SECRET key (server-side only) to call the Flutterwave Verify API.
* Validates that the transaction status, amount, and currency all match
* before confirming the payment.
*/
var verifyFlutterwavePayment = createServerFn({ method: "POST" }).validator(verifyPaymentSchema).handler(createSsrRpc("4935a90486418bbce42518105a158fdb0bb6274a0fa79ec27262285214a9a14f"));
function CartDrawer() {
	const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, clearCart, totalCount, totalPrice, totalPriceFormatted } = useCart();
	const [isProcessingPayment, setIsProcessingPayment] = (0, import_react.useState)(false);
	const handleFlutterwaveCheckout = async () => {
		if (items.length === 0 || isProcessingPayment) return;
		setIsProcessingPayment(true);
		try {
			const keyResult = await getFlutterwavePublicKey();
			if (!keyResult.ok || !keyResult.publicKey) {
				toast.error("Payment gateway unavailable", { description: keyResult.error || "Please try again or contact studio support." });
				setIsProcessingPayment(false);
				return;
			}
			const txRef = generateTxRef();
			const orderDescription = items.map((item) => `${item.quantity}x ${item.name} (${item.variant})`).join(", ");
			await openFlutterwaveCheckout({
				public_key: keyResult.publicKey,
				tx_ref: txRef,
				amount: totalPrice,
				currency: "NGN",
				payment_options: "card,banktransfer,ussd,mobilemoney",
				customer: {
					email: "customer@seddypluz.com",
					name: "Seddypluz Customer"
				},
				customizations: {
					title: "Seddypluz Beauty Studio",
					description: orderDescription.substring(0, 150),
					logo: `${window.location.origin}/favicon.ico`
				},
				callback: async (response) => {
					try {
						const verification = await verifyFlutterwavePayment({ data: {
							transactionId: response.transaction_id,
							txRef,
							expectedAmount: totalPrice,
							expectedCurrency: "NGN"
						} });
						if (verification.ok) {
							toast.success("Payment Confirmed! 🎉", {
								description: `Your order (${txRef}) has been received and verified. We'll prepare your items for doorstep delivery or studio pickup.`,
								duration: 8e3
							});
							clearCart();
							setIsCartOpen(false);
						} else toast.error("Payment Verification Issue", {
							description: verification.error || "Please save your transaction reference and contact studio support.",
							duration: 1e4
						});
					} catch {
						toast.error("Verification Error", {
							description: "We couldn't verify your payment automatically. Please save your order reference: " + txRef,
							duration: 12e3
						});
					} finally {
						setIsProcessingPayment(false);
					}
				},
				onclose: () => {
					setIsProcessingPayment(false);
				}
			});
		} catch (err) {
			console.error("[Flutterwave] Checkout error:", err);
			toast.error("Payment Error", { description: "Could not open the payment gateway. Please try again." });
			setIsProcessingPayment(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: isCartOpen,
		onOpenChange: setIsCartOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full sm:max-w-md bg-white p-0 flex flex-col justify-between border-l border-plum/15 shadow-2xl z-[100]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b border-plum/10 bg-[#FAF9F5]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
						className: "text-left space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-full bg-plum/5 text-plum",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4.5 w-4.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
									className: "font-display text-2xl italic tracking-tight text-plum",
									children: "Your Boutique Bag"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center rounded-full bg-plum/10 px-2.5 py-0.5 text-xs font-semibold text-plum",
								children: [
									totalCount,
									" ",
									totalCount === 1 ? "item" : "items"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
							className: "text-xs text-plum/60",
							children: "Luxury virgin hair extensions & bespoke wig styles"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-6 divide-y divide-plum/10",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center h-full py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-16 w-16 items-center justify-center rounded-full bg-plum/5 text-plum/40 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-xl text-plum",
								children: "Your bag is empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-plum/60 max-w-xs",
								children: "Explore our signature double-drawn bone straight & deep wave wig collection."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setIsCartOpen(false);
									const el = document.getElementById("boutique");
									if (el) el.scrollIntoView({ behavior: "smooth" });
								},
								className: "mt-6 inline-flex items-center gap-2 rounded-full border border-plum/20 bg-plum/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Boutique" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 first:pt-0 flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.img,
								alt: item.name,
								className: "h-20 w-20 rounded-2xl object-cover bg-[#F7EBE8] shrink-0 border border-plum/10"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans font-bold text-sm text-plum truncate",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeItem(item.cartId),
											"aria-label": `Remove ${item.name}`,
											className: "text-plum/40 hover:text-rose-600 transition-colors p-1 cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block mt-0.5 rounded-md bg-plum/5 px-2 py-0.5 text-[10px] font-semibold text-lavender-deep uppercase tracking-wider",
										children: item.variant
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-bold text-plum font-sans",
										children: item.priceFormatted
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex items-center gap-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center rounded-lg border border-plum/15 bg-[#FAF9F5] p-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => updateQuantity(item.cartId, item.quantity - 1),
													"aria-label": "Decrease quantity",
													className: "flex h-7 w-7 items-center justify-center rounded text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 text-center text-xs font-bold text-plum font-sans",
													children: item.quantity
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => updateQuantity(item.cartId, item.quantity + 1),
													"aria-label": "Increase quantity",
													className: "flex h-7 w-7 items-center justify-center rounded text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
												})
											]
										})
									})
								]
							})]
						}, item.cartId))
					})
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 sm:p-6 border-t border-plum/10 bg-[#FAF9F5] space-y-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-plum/70 font-medium",
								children: "Estimated Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-bold text-plum font-sans",
								children: totalPriceFormatted
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-xl bg-plum/5 p-3 text-[11px] text-plum/75 leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Express studio pickup · Tracked DHL insured doorstep delivery nationwide & worldwide." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleFlutterwaveCheckout,
									disabled: isProcessingPayment,
									className: "w-full flex items-center justify-center gap-2.5 rounded-2xl bg-plum hover:bg-lavender-deep disabled:opacity-60 disabled:cursor-not-allowed text-[#FAF9F5] py-4 px-6 text-xs uppercase tracking-widest font-bold shadow-lg shadow-plum/20 transition-all active:scale-[0.98] cursor-pointer",
									children: isProcessingPayment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4.5 w-4.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Processing..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Checkout (",
										totalPriceFormatted,
										")"
									] })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-1.5 text-[10px] text-plum/45 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secured by Flutterwave · Cards · Bank Transfer · USSD" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: clearCart,
									className: "w-full text-center text-[11px] uppercase tracking-wider text-plum/50 hover:text-plum/80 transition-colors py-1 cursor-pointer",
									children: "Clear boutique bag"
								})
							]
						})
					]
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-lavender-deep",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-5xl text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The page you're looking for has drifted away like petals in the wind."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center border border-plum/40 bg-plum px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-lavender-deep",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-foreground",
					children: "Something didn't bloom"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try refreshing or return home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "border border-plum/40 bg-plum px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-ivory hover:bg-lavender-deep",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "border border-plum/40 px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-plum hover:bg-blush",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Seddypluz Beauty Studio — Bridal & Editorial Makeup Artistry" },
			{
				name: "description",
				content: "Luxury bridal makeup, gele styling, beauty transformations & training by Seddypluz Beauty Studio. Where artistry meets elegance."
			},
			{
				name: "author",
				content: "Seddypluz Beauty Studio"
			},
			{
				property: "og:title",
				content: "Seddypluz Beauty Studio — Bridal & Editorial Makeup Artistry"
			},
			{
				property: "og:description",
				content: "Luxury bridal makeup, gele styling, beauty transformations & training. Where artistry meets elegance."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: logo_icon_default,
				type: "image/png"
			},
			{
				rel: "shortcut icon",
				href: logo_icon_default,
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: logo_icon_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "icon",
				href: "/site-icon.png",
				type: "image/png"
			}
		],
		scripts: [{
			src: "https://checkout.flutterwave.com/v3.js",
			async: true
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})
		] })
	});
}
var $$splitComponentImporter$2 = () => import("./shop-BHVkIoYL.mjs");
var Route$2 = createFileRoute("/shop")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-ChPsigfs.mjs");
var Route$1 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./routes-DQfKghuB.mjs");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ShopRoute = Route$2.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$3
});
var AdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AdminRoute,
	ShopRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
