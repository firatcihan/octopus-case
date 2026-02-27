import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import type { Product } from "@/lib/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="flex flex-col gap-3">
      <Link href={`/products/${product.id}`}>
        <div className="bg-[#F3F4F6] rounded-lg p-6 flex items-center justify-center h-60 cursor-pointer hover:shadow-md transition-shadow">
          <div className="relative w-full h-full">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-[#1E293B] truncate">
          {product.title}
        </h3>
        <p className="text-[13px] text-[#64748B] capitalize">
          {product.category}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold text-[#1E293B]">
            ${discountedPrice}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-[13px] text-[#94A3B8] line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={star <= Math.round(product.rating) ? "#1E293B" : "none"}
              stroke={
                star <= Math.round(product.rating) ? "#1E293B" : "#CBD5E1"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span className="text-[12px] text-[#94A3B8] ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </div>

      <Button fullWidth className="mt-2">
        Sepete Ekle
      </Button>
    </div>
  );
}
