"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import type { Product } from "@/lib/types/product.types";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const router = useRouter();

  async function handleClick() {
    if (status !== "idle") return;

    if (!tokens) {
      router.push(`/login?redirect=/products/${product.id}`);
      return;
    }

    setStatus("loading");
    await addItem(product);
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const label =
    status === "loading"
      ? "Ekleniyor..."
      : status === "success"
        ? "Eklendi!"
        : "Sepete Ekle";

  return (
    <Button
      fullWidth={fullWidth}
      className={className}
      onClick={handleClick}
      disabled={status === "loading"}
    >
      {label}
    </Button>
  );
}
