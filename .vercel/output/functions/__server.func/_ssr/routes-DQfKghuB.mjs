import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as require_jsx_runtime, a as Trigger2, i as Root2, l as Slot, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as stringType, i as objectType, n as literalType } from "../_libs/zod.mjs";
import { c as hero_bride_default, d as useServerFn, i as gele_1_default, l as submitAppointment, r as bridal_after_default, s as glam_1_default } from "./glam-1-ClOOCTx9.mjs";
import { A as PartyPopper, C as RotateCcw, D as Plane, I as Maximize2, J as GraduationCap, K as Heart, L as MapPin, N as MessageCircle, O as Phone, P as Menu, R as Mail, _ as Send, a as Trophy, at as Clock, ct as CircleCheck, dt as ChevronDown, gt as Calendar, h as ShieldCheck, ht as Camera, l as Star, lt as ChevronRight, m as ShoppingBag, n as X, o as Truck, ot as CircleQuestionMark, pt as CheckCheck, q as HeartHandshake, r as WandSparkles, rt as Copy, tt as Crown, u as Sparkles, ut as ChevronLeft, vt as ArrowRight, y as Scissors } from "../_libs/lucide-react.mjs";
import { a as getStoredBoutiqueProducts, o as hair_wave_default, r as getActiveAnnouncement } from "./data-CxlY3IqO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, r as useCart } from "./utils-BVIgBnWH.mjs";
import { i as ProductQuickViewModal, n as DialogContent, r as ProductCard, t as Dialog } from "./ProductQuickViewModal-Dxb55MHb.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { l as format } from "../_libs/date-fns.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
import { i as Trigger, n as Portal, r as Root2$1, t as Content2$1 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQfKghuB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var products_default = "/assets/products-Dgazi6ol.jpg";
var photoshoot_default = "/assets/photoshoot-BsZDH25E.jpg";
var event_glam_default = "/assets/event-glam-DOe-tmsy.jpg";
var training_default = "/assets/training-B2pUwdpK.jpg";
var bridal_before_default = "/assets/bridal_before-Bp2oIsIn.png";
var transformation_default = "/assets/transformation-CrafDLDt.jpg";
var artist_default = "/assets/artist-CoiMxyNA.jpg";
var portfolioData = [
	{
		id: "p1",
		title: "The Royal Gold Gele & Bridal Glow",
		category: "bridal",
		categoryLabel: "Bridal & Royalty",
		tag: "Bridal · Couture",
		technique: "Sculpted Infinity Pleat & 18h HD Base",
		description: "Handcrafted metallic golden aso-oke gele paired with rich warm bronze undertones, customized winged liner, and tear-resistant bridal foundation.",
		src: hero_bride_default,
		spanClass: "md:col-span-2 md:row-span-2",
		aspect: "aspect-[4/5] md:aspect-auto md:h-full"
	},
	{
		id: "p2",
		title: "Lavender Velvet & Glass Skin",
		category: "editorial",
		categoryLabel: "Editorial & Glam",
		tag: "Editorial Glam",
		technique: "Dewy Glass Finish & Plum Ombré Lip",
		description: "Camera-calibrated high-definition glow formulated specifically for high-power strobe lighting and magazine editorial spreads.",
		src: glam_1_default,
		spanClass: "md:col-span-1 md:row-span-1",
		aspect: "aspect-[4/5]"
	},
	{
		id: "p3",
		title: "Regal Amethyst Crown Artistry",
		category: "gele",
		categoryLabel: "Gele Artistry",
		tag: "Gele · Heritage",
		technique: "Architectural 14-Layer Pleating",
		description: "Bespoke traditional Nigerian engagement headwrap folded with mathematical precision and lasting comfort for multi-hour ceremonies.",
		src: gele_1_default,
		spanClass: "md:col-span-1 md:row-span-2",
		aspect: "aspect-[4/5] md:aspect-auto md:h-full"
	},
	{
		id: "p4",
		title: "The Atelier Mineral Palette",
		category: "editorial",
		categoryLabel: "Studio Craft",
		tag: "Studio Formulation",
		technique: "Botanical Skincare & Custom Pigments",
		description: "Curated hypoallergenic bases and organic hydrators that create the canvas for every long-lasting Seddypluz transformation.",
		src: products_default,
		spanClass: "md:col-span-1 md:row-span-1",
		aspect: "aspect-[4/5]"
	},
	{
		id: "p5",
		title: "Contemporary African Haute Elegance",
		category: "editorial",
		categoryLabel: "Editorial & Glam",
		tag: "High Fashion",
		technique: "Matte Velvet & Sculpted Contours",
		description: "Striking editorial portrait exploring depth, sharp bone architecture, and understated regal posture for fashion lookbooks.",
		src: photoshoot_default,
		spanClass: "md:col-span-1 md:row-span-1",
		aspect: "aspect-[4/5]"
	},
	{
		id: "p6",
		title: "Bespoke Bridal Metamorphosis",
		category: "transformations",
		categoryLabel: "Transformations",
		tag: "Bridal Transformation",
		technique: "Complete Royal Gele & Glam Suite",
		description: "A complete bridal metamorphosis honoring natural features while elevating the bride into radiant, camera-ready magnificence.",
		src: bridal_after_default,
		spanClass: "md:col-span-2 md:row-span-1",
		aspect: "aspect-[16/10] md:aspect-auto md:h-full"
	},
	{
		id: "p7",
		title: "Bridal Party & Entourage Harmonies",
		category: "bridal",
		categoryLabel: "Bridal & Royalty",
		tag: "Bridal Party",
		technique: "Harmonized Cohesive Tone Suite",
		description: "Seamless aesthetic coordination across the bridal train, creating unforgettable visual harmony in ceremony and reception photography.",
		src: event_glam_default,
		spanClass: "md:col-span-1 md:row-span-2",
		aspect: "aspect-[4/5] md:aspect-auto md:h-full"
	},
	{
		id: "p8",
		title: "Masterclass Atelier Mentorship",
		category: "editorial",
		categoryLabel: "Education",
		tag: "Masterclass",
		technique: "Professional Pro-Artist Intensive",
		description: "Exclusive hands-on masterclass sessions training emerging and professional makeup artists in luxury bridal techniques.",
		src: training_default,
		spanClass: "md:col-span-1 md:row-span-1",
		aspect: "aspect-[4/5]"
	},
	{
		id: "p9",
		title: "Radiant Skin Metamorphosis",
		category: "transformations",
		categoryLabel: "Transformations",
		tag: "Before & After",
		technique: "Poreless Velvet Complexion Calibration",
		description: "Side-by-side demonstration of skin prep, color correction, and luminous bridal highlighting creating a soft-focus bridal aura.",
		src: transformation_default,
		spanClass: "md:col-span-1 md:row-span-1",
		aspect: "aspect-[4/5]"
	},
	{
		id: "p10",
		title: "Pure Glow Bridal Foundation Prep",
		category: "transformations",
		categoryLabel: "Transformations",
		tag: "Skin Canvas",
		technique: "Deep Hydration & Priming Ritual",
		description: "Natural skin preparation before transformative bridal glam, focusing on skin moisture barrier, tone balance, and radiance.",
		src: bridal_before_default,
		spanClass: "md:col-span-1 md:row-span-1",
		aspect: "aspect-[4/5]"
	},
	{
		id: "p11",
		title: "The Lead Artist At Work",
		category: "bridal",
		categoryLabel: "Studio Craft",
		tag: "Lead Artistry",
		technique: "Live Precision Brushwork",
		description: "Behind-the-scenes artistry with lead artist Seddy crafting bespoke bridal beauty with unhurried precision and care.",
		src: artist_default,
		spanClass: "md:col-span-2 md:row-span-1",
		aspect: "aspect-[16/10] md:aspect-auto md:h-full"
	},
	{
		id: "p12",
		title: "Raw Silk Waves & Crown Styling",
		category: "gele",
		categoryLabel: "Hair & Crown",
		tag: "Crown Styling",
		technique: "Lace Melting & Dimensional Waves",
		description: "Luxury raw Cambodian hair customized with sculpted HD lace melting and hand-curled body waves.",
		src: hair_wave_default,
		spanClass: "md:col-span-2 md:row-span-1",
		aspect: "aspect-[16/10] md:aspect-auto md:h-full"
	}
];
var categoryFilters = [
	{
		key: "all",
		label: "All Commissions"
	},
	{
		key: "bridal",
		label: "Bridal & Royalty"
	},
	{
		key: "gele",
		label: "Gele Artistry"
	},
	{
		key: "editorial",
		label: "Editorial & Glam"
	},
	{
		key: "transformations",
		label: "Transformations"
	}
];
function PortfolioGallery() {
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("all");
	const [selectedItemIndex, setSelectedItemIndex] = (0, import_react.useState)(null);
	const filteredItems = (0, import_react.useMemo)(() => {
		if (activeFilter === "all") return portfolioData;
		return portfolioData.filter((item) => item.category === activeFilter);
	}, [activeFilter]);
	const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;
	const handleOpenLightbox = (index) => {
		setSelectedItemIndex(index);
	};
	const handleCloseLightbox = () => {
		setSelectedItemIndex(null);
	};
	const handleNext = () => {
		if (selectedItemIndex === null) return;
		setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
	};
	const handlePrev = () => {
		if (selectedItemIndex === null) return;
		setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "portfolio",
		className: "relative overflow-hidden bg-[#FAF9F5] py-14 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 -left-40 h-[600px] w-[600px] rounded-full bg-mauve/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-lavender/20 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 md:px-12 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-8 rounded-full bg-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow text-lavender-deep",
								children: "Curated Atelier Gallery"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-5xl leading-[1] text-plum md:text-7xl",
							children: [
								"A quiet gallery",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-lavender-deep",
									children: "of moments."
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 max-w-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm md:text-base leading-relaxed text-plum/70",
								children: "Selected commissions across high-society Nigerian weddings, royal engagements, runway editorials, and masterclass cohorts."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-plum/50",
									children: "Follow our artistry:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://instagram.com/seddypluz_wigs",
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "Follow us on Instagram @seddypluz_wigs",
										className: "group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.8",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "2",
													y: "2",
													width: "20",
													height: "20",
													rx: "5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "12",
													r: "5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "17.5",
													cy: "6.5",
													r: "1.5",
													fill: "currentColor",
													stroke: "none"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold tracking-wide",
											children: "@seddypluz_wigs"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://tiktok.com/@seddypluz_wigs",
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "Follow us on TikTok @seddypluz_wigs",
										className: "group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110",
											viewBox: "0 0 24 24",
											fill: "currentColor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.3 8.3 0 004.76 1.49V7.09a4.84 4.84 0 01-1-.4z" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold tracking-wide",
											children: "@seddypluz_wigs"
										})]
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2 sm:gap-3 mb-12",
						children: categoryFilters.map((tab) => {
							const count = tab.key === "all" ? portfolioData.length : portfolioData.filter((i) => i.category === tab.key).length;
							const isActive = activeFilter === tab.key;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveFilter(tab.key),
								className: `group flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${isActive ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 scale-[1.02]" : "bg-white text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors ${isActive ? "bg-amber-400 text-plum" : "bg-plum/5 text-plum/50 group-hover:bg-plum/10"}`,
									children: count
								})]
							}, tab.key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-dense gap-4 md:gap-6 auto-rows-[280px]",
						children: filteredItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							onClick: () => handleOpenLightbox(index),
							className: `group relative overflow-hidden rounded-[2rem] bg-plum/5 border border-plum/10 shadow-[0_12px_36px_-10px_rgba(82,58,77,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(82,58,77,0.18)] cursor-pointer ${item.spanClass}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.src,
									alt: item.title,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.08]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-4 inset-x-4 flex items-center justify-between z-10 opacity-0 transform -translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FAF9F5] border border-white/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5 text-amber-300" }), item.tag]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30 shadow-md transition-transform hover:scale-110",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "absolute inset-x-4 bottom-4 z-10 flex flex-col justify-end text-ivory opacity-0 transform translate-y-3 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-widest font-semibold text-amber-300",
											children: item.technique
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl md:text-2xl text-white font-medium leading-snug mt-1",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center justify-between border-t border-white/20 pt-2 text-[11px] text-ivory/70",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click to view look details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display italic text-amber-300 text-sm",
												children: String(index + 1).padStart(2, "0")
											})]
										})
									]
								})
							]
						}, item.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: selectedItemIndex !== null,
				onOpenChange: (open) => !open && handleCloseLightbox(),
				children: selectedItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-5xl p-0 overflow-hidden bg-plum border border-white/15 text-ivory rounded-[2.5rem] shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-12 min-h-[500px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-7 relative bg-black/40 flex items-center justify-center overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedItem.src,
									alt: selectedItem.title,
									className: "w-full h-full max-h-[70vh] object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										handlePrev();
									},
									"aria-label": "Previous image",
									className: "absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-plum transition-all cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										handleNext();
									},
									"aria-label": "Next image",
									className: "absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-plum transition-all cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300 border border-amber-400/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), selectedItem.tag]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-ivory/50",
										children: [
											"Look ",
											String(selectedItemIndex + 1).padStart(2, "0"),
											" of",
											" ",
											filteredItems.length
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl sm:text-4xl text-white leading-tight",
									children: selectedItem.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-white/5 p-3.5 border border-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-wider font-bold text-amber-300",
											children: "Technique & Base:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-ivory/80 font-sans",
											children: selectedItem.technique
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-ivory/75 font-sans",
										children: selectedItem.description
									})]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-4 border-t border-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/2348162292997?text=${encodeURIComponent(`Hello Seddypluz! I love the "${selectedItem.title}" (${selectedItem.tag}) look from your portfolio and would like to inquire about booking it for my event.`)}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center justify-center gap-2.5 w-full rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4.5 w-4.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire This Signature Look" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#contact",
									onClick: handleCloseLightbox,
									className: "flex items-center justify-center w-full rounded-full bg-white/10 hover:bg-white/20 text-white py-3 text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reserve Date In Calendar" })
								})]
							})]
						})]
					})
				})
			})
		]
	});
}
function TransformationSlider() {
	const [sliderPosition, setSliderPosition] = (0, import_react.useState)(50);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const handleMove = (0, import_react.useCallback)((clientX) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percent = Math.min(Math.max(x / rect.width * 100, 0), 100);
		setSliderPosition(percent);
	}, []);
	const handleTouchMove = (0, import_react.useCallback)((e) => {
		if (e.touches.length > 0) handleMove(e.touches[0].clientX);
	}, [handleMove]);
	const handleMouseMove = (0, import_react.useCallback)((e) => {
		if (!isDragging) return;
		handleMove(e.clientX);
	}, [isDragging, handleMove]);
	const handleMouseDown = () => setIsDragging(true);
	const handleMouseUp = () => setIsDragging(false);
	(0, import_react.useEffect)(() => {
		const handleGlobalMouseUp = () => setIsDragging(false);
		window.addEventListener("mouseup", handleGlobalMouseUp);
		return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "transformations",
		className: "relative py-14 md:py-24 bg-[#FAF9F5] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-mauve/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-lavender/20 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 md:px-12 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-8 rounded-full bg-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-lavender-deep",
							children: "The Artistry"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl leading-[1.05] text-plum md:text-6xl",
						children: [
							"Before & After",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-lavender-deep",
								children: "Transformations."
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm md:text-base leading-relaxed text-plum/70",
							children: "Drag the interactive slider below to reveal the seamless transition from natural skin to radiant, camera-ready bridal opulence."
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: containerRef,
							onMouseDown: handleMouseDown,
							onMouseMove: handleMouseMove,
							onTouchStart: (e) => {
								setIsDragging(true);
								if (e.touches.length > 0) handleMove(e.touches[0].clientX);
							},
							onTouchMove: handleTouchMove,
							onTouchEnd: handleMouseUp,
							className: "group relative h-[400px] xs:h-[460px] sm:h-[560px] w-full select-none overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-plum/10 shadow-[0_24px_50px_-12px_rgba(82,58,77,0.12)] cursor-ew-resize touch-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: bridal_after_default,
									alt: "Bridal Makeup Transformation - After",
									className: "absolute inset-0 h-full w-full object-cover",
									draggable: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 overflow-hidden",
									style: { clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: bridal_before_default,
										alt: "Bridal Makeup Transformation - Before",
										className: "absolute inset-0 h-full w-full object-cover",
										draggable: false
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-6 left-6 z-20 pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-plum/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FAF9F5] shadow-md border border-white/20",
										children: "Natural Bare"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-6 right-6 z-20 pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-amber-400/90 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-plum shadow-md border border-white/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Bridal Glam"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-0 bottom-0 z-30 w-1 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.4)]",
									style: { left: `${sliderPosition}%` },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-plum shadow-[0_8px_24px_rgba(82,58,77,0.3)] ring-4 ring-amber-400 transition-transform group-hover:scale-110 active:scale-95",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "h-5 w-5 text-plum",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.5",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												d: "M8 9l-4 3 4 3M16 9l4 3-4 3"
											})
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-plum/80 border border-white/50 shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "← Drag to Compare →" })
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex items-center justify-center gap-3",
							children: [
								{
									label: "100% Before",
									pos: 100
								},
								{
									label: "50% Split",
									pos: 50
								},
								{
									label: "100% After Glam",
									pos: 0
								}
							].map((btn) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSliderPosition(btn.pos),
								className: `rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${sliderPosition === btn.pos ? "bg-plum text-[#FAF9F5] shadow-xs" : "bg-plum/5 text-plum/70 hover:bg-plum/10"}`,
								children: btn.label
							}, btn.label))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-lavender-deep",
									children: "Signature Technique"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-3xl md:text-4xl text-plum leading-tight",
									children: "Enhancing your essence, never masking your identity."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm leading-relaxed text-plum/75",
									children: "Every bridal glam at Seddypluz begins with deep skin prep and custom color theory, formulated to withstand tropical climate, tears of joy, and 16+ hours of wedding celebrations."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: [
									{
										icon: WandSparkles,
										title: "18-Hour Humidity-Proof Base",
										desc: "HD silicone & water-resistant foundation formula that preserves skin texture in high-resolution 4K photography."
									},
									{
										icon: Sparkles,
										title: "Precision Brow & Eye Architecture",
										desc: "Feathered brow stroke mapping paired with custom multi-dimensional lash fans that complement your eye shape."
									},
									{
										icon: ShieldCheck,
										title: "Regal Gele & Veil Crafting",
										desc: "Structured pleating and bespoke crown placement for traditional engagement and white wedding royalty."
									}
								].map((feat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4 rounded-2xl bg-white p-4.5 border border-plum/5 shadow-[0_4px_16px_rgba(82,58,77,0.03)] transition-all hover:border-plum/15 hover:shadow-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-plum/5 text-plum",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feat.icon, { className: "h-5 w-5 text-lavender-deep" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-plum font-sans",
										children: feat.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-relaxed text-plum/65",
										children: feat.desc
									})] })]
								}, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									className: "group inline-flex items-center gap-3 rounded-full bg-plum px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-[#FAF9F5] shadow-lg shadow-plum/20 transition-all hover:bg-lavender-deep hover:shadow-xl active:scale-[0.98]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reserve Your Wedding Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
								})
							})
						]
					})]
				})]
			})
		]
	});
}
var testimonials = [
	{
		id: "t1",
		name: "Dr. Adesewa Olayinka-Bello",
		role: "Bride",
		event: "Traditional & White Wedding",
		location: "Victoria Island, Lagos",
		date: "December 2025",
		rating: 5,
		avatar: hero_bride_default,
		quote: "Seddypluz was the greatest decision of my wedding journey. From our initial 6 AM skin consultation to the final dance at 2 AM, my bridal glam remained 100% intact with zero creasing or oiliness under Lagos humidity. She gave me a look that made my husband tear up when I walked down the aisle.",
		highlight: "18-Hour Flawless Durability"
	},
	{
		id: "t2",
		name: "Chief (Mrs.) Folashade Adeleke",
		role: "Mother of the Bride & Matron",
		event: "Royal Traditional Engagement",
		location: "Abuja FCT",
		date: "January 2026",
		rating: 5,
		avatar: gele_1_default,
		quote: "The infinity pleat gele artistry is world-class. Seddypluz structured my Aso-Oke crown so effortlessly that it stayed comfortable and regal throughout the 8-hour celebration. The respect, punctuality, and serenity she brings to a chaotic wedding morning is unmatched.",
		highlight: "Architectural Gele Precision"
	},
	{
		id: "t3",
		name: "Zainab Al-Hassan",
		role: "Editorial Fashion Director",
		event: "Mercedes-Benz Fashion Week & Gala",
		location: "Eko Atlantic, Lagos",
		date: "November 2025",
		rating: 5,
		avatar: glam_1_default,
		quote: "Working with Seddypluz on high-definition editorial campaigns is pure poetry. Her grasp of lighting, skin undertones, and texture allows photographers to shoot straight out of camera without needing hours of retouching. A master of subtle luxury.",
		highlight: "High-Definition 4K Ready"
	},
	{
		id: "t4",
		name: "Chioma Ekwueme-Davies",
		role: "Destination Bride",
		event: "Destination Luxury Wedding",
		location: "Zanzibar & Port Harcourt",
		date: "February 2026",
		rating: 5,
		avatar: event_glam_default,
		quote: "She travelled with us to Zanzibar and created three distinct looks for our welcome dinner, white beach ceremony, and traditional reception. Every single look was breathtaking and tailored to the coastal breeze. Truly five-star atelier service.",
		highlight: "Seamless Destination Artistry"
	},
	{
		id: "t5",
		name: "Temitope Balogun",
		role: "Boutique VIP Client",
		event: "Custom 26\" Bone Straight Wig & Installation",
		location: "Ikoyi, Lagos",
		date: "January 2026",
		rating: 5,
		avatar: photoshoot_default,
		quote: "I ordered the 26\" Bone Straight luxury weave from the boutique and had it installed in the studio. The hair is silky, thick from root to tip with zero shedding after washing. The HD lace melting is completely undetectable even up close!",
		highlight: "Undetectable HD Lace Melting"
	}
];
function TestimonialsCarousel() {
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const touchStartXRef = import_react.useRef(null);
	(0, import_react.useEffect)(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % testimonials.length);
		}, 7e3);
		return () => clearInterval(interval);
	}, [isPaused]);
	const current = testimonials[currentIndex];
	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length);
	};
	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};
	const handleTouchStart = (e) => {
		setIsPaused(true);
		touchStartXRef.current = e.touches[0].clientX;
	};
	const handleTouchEnd = (e) => {
		if (touchStartXRef.current === null) return;
		const diff = touchStartXRef.current - e.changedTouches[0].clientX;
		if (diff > 45) handleNext();
		else if (diff < -45) handlePrev();
		touchStartXRef.current = null;
		setTimeout(() => setIsPaused(false), 3e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "reviews",
		className: "relative py-14 md:py-24 bg-white overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blush-soft/80 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-mauve/10 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 md:px-12 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center max-w-3xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-plum/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lavender-deep mb-3 border border-plum/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Bride & Client Stories" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-5xl leading-[1.05] text-plum md:text-7xl",
								children: [
									"Words from our ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-lavender-deep",
										children: "Cherished Brides."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm md:text-base text-plum/70",
								children: "Discover why hundreds of discerning brides and editorial commissioners trust Seddypluz for their defining celebrations."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onMouseEnter: () => setIsPaused(true),
						onMouseLeave: () => setIsPaused(false),
						onTouchStart: handleTouchStart,
						onTouchEnd: handleTouchEnd,
						className: "relative max-w-4xl mx-auto rounded-[2rem] sm:rounded-[3rem] bg-[#FAF9F5] p-6 sm:p-12 md:p-16 border border-plum/10 shadow-[0_20px_50px_-15px_rgba(82,58,77,0.08)] transition-all select-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-amber-400",
									children: [[...Array(current.rating)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 fill-current" }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 text-xs font-bold text-plum/70 uppercase tracking-widest",
										children: "5.0 Verified Artistry"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-plum/10 px-3.5 py-1 text-[11px] font-bold text-plum uppercase tracking-wider",
									children: current.highlight
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-serif italic text-xl sm:text-2xl md:text-3xl leading-relaxed text-plum/90",
									children: [
										"\"",
										current.quote,
										"\""
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 pt-8 border-t border-plum/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: current.avatar,
											alt: current.name,
											className: "h-14 w-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans font-bold text-lg text-plum flex items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: current.name })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-lavender-deep font-semibold tracking-wider uppercase",
											children: [
												current.role,
												" · ",
												current.event
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-plum/50 mt-0.5",
											children: [
												current.location,
												" · ",
												current.date
											]
										})
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handlePrev,
										"aria-label": "Previous testimonial",
										className: "flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 bg-white text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleNext,
										"aria-label": "Next testimonial",
										className: "flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 bg-white text-plum transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex justify-center gap-2",
								children: testimonials.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCurrentIndex(idx),
									"aria-label": `Go to slide ${idx + 1}`,
									className: `h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? "w-8 bg-plum" : "w-2 bg-plum/20 hover:bg-plum/40"}`
								}, t.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
						children: [
							{
								icon: HeartHandshake,
								number: "500+",
								label: "Brides Celebrated",
								sub: "Lagos, Abuja & Abroad"
							},
							{
								icon: Trophy,
								number: "10+",
								label: "Years of Craft",
								sub: "Masterclass Certified"
							},
							{
								icon: ShieldCheck,
								number: "100%",
								label: "On-Time Arrival Record",
								sub: "Stress-Free Mornings"
							},
							{
								icon: Sparkles,
								number: "5.0 ★",
								label: "Client Satisfaction",
								sub: "Over 200+ Reviews"
							}
						].map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center text-center p-6 rounded-3xl bg-[#FAF9F5] border border-plum/5 shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-plum/5 text-plum mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(stat.icon, { className: "h-6 w-6 text-lavender-deep" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl font-bold text-plum",
									children: stat.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider font-bold text-plum/80 mt-1",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-plum/50 mt-0.5",
									children: stat.sub
								})
							]
						}, i))
					})
				]
			})
		]
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var faqList = [
	{
		id: "faq-1",
		category: "booking",
		question: "How far in advance should I book my bridal glam session?",
		answer: "We recommend reserving your wedding date 3 to 6 months in advance, especially for high-demand wedding seasons (October through January). Because Seddypluz accepts a limited number of brides per weekend to ensure dedicated focus, early consultation secures your date on our master calendar."
	},
	{
		id: "faq-2",
		category: "booking",
		question: "What is your booking retainer and cancellation policy?",
		answer: "A 50% non-refundable retainer is required upon contract signing to lock in your date. The remaining 50% balance is due 7 days prior to the wedding event. In the event of date rescheduling, we accommodate your new date subject to calendar availability with at least 30 days prior notice."
	},
	{
		id: "faq-3",
		category: "travel",
		question: "Do you travel outside Lagos and for destination weddings?",
		answer: "Yes! Seddypluz frequently travels across Nigeria (Abuja, Port Harcourt, Ibadan, Calabar) and internationally (United Kingdom, United States, Dubai, Ghana, Zanzibar). Destination packages include travel logistics, full-day touchup support, and multi-event look changes (Welcome Dinner, Traditional Ceremony, White Wedding)."
	},
	{
		id: "faq-4",
		category: "prep",
		question: "Is a bridal preview (trial session) included in the package?",
		answer: "Yes. Full bridal packages include an intimate 2.5-hour in-studio trial session scheduled 2 to 4 weeks before your big day. We map your skin undertones, test sweat-resistant base formulations, customize lash fans, and conduct a preliminary gele styling to finalize your personalized wedding day portrait."
	},
	{
		id: "faq-5",
		category: "wigs",
		question: "What is the quality of hair extensions in the Seddypluz Boutique?",
		answer: "Our boutique features 100% Raw Virgin Remy and Double-Drawn human hair extensions with full cuticle alignment. They can be heat-styled, dyed, bleached, and reused for 3+ years with proper maintenance. All wigs come pre-plucked with ultra-thin HD Swiss lace for an invisible melt."
	},
	{
		id: "faq-6",
		category: "wigs",
		question: "Can I get my boutique wig styled or installed in the studio?",
		answer: "Absolutely. When you purchase any luxury wig or bundle deal from our boutique, you can book an in-studio customization and installation session where we bleach the knots, tint the lace to your exact skin tone, and style it into bone straight, soft glam waves, or an editorial cut."
	},
	{
		id: "faq-7",
		category: "prep",
		question: "How should I prepare my skin and hair before my session?",
		answer: "We provide every bride with a comprehensive 14-day pre-wedding skin prep guide. On the morning of your session, arrive with a cleansed, moisturized bare face, and freshly washed, oil-free cornrows (flat to the scalp) if you are wearing a wig or sculpted gele."
	}
];
function FaqSection() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const filteredFaqs = activeCategory === "all" ? faqList : faqList.filter((item) => item.category === activeCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "relative py-14 md:py-24 bg-[#FAF9F5] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-mauve/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-10 -left-32 h-[400px] w-[400px] rounded-full bg-lavender/20 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 md:px-12 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center max-w-3xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-plum/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lavender-deep mb-4 border border-plum/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frequently Asked Questions" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-5xl leading-[1.05] text-plum md:text-7xl",
								children: [
									"Everything You Need ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-lavender-deep",
										children: "To Know."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm md:text-base text-plum/70",
								children: "Clear answers regarding our bridal consultation, travel logistics, bespoke wigs, and appointment booking process."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-center gap-2 mb-12",
						children: [
							{
								key: "all",
								label: "All Questions"
							},
							{
								key: "booking",
								label: "Booking & Policy"
							},
							{
								key: "travel",
								label: "Destination Travel"
							},
							{
								key: "wigs",
								label: "Boutique Wigs"
							},
							{
								key: "prep",
								label: "Skin & Trials"
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCategory(tab.key),
							className: `rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCategory === tab.key ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20" : "bg-white text-plum/70 hover:bg-plum/5 border border-plum/10"}`,
							children: tab.label
						}, tab.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-4xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-plum/10 shadow-[0_20px_50px_-15px_rgba(82,58,77,0.06)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							type: "single",
							collapsible: true,
							className: "w-full space-y-4",
							children: filteredFaqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								value: faq.id,
								className: "border border-plum/10 rounded-2xl px-6 py-1 data-[state=open]:border-plum/25 data-[state=open]:bg-[#FAF9F5]/60 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: "font-serif text-lg md:text-xl font-bold text-plum hover:no-underline hover:text-lavender-deep py-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: faq.question })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									className: "text-sm leading-relaxed text-plum/75 pb-6 font-sans",
									children: faq.answer
								})]
							}, faq.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-plum to-[#3e2338] p-8 md:p-12 text-[#FAF9F5] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-amber-300 mb-3 border border-white/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Direct Artist Consultation"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl md:text-3xl text-[#FAF9F5]",
								children: "Have a custom request or unique event timeline?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs md:text-sm text-[#FAF9F5]/75 max-w-lg leading-relaxed",
								children: "Chat directly with Seddypluz on WhatsApp for instant date availability checks and custom bridal quotes."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio!%20I%20have%20a%20question%20regarding%20booking%20and%20bridal%20dates.",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "shrink-0 flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4.5 w-4.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat on WhatsApp" })]
						})]
					})
				]
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Calendar$1({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var Popover = Root2$1;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2$1.displayName;
var bookingServices = [
	{
		id: "bridal",
		name: "Bridal Makeup",
		icon: Crown,
		desc: "Bespoke bridal artistry crafted for your once-in-a-lifetime moment.",
		badge: "Most Requested"
	},
	{
		id: "gele",
		name: "Gele Styling",
		icon: Scissors,
		desc: "Sculptural headwrap artistry celebrating heritage with couture precision.",
		badge: "Heritage"
	},
	{
		id: "pro",
		name: "Professional Makeup",
		icon: WandSparkles,
		desc: "Signature glam for the woman who commands every room she enters.",
		badge: "Signature"
	},
	{
		id: "trans",
		name: "Beauty Transformation",
		icon: Sparkles,
		desc: "A studio experience that reveals the face you already carry within.",
		badge: "Iconic"
	},
	{
		id: "train",
		name: "Beauty Training",
		icon: GraduationCap,
		desc: "Intimate masterclasses for artists shaping the next chapter of beauty.",
		badge: "Masterclass"
	},
	{
		id: "home",
		name: "Home Service Makeup",
		icon: Plane,
		desc: "The studio, arrived — private, unhurried, entirely yours.",
		badge: "VIP Travel"
	},
	{
		id: "photo",
		name: "Photoshoot Makeup",
		icon: Camera,
		desc: "Camera-luminous finishes tuned for editorial and campaign light.",
		badge: "Editorial"
	},
	{
		id: "event",
		name: "Event Glam",
		icon: PartyPopper,
		desc: "Statement looks for galas, soirées, and every night worth remembering.",
		badge: "Evening"
	}
];
var availableTimeSlots = [
	"09:00 AM",
	"10:00 AM",
	"11:00 AM",
	"12:00 PM",
	"01:00 PM",
	"02:00 PM",
	"03:00 PM",
	"04:00 PM",
	"05:00 PM",
	"06:00 PM"
];
var appointmentFormSchema = objectType({
	name: stringType().trim().min(2, "Name is required").max(120, "Name is too long"),
	email: stringType().trim().email("Invalid email address").max(255, "Email is too long"),
	phone: stringType().trim().max(30, "Phone number is too long").optional().or(literalType("")),
	service: stringType().min(1, "Please select a service"),
	appointmentDate: stringType().min(1, "Please select a date"),
	preferredTime: stringType().min(1, "Please select a preferred time"),
	notes: stringType().max(1e3, "Note is too long").optional().or(literalType(""))
});
function BookingSection() {
	const [calendarOpen, setCalendarOpen] = (0, import_react.useState)(false);
	const [submittedData, setSubmittedData] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(appointmentFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			service: "Bridal Makeup",
			appointmentDate: "",
			preferredTime: "10:00 AM",
			notes: ""
		}
	});
	const selectedService = form.watch("service");
	const selectedTime = form.watch("preferredTime");
	const selectedDate = form.watch("appointmentDate");
	const submit = useServerFn(submitAppointment);
	async function onSubmit(values) {
		setSubmitting(true);
		try {
			await submit({ data: values });
			setSubmittedData(values);
			toast.success("Your appointment inquiry has been registered!", { description: "Click below to fast-track your booking via WhatsApp." });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setSubmitting(false);
		}
	}
	const generateWhatsAppUrl = (data) => {
		const formattedDate = data.appointmentDate ? format(new Date(data.appointmentDate), "EEEE, MMMM d, yyyy") : "Pending Selection";
		const msg = `Hello Seddypluz Beauty Studio! ✨\n\nI just submitted an appointment inquiry on your website:\n\n👤 *Name:* ${data.name}\n💄 *Service:* ${data.service}\n📅 *Date:* ${formattedDate}\n⏰ *Time:* ${data.preferredTime}\n📧 *Email:* ${data.email}\n📱 *Phone:* ${data.phone || "Not provided"}\n📝 *Notes:* ${data.notes || "None"}\n\nPlease confirm availability and let me know the next steps for securing this date!`;
		return `https://wa.me/2348162292997?text=${encodeURIComponent(msg)}`;
	};
	const handleReset = () => {
		setSubmittedData(null);
		form.reset({
			name: "",
			email: "",
			phone: "",
			service: "Bridal Makeup",
			appointmentDate: "",
			preferredTime: "10:00 AM",
			notes: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "relative overflow-hidden bg-plum py-14 text-ivory md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl pointer-events-none",
				style: { background: "var(--lavender)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl pointer-events-none",
				style: { background: "var(--mauve)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-[1600px] px-6 md:px-12 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4 border border-white/15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reserve · By Consultation" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-5xl leading-[1.05] md:text-7xl text-white",
									children: [
										"Let us hold",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: "text-amber-300",
											children: "the mirror"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"for you."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-sm md:text-base leading-relaxed text-ivory/75",
									children: "Sessions are booked by consultation. Complete the form to reserve your date on our calendar, or connect directly on WhatsApp for priority scheduling."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6 pt-4 border-t border-white/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-widest font-bold text-amber-300/90",
											children: "Physical Studio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-ivory/85",
											children: "Shop 4/5 Gizo Plaza, Nafdac Area, Kaduna, Nigeria"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-widest font-bold text-amber-300/90",
											children: "Correspondence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-ivory/85",
											children: "ask@seddypluz.com.ng"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-widest font-bold text-amber-300/90",
											children: "Direct Line & WhatsApp"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20a%20session.",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "mt-1 block text-sm font-semibold text-ivory hover:text-amber-300 transition-colors",
											children: "+234 · 816 · 229 · 2997"
										})] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-white/5 p-5 border border-white/10 backdrop-blur-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-white",
										children: "Guaranteed Dedicated Artistry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-ivory/70 mt-0.5",
										children: "We cap bridal bookings to ensure 100% focused, unhurried perfection on your day."
									})] })]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-8",
						children: submittedData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[2.5rem] bg-white/10 backdrop-blur-xl p-8 sm:p-12 border border-white/20 text-center animate-in fade-in zoom-in-95 duration-500 shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 mb-6 shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3 border border-emerald-400/30",
									children: "Request Registered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-3xl sm:text-4xl text-white",
									children: [
										"Thank you, ",
										submittedData.name,
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-ivory/80 max-w-md mx-auto leading-relaxed",
									children: "Your appointment request has been logged. For instant calendar confirmation and deposit processing, fast-track your inquiry via WhatsApp below:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-8 rounded-2xl bg-plum/60 p-6 text-left border border-white/10 max-w-lg mx-auto space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs border-b border-white/10 pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-ivory/60 uppercase tracking-wider",
												children: "Service"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-amber-300",
												children: submittedData.service
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs border-b border-white/10 pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-ivory/60 uppercase tracking-wider",
												children: "Requested Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-white",
												children: submittedData.appointmentDate ? format(new Date(submittedData.appointmentDate), "EEEE, MMMM d, yyyy") : "Pending"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs border-b border-white/10 pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-ivory/60 uppercase tracking-wider",
												children: "Preferred Time"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-white",
												children: submittedData.preferredTime
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-ivory/60 uppercase tracking-wider",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/90",
												children: submittedData.email
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-center justify-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: generateWhatsAppUrl(submittedData),
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4.5 text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send to Studio on WhatsApp" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleReset,
										className: "w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white px-6 py-4.5 text-xs font-bold uppercase tracking-widest border border-white/20 transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Another Service" })]
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: form.handleSubmit(onSubmit),
							className: "rounded-[2.5rem] bg-white/5 backdrop-blur-xl p-8 sm:p-12 border border-white/15 shadow-2xl space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs uppercase tracking-widest font-bold text-amber-300",
											children: "Step 1 · Choose Your Service"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-ivory/60",
											children: ["Selected: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-white",
												children: selectedService
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
										children: bookingServices.map((srv) => {
											const isSelected = selectedService === srv.name;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => form.setValue("service", srv.name, { shouldValidate: true }),
												className: `group relative flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all cursor-pointer ${isSelected ? "bg-amber-400 text-plum border-amber-300 shadow-lg shadow-amber-400/20 scale-[1.02]" : "bg-white/5 text-ivory/80 border-white/10 hover:bg-white/10 hover:border-white/25"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `flex h-9 w-9 items-center justify-center rounded-xl mb-2 transition-colors ${isSelected ? "bg-plum text-amber-300" : "bg-white/10 text-amber-300"}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(srv.icon, { className: "h-4.5 w-4.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold leading-tight font-sans",
														children: srv.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `mt-1 text-[9px] uppercase tracking-wider font-semibold ${isSelected ? "text-plum/80" : "text-ivory/50"}`,
														children: srv.badge
													})
												]
											}, srv.id);
										})
									}),
									form.formState.errors.service && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-rose-300",
										children: form.formState.errors.service.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs uppercase tracking-widest font-bold text-amber-300 mb-4 block",
									children: "Step 2 · Select Preferred Date & Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-12 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "md:col-span-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											open: calendarOpen,
											onOpenChange: setCalendarOpen,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													className: cn("w-full h-12 justify-start rounded-2xl border-white/20 bg-white/10 px-4 text-left text-sm font-medium text-white hover:bg-white/15 hover:text-white border", !selectedDate && "text-ivory/50"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mr-3 h-4 w-4 text-amber-300" }), selectedDate ? format(new Date(selectedDate), "MMM d, yyyy") : "Pick Appointment Date"]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												className: "w-auto p-0 bg-plum border border-white/20 text-ivory rounded-2xl shadow-2xl",
												align: "start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
													mode: "single",
													selected: selectedDate ? new Date(selectedDate) : void 0,
													onSelect: (date) => {
														form.setValue("appointmentDate", date ? format(date, "yyyy-MM-dd") : "", { shouldValidate: true });
														setCalendarOpen(false);
													},
													disabled: (date) => date < new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)),
													initialFocus: true,
													className: cn("p-3 pointer-events-auto text-white")
												})
											})]
										}), form.formState.errors.appointmentDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-rose-300",
											children: form.formState.errors.appointmentDate.message
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "md:col-span-7",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: availableTimeSlots.map((slot) => {
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => form.setValue("preferredTime", slot, { shouldValidate: true }),
													className: `rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedTime === slot ? "bg-amber-400 text-plum shadow-md scale-105" : "bg-white/5 text-ivory/70 border border-white/10 hover:bg-white/15"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "inline-block h-3 w-3 mr-1 -mt-0.5" }), slot]
												}, slot);
											})
										}), form.formState.errors.preferredTime && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-rose-300",
											children: form.formState.errors.preferredTime.message
										})]
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs uppercase tracking-widest font-bold text-amber-300 mb-4 block",
										children: "Step 3 · Client Contact Details"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-3 gap-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Full Name *",
												...form.register("name"),
												className: "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
											}), form.formState.errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 text-xs text-rose-300",
												children: form.formState.errors.name.message
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												placeholder: "Email Address *",
												...form.register("email"),
												className: "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
											}), form.formState.errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 text-xs text-rose-300",
												children: form.formState.errors.email.message
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "tel",
												placeholder: "Phone / WhatsApp Number",
												...form.register("phone"),
												className: "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
											}), form.formState.errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 text-xs text-rose-300",
												children: form.formState.errors.phone.message
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 3,
											placeholder: "Event details, location, skin notes, or inspiration...",
											...form.register("notes"),
											className: "w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
										})
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: submitting,
										className: "w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 text-plum px-9 py-4.5 text-xs font-bold uppercase tracking-[0.25em] shadow-xl shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: submitting ? "Registering Request..." : "Register Booking Request" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio!%20I'd%20like%20to%20inquire%20about%20booking%20a%20bridal%20or%20glam%20session.",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-ivory px-6 py-4.5 text-xs font-bold uppercase tracking-wider border border-white/15 transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-[#25D366]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Direct WhatsApp Inquiry" })]
									})]
								})
							]
						})
					})]
				})
			})
		]
	});
}
function BoutiqueSection({ isFullShopPage = false, limit = 3 }) {
	const { addItem } = useCart();
	const [products, setProducts] = (0, import_react.useState)(() => getStoredBoutiqueProducts());
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
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
	const filteredProducts = products.filter((p) => {
		if (activeCategory === "all") return true;
		if (activeCategory === "wigs") return p.category === "wigs";
		if (activeCategory === "cosmetics") return p.category === "cosmetics";
		if (activeCategory === "bestseller") return !!p.isBestseller;
		return true;
	});
	const displayedProducts = isFullShopPage ? filteredProducts : filteredProducts.slice(0, limit);
	const categories = [
		{
			id: "all",
			label: "All Featured",
			count: products.length
		},
		{
			id: "wigs",
			label: "Luxury Wigs & Extensions",
			count: products.filter((p) => p.category === "wigs").length
		},
		{
			id: "cosmetics",
			label: "Signature Cosmetics",
			count: products.filter((p) => p.category === "cosmetics").length
		},
		{
			id: "bestseller",
			label: "Studio Bestsellers",
			count: products.filter((p) => p.isBestseller).length
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "boutique",
		className: "relative py-16 md:py-24 bg-[#FAF9F5] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 -right-40 h-96 w-96 rounded-full bg-mauve/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-10 -left-40 h-96 w-96 rounded-full bg-lavender/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 md:px-12 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/80 backdrop-blur-md px-3.5 py-1 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-plum font-semibold tracking-widest text-[10px]",
								children: "Wigs & Hair Products"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl leading-[1.08] text-plum sm:text-5xl md:text-6xl",
							children: [
								"Signature",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-lavender-deep font-normal italic",
									children: "hair & beauty pieces."
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 max-w-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm md:text-base leading-relaxed text-plum/70 lg:text-right",
								children: "Crafted from 100% cuticle-aligned raw virgin hair and camera-calibrated bridal formulas, available for direct order & nationwide delivery."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 lg:justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									className: "group inline-flex items-center gap-2 rounded-full bg-plum px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF9F5] shadow-sm transition-all hover:bg-lavender-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Full Shop" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://instagram.com/seddypluz_wigs",
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "Shop wigs on Instagram @seddypluz_wigs",
										className: "group flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3.5 py-1.5 text-plum/70 shadow-xs transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.8",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "2",
													y: "2",
													width: "20",
													height: "20",
													rx: "5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "12",
													r: "5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "17.5",
													cy: "6.5",
													r: "1.5",
													fill: "currentColor",
													stroke: "none"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold tracking-wide",
											children: "@seddypluz_wigs"
										})]
									})
								})]
							})]
						})]
					}),
					activeAnnouncement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mt-8 rounded-2xl p-4 md:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border relative overflow-hidden transition-all duration-300 ${activeAnnouncement.theme === "amber" ? "bg-gradient-to-r from-[#3D2502] via-[#5C3A08] to-[#2B1A02] text-amber-100 border-amber-400/40 shadow-amber-950/30" : activeAnnouncement.theme === "emerald" ? "bg-gradient-to-r from-[#032B1C] via-[#084D34] to-[#021F14] text-emerald-100 border-emerald-500/40 shadow-emerald-950/30" : activeAnnouncement.theme === "rose" ? "bg-gradient-to-r from-[#3B0818] via-[#59122A] to-[#2B0511] text-rose-100 border-rose-400/40 shadow-rose-950/30" : activeAnnouncement.theme === "dark" ? "bg-gradient-to-r from-[#170E15] via-[#241320] to-[#120B10] text-[#FAF9F5] border-white/20 shadow-black/40" : "bg-gradient-to-r from-plum via-[#684a62] to-plum text-[#FAF9F5] border-white/10 shadow-plum/15"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 z-10 text-center sm:text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-amber-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5" }), activeAnnouncement.pulseAnimation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute -top-1 -right-1 flex h-3 w-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-amber-500 ring-2 ring-white/20" })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center sm:justify-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-300 border border-amber-300/30",
										children: activeAnnouncement.badgeLabel || "Exclusive Promo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold opacity-80",
										children: [activeAnnouncement.discountPercent, " Value"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs sm:text-sm font-medium",
									children: activeAnnouncement.text
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2.5 z-10 shrink-0",
								children: activeAnnouncement.voucherCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleCopyVoucher,
									className: "flex items-center gap-2 rounded-xl bg-white text-plum px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-amber-300 hover:text-plum active:scale-95 cursor-pointer",
									children: copiedCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Copied (",
										activeAnnouncement.voucherCode,
										")"
									] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeAnnouncement.voucherCode })] })] })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-plum/10 pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full",
							children: categories.map((cat) => {
								const isActive = activeCategory === cat.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveCategory(cat.id),
									className: `flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isActive ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 scale-102" : "bg-white/70 text-plum/70 hover:bg-white hover:text-plum border border-plum/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive ? "bg-amber-400 text-plum" : "bg-plum/10 text-plum/70"}`,
										children: cat.count
									})]
								}, cat.id);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden sm:inline-block text-xs font-semibold text-plum/50",
								children: [
									"Showing ",
									displayedProducts.length,
									" featured items"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "text-xs uppercase tracking-wider font-bold text-lavender-deep hover:text-plum transition-colors flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"See All (",
									products.length,
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "→"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
						children: displayedProducts.map((p) => {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 rounded-3xl bg-gradient-to-r from-plum/5 via-lavender-deep/10 to-mauve/10 border border-plum/15 p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-plum mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-amber-500" }), "Full Atelier Catalog"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl md:text-3xl text-plum",
									children: "Looking for more wigs, lengths & bridal essentials?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs md:text-sm text-plum/70 max-w-xl",
									children: "Explore our complete collection of Bone Straight, Water Wave, Pixie, Bob Units, Signature Lip Elixirs, Highlighters, and Brush Suites in the dedicated shop."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "shrink-0 inline-flex items-center gap-3 rounded-full bg-plum px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FAF9F5] shadow-lg shadow-plum/20 transition-all hover:bg-lavender-deep hover:shadow-xl active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Explore Full Shop (",
								products.length,
								" Items)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 rounded-3xl bg-white border border-plum/10 p-6 md:p-8 shadow-sm",
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
var heroSlides = [
	{
		id: "royal-bridal",
		num: "01",
		tag: "Haute Bridal Masterpiece",
		title: "Her Royal Moment",
		subtitle: "2026/2027 Bridal Collection",
		technique: "18H HD Base · Dewy Glass Skin",
		img: hero_bride_default,
		accentColor: "from-lavender-deep/20 via-amber-200/15 to-mauve/20",
		vol: "Vol. IV"
	},
	{
		id: "heritage-gele",
		num: "02",
		tag: "Sculptural Headwrap Artistry",
		title: "Heritage Gele Crown",
		subtitle: "Couture Traditional Majesty",
		technique: "Precision Pleating · Royal Silhouette",
		img: gele_1_default,
		accentColor: "from-mauve/25 via-plum/15 to-amber-200/15",
		vol: "Vol. III"
	},
	{
		id: "velvet-monarch",
		num: "03",
		tag: "Studio Signature Glam",
		title: "The Velvet Monarch",
		subtitle: "Camera-Calibrated Portraiture",
		technique: "Airbrushed Base · Satin Plum Lip",
		img: bridal_after_default,
		accentColor: "from-amber-200/20 via-lavender-deep/20 to-plum/15",
		vol: "Vol. II"
	},
	{
		id: "sunset-radiance",
		num: "04",
		tag: "Editorial Campaign Finish",
		title: "Sunset Radiance",
		subtitle: "4K Luminous Gold Glow",
		technique: "Baked Micro-Pearls · Soft Focus",
		img: glam_1_default,
		accentColor: "from-rose-200/20 via-mauve/20 to-amber-100/20",
		vol: "Vol. I"
	}
];
function HeroAccordionCarousel() {
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const timerRef = (0, import_react.useRef)(null);
	const touchStartXRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isPaused) return;
		timerRef.current = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % heroSlides.length);
		}, 5e3);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isPaused]);
	const handleNext = (0, import_react.useCallback)(() => {
		setActiveIndex((prev) => (prev + 1) % heroSlides.length);
	}, []);
	const handlePrev = (0, import_react.useCallback)(() => {
		setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
	}, []);
	const handleTouchStart = (e) => {
		setIsPaused(true);
		touchStartXRef.current = e.touches[0].clientX;
	};
	const handleTouchEnd = (e) => {
		if (touchStartXRef.current === null) return;
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartXRef.current - touchEndX;
		if (diff > 40) handleNext();
		else if (diff < -40) handlePrev();
		touchStartXRef.current = null;
		setTimeout(() => setIsPaused(false), 3e3);
	};
	const activeSlide = heroSlides[activeIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-[620px] mx-auto select-none",
		onMouseEnter: () => setIsPaused(true),
		onMouseLeave: () => setIsPaused(false),
		onTouchStart: handleTouchStart,
		onTouchEnd: handleTouchEnd,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -inset-4 rounded-[3rem] bg-gradient-to-tr ${activeSlide.accentColor} blur-2xl -z-10 transition-all duration-1000` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-plum/15 p-2 sm:p-3.5 shadow-[0_30px_100px_rgba(82,58,77,0.16)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-[380px] xs:h-[430px] sm:h-[480px] md:h-[520px] gap-1.5 sm:gap-2.5 w-full items-stretch",
					children: heroSlides.map((slide, idx) => {
						const isActive = activeIndex === idx;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setActiveIndex(idx),
							className: `relative overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) cursor-pointer group ${isActive ? "flex-[3.5] sm:flex-[3.8] md:flex-[4] shadow-xl" : "flex-[0.8] sm:flex-[0.8] hover:flex-[1] opacity-75 hover:opacity-100"}`,
							role: "button",
							tabIndex: 0,
							"aria-label": `View look ${slide.num}: ${slide.title}`,
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") setActiveIndex(idx);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: slide.img,
								alt: slide.title,
								loading: "lazy",
								className: `absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ${isActive ? "scale-105" : "scale-115 grayscale-[15%] group-hover:scale-110"}`
							}), isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent flex flex-col justify-between p-3.5 xs:p-4.5 sm:p-6 text-white animate-in fade-in duration-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#FAF9F5] border border-white/25",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: slide.vol })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xl sm:text-3xl italic text-amber-300/90 font-semibold drop-shadow-sm",
										children: slide.num
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 sm:space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm border border-amber-300/30",
											children: slide.tag
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white leading-tight italic",
											children: slide.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pt-1 border-t border-white/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] sm:text-xs text-white/80 font-medium tracking-wide truncate max-w-[220px] sm:max-w-none",
												children: slide.technique
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "#portfolio",
												onClick: (e) => e.stopPropagation(),
												className: "hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 hover:text-white transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lookbook" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
											})]
										})
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-plum/60 hover:bg-plum/45 backdrop-blur-[2px] transition-colors duration-300 flex flex-col justify-between items-center py-4 sm:py-5 px-0.5 sm:px-2 text-[#FAF9F5]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xs sm:text-base italic text-amber-300/80 font-semibold",
										children: slide.num
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 flex items-center justify-center my-1 sm:my-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#FAF9F5]/90 whitespace-nowrap",
											style: {
												writingMode: "vertical-rl",
												transform: "rotate(180deg)"
											},
											children: slide.title
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-amber-300 transition-colors" })
								]
							})]
						}, slide.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2.5 sm:mt-3 px-1 sm:px-2 flex items-center justify-between gap-2 sm:gap-3 text-plum",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 sm:gap-1.5 flex-1 max-w-[160px] sm:max-w-[200px]",
							children: heroSlides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveIndex(i),
								"aria-label": `Go to slide ${i + 1}`,
								className: "h-1.5 flex-1 rounded-full overflow-hidden bg-plum/15 hover:bg-plum/30 transition-colors cursor-pointer py-1 -my-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-full rounded-full transition-all duration-500 ${activeIndex === i ? "bg-plum w-full" : "w-0"}` })
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-plum/60 truncate max-w-[120px] sm:max-w-none",
							children: [
								activeSlide.num,
								" / 0",
								heroSlides.length,
								" · ",
								activeSlide.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handlePrev,
								"aria-label": "Previous bridal look",
								className: "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-plum/15 bg-white/80 text-plum hover:bg-plum hover:text-[#FAF9F5] active:scale-95 transition-all cursor-pointer shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleNext,
								"aria-label": "Next bridal look",
								className: "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-plum/15 bg-white/80 text-plum hover:bg-plum hover:text-[#FAF9F5] active:scale-95 transition-all cursor-pointer shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -left-3 sm:-left-6 -top-3 sm:-top-4 hidden sm:block z-20 animate-float-up pointer-events-none",
				style: { animationDelay: "0.3s" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 w-16 sm:h-20 sm:w-20 flex-col items-center justify-center rounded-full border border-lavender-deep/30 bg-white/95 backdrop-blur-xl text-plum shadow-xl transition-transform duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-bold uppercase tracking-wider text-lavender-deep",
						children: "Lookbook"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base sm:text-lg italic font-semibold text-plum",
						children: activeSlide.vol
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute -right-2 sm:-right-4 -top-3 hidden sm:flex items-center gap-2 rounded-2xl border border-plum/10 bg-white/95 backdrop-blur-xl px-3.5 py-2 shadow-xl animate-float-up z-20 pointer-events-none transition-transform duration-300",
				style: { animationDelay: "0.5s" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/20 text-amber-600",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-500" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[9px] uppercase tracking-wider font-bold text-plum/50",
					children: "Editorial Grade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-bold text-plum",
					children: "100% Bridal Perfection"
				})] })]
			})
		]
	});
}
var services = [
	{
		n: "01",
		name: "Bridal Makeup",
		desc: "Bespoke bridal artistry crafted for your once-in-a-lifetime moment."
	},
	{
		n: "02",
		name: "Gele Styling",
		desc: "Sculptural headwrap artistry celebrating heritage with couture precision."
	},
	{
		n: "03",
		name: "Professional Makeup",
		desc: "Signature glam for the woman who commands every room she enters."
	},
	{
		n: "04",
		name: "Beauty Transformation",
		desc: "A studio experience that reveals the face you already carry within."
	},
	{
		n: "05",
		name: "Beauty Training",
		desc: "Intimate masterclasses for artists shaping the next chapter of beauty."
	},
	{
		n: "06",
		name: "Home Service Makeup",
		desc: "The studio, arrived — private, unhurried, entirely yours."
	},
	{
		n: "07",
		name: "Photoshoot Makeup",
		desc: "Camera-luminous finishes tuned for editorial and campaign light."
	},
	{
		n: "08",
		name: "Event Glam",
		desc: "Statement looks for galas, soirées, and every night worth remembering."
	}
];
function Home() {
	const { totalCount, openCart } = useCart();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [showPromo, setShowPromo] = (0, import_react.useState)(true);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", on);
		return () => window.removeEventListener("scroll", on);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-xs" : "bg-transparent"}`,
				children: [
					showPromo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-plum text-[#FAF9F5] border-b border-plum/10 relative overflow-hidden flex items-center justify-between px-6 py-2.5 md:px-12 z-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex items-center justify-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold z-10 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Enjoy ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-amber-300 font-bold font-sans",
											children: "20% OFF"
										}),
										" your first wig order + ALL beauty services"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowPromo(false),
								className: "text-[#FAF9F5]/50 hover:text-[#FAF9F5]/90 transition-colors p-1 z-10 cursor-pointer",
								title: "Close announcement",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "h-3.5 w-3.5",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.5",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M6 18L18 6M6 6l12 12"
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4.5 md:px-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#top",
								className: "font-outfit text-[24px] leading-[32px] font-semibold not-italic tracking-tight text-plum transition-opacity hover:opacity-90 flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Seddypluz Beauty Studio" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden items-center gap-8 lg:gap-10 md:flex",
								children: [
									{
										name: "Services",
										href: "#services"
									},
									{
										name: "Portfolio",
										href: "#portfolio"
									},
									{
										name: "Transformations",
										href: "#transformations"
									},
									{
										name: "Wigs & Shop",
										href: "/shop"
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: item.href,
									className: "text-xs uppercase tracking-[0.28em] font-semibold text-plum/75 transition-colors hover:text-lavender-deep",
									children: item.name
								}, item.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 sm:gap-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: openCart,
										"aria-label": `Open boutique bag, ${totalCount} items`,
										className: "relative flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/70 text-plum backdrop-blur-md transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4.5 w-4.5" }), totalCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-plum shadow-xs",
											children: totalCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#contact",
										className: "hidden sm:inline-flex items-center rounded-full border border-plum/30 bg-plum px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#FAF9F5] shadow-xs transition-all hover:bg-lavender-deep hover:border-lavender-deep",
										children: "Book Session"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setMobileMenuOpen(!mobileMenuOpen),
										"aria-label": mobileMenuOpen ? "Close navigation menu" : "Open navigation menu",
										className: "flex h-10 w-10 items-center justify-center rounded-full border border-plum/20 bg-white/70 text-plum backdrop-blur-md transition-all hover:bg-plum hover:text-[#FAF9F5] active:scale-95 cursor-pointer md:hidden shadow-xs",
										children: mobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4.5 w-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4.5 w-4.5" })
									})
								]
							})
						]
					}),
					mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-plum/10 bg-[#FAF9F5]/98 backdrop-blur-2xl px-6 py-6 shadow-2xl transition-all md:hidden animate-in slide-in-from-top-3 duration-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col space-y-3.5",
							children: [[
								{
									name: "Services Atelier",
									href: "#services"
								},
								{
									name: "Bridal Portfolio",
									href: "#portfolio"
								},
								{
									name: "Before & After Transformations",
									href: "#transformations"
								},
								{
									name: "The Studio Story",
									href: "#studio"
								},
								{
									name: "Cherished Bride Reviews",
									href: "#reviews"
								},
								{
									name: "Shop Wigs & Hair Products",
									href: "/shop"
								}
							].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: link.href,
								onClick: () => setMobileMenuOpen(false),
								className: "flex items-center justify-between border-b border-plum/8 pb-2.5 text-xs uppercase tracking-wider font-bold text-plum/85 hover:text-lavender-deep transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: link.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-plum/40",
									children: "→"
								})]
							}, link.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 flex flex-col gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#contact",
									onClick: () => setMobileMenuOpen(false),
									className: "flex items-center justify-center rounded-full bg-plum py-3.5 text-xs uppercase tracking-[0.24em] font-bold text-[#FAF9F5] shadow-md shadow-plum/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Consultation" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio!",
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: () => setMobileMenuOpen(false),
									className: "flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-xs uppercase tracking-wider font-bold text-white shadow-md shadow-[#25D366]/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat on WhatsApp" })]
								})]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "top",
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#FAF9F5]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-mauve/20 blur-3xl opacity-75 animate-pulse pointer-events-none",
						style: { animationDuration: "8s" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-lavender/25 blur-3xl opacity-75 animate-pulse pointer-events-none",
						style: { animationDuration: "12s" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 opacity-[0.025] pointer-events-none",
						style: {
							backgroundImage: "radial-gradient(circle, var(--plum) 1px, transparent 1px)",
							backgroundSize: "24px 24px"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 pt-28 pb-10 md:grid-cols-12 md:gap-8 md:px-12 md:pt-36 md:pb-14 z-10 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-6 md:pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex flex-wrap items-center gap-2.5 rounded-full border border-plum/15 bg-white/80 backdrop-blur-md px-4 py-1.5 shadow-xs animate-float-up",
									style: { animationDelay: "0.1s" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex h-2 w-2 relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-[0.18em] text-plum",
											children: "2026/2027 Bridal Calendar Open"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline text-plum/30",
											children: "·"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline text-[11px] font-medium tracking-wide text-lavender-deep",
											children: "Luxury Beauty Atelier"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-4 animate-float-up font-display text-[2.65rem] xs:text-[3.25rem] leading-[0.94] tracking-tight text-plum sm:text-[4.5rem] md:text-[5.25rem] lg:text-[5.75rem]",
									style: { animationDelay: "0.2s" },
									children: [
										"Where the",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-lavender-deep via-plum to-[#D4AF37] drop-shadow-xs",
											children: "quiet art"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"of beauty",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"becomes ritual."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-xl animate-float-up text-base md:text-lg leading-relaxed text-plum/75",
									style: { animationDelay: "0.35s" },
									children: "Seddypluz Beauty Studio composes bespoke bridal artistry, sculptural gele mastery, and camera-calibrated glam for the woman who moves through the world with unforgettable presence."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap items-center gap-4 border-y border-plum/10 py-3.5 animate-float-up",
									style: { animationDelay: "0.45s" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex -space-x-2.5 overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs",
												src: glam_1_default,
												alt: "Seddypluz Bride"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs",
												src: bridal_after_default,
												alt: "Seddypluz Bride"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs",
												src: gele_1_default,
												alt: "Seddypluz Bride"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-0.5 text-amber-500",
											children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, i))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-plum",
											children: [
												"5.0 Rated",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-normal text-plum/60",
													children: "(500+ Brides Styled Across Nigeria & Diaspora)"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex animate-float-up flex-wrap items-center gap-4 sm:gap-5",
									style: { animationDelay: "0.55s" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#contact",
											className: "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-plum bg-plum px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#FAF9F5] shadow-lg shadow-plum/20 transition-all duration-300 hover:bg-lavender-deep hover:border-lavender-deep hover:shadow-xl hover:shadow-lavender-deep/20 active:scale-[0.98] cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reserve a session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#portfolio",
											className: "group inline-flex items-center gap-2 rounded-full border border-plum/20 bg-white/70 backdrop-blur-sm px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-plum shadow-xs transition-all duration-300 hover:bg-plum hover:text-[#FAF9F5] hover:border-plum active:scale-[0.98] cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Portfolio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-light",
												children: "→"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20a%20bridal%20session.",
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Direct WhatsApp Consultation",
											className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition-colors p-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 fill-current text-[#25D366]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp Chat" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 grid grid-cols-3 gap-3 border-t border-plum/10 pt-5 animate-float-up max-w-lg",
									style: { animationDelay: "0.65s" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-2xl md:text-3xl font-bold text-plum",
											children: "500+"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] md:text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5",
											children: "Brides Styled"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-l border-plum/10 pl-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-2xl md:text-3xl font-bold text-plum",
												children: "10+"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] md:text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5",
												children: "Years Mastery"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-l border-plum/10 pl-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-2xl md:text-3xl font-bold text-plum",
												children: "18H"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] md:text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5",
												children: "HD Base Wear"
											})]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative md:col-span-6 flex items-center justify-center pt-4 lg:pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroAccordionCarousel, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative border-t border-plum/10 bg-white/50 backdrop-blur-md py-5 overflow-hidden z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-[1600px] px-6 md:px-12 flex items-center gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-plum/50 shrink-0 select-none mr-4",
								children: "Featured In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-16 w-[200%] animate-marquee shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-around shrink-0 gap-16",
										children: [
											"Vogue Nigeria",
											"Bella Naija Weddings",
											"ThisDay Style",
											"Genevieve",
											"Bridal Ovation",
											"Elite Dossier",
											"Avenue Luxe"
										].map((n, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-lg italic text-plum/60 whitespace-nowrap",
											children: n
										}, `f1-${idx}`))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-around shrink-0 gap-16",
										children: [
											"Vogue Nigeria",
											"Bella Naija Weddings",
											"ThisDay Style",
											"Genevieve",
											"Bridal Ovation",
											"Elite Dossier",
											"Avenue Luxe"
										].map((n, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-lg italic text-plum/60 whitespace-nowrap",
											children: n
										}, `f2-${idx}`))
									})]
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "services",
				className: "relative py-14 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1600px] px-6 md:px-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-lavender-deep",
									children: "The Atelier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 font-display text-4xl leading-[1.05] text-plum md:text-6xl",
									children: [
										"Services,",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: "text-lavender-deep",
											children: "rendered"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										" with reverence."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-sm text-plum/70 text-sm md:text-base",
									children: "Eight signature offerings — each one a slow, considered practice. Booked by consultation only."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-plum/15 border-y border-plum/15",
								children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "group grid grid-cols-12 items-baseline gap-4 py-5 md:py-6 transition-colors hover:bg-blush-soft/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "col-span-2 font-display text-2xl italic text-lavender-deep/80 md:col-span-1",
											children: s.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "col-span-10 font-display text-3xl text-plum md:col-span-4 md:text-4xl",
											children: s.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "col-span-12 text-sm leading-relaxed text-plum/65 md:col-span-6",
											children: s.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "col-span-12 flex justify-end text-plum/40 transition-all group-hover:translate-x-1 group-hover:text-lavender-deep md:col-span-1",
											children: "→"
										})
									]
								}, s.n))
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioGallery, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransformationSlider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "studio",
				className: "relative py-14 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1600px] px-6 md:px-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative aspect-[4/5] overflow-hidden",
								style: { boxShadow: "var(--shadow-bloom)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: artist_default,
									alt: "Seddypluz at work",
									width: 1e3,
									height: 1250,
									loading: "lazy",
									className: "h-full w-full object-cover"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-6 md:pl-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-lavender-deep",
									children: "The Studio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 font-display text-4xl leading-[1.05] text-plum md:text-5xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Seddypluz" }),
										" — a hand",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"that reads the face",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"like a letter."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-4 text-plum/75",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base leading-relaxed",
										children: "Founded on the belief that beauty is a slow conversation between skin, light, and story — Seddypluz Beauty Studio has painted hundreds of brides and campaigns across Lagos, Abuja, and beyond."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base leading-relaxed",
										children: "Every session begins with silence, coffee, and a mirror. What follows is not a look, but a portrait."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "mt-8 grid grid-cols-3 border-t border-plum/15",
									children: [
										{
											k: "10+",
											v: "Years"
										},
										{
											k: "500+",
											v: "Brides"
										},
										{
											k: "40+",
											v: "Editorial"
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-r border-plum/15 py-4 last:border-r-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "font-display text-4xl italic text-lavender-deep md:text-5xl",
											children: s.k
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "eyebrow mt-2 text-plum/60",
											children: s.v
										})]
									}, s.v))
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsCarousel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoutiqueSection, { limit: 3 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "relative overflow-hidden border-t border-plum/10 bg-gradient-to-b from-background to-blush-soft/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-lavender-deep/40 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] px-6 pt-12 pb-6 md:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-outfit text-[28px] leading-[36px] font-semibold text-plum",
										children: "Seddypluz Beauty Studio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 max-w-sm text-sm leading-relaxed text-plum/60",
										children: "Where artistry meets elegance — crafting bespoke beauty experiences for brides, campaigns, and editorial moments that live forever."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex items-center gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://instagram.com/seddypluz_wigs",
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Follow us on Instagram @seddypluz_wigs",
											className: "group flex items-center gap-2.5 rounded-full border border-plum/10 bg-white/60 px-4 py-2.5 text-plum/70 transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.5",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
														x: "2",
														y: "2",
														width: "20",
														height: "20",
														rx: "5"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "12",
														cy: "12",
														r: "5"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "17.5",
														cy: "6.5",
														r: "1.5",
														fill: "currentColor",
														stroke: "none"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium tracking-wide",
												children: "@seddypluz_wigs"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://tiktok.com/@seddypluz_wigs",
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Follow us on TikTok @seddypluz_wigs",
											className: "group flex items-center gap-2.5 rounded-full border border-plum/10 bg-white/60 px-4 py-2.5 text-plum/70 transition-all duration-300 hover:border-lavender-deep/30 hover:bg-lavender-deep/5 hover:text-lavender-deep hover:shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
												viewBox: "0 0 24 24",
												fill: "currentColor",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.3 8.3 0 004.76 1.49V7.09a4.84 4.84 0 01-1-.4z" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium tracking-wide",
												children: "@seddypluz_wigs"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-3 md:col-start-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mb-5 text-lavender-deep",
									children: "Quick Links"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: [
										{
											label: "Services",
											href: "#services"
										},
										{
											label: "Portfolio",
											href: "#portfolio"
										},
										{
											label: "Transformations",
											href: "#transformations"
										},
										{
											label: "Shop Wigs & Hair Products",
											href: "/shop"
										},
										{
											label: "Book a Session",
											href: "#booking"
										}
									].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: link.href,
										className: "group flex items-center gap-2 text-sm text-plum/60 transition-colors duration-200 hover:text-plum",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-px w-3 bg-plum/20 transition-all duration-300 group-hover:w-5 group-hover:bg-lavender-deep" }), link.label]
									}) }, link.label))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mb-5 text-lavender-deep",
									children: "Get in Touch"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-sm text-plum/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://wa.me/2348162292997",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "flex items-center gap-2 transition-colors duration-200 hover:text-plum",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 shrink-0" }), "WhatsApp Us"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 shrink-0" }), "Kaduna, Nigeria"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://wa.me/2348162292997",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0" }), "+234 816 229 2997"]
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-gradient-to-r from-transparent via-plum/10 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-between gap-3 pt-6 md:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-wider text-plum/40",
								children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" Seddypluz Beauty Studio · All artistry reserved"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-plum/30",
								children: [
									"Crafted with ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lavender-deep/60",
										children: "♥"
									}),
									" for beauty"
								]
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20a%20session.",
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": "Chat on WhatsApp",
				className: "group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:w-48 hover:bg-[#20ba5a] hover:shadow-xl md:bottom-8 md:right-8",
				style: { boxShadow: "0 8px 30px rgba(37, 211, 102, 0.3)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "h-6 w-6 shrink-0 fill-current",
						viewBox: "0 0 24 24",
						xmlns: "http://www.w3.org/2000/svg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wider transition-all duration-300 group-hover:max-w-xs",
						children: "Chat on WhatsApp"
					})]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
