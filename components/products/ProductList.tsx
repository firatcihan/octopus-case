"use client";

import React from "react";
import { useProducts } from "@/store/productsContext";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../ui/Pagination";
import type { Product } from "@/lib/types/product.types";

interface ProductListProps {
  products: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function ProductList({
  products,
  total,
  currentPage,
  totalPages,
}: ProductListProps) {
  const { setPage } = useProducts();

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="text-xl font-bold text-[#141A24]">
        {total} ürün listeleniyor
      </div>

      {products.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <p className="text-[#64748B] text-lg">Ürün bulunamadı.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="bg-gray-200 rounded-lg h-60" />
      <div className="flex flex-col gap-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
      <div className="h-10 bg-gray-200 rounded-lg mt-2" />
    </div>
  );
}
