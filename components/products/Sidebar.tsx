import React from "react";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";

export function Sidebar() {
  const categories = [
    "Kategori 1",
    "Kategori 2",
    "Kategori 3",
    "Kategori 4",
    "Kategori 5",
  ];

  return (
    <aside className="w-70 shrink-0 flex flex-col gap-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A0AEC0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <Input
          type="text"
          placeholder="Quick search"
          className="pl-12 bg-white border-[#E2E8F0] rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-bold text-[#1E293B] pb-2 border-b-2 border-[#1E293B]">
          Kategoriler
        </h2>

        <div className="flex flex-col gap-3 mt-2">
          {categories.map((category, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox id={`category-${index}`} />
              <span className="text-[15px] text-[#475569] group-hover:text-[#1E293B] transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        fullWidth
        className="bg-[#1E293B] hover:bg-[#0F172A] text-white mt-4"
      >
        Filtrele
      </Button>
    </aside>
  );
}
