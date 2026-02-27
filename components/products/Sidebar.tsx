"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CategoryCheckbox } from "./CategoryCheckbox";
import { useProducts } from "@/store/productsContext";

export function Sidebar() {
  const {
    categories,
    currentCategory,
    currentSearch,
    setSearchQuery,
    setSelectedCategory,
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

  const handleCategoryChange = useCallback(
    (slug: string) => {
      setSelectedCategory(currentCategory === slug ? "" : slug);
    },
    [currentCategory, setSelectedCategory],
  );

  const handleClearFilters = useCallback(() => {
    setLocalSearch("");
    clearFilters();
  }, [clearFilters]);

  return (
    <aside className="w-[256px] shrink-0 flex flex-col gap-4">
      <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg px-4 focus-within:ring-2 focus-within:ring-[#00C800] focus-within:border-transparent transition-all">
        <div className="flex items-center pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.58334 17.5C13.9556 17.5 17.5 13.9555 17.5 9.58329C17.5 5.21104 13.9556 1.66663 9.58334 1.66663C5.21108 1.66663 1.66667 5.21104 1.66667 9.58329C1.66667 13.9555 5.21108 17.5 9.58334 17.5Z"
              stroke="#94A3B8"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3333 18.3333L16.6667 16.6666"
              stroke="#94A3B8"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
        <div className="text-[18px] font-bold text-[#1E293B] pb-2 border-b-5 border-black">
          Kategoriler
        </div>

        <div className="flex flex-col gap-4 mt-2 max-h-100 overflow-y-auto pr-1">
          {categories.map((category) => (
            <CategoryCheckbox
              key={category.slug}
              id={`category-${category.slug}`}
              label={category.name}
              checked={currentCategory === category.slug}
              onChange={() => handleCategoryChange(category.slug)}
            />
          ))}
        </div>
      </div>

      <Button
        fullWidth
        className="bg-[#1E293B] font-medium hover:bg-[#0F172A] text-white"
        onClick={handleClearFilters}
      >
        Filtreleri Temizle
      </Button>
    </aside>
  );
}
