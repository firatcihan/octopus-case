import { request } from "./client";
import { buildQueryParams } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import {
  PRODUCTS_CACHE,
  CATEGORIES_CACHE,
  PRODUCT_CACHE,
} from "@/lib/constants/cache";
import { PRODUCTS_PER_PAGE, CATEGORY_FETCH_LIMIT } from "@/lib/constants/app";
import type {
  ProductsResponse,
  Category,
  Product,
} from "@/lib/types/product.types";

async function getAllProductsByCategoryApi(
  category: string,
): Promise<Product[]> {
  const params = buildQueryParams({ limit: CATEGORY_FETCH_LIMIT, skip: 0 });
  const data = await request<ProductsResponse>(
    `${API_ENDPOINTS.PRODUCTS.CATEGORY_BASE}/${encodeURIComponent(category)}${params}`,
    PRODUCTS_CACHE,
  );
  return data.products;
}

async function getAllSearchResultsApi(search: string): Promise<Product[]> {
  const params = buildQueryParams({
    q: search,
    limit: CATEGORY_FETCH_LIMIT,
    skip: 0,
  });
  const data = await request<ProductsResponse>(
    `${API_ENDPOINTS.PRODUCTS.SEARCH}${params}`,
    PRODUCTS_CACHE,
  );
  return data.products;
}

function deduplicateById(products: Product[]): Product[] {
  const seen = new Set<number>();
  return products.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

export async function getProductsApi(
  search?: string,
  categories?: string[],
  page = 1,
): Promise<ProductsResponse> {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const hasSearch = Boolean(search);
  const hasCategories = Boolean(categories?.length);

  // Case A: no search, no categories
  if (!hasSearch && !hasCategories) {
    return request<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.BASE}${buildQueryParams({ limit: PRODUCTS_PER_PAGE, skip })}`,
      PRODUCTS_CACHE,
    );
  }

  // Case B: search only (no categories)
  if (hasSearch && !hasCategories) {
    return request<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.SEARCH}${buildQueryParams({ q: search, limit: PRODUCTS_PER_PAGE, skip })}`,
      PRODUCTS_CACHE,
    );
  }

  // Case C: single category, no search
  if (!hasSearch && categories!.length === 1) {
    return request<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.CATEGORY_BASE}/${encodeURIComponent(categories![0])}${buildQueryParams({ limit: PRODUCTS_PER_PAGE, skip })}`,
      PRODUCTS_CACHE,
    );
  }

  // Case D: multiple categories, no search
  if (!hasSearch && categories!.length > 1) {
    const allResults = await Promise.all(
      categories!.map((cat) => getAllProductsByCategoryApi(cat)),
    );
    const merged = deduplicateById(allResults.flat()).sort(
      (a, b) => a.id - b.id,
    );
    const total = merged.length;
    const products = merged.slice(skip, skip + PRODUCTS_PER_PAGE);
    return { products, total, skip, limit: PRODUCTS_PER_PAGE };
  }

  // Case E: search + one or more categories
  const allResults = await getAllSearchResultsApi(search!);
  const filtered = allResults
    .filter((p) => categories!.includes(p.category))
    .sort((a, b) => a.id - b.id);
  const total = filtered.length;
  const products = filtered.slice(skip, skip + PRODUCTS_PER_PAGE);
  return { products, total, skip, limit: PRODUCTS_PER_PAGE };
}

export async function getCategoriesApi(): Promise<Category[]> {
  return request<Category[]>(
    API_ENDPOINTS.PRODUCTS.CATEGORIES,
    CATEGORIES_CACHE,
  );
}

export async function getSingleProductApi(id: string): Promise<Product> {
  return request<Product>(
    `${API_ENDPOINTS.PRODUCTS.BASE}/${id}`,
    PRODUCT_CACHE,
  );
}
