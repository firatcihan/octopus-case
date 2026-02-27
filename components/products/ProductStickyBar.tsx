"use client";

import { Button } from "@/components/ui/Button";
import { Product } from "@/lib/types/product.types";

interface ProductStickyBarProps {
  product: Product;
}

export function ProductStickyBar({ product }: ProductStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="px-9 h-25 flex items-center justify-between">
        {/* Left Side - Order Summary */}
        <div className="flex items-center h-full flex-1">
          <div className="h-full flex items-center pr-8">
            <span className="text-[22px] font-bold text-black">
              Sipariş Özeti
            </span>
          </div>
          <div className="w-px h-full bg-black/20" />
          <div className="pl-8 flex flex-col justify-center flex-1">
            <h4 className="text-[18px] font-bold text-black line-clamp-1">
              {product.title}
            </h4>
            <p className="text-base font-normal text-[#888888] line-clamp-1 mt-1">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right Side - Price & Add to Cart */}
        <div className="flex items-center gap-4 pl-8">
          <span className="text-4xl font-medium text-black">
            ${product.price.toFixed(2)}
          </span>
          <Button className="bg-[#00B500] hover:bg-[#00b82b] text-white leading-5 font-medium px-8 py-3 h-auto rounded-lg text-sm">
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
