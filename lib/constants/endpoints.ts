export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  PRODUCTS: {
    BASE: "/products",
    SEARCH: "/products/search",
    CATEGORY_BASE: "/products/category",
    CATEGORIES: "/products/categories",
  },
} as const;
