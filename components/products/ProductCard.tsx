import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-[#F3F4F6] rounded-lg p-6 flex items-center justify-center h-60">
        <div className="relative w-full h-full">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-[#1E293B] truncate">
          {product.title}
        </h3>
        <p className="text-[13px] text-[#64748B]">{product.category}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[16px] font-bold text-[#1E293B]">
          {product.price}
        </span>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={star <= product.rating ? "#1E293B" : "none"}
              stroke={star <= product.rating ? "#1E293B" : "#CBD5E1"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          ))}
        </div>
      </div>

      <Button fullWidth className="mt-2">
        Sepete Ekle
      </Button>
    </div>
  );
}
