"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { CartBadge } from "./CartBadge";
import { UserProfile } from "./UserProfile";

function useHydrated() {
  return useSyncExternalStore(
    (cb) => useAuthStore.persist.onFinishHydration(cb),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}

export function HeaderActions() {
  const tokens = useAuthStore((state) => state.tokens);
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="flex items-center gap-2 ml-2.5 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!tokens) {
    return (
      <Link
        href="/login"
        className="px-5 py-2.5 bg-[#00B500] text-white text-sm font-semibold rounded-lg hover:bg-[#009a00] transition-colors"
      >
        Giriş Yap
      </Link>
    );
  }

  return (
    <>
      <CartBadge />
      <UserProfile />
    </>
  );
}
