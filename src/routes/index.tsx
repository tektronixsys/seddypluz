import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { submitAppointment } from "@/lib/appointments.functions";
import heroBride from "@/assets/hero-bride.jpg";
import glam1 from "@/assets/glam-1.jpg";
import gele1 from "@/assets/gele-1.jpg";
import transformation from "@/assets/transformation.jpg";
import products from "@/assets/products.jpg";
import eventGlam from "@/assets/event-glam.jpg";
import photoshoot from "@/assets/photoshoot.jpg";
import training from "@/assets/training.jpg";
import artist from "@/assets/artist.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  { n: "01", name: "Bridal Makeup", desc: "Bespoke bridal artistry crafted for your once-in-a-lifetime moment." },
  { n: "02", name: "Gele Styling", desc: "Sculptural headwrap artistry celebrating heritage with couture precision." },
  { n: "03", name: "Professional Makeup", desc: "Signature glam for the woman who commands every room she enters." },
  { n: "04", name: "Beauty Transformation", desc: "A studio experience that reveals the face you already carry within." },
  { n: "05", name: "Beauty Training", desc: "Intimate masterclasses for artists shaping the next chapter of beauty." },
  { n: "06", name: "Home Service Makeup", desc: "The studio, arrived — private, unhurried, entirely yours." },
  { n: "07", name: "Photoshoot Makeup", desc: "Camera-luminous finishes tuned for editorial and campaign light." },
  { n: "08", name: "Event Glam", desc: "Statement looks for galas, soirées, and every night worth remembering." },
];

const portfolio = [
  { src: heroBride, alt: "Bride in gold gele", tag: "Bridal · Editorial", span: "row-span-2" },
  { src: glam1, alt: "Lavender glam close-up", tag: "Event Glam", span: "" },
  { src: gele1, alt: "Purple gele styling", tag: "Gele · Traditional", span: "row-span-2" },
  { src: products, alt: "Makeup flatlay", tag: "Studio", span: "" },
  { src: photoshoot, alt: "Editorial photoshoot", tag: "Photoshoot", span: "" },
  { src: transformation, alt: "Before and after", tag: "Transformation", span: "" },
  { src: eventGlam, alt: "Bridal party glam", tag: "Bridal Party", span: "row-span-2" },
  { src: training, alt: "Beauty training class", tag: "Training", span: "" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM",
];

const appointmentFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().max(30, "Phone number is too long").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  appointmentDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  notes: z.string().max(1000, "Note is too long").optional().or(z.literal("")),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      appointmentDate: "",
      preferredTime: "",
      notes: "",
    },
  });

  const submit = useServerFn(submitAppointment);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitting(true);
    try {
      await submit({ data: values });
      toast.success("Your appointment request has been sent.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-2xl italic tracking-tight text-plum">Seddypluz</span>
            <span className="eyebrow text-lavender-deep">Beauty Studio</span>
          </a>
          <div className="hidden items-center gap-10 md:flex">
            {["Services", "Portfolio", "Studio", "Journal", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.28em] text-plum/80 transition-colors hover:text-lavender-deep"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden border border-plum/30 px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-plum transition-colors hover:bg-plum hover:text-ivory md:inline-block"
          >
            Book
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-blush)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-halo)" }} />

        <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 pt-32 pb-16 md:grid-cols-12 md:gap-8 md:px-12 md:pt-40 md:pb-24">
          <div className="md:col-span-6 md:pt-16">
            <p className="eyebrow animate-float-up text-lavender-deep" style={{ animationDelay: "0.1s" }}>
              — Est. Luxury Beauty Atelier
            </p>
            <h1
              className="mt-8 animate-float-up font-display text-[3.5rem] leading-[0.95] tracking-tight text-plum md:text-[6.5rem]"
              style={{ animationDelay: "0.25s" }}
            >
              Where the
              <br />
              <em className="font-normal text-lavender-deep">quiet art</em>
              <br />
              of beauty
              <br />
              becomes ritual.
            </h1>
            <p
              className="mt-10 max-w-md animate-float-up text-base leading-relaxed text-plum/70"
              style={{ animationDelay: "0.4s" }}
            >
              Seddypluz Beauty Studio composes bridal, editorial, and transformative
              makeup for the woman who moves through the world with intention.
            </p>
            <div
              className="mt-10 flex animate-float-up flex-wrap items-center gap-4"
              style={{ animationDelay: "0.55s" }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border border-plum bg-plum px-8 py-4 text-xs uppercase tracking-[0.32em] text-ivory transition-all hover:bg-lavender-deep hover:border-lavender-deep"
              >
                Reserve a session
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#portfolio"
                className="text-xs uppercase tracking-[0.32em] text-plum/70 underline-offset-8 hover:underline"
              >
                View the portfolio
              </a>
            </div>
          </div>

          <div className="relative md:col-span-6">
            <div
              className="relative aspect-[4/5] w-full animate-veil-in overflow-hidden"
              style={{ boxShadow: "var(--shadow-bloom)" }}
            >
              <img
                src={heroBride}
                alt="Seddypluz Beauty Studio bridal editorial"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory">
                <div>
                  <p className="eyebrow opacity-80">Featured · Vol. IV</p>
                  <p className="mt-2 font-display text-2xl italic">Her Royal Moment</p>
                </div>
                <span className="font-display text-4xl italic">01</span>
              </div>
            </div>
            <div className="absolute -left-6 -top-6 hidden md:block">
              <div className="animate-shimmer flex h-24 w-24 items-center justify-center rounded-full border border-lavender-deep/40 text-plum">
                <span className="eyebrow">Vol · IV</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-plum/10">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-12 gap-y-4 px-6 py-6 md:px-12">
            <span className="eyebrow text-plum/50">Featured In</span>
            {["Vogue Nigeria", "Bella Naija Weddings", "ThisDay Style", "Genevieve", "Bridal Ovation"].map((n) => (
              <span key={n} className="font-display text-lg italic text-plum/60">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-lavender-deep">The Atelier</p>
              <h2 className="mt-6 font-display text-5xl leading-[1] text-plum md:text-7xl">
                Services,<br /><em className="text-lavender-deep">rendered</em><br /> with reverence.
              </h2>
              <p className="mt-8 max-w-sm text-plum/70">
                Eight signature offerings — each one a slow, considered practice.
                Booked by consultation only.
              </p>
            </div>

            <div className="md:col-span-8">
              <ul className="divide-y divide-plum/15 border-y border-plum/15">
                {services.map((s) => (
                  <li
                    key={s.n}
                    className="group grid grid-cols-12 items-baseline gap-4 py-8 transition-colors hover:bg-blush-soft/60"
                  >
                    <span className="col-span-2 font-display text-2xl italic text-lavender-deep/80 md:col-span-1">
                      {s.n}
                    </span>
                    <h3 className="col-span-10 font-display text-3xl text-plum md:col-span-4 md:text-4xl">
                      {s.name}
                    </h3>
                    <p className="col-span-12 text-sm leading-relaxed text-plum/65 md:col-span-6">
                      {s.desc}
                    </p>
                    <span className="col-span-12 flex justify-end text-plum/40 transition-all group-hover:translate-x-1 group-hover:text-lavender-deep md:col-span-1">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO — MASONRY */}
      <section id="portfolio" className="relative overflow-hidden bg-blush-soft/50 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-lavender-deep">The Portfolio</p>
              <h2 className="mt-6 font-display text-5xl leading-[1] text-plum md:text-7xl">
                A quiet gallery<br /><em className="text-lavender-deep">of moments.</em>
              </h2>
            </div>
            <p className="max-w-sm text-plum/70 md:text-right">
              Selected work from brides, campaigns, and editorial commissions —
              curated across seasons.
            </p>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {portfolio.map((p, i) => (
              <figure
                key={i}
                className={`group relative overflow-hidden ${p.span}`}
                style={{ boxShadow: "var(--shadow-petal)" }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--gradient-veil)" }}
                />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="eyebrow">{p.tag}</span>
                  <span className="font-display text-lg italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO / ABOUT */}
      <section id="studio" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
            <div className="md:col-span-6">
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{ boxShadow: "var(--shadow-bloom)" }}
              >
                <img src={artist} alt="Seddypluz at work" width={1000} height={1250} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="md:col-span-6 md:pl-12">
              <p className="eyebrow text-lavender-deep">The Studio</p>
              <h2 className="mt-6 font-display text-5xl leading-[1] text-plum md:text-6xl">
                <em>Seddypluz</em> — a hand
                <br />that reads the face
                <br />like a letter.
              </h2>
              <div className="mt-10 space-y-6 text-plum/75">
                <p className="text-base leading-relaxed">
                  Founded on the belief that beauty is a slow conversation between
                  skin, light, and story — Seddypluz Beauty Studio has painted
                  hundreds of brides and campaigns across Lagos, Abuja, and beyond.
                </p>
                <p className="text-base leading-relaxed">
                  Every session begins with silence, coffee, and a mirror. What
                  follows is not a look, but a portrait.
                </p>
              </div>

              <dl className="mt-12 grid grid-cols-3 border-t border-plum/15">
                {[
                  { k: "10+", v: "Years" },
                  { k: "500+", v: "Brides" },
                  { k: "40+", v: "Editorial" },
                ].map((s) => (
                  <div key={s.v} className="border-r border-plum/15 py-6 last:border-r-0">
                    <dt className="font-display text-4xl italic text-lavender-deep md:text-5xl">{s.k}</dt>
                    <dd className="eyebrow mt-2 text-plum/60">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: "var(--gradient-blush)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="eyebrow text-lavender-deep">Words · From Her Brides</p>
          <blockquote className="mt-10 font-display text-3xl leading-[1.15] text-plum md:text-5xl">
            <span className="text-lavender-deep">“</span>
            She did not paint my face. She discovered it.
            The mirror showed me a woman I had been carrying quietly for years.
            <span className="text-lavender-deep">”</span>
          </blockquote>
          <p className="mt-10 eyebrow text-plum/60">— Adaeze O., Bride · Ikoyi, Lagos</p>
        </div>
      </section>

      {/* JOURNAL / RECENT */}
      <section id="journal" className="py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="eyebrow text-lavender-deep">Journal</p>
              <h2 className="mt-6 font-display text-5xl leading-[1] text-plum md:text-6xl">
                Notes from<br /><em className="text-lavender-deep">the vanity.</em>
              </h2>
            </div>
            <a href="#" className="hidden text-xs uppercase tracking-[0.3em] text-plum/70 underline-offset-8 hover:underline md:inline">All entries →</a>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              { img: photoshoot, tag: "Editorial", title: "The New Bridal Palette", date: "March 2026" },
              { img: gele1, tag: "Tradition", title: "Gele as Sculpture", date: "February 2026" },
              { img: products, tag: "Studio", title: "Inside the Kit", date: "January 2026" },
            ].map((a) => (
              <article key={a.title} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={a.img} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-6 text-lavender-deep">{a.tag} · {a.date}</p>
                <h3 className="mt-3 font-display text-3xl text-plum group-hover:italic">{a.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-plum py-28 text-ivory md:py-40">
        <div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--lavender)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--mauve)" }}
        />
        <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-mauve">Reserve · By Invitation</p>
            <h2 className="mt-6 font-display text-5xl leading-[1] md:text-7xl">
              Let us hold<br /><em className="text-mauve">the mirror</em><br />for you.
            </h2>
            <p className="mt-8 max-w-md text-ivory/70">
              Sessions are booked by consultation. Share a few notes and we'll
              return with dates, dossier, and a quiet welcome.
            </p>

            <div className="mt-12 space-y-6 text-sm">
              <div>
                <p className="eyebrow text-mauve">Studio</p>
                <p className="mt-2 text-ivory/80">Shop 4/5 Gizo Plaza, Nafdac Area, Kaduna</p>
              </div>
              <div>
                <p className="eyebrow text-mauve">Correspondence</p>
                <p className="mt-2 text-ivory/80">ask@seddypluz.com.ng</p>
                <p className="text-ivory/80">+234 · 816 · 229 · 2997</p>
              </div>
              <div>
                <p className="eyebrow text-mauve">Elsewhere</p>
                <p className="mt-2 text-ivory/80">Instagram · TikTok · Pinterest</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 md:col-span-6 md:pl-8"
          >
            <div>
              <label className="eyebrow text-mauve">Your name</label>
              <input
                type="text"
                placeholder="As you'd like to be called"
                {...form.register("name")}
                className="mt-3 w-full border-b border-ivory/25 bg-transparent pb-3 text-lg text-ivory placeholder-ivory/35 outline-none transition-colors focus:border-mauve"
              />
              {form.formState.errors.name && (
                <p className="mt-2 text-xs text-mauve">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div>
                <label className="eyebrow text-mauve">Email</label>
                <input
                  type="email"
                  placeholder="you@correspondence"
                  {...form.register("email")}
                  className="mt-3 w-full border-b border-ivory/25 bg-transparent pb-3 text-lg text-ivory placeholder-ivory/35 outline-none transition-colors focus:border-mauve"
                />
                {form.formState.errors.email && (
                  <p className="mt-2 text-xs text-mauve">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="eyebrow text-mauve">Phone</label>
                <input
                  type="tel"
                  placeholder="+234 · 000 · 000 · 0000"
                  {...form.register("phone")}
                  className="mt-3 w-full border-b border-ivory/25 bg-transparent pb-3 text-lg text-ivory placeholder-ivory/35 outline-none transition-colors focus:border-mauve"
                />
              </div>
            </div>

            <div>
              <label className="eyebrow text-mauve">Service</label>
              <select
                {...form.register("service")}
                className="mt-3 w-full border-b border-ivory/25 bg-transparent bg-none pb-3 text-lg text-ivory outline-none transition-colors focus:border-mauve"
              >
                <option value="" className="bg-plum text-ivory">Select a service</option>
                {services.map((s) => (
                  <option key={s.n} value={s.name} className="bg-plum text-ivory">
                    {s.name}
                  </option>
                ))}
              </select>
              {form.formState.errors.service && (
                <p className="mt-2 text-xs text-mauve">{form.formState.errors.service.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div>
                <label className="eyebrow text-mauve">Preferred date</label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "mt-3 w-full justify-start border-0 border-b border-ivory/25 bg-transparent pb-3 pl-0 text-left text-lg font-normal hover:bg-ivory/5 hover:text-ivory",
                        !form.watch("appointmentDate") && "text-ivory/35"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-ivory/60" />
                      {form.watch("appointmentDate")
                        ? format(new Date(form.watch("appointmentDate")), "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch("appointmentDate") ? new Date(form.watch("appointmentDate")) : undefined}
                      onSelect={(date) => {
                        form.setValue("appointmentDate", date ? format(date, "yyyy-MM-dd") : "", { shouldValidate: true });
                        setCalendarOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.appointmentDate && (
                  <p className="mt-2 text-xs text-mauve">{form.formState.errors.appointmentDate.message}</p>
                )}
              </div>

              <div>
                <label className="eyebrow text-mauve">Preferred time</label>
                <select
                  {...form.register("preferredTime")}
                  className="mt-3 w-full border-b border-ivory/25 bg-transparent bg-none pb-3 text-lg text-ivory outline-none transition-colors focus:border-mauve"
                >
                  <option value="" className="bg-plum text-ivory">Select a time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="bg-plum text-ivory">
                      {t}
                    </option>
                  ))}
                </select>
                {form.formState.errors.preferredTime && (
                  <p className="mt-2 text-xs text-mauve">{form.formState.errors.preferredTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="eyebrow text-mauve">A note</label>
              <textarea
                rows={4}
                placeholder="Anything you would like us to hold in mind."
                {...form.register("notes")}
                className="mt-3 w-full resize-none border-b border-ivory/25 bg-transparent pb-3 text-lg text-ivory placeholder-ivory/35 outline-none focus:border-mauve"
              />
              {form.formState.errors.notes && (
                <p className="mt-2 text-xs text-mauve">{form.formState.errors.notes.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group mt-4 inline-flex items-center gap-3 border border-mauve bg-mauve px-8 py-4 text-xs uppercase tracking-[0.32em] text-plum transition-all hover:bg-ivory hover:border-ivory disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send inquiry"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-plum/10 bg-background py-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 text-xs text-plum/60 md:flex-row md:px-12">
          <p className="font-display italic text-lg text-plum">Seddypluz Beauty Studio</p>
          <p className="eyebrow">© 2026 · All artistry reserved</p>
        </div>
      </footer>
    </div>
  );
}
