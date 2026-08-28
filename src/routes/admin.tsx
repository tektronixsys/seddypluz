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
  Zap,
  Radio,
  Activity,
  Percent,
  HelpCircle,
  Shield,
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
  getStoredAnnouncements,
  saveStoredAnnouncements,
  resetStoredAnnouncements,
  type AnnouncementItem,
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
  category: string;
  title: string;
  subtitle: string;
  technique: string;
  img: string;
  vol: string;
  active: boolean;
}

const INITIAL_LOOKBOOK_SLIDES: LookbookSlideItem[] = [
  {
    id: "slide_1",
    num: "01",
    category: "Traditional Gele",
    title: "Royal Crimson Infinity",
    subtitle: "Aso-Oke & Heritage Velvet",
    technique: "Geometric Pleats · Multi-Tier Fan",
    img: gele1,
    vol: "Vol. IV",
    active: true,
  },
  {
    id: "slide_2",
    num: "02",
    category: "Bridal Soft Glam",
    title: "Timeless Golden Radiance",
    subtitle: "Luminous Skin & Sculpted Brow",
    technique: "HD Airbrush · 24-Hour Melt",
    img: heroBride,
    vol: "Vol. I",
    active: true,
  },
  {
    id: "slide_3",
    num: "03",
    category: "Contemporary Bridal",
    title: "The Sculpted Elegance",
    subtitle: "Ethereal Veil & Natural Glow",
    technique: "Skin-Finish Velvet · Dewy Cheek",
    img: bridalAfter,
    vol: "Vol. II",
    active: true,
  },
  {
    id: "slide_4",
    num: "04",
    category: "Editorial Glamour",
    title: "Smoky Orchid Shimmer",
    subtitle: "High-Fashion Evening Look",
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
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("ajuhlouis");
  const [usernameInput, setUsernameInput] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("seddypluz_admin_saved_user") || "ajuhlouis";
    }
    return "ajuhlouis";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
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

  // Front-End Announcement Manager State (CRUD & Pulse)
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() =>
    getStoredAnnouncements(),
  );
  const [announcementFilter, setAnnouncementFilter] = useState<"all" | "active" | "pulsing">("all");
  const [announcementSearch, setAnnouncementSearch] = useState("");
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [deleteConfirmAnnouncement, setDeleteConfirmAnnouncement] =
    useState<AnnouncementItem | null>(null);

  // Form State for Create / Edit Announcement
  const [annFormTitle, setAnnFormTitle] = useState("");
  const [annFormText, setAnnFormText] = useState("");
  const [annFormVoucher, setAnnFormVoucher] = useState("SEDDY20");
  const [annFormDiscount, setAnnFormDiscount] = useState("20% OFF");
  const [annFormBadge, setAnnFormBadge] = useState("Exclusive Promo");
  const [annFormPulse, setAnnFormPulse] = useState(true);
  const [annFormTheme, setAnnFormTheme] = useState<"plum" | "amber" | "emerald" | "rose" | "dark">(
    "plum",
  );
  const [annFormTargetLink, setAnnFormTargetLink] = useState("/shop");
  const [annFormCtaText, setAnnFormCtaText] = useState("Claim Offer");

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

  // Form State for Add / Edit Product
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

  // Lookbook Curator State
  const [lookbookSlides, setLookbookSlides] =
    useState<LookbookSlideItem[]>(INITIAL_LOOKBOOK_SLIDES);

  // Concierge & Contact Settings State
  const [studioPhone, setStudioPhone] = useState("+234 816 229 2997");
  const [studioLocation, setStudioLocation] = useState("Kaduna Studio Sessions");
  const [studioHours, setStudioHours] = useState("Mon - Sat: 9:00 AM - 7:00 PM");
  const [contactSaved, setContactSaved] = useState(false);

  // 1. Initial Authentication Check on Mount
  useEffect(() => {
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
      } finally {
        setInitialAuthChecked(true);
      }
    }
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Fetch Appointments from Server Action
  async function loadData(showSuccessToast = false) {
    setLoading(true);
    setRefreshing(true);
    try {
      const data = await fetchAppointments({});
      setAppointments(data as AppointmentRequest[]);
      if (showSuccessToast) {
        toast.success("Appointments synchronized with database.");
      }
    } catch (err) {
      console.error("Failed to load appointments:", err);
      toast.error("Failed to synchronize appointments.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // 3. Handle Admin Login Form Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !passwordInput.trim()) {
      toast.error("Please enter both username and password.");
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

      if (res.ok) {
        if (rememberDevice) {
          try {
            localStorage.setItem("seddypluz_admin_saved_user", usernameInput.trim());
          } catch (storageErr) {
            console.debug("LocalStorage unavailable:", storageErr);
          }
        } else {
          try {
            localStorage.removeItem("seddypluz_admin_saved_user");
          } catch (storageErr) {
            console.debug("LocalStorage unavailable:", storageErr);
          }
        }

        setIsAuthenticated(true);
        const user = res.username || "Admin";
        setCurrentAdminUser(user);
        if (user.toLowerCase().includes("ajuh")) {
          setAdminRole("Super Admin");
          setAdminEmail("ajuhlouis@gmail.com");
        } else if (user.toLowerCase().includes("seddy")) {
          setAdminRole("Studio Super Admin");
          setAdminEmail("contact@seddypluz.com");
        } else if (res.role) {
          setAdminRole(res.role);
        }
        toast.success(`Welcome back, ${user}!`);
        loadData();
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (err: unknown) {
      console.error("Login request failed:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please verify username and password.";
      toast.error(errorMessage);
    } finally {
      setAuthChecking(false);
    }
  };

  // 4. Handle Admin Logout
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

  // 5. Handle Status Update
  const handleUpdateStatus = async (
    id: string,
    status: "pending" | "confirmed" | "declined" | "completed",
    notes?: string,
  ) => {
    setUpdating(true);
    try {
      const res = await updateStatus({
        data: { id, status, notes: notes ?? null },
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status, notes: notes || app.notes } : app)),
        );
        toast.success(`Appointment status set to ${status.toUpperCase()}`);
        setEditingId(null);
      }
    } catch (err: unknown) {
      console.error("Status update error:", err);
      const errorMessage = err instanceof Error ? err.message : "Network error updating status.";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  // 6. WhatsApp Direct Message Deep Link Generator
  const generateClientWhatsAppUrl = (app: AppointmentRequest) => {
    const cleanPhone = (app.phone || "").replace(/\D/g, "");
    const greeting = `Hello ${app.name}! This is Seddypluz Studio regarding your ${app.service} appointment requested for ${app.appointment_date} at ${app.preferred_time}.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
  };

  // 7. Summary Performance Stats
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const completed = appointments.filter((a) => a.status === "completed").length;
    const declined = appointments.filter((a) => a.status === "declined").length;

    // Estimated value calculation
    const estimatedValue = confirmed * 150000 + completed * 150000 + pending * 80000;
    const conversionRate = total > 0 ? Math.round(((confirmed + completed) / total) * 100) : 0;

    return { total, pending, confirmed, completed, declined, estimatedValue, conversionRate };
  }, [appointments]);

  // 8. Filtered Appointments List
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesFilter = filterStatus === "all" || app.status === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        (app.phone && app.phone.includes(q)) ||
        app.service.toLowerCase().includes(q) ||
        (app.notes && app.notes.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [appointments, filterStatus, searchQuery]);

  // 9. Export Appointments to CSV
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

  // ==========================================
  // ANNOUNCEMENT CONTROLLER HANDLERS (CRUD & PULSE)
  // ==========================================
  const activeAnnouncement = useMemo(
    () => announcements.find((a) => a.isActive) || null,
    [announcements],
  );

  // Open Create Announcement Modal
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

  // Open Edit Announcement Modal
  const handleOpenEditAnnouncement = (item: AnnouncementItem) => {
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

  // Save Announcement (Create or Update)
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annFormText.trim()) {
      toast.error("Please enter announcement headline text.");
      return;
    }

    const updatedItem: AnnouncementItem = {
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
      isActive: editingAnnouncementId
        ? (announcements.find((a) => a.id === editingAnnouncementId)?.isActive ?? false)
        : announcements.length === 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    let nextAnnouncements: AnnouncementItem[];
    if (editingAnnouncementId) {
      nextAnnouncements = announcements.map((a) =>
        a.id === editingAnnouncementId ? updatedItem : a,
      );
      toast.success(`Updated announcement "${updatedItem.title}".`);
    } else {
      nextAnnouncements = [updatedItem, ...announcements];
      toast.success(`Created new announcement "${updatedItem.title}"!`);
    }

    setAnnouncements(nextAnnouncements);
    saveStoredAnnouncements(nextAnnouncements);
    setIsAnnouncementModalOpen(false);
  };

  // Toggle Pulse Animation on an Announcement
  const handleTogglePulse = (item: AnnouncementItem) => {
    const next = announcements.map((a) =>
      a.id === item.id ? { ...a, pulseAnimation: !a.pulseAnimation } : a,
    );
    setAnnouncements(next);
    saveStoredAnnouncements(next);
    toast.info(
      `Pulse animation ${!item.pulseAnimation ? "enabled (pulsing live)" : "paused"} for "${item.title}".`,
    );
  };

  // Toggle / Set Active Broadcast Announcement
  const handleToggleActive = (item: AnnouncementItem) => {
    const next = announcements.map((a) => {
      if (a.id === item.id) {
        return { ...a, isActive: !a.isActive };
      }
      return { ...a, isActive: false };
    });
    setAnnouncements(next);
    saveStoredAnnouncements(next);
    const willBeActive = !item.isActive;
    toast.success(
      willBeActive
        ? `Broadcast activated: "${item.title}" is now LIVE on storefront!`
        : `Broadcast paused: Announcement banner hidden.`,
    );
  };

  // Duplicate Announcement
  const handleDuplicateAnnouncement = (item: AnnouncementItem) => {
    const cloned: AnnouncementItem = {
      ...item,
      id: `${item.id}_copy_${Date.now()}`,
      title: `${item.title} (Copy)`,
      isActive: false,
    };
    const next = [cloned, ...announcements];
    setAnnouncements(next);
    saveStoredAnnouncements(next);
    toast.success(`Duplicated announcement "${item.title}".`);
  };

  // Delete Announcement
  const handleDeleteAnnouncement = (item: AnnouncementItem) => {
    const next = announcements.filter((a) => a.id !== item.id);
    setAnnouncements(next);
    saveStoredAnnouncements(next);
    setDeleteConfirmAnnouncement(null);
    toast.info(`Deleted announcement "${item.title}".`);
  };

  // Reset to default announcements
  const handleResetAnnouncements = () => {
    const defaults = resetStoredAnnouncements();
    setAnnouncements(defaults);
    toast.info("Reset to 3 studio default announcement templates.");
  };

  // Filtered Announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      if (announcementFilter === "active" && !a.isActive) return false;
      if (announcementFilter === "pulsing" && !a.pulseAnimation) return false;
      if (announcementSearch.trim()) {
        const q = announcementSearch.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.text.toLowerCase().includes(q) ||
          a.voucherCode.toLowerCase().includes(q) ||
          a.badgeLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [announcements, announcementFilter, announcementSearch]);

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

    const updated = newSlides.map((s, i) => ({
      ...s,
      num: String(i + 1).padStart(2, "0"),
    }));

    setLookbookSlides(updated);
    toast.success("Lookbook carousel order updated.");
  };

  // Save Concierge Contact Settings
  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSaved(true);
    toast.success("Studio concierge details updated across platform!");
    setTimeout(() => setContactSaved(false), 3000);
  };

  // ==========================================
  // 1. UNLOCK / LOGIN SCREEN (Unauthenticated)
  // ==========================================
  if (!isAuthenticated) {
    if (!initialAuthChecked) {
      return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#2D1B28] px-6 select-none">
          <div className="text-center space-y-4 animate-in fade-in duration-500">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-plum via-[#5a3a52] to-lavender-deep text-[#FAF9F5] shadow-2xl shadow-plum/20">
              <Crown className="h-10 w-10 animate-pulse text-amber-300" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold tracking-tight text-plum">
                Seddypluz Atelier
              </h2>
              <p className="text-xs text-plum/60 tracking-wider uppercase font-semibold">
                Initializing Secure Command Suite...
              </p>
            </div>
            <RefreshCw className="mx-auto h-5 w-5 animate-spin text-lavender-deep" />
          </div>
        </div>
      );
    }

    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#2D1B28] px-4 sm:px-6 py-12 overflow-hidden select-none">
        {/* Ambient Luxury Soft Blooms & Mesh Orbs */}
        <div className="absolute top-1/6 -left-36 h-[550px] w-[550px] rounded-full bg-mauve/20 blur-[130px] pointer-events-none animate-pulse duration-1000" />
        <div className="absolute bottom-1/6 -right-36 h-[550px] w-[550px] rounded-full bg-blush-soft blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-plum/5 blur-[160px] pointer-events-none" />

        {/* Main Authentication Card */}
        <div className="relative w-full max-w-xl rounded-[2.5rem] border border-plum/15 bg-white/95 p-6 sm:p-10 shadow-2xl shadow-plum/15 backdrop-blur-2xl z-10 animate-in fade-in zoom-in-95 duration-500">
          {/* Header Brand Section */}
          <div className="text-center">
            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-plum via-[#5a3a52] to-lavender-deep text-[#FAF9F5] shadow-lg shadow-plum/25 border border-amber-300/30">
              <Crown className="h-8 w-8 text-amber-300" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white" />
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-plum/5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-plum mb-2 border border-plum/15">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Haute Couture Atelier HQ</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl text-plum font-bold tracking-tight">
              Command Suite
            </h1>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-plum/70 max-w-md mx-auto">
              Welcome to the administrative console. Authenticate your credentials to manage appointments, boutique inventory, and live campaigns.
            </p>
          </div>

          {/* Quick Profile Fast-Selector */}
          <div className="mt-6">
            <label className="text-[11px] font-bold uppercase tracking-wider text-plum/80 flex items-center justify-between pl-1 mb-2">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-lavender-deep" />
                <span>Select Admin Profile</span>
              </span>
              <span className="text-[10px] text-plum/50 font-normal">Quick Switch</span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Ajuh Louis Profile Card */}
              <button
                type="button"
                onClick={() => {
                  setSelectedProfileId("ajuhlouis");
                  setUsernameInput("ajuhlouis");
                  setPasswordInput("");
                }}
                className={`group flex items-start gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  usernameInput.toLowerCase() === "ajuhlouis"
                    ? "border-plum bg-plum/5 ring-2 ring-plum/10 shadow-xs"
                    : "border-plum/15 bg-[#FAF7F2]/70 hover:border-plum/30 hover:bg-white"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-800 text-white font-bold text-xs shadow-xs">
                  AL
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-plum truncate">Ajuh Louis</p>
                    {usernameInput.toLowerCase() === "ajuhlouis" && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-lavender-deep shrink-0 ml-1" />
                    )}
                  </div>
                  <p className="text-[10px] font-medium text-amber-700">Super Admin</p>
                </div>
              </button>

              {/* Seddypluz Profile Card */}
              <button
                type="button"
                onClick={() => {
                  setSelectedProfileId("seddypluz");
                  setUsernameInput("seddypluz");
                  setPasswordInput("");
                }}
                className={`group flex items-start gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  usernameInput.toLowerCase() === "seddypluz"
                    ? "border-plum bg-plum/5 ring-2 ring-plum/10 shadow-xs"
                    : "border-plum/15 bg-[#FAF7F2]/70 hover:border-plum/30 hover:bg-white"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-plum via-[#684a62] to-lavender-deep text-white font-bold text-xs shadow-xs">
                  SZ
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-plum truncate">Seddypluz</p>
                    {usernameInput.toLowerCase() === "seddypluz" && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-lavender-deep shrink-0 ml-1" />
                    )}
                  </div>
                  <p className="text-[10px] font-medium text-lavender-deep">Studio Super Admin</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleLogin} className="mt-5 space-y-3.5">
            {/* Username / Administrator ID Field */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-plum/80 flex items-center gap-1.5 pl-1">
                <User className="h-3.5 w-3.5 text-lavender-deep" />
                <span>Administrator Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. ajuhlouis or seddypluz"
                  className="h-11 w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 text-sm font-medium text-plum placeholder:text-plum/40 outline-none transition-all focus:border-plum focus:bg-white focus:ring-2 focus:ring-plum/10 shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between pl-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-plum/80 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-lavender-deep" />
                  <span>Security Passcode</span>
                </label>
                {capsLockActive && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1 animate-pulse">
                    <AlertCircle className="h-3 w-3" />
                    Caps Lock is ON
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => setCapsLockActive(e.getModifierState("CapsLock"))}
                  onKeyUp={(e) => setCapsLockActive(e.getModifierState("CapsLock"))}
                  placeholder="Enter studio password"
                  className="h-11 w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] pl-4 pr-11 text-sm font-medium text-plum placeholder:text-plum/40 outline-none transition-all focus:border-plum focus:bg-white focus:ring-2 focus:ring-plum/10 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-plum/40 hover:text-plum transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Session Persistence & Assistance Trigger */}
            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <label className="flex items-center gap-2 cursor-pointer text-plum/70 hover:text-plum transition-colors select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 rounded border-plum/30 text-plum focus:ring-plum/20 accent-plum cursor-pointer"
                />
                <span className="text-[11px] font-medium">Remember terminal</span>
              </label>

              <button
                type="button"
                onClick={() => setIsAssistanceModalOpen(true)}
                className="text-[11px] font-semibold text-lavender-deep hover:text-plum underline transition-colors cursor-pointer flex items-center gap-1"
              >
                <HelpCircle className="h-3 w-3" />
                <span>Login Help</span>
              </button>
            </div>

            {/* Submit Authorization Button */}
            <button
              type="submit"
              disabled={authChecking}
              className="mt-2 flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-plum via-[#5a3a52] to-plum text-[#FAF9F5] text-xs uppercase tracking-[0.24em] font-bold shadow-xl shadow-plum/20 transition-all hover:bg-lavender-deep hover:shadow-plum/30 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {authChecking ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4 text-amber-300" />
                  <span>Authorize &amp; Enter Command Suite</span>
                </>
              )}
            </button>
          </form>

          {/* Realtime Security Status Ribbon */}
          <div className="mt-6 rounded-2xl border border-plum/10 bg-[#FAF7F2]/80 p-3 flex flex-wrap items-center justify-around gap-2 text-[10px] text-plum/70 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Firestore DB: Live</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-lavender-deep" />
              <span>256-Bit Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-amber-600" />
              <span>Rate Armor: Active</span>
            </div>
          </div>

          {/* Footer Navigation Links */}
          <div className="mt-6 border-t border-plum/10 pt-4 flex items-center justify-between text-xs text-plum/60">
            <Link
              to="/"
              className="hover:text-plum transition-colors flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Studio Homepage</span>
            </Link>
            <Link
              to="/shop"
              className="hover:text-plum transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Boutique Catalog</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ==================================================== */}
        {/* EMERGENCY CONCIERGE ASSISTANCE MODAL */}
        {/* ==================================================== */}
        {isAssistanceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-md rounded-3xl border border-plum/20 bg-white p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15">
                    <ShieldCheck className="h-5 w-5 text-lavender-deep" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-plum">
                      Atelier Authentication Help
                    </h3>
                    <p className="text-[11px] text-plum/60">Emergency Access Concierge</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssistanceModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-plum/50 hover:bg-plum/5 hover:text-plum transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-plum/80">
                <p>
                  If you have forgotten or need to reset your studio administrator passcode, access can be restored via the emergency studio concierge.
                </p>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3.5 space-y-1.5 text-[11px] text-amber-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>Administrator Identity Verification Required</span>
                  </p>
                  <p className="text-amber-800/90 leading-normal">
                    All authentication changes require secondary confirmation with the Studio Executive Director.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Concierge,%20I%20need%20assistance%20accessing%20the%20Admin%20Command%20Suite."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact WhatsApp Support</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("+2348162292997");
                    toast.success("Studio phone copied to clipboard: +234 816 229 2997");
                  }}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-plum/20 bg-plum/5 text-plum font-bold text-xs uppercase tracking-wider hover:bg-plum/10 transition-colors"
                >
                  <Phone className="h-4 w-4 text-lavender-deep" />
                  <span>Copy Direct Hotline (+234 816 229 2997)</span>
                </button>
              </div>

              <div className="border-t border-plum/10 pt-3 text-center">
                <button
                  type="button"
                  onClick={() => setIsAssistanceModalOpen(false)}
                  className="text-xs text-plum/60 hover:text-plum font-semibold transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // 2. MAIN ATELIER COMMAND CENTER (Authenticated)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1B28] font-sans selection:bg-lavender-deep selection:text-white pb-24 md:pb-12">
      {/* Top Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-plum/10 bg-white/85 backdrop-blur-xl shadow-xs">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-8 py-3.5">
          {/* Brand & Suite Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15 shadow-xs">
              <Crown className="h-5 w-5 text-lavender-deep" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-plum">
                  Seddypluz
                </span>
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-900 border border-amber-300">
                  Command HQ
                </span>
              </div>
              <p className="text-[10px] text-plum/60 tracking-wide font-sans">
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
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-plum/15 bg-white text-plum/80 transition-all hover:bg-plum/5 hover:text-plum active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
              title="Refresh live data"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin text-lavender-deep" : ""}`}
              />
            </button>

            {/* Live Front-End Preview Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3 py-2 text-xs font-semibold text-plum/80 transition-all hover:bg-plum/5 hover:text-plum shadow-xs"
              title="Open customer-facing website"
            >
              <Globe className="h-3.5 w-3.5 text-lavender-deep" />
              <span>Live Site</span>
              <ArrowUpRight className="h-3 w-3 text-plum/40" />
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
                    ? "border-plum bg-plum/5 shadow-md ring-2 ring-plum/10"
                    : "border-plum/15 bg-white hover:border-plum/30 hover:bg-plum/5 shadow-xs"
                }`}
              >
                {/* Circular Gradient Avatar Badge with Online Dot */}
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-plum via-[#684a62] to-lavender-deep text-[#FAF9F5] font-bold text-xs tracking-wider shadow-sm ring-1 ring-plum/20 shrink-0">
                  <span>{userInitials}</span>
                  {/* Glowing Pulse Online Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1 ring-white" />
                  </span>
                </div>

                {/* User Info Label */}
                <div className="hidden md:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-plum group-hover:text-lavender-deep transition-colors truncate max-w-[120px]">
                      {currentAdminUser}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-plum/60">
                    {adminRole}
                  </span>
                </div>

                {/* Dropdown Chevron */}
                <ChevronDown
                  className={`h-3.5 w-3.5 text-plum/50 transition-transform duration-200 ${
                    isAvatarMenuOpen ? "rotate-180 text-plum" : ""
                  }`}
                />
              </button>

              {/* Glassmorphic Dropdown Menu Popover */}
              {isAvatarMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-3xl border border-plum/15 bg-white/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 text-plum">
                  {/* User Profile Card */}
                  <div className="rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10 mb-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-plum via-[#684a62] to-lavender-deep text-[#FAF9F5] font-bold text-sm shadow-md ring-2 ring-plum/15 shrink-0">
                        <span>{userInitials}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-plum truncate">
                            {currentAdminUser}
                          </span>
                          <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        </div>
                        <span className="text-[11px] text-plum/60 truncate block font-sans">
                          {adminEmail}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-plum/10 text-[10px]">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active Session</span>
                      </span>
                      <span className="text-plum/50 uppercase tracking-wider font-semibold">
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
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-plum/80 hover:bg-plum/5 hover:text-plum transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-plum/5 text-plum group-hover:bg-plum/10">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">Studio &amp; Suite Settings</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-plum/30 group-hover:text-plum group-hover:translate-x-0.5 transition-all" />
                  </button>

                  {/* Quick Modules Navigation */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("appointments");
                      setIsAvatarMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors cursor-pointer"
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
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-amber-600" />
                    <span>Wigs &amp; Boutique Catalog</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("concierge");
                      setIsAvatarMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors cursor-pointer"
                  >
                    <Sliders className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Studio Contacts &amp; Hotline</span>
                  </button>

                  <div className="my-1 border-t border-plum/10" />

                  {/* View Live Website */}
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-3.5 w-3.5 text-emerald-600" />
                      <span>View Live Website</span>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-plum/40" />
                  </a>

                  {/* Lock / Sign Out Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 border-t border-plum/10">
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
                      ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 font-extrabold"
                      : "bg-transparent text-plum/70 hover:bg-plum/5 hover:text-plum"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        isActive ? "bg-amber-400 text-plum" : "bg-plum/10 text-plum"
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
              <div className="rounded-3xl border border-plum/10 bg-white p-5 md:p-6 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider font-bold text-plum/60 block">
                  Total Inquiries
                </span>
                <span className="font-display text-3xl sm:text-4xl text-plum font-bold mt-1 block">
                  {stats.total}
                </span>
                <span className="text-[10px] text-plum/60 mt-1 block font-medium">
                  All registered brides
                </span>
              </div>

              <div className="rounded-3xl border border-amber-300/60 bg-amber-50/70 p-5 md:p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900">
                    Pending Review
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                </div>
                <span className="font-display text-3xl sm:text-4xl text-amber-900 font-bold mt-1 block">
                  {stats.pending}
                </span>
                <span className="text-[10px] text-amber-800/80 mt-1 block font-semibold">
                  Requires response
                </span>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 md:p-6 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 block">
                  Confirmed Bookings
                </span>
                <span className="font-display text-3xl sm:text-4xl text-emerald-900 font-bold mt-1 block">
                  {stats.confirmed}
                </span>
                <span className="text-[10px] text-emerald-800/80 mt-1 block font-semibold">
                  Locked on studio calendar
                </span>
              </div>

              <div className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-5 md:p-6 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-900 block">
                  Completed Artistry
                </span>
                <span className="font-display text-3xl sm:text-4xl text-indigo-900 font-bold mt-1 block">
                  {stats.completed}
                </span>
                <span className="text-[10px] text-indigo-800/80 mt-1 block font-semibold">
                  Delivered sessions
                </span>
              </div>

              <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-3xl border border-plum/10 bg-white p-5 md:p-6 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider font-bold text-plum/60 block">
                  Pipeline Value (Est.)
                </span>
                <span className="font-display text-2xl sm:text-3xl text-plum font-bold mt-1 block truncate">
                  ₦{stats.estimatedValue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                  {stats.conversionRate}% Conversion Rate
                </span>
              </div>
            </div>

            {/* Filter, Search & Export Toolbar */}
            <div className="rounded-3xl border border-plum/10 bg-white p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-plum/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client name, email, phone, or service..."
                    className="w-full rounded-2xl border border-plum/15 bg-[#FAF7F2] py-3 pl-11 pr-4 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:bg-white focus:outline-none shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-plum/50 hover:text-plum cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Right controls: View mode + Export CSV */}
                <div className="flex items-center gap-2.5 self-end lg:self-auto">
                  <div className="flex items-center rounded-xl border border-plum/15 bg-[#FAF7F2] p-1">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        viewMode === "list"
                          ? "bg-plum text-[#FAF9F5] shadow-xs"
                          : "text-plum/60 hover:text-plum"
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode("kanban")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        viewMode === "kanban"
                          ? "bg-plum text-[#FAF9F5] shadow-xs"
                          : "text-plum/60 hover:text-plum"
                      }`}
                    >
                      Pipeline
                    </button>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-plum hover:bg-plum/5 active:scale-95 transition-all cursor-pointer shadow-xs"
                    title="Export to CSV"
                  >
                    <Download className="h-3.5 w-3.5 text-lavender-deep" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-plum/10">
                {(
                  [
                    { id: "all", label: `All Inquiries (${stats.total})` },
                    { id: "pending", label: `Pending (${stats.pending})` },
                    { id: "confirmed", label: `Confirmed (${stats.confirmed})` },
                    { id: "completed", label: `Completed (${stats.completed})` },
                    { id: "declined", label: `Declined (${stats.declined})` },
                  ] as const
                ).map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setFilterStatus(chip.id)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      filterStatus === chip.id
                        ? "bg-plum text-[#FAF9F5] shadow-xs"
                        : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments View (List vs Kanban) */}
            {filteredAppointments.length === 0 ? (
              <div className="rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-sm">
                <Calendar className="mx-auto h-12 w-12 text-plum/30 mb-3" />
                <h4 className="font-display text-xl text-plum font-bold">No appointments found</h4>
                <p className="text-xs text-plum/60 mt-1 max-w-sm mx-auto">
                  Try adjusting your filter or search query to find relevant booking inquiries.
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    className="mt-4 rounded-full bg-plum/5 border border-plum/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-plum hover:bg-plum hover:text-white cursor-pointer transition-all"
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
                    pending: "bg-amber-50 text-amber-800 border-amber-300",
                    confirmed: "bg-emerald-50 text-emerald-800 border-emerald-300",
                    completed: "bg-indigo-50 text-indigo-800 border-indigo-300",
                    declined: "bg-rose-50 text-rose-800 border-rose-300",
                  };

                  return (
                    <div
                      key={app.id}
                      className="group rounded-3xl border border-plum/10 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-plum/30 hover:shadow-md"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left: Client Name & Service */}
                        <div className="flex items-start gap-3.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-plum/5 text-plum font-display text-lg font-bold border border-plum/15">
                            {app.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-display text-lg sm:text-xl font-bold text-plum">
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

                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-plum/80">
                              <span className="font-semibold text-lavender-deep flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                {app.service}
                              </span>
                              <span className="flex items-center gap-1 text-plum/60">
                                <Calendar className="h-3 w-3 text-plum/40" />
                                {app.appointment_date}
                              </span>
                              <span className="flex items-center gap-1 text-plum/60">
                                <Clock className="h-3 w-3 text-plum/40" />
                                {app.preferred_time}
                              </span>
                            </div>

                            {/* Contact Details */}
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-plum/60">
                              <a
                                href={`mailto:${app.email}`}
                                className="flex items-center gap-1 hover:text-plum transition-colors"
                              >
                                <Mail className="h-3 w-3 text-plum/40" />
                                <span>{app.email}</span>
                              </a>
                              {app.phone && (
                                <a
                                  href={`tel:${app.phone}`}
                                  className="flex items-center gap-1 hover:text-plum transition-colors font-medium"
                                >
                                  <Phone className="h-3 w-3 text-plum/40" />
                                  <span>{app.phone}</span>
                                </a>
                              )}
                            </div>

                            {/* Client Notes if any */}
                            {app.notes && (
                              <p className="mt-2 rounded-xl bg-[#FAF7F2] p-2.5 text-xs italic text-plum/80 border border-plum/10">
                                "{app.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions (Status Switcher & WhatsApp Message) */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-end lg:self-center border-t lg:border-t-0 border-plum/10 pt-3 lg:pt-0 w-full lg:w-auto justify-end">
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
                            className="rounded-xl border border-plum/15 bg-[#FAF7F2] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-plum hover:bg-plum/10 active:scale-95 transition-all cursor-pointer shadow-xs"
                          >
                            {isEditing ? "Close Editor" : "Change Status"}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Inline Status Editor */}
                      {isEditing && (
                        <div className="mt-4 rounded-2xl border border-plum/20 bg-[#FAF7F2] p-4 animate-in fade-in duration-200">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-plum mb-3">
                            Update Appointment Status &amp; Studio Notes
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-plum/60 block mb-1">
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
                                className="w-full rounded-xl border border-plum/20 bg-white px-3 py-2 text-xs text-plum font-semibold focus:outline-none"
                              >
                                <option value="pending">PENDING (Under Review)</option>
                                <option value="confirmed">CONFIRMED (Date Locked)</option>
                                <option value="completed">COMPLETED (Session Done)</option>
                                <option value="declined">DECLINED (Unavailable)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-plum/60 block mb-1">
                                Studio Follow-up Notes:
                              </label>
                              <input
                                type="text"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="Add internal studio notes..."
                                className="w-full rounded-xl border border-plum/20 bg-white px-3 py-2 text-xs text-plum focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded-xl border border-plum/15 bg-white px-3.5 py-1.5 text-xs text-plum/70 hover:bg-plum/5 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              disabled={updating}
                              onClick={() => handleUpdateStatus(app.id, editStatus, editNotes)}
                              className="rounded-xl bg-plum text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-lavender-deep cursor-pointer transition-all shadow-xs"
                            >
                              {updating ? "Saving..." : "Save Changes"}
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
                    pending: "border-amber-200 bg-amber-50/40",
                    confirmed: "border-emerald-200 bg-emerald-50/40",
                    completed: "border-indigo-200 bg-indigo-50/40",
                    declined: "border-rose-200 bg-rose-50/40",
                  };

                  return (
                    <div
                      key={colStatus}
                      className={`rounded-3xl border ${colBg[colStatus]} p-4 flex flex-col justify-between min-h-[400px] shadow-xs`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-plum/10 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-plum">
                            {titles[colStatus]}
                          </span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-plum border border-plum/10 shadow-xs">
                            {colItems.length}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {colItems.length === 0 ? (
                            <p className="text-[11px] text-plum/40 italic text-center py-6">
                              No requests in this stage
                            </p>
                          ) : (
                            colItems.map((app) => (
                              <div
                                key={app.id}
                                className="rounded-2xl border border-plum/10 bg-white p-3.5 text-xs space-y-1.5 shadow-sm hover:border-plum/30 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-plum truncate max-w-[140px]">
                                    {app.name}
                                  </span>
                                  <span className="text-[10px] text-lavender-deep font-semibold">
                                    {app.appointment_date}
                                  </span>
                                </div>
                                <p className="text-[11px] text-plum/70 truncate">{app.service}</p>
                                <div className="flex items-center justify-between pt-1 border-t border-plum/5">
                                  <span className="text-[10px] text-plum/50">
                                    {app.preferred_time}
                                  </span>
                                  <a
                                    href={generateClientWhatsAppUrl(app)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 text-[10px] font-bold"
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
        {/* MODULE 2: PROMO & ANNOUNCEMENT BANNER MANAGER (CRUD & PULSE) */}
        {/* ==================================================== */}
        {activeTab === "promos" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header & Main Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5">
                  <Megaphone className="h-7 w-7 text-lavender-deep" />
                  <span>Promo Banners &amp; Live Announcement Hub</span>
                </h3>
                <p className="text-xs text-plum/60 mt-1">
                  Create, edit, pulse, activate, duplicate, and delete promotional announcements
                  broadcasted across the storefront.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAnnouncements}
                  className="flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-all cursor-pointer shadow-xs"
                  title="Reset to 3 studio default templates"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-xs">
                  <Radio className="h-4 w-4 animate-pulse text-emerald-600" />
                  <span>
                    {activeAnnouncement
                      ? `Live: "${activeAnnouncement.title}"`
                      : "Broadcast Paused (Hidden)"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleOpenCreateAnnouncement}
                  className="flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] hover:bg-lavender-deep px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>+ Create Announcement</span>
                </button>
              </div>
            </div>

            {/* Live Visual Simulation Container */}
            <div className="rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-plum flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-lavender-deep" />
                  <span>Live Storefront Marquee Simulation</span>
                </span>
                <span
                  className={`text-[10px] rounded-full px-2.5 py-0.5 font-bold uppercase border ${
                    activeAnnouncement
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-plum/5 text-plum/50 border-plum/10"
                  }`}
                >
                  {activeAnnouncement ? "● Broadcasting to All Users" : "○ Hidden from Public"}
                </span>
              </div>

              {/* Simulated Header Announcement Bar */}
              {activeAnnouncement ? (
                <div
                  className={`rounded-2xl p-4 md:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border relative overflow-hidden transition-all duration-300 ${
                    activeAnnouncement.theme === "amber"
                      ? "bg-gradient-to-r from-[#3D2502] via-[#5C3A08] to-[#2B1A02] text-amber-100 border-amber-400/40"
                      : activeAnnouncement.theme === "emerald"
                        ? "bg-gradient-to-r from-[#032B1C] via-[#084D34] to-[#021F14] text-emerald-100 border-emerald-500/40"
                        : activeAnnouncement.theme === "rose"
                          ? "bg-gradient-to-r from-[#3B0818] via-[#59122A] to-[#2B0511] text-rose-100 border-rose-400/40"
                          : activeAnnouncement.theme === "dark"
                            ? "bg-gradient-to-r from-[#170E15] via-[#241320] to-[#120B10] text-[#FAF9F5] border-white/20"
                            : "bg-gradient-to-r from-plum via-[#684a62] to-plum text-[#FAF9F5] border-white/10"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />

                  <div className="flex items-center gap-3.5 z-10 text-center sm:text-left">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-amber-300">
                      <Crown className="h-5 w-5" />
                      {activeAnnouncement.pulseAnimation && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 ring-2 ring-white/20" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-300 border border-amber-300/30">
                          {activeAnnouncement.badgeLabel}
                        </span>
                        <span className="text-xs font-semibold opacity-80">
                          {activeAnnouncement.discountPercent} Value
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs sm:text-sm font-medium">
                        {activeAnnouncement.text}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 z-10 shrink-0">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-xl bg-white text-plum px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm"
                    >
                      <Copy className="h-3.5 w-3.5 text-lavender-deep" />
                      <span>
                        Code: <strong>{activeAnnouncement.voucherCode}</strong>
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-plum/10 bg-[#FAF7F2] p-6 text-center text-plum/60 text-xs">
                  No announcement banner is currently active. Select one of the campaigns below and
                  click "Set as Live" to display it on the website.
                </div>
              )}
            </div>

            {/* Filter & Search Bar */}
            <div className="rounded-3xl border border-plum/10 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                {(
                  [
                    { id: "all", label: `All Campaigns (${announcements.length})` },
                    {
                      id: "active",
                      label: `Active (${announcements.filter((a) => a.isActive).length})`,
                    },
                    {
                      id: "pulsing",
                      label: `Pulsing Live (${announcements.filter((a) => a.pulseAnimation).length})`,
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAnnouncementFilter(tab.id)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      announcementFilter === tab.id
                        ? "bg-plum text-[#FAF9F5] font-bold shadow-xs"
                        : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-plum/40" />
                <input
                  type="text"
                  value={announcementSearch}
                  onChange={(e) => setAnnouncementSearch(e.target.value)}
                  placeholder="Search campaigns..."
                  className="h-9 w-full rounded-xl border border-plum/15 bg-[#FAF7F2] pl-9 pr-8 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:bg-white focus:outline-none"
                />
                {announcementSearch && (
                  <button
                    onClick={() => setAnnouncementSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Campaigns Grid */}
            {filteredAnnouncements.length === 0 ? (
              <div className="rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-sm">
                <Megaphone className="mx-auto h-12 w-12 text-plum/30 mb-3" />
                <h4 className="font-display text-lg text-plum font-bold">No announcements found</h4>
                <p className="text-xs text-plum/60 mt-1 max-w-sm mx-auto">
                  Try adjusting your filter or click "+ Create Announcement" to launch a new studio
                  promotion.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnnouncements.map((item) => {
                  const themeLabels = {
                    plum: "Plum Velvet",
                    amber: "Amber Gold",
                    emerald: "Emerald Jade",
                    rose: "Ruby Rose",
                    dark: "Dark Obsidian",
                  };

                  const themePills = {
                    plum: "bg-plum/10 border-plum/20 text-plum",
                    amber: "bg-amber-100 border-amber-300 text-amber-900",
                    emerald: "bg-emerald-100 border-emerald-300 text-emerald-900",
                    rose: "bg-rose-100 border-rose-300 text-rose-900",
                    dark: "bg-neutral-800 text-white border-neutral-700",
                  };

                  return (
                    <div
                      key={item.id}
                      className={`group relative rounded-3xl border p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 transition-all shadow-sm ${
                        item.isActive
                          ? "border-plum bg-plum/[0.03] ring-2 ring-plum/10 shadow-md"
                          : "border-plum/10 bg-white hover:border-plum/30 hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                                themePills[item.theme]
                              }`}
                            >
                              {themeLabels[item.theme]}
                            </span>
                            <span className="rounded-full bg-plum/5 px-2 py-0.5 text-[9px] font-bold text-plum border border-plum/15">
                              {item.badgeLabel}
                            </span>
                          </div>

                          {/* Active / Inactive Badge */}
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                              item.isActive
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse"
                                : "bg-plum/5 text-plum/50 border-plum/10"
                            }`}
                          >
                            {item.isActive ? "● Broadcast Live" : "○ Paused"}
                          </span>
                        </div>

                        {/* Title & Headline Text */}
                        <h4 className="font-sans font-bold text-base text-plum truncate">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-plum/75 line-clamp-3 leading-relaxed font-sans">
                          "{item.text}"
                        </p>

                        {/* Voucher & Value Card */}
                        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-[#FAF7F2] p-2.5 border border-plum/10 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5 text-lavender-deep" />
                            <span className="font-bold text-plum uppercase tracking-wider">
                              {item.voucherCode}
                            </span>
                          </div>
                          <span className="font-semibold text-amber-700">
                            {item.discountPercent}
                          </span>
                        </div>
                      </div>

                      {/* Controls Bar: Pulse, Broadcast, Edit, Duplicate, Delete */}
                      <div className="pt-3 border-t border-plum/10 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          {/* 1-Click Pulse Animation Toggle */}
                          <button
                            type="button"
                            onClick={() => handleTogglePulse(item)}
                            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              item.pulseAnimation
                                ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                                : "bg-plum/5 text-plum/50 border border-plum/10 hover:text-plum"
                            }`}
                            title="Toggle live pulsing neon glow effect on website"
                          >
                            <Zap
                              className={`h-3.5 w-3.5 ${
                                item.pulseAnimation ? "fill-amber-500 text-amber-600" : ""
                              }`}
                            />
                            <span>{item.pulseAnimation ? "Pulse ON" : "Pulse OFF"}</span>
                          </button>

                          {/* 1-Click Broadcast Active Toggle */}
                          <button
                            type="button"
                            onClick={() => handleToggleActive(item)}
                            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              item.isActive
                                ? "bg-plum text-white shadow-md shadow-plum/20"
                                : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/10 hover:text-plum border border-plum/15"
                            }`}
                          >
                            <Radio className="h-3 w-3" />
                            <span>{item.isActive ? "Live (Broadcasting)" : "Set as Live"}</span>
                          </button>
                        </div>

                        {/* Secondary Actions: Edit, Duplicate, Delete */}
                        <div className="flex items-center justify-end gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditAnnouncement(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-plum hover:bg-plum/5 transition-colors cursor-pointer shadow-xs"
                            title="Edit announcement campaign"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDuplicateAnnouncement(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-lavender-deep hover:bg-plum/5 transition-colors cursor-pointer shadow-xs"
                            title="Duplicate campaign"
                          >
                            <CopyPlus className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmAnnouncement(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shadow-xs"
                            title="Delete announcement"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ==================================================== */}
            {/* CREATE / EDIT ANNOUNCEMENT MODAL */}
            {/* ==================================================== */}
            {isAnnouncementModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 overflow-y-auto">
                <div className="relative w-full max-w-2xl rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6 text-plum">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-plum/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15">
                        <Megaphone className="h-5 w-5 text-lavender-deep" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-plum font-bold">
                          {editingAnnouncementId
                            ? "Edit Announcement Campaign"
                            : "Create New Announcement Campaign"}
                        </h3>
                        <p className="text-xs text-plum/60">
                          Configure promotion copy, coupon code, theme palette, and live pulsing
                          effects.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAnnouncementModalOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7F2] text-plum/60 hover:bg-plum/10 hover:text-plum cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSaveAnnouncement} className="space-y-5">
                    {/* Campaign Title & Badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Campaign Name / Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={annFormTitle}
                          onChange={(e) => setAnnFormTitle(e.target.value)}
                          placeholder="e.g. Bridal Season 20% Drop"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Badge Tag Label
                        </label>
                        <input
                          type="text"
                          value={annFormBadge}
                          onChange={(e) => setAnnFormBadge(e.target.value)}
                          placeholder="e.g. Exclusive Promo, Flash Drop, VIP Offer"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Headline Text */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                        Announcement Headline Copy (Shown on Website) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={annFormText}
                        onChange={(e) => setAnnFormText(e.target.value)}
                        placeholder="e.g. Enjoy 20% OFF your first wig order + ALL beauty & bridal installation services!"
                        className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* Voucher Code & Discount Tag */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Coupon Voucher Code:
                        </label>
                        <input
                          type="text"
                          value={annFormVoucher}
                          onChange={(e) => setAnnFormVoucher(e.target.value.toUpperCase())}
                          placeholder="e.g. SEDDY20"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm font-bold uppercase tracking-widest text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Discount / Offer Value Label:
                        </label>
                        <input
                          type="text"
                          value={annFormDiscount}
                          onChange={(e) => setAnnFormDiscount(e.target.value)}
                          placeholder="e.g. 20% OFF or FREE GIFT"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Theme Palette & Pulsing Switch */}
                    <div className="border-t border-plum/10 pt-4 space-y-4">
                      <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block">
                        Visual Color Theme:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {(
                          [
                            { id: "plum", label: "Plum Velvet", bg: "bg-plum" },
                            { id: "amber", label: "Amber Gold", bg: "bg-amber-600" },
                            { id: "emerald", label: "Emerald Jade", bg: "bg-emerald-600" },
                            { id: "rose", label: "Ruby Rose", bg: "bg-rose-700" },
                            { id: "dark", label: "Dark Obsidian", bg: "bg-neutral-900" },
                          ] as const
                        ).map((t) => {
                          const isSelected = annFormTheme === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setAnnFormTheme(t.id)}
                              className={`rounded-2xl p-2.5 border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? "border-plum bg-plum/5 ring-2 ring-plum/20"
                                  : "border-plum/10 bg-[#FAF7F2] hover:border-plum/30"
                              }`}
                            >
                              <div
                                className={`h-6 w-full rounded-lg ${t.bg} border border-white/20 mb-1.5`}
                              />
                              <span className="text-[10px] font-semibold text-plum truncate block">
                                {t.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Pulse Animation Toggle Switch */}
                      <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-plum/5 text-plum">
                            <Zap className="h-5 w-5 text-lavender-deep" />
                            {annFormPulse && (
                              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-plum block">
                              Live Pulse Glowing Animation
                            </span>
                            <span className="text-[10px] text-plum/50">
                              Display pulsing neon badge beacon on customer storefront.
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setAnnFormPulse(!annFormPulse)}
                          className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                            annFormPulse ? "bg-plum" : "bg-plum/20"
                          }`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                              annFormPulse ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-plum/10 pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAnnouncementModalOpen(false)}
                        className="rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:bg-lavender-deep active:scale-95 transition-all cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Announcement</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* DELETE ANNOUNCEMENT CONFIRMATION MODAL */}
            {/* ==================================================== */}
            {deleteConfirmAnnouncement && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 animate-in fade-in duration-150">
                <div className="relative w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-2xl text-center space-y-4 text-plum">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
                    <Trash2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-plum font-bold">
                      Delete Promo Announcement?
                    </h4>
                    <p className="text-xs text-plum/70 mt-1.5 leading-relaxed">
                      Are you sure you want to remove{" "}
                      <span className="font-bold text-plum">
                        "{deleteConfirmAnnouncement.title}"
                      </span>
                      ? If this campaign is currently broadcasting, the announcement banner will be
                      hidden from the storefront.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmAnnouncement(null)}
                      className="rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAnnouncement(deleteConfirmAnnouncement)}
                      className="rounded-xl bg-rose-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-rose-500/20"
                    >
                      Yes, Delete Campaign
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                <h3 className="font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5">
                  <Package className="h-7 w-7 text-lavender-deep" />
                  <span>Boutique Catalog &amp; Inventory Controller</span>
                </h3>
                <p className="text-xs text-plum/60 mt-1">
                  Add, edit, duplicate, and delete luxury wigs, hair bundles, and cosmetic items
                  displayed on the `/shop` and homepage.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleResetCatalog}
                  className="flex items-center gap-1.5 rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum/70 hover:bg-plum/5 hover:text-plum transition-all cursor-pointer shadow-xs"
                  title="Reset to default 7 products"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2 text-xs font-bold text-amber-900 shadow-xs">
                  <Crown className="h-4 w-4 text-amber-600" />
                  <span>{pinnedProductIds.length} Pinned on Home</span>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] hover:bg-lavender-deep px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>+ Add New Product</span>
                </button>
              </div>
            </div>

            {/* Search & Category Filter Strip */}
            <div className="rounded-3xl border border-plum/10 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
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
                        ? "bg-plum text-[#FAF9F5] font-bold shadow-xs"
                        : "bg-[#FAF7F2] text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Live Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-plum/40" />
                <input
                  type="text"
                  value={inventorySearchQuery}
                  onChange={(e) => setInventorySearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="h-9 w-full rounded-xl border border-plum/15 bg-[#FAF7F2] pl-9 pr-8 text-xs text-plum placeholder:text-plum/40 focus:border-plum focus:bg-white focus:outline-none"
                />
                {inventorySearchQuery && (
                  <button
                    onClick={() => setInventorySearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Products Inventory Grid */}
            {filteredInventoryProducts.length === 0 ? (
              <div className="rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-sm">
                <Package className="mx-auto h-12 w-12 text-plum/30 mb-3" />
                <h4 className="font-display text-lg text-plum font-bold">
                  No matching products found
                </h4>
                <p className="text-xs text-plum/60 mt-1 max-w-sm mx-auto">
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
                      className="group relative rounded-3xl border border-plum/10 bg-white p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-plum/30 hover:shadow-md transition-all shadow-sm"
                    >
                      <div>
                        {/* Top Image + Badges */}
                        <div className="flex items-start gap-3.5">
                          <div className="relative shrink-0">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="h-22 w-22 rounded-2xl object-cover bg-[#FAF7F2] border border-plum/10"
                            />
                            {product.discountBadge && (
                              <span className="absolute -top-1.5 -left-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                                {product.discountBadge}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] uppercase tracking-wider font-bold text-lavender-deep truncate">
                                {product.categoryLabel}
                              </span>
                              {product.badge && (
                                <span className="rounded-full bg-plum/5 px-2 py-0.5 text-[9px] font-bold text-plum border border-plum/15">
                                  {product.badge}
                                </span>
                              )}
                            </div>

                            <h4 className="font-sans font-bold text-base text-plum truncate mt-1">
                              {product.name}
                            </h4>

                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-base font-bold text-amber-700">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-plum/40 line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Variants count */}
                            {product.dots && product.dots.length > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-[10px] text-plum/60">
                                <span>{product.dots.length} lengths/variants:</span>
                                <span className="text-plum font-semibold truncate">
                                  {product.dots.map((d) => d.name).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-plum/70 line-clamp-2 leading-relaxed font-sans mt-3">
                          {product.desc}
                        </p>
                      </div>

                      {/* Controls Strip */}
                      <div className="pt-3 border-t border-plum/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          {/* Pin to Home Toggle */}
                          <button
                            type="button"
                            onClick={() => togglePinProduct(product.id)}
                            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isPinned
                                ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                                : "bg-[#FAF7F2] text-plum/60 hover:bg-plum/5 hover:text-plum border border-plum/15"
                            }`}
                          >
                            <Crown className="h-3 w-3 text-amber-600" />
                            <span>{isPinned ? "Pinned" : "Pin Home"}</span>
                          </button>

                          {/* Action Buttons: Edit, Duplicate, Delete, WhatsApp */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-plum hover:bg-plum/5 transition-colors cursor-pointer shadow-xs"
                              title="Edit product details"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDuplicateProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-lavender-deep hover:bg-plum/5 transition-colors cursor-pointer shadow-xs"
                              title="Duplicate as new product"
                            >
                              <CopyPlus className="h-3.5 w-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteConfirmProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-plum/15 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shadow-xs"
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
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shadow-xs"
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
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 overflow-y-auto">
                <div className="relative w-full max-w-2xl rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6 text-plum">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-plum/10 pb-4">
                    <div>
                      <h3 className="font-display text-2xl text-plum font-bold">
                        {editingProductId ? "Edit Boutique Product" : "Add New Boutique Product"}
                      </h3>
                      <p className="text-xs text-plum/60 mt-0.5">
                        Configure pricing, variants, descriptions, and visual presentation.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsProductModalOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7F2] text-plum/60 hover:bg-plum/10 hover:text-plum cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Product Form */}
                  <form onSubmit={handleSaveProduct} className="space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Product Name / Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Bone Straight 30 Inch Virgin Unit"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Category *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as "wigs" | "cosmetics")}
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        >
                          <option value="wigs">Luxury Wigs &amp; Extensions</option>
                          <option value="cosmetics">Signature Cosmetics &amp; Tools</option>
                        </select>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
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
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-amber-700 font-bold focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Original / Strikethrough Price
                        </label>
                        <input
                          type="text"
                          value={formOriginalPrice}
                          onChange={(e) => setFormOriginalPrice(e.target.value)}
                          placeholder="₦350,000"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum/70 focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Numeric Value (for sort)
                        </label>
                        <input
                          type="number"
                          required
                          value={formNumericPrice}
                          onChange={(e) => setFormNumericPrice(Number(e.target.value))}
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Badges & Promo Tag */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Featured Badge
                        </label>
                        <select
                          value={formBadge}
                          onChange={(e) => setFormBadge(e.target.value as Product["badge"] | "")}
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
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
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Discount Tag Badge
                        </label>
                        <input
                          type="text"
                          value={formDiscountBadge}
                          onChange={(e) => setFormDiscountBadge(e.target.value)}
                          placeholder="e.g. 20% OFF or 15% OFF"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Image Selection */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block">
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
                              className={`relative rounded-2xl border overflow-hidden p-1 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-plum ring-2 ring-plum/20 bg-plum/5"
                                  : "border-plum/10 hover:border-plum/30 bg-[#FAF7F2]"
                              }`}
                            >
                              <img
                                src={preset.value}
                                alt={preset.label}
                                className="h-14 w-full object-cover rounded-xl"
                              />
                              <span className="block text-[9px] text-plum/70 truncate mt-1 text-center font-medium">
                                {preset.label.split(" ")[0]}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2">
                        <label className="text-[10px] text-plum/60 block mb-1">
                          Or enter custom image URL:
                        </label>
                        <input
                          type="url"
                          value={formCustomImg}
                          onChange={(e) => setFormCustomImg(e.target.value)}
                          placeholder="https://example.com/custom-wig-photo.jpg"
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Short Card Description *
                        </label>
                        <input
                          type="text"
                          required
                          value={formDesc}
                          onChange={(e) => setFormDesc(e.target.value)}
                          placeholder="Summary shown on product cards..."
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider font-bold text-plum/80 block mb-1.5">
                          Full In-Depth Description
                        </label>
                        <textarea
                          rows={3}
                          value={formFullDesc}
                          onChange={(e) => setFormFullDesc(e.target.value)}
                          placeholder="Detailed product craft, single-donor specs, and hair texture notes shown in quick view..."
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Specifications Details */}
                    <div className="border-t border-plum/10 pt-4 space-y-3">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-plum">
                        Detailed Specifications:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-plum/60 block mb-1">Density / Weight:</label>
                          <input
                            type="text"
                            value={formDensityOrSize}
                            onChange={(e) => setFormDensityOrSize(e.target.value)}
                            className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-plum/60 block mb-1">Lace / Finish:</label>
                          <input
                            type="text"
                            value={formLaceOrFinish}
                            onChange={(e) => setFormLaceOrFinish(e.target.value)}
                            className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-plum/60 block mb-1">Origin / Formulation:</label>
                          <input
                            type="text"
                            value={formOrigin}
                            onChange={(e) => setFormOrigin(e.target.value)}
                            className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-plum/60 block mb-1">Longevity:</label>
                          <input
                            type="text"
                            value={formLongevity}
                            onChange={(e) => setFormLongevity(e.target.value)}
                            className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-plum/60 block mb-1 text-xs">Studio Care Tips:</label>
                        <input
                          type="text"
                          value={formCareTips}
                          onChange={(e) => setFormCareTips(e.target.value)}
                          className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3 py-2 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Variant Lengths / Shades */}
                    <div className="border-t border-plum/10 pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-plum">
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
                          className="text-[11px] font-bold text-lavender-deep hover:text-plum flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Variant</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formDots.map((dot, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-xl bg-[#FAF7F2] p-2 border border-plum/10"
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
                              className="flex-1 rounded-lg border border-plum/20 bg-white px-2.5 py-1.5 text-xs text-plum focus:outline-none"
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
                              className="w-28 rounded-lg border border-plum/20 bg-white px-2.5 py-1.5 text-xs text-amber-700 font-bold focus:outline-none"
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
                              className="text-rose-500 hover:text-rose-700 p-1.5 cursor-pointer"
                              title="Remove variant"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-plum/10 pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsProductModalOpen(false)}
                        className="rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-plum/20 hover:bg-lavender-deep active:scale-95 transition-all cursor-pointer"
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
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 animate-in fade-in duration-150">
                <div className="relative w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-2xl text-center space-y-4 text-plum">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
                    <Trash2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-plum font-bold">
                      Delete Product Item?
                    </h4>
                    <p className="text-xs text-plum/70 mt-1.5 leading-relaxed">
                      Are you sure you want to remove{" "}
                      <span className="font-bold text-plum">"{deleteConfirmProduct.name}"</span>{" "}
                      from the boutique inventory? This item will no longer appear on the `/shop` or
                      homepage.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmProduct(null)}
                      className="rounded-xl border border-plum/15 bg-white px-5 py-2.5 text-xs font-bold text-plum/70 hover:bg-plum/5 hover:text-plum cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(deleteConfirmProduct)}
                      className="rounded-xl bg-rose-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-rose-500/20"
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
        {/* MODULE 4: LOOKBOOK SLIDER CURATOR */}
        {/* ==================================================== */}
        {activeTab === "lookbook" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5">
                  <ImageIcon className="h-7 w-7 text-lavender-deep" />
                  <span>Homepage Lookbook &amp; Editorial Slides</span>
                </h3>
                <p className="text-xs text-plum/60 mt-1">
                  Arrange slide orders and customize headings displayed on the homepage bridal
                  accordion.
                </p>
              </div>

              <span className="rounded-xl bg-plum/5 border border-plum/15 px-3.5 py-2 text-xs font-bold text-plum self-start sm:self-auto">
                {lookbookSlides.length} Editorial Slides Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lookbookSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="rounded-3xl border border-plum/10 bg-white p-5 sm:p-6 shadow-sm space-y-4 hover:border-plum/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="h-28 w-24 rounded-2xl object-cover border border-plum/10 shadow-xs shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base font-bold text-lavender-deep">
                          Slide #{slide.num}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-plum/60 bg-plum/5 px-2 py-0.5 rounded-full border border-plum/10">
                          {slide.category}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-plum truncate">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-plum/70 truncate">{slide.subtitle}</p>
                      <p className="text-[11px] text-plum/50 italic truncate">{slide.technique}</p>
                    </div>
                  </div>

                  {/* Move Up / Down Buttons */}
                  <div className="pt-3 border-t border-plum/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-plum/60">
                      Editorial Sequence
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveSlide(index, "up")}
                        className="rounded-xl border border-plum/15 bg-[#FAF7F2] px-3 py-1.5 font-bold text-xs text-plum hover:bg-plum/10 disabled:opacity-30 cursor-pointer"
                      >
                        ▲ Move Earlier
                      </button>
                      <button
                        type="button"
                        disabled={index === lookbookSlides.length - 1}
                        onClick={() => handleMoveSlide(index, "down")}
                        className="rounded-xl border border-plum/15 bg-[#FAF7F2] px-3 py-1.5 font-bold text-xs text-plum hover:bg-plum/10 disabled:opacity-30 cursor-pointer"
                      >
                        ▼ Move Later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 5: STUDIO CONTACTS & CONCIERGE */}
        {/* ==================================================== */}
        {activeTab === "concierge" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5">
                <Sliders className="h-7 w-7 text-lavender-deep" />
                <span>Studio Concierge &amp; Direct Hotline</span>
              </h3>
              <p className="text-xs text-plum/60 mt-1">
                Configure primary WhatsApp phone number, physical studio address, and operating
                hours.
              </p>
            </div>

            <form
              onSubmit={handleSaveContacts}
              className="rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-plum/80 block mb-2">
                    Primary WhatsApp Hotline:
                  </label>
                  <input
                    type="text"
                    required
                    value={studioPhone}
                    onChange={(e) => setStudioPhone(e.target.value)}
                    className="w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 py-3 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                  />
                  <span className="text-[10px] text-plum/50 mt-1 block">
                    Clients will be directed here from WhatsApp booking buttons.
                  </span>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-plum/80 block mb-2">
                    Studio Location Label:
                  </label>
                  <input
                    type="text"
                    required
                    value={studioLocation}
                    onChange={(e) => setStudioLocation(e.target.value)}
                    className="w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 py-3 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-plum/80 block mb-2">
                    Studio Operating Hours:
                  </label>
                  <input
                    type="text"
                    required
                    value={studioHours}
                    onChange={(e) => setStudioHours(e.target.value)}
                    className="w-full rounded-2xl border border-plum/20 bg-[#FAF7F2] px-4 py-3 text-sm text-plum focus:border-plum focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-plum/10 flex items-center justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-lavender-deep active:scale-95 transition-all shadow-lg shadow-plum/20 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{contactSaved ? "Saved Successfully!" : "Save Studio Contacts"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODULE 6: PERFORMANCE & REVENUE ANALYTICS */}
        {/* ==================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-plum font-bold flex items-center gap-2.5">
                <BarChart3 className="h-7 w-7 text-lavender-deep" />
                <span>Performance &amp; Conversion Analytics</span>
              </h3>
              <p className="text-xs text-plum/60 mt-1">
                Real-time booking conversion, pipeline valuation, and client engagement metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <h4 className="font-display text-xl text-plum font-bold">
                  Appointment Conversion Pipeline
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Confirmed Sessions</span>
                      <span className="text-emerald-700 font-bold">{stats.confirmed}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-plum/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{
                          width: `${stats.total > 0 ? (stats.confirmed / stats.total) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Completed Artistry</span>
                      <span className="text-indigo-700 font-bold">{stats.completed}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-plum/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                        style={{
                          width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Pending Inquiries</span>
                      <span className="text-amber-800 font-bold">{stats.pending}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-plum/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-500"
                        style={{
                          width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-xl text-plum font-bold">
                    Financial &amp; Revenue Projection
                  </h4>
                  <p className="text-xs text-plum/60 mt-1">
                    Calculated from confirmed and pending bridal packages.
                  </p>
                </div>

                <div className="flex items-center justify-around py-4 border-y border-plum/10">
                  <div className="text-center">
                    <span className="font-display text-4xl font-bold text-emerald-700">
                      {stats.conversionRate}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-plum/50 block mt-1">
                      Inquiry Conversion
                    </span>
                  </div>

                  <div className="h-12 w-px bg-plum/10" />

                  <div className="text-center">
                    <span className="font-display text-4xl font-bold text-plum">
                      ₦{Math.round(stats.estimatedValue / (stats.total || 1)).toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-plum/50 block mt-1">
                      Avg Inquiry Value
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-plum/60">
                  <span>Fast WhatsApp response increases booking rate by 38%</span>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-lavender-deep hover:text-plum flex items-center gap-1 font-bold uppercase tracking-wider text-[11px]"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-md p-4 overflow-y-auto">
            <div className="relative w-full max-w-xl rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6 text-plum">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-plum/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-plum/5 text-plum border border-plum/15">
                    <Settings className="h-5 w-5 text-lavender-deep" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-plum font-bold">
                      Studio &amp; Suite Settings
                    </h3>
                    <p className="text-xs text-plum/60">
                      Manage administrator profile, workspace preferences, and security options.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7F2] text-plum/60 hover:bg-plum/10 hover:text-plum cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Settings Form */}
              <div className="space-y-5">
                {/* Profile Section */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-plum flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-lavender-deep" />
                    <span>Administrator Profile</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] text-plum/60 block mb-1 font-semibold">
                        Display Name:
                      </label>
                      <input
                        type="text"
                        value={currentAdminUser}
                        onChange={(e) => setCurrentAdminUser(e.target.value)}
                        className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-plum/60 block mb-1 font-semibold">
                        Role Designation:
                      </label>
                      <input
                        type="text"
                        value={adminRole}
                        onChange={(e) => setAdminRole(e.target.value)}
                        className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-plum/60 block mb-1 font-semibold">
                      Contact Email:
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full rounded-xl border border-plum/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-plum focus:border-plum focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Workspace Preferences */}
                <div className="border-t border-plum/10 pt-4 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-plum flex items-center gap-1.5">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-lavender-deep" />
                    <span>Workspace Preferences</span>
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10">
                      <div>
                        <span className="text-xs font-semibold text-plum block">
                          Sound Cues &amp; Audio Notifications
                        </span>
                        <span className="text-[10px] text-plum/50">
                          Play soft chime when new bridal inquiry is registered.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSoundNotifications(!soundNotifications)}
                        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          soundNotifications ? "bg-plum" : "bg-plum/20"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                            soundNotifications ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10">
                      <div>
                        <span className="text-xs font-semibold text-plum block">
                          Ambient Luxury Background Glow
                        </span>
                        <span className="text-[10px] text-plum/50">
                          Display soft blush and mauve background radial lighting.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAmbientGlow(!ambientGlow)}
                        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          ambientGlow ? "bg-plum" : "bg-plum/20"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                            ambientGlow ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10">
                      <div>
                        <span className="text-xs font-semibold text-plum block">
                          Auto-Refresh Interval
                        </span>
                        <span className="text-[10px] text-plum/50">
                          Automatically poll for new customer appointments.
                        </span>
                      </div>
                      <select
                        value={autoRefreshInterval}
                        onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
                        className="rounded-xl border border-plum/20 bg-white px-3 py-1.5 text-xs text-plum font-semibold focus:border-plum focus:outline-none"
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
                <div className="border-t border-plum/10 pt-4 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-plum flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-lavender-deep" />
                    <span>Security &amp; Active Session</span>
                  </h4>

                  <div className="rounded-2xl bg-[#FAF7F2] p-3.5 border border-plum/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-plum/70">
                      <span>Session Duration:</span>
                      <span className="font-semibold text-plum">8 Hours (HTTP-Only Cookie)</span>
                    </div>
                    <div className="flex items-center justify-between text-plum/70">
                      <span>Brute Force Lockout:</span>
                      <span className="font-semibold text-emerald-700">
                        Active (5 attempts / 30m lock)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-plum/70">
                      <span>Authorized Super-Admins:</span>
                      <span className="font-semibold text-plum">ajuhlouis, seddypluz</span>
                    </div>
                  </div>
                </div>

                {/* Data Backup Section */}
                <div className="border-t border-plum/10 pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const backupData = {
                        exportedAt: new Date().toISOString(),
                        appointments,
                        products: managedProducts,
                        pinnedProductIds,
                        announcements,
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
                    className="flex items-center gap-1.5 text-xs text-plum hover:text-lavender-deep font-semibold cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-lavender-deep" />
                    <span>Export Full Studio Backup (JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSettingsModalOpen(false);
                      toast.success("Studio & suite preferences updated.");
                    }}
                    className="flex items-center gap-2 rounded-xl bg-plum text-[#FAF9F5] px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-lavender-deep active:scale-95 transition-all cursor-pointer shadow-md shadow-plum/20"
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
