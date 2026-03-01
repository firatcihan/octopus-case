"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CategoryCheckbox } from "./CategoryCheckbox";
import { useProducts } from "@/store/productsContext";

export function Sidebar() {
  const {
    categories,
    currentCategories,
    currentSearch,
    setSearchQuery,
    toggleCategory,
    clearFilters,
  } = useProducts();

  const [localSearch, setLocalSearch] = useState(currentSearch);

  // URL'den gelen arama değeri değiştiğinde local state'i güncelle
  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  // Debounced search — URL'ye push
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== currentSearch) {
        setSearchQuery(localSearch);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, currentSearch, setSearchQuery]);

  const handleClearFilters = useCallback(() => {
    setLocalSearch("");
    clearFilters();
  }, [clearFilters]);

  return (
    <aside className="w-[256px] shrink-0 flex flex-col gap-4">
      <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg px-4 focus-within:ring-2 focus-within:ring-[#00C800] focus-within:border-transparent transition-all">
        <div className="flex items-center pointer-events-none">
          <Image
            src="/assets/icons/search-sidebar.svg"
            alt=""
            width={20}
            height={20}
          />
        </div>
        <Input
          type="text"
          placeholder="Ürün ara..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="border-none bg-transparent focus:ring-0 pl-2 pr-3 py-2.5 w-full"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center text-[18px] font-bold text-[#1E293B] pb-2 border-b-5 border-black">
          Kategoriler
          {currentCategories.length > 0 && (
            <span className="ml-2 text-sm font-semibold text-white bg-[#00B500] rounded-full px-2 py-0.5">
              {currentCategories.length}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-2 max-h-100 overflow-y-auto pr-1">
          {categories.map((category) => (
            <CategoryCheckbox
              key={category.slug}
              id={`category-${category.slug}`}
              label={category.name}
              checked={currentCategories.includes(category.slug)}
              onChange={() => toggleCategory(category.slug)}
            />
          ))}
        </div>
      </div>

      <Button
        fullWidth
        className="bg-[#1E293B] font-medium hover:bg-[#0F172A] cursor-pointer text-white"
        onClick={handleClearFilters}
      >
        Filtreleri Temizle
      </Button>
    </aside>
  );
}
