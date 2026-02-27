"use client";

import { Button } from "@/components/ui/Button";
import { Product } from "@/lib/types/product.types";

interface ProductStickyBarProps {
  product: Product;
}

export function ProductStickyBar({ product }: ProductStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="max-w-360 mx-auto px-8 h-24 flex items-center justify-between">
        {/* Left Side - Order Summary */}
        <div className="flex items-center h-full flex-1">
          <div className="h-full flex items-center pr-8 border-r border-gray-200">
            <span className="text-lg font-bold text-gray-900">
              Sipariş Özeti
            </span>
          </div>
          <div className="pl-8 flex flex-col justify-center flex-1">
            <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
              {product.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-1 mt-1">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right Side - Price & Add to Cart */}
        <div className="flex items-center gap-6 pl-8">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Button className="bg-[#00d632] hover:bg-[#00b82b] text-white font-bold px-8 py-3 h-auto rounded-lg text-sm">
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
