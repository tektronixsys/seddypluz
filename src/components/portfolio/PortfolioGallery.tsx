import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Crown,
  Layers,
  Camera,
  Wand2,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroBride from "@/assets/hero-bride.jpg";
import glam1 from "@/assets/glam-1.jpg";
import gele1 from "@/assets/gele-1.jpg";
import products from "@/assets/products.jpg";
import photoshoot from "@/assets/photoshoot.jpg";
import eventGlam from "@/assets/event-glam.jpg";
import training from "@/assets/training.jpg";
import bridalAfter from "@/assets/bridal_after.png";

export interface PortfolioItem {
  id: string;
  title: string;
  category: "all" | "bridal" | "gele" | "editorial" | "transformations";
  categoryLabel: string;
  tag: string;
  technique: string;
  description: string;
  src: string;
  spanClass: string;
  aspect: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: "p1",
    title: "The Royal Gold Gele & Bridal Glow",
    category: "bridal",
    categoryLabel: "Bridal & Royalty",
    tag: "Bridal · Couture",
    technique: "Sculpted Infinity Pleat & 18h HD Base",
    description:
      "Handcrafted metallic golden aso-oke gele paired with rich warm bronze undertones, customized winged liner, and tear-resistant bridal foundation.",
    src: heroBride,
    spanClass: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto md:h-full",
  },
  {
    id: "p2",
    title: "Lavender Velvet & Glass Skin",
    category: "editorial",
    categoryLabel: "Editorial & Glam",
    tag: "Editorial Glam",
    technique: "Dewy Glass Finish & Plum Ombré Lip",
    description:
      "Camera-calibrated high-definition glow formulated specifically for high-power strobe lighting and magazine editorial spreads.",
    src: glam1,
    spanClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p3",
    title: "Regal Amethyst Crown Artistry",
    category: "gele",
    categoryLabel: "Gele Artistry",
    tag: "Gele · Heritage",
    technique: "Architectural 14-Layer Pleating",
    description:
      "Bespoke traditional Nigerian engagement headwrap folded with mathematical precision and lasting comfort for multi-hour ceremonies.",
    src: gele1,
    spanClass: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto md:h-full",
  },
  {
    id: "p4",
    title: "The Atelier Mineral Palette",
    category: "editorial",
    categoryLabel: "Studio Craft",
    tag: "Studio Formulation",
    technique: "Botanical Skincare & Custom Pigments",
    description:
      "Curated hypoallergenic bases and organic hydrators that create the canvas for every long-lasting Seddypluz transformation.",
    src: products,
    spanClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p5",
    title: "Contemporary African Haute Elegance",
    category: "editorial",
    categoryLabel: "Editorial & Glam",
    tag: "High Fashion",
    technique: "Matte Velvet & Sculpted Contours",
    description:
      "Striking editorial portrait exploring depth, sharp bone architecture, and understated regal posture for fashion lookbooks.",
    src: photoshoot,
    spanClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p6",
    title: "Bespoke Bridal Metamorphosis",
    category: "transformations",
    categoryLabel: "Transformations",
    tag: "Bridal Transformation",
    technique: "Complete Royal Gele & Glam Suite",
    description:
      "A complete bridal metamorphosis honoring natural features while elevating the bride into radiant, camera-ready magnificence.",
    src: bridalAfter,
    spanClass: "md:col-span-2 md:row-span-1",
    aspect: "aspect-[16/10] md:aspect-auto md:h-full",
  },
  {
    id: "p7",
    title: "Bridal Party & Entourage Harmonies",
    category: "bridal",
    categoryLabel: "Bridal & Royalty",
    tag: "Bridal Party",
    technique: "Harmonized Cohesive Tone Suite",
    description:
      "Seamless aesthetic coordination across the bridal train, creating unforgettable visual harmony in ceremony and reception photography.",
    src: eventGlam,
    spanClass: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto md:h-full",
  },
  {
    id: "p8",
    title: "Masterclass Atelier Mentorship",
    category: "editorial",
    categoryLabel: "Education",
    tag: "Masterclass",
    technique: "Professional Pro-Artist Intensive",
    description:
      "Exclusive hands-on masterclass sessions training emerging and professional makeup artists in luxury bridal techniques.",
    src: training,
    spanClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
  },
];

const categoryFilters = [
  { key: "all", label: "All Commissions" },
  { key: "bridal", label: "Bridal & Royalty" },
  { key: "gele", label: "Gele Artistry" },
  { key: "editorial", label: "Editorial & Glam" },
  { key: "transformations", label: "Transformations" },
];

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return portfolioData;
    return portfolioData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handleOpenLightbox = (index: number) => {
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

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#FAF9F5] py-28 md:py-40">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 h-[600px] w-[600px] rounded-full bg-mauve/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-lavender/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-8 rounded-full bg-lavender-deep" />
              <p className="eyebrow text-lavender-deep">Curated Atelier Gallery</p>
            </div>
            <h2 className="font-display text-5xl leading-[1] text-plum md:text-7xl">
              A quiet gallery
              <br />
              <em className="text-lavender-deep">of moments.</em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm md:text-base leading-relaxed text-plum/70">
              Selected commissions across high-society Nigerian weddings, royal engagements, runway
              editorials, and masterclass cohorts.
            </p>
          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categoryFilters.map((tab) => {
            const count =
              tab.key === "all"
                ? portfolioData.length
                : portfolioData.filter((i) => i.category === tab.key).length;
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`group flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20 scale-[1.02]"
                    : "bg-white text-plum/70 hover:bg-plum/5 hover:text-plum border border-plum/10"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                    isActive
                      ? "bg-amber-400 text-plum"
                      : "bg-plum/5 text-plum/50 group-hover:bg-plum/10"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
          {filteredItems.map((item, index) => (
            <figure
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className={`group relative overflow-hidden rounded-[2rem] bg-plum/5 border border-plum/10 shadow-[0_12px_36px_-10px_rgba(82,58,77,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(82,58,77,0.18)] cursor-pointer ${item.spanClass}`}
            >
              {/* Main Image */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.08]"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              {/* Top Floating Tag & Zoom Icon */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 opacity-0 transform -translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FAF9F5] border border-white/30">
                  <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                  {item.tag}
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30 shadow-md transition-transform hover:scale-110">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>

              {/* Bottom Details Card Overlay */}
              <figcaption className="absolute inset-x-4 bottom-4 z-10 flex flex-col justify-end text-ivory opacity-0 transform translate-y-3 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-300">
                  {item.technique}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-white font-medium leading-snug mt-1">
                  {item.title}
                </h3>
                <div className="mt-2 flex items-center justify-between border-t border-white/20 pt-2 text-[11px] text-ivory/70">
                  <span>Click to view look details</span>
                  <span className="font-display italic text-amber-300 text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <Dialog
        open={selectedItemIndex !== null}
        onOpenChange={(open) => !open && handleCloseLightbox()}
      >
        {selectedItem && (
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-plum border border-white/15 text-ivory rounded-[2.5rem] shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
              {/* Image Showcase Column */}
              <div className="md:col-span-7 relative bg-black/40 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-full max-h-[70vh] object-cover"
                />

                {/* Lightbox Nav Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-plum transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-plum transition-all cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Storytelling & Action Column */}
              <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300 border border-amber-400/30">
                      <Sparkles className="h-3 w-3" />
                      {selectedItem.tag}
                    </span>
                    <span className="text-xs text-ivory/50">
                      Look {String(selectedItemIndex! + 1).padStart(2, "0")} of{" "}
                      {filteredItems.length}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight">
                    {selectedItem.title}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-amber-300">
                        Technique &amp; Base:
                      </p>
                      <p className="mt-0.5 text-xs text-ivory/80 font-sans">
                        {selectedItem.technique}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-ivory/75 font-sans">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/2348162292997?text=${encodeURIComponent(
                      `Hello Seddypluz! I love the "${selectedItem.title}" (${selectedItem.tag}) look from your portfolio and would like to inquire about booking it for my event.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <MessageCircle className="h-4.5 w-4.5 fill-current" />
                    <span>Inquire This Signature Look</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={handleCloseLightbox}
                    className="flex items-center justify-center w-full rounded-full bg-white/10 hover:bg-white/20 text-white py-3 text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all"
                  >
                    <span>Reserve Date In Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
