import type { NextFetchOptions } from "@/lib/api/client";

export const PRODUCTS_CACHE: NextFetchOptions = {
  next: { revalidate: 60, tags: ["products"] },
};

export const CATEGORIES_CACHE: NextFetchOptions = {
  next: { revalidate: 300, tags: ["categories"] },
};

export const PRODUCT_CACHE: NextFetchOptions = {
  next: { revalidate: 60, tags: ["product"] },
};
