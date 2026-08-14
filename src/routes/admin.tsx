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
  ExternalLink,
  ChevronRight,
  ChevronLeft,
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
} from "lucide-react";
import {
  adminLogin,
  adminLogout,
  getAdminAuthStatus,
  getAppointments,
  updateAppointmentStatus,
} from "@/lib/appointments.functions";
import type { AppointmentRequest } from "@/integrations/firebase/appointments";
import { boutiqueProducts as initialBoutiqueProducts } from "@/components/boutique/data";
import type { Product } from "@/components/boutique/types";
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

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authChecking, setAuthChecking] = useState(false);

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

  // Boutique Inventory Controller State
  const [managedProducts, setManagedProducts] = useState<Product[]>(initialBoutiqueProducts);
  const [pinnedProductIds, setPinnedProductIds] = useState<string[]>([
    "hair_straight",
    "hair_wave",
    "lipstick_plum",
  ]);

  // Lookbook Carousel Manager State
  const [lookbookSlides, setLookbookSlides] =
    useState<LookbookSlideItem[]>(initialLookbookSlides);

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
    if (!passcodeInput.trim()) {
      toast.error("Please enter the studio passcode.");
      return;
    }

    setAuthChecking(true);
    try {
      await login({ data: { passcode: passcodeInput.trim() } });
      setIsAuthenticated(true);
      setPasscodeInput("");
      toast.success("Atelier Command Access Granted.");
      await loadData();
    } catch {
      setIsAuthenticated(false);
      toast.error("Invalid passcode. Access denied.");
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
    setPasscodeInput("");
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

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `seddypluz_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
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
              Enter your studio authorization passcode to manage bridal appointments, inventory, and front-end displays.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="relative">
              <input
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="••••••••"
                className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-center text-2xl tracking-[0.3em] text-amber-300 placeholder:tracking-normal placeholder:text-sm placeholder:text-white/30 outline-none transition-all focus:border-amber-300 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/20"
              />
            </div>

            <button
              type="submit"
              disabled={authChecking}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-plum text-xs uppercase tracking-[0.24em] font-bold shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {authChecking ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying Key...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Authorize Atelier Suite</span>
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

          {/* Quick Action Hub */}
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
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              <Eye className="h-3.5 w-3.5 text-amber-300" />
              <span>Live Site</span>
              <ArrowUpRight className="h-3 w-3 text-white/40" />
            </a>

            {/* Lock Session */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-rose-300 transition-all hover:bg-rose-500 hover:text-white active:scale-95 cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Lock Suite</span>
            </button>
          </div>
        </div>

        {/* Module Switcher Tabs Strip */}
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 border-t border-white/5">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
            {[
              { id: "appointments", label: "Appointments CRM", icon: Calendar, badge: stats.pending > 0 ? stats.pending : undefined },
              { id: "promos", label: "Promo & Banner", icon: Megaphone },
              { id: "boutique", label: "Wigs & Inventory", icon: ShoppingBag, badge: `${managedProducts.length}` },
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
                <span className="text-[10px] text-amber-300/80 mt-1 block">All registered brides</span>
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
                <span className="text-[10px] text-emerald-300/80 mt-1 block">Locked on studio calendar</span>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 sm:p-5 backdrop-blur-md">
                <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-300 block">
                  Completed Artistry
                </span>
                <span className="font-display text-3xl sm:text-4xl text-indigo-300 font-bold mt-1 block">
                  {stats.completed}
                </span>
                <span className="text-[10px] text-indigo-200/80 mt-1 block">Delivered sessions</span>
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
                        viewMode === "list" ? "bg-amber-400 text-plum shadow-xs" : "text-white/60 hover:text-white"
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode("kanban")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        viewMode === "kanban" ? "bg-amber-400 text-plum shadow-xs" : "text-white/60 hover:text-white"
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
                <p className="text-xs uppercase tracking-widest font-semibold">Loading Client Records...</p>
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
                                  setEditStatus(e.target.value as "pending" | "confirmed" | "declined" | "completed")
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
                              {updating ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
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
                                  <span className="text-[10px] text-white/50">{app.preferred_time}</span>
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
                  <h3 className="font-display text-2xl text-white">Announcement &amp; Voucher Editor</h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Modify the promotional marquee displayed across the top of both the homepage and shop page.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Status:</label>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white">
                  Boutique Catalog &amp; Homepage Pinning
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Manage inventory stock levels and select which items appear on the homepage preview.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-amber-400/10 border border-amber-400/30 px-3.5 py-2 text-xs font-bold text-amber-300">
                <Crown className="h-4 w-4" />
                <span>{pinnedProductIds.length} Products Pinned on Homepage</span>
              </div>
            </div>

            {/* Products Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managedProducts.map((product) => {
                const isPinned = pinnedProductIds.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-amber-400/30 transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-20 w-20 rounded-xl object-cover bg-[#F7EBE8] border border-white/10 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 truncate">
                            {product.categoryLabel}
                          </span>
                        </div>
                        <h4 className="font-sans font-bold text-sm text-white truncate mt-0.5">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-amber-300">{product.price}</span>
                          <span className="text-xs text-white/40 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-sans">
                      {product.desc}
                    </p>

                    {/* Controls Strip */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => togglePinProduct(product.id)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isPinned
                            ? "bg-amber-400 text-plum shadow-sm"
                            : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/15"
                        }`}
                      >
                        <Crown className="h-3 w-3" />
                        <span>{isPinned ? "Pinned on Home" : "Pin to Home"}</span>
                      </button>

                      <a
                        href={`https://wa.me/${studioPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hello Seddypluz Studio, checking availability for "${product.name}" (${product.price}).`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
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
                Reorder and curate the 4 signature bridal looks that expand and contract on the homepage hero section.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lookbookSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between space-y-3 backdrop-blur-md hover:border-amber-400/40 transition-all"
                >
                  <div className="relative h-56 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
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
                <h3 className="font-display text-2xl text-white">Studio Concierge &amp; Contact Synced Settings</h3>
                <p className="text-xs text-white/60 mt-1">
                  These hotline numbers and addresses are synchronized across the landing page footer, booking confirmation screen, and shop concierge.
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
                Real-time booking distribution, pipeline valuation, and popular bridal artistry breakdown.
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
                        <span className="text-amber-300 font-bold">{srv.pct}% ({srv.count} sessions)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full ${srv.color}`} style={{ width: `${srv.pct}%` }} />
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
      </main>
    </div>
  );
}
