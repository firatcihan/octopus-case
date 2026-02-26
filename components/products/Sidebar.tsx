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
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.3333 18.3333L16.6667 16.6666"
              stroke="#94A3B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <Input
          type="text"
          placeholder="Quick search"
          className="border-none bg-transparent focus:ring-0 pl-2 pr-3 py-3 w-full"
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
