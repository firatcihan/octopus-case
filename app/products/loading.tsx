import React from "react";
import { Header } from "@/components/layout/Header";
import { ProductListSkeleton } from "@/components/products/ProductList";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header />

      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8 flex gap-12">
        <aside className="w-[256px] shrink-0 flex flex-col gap-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg" />
          <div className="flex flex-col gap-4">
            <div className="h-6 bg-gray-200 rounded w-32" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        </aside>

        <ProductListSkeleton />
      </main>
    </div>
  );
}
