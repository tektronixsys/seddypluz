import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as getAdminAuthStatus, c as hero_bride_default, d as useServerFn, i as gele_1_default, n as adminLogout, o as getAppointments, r as bridal_after_default, s as glam_1_default, t as adminLogin, u as updateAppointmentStatus } from "./glam-1-ClOOCTx9.mjs";
import { B as Lock, C as RotateCcw, E as Plus, F as Megaphone, G as Image, H as Layers, N as MessageCircle, O as Phone, Q as EyeOff, R as Mail, T as Radio, U as KeyRound, Y as Globe, Z as Eye, _t as ArrowUpRight, at as Clock, c as Tag, dt as ChevronDown, et as Download, f as SlidersVertical, g as Settings, gt as Calendar, h as ShieldCheck, i as User, it as CopyPlus, j as Package, k as Pencil, l as Star, lt as ChevronRight, m as ShoppingBag, mt as ChartColumn, n as X, p as SlidersHorizontal, rt as Copy, s as Trash2, st as CirclePlus, t as Zap, tt as Crown, u as Sparkles, ut as ChevronLeft, v as Search, w as RefreshCw, x as Save, z as LogOut } from "../_libs/lucide-react.mjs";
import { a as getStoredBoutiqueProducts, c as resetStoredBoutiqueProducts, i as getStoredAnnouncements, l as saveStoredAnnouncements, n as boutiqueProducts, s as resetStoredAnnouncements, t as PRODUCT_IMAGE_PRESETS, u as saveStoredBoutiqueProducts } from "./data-CxlY3IqO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ChPsigfs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_LOOKBOOK_SLIDES = [
	{
		id: "slide_1",
		num: "01",
		category: "Traditional Gele",
		title: "Royal Crimson Infinity",
		subtitle: "Aso-Oke & Heritage Velvet",
		technique: "Geometric Pleats · Multi-Tier Fan",
		img: gele_1_default,
		vol: "Vol. IV",
		active: true
	},
	{
		id: "slide_2",
		num: "02",
		category: "Bridal Soft Glam",
		title: "Timeless Golden Radiance",
		subtitle: "Luminous Skin & Sculpted Brow",
		technique: "HD Airbrush · 24-Hour Melt",
		img: hero_bride_default,
		vol: "Vol. I",
		active: true
	},
	{
		id: "slide_3",
		num: "03",
		category: "Contemporary Bridal",
		title: "The Sculpted Elegance",
		subtitle: "Ethereal Veil & Natural Glow",
		technique: "Skin-Finish Velvet · Dewy Cheek",
		img: bridal_after_default,
		vol: "Vol. II",
		active: true
	},
	{
		id: "slide_4",
		num: "04",
		category: "Editorial Glamour",
		title: "Smoky Orchid Shimmer",
		subtitle: "High-Fashion Evening Look",
		technique: "Baked Micro-Pearls · Soft Focus",
		img: glam_1_default,
		vol: "Vol. I",
		active: true
	}
];
function AdminDashboard() {
	const login = useServerFn(adminLogin);
	const logout = useServerFn(adminLogout);
	const getAuthStatus = useServerFn(getAdminAuthStatus);
	const fetchAppointments = useServerFn(getAppointments);
	const updateStatus = useServerFn(updateAppointmentStatus);
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [usernameInput, setUsernameInput] = (0, import_react.useState)("");
	const [passwordInput, setPasswordInput] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [currentAdminUser, setCurrentAdminUser] = (0, import_react.useState)("Admin");
	const [adminRole, setAdminRole] = (0, import_react.useState)("Super Admin");
	const [adminEmail, setAdminEmail] = (0, import_react.useState)("admin@seddypluz.com");
	const [authChecking, setAuthChecking] = (0, import_react.useState)(false);
	const [isAvatarMenuOpen, setIsAvatarMenuOpen] = (0, import_react.useState)(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = (0, import_react.useState)(false);
	const [soundNotifications, setSoundNotifications] = (0, import_react.useState)(true);
	const [autoRefreshInterval, setAutoRefreshInterval] = (0, import_react.useState)(0);
	const [ambientGlow, setAmbientGlow] = (0, import_react.useState)(true);
	const userInitials = (0, import_react.useMemo)(() => {
		if (!currentAdminUser) return "SP";
		const parts = currentAdminUser.trim().split(" ");
		if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
		return currentAdminUser.slice(0, 2).toUpperCase();
	}, [currentAdminUser]);
	(0, import_react.useEffect)(() => {
		if (!isAvatarMenuOpen) return;
		const handleClickOutside = (e) => {
			if (!e.target.closest("#avatar-widget-container")) setIsAvatarMenuOpen(false);
		};
		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	}, [isAvatarMenuOpen]);
	const [activeTab, setActiveTab] = (0, import_react.useState)("appointments");
	const [appointments, setAppointments] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [viewMode, setViewMode] = (0, import_react.useState)("list");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editStatus, setEditStatus] = (0, import_react.useState)("pending");
	const [editNotes, setEditNotes] = (0, import_react.useState)("");
	const [updating, setUpdating] = (0, import_react.useState)(false);
	const [selectedClientModal, setSelectedClientModal] = (0, import_react.useState)(null);
	const [announcements, setAnnouncements] = (0, import_react.useState)(() => getStoredAnnouncements());
	const [announcementFilter, setAnnouncementFilter] = (0, import_react.useState)("all");
	const [announcementSearch, setAnnouncementSearch] = (0, import_react.useState)("");
	const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = (0, import_react.useState)(false);
	const [editingAnnouncementId, setEditingAnnouncementId] = (0, import_react.useState)(null);
	const [deleteConfirmAnnouncement, setDeleteConfirmAnnouncement] = (0, import_react.useState)(null);
	const [annFormTitle, setAnnFormTitle] = (0, import_react.useState)("");
	const [annFormText, setAnnFormText] = (0, import_react.useState)("");
	const [annFormVoucher, setAnnFormVoucher] = (0, import_react.useState)("SEDDY20");
	const [annFormDiscount, setAnnFormDiscount] = (0, import_react.useState)("20% OFF");
	const [annFormBadge, setAnnFormBadge] = (0, import_react.useState)("Exclusive Promo");
	const [annFormPulse, setAnnFormPulse] = (0, import_react.useState)(true);
	const [annFormTheme, setAnnFormTheme] = (0, import_react.useState)("plum");
	const [annFormTargetLink, setAnnFormTargetLink] = (0, import_react.useState)("/shop");
	const [annFormCtaText, setAnnFormCtaText] = (0, import_react.useState)("Claim Offer");
	const [managedProducts, setManagedProducts] = (0, import_react.useState)(() => getStoredBoutiqueProducts());
	const [inventorySearchQuery, setInventorySearchQuery] = (0, import_react.useState)("");
	const [inventoryCategoryFilter, setInventoryCategoryFilter] = (0, import_react.useState)("all");
	const [isProductModalOpen, setIsProductModalOpen] = (0, import_react.useState)(false);
	const [editingProductId, setEditingProductId] = (0, import_react.useState)(null);
	const [deleteConfirmProduct, setDeleteConfirmProduct] = (0, import_react.useState)(null);
	const [formName, setFormName] = (0, import_react.useState)("");
	const [formCategory, setFormCategory] = (0, import_react.useState)("wigs");
	const [formPrice, setFormPrice] = (0, import_react.useState)("₦280,000");
	const [formOriginalPrice, setFormOriginalPrice] = (0, import_react.useState)("₦350,000");
	const [formNumericPrice, setFormNumericPrice] = (0, import_react.useState)(28e4);
	const [formDesc, setFormDesc] = (0, import_react.useState)("");
	const [formFullDesc, setFormFullDesc] = (0, import_react.useState)("");
	const [formImg, setFormImg] = (0, import_react.useState)(PRODUCT_IMAGE_PRESETS[0].value);
	const [formCustomImg, setFormCustomImg] = (0, import_react.useState)("");
	const [formBadge, setFormBadge] = (0, import_react.useState)("Bestseller");
	const [formDiscountBadge, setFormDiscountBadge] = (0, import_react.useState)("20% OFF");
	const [formDensityOrSize, setFormDensityOrSize] = (0, import_react.useState)("300g Super Double Drawn");
	const [formLaceOrFinish, setFormLaceOrFinish] = (0, import_react.useState)("13x4 HD Invisible Swiss Lace");
	const [formOrigin, setFormOrigin] = (0, import_react.useState)("100% Raw Single-Donor Virgin Hair");
	const [formLongevity, setFormLongevity] = (0, import_react.useState)("3 to 5+ years with studio care");
	const [formCareTips, setFormCareTips] = (0, import_react.useState)("Store in silk packaging, flat iron max 230°C.");
	const [formDots, setFormDots] = (0, import_react.useState)([{
		color: "#121212",
		name: "22 Inch",
		priceFormatted: "₦280,000",
		numericPrice: 28e4
	}, {
		color: "#1C1C1C",
		name: "24 Inch",
		priceFormatted: "₦310,000",
		numericPrice: 31e4
	}]);
	const [pinnedProductIds, setPinnedProductIds] = (0, import_react.useState)([
		"hair_straight",
		"hair_wave",
		"lipstick_plum"
	]);
	const [lookbookSlides, setLookbookSlides] = (0, import_react.useState)(INITIAL_LOOKBOOK_SLIDES);
	const [studioPhone, setStudioPhone] = (0, import_react.useState)("+234 816 229 2997");
	const [studioLocation, setStudioLocation] = (0, import_react.useState)("Kaduna Studio Sessions");
	const [studioHours, setStudioHours] = (0, import_react.useState)("Mon - Sat: 9:00 AM - 7:00 PM");
	const [contactSaved, setContactSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function checkAuth() {
			try {
				const res = await getAuthStatus({});
				if (res.authenticated) {
					setIsAuthenticated(true);
					if (res.user) {
						setCurrentAdminUser(res.user);
						if (res.user.toLowerCase().includes("ajuh")) {
							setAdminRole("Super Admin");
							setAdminEmail("ajuhlouis@gmail.com");
						} else if (res.user.toLowerCase().includes("seddy")) {
							setAdminRole("Studio Super Admin");
							setAdminEmail("contact@seddypluz.com");
						}
					}
					loadData();
				}
			} catch (err) {
				console.error("Auth check failed:", err);
			}
		}
		checkAuth();
	}, []);
	async function loadData(showSuccessToast = false) {
		setLoading(true);
		setRefreshing(true);
		try {
			const data = await fetchAppointments({});
			setAppointments(data);
			if (showSuccessToast) toast.success("Appointments synchronized with database.");
		} catch (err) {
			console.error("Failed to load appointments:", err);
			toast.error("Failed to synchronize appointments.");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!usernameInput.trim() || !passwordInput.trim()) {
			toast.error("Please enter both username and password.");
			return;
		}
		setAuthChecking(true);
		try {
			const res = await login({ data: {
				username: usernameInput.trim(),
				password: passwordInput.trim()
			} });
			if (res.ok) {
				setIsAuthenticated(true);
				const user = res.username || "Admin";
				setCurrentAdminUser(user);
				if (user.toLowerCase().includes("ajuh")) {
					setAdminRole("Super Admin");
					setAdminEmail("ajuhlouis@gmail.com");
				} else if (user.toLowerCase().includes("seddy")) {
					setAdminRole("Studio Super Admin");
					setAdminEmail("contact@seddypluz.com");
				} else if (res.role) setAdminRole(res.role);
				toast.success(`Welcome back, ${user}!`);
				loadData();
			}
		} catch (err) {
			console.error("Login request failed:", err);
			const errorMessage = err instanceof Error ? err.message : "Invalid credentials. Please verify username and password.";
			toast.error(errorMessage);
		} finally {
			setAuthChecking(false);
		}
	};
	const handleLogout = async () => {
		try {
			await logout({});
			setIsAuthenticated(false);
			setUsernameInput("");
			setPasswordInput("");
			toast.info("Session closed. Command suite locked.");
		} catch (err) {
			console.error("Logout failed:", err);
			setIsAuthenticated(false);
		}
	};
	const handleUpdateStatus = async (id, status, notes) => {
		setUpdating(true);
		try {
			if ((await updateStatus({ data: {
				id,
				status,
				notes: notes ?? null
			} })).ok) {
				setAppointments((prev) => prev.map((app) => app.id === id ? {
					...app,
					status,
					notes: notes || app.notes
				} : app));
				toast.success(`Appointment status set to ${status.toUpperCase()}`);
				setEditingId(null);
			}
		} catch (err) {
			console.error("Status update error:", err);
			const errorMessage = err instanceof Error ? err.message : "Network error updating status.";
			toast.error(errorMessage);
		} finally {
			setUpdating(false);
		}
	};
	const generateClientWhatsAppUrl = (app) => {
		const cleanPhone = (app.phone || "").replace(/\D/g, "");
		const greeting = `Hello ${app.name}! This is Seddypluz Studio regarding your ${app.service} appointment requested for ${app.appointment_date} at ${app.preferred_time}.`;
		return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
	};
	const stats = (0, import_react.useMemo)(() => {
		const total = appointments.length;
		const pending = appointments.filter((a) => a.status === "pending").length;
		const confirmed = appointments.filter((a) => a.status === "confirmed").length;
		const completed = appointments.filter((a) => a.status === "completed").length;
		return {
			total,
			pending,
			confirmed,
			completed,
			declined: appointments.filter((a) => a.status === "declined").length,
			estimatedValue: confirmed * 15e4 + completed * 15e4 + pending * 8e4,
			conversionRate: total > 0 ? Math.round((confirmed + completed) / total * 100) : 0
		};
	}, [appointments]);
	const filteredAppointments = (0, import_react.useMemo)(() => {
		return appointments.filter((app) => {
			const matchesFilter = filterStatus === "all" || app.status === filterStatus;
			const q = searchQuery.toLowerCase().trim();
			const matchesSearch = !q || app.name.toLowerCase().includes(q) || app.email.toLowerCase().includes(q) || app.phone && app.phone.includes(q) || app.service.toLowerCase().includes(q) || app.notes && app.notes.toLowerCase().includes(q);
			return matchesFilter && matchesSearch;
		});
	}, [
		appointments,
		filterStatus,
		searchQuery
	]);
	const handleExportCSV = () => {
		if (appointments.length === 0) {
			toast.error("No appointment data available to export.");
			return;
		}
		const headers = [
			"ID",
			"Client Name",
			"Email",
			"Phone",
			"Service Requested",
			"Appointment Date",
			"Preferred Time",
			"Status",
			"Notes",
			"Created At"
		];
		const rows = appointments.map((a) => [
			`"${a.id}"`,
			`"${a.name.replace(/"/g, "\"\"")}"`,
			`"${a.email}"`,
			`"${a.phone || ""}"`,
			`"${a.service}"`,
			`"${a.appointment_date}"`,
			`"${a.preferred_time}"`,
			`"${a.status}"`,
			`"${(a.notes || "").replace(/"/g, "\"\"")}"`,
			`"${a.created_at || ""}"`
		]);
		const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `seddypluz_appointments_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Appointments exported to CSV successfully.");
	};
	const activeAnnouncement = (0, import_react.useMemo)(() => announcements.find((a) => a.isActive) || null, [announcements]);
	const handleOpenCreateAnnouncement = () => {
		setEditingAnnouncementId(null);
		setAnnFormTitle("");
		setAnnFormText("");
		setAnnFormVoucher("SEDDY20");
		setAnnFormDiscount("20% OFF");
		setAnnFormBadge("Exclusive Promo");
		setAnnFormPulse(true);
		setAnnFormTheme("plum");
		setAnnFormTargetLink("/shop");
		setAnnFormCtaText("Claim Offer");
		setIsAnnouncementModalOpen(true);
	};
	const handleOpenEditAnnouncement = (item) => {
		setEditingAnnouncementId(item.id);
		setAnnFormTitle(item.title);
		setAnnFormText(item.text);
		setAnnFormVoucher(item.voucherCode);
		setAnnFormDiscount(item.discountPercent);
		setAnnFormBadge(item.badgeLabel);
		setAnnFormPulse(item.pulseAnimation);
		setAnnFormTheme(item.theme);
		setAnnFormTargetLink(item.targetLink);
		setAnnFormCtaText(item.ctaText);
		setIsAnnouncementModalOpen(true);
	};
	const handleSaveAnnouncement = (e) => {
		e.preventDefault();
		if (!annFormText.trim()) {
			toast.error("Please enter announcement headline text.");
			return;
		}
		const updatedItem = {
			id: editingAnnouncementId || `promo_${Date.now()}`,
			title: annFormTitle.trim() || "Studio Promo Campaign",
			text: annFormText.trim(),
			voucherCode: annFormVoucher.trim().toUpperCase(),
			discountPercent: annFormDiscount.trim() || "SPECIAL OFFER",
			badgeLabel: annFormBadge.trim() || "Promo",
			pulseAnimation: annFormPulse,
			theme: annFormTheme,
			targetLink: annFormTargetLink.trim() || "/shop",
			ctaText: annFormCtaText.trim() || "Claim Offer",
			isActive: editingAnnouncementId ? announcements.find((a) => a.id === editingAnnouncementId)?.isActive ?? false : announcements.length === 0,
			createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		};
		let nextAnnouncements;
		if (editingAnnouncementId) {
			nextAnnouncements = announcements.map((a) => a.id === editingAnnouncementId ? updatedItem : a);
			toast.success(`Updated announcement "${updatedItem.title}".`);
		} else {
			nextAnnouncements = [updatedItem, ...announcements];
			toast.success(`Created new announcement "${updatedItem.title}"!`);
		}
		setAnnouncements(nextAnnouncements);
		saveStoredAnnouncements(nextAnnouncements);
		setIsAnnouncementModalOpen(false);
	};
	const handleTogglePulse = (item) => {
		const next = announcements.map((a) => a.id === item.id ? {
			...a,
			pulseAnimation: !a.pulseAnimation
		} : a);
		setAnnouncements(next);
		saveStoredAnnouncements(next);
		toast.info(`Pulse animation ${!item.pulseAnimation ? "enabled (pulsing live)" : "paused"} for "${item.title}".`);
	};
	const handleToggleActive = (item) => {
		const next = announcements.map((a) => {
			if (a.id === item.id) return {
				...a,
				isActive: !a.isActive
			};
			return {
				...a,
				isActive: false
			};
		});
		setAnnouncements(next);
		saveStoredAnnouncements(next);
		const willBeActive = !item.isActive;
		toast.success(willBeActive ? `Broadcast activated: "${item.title}" is now LIVE on storefront!` : `Broadcast paused: Announcement banner hidden.`);
	};
	const handleDuplicateAnnouncement = (item) => {
		const next = [{
			...item,
			id: `${item.id}_copy_${Date.now()}`,
			title: `${item.title} (Copy)`,
			isActive: false
		}, ...announcements];
		setAnnouncements(next);
		saveStoredAnnouncements(next);
		toast.success(`Duplicated announcement "${item.title}".`);
	};
	const handleDeleteAnnouncement = (item) => {
		const next = announcements.filter((a) => a.id !== item.id);
		setAnnouncements(next);
		saveStoredAnnouncements(next);
		setDeleteConfirmAnnouncement(null);
		toast.info(`Deleted announcement "${item.title}".`);
	};
	const handleResetAnnouncements = () => {
		const defaults = resetStoredAnnouncements();
		setAnnouncements(defaults);
		toast.info("Reset to 3 studio default announcement templates.");
	};
	const filteredAnnouncements = (0, import_react.useMemo)(() => {
		return announcements.filter((a) => {
			if (announcementFilter === "active" && !a.isActive) return false;
			if (announcementFilter === "pulsing" && !a.pulseAnimation) return false;
			if (announcementSearch.trim()) {
				const q = announcementSearch.toLowerCase();
				return a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q) || a.voucherCode.toLowerCase().includes(q) || a.badgeLabel.toLowerCase().includes(q);
			}
			return true;
		});
	}, [
		announcements,
		announcementFilter,
		announcementSearch
	]);
	const handleOpenAddProduct = () => {
		setEditingProductId(null);
		setFormName("");
		setFormCategory("wigs");
		setFormPrice("₦280,000");
		setFormOriginalPrice("₦350,000");
		setFormNumericPrice(28e4);
		setFormDesc("");
		setFormFullDesc("");
		setFormImg(PRODUCT_IMAGE_PRESETS[0].value);
		setFormCustomImg("");
		setFormBadge("New Drop");
		setFormDiscountBadge("20% OFF");
		setFormDensityOrSize("300g Super Double Drawn (Full to the tips)");
		setFormLaceOrFinish("Pre-plucked 13x4 HD Invisible Swiss Lace with bleached knots");
		setFormOrigin("100% Single-Donor Raw Vietnamese Virgin Hair");
		setFormLongevity("3 to 5+ years with regular studio maintenance");
		setFormCareTips("Store in silk packaging, wash with sulfate-free hair cleanser.");
		setFormDots([
			{
				color: "#121212",
				name: "20 Inch",
				priceFormatted: "₦250,000",
				numericPrice: 25e4
			},
			{
				color: "#1C1C1C",
				name: "22 Inch",
				priceFormatted: "₦280,000",
				numericPrice: 28e4
			},
			{
				color: "#2B2B2B",
				name: "24 Inch",
				priceFormatted: "₦310,000",
				numericPrice: 31e4
			}
		]);
		setIsProductModalOpen(true);
	};
	const handleOpenEditProduct = (product) => {
		setEditingProductId(product.id);
		setFormName(product.name);
		setFormCategory(product.category);
		setFormPrice(product.price);
		setFormOriginalPrice(product.originalPrice || "");
		setFormNumericPrice(product.numericPrice);
		setFormDesc(product.desc);
		setFormFullDesc(product.fullDesc);
		setFormImg(product.img);
		setFormCustomImg(product.img.startsWith("http") || product.img.startsWith("data:") ? product.img : "");
		setFormBadge(product.badge || "");
		setFormDiscountBadge(product.discountBadge || "");
		setFormDensityOrSize(product.details.densityOrSize);
		setFormLaceOrFinish(product.details.laceOrFinish);
		setFormOrigin(product.details.originOrFormulation);
		setFormLongevity(product.details.longevity);
		setFormCareTips(product.details.careTips);
		setFormDots(product.dots && product.dots.length > 0 ? [...product.dots] : []);
		setIsProductModalOpen(true);
	};
	const handleSaveProduct = (e) => {
		e.preventDefault();
		if (!formName.trim()) {
			toast.error("Please enter a product name.");
			return;
		}
		const resolvedImg = formCustomImg.trim() || formImg;
		const cleanPrice = formPrice.trim().startsWith("₦") ? formPrice.trim() : `₦${formPrice.trim()}`;
		const cleanOrigPrice = formOriginalPrice.trim() ? formOriginalPrice.trim().startsWith("₦") ? formOriginalPrice.trim() : `₦${formOriginalPrice.trim()}` : void 0;
		const categoryLabel = formCategory === "wigs" ? "Luxury Wigs & Extensions" : "Signature Cosmetics & Tools";
		const updatedProduct = {
			id: editingProductId || `prod_${Date.now()}`,
			name: formName.trim(),
			category: formCategory,
			categoryLabel,
			desc: formDesc.trim() || formName.trim(),
			fullDesc: formFullDesc.trim() || formDesc.trim() || formName.trim(),
			img: resolvedImg,
			price: cleanPrice,
			originalPrice: cleanOrigPrice,
			numericPrice: Number(formNumericPrice) || 0,
			bgClass: formCategory === "wigs" ? "bg-[#F7EBE8]" : "bg-[#EAE4F8]",
			rating: 5,
			reviewCount: 24,
			badge: formBadge || void 0,
			discountBadge: formDiscountBadge.trim() || void 0,
			isBestseller: formBadge === "Bestseller",
			dots: formDots,
			specs: formCategory === "wigs" ? [
				{
					icon: Sparkles,
					label: "Virgin Hair"
				},
				{
					icon: Layers,
					label: "HD Lace"
				},
				{
					icon: ShieldCheck,
					label: "Tangle Free"
				}
			] : [
				{
					icon: Sparkles,
					label: "Long Wear"
				},
				{
					icon: ShieldCheck,
					label: "Cruelty Free"
				},
				{
					icon: Star,
					label: "Studio Grade"
				}
			],
			details: {
				densityOrSize: formDensityOrSize.trim() || "Studio Grade",
				laceOrFinish: formLaceOrFinish.trim() || "HD Finish",
				originOrFormulation: formOrigin.trim() || "100% Authentic Quality",
				longevity: formLongevity.trim() || "Long-lasting with care",
				careTips: formCareTips.trim() || "Follow standard maintenance instructions."
			}
		};
		let nextProducts;
		if (editingProductId) {
			nextProducts = managedProducts.map((p) => p.id === editingProductId ? updatedProduct : p);
			toast.success(`Updated "${updatedProduct.name}" in boutique catalog.`);
		} else {
			nextProducts = [updatedProduct, ...managedProducts];
			toast.success(`Added "${updatedProduct.name}" to boutique catalog!`);
		}
		setManagedProducts(nextProducts);
		saveStoredBoutiqueProducts(nextProducts);
		setIsProductModalOpen(false);
	};
	const handleDeleteProduct = (product) => {
		const nextProducts = managedProducts.filter((p) => p.id !== product.id);
		setManagedProducts(nextProducts);
		setPinnedProductIds((prev) => prev.filter((id) => id !== product.id));
		saveStoredBoutiqueProducts(nextProducts);
		setDeleteConfirmProduct(null);
		toast.info(`Deleted "${product.name}" from inventory.`);
	};
	const handleDuplicateProduct = (product) => {
		const clonedId = `${product.id}_copy_${Date.now()}`;
		const nextProducts = [{
			...product,
			id: clonedId,
			name: `${product.name} (Copy)`
		}, ...managedProducts];
		setManagedProducts(nextProducts);
		saveStoredBoutiqueProducts(nextProducts);
		toast.success(`Duplicated "${product.name}"!`);
	};
	const handleResetCatalog = () => {
		setManagedProducts(boutiqueProducts);
		resetStoredBoutiqueProducts();
		setPinnedProductIds([
			"hair_straight",
			"hair_wave",
			"lipstick_plum"
		]);
		toast.info("Reset inventory to 7 studio defaults.");
	};
	const filteredInventoryProducts = (0, import_react.useMemo)(() => {
		return managedProducts.filter((p) => {
			if (inventoryCategoryFilter === "wigs" && p.category !== "wigs") return false;
			if (inventoryCategoryFilter === "cosmetics" && p.category !== "cosmetics") return false;
			if (inventoryCategoryFilter === "pinned" && !pinnedProductIds.includes(p.id)) return false;
			if (inventorySearchQuery.trim()) {
				const q = inventorySearchQuery.toLowerCase();
				const matchName = p.name.toLowerCase().includes(q);
				const matchDesc = p.desc.toLowerCase().includes(q);
				const matchCat = p.categoryLabel.toLowerCase().includes(q);
				const matchBadge = (p.badge || "").toLowerCase().includes(q);
				return matchName || matchDesc || matchCat || matchBadge;
			}
			return true;
		});
	}, [
		managedProducts,
		inventoryCategoryFilter,
		inventorySearchQuery,
		pinnedProductIds
	]);
	const togglePinProduct = (productId) => {
		setPinnedProductIds((prev) => {
			if (prev.includes(productId)) {
				if (prev.length <= 1) {
					toast.error("At least 1 product must remain pinned on the homepage.");
					return prev;
				}
				toast.info("Product unpinned from homepage.");
				return prev.filter((id) => id !== productId);
			} else {
				if (prev.length >= 4) toast.warning("Maximum 4 products recommended for homepage preview balance.");
				else toast.success("Product pinned to homepage featured showcase!");
				return [...prev, productId];
			}
		});
	};
	const handleMoveSlide = (index, direction) => {
		const newSlides = [...lookbookSlides];
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= newSlides.length) return;
		const temp = newSlides[index];
		newSlides[index] = newSlides[targetIndex];
		newSlides[targetIndex] = temp;
		const updated = newSlides.map((s, i) => ({
			...s,
			num: String(i + 1).padStart(2, "0")
		}));
		setLookbookSlides(updated);
		toast.success("Lookbook carousel order updated.");
	};
	const handleSaveContacts = (e) => {
		e.preventDefault();
		setContactSaved(true);
		toast.success("Studio concierge details updated across platform!");
		setTimeout(() => setContactSaved(false), 3e3);
	};
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#2D1B28] px-6 overflow-hidden select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 -left-40 h-[600px] w-[600px] rounded-full bg-mauve/25 blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-blush-soft blur-[140px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-md rounded-[2.5rem] border border-plum/15 bg-white/90 p-8 md:p-10 shadow-2xl shadow-plum/10 backdrop-blur-2xl z-10 animate-in fade-in zoom-in-95 duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-plum/5 text-plum border border-plum/15 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-8 w-8 text-lavender-deep" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-plum/5 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-plum mb-2 border border-plum/15",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Seddypluz Atelier HQ" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl sm:text-4xl text-plum font-bold tracking-tight",
								children: "Command Suite"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs sm:text-sm leading-relaxed text-plum/70",
								children: "Enter your studio administrator credentials to manage bridal sessions, boutique inventory, and live storefront displays."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogin,
						className: "mt-8 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-plum/80 flex items-center gap-1.5 pl-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Username / Administrator ID" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										autoComplete: "username",
										value: usernameInput,
										onChange: (e) => setUsernameInput(e.target.value),
										placeholder: "e.g. ajuhlouis or seddypluz",
										className: "h-12 w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 text-sm text-plum placeholder:text-plum/40 outline-none transition-all focus:border-plum focus:bg-white focus:ring-2 focus:ring-plum/10"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-plum/80 flex items-center gap-1.5 pl-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security Password" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: showPassword ? "text" : "password",
										required: true,
										autoComplete: "current-password",
										value: passwordInput,
										onChange: (e) => setPasswordInput(e.target.value),
										placeholder: "Enter studio password",
										className: "h-12 w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] pl-4 pr-11 text-sm text-plum placeholder:text-plum/40 outline-none transition-all focus:border-plum focus:bg-white focus:ring-2 focus:ring-plum/10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										"aria-label": showPassword ? "Hide password" : "Show password",
										className: "absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-plum/40 hover:text-plum transition-colors cursor-pointer",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: authChecking,
								className: "mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-plum via-[#5a3a52] to-plum text-[#FAF9F5] text-xs uppercase tracking-[0.24em] font-bold shadow-xl shadow-plum/20 transition-all hover:bg-lavender-deep active:scale-[0.98] cursor-pointer disabled:opacity-50",
								children: authChecking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verifying Credentials..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authorize & Sign In" })] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border-t border-plum/10 pt-6 flex items-center justify-between text-xs text-plum/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "hover:text-plum transition-colors flex items-center gap-1.5 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Studio Homepage" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "hover:text-plum transition-colors flex items-center gap-1.5 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Boutique Catalog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
						})]
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF7F2] text-[#2D1B28] font-sans selection:bg-lavender-deep selection:text-white pb-24 md:pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-50 border-b border-plum/10 bg-white/85 backdrop-blur-xl shadow-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-8 py-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15 shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-lavender-deep" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-bold tracking-tight text-plum",
							children: "Seddypluz"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-900 border border-amber-300",
							children: "Command HQ"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-plum/60 tracking-wide font-sans",
						children: ["Atelier Suite · ", studioLocation]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => loadData(true),
							disabled: refreshing || loading,
							className: "flex h-9 w-9 items-center justify-center rounded-xl border border-plum/15 bg-white text-plum/80 transition-all hover:bg-plum/5 hover:text-plum active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs",
							title: "Refresh live data",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${refreshing ? "animate-spin text-lavender-deep" : ""}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3 py-2 text-xs font-semibold text-plum/80 transition-all hover:bg-plum/5 hover:text-plum shadow-xs",
							title: "Open customer-facing website",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5 text-lavender-deep" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Site" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3 text-plum/40" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "avatar-widget-container",
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setIsAvatarMenuOpen(!isAvatarMenuOpen),
								"aria-expanded": isAvatarMenuOpen,
								"aria-haspopup": "true",
								className: `group flex items-center gap-2.5 rounded-2xl border p-1.5 pr-3 transition-all cursor-pointer select-none ${isAvatarMenuOpen ? "border-plum bg-plum/5 shadow-md ring-2 ring-plum/10" : "border-plum/15 bg-white hover:border-plum/30 hover:bg-plum/5 shadow-xs"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-plum via-[#684a62] to-lavender-deep text-[#FAF9F5] font-bold text-xs tracking-wider shadow-sm ring-1 ring-plum/20 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: userInitials }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1 ring-white" })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden md:flex flex-col text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-plum group-hover:text-lavender-deep transition-colors truncate max-w-[120px]",
												children: currentAdminUser
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-semibold uppercase tracking-wider text-plum/60",
											children: adminRole
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-3.5 w-3.5 text-plum/50 transition-transform duration-200 ${isAvatarMenuOpen ? "rotate-180 text-plum" : ""}` })
								]
							}), isAvatarMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-0 top-full mt-2 w-72 rounded-3xl border border-plum/15 bg-white/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 text-plum",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10 mb-1 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-plum via-[#684a62] to-lavender-deep text-[#FAF9F5] font-bold text-sm shadow-md ring-2 ring-plum/15 shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: userInitials })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-sm text-plum truncate",
														children: currentAdminUser
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3.5 w-3.5 text-amber-500 shrink-0" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-plum/60 truncate block font-sans",
													children: adminEmail
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pt-2 border-t border-plum/10 text-[10px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 text-emerald-700 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Session" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-plum/50 uppercase tracking-wider font-semibold",
												children: "TLS 256-Bit"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setIsAvatarMenuOpen(false);
											setIsSettingsModalOpen(true);
										},
										className: "w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-plum/80 hover:bg-plum/5 hover:text-plum transition-all cursor-pointer group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-7 w-7 items-center justify-center rounded-lg bg-plum/5 text-plum group-hover:bg-plum/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "Studio & Suite Settings"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-plum/30 group-hover:text-plum group-hover:translate-x-0.5 transition-all" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActiveTab("appointments");
											setIsAvatarMenuOpen(false);
										},
										className: "w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Appointments CRM" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActiveTab("boutique");
											setIsAvatarMenuOpen(false);
										},
										className: "w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wigs & Boutique Catalog" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActiveTab("concierge");
											setIsAvatarMenuOpen(false);
										},
										className: "w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-3.5 w-3.5 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Studio Contacts & Hotline" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 border-t border-plum/10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "/",
										target: "_blank",
										rel: "noopener noreferrer",
										onClick: () => setIsAvatarMenuOpen(false),
										className: "flex items-center justify-between rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Live Website" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3 text-plum/40" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setIsAvatarMenuOpen(false);
											handleLogout();
										},
										className: "w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lock Command Suite" })]
									})
								]
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[1600px] px-4 sm:px-8 border-t border-plum/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2",
					children: [
						{
							id: "appointments",
							label: "Appointments CRM",
							icon: Calendar,
							badge: stats.pending > 0 ? stats.pending : void 0
						},
						{
							id: "promos",
							label: "Promo & Banner",
							icon: Megaphone
						},
						{
							id: "boutique",
							label: "Wigs & Inventory",
							icon: ShoppingBag,
							badge: `${managedProducts.length}`
						},
						{
							id: "lookbook",
							label: "Lookbook Curator",
							icon: Image
						},
						{
							id: "concierge",
							label: "Studio Contacts",
							icon: SlidersVertical
						},
						{
							id: "analytics",
							label: "Performance & Stats",
							icon: ChartColumn
						}
					].map((tab) => {
						const isActive = activeTab === tab.id;
						const Icon = tab.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `flex items-center gap-2 shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isActive ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 font-extrabold" : "bg-transparent text-plum/70 hover:bg-plum/5 hover:text-plum"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }),
								tab.badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive ? "bg-amber-400 text-plum" : "bg-plum/10 text-plum"}`,
									children: tab.badge
								})
							]
						}, tab.id);
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-[1600px] px-4 sm:px-8 py-8",
			children: [
				activeTab === "appointments" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-plum/10 bg-white p-5 md:p-6 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] uppercase tracking-wider font-bold text-plum/60 block",
											children: "Total Inquiries"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl sm:text-4xl text-plum font-bold mt-1 block",
											children: stats.total
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-plum/60 mt-1 block font-medium",
											children: "All registered brides"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-amber-300/60 bg-amber-50/70 p-5 md:p-6 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] uppercase tracking-wider font-bold text-amber-900",
												children: "Pending Review"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2 w-2 rounded-full bg-amber-500 animate-ping" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl sm:text-4xl text-amber-900 font-bold mt-1 block",
											children: stats.pending
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-amber-800/80 mt-1 block font-semibold",
											children: "Requires response"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 md:p-6 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] uppercase tracking-wider font-bold text-emerald-900 block",
											children: "Confirmed Bookings"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl sm:text-4xl text-emerald-900 font-bold mt-1 block",
											children: stats.confirmed
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-emerald-800/80 mt-1 block font-semibold",
											children: "Locked on studio calendar"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-indigo-200 bg-indigo-50/70 p-5 md:p-6 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] uppercase tracking-wider font-bold text-indigo-900 block",
											children: "Completed Artistry"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl sm:text-4xl text-indigo-900 font-bold mt-1 block",
											children: stats.completed
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-indigo-800/80 mt-1 block font-semibold",
											children: "Delivered sessions"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2 sm:col-span-4 lg:col-span-1 rounded-3xl border border-plum/10 bg-white p-5 md:p-6 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] uppercase tracking-wider font-bold text-plum/60 block",
											children: "Pipeline Value (Est.)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-2xl sm:text-3xl text-plum font-bold mt-1 block truncate",
											children: ["₦", stats.estimatedValue.toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-emerald-700 font-semibold mt-1 block",
											children: [stats.conversionRate, "% Conversion Rate"]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-4 sm:p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1 max-w-lg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-plum/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											placeholder: "Search by client name, email, phone, or service...",
											className: "w-full rounded-2xl border border-plum/15 bg-[#FAF7F2] py-3 pl-11 pr-4 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:bg-white focus:outline-none shadow-xs"
										}),
										searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSearchQuery(""),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs text-plum/50 hover:text-plum cursor-pointer",
											children: "Clear"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 self-end lg:self-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-xl border border-plum/15 bg-[#FAF7F2] p-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setViewMode("list"),
											className: `px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${viewMode === "list" ? "bg-plum text-[#FAF9F5] shadow-xs" : "text-plum/60 hover:text-plum"}`,
											children: "List"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setViewMode("kanban"),
											className: `px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${viewMode === "kanban" ? "bg-plum text-[#FAF9F5] shadow-xs" : "text-plum/60 hover:text-plum"}`,
											children: "Pipeline"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleExportCSV,
										className: "flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-plum hover:bg-plum/5 active:scale-95 transition-all cursor-pointer shadow-xs",
										title: "Export to CSV",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Export CSV"
										})]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-plum/10",
								children: [
									{
										id: "all",
										label: `All Inquiries (${stats.total})`
									},
									{
										id: "pending",
										label: `Pending (${stats.pending})`
									},
									{
										id: "confirmed",
										label: `Confirmed (${stats.confirmed})`
									},
									{
										id: "completed",
										label: `Completed (${stats.completed})`
									},
									{
										id: "declined",
										label: `Declined (${stats.declined})`
									}
								].map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilterStatus(chip.id),
									className: `rounded-xl px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${filterStatus === chip.id ? "bg-plum text-[#FAF9F5] shadow-xs" : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"}`,
									children: chip.label
								}, chip.id))
							})]
						}),
						filteredAppointments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mx-auto h-12 w-12 text-plum/30 mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xl text-plum font-bold",
									children: "No appointments found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-plum/60 mt-1 max-w-sm mx-auto",
									children: "Try adjusting your filter or search query to find relevant booking inquiries."
								}),
								searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setSearchQuery("");
										setFilterStatus("all");
									},
									className: "mt-4 rounded-full bg-plum/5 border border-plum/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-plum hover:bg-plum hover:text-white cursor-pointer transition-all",
									children: "Reset Search"
								})
							]
						}) : viewMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: filteredAppointments.map((app) => {
								const isEditing = editingId === app.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group rounded-3xl border border-plum/10 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-plum/30 hover:shadow-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum font-display text-lg font-bold border border-plum/15",
												children: app.name.charAt(0).toUpperCase()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-display text-lg sm:text-xl font-bold text-plum",
														children: app.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${{
															pending: "bg-amber-50 text-amber-800 border-amber-300",
															confirmed: "bg-emerald-50 text-emerald-800 border-emerald-300",
															completed: "bg-indigo-50 text-indigo-800 border-indigo-300",
															declined: "bg-rose-50 text-rose-800 border-rose-300"
														}[app.status]}`,
														children: app.status
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-plum/80",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-semibold text-lavender-deep flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), app.service]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1 text-plum/60",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3 text-plum/40" }), app.appointment_date]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1 text-plum/60",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 text-plum/40" }), app.preferred_time]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex flex-wrap items-center gap-3 text-xs text-plum/60",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `mailto:${app.email}`,
														className: "flex items-center gap-1 hover:text-plum transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3 text-plum/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: app.email })]
													}), app.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `tel:${app.phone}`,
														className: "flex items-center gap-1 hover:text-plum transition-colors font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3 text-plum/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: app.phone })]
													})]
												}),
												app.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-2 rounded-xl bg-[#FAF7F2] p-2.5 text-xs italic text-plum/80 border border-plum/10",
													children: [
														"\"",
														app.notes,
														"\""
													]
												})
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2 sm:gap-3 self-end lg:self-center border-t lg:border-t-0 border-plum/10 pt-3 lg:pt-0 w-full lg:w-auto justify-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: generateClientWhatsAppUrl(app),
												target: "_blank",
												rel: "noopener noreferrer",
												className: "flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95",
												title: "Message client on WhatsApp",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp Client" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													setEditingId(isEditing ? null : app.id);
													setEditStatus(app.status);
													setEditNotes(app.notes || "");
												},
												className: "rounded-xl border border-plum/15 bg-[#FAF7F2] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-plum hover:bg-plum/10 active:scale-95 transition-all cursor-pointer shadow-xs",
												children: isEditing ? "Close Editor" : "Change Status"
											})]
										})]
									}), isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-2xl border border-plum/20 bg-[#FAF7F2] p-4 animate-in fade-in duration-200",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "text-xs font-bold uppercase tracking-wider text-plum mb-3",
												children: "Update Appointment Status & Studio Notes"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] uppercase tracking-wider text-plum/60 block mb-1",
													children: "Set Status:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: editStatus,
													onChange: (e) => setEditStatus(e.target.value),
													className: "w-full rounded-xl border border-plum/20 bg-white px-3 py-2 text-xs text-plum font-semibold focus:outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "pending",
															children: "PENDING (Under Review)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "confirmed",
															children: "CONFIRMED (Date Locked)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "completed",
															children: "COMPLETED (Session Done)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "declined",
															children: "DECLINED (Unavailable)"
														})
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] uppercase tracking-wider text-plum/60 block mb-1",
													children: "Studio Follow-up Notes:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editNotes,
													onChange: (e) => setEditNotes(e.target.value),
													placeholder: "Add internal studio notes...",
													className: "w-full rounded-xl border border-plum/20 bg-white px-3 py-2 text-xs text-plum focus:outline-none"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-center justify-end gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setEditingId(null),
													className: "rounded-xl border border-plum/15 bg-white px-3.5 py-1.5 text-xs text-plum/70 hover:bg-plum/5 cursor-pointer",
													children: "Cancel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													disabled: updating,
													onClick: () => handleUpdateStatus(app.id, editStatus, editNotes),
													className: "rounded-xl bg-plum text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-lavender-deep cursor-pointer transition-all shadow-xs",
													children: updating ? "Saving..." : "Save Changes"
												})]
											})
										]
									})]
								}, app.id);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
							children: [
								"pending",
								"confirmed",
								"completed",
								"declined"
							].map((colStatus) => {
								const colItems = appointments.filter((a) => a.status === colStatus);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `rounded-3xl border ${{
										pending: "border-amber-200 bg-amber-50/40",
										confirmed: "border-emerald-200 bg-emerald-50/40",
										completed: "border-indigo-200 bg-indigo-50/40",
										declined: "border-rose-200 bg-rose-50/40"
									}[colStatus]} p-4 flex flex-col justify-between min-h-[400px] shadow-xs`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between pb-3 border-b border-plum/10 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase tracking-wider text-plum",
											children: {
												pending: "Pending Review",
												confirmed: "Confirmed Sessions",
												completed: "Completed",
												declined: "Declined"
											}[colStatus]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-plum border border-plum/10 shadow-xs",
											children: colItems.length
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2.5",
										children: colItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-plum/40 italic text-center py-6",
											children: "No requests in this stage"
										}) : colItems.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-plum/10 bg-white p-3.5 text-xs space-y-1.5 shadow-sm hover:border-plum/30 transition-all",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-plum truncate max-w-[140px]",
														children: app.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-lavender-deep font-semibold",
														children: app.appointment_date
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-plum/70 truncate",
													children: app.service
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between pt-1 border-t border-plum/5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-plum/50",
														children: app.preferred_time
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: generateClientWhatsAppUrl(app),
														target: "_blank",
														rel: "noopener noreferrer",
														className: "text-emerald-700 hover:text-emerald-800 flex items-center gap-1 text-[10px] font-bold",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat" })]
													})]
												})
											]
										}, app.id))
									})] })
								}, colStatus);
							})
						})
					]
				}),
				activeTab === "promos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-7 w-7 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Promo Banners & Live Announcement Hub" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-plum/60 mt-1",
								children: "Create, edit, pulse, activate, duplicate, and delete promotional announcements broadcasted across the storefront."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center flex-wrap gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleResetAnnouncements,
										className: "flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-all cursor-pointer shadow-xs",
										title: "Reset to 3 studio default templates",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Defaults" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-4 w-4 animate-pulse text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeAnnouncement ? `Live: "${activeAnnouncement.title}"` : "Broadcast Paused (Hidden)" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleOpenCreateAnnouncement,
										className: "flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] hover:bg-lavender-deep px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ Create Announcement" })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold uppercase tracking-wider text-plum flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Storefront Marquee Simulation" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] rounded-full px-2.5 py-0.5 font-bold uppercase border ${activeAnnouncement ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-plum/5 text-plum/50 border-plum/10"}`,
									children: activeAnnouncement ? "● Broadcasting to All Users" : "○ Hidden from Public"
								})]
							}), activeAnnouncement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-2xl p-4 md:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border relative overflow-hidden transition-all duration-300 ${activeAnnouncement.theme === "amber" ? "bg-gradient-to-r from-[#3D2502] via-[#5C3A08] to-[#2B1A02] text-amber-100 border-amber-400/40" : activeAnnouncement.theme === "emerald" ? "bg-gradient-to-r from-[#032B1C] via-[#084D34] to-[#021F14] text-emerald-100 border-emerald-500/40" : activeAnnouncement.theme === "rose" ? "bg-gradient-to-r from-[#3B0818] via-[#59122A] to-[#2B0511] text-rose-100 border-rose-400/40" : activeAnnouncement.theme === "dark" ? "bg-gradient-to-r from-[#170E15] via-[#241320] to-[#120B10] text-[#FAF9F5] border-white/20" : "bg-gradient-to-r from-plum via-[#684a62] to-plum text-[#FAF9F5] border-white/10"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3.5 z-10 text-center sm:text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-amber-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5" }), activeAnnouncement.pulseAnimation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "absolute -top-1 -right-1 flex h-3 w-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-amber-400 ring-2 ring-white/20" })]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center sm:justify-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-300 border border-amber-300/30",
												children: activeAnnouncement.badgeLabel
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
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex items-center gap-2 rounded-xl bg-white text-plum px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeAnnouncement.voucherCode })] })]
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border border-plum/10 bg-[#FAF7F2] p-6 text-center text-plum/60 text-xs",
								children: "No announcement banner is currently active. Select one of the campaigns below and click \"Set as Live\" to display it on the website."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0",
								children: [
									{
										id: "all",
										label: `All Campaigns (${announcements.length})`
									},
									{
										id: "active",
										label: `Active (${announcements.filter((a) => a.isActive).length})`
									},
									{
										id: "pulsing",
										label: `Pulsing Live (${announcements.filter((a) => a.pulseAnimation).length})`
									}
								].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAnnouncementFilter(tab.id),
									className: `rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${announcementFilter === tab.id ? "bg-plum text-[#FAF9F5] font-bold shadow-xs" : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"}`,
									children: tab.label
								}, tab.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:w-64",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-plum/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: announcementSearch,
										onChange: (e) => setAnnouncementSearch(e.target.value),
										placeholder: "Search campaigns...",
										className: "h-9 w-full rounded-xl border border-plum/15 bg-[#FAF7F2] pl-9 pr-8 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:bg-white focus:outline-none"
									}),
									announcementSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setAnnouncementSearch(""),
										className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}),
						filteredAnnouncements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "mx-auto h-12 w-12 text-plum/30 mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-lg text-plum font-bold",
									children: "No announcements found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-plum/60 mt-1 max-w-sm mx-auto",
									children: "Try adjusting your filter or click \"+ Create Announcement\" to launch a new studio promotion."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
							children: filteredAnnouncements.map((item) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `group relative rounded-3xl border p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 transition-all shadow-sm ${item.isActive ? "border-plum bg-plum/[0.03] ring-2 ring-plum/10 shadow-md" : "border-plum/10 bg-white hover:border-plum/30 hover:shadow-md"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${{
														plum: "bg-plum/10 border-plum/20 text-plum",
														amber: "bg-amber-100 border-amber-300 text-amber-900",
														emerald: "bg-emerald-100 border-emerald-300 text-emerald-900",
														rose: "bg-rose-100 border-rose-300 text-rose-900",
														dark: "bg-neutral-800 text-white border-neutral-700"
													}[item.theme]}`,
													children: {
														plum: "Plum Velvet",
														amber: "Amber Gold",
														emerald: "Emerald Jade",
														rose: "Ruby Rose",
														dark: "Dark Obsidian"
													}[item.theme]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-plum/5 px-2 py-0.5 text-[9px] font-bold text-plum border border-plum/15",
													children: item.badgeLabel
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${item.isActive ? "bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse" : "bg-plum/5 text-plum/50 border-plum/10"}`,
												children: item.isActive ? "● Broadcast Live" : "○ Paused"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-sans font-bold text-base text-plum truncate",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-plum/75 line-clamp-3 leading-relaxed font-sans",
											children: [
												"\"",
												item.text,
												"\""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3.5 flex items-center justify-between rounded-xl bg-[#FAF7F2] p-2.5 border border-plum/10 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-plum uppercase tracking-wider",
													children: item.voucherCode
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-amber-700",
												children: item.discountPercent
											})]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-3 border-t border-plum/10 space-y-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleTogglePulse(item),
												className: `flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${item.pulseAnimation ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs" : "bg-plum/5 text-plum/50 border border-plum/10 hover:text-plum"}`,
												title: "Toggle live pulsing neon glow effect on website",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: `h-3.5 w-3.5 ${item.pulseAnimation ? "fill-amber-500 text-amber-600" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.pulseAnimation ? "Pulse ON" : "Pulse OFF" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleToggleActive(item),
												className: `flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${item.isActive ? "bg-plum text-white shadow-md shadow-plum/20" : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/10 hover:text-plum border border-plum/15"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.isActive ? "Live (Broadcasting)" : "Set as Live" })]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1.5 pt-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => handleOpenEditAnnouncement(item),
													className: "flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-plum hover:bg-plum/5 transition-colors cursor-pointer shadow-xs",
													title: "Edit announcement campaign",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => handleDuplicateAnnouncement(item),
													className: "flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-lavender-deep hover:bg-plum/5 transition-colors cursor-pointer shadow-xs",
													title: "Duplicate campaign",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyPlus, { className: "h-3.5 w-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setDeleteConfirmAnnouncement(item),
													className: "flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shadow-xs",
													title: "Delete announcement",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})
											]
										})]
									})]
								}, item.id);
							})
						}),
						isAnnouncementModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full max-w-2xl rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6 text-plum",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-plum/10 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-5 w-5 text-lavender-deep" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl text-plum font-bold",
											children: editingAnnouncementId ? "Edit Announcement Campaign" : "Create New Announcement Campaign"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-plum/60",
											children: "Configure promotion copy, coupon code, theme palette, and live pulsing effects."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsAnnouncementModalOpen(false),
										className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7F2] text-plum/60 hover:bg-plum/10 hover:text-plum cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSaveAnnouncement,
									className: "space-y-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Campaign Name / Title *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: annFormTitle,
												onChange: (e) => setAnnFormTitle(e.target.value),
												placeholder: "e.g. Bridal Season 20% Drop",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Badge Tag Label"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: annFormBadge,
												onChange: (e) => setAnnFormBadge(e.target.value),
												placeholder: "e.g. Exclusive Promo, Flash Drop, VIP Offer",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
											children: "Announcement Headline Copy (Shown on Website) *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											required: true,
											value: annFormText,
											onChange: (e) => setAnnFormText(e.target.value),
											placeholder: "e.g. Enjoy 20% OFF your first wig order + ALL beauty & bridal installation services!",
											className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none leading-relaxed"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Coupon Voucher Code:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: annFormVoucher,
												onChange: (e) => setAnnFormVoucher(e.target.value.toUpperCase()),
												placeholder: "e.g. SEDDY20",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm font-bold uppercase tracking-widest text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Discount / Offer Value Label:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: annFormDiscount,
												onChange: (e) => setAnnFormDiscount(e.target.value),
												placeholder: "e.g. 20% OFF or FREE GIFT",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-plum/10 pt-4 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block",
													children: "Visual Color Theme:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-2 sm:grid-cols-5 gap-2.5",
													children: [
														{
															id: "plum",
															label: "Plum Velvet",
															bg: "bg-plum"
														},
														{
															id: "amber",
															label: "Amber Gold",
															bg: "bg-amber-600"
														},
														{
															id: "emerald",
															label: "Emerald Jade",
															bg: "bg-emerald-600"
														},
														{
															id: "rose",
															label: "Ruby Rose",
															bg: "bg-rose-700"
														},
														{
															id: "dark",
															label: "Dark Obsidian",
															bg: "bg-neutral-900"
														}
													].map((t) => {
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => setAnnFormTheme(t.id),
															className: `rounded-2xl p-2.5 border text-center transition-all cursor-pointer ${annFormTheme === t.id ? "border-plum bg-plum/5 ring-2 ring-plum/20" : "border-plum/10 bg-[#FAF7F2] hover:border-plum/30"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-6 w-full rounded-lg ${t.bg} border border-white/20 mb-1.5` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-semibold text-plum truncate block",
																children: t.label
															})]
														}, t.id);
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative flex h-9 w-9 items-center justify-center rounded-xl bg-plum/5 text-plum",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-lavender-deep" }), annFormPulse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "absolute -top-1 -right-1 flex h-2.5 w-2.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" })]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold text-plum block",
															children: "Live Pulse Glowing Animation"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-plum/50",
															children: "Display pulsing neon badge beacon on customer storefront."
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setAnnFormPulse(!annFormPulse),
														className: `flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${annFormPulse ? "bg-plum" : "bg-plum/20"}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-5 w-5 rounded-full bg-white shadow-md transition-transform ${annFormPulse ? "translate-x-5" : "translate-x-0"}` })
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-plum/10 pt-4 flex items-center justify-end gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setIsAnnouncementModalOpen(false),
												className: "rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer",
												children: "Cancel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "submit",
												className: "flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:bg-lavender-deep active:scale-95 transition-all cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Announcement" })]
											})]
										})
									]
								})]
							})
						}),
						deleteConfirmAnnouncement && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 animate-in fade-in duration-150",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-2xl text-center space-y-4 text-plum",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-xl text-plum font-bold",
										children: "Delete Promo Announcement?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-plum/70 mt-1.5 leading-relaxed",
										children: [
											"Are you sure you want to remove",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-plum",
												children: [
													"\"",
													deleteConfirmAnnouncement.title,
													"\""
												]
											}),
											"? If this campaign is currently broadcasting, the announcement banner will be hidden from the storefront."
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-center gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setDeleteConfirmAnnouncement(null),
											className: "rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer",
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleDeleteAnnouncement(deleteConfirmAnnouncement),
											className: "rounded-xl bg-rose-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-rose-500/20",
											children: "Yes, Delete Campaign"
										})]
									})
								]
							})
						})
					]
				}),
				activeTab === "boutique" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-7 w-7 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Boutique Catalog & Inventory Controller" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-plum/60 mt-1",
								children: "Add, edit, duplicate, and delete luxury wigs, hair bundles, and cosmetic items displayed on the `/shop` and homepage."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center flex-wrap gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleResetCatalog,
										className: "flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-all cursor-pointer shadow-xs",
										title: "Reset to default 7 products",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Defaults" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2 text-xs font-bold text-amber-900 shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pinnedProductIds.length, " Pinned on Home"] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleOpenAddProduct,
										className: "flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] hover:bg-lavender-deep px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ Add New Product" })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0",
								children: [
									{
										id: "all",
										label: `All Items (${managedProducts.length})`
									},
									{
										id: "wigs",
										label: `Luxury Wigs (${managedProducts.filter((p) => p.category === "wigs").length})`
									},
									{
										id: "cosmetics",
										label: `Cosmetics (${managedProducts.filter((p) => p.category === "cosmetics").length})`
									},
									{
										id: "pinned",
										label: `Pinned on Home (${pinnedProductIds.length})`
									}
								].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setInventoryCategoryFilter(cat.id),
									className: `rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${inventoryCategoryFilter === cat.id ? "bg-plum text-[#FAF9F5] font-bold shadow-xs" : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"}`,
									children: cat.label
								}, cat.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:w-64",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-plum/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: inventorySearchQuery,
										onChange: (e) => setInventorySearchQuery(e.target.value),
										placeholder: "Search catalog...",
										className: "h-9 w-full rounded-xl border border-plum/15 bg-[#FAF7F2] pl-9 pr-8 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:bg-white focus:outline-none"
									}),
									inventorySearchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setInventorySearchQuery(""),
										className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}),
						filteredInventoryProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto h-12 w-12 text-plum/30 mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-lg text-plum font-bold",
									children: "No matching products found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-plum/60 mt-1 max-w-sm mx-auto",
									children: "Try adjusting your search query or category filter, or click \"+ Add New Product\" above."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
							children: filteredInventoryProducts.map((product) => {
								const isPinned = pinnedProductIds.includes(product.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative rounded-3xl border border-plum/10 bg-white p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-plum/30 hover:shadow-md transition-all shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: product.img,
												alt: product.name,
												className: "h-22 w-22 rounded-2xl object-cover bg-[#FAF7F2] border border-plum/10"
											}), product.discountBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute -top-1.5 -left-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs",
												children: product.discountBadge
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] uppercase tracking-wider font-bold text-lavender-deep truncate",
														children: product.categoryLabel
													}), product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-plum/5 px-2 py-0.5 text-[9px] font-bold text-plum border border-plum/15",
														children: product.badge
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-sans font-bold text-base text-plum truncate mt-1",
													children: product.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mt-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-base font-bold text-amber-700",
														children: product.price
													}), product.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-plum/40 line-through",
														children: product.originalPrice
													})]
												}),
												product.dots && product.dots.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1 mt-2 text-[10px] text-plum/60",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [product.dots.length, " lengths/variants:"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-plum font-semibold truncate",
														children: product.dots.map((d) => d.name).join(", ")
													})]
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-plum/70 line-clamp-2 leading-relaxed font-sans mt-3",
										children: product.desc
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-3 border-t border-plum/10 space-y-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => togglePinProduct(product.id),
												className: `flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${isPinned ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs" : "bg-[#FAF7F2] text-plum/60 hover:bg-plum/5 hover:text-plum border border-plum/15"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3 w-3 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isPinned ? "Pinned" : "Pin Home" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleOpenEditProduct(product),
														className: "flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-plum hover:bg-plum/5 transition-colors cursor-pointer shadow-xs",
														title: "Edit product details",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleDuplicateProduct(product),
														className: "flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-lavender-deep hover:bg-plum/5 transition-colors cursor-pointer shadow-xs",
														title: "Duplicate as new product",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyPlus, { className: "h-3.5 w-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setDeleteConfirmProduct(product),
														className: "flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shadow-xs",
														title: "Delete product",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: `https://wa.me/${studioPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello Seddypluz Studio, checking availability for "${product.name}" (${product.price}).`)}`,
														target: "_blank",
														rel: "noopener noreferrer",
														className: "flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shadow-xs",
														title: "Test client WhatsApp inquiry",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" })
													})
												]
											})]
										})
									})]
								}, product.id);
							})
						}),
						isProductModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full max-w-2xl rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6 text-plum",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-plum/10 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl text-plum font-bold",
										children: editingProductId ? "Edit Boutique Product" : "Add New Boutique Product"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-plum/60 mt-0.5",
										children: "Configure pricing, variants, descriptions, and visual presentation."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsProductModalOpen(false),
										className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7F2] text-plum/60 hover:bg-plum/10 hover:text-plum cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSaveProduct,
									className: "space-y-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Product Name / Title *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: formName,
												onChange: (e) => setFormName(e.target.value),
												placeholder: "e.g. Bone Straight 30 Inch Virgin Unit",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Category *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: formCategory,
												onChange: (e) => setFormCategory(e.target.value),
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "wigs",
													children: "Luxury Wigs & Extensions"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "cosmetics",
													children: "Signature Cosmetics & Tools"
												})]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
													children: "Selling Price (₦) *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: formPrice,
													onChange: (e) => {
														setFormPrice(e.target.value);
														const num = parseInt(e.target.value.replace(/\D/g, ""), 10);
														if (!isNaN(num)) setFormNumericPrice(num);
													},
													placeholder: "₦280,000",
													className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-amber-700 font-bold focus:border-plum focus:bg-white focus:outline-none"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
													children: "Original / Strikethrough Price"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: formOriginalPrice,
													onChange: (e) => setFormOriginalPrice(e.target.value),
													placeholder: "₦350,000",
													className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum/70 focus:border-plum focus:bg-white focus:outline-none"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
													children: "Numeric Value (for sort)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													required: true,
													value: formNumericPrice,
													onChange: (e) => setFormNumericPrice(Number(e.target.value)),
													className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Featured Badge"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: formBadge,
												onChange: (e) => setFormBadge(e.target.value),
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														children: "None"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Bestseller",
														children: "Bestseller"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "New Drop",
														children: "New Drop"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "HD Melt",
														children: "HD Melt"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Limited Batch",
														children: "Limited Batch"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Studio Favorite",
														children: "Studio Favorite"
													})
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Discount Tag Badge"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: formDiscountBadge,
												onChange: (e) => setFormDiscountBadge(e.target.value),
												placeholder: "e.g. 20% OFF or 15% OFF",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block",
													children: "Select Product Visual Preset:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-4 sm:grid-cols-7 gap-2.5",
													children: PRODUCT_IMAGE_PRESETS.map((preset) => {
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => {
																setFormImg(preset.value);
																setFormCustomImg("");
															},
															className: `relative rounded-2xl border overflow-hidden p-1 transition-all cursor-pointer ${formImg === preset.value && !formCustomImg ? "border-plum ring-2 ring-plum/20 bg-plum/5" : "border-plum/10 hover:border-plum/30 bg-[#FAF7F2]"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: preset.value,
																alt: preset.label,
																className: "h-14 w-full object-cover rounded-xl"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block text-[9px] text-plum/70 truncate mt-1 text-center font-medium",
																children: preset.label.split(" ")[0]
															})]
														}, preset.id);
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "pt-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[10px] text-plum/60 block mb-1",
														children: "Or enter custom image URL:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "url",
														value: formCustomImg,
														onChange: (e) => setFormCustomImg(e.target.value),
														placeholder: "https://example.com/custom-wig-photo.jpg",
														className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Short Card Description *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: formDesc,
												onChange: (e) => setFormDesc(e.target.value),
												placeholder: "Summary shown on product cards...",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5",
												children: "Full In-Depth Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 3,
												value: formFullDesc,
												onChange: (e) => setFormFullDesc(e.target.value),
												placeholder: "Detailed product craft, single-donor specs, and hair texture notes shown in quick view...",
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-plum/10 pt-4 space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs uppercase font-bold tracking-wider text-plum",
													children: "Detailed Specifications:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-plum/60 block mb-1",
															children: "Density / Weight:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: formDensityOrSize,
															onChange: (e) => setFormDensityOrSize(e.target.value),
															className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-plum/60 block mb-1",
															children: "Lace / Finish:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: formLaceOrFinish,
															onChange: (e) => setFormLaceOrFinish(e.target.value),
															className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-plum/60 block mb-1",
															children: "Origin / Formulation:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: formOrigin,
															onChange: (e) => setFormOrigin(e.target.value),
															className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-plum/60 block mb-1",
															children: "Longevity:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: formLongevity,
															onChange: (e) => setFormLongevity(e.target.value),
															className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
														})] })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-plum/60 block mb-1 text-xs",
													children: "Studio Care Tips:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: formCareTips,
													onChange: (e) => setFormCareTips(e.target.value),
													className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-plum/10 pt-4 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "text-xs uppercase font-bold tracking-wider text-plum",
													children: [
														"Length / Color Variants (",
														formDots.length,
														"):"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														setFormDots([...formDots, {
															color: "#1C1C1C",
															name: `Variant ${formDots.length + 1}`,
															priceFormatted: formPrice,
															numericPrice: formNumericPrice
														}]);
													},
													className: "text-[11px] font-bold text-lavender-deep hover:text-plum flex items-center gap-1 cursor-pointer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Variant" })]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-2",
												children: formDots.map((dot, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 rounded-xl bg-[#FAF7F2] p-2 border border-plum/10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: dot.name,
															onChange: (e) => {
																const next = [...formDots];
																next[index].name = e.target.value;
																setFormDots(next);
															},
															placeholder: "e.g. 26 Inch",
															className: "flex-1 rounded-lg border border-plum/20 bg-white px-2.5 py-1.5 text-xs text-plum focus:outline-none"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: dot.priceFormatted || "",
															onChange: (e) => {
																const next = [...formDots];
																next[index].priceFormatted = e.target.value;
																const num = parseInt(e.target.value.replace(/\D/g, ""), 10);
																if (!isNaN(num)) next[index].numericPrice = num;
																setFormDots(next);
															},
															placeholder: "₦340,000",
															className: "w-28 rounded-lg border border-plum/20 bg-white px-2.5 py-1.5 text-xs text-amber-700 font-bold focus:outline-none"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => {
																if (formDots.length <= 1) {
																	toast.error("At least 1 variant is required.");
																	return;
																}
																setFormDots(formDots.filter((_, i) => i !== index));
															},
															className: "text-rose-500 hover:text-rose-700 p-1.5 cursor-pointer",
															title: "Remove variant",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
														})
													]
												}, index))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-plum/10 pt-4 flex items-center justify-end gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setIsProductModalOpen(false),
												className: "rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer",
												children: "Cancel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "submit",
												className: "flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:bg-lavender-deep active:scale-95 transition-all cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save & Publish Product" })]
											})]
										})
									]
								})]
							})
						}),
						deleteConfirmProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 animate-in fade-in duration-150",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-2xl text-center space-y-4 text-plum",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-xl text-plum font-bold",
										children: "Delete Product Item?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-plum/70 mt-1.5 leading-relaxed",
										children: [
											"Are you sure you want to remove",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-plum",
												children: [
													"\"",
													deleteConfirmProduct.name,
													"\""
												]
											}),
											" ",
											"from the boutique inventory? This item will no longer appear on the `/shop` or homepage."
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-center gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setDeleteConfirmProduct(null),
											className: "rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer",
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleDeleteProduct(deleteConfirmProduct),
											className: "rounded-xl bg-rose-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-rose-500/20",
											children: "Yes, Delete Product"
										})]
									})
								]
							})
						})
					]
				}),
				activeTab === "lookbook" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-7 w-7 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Homepage Lookbook & Editorial Slides" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-plum/60 mt-1",
							children: "Arrange slide orders and customize headings displayed on the homepage bridal accordion."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-xl bg-plum/5 border border-plum/15 px-3.5 py-2 text-xs font-bold text-plum self-start sm:self-auto",
							children: [lookbookSlides.length, " Editorial Slides Active"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: lookbookSlides.map((slide, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-5 sm:p-6 shadow-sm space-y-4 hover:border-plum/30 transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: slide.img,
									alt: slide.title,
									className: "h-28 w-24 rounded-2xl object-cover border border-plum/10 shadow-xs shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-base font-bold text-lavender-deep",
												children: ["Slide #", slide.num]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-plum/60 bg-plum/5 px-2 py-0.5 rounded-full border border-plum/10",
												children: slide.category
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-lg font-bold text-plum truncate",
											children: slide.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-plum/70 truncate",
											children: slide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-plum/50 italic truncate",
											children: slide.technique
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-plum/10 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-plum/60",
									children: "Editorial Sequence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: index === 0,
										onClick: () => handleMoveSlide(index, "up"),
										className: "rounded-xl border border-plum/15 bg-[#FAF7F2] px-3 py-1.5 font-bold text-xs text-plum hover:bg-plum/10 disabled:opacity-30 cursor-pointer",
										children: "▲ Move Earlier"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: index === lookbookSlides.length - 1,
										onClick: () => handleMoveSlide(index, "down"),
										className: "rounded-xl border border-plum/15 bg-[#FAF7F2] px-3 py-1.5 font-bold text-xs text-plum hover:bg-plum/10 disabled:opacity-30 cursor-pointer",
										children: "▼ Move Later"
									})]
								})]
							})]
						}, slide.id))
					})]
				}),
				activeTab === "concierge" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-7 w-7 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Studio Concierge & Direct Hotline" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-plum/60 mt-1",
						children: "Configure primary WhatsApp phone number, physical studio address, and operating hours."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveContacts,
						className: "rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-sm space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs uppercase tracking-wider font-bold text-plum/80 block mb-2",
										children: "Primary WhatsApp Hotline:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: studioPhone,
										onChange: (e) => setStudioPhone(e.target.value),
										className: "w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 py-3 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-plum/50 mt-1 block",
										children: "Clients will be directed here from WhatsApp booking buttons."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs uppercase tracking-wider font-bold text-plum/80 block mb-2",
									children: "Studio Location Label:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: studioLocation,
									onChange: (e) => setStudioLocation(e.target.value),
									className: "w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 py-3 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs uppercase tracking-wider font-bold text-plum/80 block mb-2",
									children: "Studio Operating Hours:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: studioHours,
									onChange: (e) => setStudioHours(e.target.value),
									className: "w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 py-3 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
								})] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-4 border-t border-plum/10 flex items-center justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-lavender-deep active:scale-95 transition-all shadow-lg shadow-plum/20 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: contactSaved ? "Saved Successfully!" : "Save Studio Contacts" })]
							})
						})]
					})]
				}),
				activeTab === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-7 w-7 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Performance & Conversion Analytics" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-plum/60 mt-1",
						children: "Real-time booking conversion, pipeline valuation, and client engagement metrics."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-xl text-plum font-bold",
								children: "Appointment Conversion Pipeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs mb-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirmed Sessions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-700 font-bold",
											children: stats.confirmed
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-3 w-full rounded-full bg-plum/5 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-emerald-500 transition-all duration-500",
											style: { width: `${stats.total > 0 ? stats.confirmed / stats.total * 100 : 0}%` }
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs mb-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Completed Artistry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-indigo-700 font-bold",
											children: stats.completed
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-3 w-full rounded-full bg-plum/5 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-indigo-500 transition-all duration-500",
											style: { width: `${stats.total > 0 ? stats.completed / stats.total * 100 : 0}%` }
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs mb-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pending Inquiries" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-800 font-bold",
											children: stats.pending
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-3 w-full rounded-full bg-plum/5 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-amber-400 transition-all duration-500",
											style: { width: `${stats.total > 0 ? stats.pending / stats.total * 100 : 0}%` }
										})
									})] })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xl text-plum font-bold",
									children: "Financial & Revenue Projection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-plum/60 mt-1",
									children: "Calculated from confirmed and pending bridal packages."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-around py-4 border-y border-plum/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-4xl font-bold text-emerald-700",
												children: [stats.conversionRate, "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-plum/50 block mt-1",
												children: "Inquiry Conversion"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-px bg-plum/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-4xl font-bold text-plum",
												children: ["₦", Math.round(stats.estimatedValue / (stats.total || 1)).toLocaleString()]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-plum/50 block mt-1",
												children: "Avg Inquiry Value"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-plum/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fast WhatsApp response increases booking rate by 38%" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab("appointments"),
										className: "text-lavender-deep hover:text-plum flex items-center gap-1 font-bold uppercase tracking-wider text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View CRM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
									})]
								})
							]
						})]
					})]
				}),
				isSettingsModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-xl rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6 text-plum",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-plum/10 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5 text-lavender-deep" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl sm:text-2xl text-plum font-bold",
									children: "Studio & Suite Settings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-plum/60",
									children: "Manage administrator profile, workspace preferences, and security options."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsSettingsModalOpen(false),
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7F2] text-plum/60 hover:bg-plum/10 hover:text-plum cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-xs uppercase font-bold tracking-wider text-plum flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Administrator Profile" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] text-plum/60 block mb-1 font-semibold",
												children: "Display Name:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: currentAdminUser,
												onChange: (e) => setCurrentAdminUser(e.target.value),
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] text-plum/60 block mb-1 font-semibold",
												children: "Role Designation:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: adminRole,
												onChange: (e) => setAdminRole(e.target.value),
												className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[11px] text-plum/60 block mb-1 font-semibold",
											children: "Contact Email:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: adminEmail,
											onChange: (e) => setAdminEmail(e.target.value),
											className: "w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-plum/10 pt-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs uppercase font-bold tracking-wider text-plum flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workspace Preferences" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-plum block",
													children: "Sound Cues & Audio Notifications"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-plum/50",
													children: "Play soft chime when new bridal inquiry is registered."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setSoundNotifications(!soundNotifications),
													className: `flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${soundNotifications ? "bg-plum" : "bg-plum/20"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-5 w-5 rounded-full bg-white shadow-md transition-transform ${soundNotifications ? "translate-x-5" : "translate-x-0"}` })
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-plum block",
													children: "Ambient Luxury Background Glow"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-plum/50",
													children: "Display soft blush and mauve background radial lighting."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setAmbientGlow(!ambientGlow),
													className: `flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${ambientGlow ? "bg-plum" : "bg-plum/20"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-5 w-5 rounded-full bg-white shadow-md transition-transform ${ambientGlow ? "translate-x-5" : "translate-x-0"}` })
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-plum block",
													children: "Auto-Refresh Interval"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-plum/50",
													children: "Automatically poll for new customer appointments."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: autoRefreshInterval,
													onChange: (e) => setAutoRefreshInterval(Number(e.target.value)),
													className: "rounded-xl border border-plum/20 bg-white px-3 py-1.5 text-xs text-plum font-semibold focus:border-plum focus:outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 0,
															children: "Manual Only"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 30,
															children: "Every 30 Seconds"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 60,
															children: "Every 1 Minute"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 300,
															children: "Every 5 Minutes"
														})
													]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-plum/10 pt-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs uppercase font-bold tracking-wider text-plum flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security & Active Session" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10 space-y-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-plum/70",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Session Duration:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-plum",
													children: "8 Hours (HTTP-Only Cookie)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-plum/70",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Brute Force Lockout:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-emerald-700",
													children: "Active (5 attempts / 30m lock)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-plum/70",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authorized Super-Admins:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-plum",
													children: "ajuhlouis, seddypluz"
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-plum/10 pt-4 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											const backupData = {
												exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
												appointments,
												products: managedProducts,
												pinnedProductIds,
												announcements,
												contacts: {
													phone: studioPhone,
													location: studioLocation,
													hours: studioHours
												}
											};
											const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
											const url = URL.createObjectURL(blob);
											const a = document.createElement("a");
											a.href = url;
											a.download = `seddypluz_studio_backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
											a.click();
											URL.revokeObjectURL(url);
											toast.success("Studio backup JSON exported successfully.");
										},
										className: "flex items-center gap-1.5 text-xs text-plum hover:text-lavender-deep font-semibold cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 text-lavender-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export Full Studio Backup (JSON)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setIsSettingsModalOpen(false);
											toast.success("Studio & suite preferences updated.");
										},
										className: "flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-lavender-deep active:scale-95 transition-all cursor-pointer shadow-md shadow-plum/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Settings" })]
									})]
								})
							]
						})]
					})
				})
			]
		})]
	});
}
//#endregion
export { AdminDashboard as component };
