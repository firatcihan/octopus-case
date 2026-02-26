"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, AuthTokens } from "@/lib/types";
import { loginApi, refreshTokenApi } from "@/lib/api";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
  clearError: () => void;
}

function setAuthCookie() {
  document.cookie = `auth-token=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = "auth-token=; path=/; max-age=0";
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginApi({ username, password });
          const { accessToken, refreshToken, ...user } = response;

          set({
            user,
            tokens: { accessToken, refreshToken },
            isLoading: false,
            error: null,
          });

          setAuthCookie();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Login failed";
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      logout: () => {
        set({ user: null, tokens: null, error: null });
        clearAuthCookie();
      },

      refreshAuth: async () => {
        const { tokens } = get();
        if (!tokens?.refreshToken) {
          get().logout();
          return false;
        }

        try {
          const newTokens = await refreshTokenApi({
            refreshToken: tokens.refreshToken,
          });

          set({
            tokens: {
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            },
          });

          setAuthCookie();
          return true;
        } catch {
          get().logout();
          return false;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state?.tokens) {
            setAuthCookie();
          }
        };
      },
    },
  ),
);
