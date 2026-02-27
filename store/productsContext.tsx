"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types/product.types";

// ── Context ───────────────────────────────────────────────

interface ProductsContextValue {
  categories: Category[];
  currentSearch: string;
  currentCategory: string;
  currentPage: number;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

interface ProductsProviderProps {
  children: ReactNode;
  categories: Category[];
  currentSearch: string;
  currentCategory: string;
  currentPage: number;
}

export function ProductsProvider({
  children,
  categories,
  currentSearch,
  currentCategory,
  currentPage,
}: ProductsProviderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams],
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      pushParams({ q: query, category: "", page: "" });
    },
    [pushParams],
  );

  const setSelectedCategory = useCallback(
    (category: string) => {
      pushParams({ category, q: "", page: "" });
    },
    [pushParams],
  );

  const setPage = useCallback(
    (page: number) => {
      pushParams({ page: page > 1 ? String(page) : "" });
    },
    [pushParams],
  );

  const clearFilters = useCallback(() => {
    router.push("/products");
  }, [router]);

  const value: ProductsContextValue = {
    categories,
    currentSearch,
    currentCategory,
    currentPage,
    setSearchQuery,
    setSelectedCategory,
    setPage,
    clearFilters,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
}
