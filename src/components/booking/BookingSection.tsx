import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  CalendarIcon,
  Sparkles,
  Crown,
  Scissors,
  Wand2,
  GraduationCap,
  Plane,
  Camera,
  PartyPopper,
  MessageCircle,
  CheckCircle2,
  Clock,
  Send,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { submitAppointment } from "@/lib/appointments.functions";

const bookingServices = [
  {
    id: "bridal",
    name: "Bridal Makeup",
    icon: Crown,
    desc: "Bespoke bridal artistry crafted for your once-in-a-lifetime moment.",
    badge: "Most Requested",
  },
  {
    id: "gele",
    name: "Gele Styling",
    icon: Scissors,
    desc: "Sculptural headwrap artistry celebrating heritage with couture precision.",
    badge: "Heritage",
  },
  {
    id: "pro",
    name: "Professional Makeup",
    icon: Wand2,
    desc: "Signature glam for the woman who commands every room she enters.",
    badge: "Signature",
  },
  {
    id: "trans",
    name: "Beauty Transformation",
    icon: Sparkles,
    desc: "A studio experience that reveals the face you already carry within.",
    badge: "Iconic",
  },
  {
    id: "train",
    name: "Beauty Training",
    icon: GraduationCap,
    desc: "Intimate masterclasses for artists shaping the next chapter of beauty.",
    badge: "Masterclass",
  },
  {
    id: "home",
    name: "Home Service Makeup",
    icon: Plane,
    desc: "The studio, arrived — private, unhurried, entirely yours.",
    badge: "VIP Travel",
  },
  {
    id: "photo",
    name: "Photoshoot Makeup",
    icon: Camera,
    desc: "Camera-luminous finishes tuned for editorial and campaign light.",
    badge: "Editorial",
  },
  {
    id: "event",
    name: "Event Glam",
    icon: PartyPopper,
    desc: "Statement looks for galas, soirées, and every night worth remembering.",
    badge: "Evening",
  },
];

const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

const appointmentFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  appointmentDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  notes: z.string().max(1000, "Note is too long").optional().or(z.literal("")),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function BookingSection() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<AppointmentFormValues | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Bridal Makeup",
      appointmentDate: "",
      preferredTime: "10:00 AM",
      notes: "",
    },
  });

  const selectedService = form.watch("service");
  const selectedTime = form.watch("preferredTime");
  const selectedDate = form.watch("appointmentDate");

  const submit = useServerFn(submitAppointment);

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitting(true);
    try {
      await submit({ data: values });
      setSubmittedData(values);
      toast.success("Your appointment inquiry has been registered!", {
        description: "Click below to fast-track your booking via WhatsApp.",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const generateWhatsAppUrl = (data: AppointmentFormValues) => {
    const formattedDate = data.appointmentDate
      ? format(new Date(data.appointmentDate), "EEEE, MMMM d, yyyy")
      : "Pending Selection";
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
      notes: "",
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-plum py-14 text-ivory md:py-24">
      {/* Dynamic ambient blobs */}
      <div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--lavender)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--mauve)" }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Studio Address & Info */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4 border border-white/15">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Reserve · By Consultation</span>
              </div>
              <h2 className="font-display text-5xl leading-[1.05] md:text-7xl text-white">
                Let us hold
                <br />
                <em className="text-amber-300">the mirror</em>
                <br />
                for you.
              </h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-ivory/75">
                Sessions are booked by consultation. Complete the form to reserve your date on our
                calendar, or connect directly on WhatsApp for priority scheduling.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-amber-300/90">
                    Physical Studio
                  </p>
                  <p className="mt-1 text-sm text-ivory/85">
                    Shop 4/5 Gizo Plaza, Nafdac Area, Kaduna, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-amber-300/90">
                    Correspondence
                  </p>
                  <p className="mt-1 text-sm text-ivory/85">ask@seddypluz.com.ng</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-amber-300/90">
                    Direct Line &amp; WhatsApp
                  </p>
                  <a
                    href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20a%20session."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm font-semibold text-ivory hover:text-amber-300 transition-colors"
                  >
                    +234 · 816 · 229 · 2997
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Guarantee Badge */}
            <div className="rounded-2xl bg-white/5 p-5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-300 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Guaranteed Dedicated Artistry
                  </h4>
                  <p className="text-[11px] text-ivory/70 mt-0.5">
                    We cap bridal bookings to ensure 100% focused, unhurried perfection on your day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form or Success Card */}
          <div className="lg:col-span-8">
            {submittedData ? (
              /* Confirmation Screen with 1-Click WhatsApp Fast Track */
              <div className="rounded-[2.5rem] bg-white/10 backdrop-blur-xl p-8 sm:p-12 border border-white/20 text-center animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 mb-6 shadow-inner">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3 border border-emerald-400/30">
                  Request Registered
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white">
                  Thank you, {submittedData.name}!
                </h3>
                <p className="mt-3 text-sm text-ivory/80 max-w-md mx-auto leading-relaxed">
                  Your appointment request has been logged. For instant calendar confirmation and
                  deposit processing, fast-track your inquiry via WhatsApp below:
                </p>

                {/* Booking Summary Card */}
                <div className="my-8 rounded-2xl bg-plum/60 p-6 text-left border border-white/10 max-w-lg mx-auto space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-ivory/60 uppercase tracking-wider">Service</span>
                    <span className="font-bold text-amber-300">{submittedData.service}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-ivory/60 uppercase tracking-wider">Requested Date</span>
                    <span className="font-semibold text-white">
                      {submittedData.appointmentDate
                        ? format(new Date(submittedData.appointmentDate), "EEEE, MMMM d, yyyy")
                        : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-ivory/60 uppercase tracking-wider">Preferred Time</span>
                    <span className="font-semibold text-white">{submittedData.preferredTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ivory/60 uppercase tracking-wider">Email</span>
                    <span className="text-white/90">{submittedData.email}</span>
                  </div>
                </div>

                {/* WhatsApp Fast-Track Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={generateWhatsAppUrl(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4.5 text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="h-5 w-5 fill-current" />
                    <span>Send to Studio on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white px-6 py-4.5 text-xs font-bold uppercase tracking-widest border border-white/20 transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Book Another Service</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Enhanced Booking Form */
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-[2.5rem] bg-white/5 backdrop-blur-xl p-8 sm:p-12 border border-white/15 shadow-2xl space-y-8"
              >
                {/* 1. Step: Select Service (Visual Cards) */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs uppercase tracking-widest font-bold text-amber-300">
                      Step 1 · Choose Your Service
                    </label>
                    <span className="text-[11px] text-ivory/60">
                      Selected: <strong className="text-white">{selectedService}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {bookingServices.map((srv) => {
                      const isSelected = selectedService === srv.name;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() =>
                            form.setValue("service", srv.name, { shouldValidate: true })
                          }
                          className={`group relative flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-400 text-plum border-amber-300 shadow-lg shadow-amber-400/20 scale-[1.02]"
                              : "bg-white/5 text-ivory/80 border-white/10 hover:bg-white/10 hover:border-white/25"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl mb-2 transition-colors ${
                              isSelected ? "bg-plum text-amber-300" : "bg-white/10 text-amber-300"
                            }`}
                          >
                            <srv.icon className="h-4.5 w-4.5" />
                          </div>
                          <span className="text-xs font-bold leading-tight font-sans">
                            {srv.name}
                          </span>
                          <span
                            className={`mt-1 text-[9px] uppercase tracking-wider font-semibold ${
                              isSelected ? "text-plum/80" : "text-ivory/50"
                            }`}
                          >
                            {srv.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {form.formState.errors.service && (
                    <p className="mt-2 text-xs text-rose-300">
                      {form.formState.errors.service.message}
                    </p>
                  )}
                </div>

                {/* 2. Step: Date & Time Picker */}
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-amber-300 mb-4 block">
                    Step 2 · Select Preferred Date &amp; Time
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Calendar Popover */}
                    <div className="md:col-span-5">
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start rounded-2xl border-white/20 bg-white/10 px-4 text-left text-sm font-medium text-white hover:bg-white/15 hover:text-white border",
                              !selectedDate && "text-ivory/50",
                            )}
                          >
                            <CalendarIcon className="mr-3 h-4 w-4 text-amber-300" />
                            {selectedDate
                              ? format(new Date(selectedDate), "MMM d, yyyy")
                              : "Pick Appointment Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-plum border border-white/20 text-ivory rounded-2xl shadow-2xl"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={selectedDate ? new Date(selectedDate) : undefined}
                            onSelect={(date) => {
                              form.setValue(
                                "appointmentDate",
                                date ? format(date, "yyyy-MM-dd") : "",
                                { shouldValidate: true },
                              );
                              setCalendarOpen(false);
                            }}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                            className={cn("p-3 pointer-events-auto text-white")}
                          />
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.appointmentDate && (
                        <p className="mt-2 text-xs text-rose-300">
                          {form.formState.errors.appointmentDate.message}
                        </p>
                      )}
                    </div>

                    {/* Time Slot Chips */}
                    <div className="md:col-span-7">
                      <div className="flex flex-wrap gap-2">
                        {availableTimeSlots.map((slot) => {
                          const isSlotActive = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() =>
                                form.setValue("preferredTime", slot, { shouldValidate: true })
                              }
                              className={`rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                isSlotActive
                                  ? "bg-amber-400 text-plum shadow-md scale-105"
                                  : "bg-white/5 text-ivory/70 border border-white/10 hover:bg-white/15"
                              }`}
                            >
                              <Clock className="inline-block h-3 w-3 mr-1 -mt-0.5" />
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      {form.formState.errors.preferredTime && (
                        <p className="mt-2 text-xs text-rose-300">
                          {form.formState.errors.preferredTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Step: Personal Details & Contact */}
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-amber-300 mb-4 block">
                    Step 3 · Client Contact Details
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        {...form.register("name")}
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
                      />
                      {form.formState.errors.name && (
                        <p className="mt-1.5 text-xs text-rose-300">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        {...form.register("email")}
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
                      />
                      {form.formState.errors.email && (
                        <p className="mt-1.5 text-xs text-rose-300">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number"
                        {...form.register("phone")}
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
                      />
                      {form.formState.errors.phone && (
                        <p className="mt-1.5 text-xs text-rose-300">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <textarea
                      rows={3}
                      placeholder="Event details, location, skin notes, or inspiration..."
                      {...form.register("notes")}
                      className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-ivory/40 outline-none transition-colors focus:border-amber-300 focus:bg-white/10"
                    />
                  </div>
                </div>

                {/* Submit & WhatsApp Fast Track Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 text-plum px-9 py-4.5 text-xs font-bold uppercase tracking-[0.25em] shadow-xl shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {submitting ? "Registering Request..." : "Register Booking Request"}
                    </span>
                  </button>

                  <a
                    href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio!%20I'd%20like%20to%20inquire%20about%20booking%20a%20bridal%20or%20glam%20session."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-ivory px-6 py-4.5 text-xs font-bold uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    <span>Direct WhatsApp Inquiry</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
