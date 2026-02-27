"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-[#1E293B] mb-2">
            Bir Hata Oluştu
          </h2>
          <p className="text-[#64748B] mb-6">
            {error.message ||
              "Ürünler yüklenirken beklenmeyen bir hata oluştu."}
          </p>
          <Button
            onClick={reset}
            className="bg-[#00B500] hover:bg-[#009900] text-white font-medium"
          >
            Tekrar Dene
          </Button>
        </div>
      </main>
    </div>
  );
}
