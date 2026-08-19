import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as Droplets, E as Plus, H as Layers, K as Heart, M as Minus, N as MessageCircle, S as Ruler, W as Info, X as Gem, Z as Eye, b as Scale, d as Sparkle, ft as Check, h as ShieldCheck, l as Star, m as ShoppingBag, n as X, o as Truck, u as Sparkles, y as Scissors } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as cn, r as useCart } from "./utils-BVIgBnWH.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductQuickViewModal-Dxb55MHb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function renderSpecIcon(specIcon, label) {
	if (typeof specIcon === "function" || typeof specIcon === "object" && specIcon !== null && ("$$typeof" in specIcon || "render" in specIcon)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(specIcon, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	const l = (label || "").toLowerCase();
	if (l.includes("hair") || l.includes("virgin") || l.includes("single-donor")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("lace") || l.includes("hd") || l.includes("swiss") || l.includes("blend") || l.includes("matte")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("tangle") || l.includes("shed") || l.includes("proof") || l.includes("cruelty") || l.includes("shield")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("cut") || l.includes("bob")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("length") || l.includes("\"")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("mineral") || l.includes("gem") || l.includes("gold") || l.includes("ferrule")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gem, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("scale") || l.includes("weight") || l.includes("dense") || l.includes("skin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	if (l.includes("hyaluronic") || l.includes("texture") || l.includes("oil")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3 text-lavender-deep shrink-0" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-lavender-deep shrink-0" });
}
function ProductCard({ product: p, selectedVariant, isWishlisted, isAdded, onSelectVariant, onToggleWishlist, onQuickView, onAddToCart }) {
	const activePriceFormatted = (p.dots.find((d) => d.name === selectedVariant) || p.dots[0])?.priceFormatted || p.price;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex flex-col justify-between rounded-[2.2rem] bg-white p-5 border border-plum/10 shadow-[0_16px_36px_-12px_rgba(82,58,77,0.06)] transition-all duration-400 hover:shadow-[0_24px_50px_rgba(82,58,77,0.12)] hover:-translate-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative w-full h-[320px] ${p.bgClass} rounded-3xl overflow-hidden transition-colors duration-500 flex items-center justify-center`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-plum/15 via-transparent to-white/30 pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-4 left-4 z-10 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-plum border border-white/60 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "h-3 w-3 text-lavender-deep" }), p.category === "wigs" ? "Luxury Wig" : "Cosmetics"]
					}), p.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-plum/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#FAF9F5] shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5 text-amber-300" }), p.badge]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onToggleWishlist,
					"aria-label": isWishlisted ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`,
					className: `absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 active:scale-90 cursor-pointer ${isWishlisted ? "bg-rose-500 text-white shadow-md shadow-rose-500/35 scale-105" : "bg-white/80 text-plum/70 hover:bg-white hover:text-plum shadow-xs"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4.5 w-4.5 ${isWishlisted ? "fill-current" : ""}` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.img,
					alt: p.name,
					loading: "lazy",
					className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-14 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onQuickView,
						className: "inline-flex items-center gap-2 rounded-full bg-plum/90 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF9F5] shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick View Details" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-10 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-3 py-1.5 border border-white/60 shadow-xs",
						children: p.dots.map((dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onSelectVariant(dot.name),
							"aria-label": `Select ${dot.name}`,
							className: "flex items-center gap-1.5 group/dot cursor-pointer transition-transform",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `h-4 w-4 rounded-full border-2 transition-all duration-300 ${selectedVariant === dot.name ? "border-plum scale-115 ring-2 ring-plum/20" : "border-white/80 scale-90 opacity-70 hover:opacity-100"}`,
								style: { backgroundColor: dot.color }
							}), selectedVariant === dot.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider font-bold text-plum",
								children: dot.name
							})]
						}, dot.name))
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-2 pt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center text-amber-500",
							children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] font-semibold text-plum/60",
							children: [
								p.rating.toFixed(1),
								" (",
								p.reviewCount,
								")"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-800",
						children: "20% OFF Ready"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-sans font-bold text-xl tracking-tight text-plum mt-2",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] uppercase tracking-wider text-lavender-deep font-semibold mt-0.5",
					children: ["Selected: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-plum font-bold",
						children: selectedVariant
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-relaxed text-plum/65 line-clamp-2",
					children: p.desc
				}),
				p.specs && p.specs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-1.5",
					children: p.specs.map((spec, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded-lg bg-plum/[0.04] border border-plum/10 px-2.5 py-1 text-[11px] text-plum/80 font-medium",
						children: [renderSpecIcon(spec.icon, spec.label), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: spec.label })]
					}, i))
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 px-2 pt-4 border-t border-plum/10 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] uppercase tracking-wider font-semibold text-plum/50",
				children: "Studio Price"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-baseline gap-1.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl font-bold text-plum font-sans",
					children: activePriceFormatted
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onQuickView,
					title: "Quick View specs & care tips",
					"aria-label": `Quick view ${p.name}`,
					className: "flex h-10 w-10 items-center justify-center rounded-xl border border-plum/20 bg-white text-plum/80 hover:bg-plum/5 hover:text-plum transition-all active:scale-95 cursor-pointer shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onAddToCart,
					className: `flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all active:scale-95 cursor-pointer shadow-md ${isAdded ? "bg-emerald-600 text-white" : "bg-plum text-[#FAF9F5] hover:bg-lavender-deep shadow-plum/20"}`,
					children: isAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Added" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add to Bag" })] })
				})]
			})]
		})]
	});
}
function ProductQuickViewModal({ product, isOpen, onClose, onWishlistToggle, isWishlisted = false }) {
	const { addItem } = useCart();
	const [selectedVariant, setSelectedVariant] = (0, import_react.useState)("");
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [added, setAdded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
		for (let i = 0; i < quantity; i++) addItem({
			productId: product.id,
			name: product.name,
			category: product.categoryLabel,
			variant: selectedVariant,
			priceNum: activeNumericPrice,
			priceFormatted: activePriceFormatted,
			img: product.img
		});
		setAdded(true);
		toast.success(`${quantity}x ${product.name} (${selectedVariant}) added to your bag!`, { description: `${activePriceFormatted} each · Tap bag icon anytime to checkout on WhatsApp.` });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl w-[94vw] md:w-full bg-[#FAF9F5] border border-plum/15 p-0 overflow-y-auto md:overflow-hidden rounded-[2rem] shadow-2xl z-[150] max-h-[92vh] flex flex-col md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative w-full md:w-1/2 ${product.bgClass} flex flex-col items-center justify-center p-4 xs:p-6 md:p-8 min-h-[220px] xs:min-h-[260px] md:min-h-[460px] overflow-hidden`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-plum/15 via-transparent to-white/40 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-3 left-3 xs:top-4 xs:left-4 z-10 flex flex-col gap-1.5",
						children: [product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-plum px-2.5 xs:px-3 py-0.5 xs:py-1 text-[9px] xs:text-[10px] font-bold uppercase tracking-wider text-[#FAF9F5] shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5 xs:h-3 xs:w-3 text-amber-300" }), product.badge]
						}), product.discountBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-rose-600 px-2 py-0.5 text-[8.5px] xs:text-[9px] font-bold uppercase tracking-wider text-white shadow-xs",
							children: product.discountBadge
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onWishlistToggle && onWishlistToggle(product.id),
						"aria-label": isWishlisted ? "Remove from wishlist" : "Add to wishlist",
						className: `absolute top-3 right-3 xs:top-4 xs:right-4 z-10 flex h-9 w-9 xs:h-10 xs:w-10 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer ${isWishlisted ? "bg-rose-500 text-white shadow-md shadow-rose-500/30" : "bg-white/80 text-plum/70 hover:bg-white hover:text-plum shadow-xs"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 xs:h-4.5 xs:w-4.5 ${isWishlisted ? "fill-current" : ""}` })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-0 max-h-[220px] xs:max-h-[260px] md:max-h-[340px] flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.img,
							alt: product.name,
							className: "max-h-[200px] xs:max-h-[240px] md:max-h-[320px] w-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-3 left-3 right-3 xs:bottom-4 xs:left-4 xs:right-4 text-center z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-[9.5px] xs:text-[10px] font-bold uppercase tracking-wider text-plum border border-white/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "h-3 w-3 text-lavender-deep" }), product.categoryLabel]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full md:w-1/2 p-5 xs:p-6 md:p-8 flex flex-col justify-between overflow-y-visible md:overflow-y-auto max-h-none md:max-h-[560px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						className: "text-left space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center text-amber-500",
									children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-plum/70",
									children: [
										product.rating.toFixed(1),
										" (",
										product.reviewCount,
										" reviews)"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "font-display text-2xl md:text-3xl text-plum leading-tight",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-xs text-plum/65 mt-1 leading-relaxed",
								children: product.fullDesc
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-baseline gap-3 border-b border-plum/10 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl font-bold text-plum font-sans",
								children: activePriceFormatted
							}),
							product.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm line-through text-plum/40 font-sans",
								children: product.originalPrice
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 tracking-wide",
								children: "Special 20% First-Order Promo"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-plum",
								children: "Select Option / Length:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-lavender-deep",
								children: selectedVariant
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2.5 flex flex-wrap gap-2",
							children: product.dots.map((dot) => {
								const isSelected = selectedVariant === dot.name;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedVariant(dot.name),
									className: `flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium border transition-all cursor-pointer ${isSelected ? "border-plum bg-plum text-[#FAF9F5] shadow-xs scale-102" : "border-plum/15 bg-white text-plum/80 hover:border-plum/40 hover:bg-plum/5"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `h-3 w-3 rounded-full border border-white/60 shrink-0 ${isSelected ? "ring-2 ring-amber-400" : ""}`,
											style: { backgroundColor: dot.color }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dot.name }),
										dot.priceFormatted && dot.priceFormatted !== product.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-[10px] ${isSelected ? "text-amber-300" : "text-plum/50"}`,
											children: [
												"(",
												dot.priceFormatted,
												")"
											]
										})
									]
								}, dot.name);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl bg-white/70 border border-plum/10 p-3.5 space-y-2 text-[11px] text-plum/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5 text-lavender-deep mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold text-plum",
									children: "Specification: "
								}), product.details.densityOrSize] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-lavender-deep mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold text-plum",
									children: "Finish & Lace: "
								}), product.details.laceOrFinish] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 text-lavender-deep mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold text-plum",
									children: "Care Ritual: "
								}), product.details.careTips] })]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 pt-4 border-t border-plum/10 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-xl border border-plum/20 bg-white p-1 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity((q) => Math.max(1, q - 1)),
										"aria-label": "Decrease quantity",
										className: "flex h-8 w-8 items-center justify-center rounded-lg text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-center text-xs font-bold text-plum font-sans",
										children: quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity((q) => q + 1),
										"aria-label": "Increase quantity",
										className: "flex h-8 w-8 items-center justify-center rounded-lg text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleAddToCart,
								className: `flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md ${added ? "bg-emerald-600 text-white" : "bg-plum text-[#FAF9F5] hover:bg-lavender-deep shadow-plum/20"}`,
								children: added ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Added to Bag" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Add ",
									quantity > 1 ? `(${quantity})` : "",
									" to Bag"
								] })] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleWhatsAppDirectInquiry,
							className: "w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-[#25D366] fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire & Order on WhatsApp" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 text-[10px] text-plum/60 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3 w-3 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Doorstep Delivery Across Nigeria · DHL Worldwide Shipping" })]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { ProductQuickViewModal as i, DialogContent as n, ProductCard as r, Dialog as t };
