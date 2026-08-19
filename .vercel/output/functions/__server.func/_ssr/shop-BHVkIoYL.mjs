import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as MessageCircle, d as Sparkle, h as ShieldCheck, m as ShoppingBag, o as Truck, p as SlidersHorizontal, pt as CheckCheck, rt as Copy, tt as Crown, u as Sparkles, v as Search, y as Scissors, yt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as getStoredBoutiqueProducts, r as getActiveAnnouncement } from "./data-CxlY3IqO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./utils-BVIgBnWH.mjs";
import { i as ProductQuickViewModal, r as ProductCard } from "./ProductQuickViewModal-Dxb55MHb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BHVkIoYL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const { totalCount, openCart, addItem } = useCart();
	const [products, setProducts] = (0, import_react.useState)(() => getStoredBoutiqueProducts());
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("featured");
	const [activeAnnouncement, setActiveAnnouncement] = (0, import_react.useState)(() => getActiveAnnouncement());
	const [wishlistedIds, setWishlistedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [selectedQuickViewProduct, setSelectedQuickViewProduct] = (0, import_react.useState)(null);
	const [copiedCode, setCopiedCode] = (0, import_react.useState)(false);
	const [addedIds, setAddedIds] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const handleUpdate = () => {
			setProducts(getStoredBoutiqueProducts());
		};
		const handleAnnounceUpdate = (e) => {
			const customEvent = e;
			if (customEvent?.detail?.active !== void 0) setActiveAnnouncement(customEvent.detail.active);
			else setActiveAnnouncement(getActiveAnnouncement());
		};
		window.addEventListener("seddypluz_inventory_updated", handleUpdate);
		window.addEventListener("seddypluz_announcement_updated", handleAnnounceUpdate);
		return () => {
			window.removeEventListener("seddypluz_inventory_updated", handleUpdate);
			window.removeEventListener("seddypluz_announcement_updated", handleAnnounceUpdate);
		};
	}, []);
	const [selectedVariants, setSelectedVariants] = (0, import_react.useState)(() => {
		const initial = {};
		products.forEach((p) => {
			if (p.dots.length > 0) initial[p.id] = p.dots[0].name;
		});
		return initial;
	});
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 30);
		window.addEventListener("scroll", on);
		return () => window.removeEventListener("scroll", on);
	}, []);
	const handleCopyVoucher = () => {
		const code = activeAnnouncement?.voucherCode || "SEDDY20";
		navigator.clipboard.writeText(code);
		setCopiedCode(true);
		toast.success(`Promo code ${code} copied!`, { description: activeAnnouncement?.text || "Enjoy discount on your studio order." });
		setTimeout(() => setCopiedCode(false), 2500);
	};
	const handleToggleWishlist = (productId) => {
		setWishlistedIds((prev) => {
			const next = new Set(prev);
			const product = products.find((p) => p.id === productId);
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
	const handleSelectVariant = (productId, variantName) => {
		setSelectedVariants((prev) => ({
			...prev,
			[productId]: variantName
		}));
	};
	const handleAddToCart = (product) => {
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
			img: product.img
		});
		setAddedIds((prev) => ({
			...prev,
			[product.id]: true
		}));
		toast.success(`${product.name} (${currentVariantName}) added to bag!`, { description: `${priceFormatted} · WhatsApp checkout ready anytime` });
		setTimeout(() => {
			setAddedIds((prev) => ({
				...prev,
				[product.id]: false
			}));
		}, 1800);
	};
	const filteredProducts = (0, import_react.useMemo)(() => {
		let result = products.filter((p) => {
			if (activeCategory === "wigs" && p.category !== "wigs") return false;
			if (activeCategory === "cosmetics" && p.category !== "cosmetics") return false;
			if (activeCategory === "bestseller" && !p.isBestseller) return false;
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
		result = [...result].sort((a, b) => {
			if (sortBy === "price-asc") return a.numericPrice - b.numericPrice;
			if (sortBy === "price-desc") return b.numericPrice - a.numericPrice;
			if (sortBy === "rating") return b.rating - a.rating;
			return 0;
		});
		return result;
	}, [
		products,
		activeCategory,
		searchQuery,
		sortBy
	]);
	const categories = [
		{
			id: "all",
			label: "All Items",
			count: products.length
		},
		{
			id: "wigs",
			label: "Luxury Wigs & Extensions",
			count: products.filter((p) => p.category === "wigs").length
		},
		{
			id: "cosmetics",
			label: "Signature Cosmetics & Tools",
			count: products.filter((p) => p.category === "cosmetics").length
		},
		{
			id: "bestseller",
			label: "Studio Bestsellers",
			count: products.filter((p) => p.isBestseller).length
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F5] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#FAF9F5]/95 backdrop-blur-xl border-b border-border/60 shadow-xs" : "bg-[#FAF9F5]/85 backdrop-blur-md"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 sm:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "font-outfit text-[22px] md:text-[24px] leading-tight font-semibold tracking-tight text-plum transition-opacity hover:opacity-90 flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Seddypluz Beauty Studio" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden sm:inline-block h-4 w-px bg-plum/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-plum/70 transition-colors hover:text-plum",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Studio Home" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Studio,%20I'm%20shopping%20on%20your%20website%20and%20would%20like%20to%20inquire%20about%20wigs%20and%20products.",
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "Direct WhatsApp Consultation",
								className: "hidden md:inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-xs transition-all hover:bg-emerald-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5 fill-current text-[#25D366]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp Inquiries" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: openCart,
								"aria-label": `Open boutique bag, ${totalCount} items`,
								className: "relative flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/80 text-plum backdrop-blur-md transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4.5 w-4.5" }), totalCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-plum shadow-xs",
									children: totalCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#contact",
								className: "hidden sm:inline-flex items-center rounded-full border border-plum/30 bg-plum px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#FAF9F5] shadow-xs transition-all hover:bg-lavender-deep hover:border-lavender-deep",
								children: "Book Session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "sm:hidden flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/70 text-plum backdrop-blur-md transition-all active:scale-95 shadow-xs",
								"aria-label": "Return to Studio Home",
								title: "Return to Studio Home",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-28 md:pt-36 pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] px-6 md:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-plum/60 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									className: "hover:text-plum transition-colors flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Studio Home" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-plum font-bold",
									children: "Shop Collection"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-plum via-[#5a3a52] to-plum text-[#FAF9F5] p-8 md:p-14 shadow-2xl border border-white/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-lavender-deep/20 blur-3xl pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 max-w-3xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 mb-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-amber-300" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold uppercase tracking-widest text-[#FAF9F5]",
													children: "Seddypluz Atelier Boutique"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/40",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-amber-200",
													children: "100% Virgin Hair & Cosmetics"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
											className: "font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl text-white",
											children: [
												"Luxury Wigs, Extensions &",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "italic font-normal text-amber-200",
													children: "Signature Formulas."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm md:text-base leading-relaxed text-[#FAF9F5]/80 max-w-2xl",
											children: "Explore our full atelier catalog: handcrafted single-donor raw virgin weaves, melted Swiss HD lace units, weightless velvet lip elixirs, and radiant baked mineral illuminators."
										}),
										activeAnnouncement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-8 flex flex-wrap items-center gap-4 border-t border-white/15 pt-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-plum font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5" }), activeAnnouncement.pulseAnimation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "absolute -top-1 -right-1 flex h-3 w-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-amber-300 ring-2 ring-plum" })]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase tracking-wider text-amber-300 block",
													children: activeAnnouncement.badgeLabel || "Special Studio Promo"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs sm:text-sm font-semibold text-white",
													children: activeAnnouncement.text
												})] })]
											}), activeAnnouncement.voucherCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: handleCopyVoucher,
												className: "flex items-center gap-2 rounded-xl bg-white text-plum px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-amber-300 active:scale-95 cursor-pointer shadow-md",
												children: copiedCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Copied (",
													activeAnnouncement.voucherCode,
													")"
												] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Copy Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeAnnouncement.voucherCode })] })] })
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 sm:mt-10 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1 max-w-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-plum/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											placeholder: "Search straight, wave, curl, bob, lipstick...",
											className: "w-full rounded-full border border-plum/15 bg-white py-3 pl-11 pr-4 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/10 shadow-xs"
										}),
										searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSearchQuery(""),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs text-plum/40 hover:text-plum cursor-pointer",
											children: "Clear"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between sm:justify-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-plum/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase tracking-wider",
											children: "Sort:"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: sortBy,
										onChange: (e) => setSortBy(e.target.value),
										className: "rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs font-semibold text-plum focus:border-plum focus:outline-none cursor-pointer shadow-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "featured",
												children: "Featured / Best Selling"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "price-asc",
												children: "Price: Low to High"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "price-desc",
												children: "Price: High to Low"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "rating",
												children: "Highest Customer Rating"
											})
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-plum/10 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full",
									children: categories.map((cat) => {
										const isActive = activeCategory === cat.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setActiveCategory(cat.id),
											className: `flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isActive ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 scale-102" : "bg-white/80 text-plum/70 hover:bg-white hover:text-plum border border-plum/10"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive ? "bg-amber-400 text-plum" : "bg-plum/10 text-plum/70"}`,
												children: cat.count
											})]
										}, cat.id);
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-plum/60 shrink-0",
									children: [
										"Showing ",
										filteredProducts.length,
										" of ",
										products.length,
										" items"
									]
								})]
							})]
						}),
						filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-16 flex flex-col items-center justify-center rounded-3xl bg-white border border-plum/10 p-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-16 w-16 items-center justify-center rounded-full bg-plum/5 text-plum/40 mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-8 w-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-plum",
									children: "No products matched your search"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-plum/60 max-w-sm",
									children: "Try searching for another keyword like \"straight\", \"wave\", or switch categories."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setSearchQuery("");
										setActiveCategory("all");
									},
									className: "mt-6 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-lavender-deep cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset All Filters" })
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
							children: filteredProducts.map((p) => {
								const isWishlisted = wishlistedIds.has(p.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
									product: p,
									selectedVariant: selectedVariants[p.id] || p.dots[0]?.name || "Standard",
									isWishlisted,
									isAdded: !!addedIds[p.id],
									onSelectVariant: (v) => handleSelectVariant(p.id, v),
									onToggleWishlist: () => handleToggleWishlist(p.id),
									onQuickView: () => setSelectedQuickViewProduct(p),
									onAddToCart: () => handleAddToCart(p)
								}, p.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 rounded-3xl bg-white border border-plum/10 p-6 md:p-8 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-lavender-deep" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans text-sm font-bold text-plum",
											children: "100% Raw Virgin Hair"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-plum/65 leading-relaxed",
											children: "Single-donor, cuticle-aligned strands that can be bleached to 613 with zero shedding."
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "h-5 w-5 text-lavender-deep" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans text-sm font-bold text-plum",
											children: "Pre-Plucked HD Lace"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-plum/65 leading-relaxed",
											children: "Micro-bleached knots with melted natural hairline ready for glueless or glue wear."
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5 text-lavender-deep" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans text-sm font-bold text-plum",
											children: "Insured DHL Express"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-plum/65 leading-relaxed",
											children: "Doorstep delivery across Nigeria and tracked priority DHL shipping worldwide."
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-lavender-deep" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans text-sm font-bold text-plum",
											children: "Studio Concierge & Fitting"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-plum/65 leading-relaxed",
											children: "Bundle your wig order with professional studio lace customization and bridal glam."
										})] })]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 rounded-2xl border border-plum/10 bg-plum/[0.03] p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-xl md:text-2xl text-plum",
								children: "Need a custom wig unit or bespoke color formulation?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-plum/65",
								children: "Our master stylists construct custom cap sizes, custom highlighted tones, and bridal units."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 sm:mt-0 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Studio!%20I%20would%20like%20to%20inquire%20about%20a%20custom%20wig%20order.",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 text-xs uppercase tracking-wider font-bold shadow-md shadow-[#25D366]/20 transition-all active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat on WhatsApp" })]
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative overflow-hidden border-t border-plum/10 bg-gradient-to-b from-[#FAF9F5] to-blush-soft/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] px-6 pt-12 pb-6 md:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-outfit text-[28px] leading-[36px] font-semibold text-plum",
									children: "Seddypluz Beauty Studio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-sm text-sm leading-relaxed text-plum/60",
									children: "Where artistry meets elegance — crafting bespoke beauty experiences for brides, campaigns, and editorial moments that live forever."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-3 md:col-start-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mb-5 text-lavender-deep",
									children: "Navigation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/",
											className: "text-sm text-plum/60 transition-colors hover:text-plum",
											children: "Studio Home"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "/#services",
											className: "text-sm text-plum/60 transition-colors hover:text-plum",
											children: "Services Atelier"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "/#portfolio",
											className: "text-sm text-plum/60 transition-colors hover:text-plum",
											children: "Bridal Portfolio"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/shop",
											className: "text-sm font-bold text-plum transition-colors",
											children: "Shop Wigs & Hair Products"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "/#contact",
											className: "text-sm text-plum/60 transition-colors hover:text-plum",
											children: "Book a Consultation"
										}) })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mb-5 text-lavender-deep",
									children: "Concierge"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-3 text-sm text-plum/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kaduna Studio Sessions" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Worldwide DHL Express Shipping" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://instagram.com/seddypluz_wigs",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "hover:text-lavender-deep transition-colors",
											children: "@seddypluz_wigs"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://wa.me/2348162292997",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "text-emerald-700 font-semibold hover:text-emerald-800",
											children: "+234 816 229 2997"
										}) })
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 flex flex-col items-center justify-between gap-4 border-t border-plum/10 pt-6 text-xs text-plum/50 md:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Seddypluz Beauty Studio. All rights reserved."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Crafted with" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "h-3 w-3 text-lavender-deep" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "for the modern bride" })
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductQuickViewModal, {
				product: selectedQuickViewProduct,
				isOpen: !!selectedQuickViewProduct,
				onClose: () => setSelectedQuickViewProduct(null),
				onWishlistToggle: handleToggleWishlist,
				isWishlisted: selectedQuickViewProduct ? wishlistedIds.has(selectedQuickViewProduct.id) : false
			})
		]
	});
}
//#endregion
export { ShopPage as component };
