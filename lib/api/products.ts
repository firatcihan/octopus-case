import { request } from "./client";
import { buildQueryParams } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import { PRODUCTS_CACHE, CATEGORIES_CACHE } from "@/lib/constants/cache";
import { PRODUCTS_PER_PAGE } from "@/lib/constants/app";
import type { ProductsResponse, Category } from "@/lib/types/product.types";

type ProductQueryParams = {
  q?: string;
  limit: number;
  skip: number;
};

function getProductsEndpoint(search?: string, category?: string): string {
  if (search) return API_ENDPOINTS.PRODUCTS.SEARCH;
  if (category)
    return `${API_ENDPOINTS.PRODUCTS.CATEGORY_BASE}/${encodeURIComponent(category)}`;
  return API_ENDPOINTS.PRODUCTS.BASE;
}

export async function getProductsApi(
  search?: string,
  category?: string,
  page = 1,
): Promise<ProductsResponse> {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const base = getProductsEndpoint(search, category);
  const params: ProductQueryParams = {
    limit: PRODUCTS_PER_PAGE,
    skip,
    ...(search && { q: search }),
  };

  return request<ProductsResponse>(
    `${base}${buildQueryParams(params)}`,
    PRODUCTS_CACHE,
  );
}

export async function getCategoriesApi(): Promise<Category[]> {
  return request<Category[]>(
    API_ENDPOINTS.PRODUCTS.CATEGORIES,
    CATEGORIES_CACHE,
  );
}
