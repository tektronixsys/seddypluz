import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  Filter,
  Search,
  Clock3,
  Check,
  User,
  RefreshCw,
  Lock,
} from "lucide-react";
import {
  adminLogin,
  adminLogout,
  getAdminAuthStatus,
  getAppointments,
  updateAppointmentStatus,
} from "@/lib/appointments.functions";
import type { AppointmentRequest } from "@/integrations/firebase/appointments";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const getAuthStatus = useServerFn(getAdminAuthStatus);
  const fetchAppointments = useServerFn(getAppointments);
  const updateStatus = useServerFn(updateAppointmentStatus);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authChecking, setAuthChecking] = useState(false);

  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<"pending" | "confirmed" | "declined" | "completed">("pending");
  const [editNotes, setEditNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const verifySession = async (suppressToast = true) => {
    setAuthChecking(true);
    try {
      const status = await getAuthStatus();
      const authenticated = status.authenticated;
      setIsAuthenticated(authenticated);
      if (authenticated) {
        await loadData();
      } else if (!suppressToast) {
        toast.error("Session expired. Please login again.");
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
      toast.error("Please enter the passcode.");
      return;
    }

    setAuthChecking(true);
    try {
      await login({ data: { passcode: passcodeInput.trim() } });
      setIsAuthenticated(true);
      setPasscodeInput("");
      toast.success("Atelier Access Granted.");
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
      // Even if remote logout fails, clear local admin state.
    }
    setIsAuthenticated(false);
    setPasscodeInput("");
    setAppointments([]);
    toast.success("Atelier locked.");
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
        toast.error("Session expired. Please login again.");
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
      toast.success("Appointment request updated successfully.");
      setEditingId(null);
      loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update.");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "declined":
        return "bg-rose-500/10 text-rose-600 border border-rose-500/20";
      case "completed":
        return "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20 animate-pulse";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Check className="h-3 w-3 shrink-0" />;
      case "declined":
        return <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />;
      case "completed":
        return <User className="h-3 w-3 shrink-0" />;
      default:
        return <Clock3 className="h-3 w-3 shrink-0 animate-spin" style={{ animationDuration: "3s" }} />;
    }
  };

  const filtered = appointments.filter((app) => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  // 1. LOGIN SCREEN (Unauthenticated state)
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#FAF9F5] text-plum px-6 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-mauve/15 blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-lavender/20 blur-3xl opacity-70 pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl border border-plum/15 bg-white/70 p-8 md:p-10 shadow-[0_20px_50px_rgba(82,58,77,0.08)] backdrop-blur-xl z-10">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-plum/5 text-plum border border-plum/10 shadow-inner">
              <Lock className="h-5 w-5" />
            </div>
            <p className="eyebrow text-lavender-deep">— Administration</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-plum">Atelier Access</h2>
            <p className="mt-3 text-sm leading-relaxed text-plum/60">
              Please enter the studio passcode to view and manage client requests.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <input
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter Passcode"
                className="h-12 w-full rounded-xl border border-plum/15 bg-white/50 px-4 text-center text-lg tracking-widest text-plum placeholder:tracking-normal placeholder:text-sm placeholder:text-plum/30 outline-none transition-all focus:border-lavender-deep focus:ring-1 focus:ring-lavender-deep"
              />
            </div>

            <button
              type="submit"
              disabled={authChecking}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-plum text-xs uppercase tracking-[0.2em] font-bold text-white shadow-md transition-all hover:bg-plum-900 active:scale-[0.98] disabled:opacity-50"
            >
              {authChecking ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-plum/10 pt-6 text-center">
            <a href="/" className="text-xs uppercase tracking-wider text-plum/50 hover:text-plum">
              ← Return to website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD (Authenticated state)
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-plum">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-[#FDFBF7]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl italic tracking-tight text-plum">Seddypluz</span>
            <span className="font-display eyebrow text-lavender-deep">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => loadData(true)}
              disabled={refreshing || loading}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-plum/10 bg-white transition-all hover:bg-plum/5 active:scale-95 disabled:opacity-50"
              title="Refresh requests"
            >
              <RefreshCw className={`h-4 w-4 text-plum ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="border border-plum/20 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-rose-600 hover:text-white hover:border-rose-600"
            >
              Lock Atelier
            </button>
            <a
              href="/"
              className="border border-plum/20 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-plum hover:text-[#FDFBF7]"
            >
              Atelier Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Banner header */}
        <div className="mb-10">
          <p className="eyebrow text-lavender-deep">— Administration</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-plum md:text-5xl">
            Appointment <em className="text-lavender-deep">inquiries & requests</em>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[
            { label: "Total Requests", val: stats.total, desc: "All inquiries" },
            { label: "Pending Review", val: stats.pending, desc: "Awaiting confirmation" },
            { label: "Confirmed Sessions", val: stats.confirmed, desc: "Booked and scheduled" },
            { label: "Completed Artistry", val: stats.completed, desc: "Delivered sessions" },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border border-plum/10 bg-white p-6 shadow-sm"
            >
              <p className="eyebrow text-lavender-deep/80">{stat.label}</p>
              <p className="mt-4 font-display text-4xl italic text-plum md:text-5xl">{stat.val}</p>
              <p className="mt-2 text-xs text-plum/50">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 flex flex-col gap-4 rounded-lg border border-plum/10 bg-white p-5 md:flex-row md:items-center md:justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-plum/40" />
            <input
              type="text"
              placeholder="Search by client, email, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-md border border-plum/10 bg-[#FDFBF7] pl-11 pr-4 text-sm text-plum outline-none focus:border-lavender-deep focus:ring-1 focus:ring-lavender-deep"
            />
          </div>

          {/* Status buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-plum/60 flex items-center gap-1.5 mr-2">
              <Filter className="h-3.5 w-3.5" /> Status:
            </span>
            {["all", "pending", "confirmed", "declined", "completed"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all rounded-md border ${
                  filterStatus === st
                    ? "bg-plum text-white border-plum"
                    : "bg-white text-plum/70 border-plum/10 hover:bg-plum/5"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg border border-plum/10 bg-white">
            <RefreshCw className="h-8 w-8 animate-spin text-lavender-deep" />
            <p className="text-sm font-medium text-plum/60">Loading appointment requests...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-plum/10 bg-white text-center p-6">
            <p className="font-display text-2xl italic text-plum/60">No matching requests found</p>
            <p className="text-sm text-plum/40">Try adjusting your status filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="group flex flex-col justify-between rounded-lg border border-plum/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Upper part */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl text-plum group-hover:italic">
                        {app.name}
                      </h3>
                      <p className="eyebrow mt-1 text-lavender-deep">{app.service}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusBadgeClass(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </span>
                  </div>

                  {/* Booking details */}
                  <div className="mt-6 space-y-3.5 border-t border-plum/5 pt-4 text-sm text-plum/80">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 shrink-0 text-lavender-deep" />
                      <span>{app.appointment_date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-lavender-deep" />
                      <span>{app.preferred_time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-lavender-deep" />
                      <a href={`mailto:${app.email}`} className="hover:underline text-plum/70">
                        {app.email}
                      </a>
                    </div>
                    {app.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-lavender-deep" />
                        <a href={`tel:${app.phone}`} className="hover:underline text-plum/70">
                          {app.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Notes / Comments */}
                  {app.notes && (
                    <div className="mt-4 rounded bg-[#FDFBF7] p-3 text-xs italic text-plum/70 border-l-2 border-lavender-deep/40">
                      <div className="flex gap-1.5 items-start">
                        <MessageSquare className="h-3.5 w-3.5 text-lavender-deep/60 mt-0.5 shrink-0" />
                        <span>"{app.notes}"</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lower part (Actions) */}
                <div className="mt-6 border-t border-plum/5 pt-4">
                  {editingId === app.id ? (
                    <div className="space-y-4 rounded-md border border-plum/10 bg-[#FDFBF7] p-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-semibold text-plum/60">
                          Set Status
                        </label>
                        <select
                          value={editStatus}
                          onChange={(e) =>
                            setEditStatus(
                              e.target.value as "pending" | "confirmed" | "declined" | "completed"
                            )
                          }
                          className="mt-2 w-full rounded border border-plum/10 bg-white p-2 text-sm text-plum outline-none focus:border-lavender-deep"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="declined">Declined</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-semibold text-plum/60">
                          Notes / Confirmation Details
                        </label>
                        <textarea
                          rows={3}
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Add confirmation info or client details..."
                          className="mt-2 w-full resize-none rounded border border-plum/10 bg-white p-2 text-sm text-plum outline-none focus:border-lavender-deep"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(app.id)}
                          disabled={updating}
                          className="flex-1 bg-plum px-3 py-2 text-xs uppercase tracking-wider text-[#FDFBF7] transition-all hover:bg-plum-900 disabled:opacity-60"
                        >
                          {updating ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          disabled={updating}
                          className="border border-plum/10 bg-white px-3 py-2 text-xs uppercase tracking-wider text-plum transition-all hover:bg-plum/5 disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(app.id);
                        setEditStatus(app.status);
                        setEditNotes(app.notes || "");
                      }}
                      className="w-full border border-plum bg-white py-2 text-xs uppercase tracking-[0.2em] text-plum transition-all hover:bg-plum hover:text-[#FDFBF7] active:scale-[0.98]"
                    >
                      Update Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
