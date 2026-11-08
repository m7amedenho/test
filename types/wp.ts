// أنواع بيانات WordPress و WooCommerce — طبقة البيانات المشتركة

export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  featured_media?: number;
  modified?: string;
}

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  categories?: number[];
  featured_media?: number;
  _embedded?: { "wp:featuredmedia"?: { source_url: string; alt_text?: string }[] };
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: { width: number; height: number; sizes?: Record<string, { source_url: string; width: number; height: number }> };
  title?: { rendered: string };
}

export interface WooImage {
  id: number;
  src: string;
  alt?: string;
  name?: string;
  thumbnail?: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  description?: string;
  image?: WooImage | null;
}

export interface WooAttribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  type?: string;
  status?: string;
  regular_price?: string;
  sale_price?: string;
  price?: string;
  stock_status?: string;
  short_description?: string;
  description?: string;
  categories: { id: number; name: string; slug: string }[];
  images: WooImage[];
  attributes?: WooAttribute[];
  weight?: string;
  dimensions?: { length: string; width: string; height: string };
}

export interface WooBrand {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: WooImage | null;
}
