"use client";

import { useProducts } from "@/store/productsContext";
import { Pagination } from "../ui/Pagination";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProductPagination({
  currentPage,
  totalPages,
}: ProductPaginationProps) {
  const { setPage } = useProducts();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
