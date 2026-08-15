import {
  Sparkles,
  Ruler,
  Gem,
  Scale,
  Scissors,
  Layers,
  Heart,
  Droplets,
  ShieldCheck,
} from "lucide-react";
import type { Product } from "./types";
import hairStraightImg from "@/assets/hair_straight.png";
import hairWaveImg from "@/assets/hair_wave.png";
import hairCurlImg from "@/assets/hair_curl.png";
import hairBobImg from "@/assets/hair_bob.png";
import lipstickImg from "@/assets/lipstick.png";
import highlighterImg from "@/assets/highlighter.png";
import brushImg from "@/assets/brush.png";

export const boutiqueProducts: Product[] = [
  {
    id: "hair_straight",
    name: "Bone Straight Virgin Weave",
    category: "wigs",
    categoryLabel: "Luxury Wigs & Extensions",
    desc: "Premium double-drawn bone straight hair extensions with a mirror-like gloss finish and complete cuticle alignment.",
    fullDesc:
      "Engineered from 100% single-donor virgin remy hair, our signature Bone Straight unit delivers unmatched glass-like gloss and ultra-dense blunt ends. Each bundle undergoes cold-water cuticle sealing to prevent frizz, tangling, or heat degradation.",
    img: hairStraightImg,
    price: "₦280,000",
    originalPrice: "₦350,000",
    numericPrice: 280000,
    bgClass: "bg-[#F7EBE8]",
    rating: 5.0,
    reviewCount: 48,
    badge: "Bestseller",
    discountBadge: "20% OFF",
    isBestseller: true,
    dots: [
      { color: "#121212", name: "22 Inch", priceFormatted: "₦280,000", numericPrice: 280000 },
      { color: "#1C1C1C", name: "24 Inch", priceFormatted: "₦310,000", numericPrice: 310000 },
      { color: "#2B2B2B", name: "26 Inch", priceFormatted: "₦340,000", numericPrice: 340000 },
    ],
    specs: [
      { icon: Sparkles, label: "Double Drawn" },
      { icon: Ruler, label: '22-26" Length' },
      { icon: Gem, label: "Virgin Remy" },
      { icon: Scale, label: "300g Full Density" },
    ],
    details: {
      densityOrSize: "300g Super Double Drawn (Full to the tips)",
      laceOrFinish: "Pre-plucked 13x4 HD Invisible Swiss Lace with bleached knots",
      originOrFormulation: "100% Raw Single-Donor Vietnamese Virgin Hair",
      longevity: "3 to 5+ years with regular studio maintenance & washing",
      careTips:
        "Use lightweight silicone serum, avoid heavy mineral oils, store in silk packaging, flat iron at max 230°C.",
    },
  },
  {
    id: "hair_wave",
    name: "Luxe Water Wave Curls",
    category: "wigs",
    categoryLabel: "Luxury Wigs & Extensions",
    desc: "Deeply defined water wave curls that hold their shape effortlessly, offering a lush, natural-volume wet look.",
    fullDesc:
      "Sculpted with steam-textured natural deep waves, this unit stays moisturized, full of bounce, and defined all day. Whether worn wet with curl mousse or dry for Hollywood volume, the hair remains soft and silky to the touch.",
    img: hairWaveImg,
    price: "₦310,000",
    originalPrice: "₦385,000",
    numericPrice: 310000,
    bgClass: "bg-[#EAE4F8]",
    rating: 4.9,
    reviewCount: 36,
    badge: "HD Melt",
    discountBadge: "20% OFF",
    isBestseller: true,
    dots: [
      { color: "#121212", name: "20 Inch", priceFormatted: "₦310,000", numericPrice: 310000 },
      { color: "#1C1C1C", name: "22 Inch", priceFormatted: "₦335,000", numericPrice: 335000 },
      { color: "#2B2B2B", name: "24 Inch", priceFormatted: "₦360,000", numericPrice: 360000 },
    ],
    specs: [
      { icon: Layers, label: "Defined Waves" },
      { icon: Ruler, label: '20-24" Length' },
      { icon: Gem, label: "12A Grade" },
      { icon: Scale, label: "300g Full Density" },
    ],
    details: {
      densityOrSize: "300g Dense 12A Grade Curl Bundles",
      laceOrFinish: "Ultra-thin HD Lace frontal with natural baby hairs",
      originOrFormulation: "100% Unprocessed Brazilian Raw Waves",
      longevity: "3+ years with botanical curl refreshers",
      careTips:
        "Spritz with water and leave-in conditioner daily, detangle with wide-tooth comb from tip to root.",
    },
  },
  {
    id: "hair_curl",
    name: "Pixie Bouncy Curl Wig",
    category: "wigs",
    categoryLabel: "Luxury Wigs & Extensions",
    desc: "A bouncy, high-definition pixie curl wig style featuring short, tight ringlets that are full of life and texture.",
    fullDesc:
      "A ready-to-wear statement piece handcrafted for lightweight elegance and easy glueless wear. Features customized cap elasticity with ventilated ear tabs for flawless comfort throughout long wedding days and soirees.",
    img: hairCurlImg,
    price: "₦195,000",
    originalPrice: "₦245,000",
    numericPrice: 195000,
    bgClass: "bg-[#FAF7F2]",
    rating: 5.0,
    reviewCount: 29,
    badge: "New Drop",
    discountBadge: "20% OFF",
    isBestseller: false,
    dots: [
      { color: "#121212", name: "12 Inch", priceFormatted: "₦195,000", numericPrice: 195000 },
      { color: "#1C1C1C", name: "14 Inch", priceFormatted: "₦215,000", numericPrice: 215000 },
      { color: "#2B2B2B", name: "16 Inch", priceFormatted: "₦235,000", numericPrice: 235000 },
    ],
    specs: [
      { icon: Sparkles, label: "HD Curls" },
      { icon: Ruler, label: '12-16" Length' },
      { icon: Gem, label: "HD Lace" },
      { icon: Scale, label: "250g Dense" },
    ],
    details: {
      densityOrSize: "250g High-Resilience Textured Volume",
      laceOrFinish: "Glueless 5x5 HD Closure with adjustable elastic band",
      originOrFormulation: "100% Burmese Natural Curly Hair",
      longevity: "2 to 3+ years with shape memory retention",
      careTips:
        "Air dry after washing, avoid brush detangling when completely dry to maintain curl cluster definition.",
    },
  },
  {
    id: "hair_bob",
    name: "Signature Blonde Bob Cut",
    category: "wigs",
    categoryLabel: "Luxury Wigs & Extensions",
    desc: "A chic, precisely cut blonde bob wig offering a natural hairline, premium thickness, and a sophisticated silhouette.",
    fullDesc:
      "Precision razor-cut in-house by Seddypluz master stylists. Bleached safely to pure honey and platinum blonde tones with intact cuticle strength, delivering runway-ready glamour straight out of the box.",
    img: hairBobImg,
    price: "₦210,000",
    originalPrice: "₦265,000",
    numericPrice: 210000,
    bgClass: "bg-[#FAF7F2]",
    rating: 4.9,
    reviewCount: 33,
    badge: "Studio Favorite",
    discountBadge: "20% OFF",
    isBestseller: true,
    dots: [
      { color: "#EED7A1", name: "Honey Blonde", priceFormatted: "₦210,000", numericPrice: 210000 },
      { color: "#1C1C1C", name: "Jet Black", priceFormatted: "₦190,000", numericPrice: 190000 },
      { color: "#5C4033", name: "Warm Brunette", priceFormatted: "₦200,000", numericPrice: 200000 },
    ],
    specs: [
      { icon: Scissors, label: "Razor Bob Cut" },
      { icon: Ruler, label: '12-14" Length' },
      { icon: Gem, label: "Swiss HD Lace" },
      { icon: Scale, label: "200g Dense" },
    ],
    details: {
      densityOrSize: "200g Sleek Silhouette Density",
      laceOrFinish: "13x4 Translucent Swiss HD Lace frontal",
      originOrFormulation: "100% Color-Grade Virgin European Texture",
      longevity: "2 to 4 years with purple shampoo toning",
      careTips:
        "Wash with sulfate-free color-safe shampoo and apply argan oil sparingly to the ends.",
    },
  },
  {
    id: "atelier_lip_elixir",
    name: "Atelier Velvet Lip Elixir",
    category: "cosmetics",
    categoryLabel: "Signature Cosmetics & Tools",
    desc: "Weightless 16-hour matte liquid velvet lip pigments formulated for high-definition bridal longevity and non-drying hydration.",
    fullDesc:
      "Custom blended in our studio lab for bridal endurance. Infused with organic rosehip seed oil and hyaluronic spheres, this formula locks in saturated pigment that resists champagne sips, kisses, and long ceremony days without flaking.",
    img: lipstickImg,
    price: "₦38,000",
    originalPrice: "₦48,000",
    numericPrice: 38000,
    bgClass: "bg-[#FBECEB]",
    rating: 5.0,
    reviewCount: 64,
    badge: "Bestseller",
    discountBadge: "20% OFF",
    isBestseller: true,
    dots: [
      { color: "#800020", name: "Royal Plum", priceFormatted: "₦38,000", numericPrice: 38000 },
      {
        color: "#C04000",
        name: "Spiced Terracotta",
        priceFormatted: "₦38,000",
        numericPrice: 38000,
      },
      { color: "#C27B7F", name: "Bridal Rose", priceFormatted: "₦38,000", numericPrice: 38000 },
    ],
    specs: [
      { icon: Sparkles, label: "16H Longwear" },
      { icon: Heart, label: "Hyaluronic Acid" },
      { icon: Gem, label: "Smudge-Proof" },
      { icon: Layers, label: "Velvet Matte" },
    ],
    details: {
      densityOrSize: "8ml Precision Applicator Tube",
      laceOrFinish: "Comfortable Soft-Focus Velvet Matte",
      originOrFormulation: "Cruelty-Free, Non-Comedogenic & Paraben-Free",
      longevity: "16+ hours wear with zero touchups required",
      careTips: "Exfoliate lips gently before application for ultra-smooth velvet finish.",
    },
  },
  {
    id: "diamond_glow_highlighter",
    name: "Diamond Glow Illuminator",
    category: "cosmetics",
    categoryLabel: "Signature Cosmetics & Tools",
    desc: "Ultra-fine baked mineral highlighter infused with pearl micro-pigments for an ethereal, sunlit bridal radiance that glows in any lighting.",
    fullDesc:
      "Crafted with baked Italian mineral pigments and light-refracting pearl crystals, this illuminator melts seamlessly into skin without highlighting texture, creating that coveted camera-luminous glass skin bridal glow.",
    img: highlighterImg,
    price: "₦55,000",
    originalPrice: "₦68,000",
    numericPrice: 55000,
    bgClass: "bg-[#FFF8E7]",
    rating: 5.0,
    reviewCount: 52,
    badge: "Studio Favorite",
    discountBadge: "20% OFF",
    isBestseller: true,
    dots: [
      { color: "#EED7A1", name: "Champagne Glow", priceFormatted: "₦55,000", numericPrice: 55000 },
      {
        color: "#D4AF37",
        name: "Royal 24K Bronze",
        priceFormatted: "₦55,000",
        numericPrice: 55000,
      },
      {
        color: "#E8C39E",
        name: "Rose Gold Mirage",
        priceFormatted: "₦55,000",
        numericPrice: 55000,
      },
    ],
    specs: [
      { icon: Sparkles, label: "Micro-Pearls" },
      { icon: Gem, label: "Baked Mineral" },
      { icon: Droplets, label: "Zero Texture" },
      { icon: Scale, label: "All Skin Tones" },
    ],
    details: {
      densityOrSize: "12g Compact with Mirror & Velvet Pouch",
      laceOrFinish: "Sunlit Ethereal High-Reflect Sheen",
      originOrFormulation: "Baked Micro-Milled Italian Pearls",
      longevity: "All-day radiance under 4K video lighting",
      careTips:
        "Dust lightly on high points of cheeks, bridge of nose, collarbones, and décolletage.",
    },
  },
  {
    id: "atelier_brush_suite",
    name: "Master Bridal Sculpting Brush",
    category: "cosmetics",
    categoryLabel: "Signature Cosmetics & Tools",
    desc: "Ergonomic, ultra-soft cruelty-free synthetic bristle brush calibrated for flawless cream and powder blending.",
    fullDesc:
      "The exact custom tool Seddypluz artists rely on for seamless base blending, sculptural cheekbone contouring, and luminous gele makeup application. Balanced weighted wooden handle with rose-gold ferrule.",
    img: brushImg,
    price: "₦42,000",
    originalPrice: "₦52,000",
    numericPrice: 42000,
    bgClass: "bg-[#F7EBE8]",
    rating: 4.9,
    reviewCount: 27,
    badge: "Limited Batch",
    discountBadge: "20% OFF",
    isBestseller: false,
    dots: [
      { color: "#1C1C1C", name: "Classic Noir", priceFormatted: "₦42,000", numericPrice: 42000 },
      { color: "#C27B7F", name: "Rose Gold", priceFormatted: "₦45,000", numericPrice: 45000 },
    ],
    specs: [
      { icon: Sparkles, label: "Vegan Bristles" },
      { icon: Gem, label: "Rose-Gold Ferrule" },
      { icon: ShieldCheck, label: "Zero Shedding" },
      { icon: Layers, label: "Airbrushed Blend" },
    ],
    details: {
      densityOrSize: "Full Size Professional Studio Brush (21cm)",
      laceOrFinish: "Laser-cut Micro-fiber Synthetic Filaments",
      originOrFormulation: "Hand-assembled with FSC-certified Birchwood",
      longevity: "5+ years of daily professional bridal studio usage",
      careTips: "Wash weekly with antibacterial brush cleanser and dry flat on a clean towel.",
    },
  },
];

export const PRODUCT_IMAGE_PRESETS: {
  id: string;
  label: string;
  value: string;
  category: "wigs" | "cosmetics";
}[] = [
  { id: "straight", label: "Bone Straight Weave", value: hairStraightImg, category: "wigs" },
  { id: "wave", label: "Water Wave Curls", value: hairWaveImg, category: "wigs" },
  { id: "curl", label: "Pixie Bouncy Curl", value: hairCurlImg, category: "wigs" },
  { id: "bob", label: "Blunt Cut Silk Bob", value: hairBobImg, category: "wigs" },
  { id: "lipstick", label: "Velvet Matte Lipstick", value: lipstickImg, category: "cosmetics" },
  {
    id: "highlighter",
    label: "Radiance Highlighter",
    value: highlighterImg,
    category: "cosmetics",
  },
  { id: "brush", label: "Artistry Buffing Brush", value: brushImg, category: "cosmetics" },
];

export function getStoredBoutiqueProducts(): Product[] {
  if (typeof window === "undefined") return boutiqueProducts;
  try {
    const raw = localStorage.getItem("seddypluz_boutique_products");
    if (!raw) return boutiqueProducts;
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) return boutiqueProducts;

    // Rehydrate specs icons if deserialized from JSON
    return parsed.map((p) => {
      const defaultProduct = boutiqueProducts.find((bp) => bp.id === p.id);
      if (defaultProduct && defaultProduct.specs) {
        return {
          ...p,
          specs: defaultProduct.specs,
        };
      }
      return p;
    });
  } catch {
    return boutiqueProducts;
  }
}

export function saveStoredBoutiqueProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("seddypluz_boutique_products", JSON.stringify(products));
    window.dispatchEvent(new CustomEvent("seddypluz_inventory_updated", { detail: products }));
  } catch (err) {
    console.error("Failed to save boutique products to local storage:", err);
  }
}

export function resetStoredBoutiqueProducts(): Product[] {
  if (typeof window === "undefined") return boutiqueProducts;
  try {
    localStorage.removeItem("seddypluz_boutique_products");
    window.dispatchEvent(
      new CustomEvent("seddypluz_inventory_updated", { detail: boutiqueProducts }),
    );
  } catch {}
  return boutiqueProducts;
}

// ==========================================
// ANNOUNCEMENT & PROMO BANNER DATA & CONTROLLER
// ==========================================
export interface AnnouncementItem {
  id: string;
  title: string;
  text: string;
  voucherCode: string;
  discountPercent: string;
  badgeLabel: string;
  pulseAnimation: boolean;
  theme: "plum" | "amber" | "emerald" | "rose" | "dark";
  targetLink: string;
  ctaText: string;
  isActive: boolean;
  createdAt: string;
}

export const defaultAnnouncements: AnnouncementItem[] = [
  {
    id: "promo_bridal_20",
    title: "Bridal Season & Wig Debut Drop",
    text: "Enjoy 20% OFF your first wig order + ALL beauty & bridal installation services!",
    voucherCode: "SEDDY20",
    discountPercent: "20%",
    badgeLabel: "Exclusive Promo",
    pulseAnimation: true,
    theme: "plum",
    targetLink: "/shop",
    ctaText: "Claim 20% OFF",
    isActive: true,
    createdAt: "2026-08-14",
  },
  {
    id: "promo_flash_wigs",
    title: "Bone Straight Flash Drop",
    text: "Limited Batch! 15% OFF all Raw Bone Straight bundles with complimentary studio styling in Kaduna.",
    voucherCode: "FLASHWIG15",
    discountPercent: "15%",
    badgeLabel: "Flash Drop",
    pulseAnimation: true,
    theme: "amber",
    targetLink: "/shop",
    ctaText: "Shop Straight Units",
    isActive: false,
    createdAt: "2026-08-14",
  },
  {
    id: "promo_glam_suite",
    title: "Luxury Glam & Gele VIP Package",
    text: "Book your VIP Bridal Soft Glam + Traditional Gele styling session and receive a complimentary lip elixir.",
    voucherCode: "GLAMVIP",
    discountPercent: "FREE GIFT",
    badgeLabel: "VIP Booking",
    pulseAnimation: false,
    theme: "emerald",
    targetLink: "/#booking",
    ctaText: "Reserve VIP Date",
    isActive: false,
    createdAt: "2026-08-14",
  },
];

export function getStoredAnnouncements(): AnnouncementItem[] {
  if (typeof window === "undefined") return defaultAnnouncements;
  try {
    const raw = localStorage.getItem("seddypluz_announcements");
    if (!raw) return defaultAnnouncements;
    const parsed = JSON.parse(raw) as AnnouncementItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultAnnouncements;
  } catch {
    return defaultAnnouncements;
  }
}

export function saveStoredAnnouncements(announcements: AnnouncementItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("seddypluz_announcements", JSON.stringify(announcements));
    const active = announcements.find((a) => a.isActive) || null;
    window.dispatchEvent(
      new CustomEvent("seddypluz_announcement_updated", {
        detail: { announcements, active },
      }),
    );
  } catch (err) {
    console.error("Failed to save announcements to local storage:", err);
  }
}

export function getActiveAnnouncement(): AnnouncementItem | null {
  const all = getStoredAnnouncements();
  return all.find((a) => a.isActive) || null;
}

export function resetStoredAnnouncements(): AnnouncementItem[] {
  if (typeof window === "undefined") return defaultAnnouncements;
  try {
    localStorage.removeItem("seddypluz_announcements");
    window.dispatchEvent(
      new CustomEvent("seddypluz_announcement_updated", {
        detail: { announcements: defaultAnnouncements, active: defaultAnnouncements[0] },
      }),
    );
  } catch {}
  return defaultAnnouncements;
}
