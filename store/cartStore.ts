"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/lib/types/cart.types";
import type { Product } from "@/lib/types/product.types";
import { addCartApi, updateCartApi } from "@/lib/api/cart";
import { withAuth } from "@/lib/api/client";
import { useAuthStore } from "./authStore";

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: Product, quantity: number, userId: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (product: Product, quantity = 1, userId: number) => {
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

        try {
          await withAuth(
            (token) =>
              addCartApi(
                {
                  userId,
                  products: [{ id: product.id, quantity }],
                },
                token,
              ),
            () => useAuthStore.getState().tokens?.accessToken,
            () => useAuthStore.getState().refreshAuth(),
          );
        } catch (error) {
          set({ items: prevItems });
          throw error;
        }
      },

      removeItem: async (productId: number) => {
        const { items } = get();
        const prevItems = [...items];

        // Optimistic update
        set({ items: items.filter((item) => item.id !== productId) });

        try {
          await withAuth(
            (token) =>
              updateCartApi(1, [{ id: productId, quantity: 0 }], token),
            () => useAuthStore.getState().tokens?.accessToken,
            () => useAuthStore.getState().refreshAuth(),
          );
        } catch {
          set({ items: prevItems });
        }
      },

      clearCart: () => {
        set({ items: [] });
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
