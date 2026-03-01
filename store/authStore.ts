"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, AuthTokens } from "@/lib/types/auth.types";
import { loginApi, refreshTokenApi, getMeApi } from "@/lib/api/auth";

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
  validateSession: () => Promise<void>;
  clearError: () => void;
}

function setAuthCookies(accessToken: string, refreshToken: string) {
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `auth-token=true; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function clearAuthCookies() {
  document.cookie = "accessToken=; path=/; max-age=0";
  document.cookie = "refreshToken=; path=/; max-age=0";
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

          setAuthCookies(accessToken, refreshToken);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Login failed";
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      logout: () => {
        set({ user: null, tokens: null, error: null });
        clearAuthCookies();
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

          setAuthCookies(newTokens.accessToken, newTokens.refreshToken);
          return true;
        } catch {
          get().logout();
          return false;
        }
      },

      validateSession: async () => {
        const { tokens } = get();
        if (!tokens?.accessToken) return;

        try {
          const user = await getMeApi(tokens.accessToken);
          set({ user });
        } catch {
          const refreshed = await get().refreshAuth();
          if (!refreshed) return;

          try {
            const newTokens = get().tokens;
            if (!newTokens?.accessToken) return;
            const user = await getMeApi(newTokens.accessToken);
            set({ user });
          } catch {
            get().logout();
          }
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
          if (state?.tokens?.accessToken && state?.tokens?.refreshToken) {
            setAuthCookies(state.tokens.accessToken, state.tokens.refreshToken);
          }
        };
      },
    },
  ),
);
