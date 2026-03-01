"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function HeaderSearchInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(q);
  const [lastQ, setLastQ] = useState(q);

  const inputRef = useRef<HTMLInputElement>(null);

  if (q !== lastQ) {
    setQuery(q);
    setLastQ(q);
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", query.trim());
      params.delete("page");
      router.push(`/products?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      params.delete("page");
      router.push(`/products?${params.toString()}`);
      setIsOpen(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      // If the blur was caused by clicking outside (and not on the search button)
      // we set it as closed if query is empty.
      if (!query) {
        setIsOpen(false);
      }
    }, 150);
  };

  return (
    <div className="relative flex items-center h-10">
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-[#F1F5F9] rounded-lg px-3 py-1.5 transition-all"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            placeholder="Ürün ara..."
            className="bg-transparent border-none outline-none focus:ring-0 text-sm w-37.5 text-[#1E293B] placeholder-[#94A3B8]"
          />
          <button
            type="submit"
            className="text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center p-1 w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer shrink-0 ml-1"
          >
            <Image
              src="/assets/icons/search-header.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center p-1 w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Arama yap"
        >
          <Image
            src="/assets/icons/search-header.svg"
            alt="Search"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
}

export function HeaderSearch() {
  return (
    <Suspense
      fallback={
        <div className="text-gray-400 flex items-center justify-center p-1 w-8 h-8 rounded-full">
          <Image
            src="/assets/icons/search-header.svg"
            alt="Search"
            width={24}
            height={24}
          />
        </div>
      }
    >
      <HeaderSearchInner />
    </Suspense>
  );
}
