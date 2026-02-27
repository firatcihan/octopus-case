"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-black mb-2">
            Ürün Bulunamadı veya Hata Oluştu
          </h2>
          <p className="text-[#888888] mb-6">
            {error.message ||
              "Ürün detayları yüklenirken beklenmeyen bir hata oluştu."}
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
