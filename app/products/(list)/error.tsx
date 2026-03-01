"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center flex flex-col items-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ürünler Yüklenirken hata oluştu
          </h2>

          <p className="text-gray-500 mb-8 text-balance leading-relaxed text-base md:text-lg">
            {error.message ||
              "Ürün listesi yüklenirken beklenmeyen bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black font-medium py-3 px-8 transition-all flex-1 sm:flex-none"
            >
              Sayfayı Yenile
            </Button>
            <Button
              onClick={reset}
              className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 1 0 2.81-6.64L21 8"></path>
              </svg>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
