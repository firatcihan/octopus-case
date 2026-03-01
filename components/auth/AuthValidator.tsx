"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";

export function AuthValidator() {
  const hasValidated = useRef(false);

  useEffect(() => {
    if (hasValidated.current) return;
    hasValidated.current = true;

    const unsub = useAuthStore.persist.onFinishHydration(() => {
      useAuthStore.getState().validateSession();
    });

    if (useAuthStore.persist.hasHydrated()) {
      useAuthStore.getState().validateSession();
    }

    return unsub;
  }, []);

  return null;
}
