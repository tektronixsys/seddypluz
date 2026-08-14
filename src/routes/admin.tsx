import React, { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  Filter,
  Search,
  Clock3,
  Check,
  User,
  RefreshCw,
  Lock,
  Sparkles,
  Crown,
  ShoppingBag,
  Megaphone,
  Image as ImageIcon,
  Sliders,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Copy,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowUpRight,
  Star,
  MapPin,
  Tag,
  Save,
  RotateCcw,
  Layers,
  ArrowUpDown,
  Plus,
  Scissors,
  Wand2,
  Pencil,
  Trash2,
  CopyPlus,
  PlusCircle,
  X,
  Package,
  Settings,
  LogOut,
  SlidersHorizontal,
  Globe,
  Database,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  adminLogin,
  adminLogout,
  getAdminAuthStatus,
  getAppointments,
  updateAppointmentStatus,
} from "@/lib/appointments.functions";
import type { AppointmentRequest } from "@/integrations/firebase/appointments";
import {
  boutiqueProducts as initialBoutiqueProducts,
  getStoredBoutiqueProducts,
  saveStoredBoutiqueProducts,
  resetStoredBoutiqueProducts,
  PRODUCT_IMAGE_PRESETS,
} from "@/components/boutique/data";
import type { Product, ProductDot } from "@/components/boutique/types";
import heroBride from "@/assets/hero-bride.jpg";
import gele1 from "@/assets/gele-1.jpg";
import bridalAfter from "@/assets/bridal_after.png";
import glam1 from "@/assets/glam-1.jpg";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

type AdminTab = "appointments" | "promos" | "boutique" | "lookbook" | "concierge" | "analytics";

interface LookbookSlideItem {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  technique: string;
  img: string;
  vol: string;
  active: boolean;
}

const initialLookbookSlides: LookbookSlideItem[] = [
  {
    id: "royal-bridal",
    num: "01",
    tag: "Haute Bridal Masterpiece",
    title: "Her Royal Moment",
    subtitle: "2026/2027 Bridal Collection",
    technique: "18H HD Base · Dewy Glass Skin",
    img: heroBride,
    vol: "Vol. IV",
    active: true,
  },
  {
    id: "heritage-gele",
    num: "02",
    tag: "Sculptural Headwrap Artistry",
    title: "Heritage Gele Crown",
    subtitle: "Couture Traditional Majesty",
    technique: "Precision Pleating · Royal Silhouette",
    img: gele1,
    vol: "Vol. III",
    active: true,
  },
  {
    id: "velvet-monarch",
    num: "03",
    tag: "Studio Signature Glam",
    title: "The Velvet Monarch",
    subtitle: "Camera-Calibrated Portraiture",
    technique: "Airbrushed Base · Satin Plum Lip",
    img: bridalAfter,
    vol: "Vol. II",
    active: true,
  },
  {
    id: "sunset-radiance",
    num: "04",
    tag: "Editorial Campaign Finish",
    title: "Sunset Radiance",
    subtitle: "4K Luminous Gold Glow",
    technique: "Baked Micro-Pearls · Soft Focus",
    img: glam1,
    vol: "Vol. I",
    active: true,
  },
];

function AdminDashboard() {
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const getAuthStatus = useServerFn(getAdminAuthStatus);
  const fetchAppointments = useServerFn(getAppointments);
  const updateStatus = useServerFn(updateAppointmentStatus);

  // Authentication & Profile State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<string>("Admin");
  const [adminRole, setAdminRole] = useState<string>("Super Admin");
  const [adminEmail, setAdminEmail] = useState<string>("admin@seddypluz.com");
  const [authChecking, setAuthChecking] = useState(false);

  // Avatar Widget & Settings Modal State
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [soundNotifications, setSoundNotifications] = useState(true);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(0);
  const [ambientGlow, setAmbientGlow] = useState(true);

  // Compute initials for Avatar
  const userInitials = useMemo(() => {
    if (!currentAdminUser) return "SP";
    const parts = currentAdminUser.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return currentAdminUser.slice(0, 2).toUpperCase();
  }, [currentAdminUser]);

  // Click outside to dismiss avatar dropdown
  useEffect(() => {
    if (!isAvatarMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#avatar-widget-container")) {
        setIsAvatarMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isAvatarMenuOpen]);

  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>("appointments");

  // Appointments Management State
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<"pending" | "confirmed" | "declined" | "completed">(
    "pending",
  );
  const [editNotes, setEditNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [selectedClientModal, setSelectedClientModal] = useState<AppointmentRequest | null>(null);

  // Front-End Announcement Manager State
  const [announcementText, setAnnouncementText] = useState(
    "Enjoy 20% OFF your first wig order + ALL beauty services",
  );
  const [voucherCode, setVoucherCode] = useState("SEDDY20");
  const [discountPercent, setDiscountPercent] = useState("20%");
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [bannerSaved, setBannerSaved] = useState(false);

  // Boutique Inventory Controller State (CRUD)
  const [managedProducts, setManagedProducts] = useState<Product[]>(() =>
    getStoredBoutiqueProducts(),
  );
  const [inventorySearchQuery, setInventorySearchQuery] = useState("");
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<
    "all" | "wigs" | "cosmetics" | "pinned"
  >("all");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);

  // Form State for Add / Edit
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<"wigs" | "cosmetics">("wigs");
  const [formPrice, setFormPrice] = useState("₦280,000");
  const [formOriginalPrice, setFormOriginalPrice] = useState("₦350,000");
  const [formNumericPrice, setFormNumericPrice] = useState(280000);
  const [formDesc, setFormDesc] = useState("");
  const [formFullDesc, setFormFullDesc] = useState("");
  const [formImg, setFormImg] = useState(PRODUCT_IMAGE_PRESETS[0].value);
  const [formCustomImg, setFormCustomImg] = useState("");
  const [formBadge, setFormBadge] = useState<Product["badge"] | "">("Bestseller");
  const [formDiscountBadge, setFormDiscountBadge] = useState("20% OFF");
  const [formDensityOrSize, setFormDensityOrSize] = useState("300g Super Double Drawn");
  const [formLaceOrFinish, setFormLaceOrFinish] = useState("13x4 HD Invisible Swiss Lace");
  const [formOrigin, setFormOrigin] = useState("100% Raw Single-Donor Virgin Hair");
  const [formLongevity, setFormLongevity] = useState("3 to 5+ years with studio care");
  const [formCareTips, setFormCareTips] = useState("Store in silk packaging, flat iron max 230°C.");
  const [formDots, setFormDots] = useState<ProductDot[]>([
    { color: "#121212", name: "22 Inch", priceFormatted: "₦280,000", numericPrice: 280000 },
    { color: "#1C1C1C", name: "24 Inch", priceFormatted: "₦310,000", numericPrice: 310000 },
  ]);

  const [pinnedProductIds, setPinnedProductIds] = useState<string[]>([
    "hair_straight",
    "hair_wave",
    "lipstick_plum",
  ]);

  // Lookbook Carousel Manager State
  const [lookbookSlides, setLookbookSlides] = useState<LookbookSlideItem[]>(initialLookbookSlides);

  // Studio Concierge Settings State
  const [studioPhone, setStudioPhone] = useState("+234 816 229 2997");
  const [studioLocation, setStudioLocation] = useState("Kaduna, Nigeria");
  const [studioHours, setStudioHours] = useState(
    "Mon – Sat: 09:00 AM – 07:00 PM | Sun: VIP Bridal Bookings Only",
  );
  const [instagramHandle, setInstagramHandle] = useState("@seddypluz_wigs");
  const [tiktokHandle, setTiktokHandle] = useState("@seddypluz_wigs");

  // Verify Auth Session on Mount
  const verifySession = async (suppressToast = true) => {
    setAuthChecking(true);
    try {
      const status = await getAuthStatus();
      const authenticated = status.authenticated;
      setIsAuthenticated(authenticated);
      if (authenticated) {
        await loadData();
      } else if (!suppressToast) {
        toast.error("Session expired. Please enter passcode.");
      }
    } catch {
      setIsAuthenticated(false);
      if (!suppressToast) {
        toast.error("Unable to verify session.");
      }
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    verifySession(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      toast.error("Please enter your administrator username.");
      return;
    }
    if (!passwordInput.trim()) {
      toast.error("Please enter your security password.");
      return;
    }

    setAuthChecking(true);
    try {
      const res = await login({
        data: {
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        },
      });
      setIsAuthenticated(true);
      setCurrentAdminUser(res.username || usernameInput.trim());
      setPasswordInput("");
      toast.success(`Welcome to Atelier HQ, ${res.username || usernameInput.trim()}!`);
      await loadData();
    } catch {
      setIsAuthenticated(false);
      toast.error("Access Denied: Invalid username or password.");
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // clear local state regardless
    }
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
    setAppointments([]);
    toast.success("Atelier Command Locked.");
  };

  const loadData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load requests.");
      if (err instanceof Error && err.message.includes("Unauthorized")) {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setUpdating(true);
    try {
      await updateStatus({
        data: {
          id,
          status: editStatus,
          notes: editNotes || null,
        },
      });
      toast.success("Appointment request status updated.");
      setEditingId(null);
      await loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update appointment.");
    } finally {
      setUpdating(false);
    }
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesStatus = filterStatus === "all" || app.status === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.service.toLowerCase().includes(q) ||
        (app.phone && app.phone.includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [appointments, filterStatus, searchQuery]);

  // Appointment Stats & Analytics
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const completed = appointments.filter((a) => a.status === "completed").length;
    const declined = appointments.filter((a) => a.status === "declined").length;

    // Estimated revenue based on average service value (₦150k bridal / ₦45k glam)
    const estimatedValue = confirmed * 150000 + completed * 150000 + pending * 100000;
    const conversionRate = total > 0 ? Math.round(((confirmed + completed) / total) * 100) : 0;

    return {
      total,
      pending,
      confirmed,
      completed,
      declined,
      estimatedValue,
      conversionRate,
    };
  }, [appointments]);

  // Generate 1-Click WhatsApp Confirmation Link
  const generateClientWhatsAppUrl = (app: AppointmentRequest) => {
    const phoneClean = (app.phone || studioPhone).replace(/\D/g, "");
    const targetPhone = phoneClean.startsWith("0")
      ? `234${phoneClean.slice(1)}`
      : phoneClean || "2348162292997";

    const msg = `Hello ${app.name}! ✨\n\nThis is Seddypluz Beauty Studio confirming your appointment inquiry:\n\n💄 *Service:* ${app.service}\n📅 *Date:* ${app.appointment_date}\n⏰ *Time:* ${app.preferred_time}\n\nYour session is currently *${app.status.toUpperCase()}*. Please let us know if you have any questions or custom styling preferences. We look forward to creating your royal look!\n\n— *Seddypluz Beauty Atelier*`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Export Appointments to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      toast.error("No appointment records to export.");
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
      "Created At",
    ];

    const rows = appointments.map((a) => [
      `"${a.id}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone || ""}"`,
      `"${a.service}"`,
      `"${a.appointment_date}"`,
      `"${a.preferred_time}"`,
      `"${a.status}"`,
      `"${(a.notes || "").replace(/"/g, '""')}"`,
      `"${a.created_at || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `seddypluz_appointments_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Appointments exported to CSV successfully.");
  };

  // Save Promo Banner Settings
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setBannerSaved(true);
    toast.success("Front-end announcement banner updated!");
    setTimeout(() => setBannerSaved(false), 3000);
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormName("");
    setFormCategory("wigs");
    setFormPrice("₦280,000");
    setFormOriginalPrice("₦350,000");
    setFormNumericPrice(280000);
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
      { color: "#121212", name: "20 Inch", priceFormatted: "₦250,000", numericPrice: 250000 },
      { color: "#1C1C1C", name: "22 Inch", priceFormatted: "₦280,000", numericPrice: 280000 },
      { color: "#2B2B2B", name: "24 Inch", priceFormatted: "₦310,000", numericPrice: 310000 },
    ]);
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice || "");
    setFormNumericPrice(product.numericPrice);
    setFormDesc(product.desc);
    setFormFullDesc(product.fullDesc);
    setFormImg(product.img);
    setFormCustomImg(
      product.img.startsWith("http") || product.img.startsWith("data:") ? product.img : "",
    );
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

  // Save Product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Please enter a product name.");
      return;
    }

    const resolvedImg = formCustomImg.trim() || formImg;
    const cleanPrice = formPrice.trim().startsWith("₦") ? formPrice.trim() : `₦${formPrice.trim()}`;
    const cleanOrigPrice = formOriginalPrice.trim()
      ? formOriginalPrice.trim().startsWith("₦")
        ? formOriginalPrice.trim()
        : `₦${formOriginalPrice.trim()}`
      : undefined;

    const categoryLabel =
      formCategory === "wigs" ? "Luxury Wigs & Extensions" : "Signature Cosmetics & Tools";

    const updatedProduct: Product = {
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
      rating: 5.0,
      reviewCount: 24,
      badge: (formBadge as Product["badge"]) || undefined,
      discountBadge: formDiscountBadge.trim() || undefined,
      isBestseller: formBadge === "Bestseller",
      dots: formDots,
      specs:
        formCategory === "wigs"
          ? [
              { icon: Sparkles, label: "Virgin Hair" },
              { icon: Layers, label: "HD Lace" },
              { icon: ShieldCheck, label: "Tangle Free" },
            ]
          : [
              { icon: Sparkles, label: "Long Wear" },
              { icon: ShieldCheck, label: "Cruelty Free" },
              { icon: Star, label: "Studio Grade" },
            ],
      details: {
        densityOrSize: formDensityOrSize.trim() || "Studio Grade",
        laceOrFinish: formLaceOrFinish.trim() || "HD Finish",
        originOrFormulation: formOrigin.trim() || "100% Authentic Quality",
        longevity: formLongevity.trim() || "Long-lasting with care",
        careTips: formCareTips.trim() || "Follow standard maintenance instructions.",
      },
    };

    let nextProducts: Product[];
    if (editingProductId) {
      nextProducts = managedProducts.map((p) => (p.id === editingProductId ? updatedProduct : p));
      toast.success(`Updated "${updatedProduct.name}" in boutique catalog.`);
    } else {
      nextProducts = [updatedProduct, ...managedProducts];
      toast.success(`Added "${updatedProduct.name}" to boutique catalog!`);
    }

    setManagedProducts(nextProducts);
    saveStoredBoutiqueProducts(nextProducts);
    setIsProductModalOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = (product: Product) => {
    const nextProducts = managedProducts.filter((p) => p.id !== product.id);
    setManagedProducts(nextProducts);
    setPinnedProductIds((prev) => prev.filter((id) => id !== product.id));
    saveStoredBoutiqueProducts(nextProducts);
    setDeleteConfirmProduct(null);
    toast.info(`Deleted "${product.name}" from inventory.`);
  };

  // Duplicate Product
  const handleDuplicateProduct = (product: Product) => {
    const clonedId = `${product.id}_copy_${Date.now()}`;
    const clonedProduct: Product = {
      ...product,
      id: clonedId,
      name: `${product.name} (Copy)`,
    };
    const nextProducts = [clonedProduct, ...managedProducts];
    setManagedProducts(nextProducts);
    saveStoredBoutiqueProducts(nextProducts);
    toast.success(`Duplicated "${product.name}"!`);
  };

  // Reset to Studio Default Catalog
  const handleResetCatalog = () => {
    setManagedProducts(initialBoutiqueProducts);
    resetStoredBoutiqueProducts();
    setPinnedProductIds(["hair_straight", "hair_wave", "lipstick_plum"]);
    toast.info("Reset inventory to 7 studio defaults.");
  };

  // Filtered Boutique Products
  const filteredInventoryProducts = useMemo(() => {
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
  }, [managedProducts, inventoryCategoryFilter, inventorySearchQuery, pinnedProductIds]);

  // Toggle Homepage Pinned Product
  const togglePinProduct = (productId: string) => {
    setPinnedProductIds((prev) => {
      if (prev.includes(productId)) {
        if (prev.length <= 1) {
          toast.error("At least 1 product must remain pinned on the homepage.");
          return prev;
        }
        toast.info("Product unpinned from homepage.");
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) {
          toast.warning("Maximum 4 products recommended for homepage preview balance.");
        } else {
          toast.success("Product pinned to homepage featured showcase!");
        }
        return [...prev, productId];
      }
    });
  };

  // Update Lookbook Slide Details
  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    const newSlides = [...lookbookSlides];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;

    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    // re-assign indices
    const updated = newSlides.map((s, i) => ({
      ...s,
      num: String(i + 1).padStart(2, "0"),
    }));

    setLookbookSlides(updated);
    toast.success("Lookbook carousel order updated.");
  };

  // ==========================================
  // 1. UNLOCK / LOGIN SCREEN (Unauthenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#140C12] text-[#FAF9F5] px-6 overflow-hidden select-none">
        {/* Ambient Luxury Dark Backdrop Glows */}
        <div className="absolute top-1/4 -left-40 h-[600px] w-[600px] rounded-full bg-mauve/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-amber-400/10 blur-[140px] pointer-events-none" />

        <div className="relative w-full max-w-md rounded-[2.5rem] border border-white/15 bg-white/5 p-8 md:p-10 shadow-2xl backdrop-blur-2xl z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-lg">
              <Crown className="h-7 w-7" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300 mb-2 border border-white/15">
              <Sparkles className="h-3 w-3" />
              <span>Seddypluz Atelier HQ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white tracking-tight">
              Command Suite
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70">
              Enter your studio authorization passcode to manage bridal appointments, inventory, and
              front-end displays.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {/* Username Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 pl-1">
                <User className="h-3.5 w-3.5" />
                <span>Username / Administrator ID</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. admin or seddypluz"
                  className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-300 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 pl-1">
                <Lock className="h-3.5 w-3.5" />
                <span>Security Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter studio password"
                  className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 pl-4 pr-11 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-300 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-white/50 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authChecking}
              className="mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-plum text-xs uppercase tracking-[0.24em] font-bold shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {authChecking ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>Authorize &amp; Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between text-xs text-white/60">
            <Link
              to="/"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Studio Homepage</span>
            </Link>
            <Link
              to="/shop"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <span>Boutique Catalog</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN ATELIER COMMAND CENTER (Authenticated)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#120B10] text-[#FAF9F5] selection:bg-amber-400 selection:text-plum pb-24 md:pb-12">
      {/* Top Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#170E15]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-8 py-3.5">
          {/* Brand & Suite Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-xs">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  Seddypluz
                </span>
                <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                  Command HQ
                </span>
              </div>
              <p className="text-[10px] text-white/50 tracking-wide font-sans">
                Atelier Suite · {studioLocation}
              </p>
            </div>
          </div>

          {/* Quick Action Hub & Avatar Widget */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Refresh Appointments Button */}
            <button
              onClick={() => loadData(true)}
              disabled={refreshing || loading}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Refresh live data"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-amber-300" : ""}`} />
            </button>

            {/* Live Front-End Preview Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
              title="Open customer-facing website"
            >
              <Globe className="h-3.5 w-3.5 text-amber-300" />
              <span>Live Site</span>
              <ArrowUpRight className="h-3 w-3 text-white/40" />
            </a>

            {/* ==================================================== */}
            {/* AVATAR WIDGET WITH PROFILE DROPDOWN */}
            {/* ==================================================== */}
            <div id="avatar-widget-container" className="relative">
              <button
                type="button"
                onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                aria-expanded={isAvatarMenuOpen}
                aria-haspopup="true"
                className={`group flex items-center gap-2.5 rounded-2xl border p-1.5 pr-3 transition-all cursor-pointer select-none ${
                  isAvatarMenuOpen
                    ? "border-amber-400 bg-white/15 shadow-lg shadow-amber-400/10 ring-2 ring-amber-400/20"
                    : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {/* Circular Gradient Avatar Badge with Online Dot */}
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 text-plum font-bold text-xs tracking-wider shadow-md shadow-amber-400/20 ring-1 ring-white/20 shrink-0">
                  <span>{userInitials}</span>
                  {/* Glowing Pulse Online Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1 ring-[#170E15]" />
                  </span>
                </div>

                {/* User Info Label */}
                <div className="hidden md:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate max-w-[120px]">
                      {currentAdminUser}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-300/80">
                    {adminRole}
                  </span>
                </div>

                {/* Dropdown Chevron */}
                <ChevronDown
                  className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${
                    isAvatarMenuOpen ? "rotate-180 text-amber-300" : ""
                  }`}
                />
              </button>

              {/* Glassmorphic Dropdown Menu Popover */}
              {isAvatarMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-3xl border border-white/15 bg-[#170E15]/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  {/* User Profile Card */}
                  <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10 mb-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 text-plum font-bold text-sm shadow-md ring-2 ring-white/15 shrink-0">
                        <span>{userInitials}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-white truncate">
                            {currentAdminUser}
                          </span>
                          <Crown className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                        </div>
                        <span className="text-[11px] text-white/60 truncate block font-sans">
                          {adminEmail}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active Session</span>
                      </span>
                      <span className="text-white/40 uppercase tracking-wider font-semibold">
                        TLS 256-Bit
                      </span>
                    </div>
                  </div>

                  {/* Settings Modal Shortcut */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      setIsSettingsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-amber-300 group-hover:bg-amber-400/20 group-hover:text-amber-200">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">Studio &amp; Suite Settings</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" />
                  </button>

                  {/* Quick Modules Navigation */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("appointments");
                      setIsAvatarMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5 text-lavender-deep" />
                    <span>Appointments CRM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("boutique");
                      setIsAvatarMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />
                    <span>Wigs &amp; Boutique Catalog</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("concierge");
                      setIsAvatarMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <Sliders className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Studio Contacts &amp; Hotline</span>
                  </button>

                  <div className="my-1 border-t border-white/10" />

                  {/* View Live Website */}
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-3.5 w-3.5 text-emerald-400" />
                      <span>View Live Website</span>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-white/40" />
                  </a>

                  {/* Lock / Sign Out Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Lock Command Suite</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Module Switcher Tabs Strip */}
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 border-t border-white/5">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
            {[
              {
                id: "appointments",
                label: "Appointments CRM",
                icon: Calendar,
                badge: stats.pending > 0 ? stats.pending : undefined,
              },
              { id: "promos", label: "Promo & Banner", icon: Megaphone },
              {
                id: "boutique",
                label: "Wigs & Inventory",
                icon: ShoppingBag,
                badge: `${managedProducts.length}`,
              },
              { id: "lookbook", label: "Lookbook Curator", icon: ImageIcon },
              { id: "concierge", label: "Studio Contacts", icon: Sliders },
              { id: "analytics", label: "Performance & Stats", icon: BarChart3 },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-amber-400 text-plum shadow-md shadow-amber-400/20 font-extrabold"
                      : "bg-transparent text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        isActive ? "bg-plum text-amber-300" : "bg-white/10 text-amber-300"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Command Workspace */}
      <main className="mx-auto max-w-[1600px] px-4 sm:px-8 py-8">
        {/* ==================================================== */}
        {/* MODULE 1: APPOINTMENTS & CALENDAR CRM */}
        {/* ==================================================== */}
        {activeTab === "appointments" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top KPI Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md">
                <span className="text-[11px] uppercase tracking-wider font-bold text-white/50 block">
                  Total Inquiries
                </span>
                <span className="font-display text-3xl sm:text-4xl text-white font-bold mt-1 block">
                  {stats.total}
                </span>
                <span className="text-[10px] text-amber-300/80 mt-1 block">
                  All registered brides
                </span>
              </div>

              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 sm:p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300">
                    Pending Review
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                </div>
                <span className="font-display text-3xl sm:text-4xl text-amber-300 font-bold mt-1 block">
                  {stats.pending}
                </span>
                <span className="text-[10px] text-amber-200/80 mt-1 block">Requires action</span>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5 backdrop-blur-md">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 block">
                  Confirmed Bookings
                </span>
                <span className="font-display text-3xl sm:text-4xl text-emerald-400 font-bold mt-1 block">
                  {stats.confirmed}
                </span>
                <span className="text-[10px] text-emerald-300/80 mt-1 block">
                  Locked on studio calendar
                </span>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 sm:p-5 backdrop-blur-md">
                <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-300 block">
                  Completed Artistry
                </span>
                <span className="font-display text-3xl sm:text-4xl text-indigo-300 font-bold mt-1 block">
                  {stats.completed}
                </span>
                <span className="text-[10px] text-indigo-200/80 mt-1 block">
                  Delivered sessions
                </span>
              </div>

              <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md">
                <span className="text-[11px] uppercase tracking-wider font-bold text-white/50 block">
                  Pipeline Value (Est.)
                </span>
                <span className="font-display text-2xl sm:text-3xl text-amber-300 font-bold mt-1 block truncate">
                  ₦{stats.estimatedValue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  {stats.conversionRate}% Conversion Rate
                </span>
              </div>
            </div>

            {/* Filter, Search & Export Toolbar */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client name, email, phone, or service..."
                    className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/40 focus:border-amber-300 focus:bg-white/10 focus:outline-none shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Right controls: View mode + Export CSV */}
                <div className="flex items-center gap-2.5 self-end lg:self-auto">
                  <div className="flex items-center rounded-xl border border-white/15 bg-white/5 p-1">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        viewMode === "list"
                          ? "bg-amber-400 text-plum shadow-xs"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode("kanban")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        viewMode === "kanban"
                          ? "bg-amber-400 text-plum shadow-xs"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Pipeline
                    </button>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                    title="Export to CSV"
                  >
                    <Download className="h-3.5 w-3.5 text-amber-300" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="h-3 w-3" /> Filter:
                </span>
                {[
                  { id: "all", label: "All Inquiries", count: stats.total },
                  { id: "pending", label: "Pending", count: stats.pending },
                  { id: "confirmed", label: "Confirmed", count: stats.confirmed },
                  { id: "completed", label: "Completed", count: stats.completed },
                  { id: "declined", label: "Declined", count: stats.declined },
                ].map((st) => {
                  const isActive = filterStatus === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setFilterStatus(st.id)}
                      className={`flex items-center gap-1.5 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-plum shadow-sm"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span>{st.label}</span>
                      <span
                        className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold ${
                          isActive ? "bg-plum text-amber-300" : "bg-white/10 text-white/60"
                        }`}
                      >
                        {st.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Appointments Display */}
            {loading ? (
              <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-white/50">
                <RefreshCw className="h-8 w-8 animate-spin text-amber-300" />
                <p className="text-xs uppercase tracking-widest font-semibold">
                  Loading Client Records...
                </p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="flex h-72 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <Calendar className="h-10 w-10 text-white/20 mb-2" />
                <h3 className="font-display text-xl text-white">No Appointment Requests Found</h3>
                <p className="text-xs text-white/50 max-w-sm">
                  {searchQuery
                    ? "No clients match your search criteria. Try a different keyword or reset filters."
                    : "New bridal and studio inquiries submitted through the website booking form will appear here in real-time."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    className="mt-4 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300 hover:bg-white/20 cursor-pointer"
                  >
                    Reset Search
                  </button>
                )}
              </div>
            ) : viewMode === "list" ? (
              /* Table / Card List View */
              <div className="space-y-3">
                {filteredAppointments.map((app) => {
                  const isEditing = editingId === app.id;
                  const statusColors = {
                    pending: "bg-amber-400/20 text-amber-300 border-amber-400/40",
                    confirmed: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
                    completed: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
                    declined: "bg-rose-500/20 text-rose-300 border-rose-400/40",
                  };

                  return (
                    <div
                      key={app.id}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-md transition-all hover:border-amber-400/30 hover:bg-white/[0.07]"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left: Client Name & Service */}
                        <div className="flex items-start gap-3.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300 font-display text-lg font-bold border border-amber-400/30">
                            {app.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-display text-lg sm:text-xl font-semibold text-white">
                                {app.name}
                              </h4>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                                  statusColors[app.status]
                                }`}
                              >
                                {app.status}
                              </span>
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                              <span className="font-semibold text-amber-300 flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                {app.service}
                              </span>
                              <span className="flex items-center gap-1 text-white/60">
                                <Calendar className="h-3 w-3 text-white/40" />
                                {app.appointment_date}
                              </span>
                              <span className="flex items-center gap-1 text-white/60">
                                <Clock className="h-3 w-3 text-white/40" />
                                {app.preferred_time}
                              </span>
                            </div>

                            {/* Contact Details */}
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/60">
                              <a
                                href={`mailto:${app.email}`}
                                className="flex items-center gap-1 hover:text-amber-300 transition-colors"
                              >
                                <Mail className="h-3 w-3 text-white/40" />
                                <span>{app.email}</span>
                              </a>
                              {app.phone && (
                                <a
                                  href={`tel:${app.phone}`}
                                  className="flex items-center gap-1 hover:text-amber-300 transition-colors"
                                >
                                  <Phone className="h-3 w-3 text-white/40" />
                                  <span>{app.phone}</span>
                                </a>
                              )}
                            </div>

                            {/* Client Notes if any */}
                            {app.notes && (
                              <p className="mt-2 rounded-lg bg-black/30 p-2.5 text-xs italic text-white/80 border border-white/5">
                                "{app.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions (Status Switcher & WhatsApp Message) */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-end lg:self-center border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0 w-full lg:w-auto justify-end">
                          {/* 1-Click WhatsApp Direct Chat */}
                          <a
                            href={generateClientWhatsAppUrl(app)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
                            title="Message client on WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5 fill-current" />
                            <span>WhatsApp Client</span>
                          </a>

                          {/* Edit Status Button */}
                          <button
                            onClick={() => {
                              setEditingId(isEditing ? null : app.id);
                              setEditStatus(app.status);
                              setEditNotes(app.notes || "");
                            }}
                            className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                          >
                            {isEditing ? "Close Editor" : "Change Status"}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Inline Status Editor */}
                      {isEditing && (
                        <div className="mt-4 rounded-xl border border-amber-400/30 bg-black/40 p-4 animate-in fade-in duration-200">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                            Update Appointment Status &amp; Studio Notes
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                                Set Status:
                              </label>
                              <select
                                value={editStatus}
                                onChange={(e) =>
                                  setEditStatus(
                                    e.target.value as
                                      "pending" | "confirmed" | "declined" | "completed",
                                  )
                                }
                                className="w-full rounded-lg border border-white/20 bg-[#1A1017] p-2 text-xs text-white outline-none focus:border-amber-300 cursor-pointer"
                              >
                                <option value="pending">Pending Review</option>
                                <option value="confirmed">Confirmed &amp; Scheduled</option>
                                <option value="completed">Completed Artistry</option>
                                <option value="declined">Declined</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                                Internal Studio Note:
                              </label>
                              <input
                                type="text"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="e.g. Paid 50% deposit, requires 2 bridesmaids gele..."
                                className="w-full rounded-lg border border-white/20 bg-[#1A1017] p-2 text-xs text-white outline-none focus:border-amber-300"
                              />
                            </div>
                          </div>

                          <div className="mt-3 flex justify-end gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded-lg px-3 py-1.5 text-xs text-white/60 hover:text-white cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdate(app.id)}
                              disabled={updating}
                              className="flex items-center gap-1.5 rounded-lg bg-amber-400 text-plum px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-all cursor-pointer disabled:opacity-50"
                            >
                              {updating ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                <Save className="h-3 w-3" />
                              )}
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Kanban Pipeline View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(["pending", "confirmed", "completed", "declined"] as const).map((colStatus) => {
                  const colItems = appointments.filter((a) => a.status === colStatus);
                  const titles = {
                    pending: "Pending Review",
                    confirmed: "Confirmed Sessions",
                    completed: "Completed",
                    declined: "Declined",
                  };
                  const colBg = {
                    pending: "border-amber-400/30 bg-amber-400/5",
                    confirmed: "border-emerald-500/30 bg-emerald-500/5",
                    completed: "border-indigo-500/30 bg-indigo-500/5",
                    declined: "border-rose-500/30 bg-rose-500/5",
                  };

                  return (
                    <div
                      key={colStatus}
                      className={`rounded-2xl border ${colBg[colStatus]} p-4 flex flex-col justify-between min-h-[400px]`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            {titles[colStatus]}
                          </span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            {colItems.length}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {colItems.length === 0 ? (
                            <p className="text-[11px] text-white/40 italic text-center py-6">
                              No requests in this stage
                            </p>
                          ) : (
                            colItems.map((app) => (
                              <div
                                key={app.id}
                                className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs space-y-1.5 hover:border-amber-400/30 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white truncate max-w-[140px]">
                                    {app.name}
                                  </span>
                                  <span className="text-[10px] text-amber-300 font-semibold">
                                    {app.appointment_date}
                                  </span>
                                </div>
                                <p className="text-[11px] text-white/70 truncate">{app.service}</p>
                                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                                  <span className="text-[10px] text-white/50">
                                    {app.preferred_time}
                                  </span>
                                  <a
                                    href={generateClientWhatsAppUrl(app)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[10px]"
                                  >
                                    <MessageCircle className="h-3 w-3" />
                                    <span>Chat</span>
                                  </a>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 2: PROMO & ANNOUNCEMENT BANNER MANAGER */}
        {/* ==================================================== */}
        {activeTab === "promos" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Live Visual Preview Container */}
            <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-[#1C101A] to-[#120B10] p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> Live Front-End Banner Simulation
                </span>
                <span className="text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 font-bold uppercase">
                  {announcementActive ? "Active on Website" : "Hidden"}
                </span>
              </div>

              {/* Simulated Header Announcement Bar */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-plum shadow-inner text-[#FAF9F5] p-3 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{announcementText}</span>
                  <span className="text-white/40">·</span>
                  <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                    Use Code: {voucherCode} ({discountPercent} OFF)
                  </span>
                </div>
              </div>
            </div>

            {/* Announcement Configuration Form */}
            <form
              onSubmit={handleSaveBanner}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-2xl text-white">
                    Announcement &amp; Voucher Editor
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Modify the promotional marquee displayed across the top of both the homepage and
                    shop page.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                    Status:
                  </label>
                  <button
                    type="button"
                    onClick={() => setAnnouncementActive(!announcementActive)}
                    className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      announcementActive
                        ? "bg-emerald-500 text-white shadow-md"
                        : "bg-white/10 text-white/50 border border-white/10"
                    }`}
                  >
                    {announcementActive ? "ON (Enabled)" : "OFF (Disabled)"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2">
                    Announcement Headline Text:
                  </label>
                  <input
                    type="text"
                    required
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-300 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2">
                      Coupon Voucher Code:
                    </label>
                    <input
                      type="text"
                      required
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-amber-300 font-bold uppercase tracking-widest focus:border-amber-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2">
                      Discount Percentage Label:
                    </label>
                    <input
                      type="text"
                      required
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setAnnouncementText("Enjoy 20% OFF your first wig order + ALL beauty services");
                    setVoucherCode("SEDDY20");
                    setDiscountPercent("20%");
                    toast.info("Reset to default announcement template.");
                  }}
                  className="text-xs text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Restore Studio Default</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-amber-400 text-plum px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-amber-300 active:scale-95 transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{bannerSaved ? "Saved Successfully!" : "Save Announcement"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 3: BOUTIQUE & WIGS INVENTORY CONTROLLER */}
        {/* ==================================================== */}
        {activeTab === "boutique" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header & Main Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white flex items-center gap-2.5">
                  <Package className="h-7 w-7 text-amber-300" />
                  <span>Boutique Catalog &amp; Inventory Controller</span>
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Add, edit, duplicate, and delete luxury wigs, hair bundles, and cosmetic items
                  displayed on the `/shop` and homepage.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleResetCatalog}
                  className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Reset to default 7 products"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center gap-2 rounded-xl bg-amber-400/10 border border-amber-400/30 px-3.5 py-2 text-xs font-bold text-amber-300">
                  <Crown className="h-4 w-4" />
                  <span>{pinnedProductIds.length} Pinned on Home</span>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-plum px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>+ Add New Product</span>
                </button>
              </div>
            </div>

            {/* Search & Category Filter Strip */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                {(
                  [
                    { id: "all", label: `All Items (${managedProducts.length})` },
                    {
                      id: "wigs",
                      label: `Luxury Wigs (${managedProducts.filter((p) => p.category === "wigs").length})`,
                    },
                    {
                      id: "cosmetics",
                      label: `Cosmetics (${managedProducts.filter((p) => p.category === "cosmetics").length})`,
                    },
                    {
                      id: "pinned",
                      label: `Pinned on Home (${pinnedProductIds.length})`,
                    },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setInventoryCategoryFilter(cat.id)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      inventoryCategoryFilter === cat.id
                        ? "bg-amber-400 text-plum font-bold shadow-xs"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Live Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                <input
                  type="text"
                  value={inventorySearchQuery}
                  onChange={(e) => setInventorySearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="h-9 w-full rounded-xl border border-white/15 bg-white/10 pl-9 pr-8 text-xs text-white placeholder:text-white/40 focus:border-amber-300 focus:outline-none"
                />
                {inventorySearchQuery && (
                  <button
                    onClick={() => setInventorySearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Products Inventory Grid */}
            {filteredInventoryProducts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
                <Package className="mx-auto h-12 w-12 text-white/30 mb-3" />
                <h4 className="font-display text-lg text-white">No matching products found</h4>
                <p className="text-xs text-white/60 mt-1 max-w-sm mx-auto">
                  Try adjusting your search query or category filter, or click "+ Add New Product"
                  above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInventoryProducts.map((product) => {
                  const isPinned = pinnedProductIds.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-amber-400/40 hover:bg-white/[0.07] transition-all shadow-lg shadow-black/20"
                    >
                      <div>
                        {/* Top Image + Badges */}
                        <div className="flex items-start gap-3.5">
                          <div className="relative shrink-0">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="h-22 w-22 rounded-xl object-cover bg-[#F7EBE8] border border-white/15"
                            />
                            {product.discountBadge && (
                              <span className="absolute -top-1.5 -left-1.5 rounded-full bg-red-500/90 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                                {product.discountBadge}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 truncate">
                                {product.categoryLabel}
                              </span>
                              {product.badge && (
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold text-white/80 border border-white/15">
                                  {product.badge}
                                </span>
                              )}
                            </div>

                            <h4 className="font-sans font-bold text-base text-white truncate mt-1">
                              {product.name}
                            </h4>

                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-base font-bold text-amber-300">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-white/40 line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Variants count */}
                            {product.dots && product.dots.length > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-[10px] text-white/50">
                                <span>{product.dots.length} lengths/variants:</span>
                                <span className="text-white/80 font-semibold truncate">
                                  {product.dots.map((d) => d.name).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-sans mt-3">
                          {product.desc}
                        </p>
                      </div>

                      {/* Controls Strip */}
                      <div className="pt-3 border-t border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          {/* Pin to Home Toggle */}
                          <button
                            type="button"
                            onClick={() => togglePinProduct(product.id)}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isPinned
                                ? "bg-amber-400 text-plum shadow-sm"
                                : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/15"
                            }`}
                          >
                            <Crown className="h-3 w-3" />
                            <span>{isPinned ? "Pinned" : "Pin Home"}</span>
                          </button>

                          {/* Action Buttons: Edit, Duplicate, Delete, WhatsApp */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-amber-300 hover:bg-amber-400/20 transition-colors cursor-pointer"
                              title="Edit product details"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDuplicateProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-indigo-300 hover:bg-indigo-400/20 transition-colors cursor-pointer"
                              title="Duplicate as new product"
                            >
                              <CopyPlus className="h-3.5 w-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteConfirmProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            <a
                              href={`https://wa.me/${studioPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                `Hello Seddypluz Studio, checking availability for "${product.name}" (${product.price}).`,
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                              title="Test client WhatsApp inquiry"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ==================================================== */}
            {/* ADD / EDIT PRODUCT MODAL */}
            {/* ==================================================== */}
            {isProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
                <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#170E15] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-display text-2xl text-white">
                        {editingProductId ? "Edit Boutique Product" : "Add New Boutique Product"}
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Configure pricing, variants, descriptions, and visual presentation.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsProductModalOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-white/15 hover:text-white cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Product Form */}
                  <form onSubmit={handleSaveProduct} className="space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Product Name / Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Bone Straight 30 Inch Virgin Unit"
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Category *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as "wigs" | "cosmetics")}
                          className="w-full rounded-xl border border-white/15 bg-[#251522] px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        >
                          <option value="wigs">Luxury Wigs &amp; Extensions</option>
                          <option value="cosmetics">Signature Cosmetics &amp; Tools</option>
                        </select>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Selling Price (₦) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formPrice}
                          onChange={(e) => {
                            setFormPrice(e.target.value);
                            const num = parseInt(e.target.value.replace(/\D/g, ""), 10);
                            if (!isNaN(num)) setFormNumericPrice(num);
                          }}
                          placeholder="₦280,000"
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-amber-300 font-bold focus:border-amber-300 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Original / Strikethrough Price
                        </label>
                        <input
                          type="text"
                          value={formOriginalPrice}
                          onChange={(e) => setFormOriginalPrice(e.target.value)}
                          placeholder="₦350,000"
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white/70 focus:border-amber-300 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Numeric Value (for sort)
                        </label>
                        <input
                          type="number"
                          required
                          value={formNumericPrice}
                          onChange={(e) => setFormNumericPrice(Number(e.target.value))}
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Badges & Promo Tag */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Featured Badge
                        </label>
                        <select
                          value={formBadge}
                          onChange={(e) => setFormBadge(e.target.value as Product["badge"] | "")}
                          className="w-full rounded-xl border border-white/15 bg-[#251522] px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        >
                          <option value="">None</option>
                          <option value="Bestseller">Bestseller</option>
                          <option value="New Drop">New Drop</option>
                          <option value="HD Melt">HD Melt</option>
                          <option value="Limited Batch">Limited Batch</option>
                          <option value="Studio Favorite">Studio Favorite</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Discount Tag Badge
                        </label>
                        <input
                          type="text"
                          value={formDiscountBadge}
                          onChange={(e) => setFormDiscountBadge(e.target.value)}
                          placeholder="e.g. 20% OFF or 15% OFF"
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Image Selection */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block">
                        Select Product Visual Preset:
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                        {PRODUCT_IMAGE_PRESETS.map((preset) => {
                          const isSelected = formImg === preset.value && !formCustomImg;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setFormImg(preset.value);
                                setFormCustomImg("");
                              }}
                              className={`relative rounded-xl border overflow-hidden p-1 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-amber-400 ring-2 ring-amber-400/30 bg-amber-400/10"
                                  : "border-white/15 hover:border-white/40 bg-white/5"
                              }`}
                            >
                              <img
                                src={preset.value}
                                alt={preset.label}
                                className="h-14 w-full object-cover rounded-lg"
                              />
                              <span className="block text-[9px] text-white/70 truncate mt-1 text-center font-medium">
                                {preset.label.split(" ")[0]}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2">
                        <label className="text-[10px] text-white/60 block mb-1">
                          Or enter custom image URL:
                        </label>
                        <input
                          type="url"
                          value={formCustomImg}
                          onChange={(e) => setFormCustomImg(e.target.value)}
                          placeholder="https://example.com/custom-wig-photo.jpg"
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Short Card Description *
                        </label>
                        <input
                          type="text"
                          required
                          value={formDesc}
                          onChange={(e) => setFormDesc(e.target.value)}
                          placeholder="Summary shown on product cards..."
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1.5">
                          Full In-Depth Description
                        </label>
                        <textarea
                          rows={3}
                          value={formFullDesc}
                          onChange={(e) => setFormFullDesc(e.target.value)}
                          placeholder="Detailed product craft, single-donor specs, and hair texture notes shown in quick view..."
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Specifications Details */}
                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300">
                        Detailed Specifications:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-white/60 block mb-1">Density / Weight:</label>
                          <input
                            type="text"
                            value={formDensityOrSize}
                            onChange={(e) => setFormDensityOrSize(e.target.value)}
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white focus:border-amber-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-white/60 block mb-1">Lace / Finish:</label>
                          <input
                            type="text"
                            value={formLaceOrFinish}
                            onChange={(e) => setFormLaceOrFinish(e.target.value)}
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white focus:border-amber-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-white/60 block mb-1">Origin / Formulation:</label>
                          <input
                            type="text"
                            value={formOrigin}
                            onChange={(e) => setFormOrigin(e.target.value)}
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white focus:border-amber-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-white/60 block mb-1">Longevity:</label>
                          <input
                            type="text"
                            value={formLongevity}
                            onChange={(e) => setFormLongevity(e.target.value)}
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white focus:border-amber-300 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/60 block mb-1 text-xs">
                          Studio Care Tips:
                        </label>
                        <input
                          type="text"
                          value={formCareTips}
                          onChange={(e) => setFormCareTips(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white focus:border-amber-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Variant Lengths / Shades */}
                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300">
                          Length / Color Variants ({formDots.length}):
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setFormDots([
                              ...formDots,
                              {
                                color: "#1C1C1C",
                                name: `Variant ${formDots.length + 1}`,
                                priceFormatted: formPrice,
                                numericPrice: formNumericPrice,
                              },
                            ]);
                          }}
                          className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Variant</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formDots.map((dot, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/10"
                          >
                            <input
                              type="text"
                              value={dot.name}
                              onChange={(e) => {
                                const next = [...formDots];
                                next[index].name = e.target.value;
                                setFormDots(next);
                              }}
                              placeholder="e.g. 26 Inch"
                              className="flex-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            />
                            <input
                              type="text"
                              value={dot.priceFormatted || ""}
                              onChange={(e) => {
                                const next = [...formDots];
                                next[index].priceFormatted = e.target.value;
                                const num = parseInt(e.target.value.replace(/\D/g, ""), 10);
                                if (!isNaN(num)) next[index].numericPrice = num;
                                setFormDots(next);
                              }}
                              placeholder="₦340,000"
                              className="w-28 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs text-amber-300 font-bold focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (formDots.length <= 1) {
                                  toast.error("At least 1 variant is required.");
                                  return;
                                }
                                setFormDots(formDots.filter((_, i) => i !== index));
                              }}
                              className="text-red-400 hover:text-red-300 p-1.5 cursor-pointer"
                              title="Remove variant"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsProductModalOpen(false)}
                        className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-amber-400 text-plum px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-400/20 hover:bg-amber-300 active:scale-95 transition-all cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save &amp; Publish Product</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* DELETE CONFIRMATION MODAL */}
            {/* ==================================================== */}
            {deleteConfirmProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
                <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-[#170E15] p-6 shadow-2xl text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30">
                    <Trash2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-white">Delete Product Item?</h4>
                    <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                      Are you sure you want to remove{" "}
                      <span className="font-bold text-amber-300">
                        "{deleteConfirmProduct.name}"
                      </span>{" "}
                      from the boutique inventory? This item will no longer appear on the `/shop` or
                      homepage.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmProduct(null)}
                      className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(deleteConfirmProduct)}
                      className="rounded-xl bg-red-500 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-red-600 active:scale-95 transition-all cursor-pointer shadow-lg shadow-red-500/20"
                    >
                      Yes, Delete Product
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 4: HERO LOOKBOOK ACCORDION CURATOR */}
        {/* ==================================================== */}
        {activeTab === "lookbook" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">
                Hero Accordion Carousel Curator
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Reorder and curate the 4 signature bridal looks that expand and contract on the
                homepage hero section.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lookbookSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between space-y-3 backdrop-blur-md hover:border-amber-400/40 transition-all"
                >
                  <div className="relative h-56 rounded-xl overflow-hidden border border-white/10">
                    <img src={slide.img} alt={slide.title} className="h-full w-full object-cover" />
                    <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
                      <span>{slide.vol}</span>
                    </div>
                    <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-plum font-display font-bold text-xs">
                      {slide.num}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9.5px] uppercase tracking-wider font-bold text-amber-300 block">
                      {slide.tag}
                    </span>
                    <h4 className="font-display text-lg text-white font-semibold italic mt-0.5">
                      {slide.title}
                    </h4>
                    <p className="text-xs text-white/60 mt-0.5">{slide.technique}</p>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-[10px] uppercase font-bold text-white/40">
                      Position: {index + 1} of {lookbookSlides.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveSlide(index, "up")}
                        disabled={index === 0}
                        aria-label="Move lookbook slide left"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveSlide(index, "down")}
                        disabled={index === lookbookSlides.length - 1}
                        aria-label="Move lookbook slide right"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 5: STUDIO CONCIERGE & CONTACT SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "concierge" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div>
                <h3 className="font-display text-2xl text-white">
                  Studio Concierge &amp; Contact Synced Settings
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  These hotline numbers and addresses are synchronized across the landing page
                  footer, booking confirmation screen, and shop concierge.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" /> Studio Hotline &amp; WhatsApp Number:
                  </label>
                  <input
                    type="text"
                    value={studioPhone}
                    onChange={(e) => setStudioPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
                  />
                  <span className="text-[10px] text-white/40 mt-1 block">
                    Rendered as clickable link in footer directly under "{studioLocation}".
                  </span>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> Studio City / Location:
                  </label>
                  <input
                    type="text"
                    value={studioLocation}
                    onChange={(e) => setStudioLocation(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Studio Operating Hours:
                  </label>
                  <input
                    type="text"
                    value={studioHours}
                    onChange={(e) => setStudioHours(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2">
                      Instagram Handle:
                    </label>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-amber-300 block mb-2">
                      TikTok Handle:
                    </label>
                    <input
                      type="text"
                      value={tiktokHandle}
                      onChange={(e) => setTiktokHandle(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => toast.success("Studio concierge details saved and synchronized.")}
                  className="flex items-center gap-2 rounded-xl bg-amber-400 text-plum px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-amber-300 active:scale-95 transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>Update Studio Contact Info</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 6: STUDIO REVENUE & DEMAND ANALYTICS */}
        {/* ==================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">
                Studio Performance &amp; Demand Insights
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Real-time booking distribution, pipeline valuation, and popular bridal artistry
                breakdown.
              </p>
            </div>

            {/* Service Popularity Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-4">
                <h4 className="font-display text-xl text-white">Most Requested Services</h4>
                <div className="space-y-3">
                  {[
                    { name: "Bridal Makeup", pct: 45, count: 18, color: "bg-amber-400" },
                    { name: "Gele Styling", pct: 25, count: 10, color: "bg-lavender-deep" },
                    { name: "Professional Glam", pct: 15, count: 6, color: "bg-emerald-400" },
                    { name: "Beauty Masterclasses", pct: 15, count: 6, color: "bg-indigo-400" },
                  ].map((srv) => (
                    <div key={srv.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white/80">{srv.name}</span>
                        <span className="text-amber-300 font-bold">
                          {srv.pct}% ({srv.count} sessions)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${srv.color}`}
                          style={{ width: `${srv.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion & Reliability Cards */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-display text-xl text-white">Client Conversion Efficiency</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Based on ratio of registered inquiries converted into confirmed studio bookings.
                  </p>
                </div>

                <div className="flex items-center justify-around py-4 border-y border-white/10">
                  <div className="text-center">
                    <span className="font-display text-4xl font-bold text-emerald-400">
                      {stats.conversionRate}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/50 block mt-1">
                      Inquiry Conversion
                    </span>
                  </div>

                  <div className="h-12 w-px bg-white/10" />

                  <div className="text-center">
                    <span className="font-display text-4xl font-bold text-amber-300">
                      ₦{Math.round(stats.estimatedValue / (stats.total || 1)).toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/50 block mt-1">
                      Avg Inquiry Value
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Fast WhatsApp response increases booking rate by 38%</span>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-amber-300 hover:text-white flex items-center gap-1 font-bold uppercase tracking-wider text-[11px]"
                  >
                    <span>View CRM</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ==================================================== */}
        {/* SETTINGS & PREFERENCES MODAL */}
        {/* ==================================================== */}
        {isSettingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#170E15] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-white">
                      Studio &amp; Suite Settings
                    </h3>
                    <p className="text-xs text-white/60">
                      Manage administrator profile, workspace preferences, and security options.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-white/15 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Settings Form */}
              <div className="space-y-5">
                {/* Profile Section */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>Administrator Profile</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] text-white/60 block mb-1">Display Name:</label>
                      <input
                        type="text"
                        value={currentAdminUser}
                        onChange={(e) => setCurrentAdminUser(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white focus:border-amber-300 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-white/60 block mb-1">
                        Role Designation:
                      </label>
                      <input
                        type="text"
                        value={adminRole}
                        onChange={(e) => setAdminRole(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white focus:border-amber-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Contact Email:</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white focus:border-amber-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Workspace Preferences */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Workspace Preferences</span>
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/10">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          Sound Cues &amp; Audio Notifications
                        </span>
                        <span className="text-[10px] text-white/50">
                          Play soft chime when new bridal inquiry is registered.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSoundNotifications(!soundNotifications)}
                        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          soundNotifications ? "bg-amber-400" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-plum shadow-md transition-transform ${
                            soundNotifications ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/10">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          Ambient Luxury Glow
                        </span>
                        <span className="text-[10px] text-white/50">
                          Show animated plum and gold background gradients.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAmbientGlow(!ambientGlow)}
                        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          ambientGlow ? "bg-amber-400" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-plum shadow-md transition-transform ${
                            ambientGlow ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/10">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          Auto-Refresh Interval
                        </span>
                        <span className="text-[10px] text-white/50">
                          Automatically poll for new customer appointments.
                        </span>
                      </div>
                      <select
                        value={autoRefreshInterval}
                        onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
                        className="rounded-lg border border-white/15 bg-[#251522] px-2.5 py-1.5 text-xs text-white focus:border-amber-300 focus:outline-none"
                      >
                        <option value={0}>Manual Only</option>
                        <option value={30}>Every 30 Seconds</option>
                        <option value={60}>Every 1 Minute</option>
                        <option value={300}>Every 5 Minutes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security & Access Section */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Security &amp; Active Session</span>
                  </h4>

                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-white/70">
                      <span>Session Duration:</span>
                      <span className="font-semibold text-white">8 Hours (HTTP-Only Cookie)</span>
                    </div>
                    <div className="flex items-center justify-between text-white/70">
                      <span>Brute Force Lockout:</span>
                      <span className="font-semibold text-emerald-400">
                        Active (5 attempts / 30m lock)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-white/70">
                      <span>Authorized Super-Admins:</span>
                      <span className="font-semibold text-amber-300">ajuhlouis, seddypluz</span>
                    </div>
                  </div>
                </div>

                {/* Data Backup Section */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const backupData = {
                        exportedAt: new Date().toISOString(),
                        appointments,
                        products: managedProducts,
                        pinnedProductIds,
                        contacts: {
                          phone: studioPhone,
                          location: studioLocation,
                          hours: studioHours,
                        },
                      };
                      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
                        type: "application/json",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `seddypluz_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      toast.success("Studio backup JSON exported successfully.");
                    }}
                    className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-semibold cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export Full Studio Backup (JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSettingsModalOpen(false);
                      toast.success("Studio & suite preferences updated.");
                    }}
                    className="flex items-center gap-2 rounded-xl bg-amber-400 text-plum px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-amber-300 active:scale-95 transition-all cursor-pointer shadow-md shadow-amber-400/20"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
