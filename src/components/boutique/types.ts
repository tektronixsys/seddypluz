import type { LucideIcon } from "lucide-react";

export interface ProductDot {
  color: string;
  name: string;
  priceFormatted?: string;
  numericPrice?: number;
}

export interface ProductSpec {
  icon: LucideIcon;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: "wigs" | "cosmetics";
  categoryLabel: string;
  desc: string;
  fullDesc: string;
  img: string;
  price: string;
  originalPrice?: string;
  numericPrice: number;
  bgClass: string;
  rating: number;
  reviewCount: number;
  badge?: "Bestseller" | "New Drop" | "HD Melt" | "Limited Batch" | "Studio Favorite";
  discountBadge?: string;
  isBestseller?: boolean;
  dots: ProductDot[];
  specs: ProductSpec[];
  details: {
    densityOrSize: string;
    laceOrFinish: string;
    originOrFormulation: string;
    longevity: string;
    careTips: string;
  };
}
