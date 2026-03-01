"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import type { Product } from "@/lib/types/product.types";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: Product;
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  fullWidth,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const tokens = useAuthStore((state) => state.tokens);
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    if (loading) return;

    if (!tokens) {
      router.push(`/login?redirect=/products/${product.id}`);
      return;
    }

    setLoading(true);
    try {
      await addItem(product, 1, user?.id ?? 0);
      toast.success(`"${product.title}" sepete eklendi!`);
    } catch {
      toast.error("Ürün sepete eklenemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      fullWidth={fullWidth}
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Ekleniyor..." : "Sepete Ekle"}
    </Button>
  );
}
