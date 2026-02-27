export const PRODUCTS_CACHE: RequestInit = {
  next: { revalidate: 60, tags: ["products"] },
};

export const CATEGORIES_CACHE: RequestInit = {
  next: { revalidate: 300, tags: ["categories"] },
};

export const PRODUCT_CACHE: RequestInit = {
  next: { revalidate: 60, tags: ["product"] },
};
