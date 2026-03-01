"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/lib/types/cart.types";
import type { Product } from "@/lib/types/product.types";
import { addCartApi } from "@/lib/api/cart";
import { withAuth } from "@/lib/api/client";
import { useAuthStore } from "./authStore";

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (product: Product, quantity = 1) => {
        const { items } = get();

        // Optimistic update
        const existingIndex = items.findIndex((i) => i.id === product.id);
        const prevItems = [...items];

        if (existingIndex >= 0) {
          const updated = items.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
          set({ items: updated });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity,
              },
            ],
          });
        }

        const user = useAuthStore.getState().user;

        try {
          await withAuth(
            (token) =>
              addCartApi(
                {
                  userId: user?.id ?? 0,
                  products: [{ id: product.id, quantity }],
                },
                token,
              ),
            () => useAuthStore.getState().tokens?.accessToken,
            () => useAuthStore.getState().refreshAuth(),
          );
        } catch {
          set({ items: prevItems });
        }
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
