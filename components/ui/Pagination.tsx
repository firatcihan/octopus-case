"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = useMemo(() => {
    const items: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
      return items;
    }

    items.push(1);

    if (currentPage > 3) {
      items.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) {
      items.push("ellipsis");
    }

    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "text-[14px] font-medium px-2 transition-colors",
          currentPage === 1
            ? "text-[#CBD5E1] cursor-not-allowed"
            : "text-[#64748B] hover:text-[#1E293B]",
        )}
      >
        Prev
      </button>

      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className="text-[#64748B] px-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 rounded-md text-[14px] font-medium flex items-center justify-center transition-colors",
              page === currentPage
                ? "bg-[#00B500] text-white"
                : "bg-white border border-[#E2E8F0] text-[#1E293B] hover:bg-gray-50",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "text-[14px] font-medium px-2 transition-colors",
          currentPage === totalPages
            ? "text-[#CBD5E1] cursor-not-allowed"
            : "text-[#1E293B] hover:text-[#00B500]",
        )}
      >
        Next
      </button>
    </div>
  );
}
